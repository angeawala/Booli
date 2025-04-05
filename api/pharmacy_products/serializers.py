# pharmacy_products/serializers.py
from rest_framework import serializers
from core.serializers import BaseSerializer
from base_products.models import BaseProduct
from base_products.serializers import BaseProductSerializer
from .models import PharmacyProduct, PharmacyCategory, Doctor

class PharmacyCategorySerializer(BaseSerializer):
    class Meta(BaseSerializer.Meta):
        model = PharmacyCategory
        fields = BaseSerializer.Meta.fields + ['name', 'description']

class PharmacyProductSerializer(BaseSerializer):
    base_product = BaseProductSerializer()
    category = serializers.PrimaryKeyRelatedField(queryset=PharmacyCategory.objects.all())

    class Meta(BaseSerializer.Meta):
        model = PharmacyProduct
        fields = BaseSerializer.Meta.fields + [
            'base_product', 'category', 'precautions', 'expiration_date'
        ]

    def validate_expiration_date(self, value):
        from django.utils import timezone
        if value < timezone.now().date():
            raise serializers.ValidationError("La date d'expiration doit être future")
        return value

    def create(self, validated_data):
        base_product_data = validated_data.pop('base_product')
        base_product = BaseProduct.objects.create(**base_product_data)
        return PharmacyProduct.objects.create(base_product=base_product, **validated_data)

    def update(self, validated_data):
        base_product_data = validated_data.pop('base_product', None)
        instance = super().update(validated_data)
        if base_product_data:
            for attr, value in base_product_data.items():
                setattr(instance.base_product, attr, value)
            instance.base_product.save()
        return instance

class DoctorSerializer(BaseSerializer):
    class Meta(BaseSerializer.Meta):
        model = Doctor
        fields = BaseSerializer.Meta.fields + ['name', 'specialty', 'contact', 'email']

class ContactDoctorSerializer(serializers.Serializer):
    client_email = serializers.EmailField()
    client_contact = serializers.CharField(max_length=100)
    message = serializers.CharField(max_length=1000)

    def validate_message(self, value):
        if not value.strip():
            raise serializers.ValidationError("Le message ne peut pas être vide")
        return value