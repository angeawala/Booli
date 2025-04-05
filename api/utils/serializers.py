# utils/serializers.py
from rest_framework import serializers
from core.serializers import BaseSerializer
from .models import Devise, TauxEchange, Pays, Ville, Adresse

class DeviseSerializer(BaseSerializer):
    class Meta(BaseSerializer.Meta):
        model = Devise
        fields = BaseSerializer.Meta.fields + ['name', 'code', 'symbol']

class DeviseListSerializer(BaseSerializer):
    class Meta(BaseSerializer.Meta):
        model = Devise
        fields = BaseSerializer.Meta.fields + ['name', 'code', 'symbol']

class TauxEchangeSerializer(BaseSerializer):
    from_currency_id = serializers.CharField(source='devise_from.code')
    to_currency_id = serializers.CharField(source='devise_to.code')
    rate = serializers.FloatField(source='taux')
    class Meta(BaseSerializer.Meta):
        model = TauxEchange
        fields = BaseSerializer.Meta.fields + ['from_currency_id', 'to_currency_id', 'rate']

class TauxEchangeListSerializer(BaseSerializer):
    from_currency_id = serializers.CharField(source='devise_from.code')
    to_currency_id = serializers.CharField(source='devise_to.code')
    rate = serializers.FloatField(source='taux')
    class Meta(BaseSerializer.Meta):
        model = TauxEchange
        fields = BaseSerializer.Meta.fields + ['from_currency_id', 'to_currency_id', 'rate']

class PaysSerializer(BaseSerializer):
    class Meta(BaseSerializer.Meta):
        model = Pays
        fields = BaseSerializer.Meta.fields + ['name', 'code']

class VilleSerializer(BaseSerializer):
    pays_id = serializers.CharField(source='pays.code')
    class Meta(BaseSerializer.Meta):
        model = Ville
        fields = BaseSerializer.Meta.fields + ['name', 'pays_id']

class AdresseSerializer(BaseSerializer):
    city_id = serializers.CharField(source='city.id')
    class Meta(BaseSerializer.Meta):
        model = Adresse
        fields = BaseSerializer.Meta.fields + ['street', 'postal_code', 'city_id']