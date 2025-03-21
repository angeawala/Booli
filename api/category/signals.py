# categories/signals.py
from django.db.models.signals import post_save, pre_delete
from django.dispatch import receiver
from django.core.cache import cache
from .models import Category, SubCategory
import logging

logger = logging.getLogger(__name__)

@receiver(post_save, sender=Category)
def handle_category_save(sender, instance, created, **kwargs):
    """Invalide le cache et journalise lors de la création ou mise à jour d’une catégorie."""
    cache_key = f"category_{instance.id}"
    cache.delete(cache_key)
    action = "créée" if created else "mise à jour"
    user = instance.updated_by if instance.updated_by else instance.created_by if instance.created_by else "Système"
    logger.info(f"Catégorie {instance.name} {action} par {user} (ID: {instance.id})")

@receiver(post_save, sender=SubCategory)
def handle_subcategory_save(sender, instance, created, **kwargs):
    """Invalide le cache lié à la sous-catégorie et sa catégorie parent lors de sa modification."""
    cache_key = f"subcategory_{instance.id}"
    cache.delete(cache_key)
    if instance.category:
        category_cache_key = f"category_{instance.category.id}"
        cache.delete(category_cache_key)
        logger.info(f"Cache invalidé pour la catégorie parent {instance.category.name} (ID: {instance.category.id})")
    logger.info(f"Cache invalidé pour la sous-catégorie {instance.name} (ID: {instance.id})")

@receiver(pre_delete, sender=Category)
def handle_category_deletion(sender, instance, **kwargs):
    """Supprime les références dans le cache avant suppression."""
    cache_key = f"category_{instance.id}"
    cache.delete(cache_key)
    logger.info(f"Cache supprimé pour la catégorie {instance.name} (ID: {instance.id})")

@receiver(pre_delete, sender=SubCategory)
def handle_subcategory_deletion(sender, instance, **kwargs):
    """Supprime les références dans le cache avant suppression."""
    cache_key = f"subcategory_{instance.id}"
    cache.delete(cache_key)
    if instance.category:
        category_cache_key = f"category_{instance.category.id}"
        cache.delete(category_cache_key)
    logger.info(f"Cache supprimé pour la sous-catégorie {instance.name} (ID: {instance.id})")

logger.info("Chargement des signaux pour les catégories et sous-catégories terminé.")