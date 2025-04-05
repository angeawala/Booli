# commercial_products/apps.py
from django.apps import AppConfig

class CommercialProductsConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'commercial_products'

    def ready(self):
        import commercial_products.signals  # Charge les signaux