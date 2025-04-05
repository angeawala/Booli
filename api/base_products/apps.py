# base_products/apps.py
from django.apps import AppConfig

class BaseProductsConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'base_products'

    def ready(self):
        import base_products.signals