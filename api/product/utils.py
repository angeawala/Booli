# product/utils.py
from django.core.cache import cache
from .models import BaseProduct
from avis.utils import get_avis_stats

def get_product_details(product_id: str) -> dict:
    """Récupère les détails d’un produit et les stats des avis avec cache."""
    cache_key = f"product_{product_id}"
    product_data = cache.get(cache_key)
    
    if not product_data:
        try:
            product = BaseProduct.objects.get(id=product_id)
            # Détails du produit
            product_data = {
                'id': str(product.id),
                'name': product.name,
                'category': str(product.category) if product.category else None,
                'subcategory': str(product.subcategory) if product.subcategory else None,
                'price': float(product.price),
                'discount_price': float(product.discount_price) if product.discount_price else None,
                'stock': product.stock,
                'devise': product.devise.code if product.devise else None,
            }
            
            # Statistiques des avis (réutilisation de avis/utils.py)
            product_data['avis_stats'] = get_avis_stats(type="product", product_id=product_id)
            
            cache.set(cache_key, product_data, timeout=3600)  # 1 heure
        except BaseProduct.DoesNotExist:
            product_data = None
    
    return product_data