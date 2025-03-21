# avis/serializers.py
from rest_framework import serializers
from core.serializers import BaseSerializer
from .models import Avis

class AvisSerializer(BaseSerializer):
    class Meta(BaseSerializer.Meta):
        model = Avis
        fields = BaseSerializer.Meta.fields + ['note', 'commentaire', 'type', 'product_id']