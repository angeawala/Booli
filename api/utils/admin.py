from django.contrib import admin
from .models import Devise, TauxEchange, Pays, Ville, Adresse

# Admin pour Devise
@admin.register(Devise)
class DeviseAdmin(admin.ModelAdmin):
    list_display = ('name', 'code', 'symbol', 'created_at')
    list_filter = ('code',)
    search_fields = ('name', 'code', 'symbol')
    list_per_page = 20
    ordering = ('code',)

    fieldsets = (
        (None, {
            'fields': ('name', 'code', 'symbol')
        }),
        ('Métadonnées', {
            'fields': ('created_at', 'updated_at', 'created_by', 'updated_by'),
            'classes': ('collapse',),
        }),
    )

    readonly_fields = ('created_at', 'updated_at', 'created_by', 'updated_by')

# Admin pour TauxEchange
@admin.register(TauxEchange)
class TauxEchangeAdmin(admin.ModelAdmin):
    list_display = ('devise_from', 'devise_to', 'taux', 'created_at')
    list_filter = ('devise_from', 'devise_to')
    search_fields = ('devise_from__code', 'devise_to__code')
    list_per_page = 20
    ordering = ('-created_at',)

    fieldsets = (
        (None, {
            'fields': ('devise_from', 'devise_to', 'taux')
        }),
        ('Métadonnées', {
            'fields': ('created_at', 'updated_at', 'created_by', 'updated_by'),
            'classes': ('collapse',),
        }),
    )

    readonly_fields = ('created_at', 'updated_at', 'created_by', 'updated_by')

# Inline pour Ville dans Pays
class VilleInline(admin.TabularInline):
    model = Ville
    extra = 1  # Une ligne vide par défaut pour ajouter une ville
    fields = ('name',)

# Admin pour Pays
@admin.register(Pays)
class PaysAdmin(admin.ModelAdmin):
    list_display = ('name', 'code', 'created_at')
    list_filter = ('code',)
    search_fields = ('name', 'code')
    list_per_page = 20
    ordering = ('name',)
    inlines = [VilleInline]

    fieldsets = (
        (None, {
            'fields': ('name', 'code')
        }),
        ('Métadonnées', {
            'fields': ('created_at', 'updated_at', 'created_by', 'updated_by'),
            'classes': ('collapse',),
        }),
    )

    readonly_fields = ('created_at', 'updated_at', 'created_by', 'updated_by')

# Admin pour Ville
@admin.register(Ville)
class VilleAdmin(admin.ModelAdmin):
    list_display = ('name', 'pays', 'created_at')
    list_filter = ('pays',)
    search_fields = ('name', 'pays__name', 'pays__code')
    list_per_page = 20
    ordering = ('name',)

    fieldsets = (
        (None, {
            'fields': ('name', 'pays')
        }),
        ('Métadonnées', {
            'fields': ('created_at', 'updated_at', 'created_by', 'updated_by'),
            'classes': ('collapse',),
        }),
    )

    readonly_fields = ('created_at', 'updated_at', 'created_by', 'updated_by')

# Inline pour Adresse dans Ville (optionnel, si vous voulez gérer les adresses depuis Ville)
class AdresseInline(admin.TabularInline):
    model = Adresse
    extra = 1
    fields = ('rue', 'code_postal')

# Admin pour Adresse
@admin.register(Adresse)
class AdresseAdmin(admin.ModelAdmin):
    list_display = ('rue', 'code_postal', 'ville', 'created_at')
    list_filter = ('ville__pays', 'ville')
    search_fields = ('rue', 'code_postal', 'ville__name', 'ville__pays__name')
    list_per_page = 20
    ordering = ('-created_at',)

    fieldsets = (
        (None, {
            'fields': ('rue', 'code_postal', 'ville')
        }),
        ('Métadonnées', {
            'fields': ('created_at', 'updated_at', 'created_by', 'updated_by'),
            'classes': ('collapse',),
        }),
    )

    readonly_fields = ('created_at', 'updated_at', 'created_by', 'updated_by')