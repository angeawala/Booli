# promotions/admin.py

from django.contrib import admin
from .models import Promotion

@admin.register(Promotion)
class PromotionAdmin(admin.ModelAdmin):
    list_display = (
        'product',
        'discount_percentage',
        'old_price_display',
        'new_price_display',
        'end_time',
        'is_active_display',
        'created_at',
    )
    search_fields = ('product__name',)
    list_filter = ('end_time',)
    list_per_page = 20

    fieldsets = (
        ("Détails de la promotion", {
            'fields': (
                'product',
                'discount_percentage',
                'old_price',
                'new_price',
                'end_time',
            )
        }),
        ("Métadonnées", {
            'fields': ('created_at', 'updated_at', 'created_by', 'updated_by'),
            'classes': ('collapse',)
        }),
    )

    readonly_fields = ('created_at', 'updated_at', 'created_by', 'updated_by')

    def is_active_display(self, obj):
        return obj.is_active()
    is_active_display.boolean = True
    is_active_display.short_description = "Active ?"

    def old_price_display(self, obj):
        return f"{obj.old_price.get('valeur')} {obj.old_price.get('devise')}"
    old_price_display.short_description = "Prix avant"

    def new_price_display(self, obj):
        return f"{obj.new_price.get('valeur')} {obj.new_price.get('devise')}"
    new_price_display.short_description = "Prix après"
