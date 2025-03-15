from django.db import models
from core.models import BaseModel

class Category(BaseModel):
    CATEGORY_TYPES = (
        ('book', 'Livre'),
        ('reservation', 'Réservation'),
        ('service', 'Service'),
        ('pharmacy', 'Pharmacopée'),
        ('commercial', 'Commercial'),
    )
    
    name = models.CharField(
        max_length=255,
        verbose_name="Nom",
        help_text="Nom de la catégorie."
    )
    category_type = models.CharField(
        max_length=50,
        choices=CATEGORY_TYPES,
        verbose_name="Type de catégorie",
        help_text="Type ou domaine de la catégorie (ex. Livre, Service, etc.)."
    )
    is_non_tech = models.BooleanField(
        default=False,
        verbose_name="Non technologique",
        help_text="Indique si la catégorie est liée à des produits non technologiques."
    )
    image = models.ImageField(
        upload_to='categories/',
        null=True,
        blank=True,
        verbose_name="Image",
        help_text="Image représentative de la catégorie (optionnel)."
    )
    icon = models.CharField(
        max_length=100,
        null=True,
        blank=True,
        verbose_name="Icône",
        help_text="Classe FontAwesome pour l'icône (ex. 'fa-book', optionnel)."
    )

    class Meta:
        verbose_name = "Catégorie"
        verbose_name_plural = "Catégories"
        ordering = ['name']

    def __str__(self):
        return f"{self.name} ({self.category_type})"

class SubCategory(BaseModel):
    category = models.ForeignKey(
        Category,
        on_delete=models.CASCADE,
        related_name='subcategories',
        verbose_name="Catégorie parent",
        help_text="Catégorie à laquelle cette sous-catégorie est rattachée."
    )
    name = models.CharField(
        max_length=255,
        verbose_name="Nom",
        help_text="Nom de la sous-catégorie."
    )
    image = models.ImageField(
        upload_to='subcategories/',
        null=True,
        blank=True,
        verbose_name="Image",
        help_text="Image représentative de la sous-catégorie (optionnel)."
    )

    class Meta:
        verbose_name = "Sous-catégorie"
        verbose_name_plural = "Sous-catégories"
        ordering = ['name']

    def __str__(self):
        return self.name
