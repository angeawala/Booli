# pdf/apps.py
from django.apps import AppConfig

class PDFConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'pdf'

    def ready(self):
        import pdf.signals