from django.core.cache import cache
from django.db.models import Avg, Q
from django.utils import timezone
from product.models import Review, CartItem
from .models import Trend

def calculate_trend_score(base_product, period='weekly'):
    """
    Calcule le score de tendance pour un produit sur une période donnée.
    Formule : (moyenne des avis * 10) + (ajouts au panier * 5).
    """
    # Filtrer les données par période
    now = timezone.now()
    if period == 'daily':
        start_date = now - timezone.timedelta(days=1)
    elif period == 'weekly':
        start_date = now - timezone.timedelta(weeks=1)
    elif period == 'monthly':
        start_date = now - timezone.timedelta(days=30)
    else:
        start_date = None

    # Avis pour tous les produits spécifiques liés au BaseProduct
    reviews = Review.objects.filter(
        Q(shop_product__base_product=base_product) |
        Q(book_product__base_product=base_product) |
        Q(pharmacy_product__base_product=base_product) |
        Q(company_product__base_product=base_product) |
        Q(mark_product__base_product=base_product) |
        Q(supermarket_product__base_product=base_product)
    )
    if start_date:
        reviews = reviews.filter(created_at__gte=start_date)
    avg_rating = reviews.aggregate(Avg('rating'))['rating__avg'] or 0

    # Ajouts au panier
    cart_items = CartItem.objects.filter(
        Q(shop_product__base_product=base_product) |
        Q(book_product__base_product=base_product) |
        Q(pharmacy_product__base_product=base_product) |
        Q(company_product__base_product=base_product) |
        Q(mark_product__base_product=base_product) |
        Q(supermarket_product__base_product=base_product)
    )
    if start_date:
        cart_items = cart_items.filter(created_at__gte=start_date)
    cart_count = cart_items.count()

    # Score = (moyenne des avis * 10) + (nombre d’ajouts au panier * 5)
    return (avg_rating * 10) + (cart_count * 5)

def update_trends(period='weekly'):
    """Met à jour les tendances pour tous les produits pour une période donnée."""
    from product.models import BaseProduct
    for base_product in BaseProduct.objects.all():
        score = calculate_trend_score(base_product, period)
        Trend.objects.update_or_create(
            base_product=base_product,
            period=period,
            defaults={'score': score}
        )

def get_trending_products(period='weekly', limit=10):
    """Récupère les produits les plus tendance pour une période donnée."""
    cache_key = f"trending_products_{period}_{limit}"
    products = cache.get(cache_key)
    if products is None:
        trends = Trend.objects.filter(period=period).order_by('-score')[:limit]
        products = [trend.base_product for trend in trends]
        cache.set(cache_key, products, timeout=3600)
    return products