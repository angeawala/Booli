# product/views.py
from rest_framework import generics
from core.permissions import ReadOnlyBaseFields
from .permissions import CanCreateProduct
from .models import BaseProduct
from .serializers import BaseProductSerializer

class BaseProductCreateView(generics.CreateAPIView):
    """Permet à un utilisateur authentifié de créer un produit."""
    queryset = BaseProduct.objects.all()
    serializer_class = BaseProductSerializer
    permission_classes = [CanCreateProduct, ReadOnlyBaseFields]