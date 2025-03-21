# avis/urls.py
from django.urls import path
from .views import AvisCreateView, AvisUpdateView, AvisDeleteView

urlpatterns = [
    path('create/', AvisCreateView.as_view(), name='avis-create'),
    path('update/<uuid:pk>/', AvisUpdateView.as_view(), name='avis-update'),
    path('delete/<uuid:pk>/', AvisDeleteView.as_view(), name='avis-delete'),
]