# shop/serializers.py
from rest_framework import serializers
from core.serializers import BaseSerializer
from .models import Shop, ShopCategory, ShopSubCategory, ShopProduct
from commercial_products.serializers import CommercialProductSerializer
from commercial_products.models import CommercialProduct

class ShopCategorySerializer(BaseSerializer):
    class Meta(BaseSerializer.Meta):
        model = ShopCategory
        fields = BaseSerializer.Meta.fields + ['name', 'description', 'image']

class ShopSubCategorySerializer(BaseSerializer):
    category = ShopCategorySerializer(read_only=True)
    category_id = serializers.CharField(write_only=True)

    class Meta(BaseSerializer.Meta):
        model = ShopSubCategory
        fields = BaseSerializer.Meta.fields + ['name', 'description', 'category', 'category_id', 'image']

    def validate_category_id(self, value):
        if not ShopCategory.objects.filter(id=value).exists():
            raise serializers.ValidationError("Catégorie invalide")
        return value

class ShopProductSerializer(BaseSerializer):
    commercial_product = CommercialProductSerializer(read_only=True)
    commercial_product_id = serializers.CharField(write_only=True)

    class Meta(BaseSerializer.Meta):
        model = ShopProduct
        fields = BaseSerializer.Meta.fields + [
            'shop', 'commercial_product', 'commercial_product_id', 'expiration_date', 'price_override'
        ]

    def validate_commercial_product_id(self, value):
        if not CommercialProduct.objects.filter(id=value).exists():
            raise serializers.ValidationError("Produit commercial invalide")
        return value

class ShopSerializer(BaseSerializer):
    categories = ShopCategorySerializer(many=True, read_only=True)
    categories_ids = serializers.ListField(child=serializers.CharField(), write_only=True)
    subcategories = ShopSubCategorySerializer(many=True, read_only=True)
    subcategories_ids = serializers.ListField(child=serializers.CharField(), write_only=True)
    products = ShopProductSerializer(many=True, read_only=True)

    class Meta(BaseSerializer.Meta):
        model = Shop
        fields = BaseSerializer.Meta.fields + [
            'image', 'email', 'description', 'contact', 'address', 'average_rating', 'rating_count',
            'categories', 'categories_ids', 'subcategories', 'subcategories_ids', 'created_by', 'products'
        ]

    def validate(self, data):
        if 'categories_ids' in data:
            for cat_id in data['categories_ids']:
                if not ShopCategory.objects.filter(id=cat_id).exists():
                    raise serializers.ValidationError(f"Catégorie {cat_id} invalide")
        if 'subcategories_ids' in data:
            for subcat_id in data['subcategories_ids']:
                if not ShopSubCategory.objects.filter(id=subcat_id).exists():
                    raise serializers.ValidationError(f"Sous-catégorie {subcat_id} invalide")
        return data