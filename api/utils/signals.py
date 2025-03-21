# utils/signals.py
from django.db.models.signals import post_save
from django.dispatch import receiver
from django.core.cache import cache
from .models import Devise, TauxEchange
import logging

logger = logging.getLogger(__name__)

def fetch_exchange_rates(new_devise: Devise):
    """À implémenter : récupère les taux via une API externe."""
    existing_devises = Devise.objects.exclude(id=new_devise.id)
    for devise in existing_devises:
        taux_direct = 1.2 if devise.code == "USD" and new_devise.code == "EUR" else 0.83
        taux_inverse = 1 / taux_direct
        TauxEchange.objects.update_or_create(
            devise_from=devise,
            devise_to=new_devise,
            defaults={"taux": taux_direct},
        )
        TauxEchange.objects.update_or_create(
            devise_from=new_devise,
            devise_to=devise,
            defaults={"taux": taux_inverse},
        )
    logger.info(f"Taux simulés pour {new_devise.code}")

@receiver(post_save, sender=Devise)
def update_exchange_rates(sender, instance, created, **kwargs):
    if created and Devise.objects.count() > 1:  # Sauf la première devise
        fetch_exchange_rates(instance)
        cache_key = "exchange_rates"
        cache.delete(cache_key)
        logger.info(f"Taux mis à jour pour nouvelle devise {instance.code}")

logger.info("Signaux pour l’app utils chargés.")