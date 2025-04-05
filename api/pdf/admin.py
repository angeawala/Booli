from django.contrib import admin
from .models import BookPDF, DownloadLink

# BookPDF
@admin.register(BookPDF)
class BookPDFAdmin(admin.ModelAdmin):
    list_display = ('book', 'is_free', 'prix_display', 'file', 'created_at')
    search_fields = ('book__title',)
    list_filter = ('is_free', 'created_at')
    list_per_page = 20

    fieldsets = (
        ("Détails du PDF", {
            'fields': ('book', 'is_free', 'prix', 'file')
        }),
        ("Métadonnées", {
            'fields': ('created_at', 'updated_at', 'created_by', 'updated_by'),
            'classes': ('collapse',)
        }),
    )

    readonly_fields = ('created_at', 'updated_at', 'created_by', 'updated_by')

    def prix_display(self, obj):
        if obj.prix:
            return f"{obj.prix.get('valeur')} {obj.prix.get('devise')}"
        return "Gratuit"
    prix_display.short_description = "Prix"

# DownloadLink
@admin.register(DownloadLink)
class DownloadLinkAdmin(admin.ModelAdmin):
    list_display = ('user', 'book_pdf', 'link', 'download_limit', 'downloads_used', 'created_at')
    search_fields = ('user__username', 'book_pdf__book__title')
    list_filter = ('download_limit', 'downloads_used', 'created_at')
    list_per_page = 20

    fieldsets = (
        ("Détails du lien de téléchargement", {
            'fields': ('user', 'book_pdf', 'link', 'download_limit', 'downloads_used')
        }),
        ("Métadonnées", {
            'fields': ('created_at', 'updated_at', 'created_by', 'updated_by'),
            'classes': ('collapse',)
        }),
    )

    readonly_fields = ('created_at', 'updated_at', 'created_by', 'updated_by')
