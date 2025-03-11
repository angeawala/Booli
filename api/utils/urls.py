# api/urls.py
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from utils.views import (
    CountryViewSet, CityViewSet, AddressViewSet,
    PlanAbonnementViewSet, AbonnementViewSet
)

router = DefaultRouter()
router.register(r'countries', CountryViewSet, basename='country')
router.register(r'cities', CityViewSet, basename='city')
router.register(r'addresses', AddressViewSet, basename='address')
router.register(r'plans-abonnements', PlanAbonnementViewSet, basename='plan-abonnement')
# On n’enregistre pas AbonnementViewSet dans le routeur pour les actions avec id

# Définir manuellement les routes avec typage pour AbonnementViewSet
abonnement_viewset = AbonnementViewSet.as_view({
    'get': 'retrieve',
    'put': 'update',
    'patch': 'partial_update',
    'delete': 'destroy'
})
abonnement_list = AbonnementViewSet.as_view({
    'get': 'list',
    'post': 'create'
})
abonnement_current = AbonnementViewSet.as_view({'get': 'current'})

urlpatterns = [
    path('', include(router.urls)),
    path('abonnements/', abonnement_list, name='abonnement-list'),
    path('abonnements/<int:id>/', abonnement_viewset, name='abonnement-detail'),
    path('abonnements/current/', abonnement_current, name='abonnement-current'),
]