from django.db.models.signals import post_save
from django.dispatch import receiver
from product.models import Review, CartItem
from .utils import calculate_trend_score
from .models import Trend
import logging

logger = logging.getLogger(__name__)

@receiver(post_save, sender=Review)
def update_trend_on_review(sender, instance, created, **kwargs):
    """Met à jour la tendance quand un avis est ajouté."""
    if created:
        product = (instance.shop_product or instance.book_product or instance.pharmacy_product or 
                   instance.company_product or instance.mark_product or instance.supermarket_product)
        periods = ['daily', 'weekly', 'monthly']
        for period in periods:
            score = calculate_trend_score(product.base_product, period)
            Trend.objects.update_or_create(
                base_product=product.base_product,
                period=period,
                defaults={'score': score}
            )
        logger.info(f"Tendance mise à jour pour {product.base_product.name} après ajout d’un avis")

@receiver(post_save, sender=CartItem)
def update_trend_on_cart_item(sender, instance, created, **kwargs):
    """Met à jour la tendance quand un produit est ajouté au panier."""
    if created:
        product = (instance.shop_product or instance.book_product or instance.pharmacy_product or 
                   instance.company_product or instance.mark_product or instance.supermarket_product)
        periods = ['daily', 'weekly', 'monthly']
        for period in periods:
            score = calculate_trend_score(product.base_product, period)
            Trend.objects.update_or_create(
                base_product=product.base_product,
                period=period,
                defaults={'score': score}
            )
        logger.info(f"Tendance mise à jour pour {product.base_product.name} après ajout au panier")