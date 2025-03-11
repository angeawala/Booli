# myapp/admin.py
from django.contrib import admin
from .models import Category, SubCategory

# Personnalisation de l'affichage de Category dans l'admin
@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ('name', 'is_electronic', 'icon', 'image_preview')  # Champs affichés dans la liste
    list_filter = ('is_electronic',)  # Filtres disponibles
    search_fields = ('name',)  # Recherche par nom
    list_editable = ('is_electronic',)  # Champs modifiables directement dans la liste
    ordering = ('name',)  # Tri par défaut

    # Ajout d'un aperçu de l'image dans la liste (optionnel)
    def image_preview(self, obj):
        if obj.image:
            return '<img src="{}" style="max-height: 50px;" />'.format(obj.image.url)
        return "Aucune image"
    image_preview.allow_tags = True  # Permet l'affichage HTML
    image_preview.short_description = "Aperçu de l'image"

# Personnalisation de l'affichage de SubCategory dans l'admin
@admin.register(SubCategory)
class SubCategoryAdmin(admin.ModelAdmin):
    list_display = ('name', 'category', 'image_preview')  # Champs affichés dans la liste
    list_filter = ('category',)  # Filtres disponibles
    search_fields = ('name', 'category__name')  # Recherche par nom ou nom de catégorie
    ordering = ('category', 'name')  # Tri par catégorie puis nom

    # Aperçu de l'image dans la liste
    def image_preview(self, obj):
        if obj.image:
            return '<img src="{}" style="max-height: 50px;" />'.format(obj.image.url)
        return "Aucune image"
    image_preview.allow_tags = True
    image_preview.short_description = "Aperçu de l'image"