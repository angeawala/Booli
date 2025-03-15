from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    ShopViewSet, CompanyViewSet, DoctorViewSet, 
    MarkViewSet, SupermarketViewSet
)

router = DefaultRouter()
router.register(r'shops', ShopViewSet, basename='shop')
router.register(r'companies', CompanyViewSet, basename='company')
router.register(r'doctors', DoctorViewSet, basename='doctor')
router.register(r'marks', MarkViewSet, basename='mark')
router.register(r'supermarkets', SupermarketViewSet, basename='supermarket')

urlpatterns = [
    path('', include(router.urls)),
]