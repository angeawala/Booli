from django.contrib import admin
from .models import PharmacyCategory, PharmacyProduct, Doctor

# PharmacyCategory
@admin.register(PharmacyCategory)
class PharmacyCategoryAdmin(admin.ModelAdmin):
    list_display = ('name', 'description', 'created_at')
    search_fields = ('name',)
    list_per_page = 20

    fieldsets = (
        ("Détails de la catégorie", {
            'fields': ('name', 'description')
        }),
        ("Métadonnées", {
            'fields': ('created_at', 'updated_at', 'created_by', 'updated_by'),
            'classes': ('collapse',)
        }),
    )

    readonly_fields = ('created_at', 'updated_at', 'created_by', 'updated_by')


# PharmacyProduct
@admin.register(PharmacyProduct)
class PharmacyProductAdmin(admin.ModelAdmin):
    list_display = ('base_product', 'category', 'expiration_date', 'precautions')
    search_fields = ('base_product__name', 'category__name')
    list_filter = ('category', 'expiration_date')
    list_per_page = 20

    fieldsets = (
        ("Détails du produit pharmaceutique", {
            'fields': ('base_product', 'category', 'precautions', 'expiration_date')
        }),
        ("Métadonnées", {
            'fields': ('created_at', 'updated_at', 'created_by', 'updated_by'),
            'classes': ('collapse',)
        }),
    )

    readonly_fields = ('created_at', 'updated_at', 'created_by', 'updated_by')


# Doctor
@admin.register(Doctor)
class DoctorAdmin(admin.ModelAdmin):
    list_display = ('name', 'specialty', 'contact', 'email')
    search_fields = ('name', 'specialty', 'contact', 'email')
    list_per_page = 20

    fieldsets = (
        ("Détails du docteur", {
            'fields': ('name', 'specialty', 'contact', 'email')
        }),
        ("Métadonnées", {
            'fields': ('created_at', 'updated_at', 'created_by', 'updated_by'),
            'classes': ('collapse',)
        }),
    )

    readonly_fields = ('created_at', 'updated_at', 'created_by', 'updated_by')
