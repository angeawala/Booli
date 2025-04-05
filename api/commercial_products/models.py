from django.db import models
from django.core.validators import MinValueValidator
from core.models import BaseModel
from base_products.models import BaseProduct

class CommercialCategory(BaseModel):
    name = models.CharField(max_length=100, verbose_name="Nom")
    description = models.TextField(verbose_name="Description")
    is_tech = models.BooleanField(default=False, verbose_name="Technologique")
    image = models.ImageField(upload_to="commercial_categories/", null=True, blank=True, verbose_name="Image")  # Changement de CharField à ImageField
    icon = models.CharField(max_length=255, verbose_name="Icône")  # L'icône reste en CharField

    class Meta:
        verbose_name = "Catégorie commerciale"
        verbose_name_plural = "Catégories commerciales"
        ordering = ['name']

    def __str__(self):
        return self.name

class CommercialSubCategory(BaseModel):
    name = models.CharField(max_length=100, verbose_name="Nom")
    description = models.TextField(verbose_name="Description")
    category = models.ForeignKey(CommercialCategory, on_delete=models.PROTECT, related_name="subcategories", verbose_name="Catégorie")
    image = models.ImageField(upload_to="commercial_subcategories/", null=True, blank=True, verbose_name="Image")  # Changement de CharField à ImageField

    class Meta:
        verbose_name = "Sous-catégorie commerciale"
        verbose_name_plural = "Sous-catégories commerciales"
        ordering = ['name']

    def __str__(self):
        return self.name

class CommercialProduct(BaseModel):
    base_product = models.OneToOneField(
        BaseProduct,
        on_delete=models.CASCADE,
        related_name="commercial_product",
        verbose_name="Produit de base"
    )
    category = models.ForeignKey(CommercialCategory, on_delete=models.PROTECT, related_name="products", verbose_name="Catégorie")
    subCategory = models.ForeignKey(CommercialSubCategory, on_delete=models.PROTECT, null=True, blank=True, related_name="products", verbose_name="Sous-catégorie")
    caracteristiques = models.JSONField(verbose_name="Caractéristiques")
    fournisseur_verifie = models.BooleanField(default=False, verbose_name="Fournisseur vérifié")

    class Meta:
        verbose_name = "Produit commercial"
        verbose_name_plural = "Produits commerciaux"
        ordering = ['base_product__name']

    def save(self, *args, **kwargs):
        self.base_product.product_type = 'commercial'
        self.base_product.save()
        super().save(*args, **kwargs)

    def __str__(self):
        return self.base_product.name

class Variant(BaseModel):
    product = models.ForeignKey(CommercialProduct, on_delete=models.CASCADE, related_name="variants", verbose_name="Produit")
    couleur = models.CharField(max_length=50, verbose_name="Couleur")
    taille = models.CharField(max_length=50, verbose_name="Taille")
    stock = models.PositiveIntegerField(validators=[MinValueValidator(0)], verbose_name="Stock")
    prix_ajuste = models.JSONField(verbose_name="Prix ajusté")

    class Meta:
        verbose_name = "Variante"
        verbose_name_plural = "Variantes"

    def __str__(self):
        return f"{self.product} - {self.couleur}/{self.taille}"

class Media(BaseModel):
    product = models.ForeignKey(CommercialProduct, on_delete=models.CASCADE, related_name="media", verbose_name="Produit")
    video = models.CharField(max_length=255, null=True, blank=True, verbose_name="Vidéo")
    images = models.JSONField(verbose_name="Images")

    class Meta:
        verbose_name = "Média"
        verbose_name_plural = "Médias"

    def __str__(self):
        return f"Média de {self.product}"
