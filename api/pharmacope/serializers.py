# pharmacope/serializers.py
from rest_framework import serializers
from product.serializers import BaseProductSerializer
from product.models import BaseProduct
from .models import PharmacopeProduct



class PharmacopeProductSerializer(serializers.ModelSerializer):
    base_product = BaseProductSerializer()

    class Meta:
        model = PharmacopeProduct
        fields = [
            'id', 'base_product', 'monograph_code',
            'purity_criteria', 'quality_tests', 'is_active', 'created_at', 'updated_at'
        ]
        read_only_fields = ['created_at', 'updated_at']

    def create(self, validated_data):
        base_product_data = validated_data.pop('base_product')
        user = self.context['request'].user
        base_product = BaseProduct.objects.create(**base_product_data, created_by=user)
        pharmacope_product = PharmacopeProduct.objects.create(
            base_product=base_product, created_by=user, **validated_data
        )
        return pharmacope_product

    def update(self, instance, validated_data):
        base_product_data = validated_data.pop('base_product', None)
        if base_product_data:
            for attr, value in base_product_data.items():
                setattr(instance.base_product, attr, value)
            instance.base_product.save()
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()
        return instance