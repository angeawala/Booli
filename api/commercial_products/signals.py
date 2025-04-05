# commercial_products/signals.py
from django.db.models.signals import post_save, pre_delete
from django.dispatch import receiver
from .models import CommercialProduct

@receiver(post_save, sender=CommercialProduct)
def ensure_commercial_type(sender, instance, created, **kwargs):
    """Assure que BaseProduct.product_type est 'commercial' à la création."""
    if created and instance.base_product.product_type != 'commercial':
        instance.base_product.product_type = 'commercial'
        instance.base_product.save(update_fields=['product_type'])

@receiver(pre_delete, sender=CommercialProduct)
def delete_related_objects(sender, instance, **kwargs):
    """Supprime les Variant et Media associés avant la suppression du produit."""
    instance.variants.all().delete()
    instance.media.all().delete()