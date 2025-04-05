# engros_products/views.py
from rest_framework import generics, status
from rest_framework.permissions import AllowAny
from core.permissions import IsCommercialProductCreatorOrStaff, ReadOnlyBaseFields
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.pagination import PageNumberPagination
from rest_framework.response import Response
from .models import EngrosProduct
from .serializers import EngrosProductSerializer

class EngrosProductPagination(PageNumberPagination):
    page_size = 40
    page_size_query_param = 'page_size'
    max_page_size = 100

class ListEngrosProductsView(generics.ListAPIView):
    """Liste publique des produits en gros."""
    queryset = EngrosProduct.objects.all()
    serializer_class = EngrosProductSerializer
    permission_classes = [AllowAny]
    pagination_class = EngrosProductPagination
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['commercial_product__category__id', 'commercial_product__subCategory__id']

class GetEngrosProductView(generics.RetrieveAPIView):
    """Récupère un produit en gros spécifique."""
    queryset = EngrosProduct.objects.all()
    serializer_class = EngrosProductSerializer
    permission_classes = [AllowAny]
    lookup_field = 'id'

class CreateEngrosProductView(generics.CreateAPIView):
    """Permet à l'auteur du CommercialProduct ou staff de créer un produit en gros."""
    queryset = EngrosProduct.objects.all()
    serializer_class = EngrosProductSerializer
    permission_classes = [IsCommercialProductCreatorOrStaff, ReadOnlyBaseFields]

    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)

class UpdateEngrosProductView(generics.UpdateAPIView):
    """Permet à l'auteur du CommercialProduct ou staff de modifier un produit en gros."""
    queryset = EngrosProduct.objects.all()
    serializer_class = EngrosProductSerializer
    permission_classes = [IsCommercialProductCreatorOrStaff, ReadOnlyBaseFields]
    lookup_field = 'id'

    def perform_update(self, serializer):
        serializer.save(updated_by=self.request.user)

class DeleteEngrosProductView(generics.DestroyAPIView):
    """Permet à l'auteur du CommercialProduct ou staff de supprimer un produit en gros."""
    queryset = EngrosProduct.objects.all()
    serializer_class = EngrosProductSerializer
    permission_classes = [IsCommercialProductCreatorOrStaff, ReadOnlyBaseFields]
    lookup_field = 'id'

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        instance.delete()
        return Response({'message': 'Produit en gros supprimé'}, status=status.HTTP_204_NO_CONTENT)