# engros_products/models.py
from django.db import models
from django.core.validators import MinValueValidator
from core.models import BaseModel
from commercial_products.models import CommercialProduct

class EngrosProduct(BaseModel):
    commercial_product = models.ForeignKey(
        CommercialProduct,
        on_delete=models.CASCADE,
        related_name="engros_products",
        verbose_name="Produit commercial"
    )
    pricing_tiers = models.JSONField(
        verbose_name="Tiers de tarification",
        default=list,
        help_text="Ex: [{'minQuantity': 10, 'discountPercentage': 10}]"
    )
    stock = models.PositiveIntegerField(
        validators=[MinValueValidator(0)],
        verbose_name="Stock global en gros"
    )

    class Meta:
        verbose_name = "Produit en gros"
        verbose_name_plural = "Produits en gros"
        ordering = ['commercial_product__base_product__name']

    def __str__(self):
        return f"{self.commercial_product} (en gros)"