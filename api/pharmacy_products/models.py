from django.db import models
from django.core.validators import MinValueValidator
from core.models import BaseModel
from base_products.models import BaseProduct

class PharmacyCategory(BaseModel):
    name = models.CharField(max_length=100, verbose_name="Nom")
    description = models.TextField(verbose_name="Description")

    class Meta:
        verbose_name = "Catégorie pharmaceutique"
        verbose_name_plural = "Catégories pharmaceutiques"
        ordering = ['name']

    def __str__(self):
        return self.name

class PharmacyProduct(BaseModel):
    base_product = models.OneToOneField(
        BaseProduct,
        on_delete=models.CASCADE,
        related_name="pharmacy_product",
        # Retiré : primary_key=True (id de BaseModel est la clé primaire)
        verbose_name="Produit de base"
    )
    category = models.ForeignKey(
        PharmacyCategory,
        on_delete=models.PROTECT,
        related_name="products",
        verbose_name="Catégorie"
    )
    precautions = models.TextField(verbose_name="Précautions")
    expiration_date = models.DateField(verbose_name="Date d'expiration")

    class Meta:
        verbose_name = "Produit pharmaceutique"
        verbose_name_plural = "Produits pharmaceutiques"
        ordering = ['base_product__name']

    def __str__(self):
        return self.base_product.name

class Doctor(BaseModel):
    name = models.CharField(max_length=100, verbose_name="Nom")
    specialty = models.CharField(max_length=100, verbose_name="Spécialité")
    contact = models.CharField(max_length=100, unique=True, verbose_name="Contact")
    email = models.EmailField(unique=True, verbose_name="Email")

    class Meta:
        verbose_name = "Docteur"
        verbose_name_plural = "Docteurs"
        ordering = ['name']

    def __str__(self):
        return self.name