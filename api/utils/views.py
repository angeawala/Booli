# utils/views.py
from rest_framework import generics, status
from core.permissions import ReadOnlyBaseFields, IsStaffPermission
from rest_framework.permissions import AllowAny
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import SearchFilter, OrderingFilter
from rest_framework.response import Response
from .models import Devise, TauxEchange, Pays, Ville, Adresse
from .serializers import (
    DeviseSerializer, DeviseListSerializer, TauxEchangeSerializer, TauxEchangeListSerializer,
    PaysSerializer, VilleSerializer, AdresseSerializer
)

class ListDevisesView(generics.ListAPIView):
    """Liste publique des devises avec filtres, tris et recherches."""
    queryset = Devise.objects.all()
    serializer_class = DeviseListSerializer
    permission_classes = [AllowAny]
    filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter]
    filterset_fields = ['code', 'name']  # Filtres exacts
    search_fields = ['name', 'code', 'symbol']  # Recherche texte
    ordering_fields = ['name', 'code', 'created_at']  # Tris
    ordering = ['code']  # Tri par défaut

class DeviseCreateView(generics.CreateAPIView):
    """Permet aux admins de créer une devise."""
    queryset = Devise.objects.all()
    serializer_class = DeviseSerializer
    permission_classes = [IsStaffPermission, ReadOnlyBaseFields]

class UpdateDeviseView(generics.UpdateAPIView):
    """Permet aux admins de modifier une devise."""
    queryset = Devise.objects.all()
    serializer_class = DeviseSerializer
    permission_classes = [IsStaffPermission, ReadOnlyBaseFields]
    lookup_field = 'id'

class DeleteDeviseView(generics.DestroyAPIView):
    """Permet aux admins de supprimer une devise."""
    queryset = Devise.objects.all()
    serializer_class = DeviseSerializer
    permission_classes = [IsStaffPermission, ReadOnlyBaseFields]
    lookup_field = 'id'

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        instance.delete()
        return Response({'message': 'Devise supprimée'}, status=status.HTTP_204_NO_CONTENT)

class ListExchangeRatesView(generics.ListAPIView):
    """Liste des taux de change (staff uniquement) avec filtres, tris et recherches."""
    queryset = TauxEchange.objects.all()
    serializer_class = TauxEchangeListSerializer
    permission_classes = [IsStaffPermission, ReadOnlyBaseFields]
    filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter]
    filterset_fields = ['devise_from__code', 'devise_to__code']  # Filtres exacts
    search_fields = ['devise_from__code', 'devise_to__code']  # Recherche texte
    ordering_fields = ['taux', 'updated_at']  # Tris
    ordering = ['-updated_at']  # Tri par défaut

class CreateExchangeRateView(generics.CreateAPIView):
    """Permet aux admins de créer un taux de change."""
    queryset = TauxEchange.objects.all()
    serializer_class = TauxEchangeSerializer
    permission_classes = [IsStaffPermission, ReadOnlyBaseFields]

class UpdateExchangeRateView(generics.UpdateAPIView):
    """Permet aux admins de modifier un taux de change."""
    queryset = TauxEchange.objects.all()
    serializer_class = TauxEchangeSerializer
    permission_classes = [IsStaffPermission, ReadOnlyBaseFields]
    lookup_field = 'id'

class DeleteExchangeRateView(generics.DestroyAPIView):
    """Permet aux admins de supprimer un taux de change."""
    queryset = TauxEchange.objects.all()
    serializer_class = TauxEchangeSerializer
    permission_classes = [IsStaffPermission, ReadOnlyBaseFields]
    lookup_field = 'id'

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        instance.delete()
        return Response({'message': 'Taux de change supprimé'}, status=status.HTTP_204_NO_CONTENT)

class PaysCreateView(generics.CreateAPIView):
    """Permet aux admins de créer un pays."""
    queryset = Pays.objects.all()
    serializer_class = PaysSerializer
    permission_classes = [IsStaffPermission, ReadOnlyBaseFields]

class VilleCreateView(generics.CreateAPIView):
    """Permet aux admins de créer une ville."""
    queryset = Ville.objects.all()
    serializer_class = VilleSerializer
    permission_classes = [IsStaffPermission, ReadOnlyBaseFields]

class AdresseCreateView(generics.CreateAPIView):
    """Permet à tout utilisateur authentifié de créer une adresse."""
    queryset = Adresse.objects.all()
    serializer_class = AdresseSerializer
    permission_classes = [ReadOnlyBaseFields]

class CreateDeviseView(generics.CreateAPIView):
    """Permet aux admins de créer une devise."""
    queryset = Devise.objects.all()
    serializer_class = DeviseSerializer
    permission_classes = [IsStaffPermission, ReadOnlyBaseFields]

    def perform_create(self, serializer):
        # Récupérer l'utilisateur connecté pour created_by
        serializer.save(created_by=self.request.user)