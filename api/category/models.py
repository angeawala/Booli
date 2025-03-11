# myapp/models.py
from django.db import models

class Category(models.Model):
    name = models.CharField(max_length=100, unique=True, verbose_name="Nom")
    icon = models.CharField(max_length=50, blank=True, null=True, verbose_name="Icône (classe FontAwesome)")
    image = models.ImageField(upload_to='categories/', blank=True, null=True, verbose_name="Image")
    is_electronic = models.BooleanField(default=False, verbose_name="Est électronique")

    class Meta:
        verbose_name = "Catégorie"
        verbose_name_plural = "Catégories"

    def __str__(self):
        return self.name

class SubCategory(models.Model):
    category = models.ForeignKey(Category, on_delete=models.CASCADE, related_name="subcategories", verbose_name="Catégorie parent")
    name = models.CharField(max_length=100, verbose_name="Nom")
    image = models.ImageField(upload_to='subcategories/', blank=True, null=True, verbose_name="Image")

    class Meta:
        verbose_name = "Sous-catégorie"
        verbose_name_plural = "Sous-catégories"
        unique_together = ('category', 'name')  # Évite les doublons dans une même catégorie

    def __str__(self):
        return f"{self.name} ({self.category.name})"