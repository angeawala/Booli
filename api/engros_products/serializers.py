# engros_products/serializers.py (corrigé)
from rest_framework import serializers
from drf_spectacular.utils import extend_schema_field  # Import ajouté
from core.serializers import BaseSerializer
from commercial_products.serializers import CommercialProductSerializer
from commercial_products.models import CommercialProduct
from .models import EngrosProduct

class EngrosProductSerializer(BaseSerializer):
    commercial_product = CommercialProductSerializer(read_only=True)
    commercial_product_id = serializers.PrimaryKeyRelatedField(
        queryset=CommercialProduct.objects.all(),
        source='commercial_product',
        write_only=True
    )
    tier_prices = serializers.SerializerMethodField(read_only=True)

    class Meta(BaseSerializer.Meta):
        model = EngrosProduct
        fields = BaseSerializer.Meta.fields + [
            'commercial_product', 'commercial_product_id', 'pricing_tiers', 'stock', 'tier_prices'
        ]

    def validate_pricing_tiers(self, value):
        if not isinstance(value, list):
            raise serializers.ValidationError("pricing_tiers doit être une liste")
        for tier in value:
            if not isinstance(tier, dict) or 'minQuantity' not in tier or 'discountPercentage' not in tier:
                raise serializers.ValidationError("Chaque tier doit avoir minQuantity et discountPercentage")
            if tier['minQuantity'] <= 0:
                raise serializers.ValidationError("minQuantity doit être supérieur à 0")
            if not 0 <= tier['discountPercentage'] <= 100:
                raise serializers.ValidationError("discountPercentage doit être entre 0 et 100")
        return value

    @extend_schema_field(serializers.ListField(
        child=serializers.DictField(
            child=serializers.CharField()  # Simplifié, mais peut être détaillé davantage
        )
    ))
    def get_tier_prices(self, obj):
        """Calcule les prix par tier basé sur CommercialProduct.prix_normal."""
        base_price = obj.commercial_product.base_product.prix_normal
        return [
            {
                'minQuantity': tier['minQuantity'],
                'discountPercentage': tier['discountPercentage'],
                'price': {
                    'valeur': base_price['valeur'] * (1 - tier['discountPercentage'] / 100),
                    'devise': base_price['devise']
                }
            }
            for tier in obj.pricing_tiers
        ]