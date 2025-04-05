from django.contrib import admin
from .models import Cart, CartItem

class CartItemInline(admin.TabularInline):
    model = CartItem
    extra = 1  # Nombre de lignes supplémentaires pour l'ajout d'éléments dans un panier
    fields = ('product', 'variant', 'quantity', 'type', 'prix')
    readonly_fields = ('product', 'variant', 'type', 'prix')

class CartAdmin(admin.ModelAdmin):
    list_display = ('user', 'session_key', 'devise', 'created_at', 'updated_at')
    search_fields = ('user__username', 'session_key')
    list_filter = ('devise', 'created_at')
    inlines = [CartItemInline]  # Afficher les éléments du panier directement dans l'administration du panier

class CartItemAdmin(admin.ModelAdmin):
    list_display = ('cart', 'product', 'variant', 'quantity', 'type', 'prix', 'created_at')
    search_fields = ('cart__user__username', 'product', 'variant', 'type')
    list_filter = ('cart__devise', 'type', 'created_at')

# Enregistrement des modèles dans l'admin
admin.site.register(Cart, CartAdmin)
admin.site.register(CartItem, CartItemAdmin)
