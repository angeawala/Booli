# pharmacy_products/urls.py
from django.urls import path
from .views import (
    ListPharmacyProductsView, GetPharmacyProductView, CreatePharmacyProductView,
    UpdatePharmacyProductView, DeletePharmacyProductView,
    ListCategoriesView, CreateCategoryView, UpdateCategoryView, DeleteCategoryView,
    ListDoctorsView, GetDoctorView, CreateDoctorView, UpdateDoctorView, DeleteDoctorView,
    ContactDoctorView  # Nouvelle vue
)

app_name = 'pharmacy_products'

urlpatterns = [
    path('', ListPharmacyProductsView.as_view(), name='list_pharmacy'),
    path('<str:id>/', GetPharmacyProductView.as_view(), name='get_pharmacy'),
    path('create/', CreatePharmacyProductView.as_view(), name='create_pharmacy'),
    path('<str:id>/update/', UpdatePharmacyProductView.as_view(), name='update_pharmacy'),
    path('<str:id>/delete/', DeletePharmacyProductView.as_view(), name='delete_pharmacy'),
    path('categories/', ListCategoriesView.as_view(), name='list_categories'),
    path('categories/create/', CreateCategoryView.as_view(), name='create_category'),
    path('categories/<str:id>/update/', UpdateCategoryView.as_view(), name='update_category'),
    path('categories/<str:id>/delete/', DeleteCategoryView.as_view(), name='delete_category'),
    path('doctors/', ListDoctorsView.as_view(), name='list_doctors'),
    path('doctors/<str:contact_id>/', GetDoctorView.as_view(), name='get_doctor'),
    path('doctors/create/', CreateDoctorView.as_view(), name='create_doctor'),
    path('doctors/<str:contact_id>/update/', UpdateDoctorView.as_view(), name='update_doctor'),
    path('doctors/<str:contact_id>/delete/', DeleteDoctorView.as_view(), name='delete_doctor'),
    path('doctors/<str:contact_id>/contact/', ContactDoctorView.as_view(), name='contact_doctor'),  # Nouvel endpoint
]