from django.contrib import admin
from .models import Devise, ExchangeRate, PaymentMethod, Payment, Invoice

# Devise
@admin.register(Devise)
class DeviseAdmin(admin.ModelAdmin):
    list_display = ('code', 'name', 'created_by', 'created_at')
    search_fields = ('code', 'name')
    ordering = ('code',)

# ExchangeRate
@admin.register(ExchangeRate)
class ExchangeRateAdmin(admin.ModelAdmin):
    list_display = ('from_devise', 'to_devise', 'rate', 'created_by', 'created_at')  # 'conversion_rate' -> 'rate'
    list_filter = ('from_devise', 'to_devise')
    search_fields = ('from_devise__code', 'to_devise__code')
    ordering = ('from_devise',)

# PaymentMethod
@admin.register(PaymentMethod)
class PaymentMethodAdmin(admin.ModelAdmin):
    list_display = ('name', 'created_by', 'created_at')
    search_fields = ('name',)
    ordering = ('name',)

# Payment
@admin.register(Payment)
class PaymentAdmin(admin.ModelAdmin):
    list_display = ('payment_method', 'amount', 'devise', 'status', 'created_by', 'created_at')  # 'method' -> 'payment_method', 'total' -> 'amount', suppression de 'type'
    list_filter = ('payment_method', 'status', 'created_at')  # 'method' -> 'payment_method', suppression de 'type'
    search_fields = ('commande__id',)  # Remplace 'transaction_id' par quelque chose de pertinent

# Invoice
@admin.register(Invoice)
class InvoiceAdmin(admin.ModelAdmin):
    list_display = ('commande', 'invoice_number', 'amount', 'created_by', 'created_at')  # 'payment' -> 'commande', ajout de champs utiles
    list_filter = ('created_at',)
    search_fields = ('invoice_number', 'commande__id')  # Ajusté pour incl