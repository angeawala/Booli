# pharmacope/urls.py
from django.urls import path
from .views import PharmacopeProductListCreateView, PharmacopeProductDetailView

urlpatterns = [
    path('pharma/', PharmacopeProductListCreateView.as_view(), name='pharmacope-product-list-create'),
    path('pharma/<uuid:id>/', PharmacopeProductDetailView.as_view(), name='pharmacope-product-detail'),
]