# books/serializers.py
from rest_framework import serializers
from core.serializers import BaseSerializer
from base_products.serializers import BaseProductSerializer
from base_products.models import BaseProduct
from .models import Book, BookCategory

class BookCategorySerializer(BaseSerializer):
    class Meta(BaseSerializer.Meta):
        model = BookCategory
        fields = BaseSerializer.Meta.fields + ['name', 'description']

class BookSerializer(BaseSerializer):
    base_product = BaseProductSerializer()
    category = serializers.PrimaryKeyRelatedField(queryset=BookCategory.objects.all())

    class Meta(BaseSerializer.Meta):
        model = Book
        fields = BaseSerializer.Meta.fields + [
            'base_product', 'category', 'genre', 'editeur', 'parution',
            'pages', 'langue', 'format', 'has_pdf'
        ]

    def validate(self, data):
        if data['pages'] <= 0:
            raise serializers.ValidationError("Le nombre de pages doit être supérieur à 0")
        return data

    def create(self, validated_data):
        base_product_data = validated_data.pop('base_product')
        base_product = BaseProduct.objects.create(**base_product_data)
        book = Book.objects.create(base_product=base_product, **validated_data)
        return book

    def update(self, instance, validated_data):
        base_product_data = validated_data.pop('base_product', None)
        if base_product_data:
            for attr, value in base_product_data.items():
                setattr(instance.base_product, attr, value)
            instance.base_product.save()
        return super().update(instance, validated_data)