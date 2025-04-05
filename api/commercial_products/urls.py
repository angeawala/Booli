# commercial_products/urls.py
from django.urls import path
from .views import (
    ListCommercialProductsView, GetCommercialProductView, CreateCommercialProductView,
    UpdateCommercialProductView, DeleteCommercialProductView,
    CreateVariantView, UpdateVariantView, DeleteVariantView,
    CreateMediaView, UpdateMediaView, DeleteMediaView,
    ListCategoriesView, CreateCategoryView, UpdateCategoryView, DeleteCategoryView,
    ListSubCategoriesView, CreateSubCategoryView, GetSubCategoryView, UpdateSubCategoryView, DeleteSubCategoryView
)

app_name = 'commercial_products'

urlpatterns = [
    path('', ListCommercialProductsView.as_view(), name='list_commercial'),
    path('<str:id>/', GetCommercialProductView.as_view(), name='get_commercial'),
    path('create/', CreateCommercialProductView.as_view(), name='create_commercial'),
    path('<str:id>/update/', UpdateCommercialProductView.as_view(), name='update_commercial'),
    path('<str:id>/delete/', DeleteCommercialProductView.as_view(), name='delete_commercial'),
    path('variants/create/', CreateVariantView.as_view(), name='create_variant'),
    path('variants/<str:id>/update/', UpdateVariantView.as_view(), name='update_variant'),
    path('variants/<str:id>/delete/', DeleteVariantView.as_view(), name='delete_variant'),
    path('media/create/', CreateMediaView.as_view(), name='create_media'),
    path('media/<str:id>/update/', UpdateMediaView.as_view(), name='update_media'),
    path('media/<str:id>/delete/', DeleteMediaView.as_view(), name='delete_media'),
    path('categories/', ListCategoriesView.as_view(), name='list_categories'),
    path('categories/create/', CreateCategoryView.as_view(), name='create_category'),
    path('categories/<str:id>/update/', UpdateCategoryView.as_view(), name='update_category'),
    path('categories/<str:id>/delete/', DeleteCategoryView.as_view(), name='delete_category'),
    path('subcategories/', ListSubCategoriesView.as_view(), name='list_subcategories'),
    path('subcategories/create/', CreateSubCategoryView.as_view(), name='create_subcategory'),
    path('subcategories/<str:id>/', GetSubCategoryView.as_view(), name='get_subcategory'),
    path('subcategories/<str:id>/update/', UpdateSubCategoryView.as_view(), name='update_subcategory'),
    path('subcategories/<str:id>/delete/', DeleteSubCategoryView.as_view(), name='delete_subcategory'),
]