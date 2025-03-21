# product/urls.py
from django.urls import path
from .views import BaseProductCreateView

urlpatterns = [
    path('product/create/', BaseProductCreateView.as_view(), name='product-create'),
]