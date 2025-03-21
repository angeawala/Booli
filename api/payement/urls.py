# payement/urls.py
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ( PaymentMethodViewSet,
                    PaymentViewSet, InvoiceViewSet)

router = DefaultRouter()
router.register(r'payment-methods', PaymentMethodViewSet, basename='payment-methods')
router.register(r'payments', PaymentViewSet, basename='payments')
router.register(r'invoices', InvoiceViewSet, basename='invoices')

urlpatterns = [
    path('', include(router.urls)),
]