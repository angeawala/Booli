# base_products/signals.py
from django.db.models.signals import post_save
from django.dispatch import receiver
from django.db.models import Avg
from .models import Review

@receiver(post_save, sender=Review)
def update_product_rating(sender, instance, created, **kwargs):
    if created:
        product = instance.product
        avg_rating = product.reviews.aggregate(Avg('note'))['note__avg']
        # Optionnel : Stocker la moyenne dans un champ si besoin
        # product.avg_rating = avg_rating
        # product.save(update_fields=['avg_rating'])