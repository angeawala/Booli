# pdf/serializers.py (corrigé)
from rest_framework import serializers
from core.serializers import BaseSerializer
from .models import BookPDF, DownloadLink

class BookPDFSerializer(BaseSerializer):
    file = serializers.FileField()

    class Meta(BaseSerializer.Meta):
        model = BookPDF
        fields = BaseSerializer.Meta.fields + ['book', 'is_free', 'file', 'prix']

    def validate(self, data):
        if not data.get('is_free') and not data.get('prix'):
            raise serializers.ValidationError("Un PDF non gratuit doit avoir un prix")
        if data.get('is_free') and data.get('prix'):
            raise serializers.ValidationError("Un PDF gratuit ne doit pas avoir de prix")
        return data

class DownloadLinkSerializer(BaseSerializer):
    class Meta(BaseSerializer.Meta):
        model = DownloadLink
        fields = BaseSerializer.Meta.fields + ['user', 'book_pdf', 'link', 'download_limit', 'downloads_used']
        read_only_fields = ['link', 'downloads_used']

class AccessPDFResponseSerializer(serializers.Serializer):
    access = serializers.BooleanField()
    pdf_id = serializers.UUIDField(required=False)
    message = serializers.CharField(required=False)

class StreamPDFResponseSerializer(serializers.Serializer):
    error = serializers.CharField(required=False)

class DownloadPDFResponseSerializer(serializers.Serializer):
    error = serializers.CharField(required=False)