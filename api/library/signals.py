# library/signals.py
from django.db.models.signals import pre_save, post_save
from django.dispatch import receiver
from django.core.exceptions import ValidationError
from django.core.cache import cache
from .models import Book, BookPDF, Abonnement
import logging
from .utils import get_cache_key

logger = logging.getLogger(__name__)

@receiver(pre_save, sender=Book)
def validate_base_product(sender, instance, raw, **kwargs):
    if not raw and not instance.base_product_id:
        raise ValidationError("Un produit de base doit être associé avant de sauvegarder un livre.")

@receiver(pre_save, sender=BookPDF)
def validate_book_pdf(sender, instance, raw, **kwargs):
    if not raw and not instance.book_product_id:
        raise ValidationError("Un livre doit être associé avant de sauvegarder un PDF.")

@receiver(post_save, sender=Book)
def invalidate_book_cache(sender, instance, created, **kwargs):
    cache_key = get_cache_key('book', instance.id)
    cache.delete(cache_key)
    cache_key_product = f"product_{instance.base_product_id}"
    cache.delete(cache_key_product)
    action = "créé" if created else "mis à jour"
    logger.info(f"Livre {instance.id} {action} - Caches invalidés")

@receiver(post_save, sender=BookPDF)
def invalidate_pdf_cache(sender, instance, created, **kwargs):
    cache_key = get_cache_key('book', instance.book_product.id)
    cache.delete(cache_key)
    cache_key_product = f"product_{instance.book_product.base_product_id}"
    cache.delete(cache_key_product)
    action = "créé" if created else "mis à jour"
    logger.info(f"PDF {instance.id} {action} - Caches invalidés")

@receiver(post_save, sender=Abonnement)
def invalidate_subscription_cache(sender, instance, created, **kwargs):
    cache_key = f"subscription_{instance.code}_device"
    if not instance.actif or instance.is_expired:
        cache.delete(cache_key)
        logger.info(f"Abonnement {instance.code} désactivé - Cache appareil invalidé")