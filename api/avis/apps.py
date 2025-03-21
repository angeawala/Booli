# avis/apps.py
from django.apps import AppConfig

class AvisConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'avis'

    def ready(self):
        import avis.signals