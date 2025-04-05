# promotions/serializers.py
from rest_framework import serializers
from core.serializers import BaseSerializer
from commercial_products.serializers import CommercialProductSerializer
from commercial_products.models import CommercialProduct
from .models import Promotion

class PromotionSerializer(BaseSerializer):
    product = CommercialProductSerializer(read_only=True)
    product_id = serializers.PrimaryKeyRelatedField(
        queryset=CommercialProduct.objects.all(),
        source='product',
        write_only=True
    )

    class Meta(BaseSerializer.Meta):
        model = Promotion
        fields = BaseSerializer.Meta.fields + [
            'product', 'product_id', 'discount_percentage', 'old_price', 'new_price', 'end_time'
        ]

    def validate(self, data):
        if 'old_price' not in data or 'new_price' not in data:
            product = data['product']
            discount = data['discount_percentage']
            old_price = product.base_product.prix_normal
            data['old_price'] = old_price
            data['new_price'] = {
                'valeur': old_price['valeur'] * (1 - discount / 100),
                'devise': old_price['devise']
            }
        return data