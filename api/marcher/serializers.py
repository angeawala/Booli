from rest_framework import serializers
from .models import Shop, Company, Doctor, Mark, Supermarket
from category.serializers import CategorySerializer, SubCategorySerializer

class ShopSerializer(serializers.ModelSerializer):
    categories = CategorySerializer(many=True, read_only=True)
    subcategories = SubCategorySerializer(many=True, read_only=True)

    class Meta:
        model = Shop
        fields = [
            'id', 'image', 'email', 'description', 'contact', 'address', 
            'average_rating', 'rating_count', 'categories', 'subcategories', 
            'created_by', 'created_at', 'updated_at'
        ]
        read_only_fields = ['created_by', 'created_at', 'updated_at', 'average_rating', 'rating_count']

    def create(self, validated_data):
        request = self.context.get('request')
        if request and hasattr(request, 'user') and request.user.is_authenticated:
            validated_data['created_by'] = request.user
        return super().create(validated_data)

class CompanySerializer(serializers.ModelSerializer):
    categories = CategorySerializer(many=True, read_only=True)

    class Meta:
        model = Company
        fields = [
            'id', 'image', 'email', 'description', 'contact', 'address', 
            'average_rating', 'rating_count', 'categories', 'website', 'purpose', 
            'created_by', 'created_at', 'updated_at'
        ]
        read_only_fields = ['created_by', 'created_at', 'updated_at', 'average_rating', 'rating_count']

    def create(self, validated_data):
        request = self.context.get('request')
        if request and hasattr(request, 'user') and request.user.is_authenticated:
            validated_data['created_by'] = request.user
        return super().create(validated_data)

class DoctorSerializer(serializers.ModelSerializer):
    categories = CategorySerializer(many=True, read_only=True)

    class Meta:
        model = Doctor
        fields = [
            'id', 'image', 'email', 'description', 'contact', 'address', 
            'average_rating', 'rating_count', 'categories', 'specialty', 
            'created_by', 'created_at', 'updated_at'
        ]
        read_only_fields = ['created_by', 'created_at', 'updated_at', 'average_rating', 'rating_count']

    def create(self, validated_data):
        request = self.context.get('request')
        if request and hasattr(request, 'user') and request.user.is_authenticated:
            validated_data['created_by'] = request.user
        return super().create(validated_data)

class MarkSerializer(serializers.ModelSerializer):
    categories = CategorySerializer(many=True, read_only=True)

    class Meta:
        model = Mark
        fields = [
            'id', 'image', 'email', 'description', 'contact', 'address', 
            'average_rating', 'rating_count', 'categories', 
            'created_by', 'created_at', 'updated_at'
        ]
        read_only_fields = ['created_by', 'created_at', 'updated_at', 'average_rating', 'rating_count']

    def create(self, validated_data):
        request = self.context.get('request')
        if request and hasattr(request, 'user') and request.user.is_authenticated:
            validated_data['created_by'] = request.user
        return super().create(validated_data)

class SupermarketSerializer(serializers.ModelSerializer):
    categories = CategorySerializer(many=True, read_only=True)

    class Meta:
        model = Supermarket
        fields = [
            'id', 'image', 'email', 'description', 'contact', 'address', 
            'average_rating', 'rating_count', 'categories', 
            'created_by', 'created_at', 'updated_at'
        ]
        read_only_fields = ['created_by', 'created_at', 'updated_at', 'average_rating', 'rating_count']

    def create(self, validated_data):
        request = self.context.get('request')
        if request and hasattr(request, 'user') and request.user.is_authenticated:
            validated_data['created_by'] = request.user
        return super().create(validated_data)