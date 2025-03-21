from django.db import models
from django.utils import timezone
from django.core.exceptions import ValidationError
from core.models import BaseModel
from product.models import BaseProduct
from marcher.models import Shop

class ShopProduct(BaseModel):
    base_product = models.OneToOneField(BaseProduct, on_delete=models.CASCADE, related_name='shop_product', verbose_name="Produit de base")
    shop = models.ForeignKey(Shop, on_delete=models.CASCADE, related_name='products', verbose_name="Boutique")
    expiration_date = models.DateTimeField(null=True, blank=True, verbose_name="Date d'expiration")
    is_wholesale = models.BooleanField(default=False, verbose_name="Vente en gros")
    details = models.JSONField(default=dict, blank=True, verbose_name="Détails")

    class Meta:
        verbose_name = "Produit de boutique"
        verbose_name_plural = "Produits de boutique"

    def __str__(self):
        return f"{self.base_product.name} (Boutique: {self.shop.email})"

    def is_expired(self):
        if self.expiration_date:
            return timezone.now() > self.expiration_date
        return False

    def clean(self):
        if self.base_product and self.base_product.has_linked_product() and not hasattr(self.base_product, 'shop_product'):
            raise ValidationError("Ce produit de base est déjà lié à un autre produit spécifique.")