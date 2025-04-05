# shop/admin.py

from django.contrib import admin
from .models import ShopCategory, ShopSubCategory, Shop, ShopProduct

@admin.register(ShopCategory)
class ShopCategoryAdmin(admin.ModelAdmin):
    list_display = ('name', 'description', 'created_at')
    search_fields = ('name', 'description')
    list_per_page = 20

    fieldsets = (
        (None, {
            'fields': ('name', 'description', 'image')
        }),
        ('Métadonnées', {
            'fields': ('created_at', 'updated_at', 'created_by', 'updated_by'),
            'classes': ('collapse',),
        }),
    )

    readonly_fields = ('created_at', 'updated_at', 'created_by', 'updated_by')


@admin.register(ShopSubCategory)
class ShopSubCategoryAdmin(admin.ModelAdmin):
    list_display = ('name', 'description', 'category', 'created_at')
    search_fields = ('name', 'description')
    list_filter = ('category',)
    list_per_page = 20

    fieldsets = (
        (None, {
            'fields': ('name', 'description', 'category', 'image')
        }),
        ('Métadonnées', {
            'fields': ('created_at', 'updated_at', 'created_by', 'updated_by'),
            'classes': ('collapse',),
        }),
    )

    readonly_fields = ('created_at', 'updated_at', 'created_by', 'updated_by')


@admin.register(Shop)
class ShopAdmin(admin.ModelAdmin):
    list_display = (
        'email', 'contact', 'address', 'average_rating', 'rating_count', 'created_by', 'created_at'
    )
    search_fields = ('email', 'contact', 'address', 'created_by__username')
    list_filter = ('categories', 'subcategories')
    filter_horizontal = ('categories', 'subcategories')
    list_per_page = 20

    fieldsets = (
        ("Informations générales", {
            'fields': ('image', 'email', 'description', 'contact', 'address')
        }),
        ("Évaluations", {
            'fields': ('average_rating', 'rating_count')
        }),
        ("Catégories", {
            'fields': ('categories', 'subcategories')
        }),
        ("Création", {
            'fields': ('created_by',)
        }),
        ("Métadonnées", {
            'fields': ('created_at', 'updated_at', 'updated_by'),
            'classes': ('collapse',)
        }),
    )

    readonly_fields = ('created_at', 'updated_at', 'created_by', 'updated_by')

@admin.register(ShopProduct)
class ShopProductAdmin(admin.ModelAdmin):
    list_display = (
        'commercial_product', 'shop', 'expiration_date', 'is_expired_display', 'created_at'
    )
    search_fields = ('shop__email', 'commercial_product__name')
    list_filter = ('expiration_date',)
    list_per_page = 20

    fieldsets = (
        (None, {
            'fields': ('shop', 'commercial_product', 'expiration_date', 'price_override')
        }),
        ('Métadonnées', {
            'fields': ('created_at', 'updated_at', 'created_by', 'updated_by'),
            'classes': ('collapse',)
        }),
    )

    readonly_fields = ('created_at', 'updated_at', 'created_by', 'updated_by')

    def is_expired_display(self, obj):
        return obj.is_expired
    is_expired_display.boolean = True
    is_expired_display.short_description = 'Expiré ?'
