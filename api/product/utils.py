from django.core.cache import cache
from django.db.models import Sum, Q
from .models import (
    BaseProduct, ShopProduct, BookProduct, PharmacyProduct, 
    CompanyProduct, MarkProduct, SupermarketProduct, 
    Review, Promotion, Cart, CartItem
)

def get_product_price(product):
    """Retourne le prix effectif d’un produit (réduit si applicable)."""
    if hasattr(product, 'discount_price') and product.discount_price:
        return product.discount_price
    return product.base_product.price

def check_stock_availability(product, quantity):
    """Vérifie si la quantité demandée est disponible en stock."""
    if hasattr(product, 'stock'):
        return product.stock >= quantity
    return True  # Si pas de stock (ex. BookProduct), considéré comme disponible

def get_all_products_by_base(base_product_id):
    """Récupère tous les produits spécifiques liés à un BaseProduct."""
    cache_key = f"all_products_by_base_{base_product_id}"
    products = cache.get(cache_key)
    if products is None:
        products = []
        for model in [ShopProduct, BookProduct, PharmacyProduct, CompanyProduct, MarkProduct, SupermarketProduct]:
            products.extend(model.objects.filter(base_product_id=base_product_id))
        cache.set(cache_key, products, timeout=3600)
    return products

def calculate_cart_total(cart):
    """Calcule le prix total d’un panier."""
    return sum(item.total_price() for item in cart.items.all())

def get_active_promotions(product):
    """Récupère les promotions actives pour un produit spécifique."""
    from django.utils import timezone
    now = timezone.now()
    if isinstance(product, ShopProduct):
        return Promotion.objects.filter(shop_product=product, start_date__lte=now, end_date__gte=now)
    elif isinstance(product, CompanyProduct):
        return Promotion.objects.filter(company_product=product, start_date__lte=now, end_date__gte=now)
    elif isinstance(product, SupermarketProduct):
        return Promotion.objects.filter(supermarket_product=product, start_date__lte=now, end_date__gte=now)
    return Promotion.objects.none()

def clear_product_cache(product):
    """Invalide le cache pour un produit spécifique."""
    base_id = product.base_product.id
    cache.delete(f"all_products_by_base_{base_id}")
    if isinstance(product, ShopProduct):
        cache.delete(f"shop_products_{product.shop.id}")
    elif isinstance(product, BookProduct):
        cache.delete(f"company_products_{product.company.id}")
    elif isinstance(product, PharmacyProduct):
        cache.delete(f"doctor_products_{product.doctor.id}")
    elif isinstance(product, CompanyProduct):
        cache.delete(f"company_products_{product.company.id}")
    elif isinstance(product, MarkProduct):
        cache.delete(f"mark_products_{product.mark.id}")
    elif isinstance(product, SupermarketProduct):
        cache.delete(f"supermarket_products_{product.supermarket.id}")