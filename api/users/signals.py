# users/signals.py
from django.db.models.signals import post_save, pre_delete
from django.dispatch import receiver
from django.core.mail import send_mail
from django.conf import settings
from .models import CustomUser

@receiver(post_save, sender=CustomUser)
def user_updated(sender, instance, created, **kwargs):
    if not created:
        subject = 'Mise à jour de votre profil - BOOLi-STORE'
        message = (
            f"Bonjour {instance.first_name},\n\nVotre profil a été mis à jour avec succès.\n\n"
            f"Cordialement,\nL’équipe BOOLi-STORE"
        )
        send_mail(subject, message, settings.DEFAULT_FROM_EMAIL, [instance.email], fail_silently=True)

@receiver(pre_delete, sender=CustomUser)
def user_deleted(sender, instance, **kwargs):
    subject = 'Suppression de votre compte - BOOLi-STORE'
    message = (
        f"Bonjour {instance.first_name},\n\nVotre compte a été supprimé avec succès.\n\n"
        f"Merci d’avoir utilisé BOOLi-STORE.\n\nCordialement,\nL’équipe BOOLi-STORE"
    )
    send_mail(subject, message, settings.DEFAULT_FROM_EMAIL, [instance.email], fail_silently=True)