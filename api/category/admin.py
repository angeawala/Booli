# category/admin.py
from django.contrib import admin
from .models import Category, SubCategory

@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ('name', 'category_type', 'is_non_tech', 'created_by', 'created_at', 'updated_at')
    list_filter = ('category_type', 'is_non_tech', 'created_by')
    search_fields = ('name', 'category_type')
    list_per_page = 25
    ordering = ('name',)
    date_hierarchy = 'created_at'
    readonly_fields = ('created_by', 'created_at', 'updated_at')

    fieldsets = (
        (None, {
            'fields': ('name', 'category_type', 'is_non_tech')
        }),
        ('Médias', {
            'fields': ('image', 'icon'),
            'classes': ('collapse',)  # Section repliable
        }),
        ('Métadonnées', {
            'fields': ('created_by', 'created_at', 'updated_at'),
            'classes': ('collapse',)
        }),
    )

@admin.register(SubCategory)
class SubCategoryAdmin(admin.ModelAdmin):
    list_display = ('name', 'category', 'created_by', 'created_at', 'updated_at')
    list_filter = ('category', 'created_by')
    search_fields = ('name', 'category__name')
    list_per_page = 25
    ordering = ('name',)
    date_hierarchy = 'created_at'
    readonly_fields = ('created_by', 'created_at', 'updated_at')

    fieldsets = (
        (None, {
            'fields': ('name', 'category')
        }),
        ('Médias', {
            'fields': ('image',),
            'classes': ('collapse',)
        }),
        ('Métadonnées', {
            'fields': ('created_by', 'created_at', 'updated_at'),
            'classes': ('collapse',)
        }),
    )