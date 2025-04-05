# books/urls.py
from django.urls import path
from .views import (
    ListBooksView, GetBookView, CreateBookView, UpdateBookView, DeleteBookView,
    ListBookCategoriesView, CreateBookCategoryView, UpdateBookCategoryView, DeleteBookCategoryView
)

app_name = 'books'

urlpatterns = [
    path('', ListBooksView.as_view(), name='list_books'),
    path('<str:id>/', GetBookView.as_view(), name='get_book'),
    path('create/', CreateBookView.as_view(), name='create_book'),
    path('<str:id>/update/', UpdateBookView.as_view(), name='update_book'),
    path('<str:id>/delete/', DeleteBookView.as_view(), name='delete_book'),
    path('categories/', ListBookCategoriesView.as_view(), name='list_categories'),
    path('categories/create/', CreateBookCategoryView.as_view(), name='create_category'),
    path('categories/<str:id>/update/', UpdateBookCategoryView.as_view(), name='update_category'),
    path('categories/<str:id>/delete/', DeleteBookCategoryView.as_view(), name='delete_category'),
]