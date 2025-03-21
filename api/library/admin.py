from django.contrib import admin
from .models import Book, BookPDF, PlanAbonnement, Abonnement

@admin.register(Book)
class BookAdmin(admin.ModelAdmin):
    list_display = ('base_product', 'author', 'isbn', 'genre', 'publisher', 'publication_date', 'pages', 'get_physical_price')
    list_filter = ('genre', 'language', 'format', 'publication_date')
    search_fields = ('base_product__name', 'author', 'isbn', 'publisher')
    list_per_page = 20
    ordering = ('base_product__name',)

    fieldsets = (
        (None, {
            'fields': ('base_product', 'author', 'isbn')
        }),
        ('Détails du livre', {
            'fields': ('genre', 'publisher', 'publication_date', 'pages', 'language', 'format', 'cover'),
        }),
    )

    def get_physical_price(self, obj):
        """Affiche le prix physique calculé avec la devise."""
        price = obj.physical_price  # Utilise la propriété du modèle Book
        return f"{price} {obj.base_product.devise.code if obj.base_product.devise else ''}"
    get_physical_price.short_description = "Prix physique"

# Inline pour BookPDF
class BookPDFInline(admin.StackedInline):
    model = BookPDF
    can_delete = False
    verbose_name_plural = "PDF associé"
    fields = ('pdf_file', 'pdf_price', 'is_free')
    extra = 0

BookAdmin.inlines = [BookPDFInline]


# Admin pour le modèle BookPDF (standalone si besoin)
@admin.register(BookPDF)
class BookPDFAdmin(admin.ModelAdmin):
    list_display = ('book_product', 'pdf_price', 'is_free', 'has_pdf_file')
    list_filter = ('is_free',)
    search_fields = ('book_product__base_product__name', 'book_product__author')
    list_per_page = 20

    def has_pdf_file(self, obj):
        """Indique si un fichier PDF est présent."""
        return bool(obj.pdf_file)
    has_pdf_file.boolean = True
    has_pdf_file.short_description = "PDF présent"


# Admin pour le modèle PlanAbonnement
@admin.register(PlanAbonnement)
class PlanAbonnementAdmin(admin.ModelAdmin):
    list_display = ('nom', 'temps', 'prix', 'devise', 'created_at')
    list_filter = ('devise', 'temps')
    search_fields = ('nom',)
    list_per_page = 20
    ordering = ('-created_at',)

    fieldsets = (
        (None, {
            'fields': ('nom', 'temps', 'prix', 'devise')
        }),
    )


# Admin pour le modèle Abonnement
@admin.register(Abonnement)
class AbonnementAdmin(admin.ModelAdmin):
    list_display = ('code', 'user', 'plan', 'date_debut', 'date_expiration', 'actif', 'is_expired')
    list_filter = ('actif', 'plan', 'date_debut', 'date_expiration')
    search_fields = ('code', 'user__email', 'plan__nom')
    list_per_page = 20
    ordering = ('-date_debut',)
    readonly_fields = ('code', 'date_debut', 'date_expiration', 'is_expired')

    fieldsets = (
        (None, {
            'fields': ('user', 'plan', 'payment', 'actif')
        }),
        ('Détails', {
            'fields': ('code', 'date_debut', 'date_expiration', 'is_expired'),
        }),
    )

    def is_expired(self, obj):
        """Affiche l'état d'expiration dans la liste."""
        return obj.is_expired
    is_expired.boolean = True
    is_expired.short_description = "Expiré"