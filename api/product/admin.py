from django.contrib import admin
from .models import (
    BaseProduct
)

@admin.register(BaseProduct)
class BaseProductAdmin(admin.ModelAdmin):
    list_display = ('name', 'category', 'subcategory', 'devise', 'price', 'created_by', 'created_at')
    list_filter = ('category', 'subcategory', 'created_by')
    search_fields = ('name', 'category__name', 'subcategory__name')
    list_per_page = 25
    ordering = ('name',)
    date_hierarchy = 'created_at'
    readonly_fields = ('created_by', 'created_at', 'updated_at')

    fieldsets = (
        (None, {
            'fields': ('name', 'category', 'subcategory', 'price')
        }),
        ('Métadonnées', {
            'fields': ('created_by', 'created_at', 'updated_at'),
            'classes': ('collapse',)
        }),
    )
