# product/serializers.py
from rest_framework import serializers
from core.serializers import BaseSerializer
from .models import BaseProduct
from category.models import Category, SubCategory
from utils.models import Devise

class BaseProductSerializer(BaseSerializer):
    category = serializers.PrimaryKeyRelatedField(queryset=Category.objects.all(), allow_null=True)
    subcategory = serializers.PrimaryKeyRelatedField(queryset=SubCategory.objects.all(), allow_null=True)
    devise = serializers.PrimaryKeyRelatedField(queryset=Devise.objects.all(), allow_null=True)

    class Meta(BaseSerializer.Meta):
        model = BaseProduct
        fields = BaseSerializer.Meta.fields + [
            'name', 'category', 'subcategory', 'price', 'discount_price', 'stock', 'devise'
        ]