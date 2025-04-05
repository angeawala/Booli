from django.db import models
from django.core.validators import MinValueValidator
from core.models import BaseModel
from base_products.models import BaseProduct

class BookCategory(BaseModel):
    name = models.CharField(max_length=100, verbose_name="Nom")
    description = models.TextField(verbose_name="Description")

    class Meta:
        verbose_name = "Catégorie de livre"
        verbose_name_plural = "Catégories de livre"
        ordering = ['name']

    def __str__(self):
        return self.name

class Book(BaseModel):
    base_product = models.OneToOneField(
        BaseProduct,
        on_delete=models.CASCADE,
        related_name="book",
        # Retiré : primary_key=True (id de BaseModel est la clé primaire)
        verbose_name="Produit de base"
    )
    category = models.ForeignKey(
        BookCategory,
        on_delete=models.PROTECT,
        related_name="books",
        verbose_name="Catégorie"
    )
    genre = models.CharField(max_length=100, verbose_name="Genre")
    editeur = models.CharField(max_length=100, verbose_name="Éditeur")
    parution = models.DateField(verbose_name="Date de parution")
    pages = models.PositiveIntegerField(
        verbose_name="Nombre de pages",
        validators=[MinValueValidator(1)]
    )
    langue = models.CharField(max_length=50, verbose_name="Langue")
    format = models.CharField(max_length=50, verbose_name="Format")
    has_pdf = models.BooleanField(default=False, verbose_name="PDF disponible")

    class Meta:
        verbose_name = "Livre"
        verbose_name_plural = "Livres"
        ordering = ['base_product__name']

    def save(self, *args, **kwargs):
        self.base_product.product_type = 'book'
        self.base_product.save()
        super().save(*args, **kwargs)

    def __str__(self):
        return self.base_product.name