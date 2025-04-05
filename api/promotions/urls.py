# promotions/urls.py
from django.urls import path
from .views import (
    ListPromotionsView, GetPromotionView, CreatePromotionView,
    UpdatePromotionView, DeletePromotionView
)

app_name = 'promotions'

urlpatterns = [
    path('', ListPromotionsView.as_view(), name='list_promotions'),
    path('<str:id>/', GetPromotionView.as_view(), name='get_promotion'),
    path('create/', CreatePromotionView.as_view(), name='create_promotion'),
    path('<str:id>/update/', UpdatePromotionView.as_view(), name='update_promotion'),
    path('<str:id>/delete/', DeletePromotionView.as_view(), name='delete_promotion'),
]