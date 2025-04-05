# utils/urls.py
from django.urls import path
from .views import (
    # Localisation
    PaysCreateView, VilleCreateView, AdresseCreateView,
    # Devises et taux de change
    ListDevisesView, CreateDeviseView, UpdateDeviseView, DeleteDeviseView,
    ListExchangeRatesView, CreateExchangeRateView, UpdateExchangeRateView, DeleteExchangeRateView
)

app_name = 'utils'

urlpatterns = [
    # Localisation (Pays, Villes, Adresses)
    path('pays/create/', PaysCreateView.as_view(), name='pays-create'),
    path('villes/create/', VilleCreateView.as_view(), name='ville-create'),
    path('adresses/create/', AdresseCreateView.as_view(), name='adresse-create'),
    
    # Devises
    path('devises/', ListDevisesView.as_view(), name='list_devises'),
    path('devises/create/', CreateDeviseView.as_view(), name='create_devise'),
    path('devises/<str:id>/update/', UpdateDeviseView.as_view(), name='update_devise'),
    path('devises/<str:id>/delete/', DeleteDeviseView.as_view(), name='delete_devise'),
    
    # Taux de change
    path('exchange-rates/', ListExchangeRatesView.as_view(), name='list_exchange_rates'),
    path('exchange-rates/create/', CreateExchangeRateView.as_view(), name='create_exchange_rate'),
    path('exchange-rates/<str:id>/update/', UpdateExchangeRateView.as_view(), name='update_exchange_rate'),
    path('exchange-rates/<str:id>/delete/', DeleteExchangeRateView.as_view(), name='delete_exchange_rate'),
]