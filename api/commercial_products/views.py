# commercial_products/views.py (extrait corrigé)
from django.db import transaction
from rest_framework import generics, status
from rest_framework.permissions import AllowAny, IsAuthenticated
from core.permissions import IsStaffPermission, ReadOnlyBaseFields, IsCreatorOrStaff
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import SearchFilter
from rest_framework.response import Response
from rest_framework.pagination import PageNumberPagination
from .models import CommercialProduct, Variant, Media, CommercialCategory, CommercialSubCategory
from .serializers import (
    CommercialProductSerializer, VariantSerializer, MediaSerializer,
    CommercialCategorySerializer, CommercialSubCategorySerializer
)
from .filters import CommercialProductFilter  # Import ajouté

class CommercialProductPagination(PageNumberPagination):
    page_size = 40
    page_size_query_param = 'page_size'
    max_page_size = 100

class ListCommercialProductsView(generics.ListAPIView):
    queryset = CommercialProduct.objects.all()
    serializer_class = CommercialProductSerializer
    permission_classes = [AllowAny]
    pagination_class = CommercialProductPagination
    filter_backends = [DjangoFilterBackend, SearchFilter]
    filterset_class = CommercialProductFilter  # Remplacé filterset_fields
    search_fields = ['base_product__name']

class GetCommercialProductView(generics.RetrieveAPIView):
    queryset = CommercialProduct.objects.all()
    serializer_class = CommercialProductSerializer
    permission_classes = [AllowAny]
    lookup_field = 'base_product__id'

class CreateCommercialProductView(generics.CreateAPIView):
    queryset = CommercialProduct.objects.all()
    serializer_class = CommercialProductSerializer
    permission_classes = [IsAuthenticated, ReadOnlyBaseFields]

    @transaction.atomic
    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)

class UpdateCommercialProductView(generics.UpdateAPIView):
    queryset = CommercialProduct.objects.all()
    serializer_class = CommercialProductSerializer
    permission_classes = [IsCreatorOrStaff, ReadOnlyBaseFields]
    lookup_field = 'base_product__id'

    def perform_update(self, serializer):
        serializer.save(updated_by=self.request.user)

class DeleteCommercialProductView(generics.DestroyAPIView):
    queryset = CommercialProduct.objects.all()
    serializer_class = CommercialProductSerializer
    permission_classes = [IsCreatorOrStaff, ReadOnlyBaseFields]
    lookup_field = 'base_product__id'

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        instance.base_product.delete()
        return Response({'message': 'Produit supprimé'}, status=status.HTTP_204_NO_CONTENT)

class CreateVariantView(generics.CreateAPIView):
    queryset = Variant.objects.all()
    serializer_class = VariantSerializer
    permission_classes = [IsAuthenticated, ReadOnlyBaseFields]

    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)

class UpdateVariantView(generics.UpdateAPIView):
    queryset = Variant.objects.all()
    serializer_class = VariantSerializer
    permission_classes = [IsCreatorOrStaff, ReadOnlyBaseFields]
    lookup_field = 'id'

    def perform_update(self, serializer):
        serializer.save(updated_by=self.request.user)

class DeleteVariantView(generics.DestroyAPIView):
    queryset = Variant.objects.all()
    serializer_class = VariantSerializer
    permission_classes = [IsCreatorOrStaff, ReadOnlyBaseFields]
    lookup_field = 'id'

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        instance.delete()
        return Response({'message': 'Variante supprimée'}, status=status.HTTP_204_NO_CONTENT)

class CreateMediaView(generics.CreateAPIView):
    queryset = Media.objects.all()
    serializer_class = MediaSerializer
    permission_classes = [IsAuthenticated, ReadOnlyBaseFields]

    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)

class UpdateMediaView(generics.UpdateAPIView):
    queryset = Media.objects.all()
    serializer_class = MediaSerializer
    permission_classes = [IsCreatorOrStaff, ReadOnlyBaseFields]
    lookup_field = 'id'

    def perform_update(self, serializer):
        serializer.save(updated_by=self.request.user)

class DeleteMediaView(generics.DestroyAPIView):
    queryset = Media.objects.all()
    serializer_class = MediaSerializer
    permission_classes = [IsCreatorOrStaff, ReadOnlyBaseFields]
    lookup_field = 'id'

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        instance.delete()
        return Response({'message': 'Média supprimé'}, status=status.HTTP_204_NO_CONTENT)

class ListCategoriesView(generics.ListAPIView):
    queryset = CommercialCategory.objects.all()
    serializer_class = CommercialCategorySerializer
    permission_classes = [AllowAny]

class CreateCategoryView(generics.CreateAPIView):
    queryset = CommercialCategory.objects.all()
    serializer_class = CommercialCategorySerializer
    permission_classes = [IsStaffPermission, ReadOnlyBaseFields]

    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)

class UpdateCategoryView(generics.UpdateAPIView):
    queryset = CommercialCategory.objects.all()
    serializer_class = CommercialCategorySerializer
    permission_classes = [IsStaffPermission, ReadOnlyBaseFields]
    lookup_field = 'id'

    def perform_update(self, serializer):
        serializer.save(updated_by=self.request.user)

class DeleteCategoryView(generics.DestroyAPIView):
    queryset = CommercialCategory.objects.all()
    serializer_class = CommercialCategorySerializer
    permission_classes = [IsStaffPermission, ReadOnlyBaseFields]
    lookup_field = 'id'

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        instance.delete()
        return Response({'message': 'Catégorie supprimée'}, status=status.HTTP_204_NO_CONTENT)

class ListSubCategoriesView(generics.ListAPIView):
    queryset = CommercialSubCategory.objects.all()
    serializer_class = CommercialSubCategorySerializer
    permission_classes = [AllowAny]
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['category__id']

class CreateSubCategoryView(generics.CreateAPIView):
    queryset = CommercialSubCategory.objects.all()
    serializer_class = CommercialSubCategorySerializer
    permission_classes = [IsStaffPermission, ReadOnlyBaseFields]

    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)

class GetSubCategoryView(generics.RetrieveAPIView):
    queryset = CommercialSubCategory.objects.all()
    serializer_class = CommercialSubCategorySerializer
    permission_classes = [AllowAny]
    lookup_field = 'id'

class UpdateSubCategoryView(generics.UpdateAPIView):
    queryset = CommercialSubCategory.objects.all()
    serializer_class = CommercialSubCategorySerializer
    permission_classes = [IsStaffPermission, ReadOnlyBaseFields]
    lookup_field = 'id'

    def perform_update(self, serializer):
        serializer.save(updated_by=self.request.user)

class DeleteSubCategoryView(generics.DestroyAPIView):
    queryset = CommercialSubCategory.objects.all()
    serializer_class = CommercialSubCategorySerializer
    permission_classes = [IsStaffPermission, ReadOnlyBaseFields]
    lookup_field = 'id'

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        instance.delete()
        return Response({'message': 'Sous-catégorie supprimée'}, status=status.HTTP_204_NO_CONTENT)