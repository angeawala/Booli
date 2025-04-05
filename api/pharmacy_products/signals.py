# pharmacy_products/signals.py
from django.db.models.signals import post_save
from django.dispatch import receiver
from .models import PharmacyProduct

@receiver(post_save, sender=PharmacyProduct)
def ensure_pharmacy_type(sender, instance, created, **kwargs):
    """Assure que BaseProduct.product_type est 'pharmacy' à la création."""
    if created and instance.base_product.product_type != 'pharmacy':
        instance.base_product.product_type = 'pharmacy'
        instance.base_product.save(update_fields=['product_type'])