from django.db import models
from core.models import BaseModel
from django.core.validators import RegexValidator
from django.conf import settings

class Type(BaseModel):
    name = models.CharField(max_length=100, unique=True, verbose_name="Nom du type")
    description = models.TextField(verbose_name="Description", blank=True)

    class Meta:
        verbose_name = "Type"
        verbose_name_plural = "Types"

    def __str__(self):
        return self.name

class Domain(BaseModel):
    name = models.CharField(max_length=100, unique=True, verbose_name="Nom du domaine")
    description = models.TextField(verbose_name="Description", blank=True)

    class Meta:
        verbose_name = "Domaine"
        verbose_name_plural = "Domaines"

    def __str__(self):
        return self.name

class Category(BaseModel):
    name = models.CharField(max_length=100, verbose_name="Nom")
    type = models.ForeignKey(Type, on_delete=models.PROTECT, related_name="categories", verbose_name="Type")
    domain = models.ForeignKey(Domain, on_delete=models.PROTECT, related_name="categories", verbose_name="Domaine")
    image = models.ImageField(upload_to="categories/", null=True, blank=True, verbose_name="Image")
    description = models.TextField(verbose_name="Description")

    class Meta:
        verbose_name = "Catégorie"
        verbose_name_plural = "Catégories"

    def __str__(self):
        return self.name

class Agency(BaseModel):
    name = models.CharField(max_length=100, verbose_name="Nom")
    description = models.TextField(verbose_name="Description")
    image = models.ImageField(upload_to="agencies/", null=True, blank=True, verbose_name="Image")
    address = models.CharField(max_length=255, verbose_name="Adresse")
    phone = models.CharField(
        max_length=15,
        validators=[RegexValidator(r'^\+?1?\d{9,15}$', "Format de téléphone invalide")],
        verbose_name="Téléphone"
    )
    hours = models.CharField(max_length=100, verbose_name="Horaires")
    email = models.EmailField(verbose_name="Email")
    website = models.URLField(verbose_name="Site web")
    category = models.ForeignKey(Category, on_delete=models.PROTECT, related_name="agencies", verbose_name="Catégorie")
    type = models.ForeignKey(Type, on_delete=models.PROTECT, related_name="agencies", verbose_name="Type")
    domain = models.ForeignKey(Domain, on_delete=models.PROTECT, related_name="agencies", verbose_name="Domaine")

    class Meta:
        verbose_name = "Agence"
        verbose_name_plural = "Agences"

    def __str__(self):
        return self.name

class Service(BaseModel):
    agency = models.ForeignKey(Agency, on_delete=models.CASCADE, related_name="services", verbose_name="Agence")
    name = models.CharField(max_length=100, verbose_name="Nom")
    description = models.TextField(verbose_name="Description")
    image = models.ImageField(upload_to="services/", null=True, blank=True, verbose_name="Image")

    class Meta:
        verbose_name = "Service"
        verbose_name_plural = "Services"

    def __str__(self):
        return f"{self.name} ({self.agency.name})"

class OpportunityType(BaseModel):
    name = models.CharField(max_length=100, unique=True, verbose_name="Nom du type d'opportunité")
    description = models.TextField(verbose_name="Description", blank=True)

    class Meta:
        verbose_name = "Type d'opportunité"
        verbose_name_plural = "Types d'opportunité"

    def __str__(self):
        return self.name

class Opportunity(BaseModel):
    agency = models.ForeignKey(Agency, on_delete=models.CASCADE, related_name="opportunities", verbose_name="Agence")
    type = models.ForeignKey(OpportunityType, on_delete=models.PROTECT, related_name="opportunities", verbose_name="Type")
    title = models.CharField(max_length=100, verbose_name="Titre")
    description = models.TextField(verbose_name="Description")
    requirements = models.TextField(verbose_name="Exigences", blank=True)
    application_deadline = models.DateField(verbose_name="Date limite de candidature", null=True, blank=True)

    class Meta:
        verbose_name = "Opportunité"
        verbose_name_plural = "Opportunités"

    def __str__(self):
        return f"{self.title} ({self.agency.name})"