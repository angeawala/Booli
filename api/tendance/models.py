from django.db import models
from django.utils import timezone
from product.models import BaseProduct

class Trend(models.Model):
    PERIOD_CHOICES = (
        ('daily', 'Quotidien'),
        ('weekly', 'Hebdomadaire'),
        ('monthly', 'Mensuel'),
    )
    
    base_product = models.ForeignKey(
        BaseProduct,
        on_delete=models.CASCADE,
        related_name='trends',
        verbose_name="Produit de base"
    )
    score = models.FloatField(default=0.0, verbose_name="Score de tendance")
    period = models.CharField(
        max_length=20,
        choices=PERIOD_CHOICES,
        default='weekly',
        verbose_name="Période"
    )
    calculated_at = models.DateTimeField(
        default=timezone.now,
        verbose_name="Calculé le"
    )

    class Meta:
        verbose_name = "Tendance"
        verbose_name_plural = "Tendances"
        unique_together = ('base_product', 'period', 'calculated_at')  # Unicité par produit, période et date
        ordering = ['-score', '-calculated_at']

    def __str__(self):
        return f"{self.base_product.name} - {self.get_period_display()} - {self.score}"