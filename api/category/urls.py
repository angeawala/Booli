# categories/urls.py
from django.urls import path
from .views import (
    CategoryListView, CategorySearchView,
    CategoryCreateUpdateView, SubCategoryCreateUpdateView
)

urlpatterns = [
    path('categories/', CategoryListView.as_view(), name='category_list'),
    path('categories/search/', CategorySearchView.as_view(), name='search_categories'),
    path('categories/create/', CategoryCreateUpdateView.as_view(), name='create_category'),
    path('categories/update/<uuid:pk>/', CategoryCreateUpdateView.as_view(), name='update_category'),
    path('subcategories/create/', SubCategoryCreateUpdateView.as_view(), name='create_subcategory'),
    path('subcategories/update/<uuid:pk>/', SubCategoryCreateUpdateView.as_view(), name='update_subcategory'),
]