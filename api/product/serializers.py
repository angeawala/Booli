from rest_framework import serializers
from .models import (ProductType, Category, SubCategory, Product, Variant, Review, 
                     Cart, CartItem, Order)
from utils.models import Address
from payement.models import Devise, Payment, Invoice


# Serializer pour ProductType
class ProductTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductType
        fields = "__all__"


# Serializer pour Category
class CategorySerializer(serializers.ModelSerializer):
    product_type = ProductTypeSerializer(read_only=True)

    class Meta:
        model = Category
        fields = "__all__"


# Serializer pour SubCategory
class SubCategorySerializer(serializers.ModelSerializer):
    category = CategorySerializer(read_only=True)

    class Meta:
        model = SubCategory
        fields = "__all__"


# Serializer pour Product
class ProductSerializer(serializers.ModelSerializer):
    category = CategorySerializer(read_only=True)
    subcategory = SubCategorySerializer(read_only=True)
    devise = serializers.PrimaryKeyRelatedField(queryset=Devise.objects.all())  # Pour écriture

    class Meta:
        model = Product
        fields = "__all__"


# Serializer pour Variant
class VariantSerializer(serializers.ModelSerializer):
    product = ProductSerializer(read_only=True)

    class Meta:
        model = Variant
        fields = "__all__"


# Serializer pour Review
class ReviewSerializer(serializers.ModelSerializer):
    variant = VariantSerializer(read_only=True)

    class Meta:
        model = Review
        fields = "__all__"


# Serializer pour CartItem
class CartItemSerializer(serializers.ModelSerializer):
    variant = VariantSerializer(read_only=True)

    class Meta:
        model = CartItem
        fields = "__all__"


# Serializer pour Cart
class CartSerializer(serializers.ModelSerializer):
    items = CartItemSerializer(many=True, read_only=True)

    class Meta:
        model = Cart
        fields = "__all__"


# Serializer pour Order
class OrderSerializer(serializers.ModelSerializer):
    cart = CartSerializer(read_only=True)
    shipping_address = serializers.PrimaryKeyRelatedField(queryset=Address.objects.all(), allow_null=True)

    class Meta:
        model = Order
        fields = "__all__"


# Serializer pour Payment (depuis payement)
class PaymentSerializer(serializers.ModelSerializer):
    method = serializers.StringRelatedField()  # Nom de la méthode
    devise = serializers.StringRelatedField()  # Code de la devise

    class Meta:
        model = Payment
        fields = "__all__"


# Serializer pour Invoice (depuis payement)
class InvoiceSerializer(serializers.ModelSerializer):
    payment = PaymentSerializer(read_only=True)

    class Meta:
        model = Invoice
        fields = "__all__"


# Serializer enrichi pour Order avec Payment et Invoice
class DetailedOrderSerializer(serializers.ModelSerializer):
    cart = CartSerializer(read_only=True)
    shipping_address = serializers.PrimaryKeyRelatedField(queryset=Address.objects.all(), allow_null=True)
    payment = PaymentSerializer(read_only=True)
    invoice = InvoiceSerializer(source="payment.invoice", read_only=True)  # Via la relation payment.invoice

    class Meta:
        model = Order
        fields = "__all__"