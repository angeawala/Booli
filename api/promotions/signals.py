# promotions/signals.py
from django.db.models.signals import post_save, pre_delete
from django.dispatch import receiver
from django.core.mail import send_mail
from django.conf import settings
from .models import Promotion

@receiver(post_save, sender=Promotion)
def update_base_product_price(sender, instance, created, **kwargs):
    """Met à jour BaseProduct.prix_reduit avec Promotion.new_price."""
    if instance.is_active():
        instance.product.base_product.prix_reduit = instance.new_price
        instance.product.base_product.save(update_fields=['prix_reduit'])

@receiver(pre_delete, sender=Promotion)
def reset_base_product_price(sender, instance, **kwargs):
    """Réinitialise BaseProduct.prix_reduit à null après suppression et envoie un email."""
    product_name = instance.product.base_product.name
    user_email = instance.created_by.email if instance.created_by else None
    
    # Réinitialisation du prix réduit
    instance.product.base_product.prix_reduit = None
    instance.product.base_product.save(update_fields=['prix_reduit'])

    # Envoi de l'email si l'utilisateur existe et a une adresse email
    if user_email:
        subject = "Suppression de promotion"
        message = (
            f"Bonjour,\n\n"
            f"La promotion pour le produit '{product_name}' a été supprimée.\n"
            f"Le prix réduit a été réinitialisé à sa valeur par défaut.\n\n"
            f"Cordialement,\nL'équipe"
        )
        send_mail(
            subject=subject,
            message=message,
            from_email=settings.DEFAULT_FROM_EMAIL,
            recipient_list=[user_email],
            fail_silently=True,  # Évite une erreur si l'email échoue
        )