# avis/views.py
from rest_framework import generics
from core.permissions import ReadOnlyBaseFields
from .permissions import IsCreatorOrStaff
from .models import Avis
from .serializers import AvisSerializer

class AvisCreateView(generics.CreateAPIView):
    """Permet à un utilisateur authentifié de créer un avis."""
    queryset = Avis.objects.all()
    serializer_class = AvisSerializer
    permission_classes = [ReadOnlyBaseFields]

class AvisUpdateView(generics.UpdateAPIView):
    """Permet au créateur ou staff de modifier un avis."""
    queryset = Avis.objects.all()
    serializer_class = AvisSerializer
    permission_classes = [IsCreatorOrStaff, ReadOnlyBaseFields]

class AvisDeleteView(generics.DestroyAPIView):
    """Permet au créateur ou staff de supprimer un avis."""
    queryset = Avis.objects.all()
    serializer_class = AvisSerializer
    permission_classes = [IsCreatorOrStaff, ReadOnlyBaseFields]