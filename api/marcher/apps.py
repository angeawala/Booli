from django.apps import AppConfig


class MarcherConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'marcher'

    def ready(self):
        import marcher.signals  # Importe les signaux lors du démarrage