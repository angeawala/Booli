# pharmacy_products/apps.py
from django.apps import AppConfig

class PharmacyProductsConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'pharmacy_products'

    def ready(self):
        import pharmacy_products.signals