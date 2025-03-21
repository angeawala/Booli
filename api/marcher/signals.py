from django.db.models.signals import post_save, pre_delete
from django.dispatch import receiver
from django.core.cache import cache
from .models import Shop, Company, Doctor, Mark, Supermarket
from product.models import ShopProduct, PharmacyProduct, CompanyProduct, MarkProduct, SupermarketProduct
import logging

logger = logging.getLogger(__name__)

# Invalidation du cache après modification
@receiver(post_save, sender=Shop)
def invalidate_shop_cache(sender, instance, created, **kwargs):
    """Invalide le cache des produits liés à la boutique."""
    cache_key = f"shop_products_{instance.id}"
    cache.delete(cache_key)
    logger.info(f"Cache invalidé pour la boutique {instance.name} (ID: {instance.id})")

@receiver(post_save, sender=Company)
def invalidate_company_cache(sender, instance, created, **kwargs):
    """Invalide le cache des produits liés à la compagnie."""
    cache_key = f"company_products_{instance.id}"
    cache.delete(cache_key)
    logger.info(f"Cache invalidé pour la compagnie {instance.name} (ID: {instance.id})")

@receiver(post_save, sender=Doctor)
def invalidate_doctor_cache(sender, instance, created, **kwargs):
    """Invalide le cache des produits liés au docteur."""
    cache_key = f"doctor_products_{instance.id}"
    cache.delete(cache_key)
    logger.info(f"Cache invalidé pour le docteur {instance.name} (ID: {instance.id})")

@receiver(post_save, sender=Mark)
def invalidate_mark_cache(sender, instance, created, **kwargs):
    """Invalide le cache des produits liés à la marque."""
    cache_key = f"mark_products_{instance.id}"
    cache.delete(cache_key)
    logger.info(f"Cache invalidé pour la marque {instance.name} (ID: {instance.id})")

@receiver(post_save, sender=Supermarket)
def invalidate_supermarket_cache(sender, instance, created, **kwargs):
    """Invalide le cache des produits liés au supermarché."""
    cache_key = f"supermarket_products_{instance.id}"
    cache.delete(cache_key)
    logger.info(f"Cache invalidé pour le supermarché {instance.name} (ID: {instance.id})")

# Gestion des produits avant suppression
@receiver(pre_delete, sender=Shop)
def handle_shop_deletion(sender, instance, **kwargs):
    """Supprime ou réassigne les produits liés à la boutique supprimée."""
    products = ShopProduct.objects.filter(shop=instance)
    product_count = products.count()
    products.delete()  # Ou update(shop=None) si vous préférez réassigner
    logger.info(f"{product_count} produits supprimés après suppression de la boutique {instance.name}")

@receiver(pre_delete, sender=Doctor)
def handle_doctor_deletion(sender, instance, **kwargs):
    """Supprime ou réassigne les produits liés au docteur supprimé."""
    products = PharmacyProduct.objects.filter(doctor=instance)
    product_count = products.count()
    products.delete()
    logger.info(f"{product_count} produits supprimés après suppression du docteur {instance.name}")

@receiver(pre_delete, sender=Mark)
def handle_mark_deletion(sender, instance, **kwargs):
    """Supprime ou réassigne les produits liés à la marque supprimée."""
    products = MarkProduct.objects.filter(mark=instance)
    product_count = products.count()
    products.delete()
    logger.info(f"{product_count} produits supprimés après suppression de la marque {instance.name}")

@receiver(pre_delete, sender=Supermarket)
def handle_supermarket_deletion(sender, instance, **kwargs):
    """Supprime ou réassigne les produits liés au supermarché supprimé."""
    products = SupermarketProduct.objects.filter(supermarket=instance)
    product_count = products.count()
    products.delete()
    logger.info(f"{product_count} produits supprimés après suppression du supermarché {instance.name}")

# Journalisation de la création
@receiver(post_save, sender=Shop)
def log_shop_creation(sender, instance, created, **kwargs):
    if created:
        logger.info(f"Nouvelle boutique créée : {instance.name} par {instance.created_by}")

@receiver(post_save, sender=Company)
def log_company_creation(sender, instance, created, **kwargs):
    if created:
        logger.info(f"Nouvelle compagnie créée : {instance.name} par {instance.created_by}")

@receiver(post_save, sender=Doctor)
def log_doctor_creation(sender, instance, created, **kwargs):
    if created:
        logger.info(f"Nouveau docteur créé : {instance.name} par {instance.created_by}")

@receiver(post_save, sender=Mark)
def log_mark_creation(sender, instance, created, **kwargs):
    if created:
        logger.info(f"Nouvelle marque créée : {instance.name} par {instance.created_by}")

@receiver(post_save, sender=Supermarket)
def log_supermarket_creation(sender, instance, created, **kwargs):
    if created:
        logger.info(f"Nouveau supermarché créé : {instance.name} par {instance.created_by}")