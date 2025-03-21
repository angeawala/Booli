# core/signals.py
from django.db.models.signals import pre_save
from django.dispatch import receiver
from django_currentuser.middleware import get_current_user
from .models import BaseModel

@receiver(pre_save)
def set_audit_fields(sender, instance, **kwargs):
    if isinstance(instance, BaseModel):
        current_user = get_current_user()
        if current_user and current_user.is_authenticated:
            if not instance.pk:  # Création
                if not instance.created_by:
                    instance.created_by = current_user
            # Mise à jour (toujours, sauf si déjà défini manuellement dans un cas rare)
            if not instance.updated_by or instance.pk:
                instance.updated_by = current_user