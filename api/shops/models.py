# shop/models.py
from django.db import models
from django.core.validators import RegexValidator
from core.models import BaseModel
from users.models import CustomUser
from commercial_products.models import CommercialProduct

class ShopCategory(BaseModel):
    name = models.CharField(max_length=100, verbose_name="Nom")
    description = models.TextField(verbose_name="Description")
    image = models.ImageField(upload_to="shop_categories/", null=True, blank=True, verbose_name="Image")

    class Meta:
        verbose_name = "Catégorie de boutique"
        verbose_name_plural = "Catégories de boutique"

    def __str__(self):
        return self.name

class ShopSubCategory(BaseModel):
    name = models.CharField(max_length=100, verbose_name="Nom")
    description = models.TextField(verbose_name="Description")
    category = models.ForeignKey(ShopCategory, on_delete=models.CASCADE, related_name="subcategories", verbose_name="Catégorie")
    image = models.ImageField(upload_to="shop_subcategories/", null=True, blank=True, verbose_name="Image")

    class Meta:
        verbose_name = "Sous-catégorie de boutique"
        verbose_name_plural = "Sous-catégories de boutique"

    def __str__(self):
        return self.name

class Shop(BaseModel):
    image = models.ImageField(upload_to="shops/", null=True, blank=True, verbose_name="Image")
    email = models.EmailField(verbose_name="Email")
    description = models.TextField(verbose_name="Description")
    contact = models.CharField(
        max_length=15,
        validators=[RegexValidator(r'^\+?1?\d{9,15}$', "Format de téléphone invalide")],
        verbose_name="Contact"
    )
    address = models.CharField(max_length=255, verbose_name="Adresse")
    average_rating = models.FloatField(default=0.0, verbose_name="Note moyenne")
    rating_count = models.PositiveIntegerField(default=0, verbose_name="Nombre de notes")
    categories = models.ManyToManyField(ShopCategory, related_name="shops", verbose_name="Catégories")
    subcategories = models.ManyToManyField(ShopSubCategory, related_name="shops", verbose_name="Sous-catégories")

    class Meta:
        verbose_name = "Boutique"
        verbose_name_plural = "Boutiques"

    def __str__(self):
        return f"{self.email} - {self.created_by}"

class ShopProduct(BaseModel):
    shop = models.ForeignKey(Shop, on_delete=models.CASCADE, related_name="products", verbose_name="Boutique")
    commercial_product = models.ForeignKey(
        CommercialProduct, on_delete=models.CASCADE, related_name="shop_products", verbose_name="Produit commercial"
    )
    expiration_date = models.DateTimeField(verbose_name="Date d'expiration")
    price_override = models.JSONField(default=dict, null=True, blank=True, verbose_name="Prix personnalisé")  # Optionnel

    class Meta:
        verbose_name = "Produit de boutique"
        verbose_name_plural = "Produits de boutique"

    def __str__(self):
        return f"{self.commercial_product.name} - {self.shop.email}"

    @property
    def is_expired(self):
        from django.utils import timezone
        return timezone.now() > self.expiration_date