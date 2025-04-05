# base_products/urls.py
from django.urls import path
from .views import (
    ListReviewsView, CreateReviewView, UpdateReviewView, DeleteReviewView,
    GetProductView, ListProductsView
)

app_name = 'base_products'

urlpatterns = [
    path('reviews/<str:product_id>/', ListReviewsView.as_view(), name='list_reviews'),
    path('reviews/', CreateReviewView.as_view(), name='create_review'),
    path('reviews/<str:review_id>/', UpdateReviewView.as_view(), name='update_review'),
    path('reviews/<str:review_id>/delete/', DeleteReviewView.as_view(), name='delete_review'),
    path('products/<str:product_id>/', GetProductView.as_view(), name='get_product'),
    path('products/', ListProductsView.as_view(), name='list_products'),
]