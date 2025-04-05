# base_products/models.py
from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator
from django.core.exceptions import ValidationError
from core.models import BaseModel
from utils.models import Devise, Adresse

class Vendor(BaseModel):
    user = models.OneToOneField('users.CustomUser', on_delete=models.CASCADE, related_name="vendor_profile")
    adresse = models.ForeignKey(Adresse, on_delete=models.SET_NULL, null=True)

    def save(self, *args, **kwargs):
        if "vendor" not in self.user.roles:
            self.user.roles.append("vendor")
            self.user.save(update_fields=["roles"])
        super().save(*args, **kwargs)

class BaseProduct(BaseModel):
    PRODUCT_TYPES = (
        ('book', 'Book'),
        ('commercial', 'Commercial'),
        ('pharmacy', 'Pharmacy'),
    )
    name = models.CharField(max_length=100, verbose_name="Nom")
    image = models.ImageField(upload_to='products/', verbose_name="Image")
    description = models.TextField(verbose_name="Description")
    prix_normal = models.JSONField(verbose_name="Prix normal")  # { "valeur": 100, "devise": "EUR" }
    prix_reduit = models.JSONField(null=True, blank=True, verbose_name="Prix réduit")
    stock = models.PositiveIntegerField(verbose_name="Stock", validators=[MinValueValidator(0)])
    is_available = models.BooleanField(default=True, verbose_name="Disponible")
    product_type = models.CharField(max_length=20, choices=PRODUCT_TYPES, verbose_name="Type de produit")

    class Meta:
        verbose_name = "Produit de base"
        verbose_name_plural = "Produits de base"
        indexes = [models.Index(fields=['product_type'])]

    def clean(self):
        # Validation des devises
        devise_codes = Devise.objects.values_list('code', flat=True)
        if self.prix_normal.get('devise') not in devise_codes:
            raise ValidationError("Devise invalide pour prix_normal")
        if self.prix_reduit and self.prix_reduit.get('devise') not in devise_codes:
            raise ValidationError("Devise invalide pour prix_reduit")
        # Validation : prix_reduit < prix_normal si défini
        if self.prix_reduit and self.prix_reduit.get('valeur') >= self.prix_normal.get('valeur'):
            raise ValidationError("Le prix réduit doit être inférieur au prix normal")

    def __str__(self):
        return f"{self.name} ({self.product_type})"

class Review(BaseModel):
    product = models.ForeignKey(BaseProduct, on_delete=models.CASCADE, related_name="reviews", verbose_name="Produit")
    note = models.PositiveSmallIntegerField(
        verbose_name="Note",
        validators=[MinValueValidator(1), MaxValueValidator(5)],
        help_text="Note entre 1 et 5"
    )
    commentaire = models.TextField(verbose_name="Commentaire")

    class Meta:
        verbose_name = "Avis"
        verbose_name_plural = "Avis"

    def __str__(self):
        return f"Avis {self.note}/5 pour {self.product}"