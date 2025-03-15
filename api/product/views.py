from rest_framework import viewsets
from .models import (
    BaseProduct, ShopProduct, BookProduct, PharmacyProduct, 
    CompanyProduct, MarkProduct, SupermarketProduct, 
    Review, Promotion, Cart, CartItem, Commande
)
from .serializers import (
    BaseProductSerializer, ShopProductSerializer, BookProductSerializer, 
    PharmacyProductSerializer, CompanyProductSerializer, MarkProductSerializer, 
    SupermarketProductSerializer, ReviewSerializer, PromotionSerializer, 
    CartSerializer, CartItemSerializer,  CommandeSerializer
)
from .permissions import IsOwnerOrAdmin, IsAdminOrReadOnly, CanReviewProduct, CanManageCart

class BaseProductViewSet(viewsets.ModelViewSet):
    queryset = BaseProduct.objects.all()
    serializer_class = BaseProductSerializer
    permission_classes = [IsOwnerOrAdmin]

class ShopProductViewSet(viewsets.ModelViewSet):
    queryset = ShopProduct.objects.all()
    serializer_class = ShopProductSerializer
    permission_classes = [IsOwnerOrAdmin]

class BookProductViewSet(viewsets.ModelViewSet):
    queryset = BookProduct.objects.all()
    serializer_class = BookProductSerializer
    permission_classes = [IsOwnerOrAdmin]

class PharmacyProductViewSet(viewsets.ModelViewSet):
    queryset = PharmacyProduct.objects.all()
    serializer_class = PharmacyProductSerializer
    permission_classes = [IsOwnerOrAdmin]

class CompanyProductViewSet(viewsets.ModelViewSet):
    queryset = CompanyProduct.objects.all()
    serializer_class = CompanyProductSerializer
    permission_classes = [IsOwnerOrAdmin]

class MarkProductViewSet(viewsets.ModelViewSet):
    queryset = MarkProduct.objects.all()
    serializer_class = MarkProductSerializer
    permission_classes = [IsOwnerOrAdmin]

class SupermarketProductViewSet(viewsets.ModelViewSet):
    queryset = SupermarketProduct.objects.all()
    serializer_class = SupermarketProductSerializer
    permission_classes = [IsOwnerOrAdmin]

class ReviewViewSet(viewsets.ModelViewSet):
    queryset = Review.objects.all()
    serializer_class = ReviewSerializer
    permission_classes = [CanReviewProduct | IsOwnerOrAdmin]

class PromotionViewSet(viewsets.ModelViewSet):
    queryset = Promotion.objects.all()
    serializer_class = PromotionSerializer
    permission_classes = [IsAdminOrReadOnly]

class CartViewSet(viewsets.ModelViewSet):
    queryset = Cart.objects.all()
    serializer_class = CartSerializer
    permission_classes = [CanManageCart]

    def get_queryset(self):
        user = self.request.user
        if user.is_staff:
            return Cart.objects.all()
        return Cart.objects.filter(user=user)

class CartItemViewSet(viewsets.ModelViewSet):
    queryset = CartItem.objects.all()
    serializer_class = CartItemSerializer
    permission_classes = [CanManageCart]

    def get_queryset(self):
        user = self.request.user
        if user.is_staff:
            return CartItem.objects.all()
        return CartItem.objects.filter(cart__user=user)
    

class CommandeViewSet(viewsets.ModelViewSet):
    queryset = Commande.objects.all()
    serializer_class = CommandeSerializer
    permission_classes = [IsOwnerOrAdmin]

    def get_queryset(self):
        user = self.request.user
        if user.is_staff:
            return Commande.objects.all()
        return Commande.objects.filter(user=user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user, total_amount=self.request.user.carts.filter(is_active=True).first().total_price())