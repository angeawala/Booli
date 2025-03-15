from rest_framework import serializers
from drf_spectacular.utils import extend_schema_field
from .models import (
    BaseProduct, ShopProduct, BookProduct, PharmacyProduct, 
    CompanyProduct, MarkProduct, SupermarketProduct, 
    Review, Promotion, Cart, CartItem, Commande
)
from category.serializers import CategorySerializer, SubCategorySerializer
from marcher.serializers import (
    ShopSerializer, CompanySerializer, DoctorSerializer, 
    MarkSerializer, SupermarketSerializer
)

# Déplacé en haut pour être défini avant utilisation
class ReviewSerializer(serializers.ModelSerializer):
    shop_product = serializers.PrimaryKeyRelatedField(read_only=True)
    book_product = serializers.PrimaryKeyRelatedField(read_only=True)
    pharmacy_product = serializers.PrimaryKeyRelatedField(read_only=True)
    company_product = serializers.PrimaryKeyRelatedField(read_only=True)
    mark_product = serializers.PrimaryKeyRelatedField(read_only=True)
    supermarket_product = serializers.PrimaryKeyRelatedField(read_only=True)
    created_by = serializers.StringRelatedField()

    class Meta:
        model = Review
        fields = [
            'id', 'shop_product', 'book_product', 'pharmacy_product', 
            'company_product', 'mark_product', 'supermarket_product', 
            'rating', 'comment', 'created_by', 'created_at', 'updated_at'
        ]
        read_only_fields = ['created_by', 'created_at', 'updated_at']

    def create(self, validated_data):
        request = self.context.get('request')
        if request and hasattr(request, 'user') and request.user.is_authenticated:
            validated_data['created_by'] = request.user
        return super().create(validated_data)

    def validate(self, data):
        products = [
            data.get('shop_product'), data.get('book_product'), data.get('pharmacy_product'),
            data.get('company_product'), data.get('mark_product'), data.get('supermarket_product')
        ]
        non_null_products = [p for p in products if p is not None]
        if len(non_null_products) != 1:
            raise serializers.ValidationError("Un seul type de produit doit être défini pour un avis.")
        return data

class BaseProductSerializer(serializers.ModelSerializer):
    category = CategorySerializer(read_only=True)
    subcategory = SubCategorySerializer(read_only=True)

    class Meta:
        model = BaseProduct
        fields = [
            'id', 'name', 'category', 'subcategory', 'price', 
            'created_by', 'created_at', 'updated_at'
        ]
        read_only_fields = ['created_by', 'created_at', 'updated_at']

    def create(self, validated_data):
        request = self.context.get('request')
        if request and hasattr(request, 'user') and request.user.is_authenticated:
            validated_data['created_by'] = request.user
        return super().create(validated_data)

class ShopProductSerializer(serializers.ModelSerializer):
    base_product = BaseProductSerializer(read_only=True)
    shop = ShopSerializer(read_only=True)
    reviews = serializers.SerializerMethodField()

    class Meta:
        model = ShopProduct
        fields = [
            'id', 'base_product', 'shop', 'discount_price', 'stock', 
            'expiration_date', 'is_wholesale', 'details', 'reviews',
            'created_by', 'created_at', 'updated_at'
        ]
        read_only_fields = ['created_by', 'created_at', 'updated_at']

    @extend_schema_field(serializers.ListField(child=ReviewSerializer()))
    def get_reviews(self, obj):
        reviews = Review.objects.filter(shop_product=obj)
        return ReviewSerializer(reviews, many=True).data

    def create(self, validated_data):
        request = self.context.get('request')
        if request and hasattr(request, 'user') and request.user.is_authenticated:
            validated_data['created_by'] = request.user
        return super().create(validated_data)

class BookProductSerializer(serializers.ModelSerializer):
    base_product = BaseProductSerializer(read_only=True)
    company = CompanySerializer(read_only=True)
    reviews = serializers.SerializerMethodField()

    class Meta:
        model = BookProduct
        fields = [
            'id', 'base_product', 'company', 'author', 'isbn', 'is_free', 'discount_price', 'stock', 'reviews',
            'created_by', 'created_at', 'updated_at'
        ]
        read_only_fields = ['created_by', 'created_at', 'updated_at']

    @extend_schema_field(serializers.ListField(child=ReviewSerializer()))
    def get_reviews(self, obj):
        reviews = Review.objects.filter(book_product=obj)
        return ReviewSerializer(reviews, many=True).data

    def create(self, validated_data):
        request = self.context.get('request')
        if request and hasattr(request, 'user') and request.user.is_authenticated:
            validated_data['created_by'] = request.user
        return super().create(validated_data)

class PharmacyProductSerializer(serializers.ModelSerializer):
    base_product = BaseProductSerializer(read_only=True)
    doctor = DoctorSerializer(read_only=True)
    reviews = serializers.SerializerMethodField()

    class Meta:
        model = PharmacyProduct
        fields = [
            'id', 'base_product', 'doctor', 'discount_price', 'stock', 'details', 'reviews',
            'created_by', 'created_at', 'updated_at'
        ]
        read_only_fields = ['created_by', 'created_at', 'updated_at']

    @extend_schema_field(serializers.ListField(child=ReviewSerializer()))
    def get_reviews(self, obj):
        reviews = Review.objects.filter(pharmacy_product=obj)
        return ReviewSerializer(reviews, many=True).data

    def create(self, validated_data):
        request = self.context.get('request')
        if request and hasattr(request, 'user') and request.user.is_authenticated:
            validated_data['created_by'] = request.user
        return super().create(validated_data)

class CompanyProductSerializer(serializers.ModelSerializer):
    base_product = BaseProductSerializer(read_only=True)
    company = CompanySerializer(read_only=True)
    reviews = serializers.SerializerMethodField()

    class Meta:
        model = CompanyProduct
        fields = [
            'id', 'base_product', 'company', 'stock', 'is_wholesale', 'details', 'reviews',
            'created_by', 'created_at', 'updated_at'
        ]
        read_only_fields = ['created_by', 'created_at', 'updated_at']

    @extend_schema_field(serializers.ListField(child=ReviewSerializer()))
    def get_reviews(self, obj):
        reviews = Review.objects.filter(company_product=obj)
        return ReviewSerializer(reviews, many=True).data

    def create(self, validated_data):
        request = self.context.get('request')
        if request and hasattr(request, 'user') and request.user.is_authenticated:
            validated_data['created_by'] = request.user
        return super().create(validated_data)

class MarkProductSerializer(serializers.ModelSerializer):
    base_product = BaseProductSerializer(read_only=True)
    mark = MarkSerializer(read_only=True)
    reviews = serializers.SerializerMethodField()

    class Meta:
        model = MarkProduct
        fields = [
            'id', 'base_product', 'mark', 'stock', 'is_active', 'details', 'reviews',
            'created_by', 'created_at', 'updated_at'
        ]
        read_only_fields = ['created_by', 'created_at', 'updated_at']

    @extend_schema_field(serializers.ListField(child=ReviewSerializer()))
    def get_reviews(self, obj):
        reviews = Review.objects.filter(mark_product=obj)
        return ReviewSerializer(reviews, many=True).data

    def create(self, validated_data):
        request = self.context.get('request')
        if request and hasattr(request, 'user') and request.user.is_authenticated:
            validated_data['created_by'] = request.user
        return super().create(validated_data)

class SupermarketProductSerializer(serializers.ModelSerializer):
    base_product = BaseProductSerializer(read_only=True)
    supermarket = SupermarketSerializer(read_only=True)
    reviews = serializers.SerializerMethodField()

    class Meta:
        model = SupermarketProduct
        fields = [
            'id', 'base_product', 'supermarket', 'discount_price', 'stock', 
            'expiration_date', 'is_wholesale', 'details', 'reviews',
            'created_by', 'created_at', 'updated_at'
        ]
        read_only_fields = ['created_by', 'created_at', 'updated_at']

    @extend_schema_field(serializers.ListField(child=ReviewSerializer()))
    def get_reviews(self, obj):
        reviews = Review.objects.filter(supermarket_product=obj)
        return ReviewSerializer(reviews, many=True).data

    def create(self, validated_data):
        request = self.context.get('request')
        if request and hasattr(request, 'user') and request.user.is_authenticated:
            validated_data['created_by'] = request.user
        return super().create(validated_data)

class PromotionSerializer(serializers.ModelSerializer):
    entity = serializers.StringRelatedField()
    shop_product = ShopProductSerializer(read_only=True)
    company_product = CompanyProductSerializer(read_only=True)
    supermarket_product = SupermarketProductSerializer(read_only=True)

    class Meta:
        model = Promotion
        fields = [
            'id', 'entity', 'shop_product', 'company_product', 'supermarket_product', 
            'discount_percentage', 'start_date', 'end_date', 
            'created_by', 'created_at', 'updated_at'
        ]
        read_only_fields = ['created_by', 'created_at', 'updated_at']

    def create(self, validated_data):
        request = self.context.get('request')
        if request and hasattr(request, 'user') and request.user.is_authenticated:
            validated_data['created_by'] = request.user
        return super().create(validated_data)

    def validate(self, data):
        products = [
            data.get('shop_product'), data.get('company_product'), data.get('supermarket_product')
        ]
        non_null_products = [p for p in products if p is not None]
        if len(non_null_products) != 1:
            raise serializers.ValidationError("Un seul type de produit doit être défini pour une promotion.")
        return data

class CartItemSerializer(serializers.ModelSerializer):
    shop_product = ShopProductSerializer(read_only=True)
    book_product = BookProductSerializer(read_only=True)
    pharmacy_product = PharmacyProductSerializer(read_only=True)
    company_product = CompanyProductSerializer(read_only=True)
    mark_product = MarkProductSerializer(read_only=True)
    supermarket_product = SupermarketProductSerializer(read_only=True)
    cart = serializers.StringRelatedField()

    class Meta:
        model = CartItem
        fields = [
            'id', 'cart', 'shop_product', 'book_product', 'pharmacy_product', 
            'company_product', 'mark_product', 'supermarket_product', 'quantity',
            'created_by', 'created_at', 'updated_at'
        ]
        read_only_fields = ['created_by', 'created_at', 'updated_at']

    def create(self, validated_data):
        request = self.context.get('request')
        if request and hasattr(request, 'user') and request.user.is_authenticated:
            validated_data['created_by'] = request.user
        return super().create(validated_data)

    def validate(self, data):
        products = [
            data.get('shop_product'), data.get('book_product'), data.get('pharmacy_product'),
            data.get('company_product'), data.get('mark_product'), data.get('supermarket_product')
        ]
        non_null_products = [p for p in products if p is not None]
        if len(non_null_products) != 1:
            raise serializers.ValidationError("Un seul type de produit doit être défini pour un élément de panier.")
        return data

class CartSerializer(serializers.ModelSerializer):
    items = CartItemSerializer(many=True, read_only=True)
    total_price = serializers.SerializerMethodField()

    class Meta:
        model = Cart
        fields = ['id', 'user', 'is_active', 'items', 'total_price', 'created_by', 'created_at', 'updated_at']
        read_only_fields = ['created_by', 'created_at', 'updated_at']

    @extend_schema_field(serializers.DecimalField(max_digits=10, decimal_places=2))
    def get_total_price(self, obj):
        return obj.total_price()

    def create(self, validated_data):
        request = self.context.get('request')
        if request and hasattr(request, 'user') and request.user.is_authenticated:
            validated_data['created_by'] = request.user
            validated_data['user'] = request.user
        return super().create(validated_data)

class CommandeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Commande
        fields = ['id', 'user', 'cart', 'total_amount', 'status', 'commande_date', 'created_at', 'updated_at']
        read_only_fields = ['user', 'total_amount', 'commande_date', 'created_at', 'updated_at']