from pathlib import Path
import os
import dj_database_url
from datetime import timedelta

# ======= BASE_DIR : Le QG du projet =======
BASE_DIR = Path(__file__).resolve().parent.parent

# ======= Dev vs Prod : Mode geek activé =======
DEVELOPPEMENT = os.getenv('DEVELOPPEMENT', 'True') == 'True'  # True = local, False = prod

# ======= Sécurité : Clé secrète et hôtes =======
if DEVELOPPEMENT:
    DEBUG = True
    SECRET_KEY = 'your-local-secret_key'  # À remplacer par une clé sécurisée en local
    ALLOWED_HOSTS = ['localhost', '127.0.0.1']
    CORS_ALLOW_ALL_ORIGINS = True  # Tout autoriser en dev
else:
    DEBUG = False
    SECRET_KEY = os.getenv('SECRET_KEY')  # Doit être défini dans Render
    if not SECRET_KEY:
        raise ValueError("SECRET_KEY doit être défini en production!")
    ALLOWED_HOSTS = [
        'booli-api.onrender.com',
        '.onrender.com',  # Wildcard pour Render
    ]
    SECURE_SSL_REDIRECT = True  # Force HTTPS en prod
    SESSION_COOKIE_SECURE = True  # Cookies sécurisés
    CSRF_COOKIE_SECURE = True  # CSRF sécurisé
    CORS_ALLOW_ALL_ORIGINS = False
    CORS_ALLOWED_ORIGINS = [
        os.getenv('FRONTEND_URL', 'https://booli-store.onrender.com'),
    ]

# ======= URLs Frontend/Backend =======
FRONTEND_URL = "http://localhost:3000" if DEVELOPPEMENT else os.getenv('FRONTEND_URL', 'https://booli-store.onrender.com')
BACKEND_URL = "http://localhost:8000" if DEVELOPPEMENT else os.getenv('BACKEND_URL', 'https://booli-api.onrender.com')

# ======= Fichiers Statiques et Médias =======
STATIC_URL = '/static/'
STATIC_ROOT = BASE_DIR / 'staticfiles'
STATICFILES_DIRS = [BASE_DIR / 'static']
STATICFILES_STORAGE = 'whitenoise.storage.CompressedManifestStaticFilesStorage' if not DEVELOPPEMENT else 'django.contrib.staticfiles.storage.StaticFilesStorage'

MEDIA_URL = '/media/'
MEDIA_ROOT = BASE_DIR / 'media'

# ======= Configuration SMTP =======
EMAIL_BACKEND = "django.core.mail.backends.smtp.EmailBackend"
EMAIL_HOST = os.getenv("EMAIL_HOST", "smtp.mailersend.net")
EMAIL_PORT = int(os.getenv("EMAIL_PORT", 587))
EMAIL_USE_TLS = os.getenv("EMAIL_USE_TLS", "True") == "True"
EMAIL_HOST_USER = os.getenv("EMAIL_HOST_USER", "MS_tCAwUZ@trial-3zxk54v908qgjy6v.mlsender.net")
EMAIL_HOST_PASSWORD = os.getenv("EMAIL_HOST_PASSWORD", "mssp.z9lmJhT.jy7zpl93dn0l5vx6.rv4hDGX")
DEFAULT_FROM_EMAIL = "noreply@trial-3zxk54v908qgjy6v.mlsender.net"

# ======= Apps : Les modules de puissance =======
INSTALLED_APPS = [
    'admin_interface',  # Avant django.contrib.admin
    'colorfield',
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'corsheaders',
    'rest_framework',
    'rest_framework_simplejwt',
    'drf_spectacular',
    'django_currentuser',
    # Nos applications
    'users',
    'base_products',
    'books',
    'commercial_products',
    'pharmacy_products',
    'promotions',
    'engros_products',
    'cart',
    'orders',
    'pdf',
    'subscriptions',
    'dashboard',
    'customers',
    'agencies',
    'shops',
    'utils',
    'payement',
    'courses',
    'core',  # Gardé en dernier si contient des overrides
]

# ======= Middleware : Les gardiens du flux =======
MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'whitenoise.middleware.WhiteNoiseMiddleware',  # Avant CORS pour fichiers statiques
    'corsheaders.middleware.CorsMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
    'django_currentuser.middleware.ThreadLocalUserMiddleware',  # Pour django_currentuser
]

# ======= Configuration CORS =======
CORS_ALLOW_CREDENTIALS = True
CORS_ALLOW_METHODS = [
    "DELETE",
    "GET",
    "OPTIONS",
    "PATCH",
    "POST",
    "PUT",
]
CORS_ALLOW_HEADERS = [
    "accept",
    "accept-encoding",
    "authorization",
    "content-type",
    "dnt",
    "origin",
    "user-agent",
    "x-csrftoken",
    "x-requested-with",
]

# ======= Base de Données =======
if DEVELOPPEMENT:
    DATABASES = {
        'default': {
            'ENGINE': 'django.db.backends.sqlite3',
            'NAME': BASE_DIR / 'db.sqlite3',
        }
    }
else:
    DATABASES = {
        'default': dj_database_url.config(
            default=os.getenv('DATABASE_URL'),
            conn_max_age=600,
            ssl_require=True  # Force SSL en prod
        )
    }

# ======= DRF et Spectacular =======
REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': (
        'rest_framework_simplejwt.authentication.JWTAuthentication',
    ),
    'DEFAULT_PERMISSION_CLASSES': (
        'rest_framework.permissions.IsAuthenticated',
    ),
    'DEFAULT_SCHEMA_CLASS': 'drf_spectacular.openapi.AutoSchema',
}

SPECTACULAR_SETTINGS = {
    'TITLE': 'BOOLi-API Documentation',
    'DESCRIPTION': 'Documentation automatique de l’API BOOLi-STORE.',
    'VERSION': '1.0.0',
    'SERVE_INCLUDE_SCHEMA': True,
    'SWAGGER_UI_SETTINGS': {
        'deepLinking': True,
    },
}

# ======= Simple JWT =======
SIMPLE_JWT = {
    'ACCESS_TOKEN_LIFETIME': timedelta(minutes=5),
    'REFRESH_TOKEN_LIFETIME': timedelta(days=3),
    'ROTATE_REFRESH_TOKENS': False,
    'BLACKLIST_AFTER_ROTATION': False,
    'UPDATE_LAST_LOGIN': True,  # Mis à True pour suivre les connexions
    'ALGORITHM': 'HS256',
    'SIGNING_KEY': SECRET_KEY,
    'VERIFYING_KEY': None,
    'AUTH_HEADER_TYPES': ('Bearer',),
    'USER_ID_FIELD': 'id',
    'USER_ID_CLAIM': 'user_id',
    'AUTH_TOKEN_CLASSES': ('rest_framework_simplejwt.tokens.AccessToken',),
    'TOKEN_TYPE_CLAIM': 'token_type',
    'JTI_CLAIM': 'jti',
    'AUTH_COOKIE': 'access_token',
    'AUTH_COOKIE_REFRESH': 'refresh_token',
    'AUTH_COOKIE_SECURE': not DEVELOPPEMENT,
    'AUTH_COOKIE_HTTP_ONLY': True,
    'AUTH_COOKIE_SAMESITE': 'Lax',
    'AUTH_COOKIE_REFRESH_MAX_AGE': 3 * 24 * 60 * 60,  # 3 jours
}

# ======= User Model =======
AUTH_USER_MODEL = 'users.CustomUser'

# ======= URLs et WSGI =======
ROOT_URLCONF = 'core.urls'
WSGI_APPLICATION = 'core.wsgi.application'

# ======= Templates =======
TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [BASE_DIR / 'templates'],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

# ======= Passwords =======
AUTH_PASSWORD_VALIDATORS = [
    {'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator'},
    {'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator'},
    {'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator'},
    {'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator'},
]

# ======= I18N =======
LANGUAGE_CODE = 'fr-fr'
TIME_ZONE = 'UTC'
USE_I18N = True
USE_TZ = True
#========Cache =======
"""
CACHES = {
    'default': {
        'BACKEND': 'django.core.cache.backends.db.DatabaseCache',
        'LOCATION': 'cache_table',
    }
}
"""
# ======= Auto Field =======
DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'