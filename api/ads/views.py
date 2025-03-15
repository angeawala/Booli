from rest_framework import viewsets, permissions
from .models import Entreprise
from .serializers import EntrepriseSerializer

class EntrepriseViewSet(viewsets.ModelViewSet):
    queryset = Entreprise.objects.all()
    serializer_class = EntrepriseSerializer

    def get_permissions(self):
        """Seuls les admins peuvent créer/modifier, les autres peuvent seulement lire."""
        if self.action in ['list', 'retrieve']:  # Lecture autorisée pour tous
            permission_classes = [permissions.AllowAny]
        else:  # Modification, création, suppression uniquement pour les admins
            permission_classes = [permissions.IsAdminUser]
        return [permission() for permission in permission_classes]
