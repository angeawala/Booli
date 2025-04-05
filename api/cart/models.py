from django.db import models
from django.core.validators import MinValueValidator
from django.conf import settings
from core.models import BaseModel
from utils.models import Devise

class Cart(BaseModel):
    user = models.ForeignKey(settings.AUTH_USER_MODEL,null=True, on_delete=models.CASCADE, related_name="carts", verbose_name="Utilisateur")
    session_key = models.CharField(max_length=40, null=True, blank=True)
    devise = models.ForeignKey(Devise, on_delete=models.SET_NULL, null=True, verbose_name="Devise choisie")

    class Meta:
        verbose_name = "Panier"
        verbose_name_plural = "Paniers"
        ordering = ['-created_at']

    def __str__(self):
        return f"Panier de {self.user.username} ({self.id})"

class CartItem(BaseModel):
    cart = models.ForeignKey(Cart, on_delete=models.CASCADE, related_name="items", verbose_name="Panier")
    product = models.CharField(max_length=36, verbose_name="Produit (ID)")
    variant = models.CharField(max_length=36, null=True, blank=True, verbose_name="Variante (ID)")
    quantity = models.PositiveIntegerField(validators=[MinValueValidator(1)], verbose_name="Quantité")
    type = models.CharField(
        max_length=20,
        choices=[("commercial", "Commercial"), ("pharmacy", "Pharmacy"), ("book", "Book"), ("engros", "Engros"), ("pdf", "PDF")],
        verbose_name="Type de produit"
    )
    prix = models.JSONField(verbose_name="Prix calculé", default=dict)

    class Meta:
        verbose_name = "Élément du panier"
        verbose_name_plural = "Éléments du panier"
        ordering = ['created_at']

    def __str__(self):
        return f"{self.quantity}x {self.product} ({self.type})"