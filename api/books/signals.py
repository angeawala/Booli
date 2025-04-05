# books/signals.py
from django.db.models.signals import post_save
from django.dispatch import receiver
from .models import Book

@receiver(post_save, sender=Book)
def ensure_book_type(sender, instance, created, **kwargs):
    if created and instance.base_product.product_type != 'book':
        instance.base_product.product_type = 'book'
        instance.base_product.save(update_fields=['product_type'])