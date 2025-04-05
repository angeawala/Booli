from rest_framework import serializers
from core.serializers import BaseSerializer
from .models import BaseProduct, Review

class ReviewSerializer(BaseSerializer):
    product = serializers.PrimaryKeyRelatedField(queryset=BaseProduct.objects.all())
    class Meta(BaseSerializer.Meta):
        model = Review
        fields = BaseSerializer.Meta.fields + ['product', 'note', 'commentaire']

class BaseProductSerializer(BaseSerializer):
    reviews = ReviewSerializer(many=True, read_only=True)  # Ajout de reviews

    class Meta(BaseSerializer.Meta):
        model = BaseProduct
        fields = BaseSerializer.Meta.fields + [
            'name', 'image', 'description', 'prix_normal', 'prix_reduit',
            'stock', 'is_available', 'product_type', 'reviews'
        ]

    def validate(self, data):
        if 'prix_reduit' in data and data['prix_reduit'] and data['prix_reduit'].get('valeur') >= data['prix_normal'].get('valeur'):
            raise serializers.ValidationError("Le prix réduit doit être inférieur au prix normal")
        return data