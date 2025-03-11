# core/urls.py
from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from .views import health_check
from drf_spectacular.views import (
    SpectacularAPIView,  # Endpoint pour le schéma brut
    SpectacularSwaggerView,  # Interface Swagger
    SpectacularRedocView,  # Interface Redoc
)
from .temp import create_superuser_view

urlpatterns = [
    path('admin/', admin.site.urls),
    path('auth/', include('users.urls')),
    path('api/', include('utils.urls')),
    path('api/', include('payement.urls')),
    path('api/', include('category.urls')),

    #temporaire

    path('', create_superuser_view, name='create_superuser'),

    # Documentation API
    path('api/schema/', SpectacularAPIView.as_view(), name='schema'),  # Schéma brut (JSON/YAML)
    path('api/docs/', SpectacularSwaggerView.as_view(url_name='schema'), name='swagger-ui'),  # Swagger UI
    path('api/redoc/', SpectacularRedocView.as_view(url_name='schema'), name='redoc'),  # Redoc
    path('health/', health_check, name='health_check'),  # Ajout pour Render

]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)