# books/views.py
from django.db import transaction
from rest_framework import generics, status
from rest_framework.permissions import AllowAny
from core.permissions import ReadOnlyBaseFields, IsCreatorOrStaff
from django_filters.rest_framework import DjangoFilterBackend, FilterSet, NumberFilter
from rest_framework.filters import SearchFilter, OrderingFilter
from rest_framework.response import Response
from rest_framework.pagination import PageNumberPagination
from .models import Book, BookCategory
from .serializers import BookSerializer, BookCategorySerializer

class StandardResultsPagination(PageNumberPagination):
    page_size = 12
    page_size_query_param = 'page_size'
    max_page_size = 100

class BookFilter(FilterSet):
    prix_min = NumberFilter(field_name='base_product__prix_normal__valeur', lookup_expr='gte')
    prix_max = NumberFilter(field_name='base_product__prix_normal__valeur', lookup_expr='lte')
    class Meta:
        model = Book
        fields = ['prix_min', 'prix_max']

class ListBooksView(generics.ListAPIView):
    """Liste publique des livres avec pagination."""
    queryset = Book.objects.all()
    serializer_class = BookSerializer
    permission_classes = [AllowAny]
    pagination_class = StandardResultsPagination
    filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter]
    filterset_fields = ['category__id', 'genre', 'langue']
    filterset_class = BookFilter
    search_fields = ['base_product__name', 'base_product__description']
    ordering_fields = ['base_product__name', 'base_product__prix_normal__valeur', 'parution']
    ordering = ['base_product__name']

class GetBookView(generics.RetrieveAPIView):
    """Récupère un livre spécifique."""
    queryset = Book.objects.all()
    serializer_class = BookSerializer
    permission_classes = [AllowAny]
    lookup_field = 'base_product__id'

class CreateBookView(generics.CreateAPIView):
    """Permet à tous de créer un livre."""
    queryset = Book.objects.all()
    serializer_class = BookSerializer
    permission_classes = [AllowAny, ReadOnlyBaseFields]

    @transaction.atomic
    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user if self.request.user.is_authenticated else None)

class UpdateBookView(generics.UpdateAPIView):
    """Permet au créateur ou au staff de modifier un livre."""
    queryset = Book.objects.all()
    serializer_class = BookSerializer
    permission_classes = [IsCreatorOrStaff, ReadOnlyBaseFields]
    lookup_field = 'base_product__id'

    def perform_update(self, serializer):
        serializer.save(updated_by=self.request.user)

class DeleteBookView(generics.DestroyAPIView):
    """Permet au créateur ou au staff de supprimer un livre."""
    queryset = Book.objects.all()
    serializer_class = BookSerializer
    permission_classes = [IsCreatorOrStaff, ReadOnlyBaseFields]
    lookup_field = 'base_product__id'

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        instance.base_product.delete()  # Supprime aussi le BaseProduct
        return Response({'message': 'Livre supprimé'}, status=status.HTTP_204_NO_CONTENT)

class ListBookCategoriesView(generics.ListAPIView):
    """Liste publique des catégories de livres avec pagination."""
    queryset = BookCategory.objects.all()
    serializer_class = BookCategorySerializer
    permission_classes = [AllowAny]
    pagination_class = StandardResultsPagination

class CreateBookCategoryView(generics.CreateAPIView):
    """Permet à tous de créer une catégorie."""
    queryset = BookCategory.objects.all()
    serializer_class = BookCategorySerializer
    permission_classes = [AllowAny, ReadOnlyBaseFields]

    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user if self.request.user.is_authenticated else None)

class UpdateBookCategoryView(generics.UpdateAPIView):
    """Permet au créateur ou au staff de modifier une catégorie."""
    queryset = BookCategory.objects.all()
    serializer_class = BookCategorySerializer
    permission_classes = [IsCreatorOrStaff, ReadOnlyBaseFields]
    lookup_field = 'id'

    def perform_update(self, serializer):
        serializer.save(updated_by=self.request.user)

class DeleteBookCategoryView(generics.DestroyAPIView):
    """Permet au créateur ou au staff de supprimer une catégorie."""
    queryset = BookCategory.objects.all()
    serializer_class = BookCategorySerializer
    permission_classes = [IsCreatorOrStaff, ReadOnlyBaseFields]
    lookup_field = 'id'

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        instance.delete()
        return Response({'message': 'Catégorie supprimée'}, status=status.HTTP_204_NO_CONTENT)