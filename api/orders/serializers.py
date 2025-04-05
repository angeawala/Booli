from rest_framework import serializers
from .models import Order, OrderItem, Refund

class OrderItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderItem
        fields = ['id', 'order', 'product', 'variant', 'quantity', 'prix']

class OrderSerializer(serializers.ModelSerializer):
    items = OrderItemSerializer(many=True, read_only=True)

    class Meta:
        model = Order
        fields = ['code', 'user', 'total', 'status', 'created_at', 'items', 'adresse', 'shipping_cost']

class RefundSerializer(serializers.ModelSerializer):
    class Meta:
        model = Refund
        fields = ['order', 'reason', 'proof', 'status', 'requested_at']