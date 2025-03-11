# utils/serializers.py
from rest_framework import serializers
from .models import Country, City, Address,  PlanAbonnement, Abonnement


class CountrySerializer(serializers.ModelSerializer):
    class Meta:
        model = Country
        fields = "__all__"


class CitySerializer(serializers.ModelSerializer):
    country = CountrySerializer(read_only=True)

    class Meta:
        model = City
        fields = "__all__"


class AddressSerializer(serializers.ModelSerializer):
    city = CitySerializer(read_only=True)

    class Meta:
        model = Address
        fields = "__all__"

class PlanAbonnementSerializer(serializers.ModelSerializer):
    class Meta:
        model = PlanAbonnement
        fields = ['id', 'nom', 'temps', 'prix', 'devise', 'created_at', 'updated_at']

class AbonnementSerializer(serializers.ModelSerializer):
    plan = PlanAbonnementSerializer(read_only=True)
    plan_id = serializers.UUIDField(write_only=True, source='plan.id')

    class Meta:
        model = Abonnement
        fields = ['id', 'user', 'plan', 'plan_id', 'payment', 'code', 'date_debut', 'date_expiration', 'actif', 'created_at', 'updated_at']
        read_only_fields = ['user', 'code', 'date_debut', 'date_expiration', 'created_at', 'updated_at']