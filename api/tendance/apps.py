from django.apps import AppConfig


class TendanceConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'tendance'
    def ready(self):
        import tendance.signals
