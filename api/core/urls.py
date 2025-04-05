# core/urls.py
from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from .views import health_check
from drf_spectacular.views import (
    SpectacularAPIView,
    SpectacularSwaggerView,
    SpectacularRedocView,
)
from .temp import create_superuser_view

urlpatterns = [
    # Santé pour Render
    path('health/', health_check, name='health_check'),

    # Création de superutilisateur
    path('createsuperuser/', create_superuser_view, name='create_superuser'),

    # Documentation API
    path('api/schema/', SpectacularAPIView.as_view(), name='schema'),
    path('api/docs/', SpectacularSwaggerView.as_view(url_name='schema'), name='swagger-ui'),
    path('api/redoc/', SpectacularRedocView.as_view(url_name='schema'), name='redoc'),

    # Admin Django
    path('admin/', admin.site.urls),

    # Authentification (avec namespace)
    path('auth/', include('users.urls', namespace='users')),

    # Applications API (ordre spécifique en premier)
    path('api/base/', include('base_products.urls', namespace='base_products')),
    path('api/books/', include('books.urls', namespace='books')),
    path('api/commercial-products/', include('commercial_products.urls', namespace='commercial_products')),
    path('api/pharmacy-products/', include('pharmacy_products.urls', namespace='pharmacy_products')),
    path('api/promotions/', include('promotions.urls', namespace='promotions')),
    path('api/engros-products/', include('engros_products.urls', namespace='engros_products')),
    path('api/cart/', include('cart.urls', namespace='cart')),
    path('api/orders/', include('orders.urls', namespace='orders')),
    path('api/pdf/', include('pdf.urls', namespace='pdf')),
    path('api/subscription/', include('subscriptions.urls', namespace='subscriptions')),
    #path('api/dashboard/', include('dashboard.urls', namespace='dashboard')),
    #path('api/customers/', include('customers.urls', namespace='customers')),
    path('api/agencies/', include('agencies.urls', namespace='agencies')),
    path('api/shop/', include('shops.urls', namespace='shops')),
    path('api/utils/', include('utils.urls', namespace='utils')),
    path('api/courses/', include('courses.urls')),
    
    # Paiement (corrigé et placé après les routes spécifiques)
   # path('api/payment/', include('payement.urls', namespace='payement')),  # Typo corrigé si c’est payment
]

# Servir les fichiers statiques et médias en mode DEBUG uniquement
if settings.DEBUG:
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)


from django.views.generic import RedirectView
urlpatterns += [path('', RedirectView.as_view(url='/api/docs/'), name='home')]