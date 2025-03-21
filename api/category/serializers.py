# categories/serializers.py 
from core.serializers import BaseSerializer
from .models import Category, SubCategory

class SubCategorySerializer(BaseSerializer):
    class Meta(BaseSerializer.Meta):
        model = SubCategory
        fields = BaseSerializer.Meta.fields + ['name', 'image', 'category']

class CategorySerializer(BaseSerializer):
    subcategories = SubCategorySerializer(many=True, read_only=True)

    class Meta(BaseSerializer.Meta):
        model = Category
        fields = BaseSerializer.Meta.fields + ['name', 'category_type', 'is_non_tech', 'image', 'icon', 'subcategories']