from django.db import models

class Entreprise(models.Model):
    nom = models.CharField(max_length=255)
    image = models.ImageField(upload_to="entreprises/")
    email = models.EmailField(unique=True)
    horaire = models.TextField(help_text="Ex: Lundi-Vendredi: 08h-18h")
    services = models.TextField(help_text="Liste des services proposés")
    adresse = models.CharField(max_length=255)
    telephone = models.CharField(max_length=20)
    site_web = models.URLField(blank=True, null=True)

    def __str__(self):
        return self.nom
