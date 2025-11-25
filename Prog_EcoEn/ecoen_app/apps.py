from django.apps import AppConfig

class EcoenAppConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'ecoen_app'

    def ready(self):
        import ecoen_app.signals  # ajustá el path si usás otro nombre
