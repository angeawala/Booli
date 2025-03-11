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
    list_display = ('from_devise', 'to_devise', 'conversion_rate', 'created_by', 'created_at')
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
    list_display = ('method', 'type', 'total', 'devise', 'status', 'created_by', 'created_at')
    list_filter = ('method', 'type', 'status', 'created_at')
    search_fields = ('transaction_id',)
    #readonly_fields = ('detail',)  # Affiché mais non éditable directement


# Invoice
@admin.register(Invoice)
class InvoiceAdmin(admin.ModelAdmin):
    list_display = ('payment', 'created_by', 'created_at')
    list_filter = ('created_at',)
    search_fields = ('payment__transaction_id',)
    readonly_fields = ('detail', 'file')  # Affichés mais non éditables