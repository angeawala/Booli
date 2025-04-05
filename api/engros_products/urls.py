# engros_products/urls.py
from django.urls import path
from .views import (
    ListEngrosProductsView, GetEngrosProductView, CreateEngrosProductView,
    UpdateEngrosProductView, DeleteEngrosProductView
)

app_name = 'engros_products'

urlpatterns = [
    path('', ListEngrosProductsView.as_view(), name='list_engros_products'),
    path('<str:id>/', GetEngrosProductView.as_view(), name='get_engros_product'),
    path('create/', CreateEngrosProductView.as_view(), name='create_engros_product'),
    path('<str:id>/update/', UpdateEngrosProductView.as_view(), name='update_engros_product'),
    path('<str:id>/delete/', DeleteEngrosProductView.as_view(), name='delete_engros_product'),
]