# base_products/views.py
from rest_framework import generics, status
from rest_framework.permissions import AllowAny, IsAuthenticated
from core.permissions import IsStaffPermission, ReadOnlyBaseFields, IsCreatorOrStaff
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import SearchFilter, OrderingFilter
from rest_framework.response import Response
from .models import BaseProduct, Review
from .serializers import BaseProductSerializer, ReviewSerializer

class ListProductsView(generics.ListAPIView):
    """Liste publique des produits avec filtres, tris et recherches."""
    queryset = BaseProduct.objects.all()
    serializer_class = BaseProductSerializer
    permission_classes = [AllowAny]
    filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter]
    filterset_fields = ['product_type', 'is_available']
    search_fields = ['name', 'description']
    ordering_fields = ['name', 'prix_normal__valeur', 'created_at']
    ordering = ['name']

class GetProductView(generics.RetrieveAPIView):
    """Récupère un produit spécifique (public)."""
    queryset = BaseProduct.objects.all()
    serializer_class = BaseProductSerializer
    permission_classes = [AllowAny]
    lookup_field = 'id'

# base_products/views.py (extrait corrigé)
class ListReviewsView(generics.ListAPIView):
    """Liste publique des avis pour un produit spécifique."""
    serializer_class = ReviewSerializer
    permission_classes = [AllowAny]
    filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter]
    search_fields = ['commentaire']
    ordering_fields = ['note', 'created_at']
    ordering = ['-created_at']
    queryset = Review.objects.none()  # Ajouté pour éviter l’erreur

    def get_queryset(self):
        if getattr(self, "swagger_fake_view", False):  # Gestion génération schéma
            return self.queryset
        product_id = self.kwargs['product_id']
        return Review.objects.filter(product__id=product_id)

class CreateReviewView(generics.CreateAPIView):
    """Permet aux utilisateurs authentifiés de créer un avis."""
    queryset = Review.objects.all()
    serializer_class = ReviewSerializer
    permission_classes = [IsAuthenticated, ReadOnlyBaseFields]

    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)

class UpdateReviewView(generics.UpdateAPIView):
    """Permet au créateur ou au staff de modifier un avis."""
    queryset = Review.objects.all()
    serializer_class = ReviewSerializer
    permission_classes = [IsCreatorOrStaff, ReadOnlyBaseFields]
    lookup_field = 'id'

    def perform_update(self, serializer):
        serializer.save(updated_by=self.request.user)

class DeleteReviewView(generics.DestroyAPIView):
    """Permet au créateur ou au staff de supprimer un avis."""
    queryset = Review.objects.all()
    serializer_class = ReviewSerializer
    permission_classes = [IsCreatorOrStaff, ReadOnlyBaseFields]
    lookup_field = 'id'

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        instance.delete()
        return Response({'message': 'Avis supprimé'}, status=status.HTTP_204_NO_CONTENT)