# subscriptions/serializers.py
from rest_framework import serializers
from core.serializers import BaseSerializer
from .models import Plan, Subscription

class PlanSerializer(BaseSerializer):
    class Meta(BaseSerializer.Meta):
        model = Plan
        fields = BaseSerializer.Meta.fields + ['nom', 'prix', 'duree']

    def validate_prix(self, value):
        if value.get('valeur') <= 0:
            raise serializers.ValidationError("Le prix doit être supérieur à 0")
        return value

class SubscriptionSerializer(BaseSerializer):
    class Meta(BaseSerializer.Meta):
        model = Subscription
        fields = BaseSerializer.Meta.fields + [
            'user', 'plan', 'code_verification', 'is_active', 'is_expired',
            'start_date', 'end_date', 'device'
        ]
        read_only_fields = ['code_verification', 'start_date', 'end_date', 'is_expired']

    def validate(self, data):
        if data.get('is_active'):
            user = self.context['request'].user
            active_subs = Subscription.objects.filter(user=user, is_active=True, is_expired=False)
            for sub in active_subs:
                if sub.device == data['device']:
                    raise serializers.ValidationError("Cet appareil est déjà utilisé par un autre abonnement actif")
        return data