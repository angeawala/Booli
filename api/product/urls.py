from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    BaseProductViewSet, ShopProductViewSet, BookProductViewSet, 
    PharmacyProductViewSet, CompanyProductViewSet, MarkProductViewSet, 
    SupermarketProductViewSet, ReviewViewSet, PromotionViewSet, 
    CartViewSet, CartItemViewSet, CommandeViewSet
)

router = DefaultRouter()
router.register(r'base-products', BaseProductViewSet, basename='baseproduct')
router.register(r'shop-products', ShopProductViewSet, basename='shopproduct')
router.register(r'book-products', BookProductViewSet, basename='bookproduct')
router.register(r'pharmacy-products', PharmacyProductViewSet, basename='pharmacyproduct')
router.register(r'company-products', CompanyProductViewSet, basename='companyproduct')
router.register(r'mark-products', MarkProductViewSet, basename='markproduct')
router.register(r'supermarket-products', SupermarketProductViewSet, basename='supermarketproduct')
router.register(r'reviews', ReviewViewSet, basename='review')
router.register(r'promotions', PromotionViewSet, basename='promotion')
router.register(r'carts', CartViewSet, basename='cart')
router.register(r'cart-items', CartItemViewSet, basename='cartitem')
router.register(r'commandes', CommandeViewSet, basename='commande')

urlpatterns = [
    path('', include(router.urls)),
]