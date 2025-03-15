# category/urls.py
from django.urls import path
from .views import (
    CategoryListView, CategoryProductsView, SubCategoryProductsView, CategorySearchView, 
    CategoryCreateUpdateView, SubCategoryCreateUpdateView
)

urlpatterns = [
    path('categories/', CategoryListView.as_view(), name='category_list'),
    path('categories/<uuid:category_id>/products/', CategoryProductsView.as_view(), name='category_products'),
    path('subcategories/<uuid:subcategory_id>/products/', SubCategoryProductsView.as_view(), name='subcategory_products'),
    path('categories/search/', CategorySearchView.as_view(), name='search_categories'),
    path('categories/create/', CategoryCreateUpdateView.as_view(), name='create_category'),
    path('subcategories/create/', SubCategoryCreateUpdateView.as_view(), name='create_subcategory'),
]
