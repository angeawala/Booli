from django.db.models.signals import post_save
from django.dispatch import receiver
from django.core.cache import cache
from .models import Devise, TauxEchange
import logging
from threading import Thread

logger = logging.getLogger(__name__)

def fetch_exchange_rates(new_devise: Devise):
    """Met à jour les taux d'échange pour une nouvelle devise."""
    existing_devises = Devise.objects.exclude(id=new_devise.id)
    bulk_create_taux = []
    bulk_update_taux = []

    for devise in existing_devises:
        taux_direct = 1.2 if devise.code == "USD" and new_devise.code == "EUR" else 0.83
        taux_inverse = 1 / taux_direct

        taux_from, created_from = TauxEchange.objects.get_or_create(
            devise_from=devise,
            devise_to=new_devise,
            defaults={"taux": taux_direct},
        )
        if not created_from:
            taux_from.taux = taux_direct
            bulk_update_taux.append(taux_from)

        taux_to, created_to = TauxEchange.objects.get_or_create(
            devise_from=new_devise,
            devise_to=devise,
            defaults={"taux": taux_inverse},
        )
        if not created_to:
            taux_to.taux = taux_inverse
            bulk_update_taux.append(taux_to)
    
    if bulk_create_taux:
        TauxEchange.objects.bulk_create(bulk_create_taux)
    if bulk_update_taux:
        TauxEchange.objects.bulk_update(bulk_update_taux, ["taux"])

    logger.info(f"Taux simulés et enregistrés pour {new_devise.code}")

@receiver(post_save, sender=Devise)
def update_exchange_rates(sender, instance, created, **kwargs):
    if created and Devise.objects.count() > 1:
        Thread(target=fetch_exchange_rates, args=(instance,)).start()
        cache.delete("exchange_rates")
        logger.info(f"Cache des taux de change supprimé après ajout de {instance.code}")

logger.info("Signaux pour l’app utils chargés.")
