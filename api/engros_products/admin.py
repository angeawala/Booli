from django.contrib import admin
from .models import EngrosProduct

# Admin pour le modèle EngrosProduct
@admin.register(EngrosProduct)
class EngrosProductAdmin(admin.ModelAdmin):
    list_display = ('commercial_product', 'stock', 'pricing_tiers', 'created_at', 'updated_at')
    search_fields = ('commercial_product__name',)  # Recherche par le nom du produit commercial associé
    list_filter = ('stock',)  # Filtrer par stock
    list_per_page = 20
    ordering = ('-created_at',)  # Trier par date de création (décroissant)

    fieldsets = (
        (None, {
            'fields': ('commercial_product', 'pricing_tiers', 'stock')
        }),
        ('Dates', {
            'fields': ('created_at', 'updated_at'),
            'classes': ('collapse',),
        }),
    )

    readonly_fields = ('created_at', 'updated_at')

    def get_pricing_tiers(self, obj):
        return ', '.join([f"{tier['minQuantity']} - {tier['discountPercentage']}%" for tier in obj.pricing_tiers])  # Affiche les tiers de tarification sous forme de texte
    get_pricing_tiers.short_description = 'Tiers de tarification'

