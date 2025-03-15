from django.contrib import admin
from .models import Shop, Company, Doctor, Mark, Supermarket

@admin.register(Shop)
class ShopAdmin(admin.ModelAdmin):
    list_display = ('email', 'contact', 'average_rating', 'created_by', 'created_at', 'updated_at')
    list_filter = ('categories', 'created_by')
    search_fields = ('email', 'description', 'contact', 'address')
    list_per_page = 25
    ordering = ('email',)
    date_hierarchy = 'created_at'
    readonly_fields = ('created_by', 'created_at', 'updated_at', 'average_rating', 'rating_count')

    fieldsets = (
        (None, {
            'fields': ('email', 'description', 'contact', 'address')
        }),
        ('Catégories', {
            'fields': ('categories', 'subcategories'),
            'classes': ('collapse',)
        }),
        ('Médias', {
            'fields': ('image',),
            'classes': ('collapse',)
        }),
        ('Évaluations', {
            'fields': ('average_rating', 'rating_count'),
            'classes': ('collapse',)
        }),
        ('Métadonnées', {
            'fields': ('created_by', 'created_at', 'updated_at'),
            'classes': ('collapse',)
        }),
    )

@admin.register(Company)
class CompanyAdmin(admin.ModelAdmin):
    list_display = ('email', 'purpose', 'contact', 'average_rating', 'created_by', 'created_at', 'updated_at')
    list_filter = ('purpose', 'categories', 'created_by')
    search_fields = ('email', 'description', 'contact', 'address', 'website')
    list_per_page = 25
    ordering = ('email',)
    date_hierarchy = 'created_at'
    readonly_fields = ('created_by', 'created_at', 'updated_at', 'average_rating', 'rating_count')

    fieldsets = (
        (None, {
            'fields': ('email', 'description', 'contact', 'address', 'purpose', 'website')
        }),
        ('Catégories', {
            'fields': ('categories',),
            'classes': ('collapse',)
        }),
        ('Médias', {
            'fields': ('image',),
            'classes': ('collapse',)
        }),
        ('Évaluations', {
            'fields': ('average_rating', 'rating_count'),
            'classes': ('collapse',)
        }),
        ('Métadonnées', {
            'fields': ('created_by', 'created_at', 'updated_at'),
            'classes': ('collapse',)
        }),
    )

@admin.register(Doctor)
class DoctorAdmin(admin.ModelAdmin):
    list_display = ('email', 'specialty', 'contact', 'average_rating', 'created_by', 'created_at', 'updated_at')
    list_filter = ('categories', 'created_by')
    search_fields = ('email', 'specialty', 'description', 'contact', 'address')
    list_per_page = 25
    ordering = ('email',)
    date_hierarchy = 'created_at'
    readonly_fields = ('created_by', 'created_at', 'updated_at', 'average_rating', 'rating_count')

    fieldsets = (
        (None, {
            'fields': ('email', 'specialty', 'description', 'contact', 'address')
        }),
        ('Catégories', {
            'fields': ('categories',),
            'classes': ('collapse',)
        }),
        ('Médias', {
            'fields': ('image',),
            'classes': ('collapse',)
        }),
        ('Évaluations', {
            'fields': ('average_rating', 'rating_count'),
            'classes': ('collapse',)
        }),
        ('Métadonnées', {
            'fields': ('created_by', 'created_at', 'updated_at'),
            'classes': ('collapse',)
        }),
    )

@admin.register(Mark)
class MarkAdmin(admin.ModelAdmin):
    list_display = ('email', 'contact', 'average_rating', 'created_by', 'created_at', 'updated_at')
    list_filter = ('categories', 'created_by')
    search_fields = ('email', 'description', 'contact', 'address')
    list_per_page = 25
    ordering = ('email',)
    date_hierarchy = 'created_at'
    readonly_fields = ('created_by', 'created_at', 'updated_at', 'average_rating', 'rating_count')

    fieldsets = (
        (None, {
            'fields': ('email', 'description', 'contact', 'address')
        }),
        ('Catégories', {
            'fields': ('categories',),
            'classes': ('collapse',)
        }),
        ('Médias', {
            'fields': ('image',),
            'classes': ('collapse',)
        }),
        ('Évaluations', {
            'fields': ('average_rating', 'rating_count'),
            'classes': ('collapse',)
        }),
        ('Métadonnées', {
            'fields': ('created_by', 'created_at', 'updated_at'),
            'classes': ('collapse',)
        }),
    )

@admin.register(Supermarket)
class SupermarketAdmin(admin.ModelAdmin):
    list_display = ('email', 'contact', 'average_rating', 'created_by', 'created_at', 'updated_at')
    list_filter = ('categories', 'created_by')
    search_fields = ('email', 'description', 'contact', 'address')
    list_per_page = 25
    ordering = ('email',)
    date_hierarchy = 'created_at'
    readonly_fields = ('created_by', 'created_at', 'updated_at', 'average_rating', 'rating_count')

    fieldsets = (
        (None, {
            'fields': ('email', 'description', 'contact', 'address')
        }),
        ('Catégories', {
            'fields': ('categories',),
            'classes': ('collapse',)
        }),
        ('Médias', {
            'fields': ('image',),
            'classes': ('collapse',)
        }),
        ('Évaluations', {
            'fields': ('average_rating', 'rating_count'),
            'classes': ('collapse',)
        }),
        ('Métadonnées', {
            'fields': ('created_by', 'created_at', 'updated_at'),
            'classes': ('collapse',)
        }),
    )