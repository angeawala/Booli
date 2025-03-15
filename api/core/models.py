import uuid
from django.db import models
from django.contrib.auth import get_user_model
from django.utils import timezone

User = get_user_model()

class BaseModel(models.Model):
    id = models.UUIDField(
        primary_key=True,
        default=uuid.uuid4,
        editable=False,
        verbose_name="Identifiant",
        help_text="Identifiant unique de l'entrée (UUID)."
    )
    created_by = models.ForeignKey(
        User,
        on_delete=models.SET_NULL,
        null=True,
        editable=False,
        verbose_name="Créé par",
        help_text="Utilisateur ayant créé l'entrée."
    )
    created_at = models.DateTimeField(
        default=timezone.now,
        editable=False,
        verbose_name="Date de création",
        help_text="Date et heure de création de l'entrée."
    )
    updated_at = models.DateTimeField(
        auto_now=True,
        editable=False,
        verbose_name="Date de mise à jour",
        help_text="Date et heure de la dernière mise à jour."
    )

    class Meta:
        abstract = True