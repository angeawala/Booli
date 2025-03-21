# library/utils.py
from django.core.cache import cache
from django.core.mail import send_mail
from django.conf import settings
import logging

logger = logging.getLogger(__name__)

def get_cache_key(entity_type, entity_id):
    """Génère une clé de cache générique."""
    return f"{entity_type}_{entity_id}"

def cache_details(entity_type, entity_id, data, timeout=3600):
    """Met en cache les détails d’une entité."""
    cache.set(get_cache_key(entity_type, entity_id), data, timeout)
    logger.debug(f"Cache mis à jour pour {entity_type} {entity_id}")

def get_cached_details(entity_type, entity_id):
    """Récupère les détails mis en cache."""
    return cache.get(get_cache_key(entity_type, entity_id))

def send_pdf_download_email(user_email, book_title, pdf_url, fail_silently=False):
    """Envoie un email avec le lien de téléchargement du PDF."""
    subject = f"Votre accès au PDF : {book_title}"
    message = f"Voici le lien pour télécharger le PDF : {pdf_url}"
    try:
        send_mail(subject, message, settings.DEFAULT_FROM_EMAIL, [user_email], fail_silently=fail_silently)
        logger.info(f"Email envoyé à {user_email} pour {book_title}")
    except Exception as e:
        logger.error(f"Échec envoi email à {user_email} : {str(e)}")
        if not fail_silently:
            raise

def generate_signed_url(file_obj, expires_in=3600):
    """Génère une URL signée pour un fichier (à implémenter avec un service comme django-signed-url)."""
    # Placeholder : À remplacer par une vraie implémentation
    return file_obj.url  # Exemple simplifié