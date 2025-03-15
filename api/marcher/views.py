from rest_framework import viewsets
from rest_framework.permissions import IsAdminUser, AllowAny
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import Shop, Company, Doctor, Mark, Supermarket
from .serializers import (
    ShopSerializer, CompanySerializer, DoctorSerializer, 
    MarkSerializer, SupermarketSerializer
)
from .utils import get_entity_stats, get_products_by_shop, get_products_by_company, get_products_by_doctor, get_products_by_mark, get_products_by_supermarket
from product.serializers import (
    ShopProductSerializer, BookProductSerializer, PharmacyProductSerializer,
    CompanyProductSerializer, MarkProductSerializer, SupermarketProductSerializer
)

class ShopViewSet(viewsets.ModelViewSet):
    queryset = Shop.objects.all()
    serializer_class = ShopSerializer

    def get_permissions(self):
        if self.action in ['create', 'update', 'partial_update', 'destroy']:
            return [IsAdminUser()]
        return [AllowAny()]

    @action(detail=True, methods=['get'])
    def stats(self, request, pk=None):
        """Récupère les statistiques de la boutique."""
        stats = get_entity_stats(Shop, pk)
        return Response(stats)

    @action(detail=True, methods=['get'])
    def products(self, request, pk=None):
        """Récupère les produits de la boutique."""
        products = get_products_by_shop(pk)
        serializer = ShopProductSerializer(products, many=True)
        return Response(serializer.data)

class CompanyViewSet(viewsets.ModelViewSet):
    queryset = Company.objects.all()
    serializer_class = CompanySerializer

    def get_permissions(self):
        if self.action in ['create', 'update', 'partial_update', 'destroy']:
            return [IsAdminUser()]
        return [AllowAny()]

    @action(detail=True, methods=['get'])
    def stats(self, request, pk=None):
        """Récupère les statistiques de la compagnie."""
        stats = get_entity_stats(Company, pk)
        return Response(stats)

    @action(detail=True, methods=['get'])
    def products(self, request, pk=None):
        """Récupère les produits de la compagnie."""
        products = get_products_by_company(pk)
        # Mélange de BookProduct et CompanyProduct, on utilise leurs sérialiseurs respectifs
        book_products = [p for p in products if p.__class__.__name__ == 'BookProduct']
        company_products = [p for p in products if p.__class__.__name__ == 'CompanyProduct']
        book_serializer = BookProductSerializer(book_products, many=True)
        company_serializer = CompanyProductSerializer(company_products, many=True)
        return Response(book_serializer.data + company_serializer.data)

class DoctorViewSet(viewsets.ModelViewSet):
    queryset = Doctor.objects.all()
    serializer_class = DoctorSerializer

    def get_permissions(self):
        if self.action in ['create', 'update', 'partial_update', 'destroy']:
            return [IsAdminUser()]
        return [AllowAny()]

    @action(detail=True, methods=['get'])
    def stats(self, request, pk=None):
        """Récupère les statistiques du docteur."""
        stats = get_entity_stats(Doctor, pk)
        return Response(stats)

    @action(detail=True, methods=['get'])
    def products(self, request, pk=None):
        """Récupère les produits du docteur."""
        products = get_products_by_doctor(pk)
        serializer = PharmacyProductSerializer(products, many=True)
        return Response(serializer.data)

class MarkViewSet(viewsets.ModelViewSet):
    queryset = Mark.objects.all()
    serializer_class = MarkSerializer

    def get_permissions(self):
        if self.action in ['create', 'update', 'partial_update', 'destroy']:
            return [IsAdminUser()]
        return [AllowAny()]

    @action(detail=True, methods=['get'])
    def stats(self, request, pk=None):
        """Récupère les statistiques de la marque."""
        stats = get_entity_stats(Mark, pk)
        return Response(stats)

    @action(detail=True, methods=['get'])
    def products(self, request, pk=None):
        """Récupère les produits de la marque."""
        products = get_products_by_mark(pk)
        serializer = MarkProductSerializer(products, many=True)
        return Response(serializer.data)

class SupermarketViewSet(viewsets.ModelViewSet):
    queryset = Supermarket.objects.all()
    serializer_class = SupermarketSerializer

    def get_permissions(self):
        if self.action in ['create', 'update', 'partial_update', 'destroy']:
            return [IsAdminUser()]
        return [AllowAny()]

    @action(detail=True, methods=['get'])
    def stats(self, request, pk=None):
        """Récupère les statistiques du supermarché."""
        stats = get_entity_stats(Supermarket, pk)
        return Response(stats)

    @action(detail=True, methods=['get'])
    def products(self, request, pk=None):
        """Récupère les produits du supermarché."""
        products = get_products_by_supermarket(pk)
        serializer = SupermarketProductSerializer(products, many=True)
        return Response(serializer.data)