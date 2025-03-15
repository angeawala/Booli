from django.db.models.signals import post_save, pre_delete, post_delete
from django.dispatch import receiver
from django.core.cache import cache
from .models import (
    BaseProduct, ShopProduct, BookProduct, PharmacyProduct, 
    CompanyProduct, MarkProduct, SupermarketProduct, 
    Review, Promotion, CartItem, Commande
)
from .utils import clear_product_cache, check_stock_availability
import logging

logger = logging.getLogger(__name__)

# Mise à jour du cache après création ou modification d’un produit
@receiver(post_save, sender=BaseProduct)
def invalidate_base_product_cache(sender, instance, created, **kwargs):
    cache.delete(f"all_products_by_base_{instance.id}")
    logger.info(f"Cache invalidé pour BaseProduct {instance.name} (ID: {instance.id})")

@receiver(post_save, sender=ShopProduct)
@receiver(post_save, sender=BookProduct)
@receiver(post_save, sender=PharmacyProduct)
@receiver(post_save, sender=CompanyProduct)
@receiver(post_save, sender=MarkProduct)
@receiver(post_save, sender=SupermarketProduct)
def invalidate_product_cache(sender, instance, created, **kwargs):
    clear_product_cache(instance)
    logger.info(f"Cache invalidé pour {sender.__name__} (ID: {instance.id})")

# Vérification du stock lors de l’ajout au panier
@receiver(post_save, sender=CartItem)
def check_cart_item_stock(sender, instance, created, **kwargs):
    if created:
        product = (instance.shop_product or instance.book_product or instance.pharmacy_product or 
                   instance.company_product or instance.mark_product or instance.supermarket_product)
        if not check_stock_availability(product, instance.quantity):
            instance.delete()
            logger.warning(f"Produit {product} retiré du panier (stock insuffisant)")
            raise ValueError(f"Stock insuffisant pour {product}")

# Mise à jour du stock après suppression d’un CartItem
@receiver(post_delete, sender=CartItem)
def update_stock_on_cart_item_delete(sender, instance, **kwargs):
    product = (instance.shop_product or instance.book_product or instance.pharmacy_product or 
               instance.company_product or instance.mark_product or instance.supermarket_product)
    if hasattr(product, 'stock'):
        product.stock += instance.quantity
        product.save()
        logger.info(f"Stock mis à jour pour {product} après suppression de CartItem")

# Suppression des avis et promotions avant suppression d’un produit
@receiver(pre_delete, sender=ShopProduct)
@receiver(pre_delete, sender=BookProduct)
@receiver(pre_delete, sender=PharmacyProduct)
@receiver(pre_delete, sender=CompanyProduct)
@receiver(pre_delete, sender=MarkProduct)
@receiver(pre_delete, sender=SupermarketProduct)
def handle_product_deletion(sender, instance, **kwargs):
    Review.objects.filter(**{f"{sender.__name__.lower()}": instance}).delete()
    Promotion.objects.filter(**{f"{sender.__name__.lower()}": instance}).delete()
    logger.info(f"Avis et promotions supprimés pour {sender.__name__} (ID: {instance.id})")

# Journalisation de la création
@receiver(post_save, sender=BaseProduct)
def log_base_product_creation(sender, instance, created, **kwargs):
    if created:
        logger.info(f"Nouveau BaseProduct créé : {instance.name} par {instance.created_by}")

@receiver(post_save, sender=Commande)
def deactivate_cart_on_order(sender, instance, created, **kwargs):
    """Désactive le panier une fois la commande créée."""
    if created and instance.cart and instance.cart.is_active:
        instance.cart.is_active = False
        instance.cart.save()
        logger.info(f"Panier {instance.cart.id} désactivé après création de la commande {instance.id}")