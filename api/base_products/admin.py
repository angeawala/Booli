from django.contrib import admin
from .models import Vendor, BaseProduct, Review
from django.utils.html import format_html


class VendorAdmin(admin.ModelAdmin):
    list_display = ('user', 'adresse', 'created_at', 'updated_at')
    search_fields = ('user__username', 'adresse__nom')  # Permet de rechercher par nom d'utilisateur ou adresse
    list_filter = ('created_at', 'updated_at')  # Filtres par date de création et de mise à jour
    ordering = ('-created_at',)

    def save_model(self, request, obj, form, change):
        # Appelle la méthode save pour ajouter le rôle "vendor" si ce n'est pas déjà fait
        obj.save()


class BaseProductAdmin(admin.ModelAdmin):
    list_display = ('name', 'product_type', 'stock', 'is_available', 'prix_normal', 'prix_reduit', 'created_at')
    search_fields = ('name', 'description')
    list_filter = ('product_type', 'is_available', 'created_at')  # Filtres par type de produit et disponibilité
    ordering = ('-created_at',)

    def prix_normal_formatted(self, obj):
        return f"{obj.prix_normal.get('valeur')} {obj.prix_normal.get('devise')}"
    prix_normal_formatted.short_description = "Prix Normal"

    def prix_reduit_formatted(self, obj):
        if obj.prix_reduit:
            return f"{obj.prix_reduit.get('valeur')} {obj.prix_reduit.get('devise')}"
        return "N/A"
    prix_reduit_formatted.short_description = "Prix Réduit"

    fieldsets = (
        (None, {
            'fields': ('name', 'description', 'image', 'product_type', 'stock', 'is_available')
        }),
        ('Prix', {
            'fields': ('prix_normal', 'prix_reduit')
        })
    )

    def save_model(self, request, obj, form, change):
        # Appel de la méthode de validation clean() avant de sauvegarder
        obj.clean()
        super().save_model(request, obj, form, change)


class ReviewAdmin(admin.ModelAdmin):
    list_display = ('product', 'note', 'commentaire', 'created_at')
    search_fields = ('product__name', 'commentaire')
    list_filter = ('note', 'created_at')  # Filtres par note et date de création
    ordering = ('-created_at',)


# Enregistrement des modèles dans l'admin
admin.site.register(Vendor, VendorAdmin)
admin.site.register(BaseProduct, BaseProductAdmin)
admin.site.register(Review, ReviewAdmin)
