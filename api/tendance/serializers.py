from rest_framework import serializers
from .models import Trend
from product.serializers import BaseProductSerializer

class TrendSerializer(serializers.ModelSerializer):
    base_product = BaseProductSerializer(read_only=True)

    class Meta:
        model = Trend
        fields = ['id', 'base_product', 'score', 'period', 'calculated_at']