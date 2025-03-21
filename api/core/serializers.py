# core/serializers.py
from rest_framework import serializers
from .models import BaseModel

class BaseSerializer(serializers.ModelSerializer):
    created_by = serializers.StringRelatedField()
    updated_by = serializers.StringRelatedField()

    class Meta:
        model = BaseModel
        fields = ['id', 'created_by', 'created_at', 'updated_by', 'updated_at']
        read_only_fields = ['id', 'created_by', 'created_at', 'updated_by', 'updated_at']

    def validate(self, data):
        for field in ['id', 'created_by', 'created_at', 'updated_by', 'updated_at']:
            if field in data:
                raise serializers.ValidationError(f"Le champ {field} ne peut pas être modifié.")
        return data
