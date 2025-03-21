# payement/serializers.py
from rest_framework import serializers
from .models import PaymentMethod, Payment, Invoice
from utils.serializers import DeviseSerializer


class PaymentMethodSerializer(serializers.ModelSerializer):
    class Meta:
        model = PaymentMethod
        fields = "__all__"


class PaymentSerializer(serializers.ModelSerializer):
    method = PaymentMethodSerializer(read_only=True)
    devise = DeviseSerializer(read_only=True)

    class Meta:
        model = Payment
        fields = "__all__"


class InvoiceSerializer(serializers.ModelSerializer):
    payment = PaymentSerializer(read_only=True)

    class Meta:
        model = Invoice
        fields = "__all__"