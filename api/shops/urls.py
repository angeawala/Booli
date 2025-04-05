# shop/urls.py
from django.urls import path
from .views import (
    ListShopsView, GetShopView, CreateShopView, UpdateShopView, DeleteShopView,
    ListShopCategoriesView, GetShopCategoryView, CreateShopCategoryView, UpdateShopCategoryView, DeleteShopCategoryView,
    ListShopSubCategoriesView, GetShopSubCategoryView, CreateShopSubCategoryView, UpdateShopSubCategoryView, DeleteShopSubCategoryView,
    ListShopProductsView, GetShopProductView, CreateShopProductView, UpdateShopProductView, DeleteShopProductView
)

app_name = 'shop'

urlpatterns = [
    # Shops
    path('', ListShopsView.as_view(), name='list_shops'),
    path('<str:id>/', GetShopView.as_view(), name='get_shop'),
    path('create/', CreateShopView.as_view(), name='create_shop'),
    path('<str:id>/update/', UpdateShopView.as_view(), name='update_shop'),
    path('<str:id>/delete/', DeleteShopView.as_view(), name='delete_shop'),
    # Shop Categories
    path('categories/', ListShopCategoriesView.as_view(), name='list_categories'),
    path('categories/<str:id>/', GetShopCategoryView.as_view(), name='get_category'),
    path('categories/create/', CreateShopCategoryView.as_view(), name='create_category'),
    path('categories/<str:id>/update/', UpdateShopCategoryView.as_view(), name='update_category'),
    path('categories/<str:id>/delete/', DeleteShopCategoryView.as_view(), name='delete_category'),
    # Shop SubCategories
    path('subcategories/', ListShopSubCategoriesView.as_view(), name='list_subcategories'),
    path('subcategories/<str:id>/', GetShopSubCategoryView.as_view(), name='get_subcategory'),
    path('subcategories/create/', CreateShopSubCategoryView.as_view(), name='create_subcategory'),
    path('subcategories/<str:id>/update/', UpdateShopSubCategoryView.as_view(), name='update_subcategory'),
    path('subcategories/<str:id>/delete/', DeleteShopSubCategoryView.as_view(), name='delete_subcategory'),
    # Shop Products
    path('products/', ListShopProductsView.as_view(), name='list_products'),
    path('products/<str:id>/', GetShopProductView.as_view(), name='get_product'),
    path('products/create/', CreateShopProductView.as_view(), name='create_product'),
    path('products/<str:id>/update/', UpdateShopProductView.as_view(), name='update_product'),
    path('products/<str:id>/delete/', DeleteShopProductView.as_view(), name='delete_product'),
]