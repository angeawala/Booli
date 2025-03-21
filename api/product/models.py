# product/models.py
from django.db import models
from django.core.exceptions import ValidationError
from core.models import BaseModel
from category.models import Category, SubCategory

class BaseProduct(BaseModel):
    name = models.CharField(max_length=255, verbose_name="Nom", help_text="Nom du produit.")
    category = models.ForeignKey(
        Category,
        on_delete=models.SET_NULL,
        null=True,
        verbose_name="Catégorie",
        related_name="products",
    )
    subcategory = models.ForeignKey(
        SubCategory,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        verbose_name="Sous-catégorie",
        related_name="products",
    )
    price = models.DecimalField(max_digits=10, decimal_places=2, verbose_name="Prix")
    discount_price = models.DecimalField(
        max_digits=10,
        decimal_places=2,
        null=True,
        blank=True,
        verbose_name="Prix réduit",
    )
    stock = models.PositiveIntegerField(default=0, verbose_name="Stock")
    devise = models.ForeignKey(
        'utils.Devise',
        on_delete=models.SET_NULL,
        null=True,
        verbose_name="Devise",
        related_name="products",
    )

    class Meta:
        verbose_name = "Produit de base"
        verbose_name_plural = "Produits de base"
        ordering = ['name']
        unique_together = [['name', 'category']]
        indexes = [
            models.Index(fields=['category']),
            models.Index(fields=['subcategory']),
        ]

    def __str__(self):
        return self.name

    def clean(self):
        if self.discount_price is not None and self.discount_price >= self.price:
            raise ValidationError("Le prix réduit doit être inférieur au prix normal.")
        super().clean()

    def has_linked_product(self):
        from library.models import Book
        from pharmacope.models import PharmacopeProduct
        return (
            hasattr(self, 'livre_product') or
            hasattr(self, 'pharmacy_product')
        )