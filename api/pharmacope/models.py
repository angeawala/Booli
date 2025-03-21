# pharmacope/models.py
from django.db import models
from product.models import BaseProduct
from django.core.exceptions import ValidationError
from core.models import BaseModel


class PharmacopeProduct(BaseModel):
    base_product = models.OneToOneField(BaseProduct, on_delete=models.CASCADE, related_name='pharmacy')
    monograph_code = models.CharField(max_length=50, unique=True, help_text="Code de la monographie (ex. Ph. Eur.)")
    purity_criteria = models.JSONField(default=dict, help_text="Critères de pureté (ex. {'pH': '6.0-7.0'})")
    quality_tests = models.JSONField(default=dict, help_text="Tests de qualité (ex. {'identification': 'IR'})")
    is_active = models.BooleanField(default=True)

    class Meta:
        verbose_name = "Produit Pharmacopée"
        verbose_name_plural = "Produits Pharmacopée"

    def __str__(self):
        return f"{self.base_product.name} ({self.monograph_code})"

    def clean(self):
        if not self.base_product:
            raise ValidationError("Un produit de base est requis.")