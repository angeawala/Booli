# cart/views.py
from rest_framework import generics, status
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from django.core.exceptions import ObjectDoesNotExist
from .models import Cart, CartItem
from .serializers import CartSerializer, CartItemSerializer, CalculatePriceResponseSerializer, ClearCartResponseSerializer
from utils.models import Devise, TauxEchange
from base_products.models import BaseProduct
from commercial_products.models import CommercialProduct, Variant
from promotions.models import Promotion
from engros_products.models import EngrosProduct
from pharmacy_products.models import PharmacyProduct
from books.models import Book
from pdf.models import BookPDF
from django.utils import timezone
from django.contrib.sessions.models import Session
import uuid

class GetCartView(generics.RetrieveAPIView):
    serializer_class = CartSerializer
    permission_classes = [AllowAny]

    def get_object(self):
        user = self.request.user
        
        # Si l'utilisateur est authentifié
        if user.is_authenticated:
            cart, _ = Cart.objects.get_or_create(user=user)
        else:
            # Si l'utilisateur est anonyme, créer un panier basé sur la session
            session_key = self.request.session.session_key
            if not session_key:
                self.request.session.create()  # Crée une nouvelle session si nécessaire
                session_key = self.request.session.session_key
            cart, _ = Cart.objects.get_or_create(session_key=session_key)

        return cart

class AddToCartView(generics.CreateAPIView):
    serializer_class = CartItemSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        cart, _ = Cart.objects.get_or_create(user=self.request.user)
        serializer.save(cart=cart)
        serializer.calculate_price(serializer.instance)
        serializer.instance.save(update_fields=['prix'])

class UpdateCartItemView(generics.UpdateAPIView):
    queryset = CartItem.objects.all()
    serializer_class = CartItemSerializer
    permission_classes = [IsAuthenticated]
    lookup_field = 'id'

    def perform_update(self, serializer):
        serializer.save()
        serializer.calculate_price(serializer.instance)
        serializer.instance.save(update_fields=['prix'])

class DeleteCartItemView(generics.DestroyAPIView):
    queryset = CartItem.objects.all()
    serializer_class = CartItemSerializer
    permission_classes = [IsAuthenticated]
    lookup_field = 'id'

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        instance.delete()
        return Response({"message": "Article supprimé"}, status=status.HTTP_204_NO_CONTENT)


class CalculatePriceView(generics.GenericAPIView):
    """Calcule le prix de produits indépendamment du panier."""
    serializer_class = CalculatePriceResponseSerializer
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        devise_code = request.data.get('devise', 'FCFA')
        items_data = request.data.get('items', [])
        if not isinstance(items_data, list):
            return Response({"error": "Items doit être une liste"}, status=status.HTTP_400_BAD_REQUEST)

        try:
            devise = Devise.objects.get(code=devise_code)
        except Devise.DoesNotExist:
            return Response({"error": "Devise invalide"}, status=status.HTTP_400_BAD_REQUEST)

        response_items = []
        total = {"valeur": 0, "devise": devise_code}

        for item_data in items_data:
            product_id = item_data.get('product')
            variant_id = item_data.get('variant')
            quantity = item_data.get('quantity', 1)
            item_type = item_data.get('type')

            if not all([product_id, item_type, isinstance(quantity, int)]):
                continue

            prix = {"valeur": 0, "devise": "FCFA"}
            if item_type == "pdf":
                try:
                    book_pdf = BookPDF.objects.get(id=product_id)
                    prix = book_pdf.prix if not book_pdf.is_free else {"valeur": 0, "devise": "FCFA"}
                except BookPDF.DoesNotExist:
                    continue
            else:
                try:
                    base_product = BaseProduct.objects.get(id=product_id)
                except BaseProduct.DoesNotExist:
                    continue

                prix = base_product.prix_normal
                if item_type == "pharmacy":
                    prix = base_product.prix_reduit or base_product.prix_normal
                elif item_type == "commercial":
                    commercial_product = CommercialProduct.objects.get(base_product=base_product)
                    promotion = Promotion.objects.filter(product=commercial_product, end_time__gt=timezone.now()).first()
                    if promotion:
                        prix = promotion.new_price
                    elif variant_id:
                        try:
                            variant = Variant.objects.get(id=variant_id)
                            prix = variant.prix
                        except Variant.DoesNotExist:
                            pass
                elif item_type == "engros":
                    engros_product = EngrosProduct.objects.get(commercial_product__base_product=base_product)
                    for tier in sorted(engros_product.pricing_tiers, key=lambda x: x['minQuantity'], reverse=True):
                        if quantity >= tier['minQuantity']:
                            prix = {
                                "valeur": base_product.prix_normal['valeur'] * (1 - tier['discountPercentage'] / 100),
                                "devise": base_product.prix_normal['devise']
                            }
                            break
                elif item_type == "book":
                    prix = base_product.prix_normal

            if prix['devise'] != devise_code:
                taux = TauxEchange.objects.get(devise_from__code=prix['devise'], devise_to__code=devise_code).taux
                prix = {"valeur": prix['valeur'] * taux, "devise": devise_code}

            response_items.append({
                "product": product_id,
                "variant": variant_id,
                "quantity": quantity,
                "type": item_type,
                "prix": prix
            })
            total['valeur'] += prix['valeur'] * quantity

        return Response({"items": response_items, "total": total}, status=status.HTTP_200_OK)

class ClearCartView(generics.GenericAPIView):
    serializer_class = ClearCartResponseSerializer
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        cart, _ = Cart.objects.get_or_create(user=request.user)
        cart.items.all().delete()
        return Response({"message": "Panier vidé"}, status=status.HTTP_200_OK)

class CalculateCartTotalView(generics.GenericAPIView):
    """Calcule le total du panier existant."""
    serializer_class = CartSerializer
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        devise_code = request.data.get('devise', 'FCFA')
        try:
            devise = Devise.objects.get(code=devise_code)
        except Devise.DoesNotExist:
            return Response({"error": "Devise invalide"}, status=status.HTTP_400_BAD_REQUEST)

        cart, _ = Cart.objects.get_or_create(user=request.user)
        if not cart.items.exists():
            return Response({"total": {"valeur": 0, "devise": devise_code}}, status=status.HTTP_200_OK)

        cart.devise = devise
        cart.save(update_fields=['devise'])

        total = {"valeur": 0, "devise": devise_code}
        for item in cart.items.all():
            serializer = CartItemSerializer(instance=item)
            serializer.calculate_price(item)
            item.save(update_fields=['prix'])
            total['valeur'] += item.prix['valeur'] * item.quantity

        return Response({"total": total}, status=status.HTTP_200_OK)