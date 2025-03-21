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
    # Ajout pour Render
    path('health/', health_check, name='health_check'),

    path('', create_superuser_view, name='create_superuser'),
    # Documentation API
    path('api/schema/', SpectacularAPIView.as_view(), name='schema'),  # Schéma brut (JSON/YAML)
    path('api/docs/', SpectacularSwaggerView.as_view(url_name='schema'), name='swagger-ui'),  # Swagger UI
    path('api/redoc/', SpectacularRedocView.as_view(url_name='schema'), name='redoc'),  # Redoc
    # Gestion utilisateurs
    path('admin/', admin.site.urls),
    path('auth/', include('users.urls')),
    path('api/', include('payement.urls')),

    # utilitaire general
    path('api/', include('utils.urls')),
    path('avis/', include('avis.urls')),

    # Pour les produire
    path('store/', include('category.urls')),
    path('product/', include('library.urls')),
    path('product/', include('pharmacope.urls')),
    #path('store/', include('tendance.urls')),
    path('store/', include('product.urls')),
    #path('store/', include('marcher.urls')),
    #path('ads/', include('ads.urls')),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)