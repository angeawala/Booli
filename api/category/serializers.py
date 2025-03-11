# myapp/serializers.py (mise à jour)
from rest_framework import serializers
from drf_spectacular.utils import extend_schema_field
from .models import Category, SubCategory

class SubCategorySerializer(serializers.ModelSerializer):
    filter_url = serializers.SerializerMethodField()

    class Meta:
        model = SubCategory
        fields = ['id', 'name', 'image', 'filter_url']

    @extend_schema_field(serializers.CharField)
    def get_filter_url(self, obj):
        return f"/api/products/?subcategory={obj.id}"

class CategorySerializer(serializers.ModelSerializer):
    subcategories = SubCategorySerializer(many=True, read_only=True)
    filter_url = serializers.SerializerMethodField()
    subcategories_url = serializers.SerializerMethodField()  # Nouveau champ

    class Meta:
        model = Category
        fields = ['id', 'name', 'icon', 'image', 'is_electronic', 'subcategories', 'filter_url', 'subcategories_url']

    @extend_schema_field(serializers.CharField)
    def get_filter_url(self, obj):
        return f"/api/products/?category={obj.id}"

    @extend_schema_field(serializers.CharField)
    def get_subcategories_url(self, obj):
        # Lien vers une API qui liste les sous-catégories de cette catégorie
        return f"/api/subcategories/?category={obj.id}"