import uuid
from django.db import models
from django.contrib.auth import get_user_model
from django.utils import timezone
import random
import string

# Récupérer le modèle utilisateur
User = get_user_model()


# BaseModel avec champs communs
class BaseModel(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    created_by = models.ForeignKey(
        User, on_delete=models.SET_NULL, null=True, blank=True, related_name="%(class)s_created_by"
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True


# Modèle Country (Pays)
class Country(BaseModel):
    name = models.CharField(max_length=100, unique=True)

    def __str__(self):
        return self.name

    class Meta:
        permissions = [("can_manage_countries", "Peut gérer les pays")]


# Modèle City (Ville)
class City(BaseModel):
    country = models.ForeignKey(Country, on_delete=models.CASCADE, related_name="cities")
    name = models.CharField(max_length=100)

    def __str__(self):
        return f"{self.name}, {self.country}"

    class Meta:
        unique_together = ("country", "name")  # Pas de doublons dans un pays
        permissions = [("can_manage_cities", "Peut gérer les villes")]


# Modèle Address (Adresse)
class Address(BaseModel):
    city = models.ForeignKey(City, on_delete=models.CASCADE, related_name="addresses")
    street = models.CharField(max_length=255)
    postal_code = models.CharField(max_length=20)

    def __str__(self):
        return f"{self.street}, {self.postal_code}, {self.city}"

    class Meta:
        permissions = [("can_manage_addresses", "Peut gérer les adresses")]


# ======= PlanAbonnement : Modèle des plans d'abonnement =======
class PlanAbonnement(BaseModel):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    nom = models.CharField(max_length=100, verbose_name="Nom du plan")
    temps = models.PositiveIntegerField(verbose_name="Durée (en jours)", help_text="Durée en jours de l'abonnement")
    prix = models.DecimalField(max_digits=10, decimal_places=2, verbose_name="Prix")
    devise = models.ForeignKey('payement.Devise', on_delete=models.SET_NULL, null=True, verbose_name="Devise")

    def __str__(self):
        return f"{self.nom} ({self.temps} jours - {self.prix} {self.devise.code})"

    class Meta:
        verbose_name = "Plan d'abonnement"
        verbose_name_plural = "Plans d'abonnement"

# ======= Abonnement : Modèle des abonnements =======
class Abonnement(BaseModel):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.ForeignKey(User, on_delete=models.CASCADE, verbose_name="Utilisateur", related_name="abonnements")
    plan = models.ForeignKey(PlanAbonnement, on_delete=models.SET_NULL, null=True, verbose_name="Plan")
    payment = models.ForeignKey('payement.Payment', on_delete=models.SET_NULL, null=True, verbose_name="Paiement", related_name="abonnements")
    code = models.CharField(max_length=8, unique=True, verbose_name="Code d'abonnement", editable=False)
    date_debut = models.DateTimeField(auto_now_add=True, verbose_name="Date de début")
    date_expiration = models.DateTimeField(verbose_name="Date d'expiration", blank=True)
    actif = models.BooleanField(default=True, verbose_name="Actif")

    def generate_code(self):
        """Génère un code unique de 8 chiffres."""
        code = ''.join(random.choices(string.digits, k=8))
        while Abonnement.objects.filter(code=code).exists():
            code = ''.join(random.choices(string.digits, k=8))
        return code

    def calculate_expiration(self):
        """Calcule la date d'expiration en fonction du plan."""
        if self.plan:
            return self.date_debut + timezone.timedelta(days=self.plan.temps)
        return self.date_debut  # Par défaut, pas d’expiration si pas de plan

    def save(self, *args, **kwargs):
        """Génère le code et calcule l’expiration lors de la sauvegarde."""
        if not self.code:
            self.code = self.generate_code()
        if not self.date_expiration:
            self.date_expiration = self.calculate_expiration()
        super().save(*args, **kwargs)

    def is_expired(self):
        """Vérifie si l’abonnement est expiré."""
        return timezone.now() > self.date_expiration

    def __str__(self):
        return f"Abonnement {self.code} - {self.user.email} ({self.plan.nom if self.plan else 'Sans plan'})"

    class Meta:
        verbose_name = "Abonnement"
        verbose_name_plural = "Abonnements"
