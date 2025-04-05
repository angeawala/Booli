# cart/serializers.py
from rest_framework import serializers
from core.serializers import BaseSerializer
from .models import Cart, CartItem
from base_products.models import BaseProduct
from commercial_products.models import CommercialProduct, Variant
from promotions.models import Promotion
from engros_products.models import EngrosProduct
from pharmacy_products.models import PharmacyProduct
from books.models import Book
from pdf.models import BookPDF
from utils.models import TauxEchange
from django.utils import timezone

class CalculatePriceResponseSerializer(serializers.Serializer):
    items = serializers.ListField(
        child=serializers.DictField(
            child=serializers.CharField(allow_blank=True, required=False)
        )
    )
    total = serializers.DictField(child=serializers.CharField())

class ClearCartResponseSerializer(serializers.Serializer):
    message = serializers.CharField()

class CartItemSerializer(BaseSerializer):
    class Meta(BaseSerializer.Meta):
        model = CartItem
        fields = BaseSerializer.Meta.fields + ['cart', 'product', 'variant', 'quantity', 'type', 'prix']

    def validate(self, data):
        product_id = data.get('product')
        variant_id = data.get('variant')
        item_type = data.get('type')
        quantity = data.get('quantity')

        if item_type == "pdf":
            try:
                book_pdf = BookPDF.objects.get(id=product_id)
                if variant_id:
                    raise serializers.ValidationError("Les PDFs n'ont pas de variantes")
            except BookPDF.DoesNotExist:
                raise serializers.ValidationError("PDF introuvable")
        else:
            try:
                base_product = BaseProduct.objects.get(id=product_id)
            except BaseProduct.DoesNotExist:
                raise serializers.ValidationError("Produit introuvable")

            if item_type == "commercial":
                if not CommercialProduct.objects.filter(base_product=base_product).exists():
                    raise serializers.ValidationError("Le produit doit être un CommercialProduct pour type 'commercial'")
                if variant_id and not Variant.objects.filter(id=variant_id, commercial_product__base_product=base_product).exists():
                    raise serializers.ValidationError("Variante invalide pour ce produit")
            elif item_type == "pharmacy":
                if not PharmacyProduct.objects.filter(base_product=base_product).exists():
                    raise serializers.ValidationError("Le produit doit être un PharmacyProduct pour type 'pharmacy'")
            elif item_type == "engros":
                if not EngrosProduct.objects.filter(commercial_product__base_product=base_product).exists():
                    raise serializers.ValidationError("Le produit doit être un EngrosProduct pour type 'engros'")
            elif item_type == "book":
                if not Book.objects.filter(base_product=base_product).exists():
                    raise serializers.ValidationError("Le produit doit être un Book pour type 'book'")

            # Validation du stock (sauf pour PDF)
            stock_source = base_product.stock if item_type != "engros" else EngrosProduct.objects.get(commercial_product__base_product=base_product).stock
            if item_type != "pdf" and stock_source < quantity:
                raise serializers.ValidationError(f"Stock insuffisant : {stock_source} disponible")

        return data

    def calculate_price(self, instance):
        """Calcule le prix selon le type et met à jour instance.prix."""
        if instance.type == "pdf":
            book_pdf = BookPDF.objects.get(id=instance.product)
            instance.prix = book_pdf.prix if not book_pdf.is_free else {"valeur": 0, "devise": "FCFA"}
        else:
            base_product = BaseProduct.objects.get(id=instance.product)
            prix = base_product.prix_normal
            if instance.type == "pharmacy":
                prix = base_product.prix_reduit or base_product.prix_normal
            elif instance.type == "commercial":
                commercial_product = CommercialProduct.objects.get(base_product=base_product)
                promotion = Promotion.objects.filter(product=commercial_product, end_time__gt=timezone.now()).first()
                if promotion:
                    prix = promotion.new_price
                elif instance.variant:
                    variant = Variant.objects.get(id=instance.variant)
                    prix = variant.prix
            elif instance.type == "engros":
                engros_product = EngrosProduct.objects.get(commercial_product__base_product=base_product)
                for tier in sorted(engros_product.pricing_tiers, key=lambda x: x['minQuantity'], reverse=True):
                    if instance.quantity >= tier['minQuantity']:
                        prix = {
                            "valeur": base_product.prix_normal['valeur'] * (1 - tier['discountPercentage'] / 100),
                            "devise": base_product.prix_normal['devise']
                        }
                        break
            elif instance.type == "book":
                prix = base_product.prix_normal

            # Conversion vers la devise du panier
            cart_devise = instance.cart.devise.code if instance.cart.devise else "FCFA"
            if prix['devise'] != cart_devise:
                taux = TauxEchange.objects.get(devise_from__code=prix['devise'], devise_to__code=cart_devise).taux
                prix = {"valeur": prix['valeur'] * taux, "devise": cart_devise}

            instance.prix = prix

class CartSerializer(BaseSerializer):
    items = CartItemSerializer(many=True, read_only=True)
    devise = serializers.CharField(source='devise.code', allow_null=True)

    class Meta(BaseSerializer.Meta):
        model = Cart
        fields = BaseSerializer.Meta.fields + ['user', 'items', 'devise']