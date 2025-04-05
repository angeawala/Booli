from django.contrib import admin
from django.utils.translation import gettext_lazy as _
from .models import Order, OrderItem, Refund

# Admin pour le modèle Order
@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_display = ('code', 'user', 'total', 'status', 'adresse', 'shipping_cost', 'created_at', 'updated_at')
    search_fields = ('code', 'user__username')
    list_filter = ('status',)  # Filtrer par statut de la commande
    list_per_page = 20
    ordering = ('-created_at',)  # Trier par date de création (décroissant)

    fieldsets = (
        (None, {
            'fields': ('user', 'code', 'total', 'status', 'adresse', 'shipping_cost')
        }),
        ('Dates', {
            'fields': ('created_at', 'updated_at'),
            'classes': ('collapse',),
        }),
    )

    readonly_fields = ('created_at', 'updated_at')

    def get_total(self, obj):
        return obj.total.get('valeur', None)  # Exemple pour afficher la valeur du total
    get_total.short_description = _('Total')

    def get_shipping_cost(self, obj):
        return obj.shipping_cost.get('valeur', None)  # Exemple pour afficher les frais de livraison
    get_shipping_cost.short_description = _('Frais de livraison')


# Admin pour le modèle OrderItem
@admin.register(OrderItem)
class OrderItemAdmin(admin.ModelAdmin):
    list_display = ('order', 'product', 'variant', 'quantity', 'prix', 'created_at')
    search_fields = ('product',)
    list_filter = ('order__status',)  # Filtrer par statut de la commande associée
    list_per_page = 20
    ordering = ('-created_at',)

    fieldsets = (
        (None, {
            'fields': ('order', 'product', 'variant', 'quantity', 'prix')
        }),
        ('Dates', {
            'fields': ('created_at', 'updated_at'),
            'classes': ('collapse',),
        }),
    )

    readonly_fields = ('created_at', 'updated_at')

    def get_prix(self, obj):
        return obj.prix.get('valeur', None)  # Exemple pour afficher la valeur du prix
    get_prix.short_description = _('Prix')

    def get_devise(self, obj):
        return obj.prix.get('devise', None)  # Exemple pour afficher la devise
    get_devise.short_description = _('Devise')


# Admin pour le modèle Refund
@admin.register(Refund)
class RefundAdmin(admin.ModelAdmin):
    list_display = ('order', 'status', 'requested_at', 'created_at', 'updated_at')
    search_fields = ('order__code', 'reason')
    list_filter = ('status',)  # Filtrer par statut de remboursement
    list_per_page = 20
    ordering = ('-requested_at',)

    fieldsets = (
        (None, {
            'fields': ('order', 'reason', 'proof', 'status')
        }),
        ('Dates', {
            'fields': ('requested_at', 'created_at', 'updated_at'),
            'classes': ('collapse',),
        }),
    )

    readonly_fields = ('created_at', 'updated_at', 'requested_at')
