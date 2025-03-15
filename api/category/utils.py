from django.core.cache import cache
from django.db.models import Count, Q
from .models import Category
from product.models import BaseProduct
import logging

logger = logging.getLogger(__name__)

def get_products_by_category(category_id):
    """
    Récupère tous les produits liés à une catégorie ou ses sous-catégories, avec mise en cache.
    """
    cache_key = f"category_products_{category_id}"
    products = cache.get(cache_key)
    
    if products is None:
        try:
            category = Category.objects.get(id=category_id)
            products = BaseProduct.objects.filter(
                Q(category=category) | Q(subcategory__category=category)
            ).distinct()
            cache.set(cache_key, list(products), timeout=3600)  # Cache pendant 1 heure
        except Category.DoesNotExist:
            return []

    return products

def get_products_by_subcategory(subcategory_id):
    """
    Récupère tous les produits liés à une sous-catégorie, avec mise en cache.
    """
    cache_key = f"subcategory_products_{subcategory_id}"
    products = cache.get(cache_key)
    
    if products is None:
        products = list(BaseProduct.objects.filter(subcategory_id=subcategory_id))
        cache.set(cache_key, products, timeout=3600)

    return products

def validate_category_hierarchy(category, subcategory=None):
    """
    Vérifie la cohérence d’une catégorie ou sous-catégorie.
    Retourne True si valide, sinon lève une exception.
    """
    if subcategory and subcategory.category != category:
        raise ValueError(f"La sous-catégorie {subcategory.name} n’appartient pas à la catégorie {category.name}.")
    return True

def get_category_tree():
    """
    Construit une arborescence des catégories et sous-catégories.
    Retourne une liste de dictionnaires pour une API ou un affichage.
    """
    categories = Category.objects.prefetch_related('subcategories').annotate(
        product_count=Count('base_products', distinct=True) + Count('subcategories__base_products', distinct=True)
    )

    tree = [
        {
            'id': category.id,
            'name': category.name,
            'product_count': category.product_count,
            'subcategories': [
                {
                    'id': sub.id,
                    'name': sub.name,
                    'product_count': BaseProduct.objects.filter(subcategory=sub).count()
                }
                for sub in category.subcategories.all()
            ]
        }
        for category in categories
    ]
    
    return tree

def clear_category_cache(category_id=None, subcategory_id=None):
    """
    Invalide le cache pour une catégorie ou sous-catégorie spécifique.
    """
    if category_id:
        cache.delete(f"category_products_{category_id}")
    if subcategory_id:
        cache.delete(f"subcategory_products_{subcategory_id}")
