# utils/views.py
from rest_framework import generics
from core.permissions import ReadOnlyBaseFields, IsStaffPermission
from .models import Devise, Pays, Ville, Adresse
from .serializers import DeviseSerializer, PaysSerializer, VilleSerializer, AdresseSerializer

class DeviseCreateView(generics.CreateAPIView):
    """Permet aux admins de créer une devise."""
    queryset = Devise.objects.all()
    serializer_class = DeviseSerializer
    permission_classes = [IsStaffPermission, ReadOnlyBaseFields]

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