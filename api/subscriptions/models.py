# subscriptions/models.py

from django.db import models
from django.core.exceptions import ValidationError
from django.utils import timezone
from core.models import BaseModel
from users.models import CustomUser
import random
import string

def generate_verification_code():
    """Génère un code de vérification de 8 caractères (chiffres + lettres)."""
    characters = string.ascii_letters + string.digits
    return ''.join(random.choice(characters) for _ in range(8))

class Plan(BaseModel):
    nom = models.CharField(max_length=100, verbose_name="Nom")
    prix = models.JSONField(verbose_name="Prix")  # Exemple : { "valeur": 5000, "devise": "FCFA" }
    duree = models.PositiveIntegerField(default=30, verbose_name="Durée (jours)")

    class Meta:
        verbose_name = "Plan"
        verbose_name_plural = "Plans"

    def clean(self):
        if self.prix.get('valeur', 0) <= 0:
            raise ValidationError("Le prix doit être supérieur à 0.")

    def __str__(self):
        return self.nom

    # Méthode pour récupérer la devise depuis le champ JSON
    def get_devise(self):
        return self.prix.get('devise', None)


class Subscription(BaseModel):
    user = models.ForeignKey(
        CustomUser,
        on_delete=models.CASCADE,
        related_name="subscriptions",
        verbose_name="Utilisateur"
    )
    plan = models.ForeignKey(
        Plan,
        on_delete=models.PROTECT,
        related_name="subscriptions",
        verbose_name="Plan"
    )
    code_verification = models.CharField(
        max_length=8,
        default=generate_verification_code,
        unique=True,
        verbose_name="Code de vérification"
    )
    is_active = models.BooleanField(default=False, verbose_name="Utilisé par une machine")
    is_expired = models.BooleanField(default=False, verbose_name="Expiré")
    start_date = models.DateTimeField(null=True, blank=True, verbose_name="Date de début")
    end_date = models.DateTimeField(null=True, blank=True, verbose_name="Date de fin")
    device = models.JSONField(verbose_name="Appareil")  # Exemple : { "id": "abc123", "type": "mobile" }
    payment_reference = models.CharField(
        max_length=100,
        null=True,
        blank=True,
        verbose_name="Référence de paiement"
    )

    class Meta:
        verbose_name = "Abonnement"
        verbose_name_plural = "Abonnements"

    def save(self, *args, **kwargs):
        now = timezone.now()

        # Définir dates si actif
        if self.is_active and not self.start_date:
            self.start_date = now
            self.end_date = now + timezone.timedelta(days=self.plan.duree)

        # Mise à jour automatique de l'état d'expiration
        if self.end_date and self.end_date < now:
            self.is_expired = True
            self.is_active = False

        super().save(*args, **kwargs)

    def clean(self):
        if self.is_active:
            active_subs = Subscription.objects.filter(
                user=self.user,
                is_active=True,
                is_expired=False
            ).exclude(id=self.id)

            for sub in active_subs:
                if sub.device == self.device:
                    raise ValidationError("Cet appareil est déjà utilisé par un autre abonnement actif.")

    def __str__(self):
        return f"{self.user} - {self.plan}"
