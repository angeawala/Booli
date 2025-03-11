from rest_framework import viewsets, permissions, status
from rest_framework.decorators import action
from rest_framework.response import Response
from django.db.models import Sum, Count, Q
from django.shortcuts import get_object_or_404
from .models import (ProductType, Category, SubCategory, Product, Variant, Review,
                     Cart, CartItem, Order)
from .serializers import (ProductTypeSerializer, CategorySerializer, SubCategorySerializer,
                          ProductSerializer, VariantSerializer, ReviewSerializer,
                          CartSerializer, CartItemSerializer, DetailedOrderSerializer)
from payement.models import Payment, Invoice
from django.contrib.auth import get_user_model

User = get_user_model()


# Permissions personnalisées
class IsSellerOrAdmin(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.user.is_authenticated and (request.user.is_staff or Product.objects.filter(created_by=request.user).exists())

class IsAdminOnly(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.user.is_authenticated and request.user.is_staff


# Vue pour ProductType (Admin uniquement)
class ProductTypeViewSet(viewsets.ModelViewSet):
    queryset = ProductType.objects.all()
    serializer_class = ProductTypeSerializer
    permission_classes = [IsAdminOnly]

    @action(detail=False, methods=['get'])
    def stats_by_type(self, request):
        """Statistiques des ventes par type (Admin)."""
        stats = ProductType.objects.annotate(
            total_sales=Sum('categories__products__variants__cart_items__quantity', filter=Q(categories__products__variants__cart_items__cart__order__isnull=False)),
            order_count=Count('categories__products__variants__cart_items__cart__order', distinct=True)
        ).values('name', 'total_sales', 'order_count')
        return Response(stats)


# Vue pour Category (Admin uniquement)
class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = [IsAdminOnly]


# Vue pour SubCategory (Admin uniquement)
class SubCategoryViewSet(viewsets.ModelViewSet):
    queryset = SubCategory.objects.all()
    serializer_class = SubCategorySerializer
    permission_classes = [IsAdminOnly]


# Vue pour Product (Vendeurs et Admins)
class ProductViewSet(viewsets.ModelViewSet):
    serializer_class = ProductSerializer
    permission_classes = [IsSellerOrAdmin]

    def get_queryset(self):
        if self.request.user.is_staff:
            return Product.objects.all()
        return Product.objects.filter(created_by=self.request.user)

    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)

    @action(detail=False, methods=['get'])
    def overview(self, request):
        """Vue d’ensemble pour vendeurs ou admins."""
        if request.user.is_staff:
            total_revenue = Order.objects.aggregate(Sum('total'))['total__sum'] or 0
            order_count = Order.objects.count()
            seller_count = User.objects.filter(product_created_by__isnull=False).distinct().count()
            return Response({
                "total_revenue": total_revenue,
                "order_count": order_count,
                "seller_count": seller_count
            })
        else:
            total_revenue = Order.objects.filter(cart__items__variant__product__created_by=request.user).aggregate(Sum('total'))['total__sum'] or 0
            order_count = Order.objects.filter(cart__items__variant__product__created_by=request.user).count()
            top_products = Product.objects.filter(created_by=request.user).annotate(
                total_sold=Sum('variants__cart_items__quantity', filter=Q(variants__cart_items__cart__order__isnull=False))
            ).order_by('-total_sold')[:5]
            return Response({
                "total_revenue": total_revenue,
                "order_count": order_count,
                "top_products": ProductSerializer(top_products, many=True).data
            })

    @action(detail=False, methods=['get'])
    def stats_by_period(self, request):
        """Statistiques des ventes par période (mois)."""
        queryset = Order.objects.filter(cart__items__variant__product__created_by=request.user) if not request.user.is_staff else Order.objects.all()
        stats = queryset.extra({'month': "EXTRACT(MONTH FROM created_at)"}).values('month').annotate(
            total=Sum('total'),
            count=Count('id')
        ).order_by('month')
        return Response(stats)

    @action(detail=True, methods=['post'])
    def approve(self, request, pk=None):
        """Approuver un produit (Admin uniquement)."""
        if not request.user.is_staff:
            return Response({"detail": "Permission refusée"}, status=status.HTTP_403_FORBIDDEN)
        product = self.get_object()
        product.approved = True
        product.save()
        return Response({"detail": "Produit approuvé"})


# Vue pour Variant (Vendeurs et Admins)
class VariantViewSet(viewsets.ModelViewSet):
    serializer_class = VariantSerializer
    permission_classes = [IsSellerOrAdmin]

    def get_queryset(self):
        if self.request.user.is_staff:
            return Variant.objects.all()
        return Variant.objects.filter(product__created_by=self.request.user)


# Vue pour Review (Vendeurs et Admins)
class ReviewViewSet(viewsets.ModelViewSet):
    serializer_class = ReviewSerializer
    permission_classes = [IsSellerOrAdmin]

    def get_queryset(self):
        if self.request.user.is_staff:
            return Review.objects.all()
        return Review.objects.filter(variant__product__created_by=self.request.user, approved=True)

    @action(detail=True, methods=['post'])
    def approve(self, request, pk=None):
        """Approuver un avis (Admin uniquement)."""
        if not request.user.is_staff:
            return Response({"detail": "Permission refusée"}, status=status.HTTP_403_FORBIDDEN)
        review = self.get_object()
        review.approved = True
        review.save()
        return Response({"detail": "Avis approuvé"})


# Vue pour Order (Vendeurs et Admins)
class OrderViewSet(viewsets.ModelViewSet):
    serializer_class = DetailedOrderSerializer
    permission_classes = [IsSellerOrAdmin]

    def get_queryset(self):
        if self.request.user.is_staff:
            return Order.objects.all()
        return Order.objects.filter(cart__items__variant__product__created_by=self.request.user)

    @action(detail=True, methods=['post'])
    def update_status(self, request, pk=None):
        """Mettre à jour le statut d’une commande (Admin ou Vendeur)."""
        order = self.get_object()
        new_status = request.data.get('status')
        if new_status in dict(order.status.field.choices):
            order.status = new_status
            order.save()
            return Response({"detail": f"Statut mis à jour : {new_status}"})
        return Response({"detail": "Statut invalide"}, status=status.HTTP_400_BAD_REQUEST)


# Vue pour Cart (Clients, mais utile pour stats)
class CartViewSet(viewsets.ModelViewSet):
    serializer_class = CartSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Cart.objects.filter(user=self.request.user)