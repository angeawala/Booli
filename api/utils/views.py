# utils/views.py
from rest_framework import viewsets, permissions
from rest_framework.response import Response
from rest_framework.decorators import action
from drf_spectacular.utils import extend_schema
from .models import Country, City, Address, PlanAbonnement, Abonnement
from .serializers import (
    CountrySerializer, CitySerializer, AddressSerializer,
    PlanAbonnementSerializer, AbonnementSerializer
)

class CountryViewSet(viewsets.ModelViewSet):
    queryset = Country.objects.all()
    serializer_class = CountrySerializer
    permission_classes = [permissions.DjangoModelPermissions]  # Nécessite can_manage_countries

class CityViewSet(viewsets.ModelViewSet):
    queryset = City.objects.all()
    serializer_class = CitySerializer
    permission_classes = [permissions.DjangoModelPermissions]  # Nécessite can_manage_cities

class AddressViewSet(viewsets.ModelViewSet):
    queryset = Address.objects.all()
    serializer_class = AddressSerializer
    permission_classes = [permissions.DjangoModelPermissions]  # Nécessite can_manage_addresses

class PlanAbonnementViewSet(viewsets.ModelViewSet):
    queryset = PlanAbonnement.objects.all()
    serializer_class = PlanAbonnementSerializer
    permission_classes = [permissions.IsAdminUser]  # Réservé aux admins

class AbonnementViewSet(viewsets.ModelViewSet):
    serializer_class = AbonnementSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        if self.request.user.is_staff:
            return Abonnement.objects.all()
        return Abonnement.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user, created_by=self.request.user)

    # Plus besoin de @extend_schema ici, car le typage sera dans l'URL
    def retrieve(self, request, *args, **kwargs):
        return super().retrieve(request, *args, **kwargs)

    @action(detail=False, methods=['get'])
    def current(self, request):
        """Retourne l’abonnement actif de l’utilisateur."""
        abonnement = Abonnement.objects.filter(user=request.user, actif=True).first()
        if not abonnement:
            return Response({"detail": "Aucun abonnement actif"}, status=404)
        serializer = self.get_serializer(abonnement)
        return Response(serializer.data)