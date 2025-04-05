# cart/urls.py
from django.urls import path
from .views import (
    GetCartView, AddToCartView, UpdateCartItemView, DeleteCartItemView,
    ClearCartView, CalculatePriceView, CalculateCartTotalView
)

app_name = 'cart'

urlpatterns = [
    path('', GetCartView.as_view(), name='get_cart'),
    path('add/', AddToCartView.as_view(), name='add_to_cart'),
    path('items/<str:item_id>/update/', UpdateCartItemView.as_view(), name='update_cart_item'),
    path('items/<str:item_id>/delete/', DeleteCartItemView.as_view(), name='delete_cart_item'),
    path('clear/', ClearCartView.as_view(), name='clear_cart'),
    path('calculate-price/', CalculatePriceView.as_view(), name='calculate_price'),
    path('calculate-total/', CalculateCartTotalView.as_view(), name='calculate_cart_total'),
]