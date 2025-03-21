# categories/views.py
from rest_framework import generics, filters, permissions
from django.shortcuts import get_object_or_404
from core.permissions import ReadOnlyBaseFields, IsStaffPermission
from .models import Category, SubCategory
from .serializers import CategorySerializer, SubCategorySerializer

class CategoryListView(generics.ListAPIView):
    """Retourne la liste des catégories avec leurs sous-catégories."""
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = [permissions.AllowAny]

class CategorySearchView(generics.ListAPIView):
    """Recherche des catégories par nom ou type."""
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    filter_backends = [filters.SearchFilter]
    permission_classes = [permissions.AllowAny]
    search_fields = ['name', 'category_type']

class CategoryCreateUpdateView(generics.CreateAPIView, generics.UpdateAPIView):
    """Permet aux utilisateurs staff de créer et mettre à jour des catégories."""
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = [IsStaffPermission, ReadOnlyBaseFields]

class SubCategoryCreateUpdateView(generics.CreateAPIView, generics.UpdateAPIView):
    """Permet aux utilisateurs staff de créer et mettre à jour des sous-catégories."""
    queryset = SubCategory.objects.all()
    serializer_class = SubCategorySerializer
    permission_classes = [IsStaffPermission, ReadOnlyBaseFields]