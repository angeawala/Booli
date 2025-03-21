# avis/signals.py
from django.db.models.signals import post_save, pre_delete
from django.dispatch import receiver
from django.core.cache import cache
from avis.models import Avis
import logging

logger = logging.getLogger(__name__)

@receiver(post_save, sender=Avis)
def invalidate_avis_cache(sender, instance, created, **kwargs):
    cache_key_list = f"avis_list_{instance.type}_{instance.product_id}"
    cache_key_stats = f"avis_stats_{instance.type}_{instance.product_id}"
    cache_key_product = f"product_{instance.product_id}"  # Ajout
    cache.delete(cache_key_list)
    cache.delete(cache_key_stats)
    cache.delete(cache_key_product)  # Invalide le cache produit
    action = "créé" if created else "mis à jour"
    logger.info(f"Avis {instance.id} {action} pour {instance.type} {instance.product_id}")

@receiver(pre_delete, sender=Avis)
def invalidate_avis_cache_on_delete(sender, instance, **kwargs):
    cache_key_list = f"avis_list_{instance.type}_{instance.product_id}"
    cache_key_stats = f"avis_stats_{instance.type}_{instance.product_id}"
    cache_key_product = f"product_{instance.product_id}"  # Ajout
    cache.delete(cache_key_list)
    cache.delete(cache_key_stats)
    cache.delete(cache_key_product)  # Invalide le cache produit
    logger.info(f"Avis {instance.id} supprimé pour {instance.type} {instance.product_id}")

logger.info("Signaux pour l’app avis chargés.")