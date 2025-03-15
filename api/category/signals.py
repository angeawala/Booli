from django.db.models.signals import post_save, pre_delete
from django.dispatch import receiver
from django.core.cache import cache
from .models import Category, SubCategory
from product.models import BaseProduct
import logging

logger = logging.getLogger(__name__)

@receiver(post_save, sender=Category)
def invalidate_category_cache(sender, instance, created, **kwargs):
    """Invalide le cache des produits liés à la catégorie lors de sa modification."""
    cache_key = f"category_products_{instance.id}"
    cache.delete(cache_key)
    logger.info(f"Cache invalidé pour la catégorie {instance.name} (ID: {instance.id})")

@receiver(post_save, sender=SubCategory)
def invalidate_subcategory_cache(sender, instance, created, **kwargs):
    """Invalide le cache des produits liés à la sous-catégorie lors de sa modification."""
    cache_key = f"subcategory_products_{instance.id}"
    cache.delete(cache_key)
    logger.info(f"Cache invalidé pour la sous-catégorie {instance.name} (ID: {instance.id})")

@receiver(pre_delete, sender=Category)
def handle_category_deletion(sender, instance, **kwargs):
    """Met à jour les produits en supprimant la référence à la catégorie supprimée."""
    products = BaseProduct.objects.filter(category=instance)
    product_count = products.count()
    products.update(category=None)
    logger.info(f"{product_count} produits mis à jour après suppression de la catégorie {instance.name}")

@receiver(pre_delete, sender=SubCategory)
def handle_subcategory_deletion(sender, instance, **kwargs):
    """Met à jour les produits en supprimant la référence à la sous-catégorie supprimée."""
    products = BaseProduct.objects.filter(subcategory=instance)
    product_count = products.count()
    products.update(subcategory=None)
    logger.info(f"{product_count} produits mis à jour après suppression de la sous-catégorie {instance.name}")

@receiver(post_save, sender=Category)
def log_category_creation(sender, instance, created, **kwargs):
    """Journalise la création d’une catégorie."""
    if created:
        created_by = getattr(instance, 'created_by', None)
        logger.info(f"Nouvelle catégorie créée : {instance.name} par {created_by if created_by else 'Système'}")

@receiver(post_save, sender=BaseProduct)
def invalidate_cache_on_subcategory_change(sender, instance, created, update_fields, **kwargs):
    """
    Invalide le cache lorsqu’une sous-catégorie est modifiée dans BaseProduct.
    """
    if not created and update_fields and 'subcategory' in update_fields:
        # Si la sous-catégorie a changé
        old_subcategory = BaseProduct.objects.get(id=instance.id).subcategory
        new_subcategory = instance.subcategory
        
        if old_subcategory != new_subcategory:
            if old_subcategory:
                cache_key_old = f"subcategory_products_{old_subcategory.id}"
                cache.delete(cache_key_old)
                logger.info(f"Cache invalidé pour l’ancienne sous-catégorie {old_subcategory.name} (ID: {old_subcategory.id})")
            if new_subcategory:
                cache_key_new = f"subcategory_products_{new_subcategory.id}"
                cache.delete(cache_key_new)
                logger.info(f"Cache invalidé pour la nouvelle sous-catégorie {new_subcategory.name} (ID: {new_subcategory.id})")
            if instance.category:
                cache_key_category = f"category_products_{instance.category.id}"
                cache.delete(cache_key_category)
                logger.info(f"Cache invalidé pour la catégorie {instance.category.name} (ID: {instance.category.id})")

logger.info("Chargement des signaux pour les catégories et sous-catégories terminé.")