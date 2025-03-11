from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (ProductTypeViewSet, CategoryViewSet, SubCategoryViewSet,
                    ProductViewSet, VariantViewSet, ReviewViewSet, OrderViewSet,
                    CartViewSet)

router = DefaultRouter()
router.register(r'product-types', ProductTypeViewSet, basename='product-types')
router.register(r'categories', CategoryViewSet, basename='categories')
router.register(r'subcategories', SubCategoryViewSet, basename='subcategories')
router.register(r'products', ProductViewSet, basename='products')
router.register(r'variants', VariantViewSet, basename='variants')
router.register(r'reviews', ReviewViewSet, basename='reviews')
router.register(r'orders', OrderViewSet, basename='orders')
router.register(r'carts', CartViewSet, basename='carts')

urlpatterns = [
    path('', include(router.urls)),
]