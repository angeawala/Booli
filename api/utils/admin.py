from django.contrib import admin
from .models import Devise, TauxEchange, Pays, Ville, Adresse


# ======= DeviseAdmin : Gestion des devises =======
@admin.register(Devise)
class DeviseAdmin(admin.ModelAdmin):
    """Interface admin pour le modèle Devise."""
    list_display = ('name', 'code', 'symbol', 'created_at')
    list_filter = ('code',)
    search_fields = ('name', 'code', 'symbol')
    ordering = ('code',)
    list_per_page = 20

    fieldsets = (
        (None, {'fields': ('name', 'code', 'symbol')}),
        ('Métadonnées', {
            'fields': ('created_at', 'updated_at', 'created_by', 'updated_by'),
            'classes': ('collapse',),
        }),
    )
    readonly_fields = ('created_at', 'updated_at', 'created_by', 'updated_by')
# ======= Fin DeviseAdmin =======


# ======= TauxEchangeAdmin : Gestion des taux de change =======
@admin.register(TauxEchange)
class TauxEchangeAdmin(admin.ModelAdmin):
    """Interface admin pour le modèle TauxEchange."""
    list_display = ('devise_from', 'devise_to', 'taux', 'created_at')
    list_filter = ('devise_from', 'devise_to')
    search_fields = ('devise_from__code', 'devise_to__code')
    ordering = ('-created_at',)
    list_per_page = 20

    fieldsets = (
        (None, {'fields': ('devise_from', 'devise_to', 'taux')}),
        ('Métadonnées', {
            'fields': ('created_at', 'updated_at', 'created_by', 'updated_by'),
            'classes': ('collapse',),
        }),
    )
    readonly_fields = ('created_at', 'updated_at', 'created_by', 'updated_by')
# ======= Fin TauxEchangeAdmin =======


# ======= VilleInline : Villes liées à un pays =======
class VilleInline(admin.TabularInline):
    model = Ville
    extra = 1
    fields = ('name',)
# ======= Fin VilleInline =======


# ======= PaysAdmin : Gestion des pays =======
@admin.register(Pays)
class PaysAdmin(admin.ModelAdmin):
    """Interface admin pour le modèle Pays."""
    list_display = ('name', 'code', 'created_at')
    list_filter = ('code',)
    search_fields = ('name', 'code')
    ordering = ('name',)
    list_per_page = 20
    inlines = [VilleInline]

    fieldsets = (
        (None, {'fields': ('name', 'code')}),
        ('Métadonnées', {
            'fields': ('created_at', 'updated_at', 'created_by', 'updated_by'),
            'classes': ('collapse',),
        }),
    )
    readonly_fields = ('created_at', 'updated_at', 'created_by', 'updated_by')
# ======= Fin PaysAdmin =======


# ======= VilleAdmin : Gestion des villes =======
@admin.register(Ville)
class VilleAdmin(admin.ModelAdmin):
    """Interface admin pour le modèle Ville."""
    list_display = ('name', 'pays', 'created_at')
    list_filter = ('pays',)
    search_fields = ('name', 'pays__name', 'pays__code')
    ordering = ('name',)
    list_per_page = 20

    fieldsets = (
        (None, {'fields': ('name', 'pays')}),
        ('Métadonnées', {
            'fields': ('created_at', 'updated_at', 'created_by', 'updated_by'),
            'classes': ('collapse',),
        }),
    )
    readonly_fields = ('created_at', 'updated_at', 'created_by', 'updated_by')
# ======= Fin VilleAdmin =======


# ======= AdresseInline : Adresses liées à une ville =======
class AdresseInline(admin.TabularInline):
    model = Adresse
    extra = 1
    fields = ('rue', 'code_postal')
# ======= Fin AdresseInline =======


# ======= AdresseAdmin : Gestion des adresses =======
@admin.register(Adresse)
class AdresseAdmin(admin.ModelAdmin):
    """Interface admin pour le modèle Adresse."""
    list_display = ('street', 'postal_code', 'city', 'created_at')  # 'rue' -> 'street', 'code_postal' -> 'postal_code'
    list_filter = ('city__pays', 'city')  # Utilisation correcte des relations ForeignKey
    search_fields = ('street', 'postal_code', 'city__name', 'city__pays__name')
    ordering = ('-created_at',)
    list_per_page = 20

    fieldsets = (
        (None, {'fields': ('street', 'postal_code', 'city')}),
        ('Métadonnées', {
            'fields': ('created_at', 'updated_at', 'created_by', 'updated_by'),
            'classes': ('collapse',),
        }),
    )
    readonly_fields = ('created_at', 'updated_at', 'created_by', 'updated_by')

# ======= Fin AdresseAdmin =======
