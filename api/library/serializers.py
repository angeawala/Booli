# library/serializers.py
from rest_framework import serializers
from product.models import BaseProduct
from .models import Book, BookPDF, PlanAbonnement, Abonnement
from product.serializers import BaseProductSerializer

class BookPDFSerializer(serializers.ModelSerializer):
    class Meta:
        model = BookPDF
        fields = ['id', 'book_product', 'pdf_file', 'pdf_price', 'is_free']

class PlanAbonnementSerializer(serializers.ModelSerializer):
    class Meta:
        model = PlanAbonnement
        fields = ['id', 'nom', 'temps', 'prix', 'devise']

class SubscriptionSerializer(serializers.ModelSerializer):
    plan = PlanAbonnementSerializer(read_only=True)
    plan_id = serializers.PrimaryKeyRelatedField(queryset=PlanAbonnement.objects.all(), source='plan', write_only=True)

    class Meta:
        model = Abonnement
        fields = ['id', 'user', 'plan', 'plan_id', 'code', 'date_debut', 'date_expiration', 'payment', 'actif']
        read_only_fields = ['user', 'code', 'date_debut', 'date_expiration']

    def create(self, validated_data):
        validated_data['user'] = self.context['request'].user
        return Abonnement.objects.create(**validated_data)

class BookSerializer(serializers.ModelSerializer):
    base_product = BaseProductSerializer()
    pdf = BookPDFSerializer(read_only=True)
    physical_price = serializers.SerializerMethodField()
    has_pdf = serializers.SerializerMethodField()
    pdf_is_paid = serializers.SerializerMethodField()
    pdf_price = serializers.SerializerMethodField()
    pdf_url = serializers.SerializerMethodField()

    class Meta:
        model = Book
        fields = [
            'id', 'base_product', 'author', 'isbn', 'genre', 'publisher', 'publication_date',
            'pages', 'language', 'format', 'created_by', 'cover', 'pdf', 'physical_price',
            'has_pdf', 'pdf_is_paid', 'pdf_price', 'pdf_url'
        ]
        read_only_fields = ['created_by']

    def get_physical_price(self, obj):
        return obj.physical_price

    def get_has_pdf(self, obj):
        return hasattr(obj, 'pdf') and obj.pdf.pdf_file is not None

    def get_pdf_is_paid(self, obj):
        return hasattr(obj, 'pdf') and not obj.pdf.is_free

    def get_pdf_price(self, obj):
        return obj.pdf.pdf_price if hasattr(obj, 'pdf') and obj.pdf.pdf_price is not None else None

    def get_pdf_url(self, obj):
        return obj.pdf.pdf_file.url if hasattr(obj, 'pdf') and obj.pdf.pdf_file else None

    def create(self, validated_data):
        base_product_data = validated_data.pop('base_product')
        user = self.context['request'].user
        base_product = BaseProduct.objects.create(**base_product_data, created_by=user)
        book = Book.objects.create(base_product=base_product, created_by=user, **validated_data)
        return book

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