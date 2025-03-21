# avis/signals.py
from django.db.models.signals import post_save, pre_delete, post_delete
from django.dispatch import receiver
from django.core.cache import cache
from .models import Avis
import logging

logger = logging.getLogger(__name__)

@receiver(post_save, sender=Avis)
def invalidate_avis_cache(sender, instance, created, **kwargs):
    """Invalide et met à jour le cache lors de la création ou mise à jour d’un avis."""
    cache_key_list = f"avis_list_{instance.type}_{instance.product_id}"
    cache_key_stats = f"avis_stats_{instance.type}_{instance.product_id}"
    cache.delete(cache_key_list)
    cache.delete(cache_key_stats)
    action = "créé" if created else "mis à jour"
    logger.info(f"Avis {instance.id} {action} pour {instance.type} {instance.product_id}")

@receiver(pre_delete, sender=Avis)
def invalidate_avis_cache_on_delete(sender, instance, **kwargs):
    """Invalide le cache avant suppression d’un avis."""
    cache_key_list = f"avis_list_{instance.type}_{instance.product_id}"
    cache_key_stats = f"avis_stats_{instance.type}_{instance.product_id}"
    cache.delete(cache_key_list)
    cache.delete(cache_key_stats)
    logger.info(f"Avis {instance.id} supprimé pour {instance.type} {instance.product_id}")

logger.info("Signaux pour l’app avis chargés.")