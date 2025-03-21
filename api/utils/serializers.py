# utils/serializers.py
from rest_framework import serializers
from core.serializers import BaseSerializer
from .models import Devise, TauxEchange, Pays, Ville, Adresse

class DeviseSerializer(BaseSerializer):
    class Meta(BaseSerializer.Meta):
        model = Devise
        fields = BaseSerializer.Meta.fields + ['name', 'code', 'symbol']

class TauxEchangeSerializer(BaseSerializer):
    devise_from = serializers.StringRelatedField()
    devise_to = serializers.StringRelatedField()
    class Meta(BaseSerializer.Meta):
        model = TauxEchange
        fields = BaseSerializer.Meta.fields + ['devise_from', 'devise_to', 'taux']

class PaysSerializer(BaseSerializer):
    class Meta(BaseSerializer.Meta):
        model = Pays
        fields = BaseSerializer.Meta.fields + ['name', 'code']

class VilleSerializer(BaseSerializer):
    pays = serializers.StringRelatedField()
    class Meta(BaseSerializer.Meta):
        model = Ville
        fields = BaseSerializer.Meta.fields + ['name', 'pays']

class AdresseSerializer(BaseSerializer):
    ville = serializers.StringRelatedField()
    class Meta(BaseSerializer.Meta):
        model = Adresse
        fields = BaseSerializer.Meta.fields + ['rue', 'code_postal', 'ville']