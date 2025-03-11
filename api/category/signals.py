# myapp/signals.py
from django.db.models.signals import post_save, post_delete
from django.dispatch import receiver
from django.core.cache import cache
from .models import Category, SubCategory

@receiver(post_save, sender=Category)
@receiver(post_delete, sender=Category)
def invalidate_category_cache(sender, instance, **kwargs):
    cache.delete('category_list')

@receiver(post_save, sender=SubCategory)
@receiver(post_delete, sender=SubCategory)
def invalidate_subcategory_cache(sender, instance, **kwargs):
    cache.delete('category_list')