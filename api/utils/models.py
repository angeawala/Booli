# utils/models.py
from django.db import models
from core.models import BaseModel

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

class TauxEchange(BaseModel):
    devise_from = models.ForeignKey(Devise, on_delete=models.CASCADE, related_name="taux_from", verbose_name="Devise source")
    devise_to = models.ForeignKey(Devise, on_delete=models.CASCADE, related_name="taux_to", verbose_name="Devise cible")
    taux = models.FloatField(verbose_name="Taux", help_text="Taux de conversion (ex. 1 EUR = 1.2 USD)")

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
    rue = models.CharField(max_length=255, verbose_name="Rue", help_text="Nom de la rue et numéro")
    code_postal = models.CharField(max_length=20, verbose_name="Code postal", help_text="Code postal")
    ville = models.ForeignKey(Ville, on_delete=models.CASCADE, related_name="adresses", verbose_name="Ville")

    class Meta:
        verbose_name = "Adresse"
        verbose_name_plural = "Adresses"

    def __str__(self):
        return f"{self.rue}, {self.code_postal} {self.ville}"