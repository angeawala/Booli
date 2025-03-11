# api/category/views.py
from rest_framework import viewsets
from rest_framework.permissions import IsAdminUser, AllowAny
from django.core.cache import cache
from .models import Category, SubCategory
from .serializers import CategorySerializer, SubCategorySerializer
from rest_framework.response import Response

class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.prefetch_related('subcategories').all()
    serializer_class = CategorySerializer

    def get_permissions(self):
        if self.action in ['create', 'update', 'partial_update', 'destroy']:
            return [IsAdminUser()]
        return [AllowAny()]

    def perform_create(self, serializer):
        cache.delete('category_list')
        serializer.save()

    def perform_update(self, serializer):
        cache.delete('category_list')
        serializer.save()

    def perform_destroy(self, instance):
        cache.delete('category_list')
        instance.delete()

    def list(self, request, *args, **kwargs):
        cached_data = cache.get('category_list')
        if cached_data is not None:
            return Response(cached_data)

        response = super().list(request, *args, **kwargs)
        cache.set('category_list', response.data, timeout=3600)
        return response

class SubCategoryViewSet(viewsets.ModelViewSet):
    queryset = SubCategory.objects.select_related('category').all()
    serializer_class = SubCategorySerializer

    def get_permissions(self):
        if self.action in ['create', 'update', 'partial_update', 'destroy']:
            return [IsAdminUser()]
        return [AllowAny()]

    def get_queryset(self):
        # Ajout du filtrage par catégorie via query param
        queryset = super().get_queryset()
        category_id = self.request.query_params.get('category', None)
        if category_id is not None:
            queryset = queryset.filter(category_id=category_id)
        return queryset

    def perform_create(self, serializer):
        cache.delete('subcategory_list')
        cache.delete('category_list')
        serializer.save()

    def perform_update(self, serializer):
        cache.delete('subcategory_list')
        cache.delete('category_list')
        serializer.save()

    def perform_destroy(self, instance):
        cache.delete('subcategory_list')
        cache.delete('category_list')
        instance.delete()

    def list(self, request, *args, **kwargs):
        # Gestion du cache avec filtre
        category_id = request.query_params.get('category', None)
        cache_key = f'subcategory_list_{category_id}' if category_id else 'subcategory_list'
        
        cached_data = cache.get(cache_key)
        if cached_data is not None:
            return Response(cached_data)

        response = super().list(request, *args, **kwargs)
        cache.set(cache_key, response.data, timeout=3600)
        return response