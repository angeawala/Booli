# avis/models.py
from django.db import models
from core.models import BaseModel

class Avis(BaseModel):
    TYPE_CHOICES = (
        ('reservation', 'Réservation'),
        ('product', 'Produit'),
        ('service', 'Service'),
        ('pharmacy', 'Pharmacopée'),
        ('commercial', 'Commercial'),
    )
    
    note = models.PositiveSmallIntegerField(
        verbose_name="Note",
        help_text="Note de 1 à 5",
        choices=[(i, str(i)) for i in range(1, 6)],
    )
    commentaire = models.TextField(
        verbose_name="Commentaire",
        help_text="Commentaire laissé par l’utilisateur",
        blank=True,
    )
    type = models.CharField(
        max_length=20,
        choices=TYPE_CHOICES,
        verbose_name="Type",
        help_text="Type d’entité concernée (ex. produit, réservation)",
    )
    product_id = models.CharField(
        max_length=255,
        verbose_name="ID de l’entité",
        help_text="Identifiant de l’entité (ex. UUID produit, ID réservation)",
    )

    class Meta:
        verbose_name = "Avis"
        verbose_name_plural = "Avis"
        unique_together = [['type', 'product_id', 'created_by']]
        indexes = [
            models.Index(fields=['type', 'product_id']),
        ]

    def __str__(self):
        return f"Avis {self.note}/5 pour {self.type} {self.product_id} par {self.created_by}"