# utils/models.py
from django.db import models
from django.core.validators import MinValueValidator
from core.models import BaseModel
from decimal import Decimal

class Devise(BaseModel):
    name = models.CharField(max_length=50, verbose_name="Nom", help_text="Nom de la devise (ex. Euro)")
    code = models.CharField(max_length=3, unique=True, verbose_name="Code", help_text="Code ISO 4217 (ex. EUR)")
    symbol = models.CharField(max_length=5, verbose_name="Symbole", help_text="Symbole de la devise (ex. €)")

    class Meta:
        verbose_name = "Devise"
        verbose_name_plural = "Devises"
        ordering = ['code']

    def __str__(self):
        return f"{self.name} ({self.code})"
    def save(self, *args, **kwargs):
        self.code = self.code.upper()
        return super().save(*args, **kwargs)


class TauxEchange(BaseModel):
    devise_from = models.ForeignKey(Devise, on_delete=models.CASCADE, related_name="taux_from", verbose_name="Devise source")
    devise_to = models.ForeignKey(Devise, on_delete=models.CASCADE, related_name="taux_to", verbose_name="Devise cible")
    taux = models.DecimalField(
        max_digits=10, decimal_places=6,
        validators=[MinValueValidator(Decimal('0.000001'))],
        verbose_name="Taux",
        help_text="Taux de conversion (ex. 1 EUR = 1.2 USD)"
    )

    class Meta:
        verbose_name = "Taux d’échange"
        verbose_name_plural = "Taux d’échange"
        unique_together = [['devise_from', 'devise_to']]
        indexes = [models.Index(fields=['devise_from', 'devise_to'])]

    def __str__(self):
        return f"{self.devise_from.code} -> {self.devise_to.code} : {self.taux}"

class Pays(BaseModel):
    name = models.CharField(max_length=100, verbose_name="Nom", help_text="Nom du pays (ex. France)")
    code = models.CharField(max_length=2, unique=True, verbose_name="Code", help_text="Code ISO 3166-1 alpha-2 (ex. FR)")

    class Meta:
        verbose_name = "Pays"
        verbose_name_plural = "Pays"
        ordering = ['name']

    def __str__(self):
        return self.name
    def save(self, *args, **kwargs):
        self.code = self.code.upper()
        return super().save(*args, **kwargs)


class Ville(BaseModel):
    name = models.CharField(max_length=100, verbose_name="Nom", help_text="Nom de la ville (ex. Paris)")
    pays = models.ForeignKey(Pays, on_delete=models.CASCADE, related_name="villes", verbose_name="Pays")

    class Meta:
        verbose_name = "Ville"
        verbose_name_plural = "Villes"
        ordering = ['name']
        unique_together = [['name', 'pays']]

    def __str__(self):
        return f"{self.name}, {self.pays}"

class Adresse(BaseModel):
    street = models.CharField(max_length=255, verbose_name="Rue", help_text="Nom de la rue et numéro")
    postal_code = models.CharField(max_length=20, verbose_name="Code postal", help_text="Code postal")
    city = models.ForeignKey(Ville, on_delete=models.CASCADE, related_name="adresses", verbose_name="Ville")

    class Meta:
        verbose_name = "Adresse"
        verbose_name_plural = "Adresses"
        indexes = [models.Index(fields=['postal_code', 'city'])]

    def __str__(self):
        return f"{self.street}, {self.postal_code} {self.city.name} ({self.city.pays.code})"
