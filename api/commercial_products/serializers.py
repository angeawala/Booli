# commercial_products/serializers.py
from rest_framework import serializers
from core.serializers import BaseSerializer
from base_products.serializers import BaseProductSerializer
from base_products.models import BaseProduct
from .models import CommercialProduct, Variant, Media, CommercialCategory, CommercialSubCategory

class VariantSerializer(BaseSerializer):
    class Meta(BaseSerializer.Meta):
        model = Variant
        fields = BaseSerializer.Meta.fields + ['product', 'couleur', 'taille', 'stock', 'prix_ajuste']

    def validate_prix_ajuste(self, value):
        if value.get('valeur') <= 0:
            raise serializers.ValidationError("Le prix ajusté doit être supérieur à 0")
        return value

class MediaSerializer(BaseSerializer):
    class Meta(BaseSerializer.Meta):
        model = Media
        fields = BaseSerializer.Meta.fields + ['product', 'video', 'images']

class CommercialCategorySerializer(BaseSerializer):
    class Meta(BaseSerializer.Meta):
        model = CommercialCategory
        fields = BaseSerializer.Meta.fields + ['name', 'description', 'is_tech', 'image', 'icon']

class CommercialSubCategorySerializer(BaseSerializer):
    class Meta(BaseSerializer.Meta):
        model = CommercialSubCategory
        fields = BaseSerializer.Meta.fields + ['name', 'description', 'category', 'image']

class CommercialProductSerializer(BaseSerializer):
    base_product = BaseProductSerializer()
    category = serializers.PrimaryKeyRelatedField(queryset=CommercialCategory.objects.all())
    subCategory = serializers.PrimaryKeyRelatedField(queryset=CommercialSubCategory.objects.all(), allow_null=True)
    variants = VariantSerializer(many=True, read_only=True)
    media = MediaSerializer(many=True, read_only=True)

    class Meta(BaseSerializer.Meta):
        model = CommercialProduct
        fields = BaseSerializer.Meta.fields + [
            'base_product', 'category', 'subCategory', 'caracteristiques', 'fournisseur_verifie', 'variants', 'media'
        ]

    def validate_caracteristiques(self, value):
        if not value:
            raise serializers.ValidationError("Les caractéristiques ne peuvent pas être vides")
        return value

    def create(self, validated_data):
        base_product_data = validated_data.pop('base_product')
        base_product = BaseProduct.objects.create(**base_product_data)
        return CommercialProduct.objects.create(base_product=base_product, **validated_data)

    def update(self, instance, validated_data):
        base_product_data = validated_data.pop('base_product', None)
        if base_product_data:
            for attr, value in base_product_data.items():
                setattr(instance.base_product, attr, value)
            instance.base_product.save()
        return super().update(instance, validated_data)