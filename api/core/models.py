# core/models.py
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
        help_text="Identifiant unique (UUID v4) non modifiable."
    )
    created_by = models.ForeignKey(
        User,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        editable=False,
        verbose_name="Créé par",
        help_text="Utilisateur ayant créé l’entrée.",
        related_name="%(class)s_created"
    )
    created_at = models.DateTimeField(
        default=timezone.now,
        editable=False,
        verbose_name="Date de création",
        help_text="Date et heure de création (non modifiable)."
    )
    updated_by = models.ForeignKey(
        User,
        on_delete=models.SET_NULL,
        null=True,
        default=None,
        blank=True,
        editable=False,
        verbose_name="Mis à jour par",
        help_text="Utilisateur ayant mis à jour l’entrée.",
        related_name="%(class)s_updated"
    )
    updated_at = models.DateTimeField(
        auto_now=True,
        editable=False,
        verbose_name="Date de mise à jour",
        help_text="Date et heure de la dernière mise à jour."
    )

    class Meta:
        abstract = True
        indexes = [
            models.Index(fields=['created_at']),
            models.Index(fields=['updated_at']),
        ]

    def save(self, *args, **kwargs):
        # Si c’est une création (pk n’existe pas encore)
        if not self.pk:
            # Laissez Django générer l’UUID via default=uuid.uuid4
            super().save(*args, **kwargs)
        else:
            # Mise à jour : préserver les champs originaux
            try:
                original = self.__class__.objects.get(pk=self.pk)
                self.id = original.id  # Préserver l’UUID
                self.created_by = original.created_by  # Préserver le créateur
                self.created_at = original.created_at  # Préserver la date de création
            except self.__class__.DoesNotExist:
                # Cas rare : l’objet a été supprimé entre temps, on continue
                pass
            super().save(*args, **kwargs)