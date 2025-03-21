# categories/models.py
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
        help_text="Nom de la catégorie (ex. Livres, Réservations)."
    )
    category_type = models.CharField(
        max_length=50,
        choices=CATEGORY_TYPES,
        verbose_name="Type de catégorie",
        help_text="Type ou domaine (ex. Livre, Service)."
    )
    is_non_tech = models.BooleanField(
        default=False,
        verbose_name="Non technologique",
        help_text="Indique si la catégorie est non technologique (ex. livres physiques)."
    )
    image = models.ImageField(
        upload_to='categories/',
        null=True,
        blank=True,
        verbose_name="Image",
        help_text="Image optionnelle pour affichage."
    )
    icon = models.CharField(
        max_length=100,
        null=True,
        blank=True,
        verbose_name="Icône",
        help_text="Classe FontAwesome (ex. 'fa-book') pour affichage."
    )

    class Meta:
        verbose_name = "Catégorie"
        verbose_name_plural = "Catégories"
        ordering = ['name']
        unique_together = [['name', 'category_type']]  # Unicité combinée
        indexes = [
            models.Index(fields=['category_type']),
            models.Index(fields=['name']),
        ]

    def __str__(self):
        return f"{self.name} ({self.category_type})"

class SubCategory(BaseModel):
    category = models.ForeignKey(
        Category,
        on_delete=models.SET_NULL,  # Changé pour préserver les sous-catégories
        null=True,
        related_name='subcategories',
        verbose_name="Catégorie parent",
        help_text="Catégorie parent (null si supprimée)."
    )
    name = models.CharField(
        max_length=255,
        verbose_name="Nom",
        help_text="Nom de la sous-catégorie (ex. Romans)."
    )
    image = models.ImageField(
        upload_to='subcategories/',
        null=True,
        blank=True,
        verbose_name="Image",
        help_text="Image optionnelle pour affichage."
    )

    class Meta:
        verbose_name = "Sous-catégorie"
        verbose_name_plural = "Sous-catégories"
        ordering = ['name']
        indexes = [models.Index(fields=['name'])]

    def __str__(self):
        return self.name