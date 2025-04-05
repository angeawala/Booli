from django.contrib import admin
from .models import BookCategory, Book

class BookCategoryAdmin(admin.ModelAdmin):
    list_display = ('name', 'description', 'created_at', 'updated_at')
    search_fields = ('name',)
    list_filter = ('created_at',)
    ordering = ['name']

class BookAdmin(admin.ModelAdmin):
    list_display = ('base_product', 'category', 'genre', 'editeur', 'parution', 'pages', 'langue', 'format', 'has_pdf', 'created_at')
    search_fields = ('base_product__name', 'category__name', 'genre', 'editeur', 'langue', 'format')
    list_filter = ('category', 'has_pdf', 'parution', 'created_at')
    ordering = ['base_product__name']

# Enregistrement des modèles dans l'admin
admin.site.register(BookCategory, BookCategoryAdmin)
admin.site.register(Book, BookAdmin)
