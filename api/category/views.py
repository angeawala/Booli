from rest_framework import generics, filters, permissions
from django.shortcuts import get_object_or_404
from .models import Category, SubCategory
from .serializers import CategorySerializer, SubCategorySerializer
from product.models import BaseProduct
from product.serializers import BaseProductSerializer  # Ajouté pour sérialiser les produits

class IsStaffPermission(permissions.BasePermission):
    """Permission pour restreindre l'accès aux utilisateurs staff."""
    def has_permission(self, request, view):
        return request.user and request.user.is_staff

class CategoryListView(generics.ListAPIView):
    """Retourne la liste des catégories avec leurs sous-catégories."""
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = [permissions.AllowAny]

class CategoryProductsView(generics.ListAPIView):
    """Retourne les produits d'une catégorie donnée."""
    serializer_class = BaseProductSerializer  # Défini pour sérialiser les produits
    permission_classes = [permissions.AllowAny] 

    def get_queryset(self):
        category_id = self.kwargs['category_id']
        category = get_object_or_404(Category, id=category_id)
        return BaseProduct.objects.filter(category=category)

class SubCategoryProductsView(generics.ListAPIView):
    """Retourne les produits d'une sous-catégorie donnée."""
    serializer_class = BaseProductSerializer  # Défini pour sérialiser les produits
    permission_classes = [permissions.AllowAny] 

    def get_queryset(self):
        subcategory_id = self.kwargs['subcategory_id']
        subcategory = get_object_or_404(SubCategory, id=subcategory_id)
        return BaseProduct.objects.filter(subcategory=subcategory)

class CategorySearchView(generics.ListAPIView):
    """Recherche des catégories par nom."""
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    filter_backends = [filters.SearchFilter]
    permission_classes = [permissions.AllowAny] 
    search_fields = ['name']

class CategoryCreateUpdateView(generics.CreateAPIView, generics.UpdateAPIView):
    """Permet aux utilisateurs staff de créer et mettre à jour des catégories."""
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = [IsStaffPermission]

class SubCategoryCreateUpdateView(generics.CreateAPIView, generics.UpdateAPIView):
    """Permet aux utilisateurs staff de créer et mettre à jour des sous-catégories."""
    queryset = SubCategory.objects.all()
    serializer_class = SubCategorySerializer
    permission_classes = [IsStaffPermission]