from django.core.cache import cache
from django.db.models import Sum
from .models import Shop, Company, Doctor, Mark, Supermarket
from product.models import (
    ShopProduct, BookProduct, PharmacyProduct, CompanyProduct, 
    MarkProduct, SupermarketProduct
)

def get_products_by_shop(shop_id):
    """Récupère tous les produits liés à une boutique, avec mise en cache."""
    cache_key = f"shop_products_{shop_id}"
    products = cache.get(cache_key)
    if products is None:
        products = ShopProduct.objects.filter(shop_id=shop_id).select_related('base_product')
        cache.set(cache_key, products, timeout=3600)
    return products

def get_products_by_company(company_id):
    """Récupère tous les produits liés à une compagnie (livres et produits d’entreprise)."""
    cache_key = f"company_products_{company_id}"
    products = cache.get(cache_key)
    if products is None:
        book_products = BookProduct.objects.filter(company_id=company_id).select_related('base_product')
        company_products = CompanyProduct.objects.filter(company_id=company_id).select_related('base_product')
        products = list(book_products) + list(company_products)
        cache.set(cache_key, products, timeout=3600)
    return products

def get_products_by_doctor(doctor_id):
    """Récupère tous les produits liés à un docteur."""
    cache_key = f"doctor_products_{doctor_id}"
    products = cache.get(cache_key)
    if products is None:
        products = PharmacyProduct.objects.filter(doctor_id=doctor_id).select_related('base_product')
        cache.set(cache_key, products, timeout=3600)
    return products

def get_products_by_mark(mark_id):
    """Récupère tous les produits liés à une marque."""
    cache_key = f"mark_products_{mark_id}"
    products = cache.get(cache_key)
    if products is None:
        products = MarkProduct.objects.filter(mark_id=mark_id).select_related('base_product')
        cache.set(cache_key, products, timeout=3600)
    return products

def get_products_by_supermarket(supermarket_id):
    """Récupère tous les produits liés à un supermarché."""
    cache_key = f"supermarket_products_{supermarket_id}"
    products = cache.get(cache_key)
    if products is None:
        products = SupermarketProduct.objects.filter(supermarket_id=supermarket_id).select_related('base_product')
        cache.set(cache_key, products, timeout=3600)
    return products

def get_entity_stats(entity_model, entity_id):
    """
    Calcule des statistiques pour une entité (nombre de produits, stock total).
    Exemple : get_entity_stats(Shop, 1)
    """
    entity = entity_model.objects.get(id=entity_id)
    if entity_model == Shop:
        products = ShopProduct.objects.filter(shop=entity)
    elif entity_model == Company:
        book_products = BookProduct.objects.filter(company=entity)
        company_products = CompanyProduct.objects.filter(company=entity)
        products = book_products | company_products
    elif entity_model == Doctor:
        products = PharmacyProduct.objects.filter(doctor=entity)
    elif entity_model == Mark:
        products = MarkProduct.objects.filter(mark=entity)
    elif entity_model == Supermarket:
        products = SupermarketProduct.objects.filter(supermarket=entity)
    else:
        return {}

    total_products = products.count()
    total_stock = products.aggregate(Sum('stock'))['stock__sum'] or 0

    return {
        'entity_name': entity.name,
        'total_products': total_products,
        'total_stock': total_stock
    }

def clear_entity_cache(entity_model, entity_id):
    """Invalide le cache pour une entité spécifique."""
    cache_key = f"{entity_model.__name__.lower()}_products_{entity_id}"
    cache.delete(cache_key)