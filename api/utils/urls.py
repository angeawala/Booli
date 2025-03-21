# utils/urls.py
from django.urls import path
from .views import DeviseCreateView, PaysCreateView, VilleCreateView, AdresseCreateView

urlpatterns = [
    path('devises/create/', DeviseCreateView.as_view(), name='devise-create'),
    path('pays/create/', PaysCreateView.as_view(), name='pays-create'),
    path('villes/create/', VilleCreateView.as_view(), name='ville-create'),
    path('adresses/create/', AdresseCreateView.as_view(), name='adresse-create'),
]