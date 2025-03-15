# market/models.py
from django.db import models
from core.models import BaseModel
from category.models import Category, SubCategory

class MarketBaseModel(BaseModel):
    name = models.CharField(
        max_length=255,
        verbose_name="Nom",
        help_text="Nom de la boutique"
    )
    image = models.ImageField(
        upload_to='market/',
        null=True,
        blank=True,
        verbose_name="Image",
        help_text="Image représentative de l'entité (optionnel)."
    )
    email = models.EmailField(
        verbose_name="Email",
        help_text="Adresse email de contact."
    )
    description = models.TextField(
        verbose_name="Description",
        help_text="Description détaillée de l'entité."
    )
    contact = models.CharField(
        max_length=255,
        verbose_name="Contact",
        help_text="Numéro de téléphone ou autre moyen de contact."
    )
    address = models.TextField(
        verbose_name="Adresse",
        help_text="Adresse physique de l'entité."
    )
    average_rating = models.FloatField(
        default=0.0,
        verbose_name="Note moyenne",
        help_text="Note moyenne basée sur les avis des utilisateurs."
    )
    rating_count = models.JSONField(
        default=dict,
        verbose_name="Détail des notes",
        help_text="Répartition des notes par étoile (ex. {'1': 5, '2': 3})."
    )

    class Meta:
        abstract = True

    
    def __str__(self):
        return self.name

class Shop(MarketBaseModel):
    categories = models.ManyToManyField(
        Category,
        limit_choices_to={'category_type__in': ['commercial']},
        related_name='shops',
        verbose_name="Catégories",
        help_text="Catégories commerciales associées à la boutique."
    )
    subcategories = models.ManyToManyField(
        SubCategory,
        related_name='shops',
        blank=True,
        verbose_name="Sous-catégories",
        help_text="Sous-catégories associées à la boutique (optionnel)."
    )

    class Meta:
        verbose_name = "Boutique"
        verbose_name_plural = "Boutiques"
        ordering = ['email']



class Company(MarketBaseModel):
    categories = models.ManyToManyField(
        Category,
        limit_choices_to={'category_type__in': ['commercial', 'reservation']},
        related_name='companies',
        verbose_name="Catégories",
        help_text="Catégories associées (commerciales ou réservations, ex. transport)."
    )
    website = models.URLField(
        null=True,
        blank=True,
        verbose_name="Site web",
        help_text="URL du site web de la compagnie (optionnel)."
    )
    PURPOSE_CHOICES = (
        ('sell', 'Vendre des produits'),
        ('publish', 'Se faire publier'),
        ('opportunity', 'Offrir des opportunités'),
    )
    purpose = models.CharField(
        max_length=50,
        choices=PURPOSE_CHOICES,
        verbose_name="Objectif",
        help_text="Raison principale de l'enregistrement de la compagnie."
    )

    class Meta:
        verbose_name = "Compagnie"
        verbose_name_plural = "Compagnies"
        ordering = ['email']



class Doctor(MarketBaseModel):
    specialty = models.CharField(
        max_length=255,
        verbose_name="Spécialité",
        help_text="Spécialité médicale du docteur."
    )
    categories = models.ManyToManyField(
        Category,
        limit_choices_to={'category_type': 'pharmacy'},
        related_name='doctors',
        verbose_name="Catégories",
        help_text="Catégories de pharmacopée associées au docteur."
    )

    class Meta:
        verbose_name = "Docteur"
        verbose_name_plural = "Docteurs"
        ordering = ['email']

    def __str__(self):
        return f"{self.name} ({self.specialty})"

class Mark(MarketBaseModel):
    categories = models.ManyToManyField(
        Category,
        limit_choices_to={'is_non_tech': True},
        related_name='marks',
        verbose_name="Catégories",
        help_text="Catégories non technologiques associées à la marque."
    )

    class Meta:
        verbose_name = "Marque"
        verbose_name_plural = "Marques"
        ordering = ['email']



class Supermarket(MarketBaseModel):
    categories = models.ManyToManyField(
        Category,
        related_name='supermarkets',
        verbose_name="Catégories",
        help_text="Catégories associées au supermarché."
    )

    class Meta:
        verbose_name = "Supermarché"
        verbose_name_plural = "Supermarchés"
        ordering = ['email']

