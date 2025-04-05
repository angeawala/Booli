# promotions/models.py
from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator
from django.utils import timezone
from core.models import BaseModel
from commercial_products.models import CommercialProduct

class Promotion(BaseModel):
    product = models.ForeignKey(CommercialProduct, on_delete=models.CASCADE, related_name="promotions", verbose_name="Produit")
    discount_percentage = models.FloatField(
        validators=[MinValueValidator(0), MaxValueValidator(100)],
        verbose_name="Pourcentage de réduction"
    )
    old_price = models.JSONField(verbose_name="Prix avant réduction")  # {"valeur": 5000, "devise": "FCFA"}
    new_price = models.JSONField(verbose_name="Prix après réduction")  # {"valeur": 4250, "devise": "FCFA"}
    end_time = models.DateTimeField(verbose_name="Date de fin")

    class Meta:
        verbose_name = "Promotion"
        verbose_name_plural = "Promotions"
        ordering = ['-end_time']

    def __str__(self):
        return f"{self.product} (-{self.discount_percentage}%)"

    def is_active(self):
        return self.end_time > timezone.now()