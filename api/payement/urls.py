# payement/urls.py
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (DeviseViewSet, ExchangeRateViewSet, PaymentMethodViewSet,
                    PaymentViewSet, InvoiceViewSet)

router = DefaultRouter()
router.register(r'devises', DeviseViewSet, basename='devises')
router.register(r'exchange-rates', ExchangeRateViewSet, basename='exchange-rates')
router.register(r'payment-methods', PaymentMethodViewSet, basename='payment-methods')
router.register(r'payments', PaymentViewSet, basename='payments')
router.register(r'invoices', InvoiceViewSet, basename='invoices')

urlpatterns = [
    path('', include(router.urls)),
]