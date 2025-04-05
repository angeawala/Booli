from django.contrib import admin
from .models import CommercialCategory, CommercialSubCategory, CommercialProduct, Variant, Media

class CommercialCategoryAdmin(admin.ModelAdmin):
    list_display = ('name', 'is_tech', 'description', 'image', 'icon')
    search_fields = ('name', 'description')
    list_filter = ('is_tech',)

class CommercialSubCategoryAdmin(admin.ModelAdmin):
    list_display = ('name', 'category', 'description', 'image')
    search_fields = ('name', 'description')
    list_filter = ('category',)

class CommercialProductAdmin(admin.ModelAdmin):
    list_display = ('base_product', 'category', 'subCategory', 'fournisseur_verifie')
    search_fields = ('base_product__name', 'category__name', 'subCategory__name')
    list_filter = ('category', 'subCategory', 'fournisseur_verifie')
    raw_id_fields = ('base_product',)  # Pour optimiser la recherche dans BaseProduct

class VariantAdmin(admin.ModelAdmin):
    list_display = ('product', 'couleur', 'taille', 'stock')
    search_fields = ('product__base_product__name', 'couleur', 'taille')
    list_filter = ('product__category', 'product__subCategory')

class MediaAdmin(admin.ModelAdmin):
    list_display = ('product', 'video', 'images')
    search_fields = ('product__base_product__name', 'video')
    list_filter = ('product__category', 'product__subCategory')

# Enregistrement des modèles dans l'admin
admin.site.register(CommercialCategory, CommercialCategoryAdmin)
admin.site.register(CommercialSubCategory, CommercialSubCategoryAdmin)
admin.site.register(CommercialProduct, CommercialProductAdmin)
admin.site.register(Variant, VariantAdmin)
admin.site.register(Media, MediaAdmin)
