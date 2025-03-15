"""
Django settings for core project.
Generated by 'django-admin startproject' using Django 4.2.19.
Ready to rock the API world @ https://booli-api.onrender.com/!
Docs: https://docs.djangoproject.com/en/4.2/topics/settings/
"""

from pathlib import Path
import os
import dj_database_url
from datetime import timedelta

# ======= BASE_DIR : Le QG du projet =======
BASE_DIR = Path(__file__).resolve().parent.parent
# ======= Fin BASE_DIR =======

# ======= Dev vs Prod : Mode geek activé =======
DEVELOPPEMENT = os.getenv('DEVELOPPEMENT', 'True') == 'True'  # True = lab local, False = Render live

if DEVELOPPEMENT:
    DEBUG = True
    SECRET_KEY = 'your-local-secret-key'
    ALLOWED_HOSTS = ['localhost', '127.0.0.1']
    DATABASES = {
        'default': {
            'ENGINE': 'django.db.backends.sqlite3',
            'NAME': BASE_DIR / 'db.sqlite3',
        }
    }
    FRONTEND_URL = "http://localhost:3000"  # URL frontend local
    BACKEND_URL = "http://localhost:8000"
    CORS_ALLOW_ALL_ORIGINS = True 
else:
    DEBUG = False
    SECRET_KEY = os.getenv('SECRET_KEY')
    ALLOWED_HOSTS = [
        'booli-api.onrender.com',  # Domaine public
        '.onrender.com',           # Wildcard pour les sous-domaines Render
        #'*',                       # Accepte tout (temporaire pour tester)
    ]
    FRONTEND_URL = os.getenv('FRONTEND_URL', 'https://booli-store.onrender.com')
    BACKEND_URL = os.getenv('BACKEND_URL', 'https://booli-api.onrender.com')
    CORS_ALLOWED_ORIGINS = [FRONTEND_URL]
    CORS_ALLOW_ALL_ORIGINS = False
    DATABASES = {
        'default': dj_database_url.config(default=os.getenv('DATABASE_URL'), conn_max_age=600)
    }

# ======= Fin Dev/Prod =======

# ======= Configuration SMTP =======
EMAIL_BACKEND = "django.core.mail.backends.smtp.EmailBackend"
EMAIL_HOST = os.getenv("EMAIL_HOST", "smtp.mailersend.net")
EMAIL_PORT = int(os.getenv("EMAIL_PORT", 587))
EMAIL_USE_TLS = os.getenv("EMAIL_USE_TLS", "True") == "True"
EMAIL_HOST_USER = os.getenv("EMAIL_HOST_USER", "MS_tCAwUZ@trial-3zxk54v908qgjy6v.mlsender.net")
EMAIL_HOST_PASSWORD = os.getenv("EMAIL_HOST_PASSWORD", "mssp.z9lmJhT.jy7zpl93dn0l5vx6.rv4hDGX")
DEFAULT_FROM_EMAIL = "noreply@trial-3zxk54v908qgjy6v.mlsender.net"
# ======= Fin Configuration SMTP =======

# ======= Apps : Les modules de puissance =======
INSTALLED_APPS = [
    'admin_interface',
    'colorfield',
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'jazzmin',
    'corsheaders',  # CORS pour les en-têtes HTTP cross-origin
    'rest_framework',  # DRF pour l’API REST
    'rest_framework_simplejwt',  # JWT pour des tokens sécurisés
    'users',  # app users avec CustomUser
    'drf_spectacular',  # Ajout pour la doc auto
    'product',
    'utils',
    'payement',
    'category',
    'marcher',
    'tendance',
    'ads',
]
# ======= Fin Apps =======

# ======= Middleware : Les gardiens du flux =======
MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'corsheaders.middleware.CorsMiddleware',  # Gère les en-têtes comme Access-Control-Allow-Origin
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'whitenoise.middleware.WhiteNoiseMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]
# ======= Fin Middleware =======
# =======Configuration CORS ====
CORS_ALLOW_CREDENTIALS = True  # Permet les cookies avec les requêtes
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
#========FIN CORS CONFIGURATION=================
# ======= DRF Spectacular : Doc API auto =======
REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': (
        'rest_framework_simplejwt.authentication.JWTAuthentication',
    ),
    'DEFAULT_PERMISSION_CLASSES': (
        'rest_framework.permissions.IsAuthenticated',
    ),
    # Ajout pour drf-spectacular
    'DEFAULT_SCHEMA_CLASS': 'drf_spectacular.openapi.AutoSchema',
}

SPECTACULAR_SETTINGS = {
    'TITLE': 'BOOLi-API Documentation',
    'DESCRIPTION': 'Documentation automatique de l’API BOOLi-STORE.',
    'VERSION': '1.0.0',
    'SERVE_INCLUDE_SCHEMA': True,  # Inclut le schéma dans la doc
    'SWAGGER_UI_SETTINGS': {
        'deepLinking': True,  # Active les liens profonds dans Swagger
    },
}
# ======= Fin DRF Spectacular =======

# ======= Simple JWT : Tokens niveau hacker =======

SIMPLE_JWT = {
    'ACCESS_TOKEN_LIFETIME': timedelta(minutes=5),
    'REFRESH_TOKEN_LIFETIME': timedelta(days=3),
    'ROTATE_REFRESH_TOKENS': False,
    'BLACKLIST_AFTER_ROTATION': False,
    'UPDATE_LAST_LOGIN': False,
    'ALGORITHM': 'HS256',
    'SIGNING_KEY': SECRET_KEY,
    'VERIFYING_KEY': None,
    'AUTH_HEADER_TYPES': ('Bearer',),
    'USER_ID_FIELD': 'id',
    'USER_ID_CLAIM': 'user_id',
    'AUTH_TOKEN_CLASSES': ('rest_framework_simplejwt.tokens.AccessToken',),
    'TOKEN_TYPE_CLAIM': 'token_type',
    'JTI_CLAIM': 'jti',
    # Configuration des cookies
    'AUTH_COOKIE': 'access_token',         # Nom du cookie pour l’access token (optionnel)
    'AUTH_COOKIE_REFRESH': 'refresh_token', # Nom du cookie pour le refresh token
    'AUTH_COOKIE_SECURE': not DEVELOPPEMENT, # True en prod pour HTTPS
    'AUTH_COOKIE_HTTP_ONLY': True,          # Protège contre XSS
    'AUTH_COOKIE_SAMESITE': 'Lax',          # Protège contre CSRF
    'AUTH_COOKIE_REFRESH_MAX_AGE': 3 * 24 * 60 * 60, # 3 jours en secondes
}
# ======= Fin Simple JWT =======

# ======= User Model : Le héros custom =======
AUTH_USER_MODEL = 'users.CustomUser'  # Ton modèle utilisateur personnalisé
# ======= Fin User Model =======

# ======= URLs et WSGI : Le cœur du routing =======
ROOT_URLCONF = 'core.urls'
WSGI_APPLICATION = 'core.wsgi.application'
# ======= Fin URLs et WSGI =======

# ======= Templates : Prêt pour l’affichage =======
TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
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
# ======= Fin Templates =======

# ======= Passwords : Sécurité des clés =======
AUTH_PASSWORD_VALIDATORS = [
    {'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator'},
    {'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator'},
    {'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator'},
    {'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator'},
]
# ======= Fin Passwords =======

# ======= I18N : Parlez-vous français ? =======
LANGUAGE_CODE = 'fr-fr'
TIME_ZONE = 'UTC'
USE_I18N = True
USE_TZ = True
# ======= Fin I18N =======

# ======= Fichiers Statiques =======
STATIC_URL = '/static/'
MEDIA_URL = '/media/'
MEDIA_ROOT = BASE_DIR / 'media'
STATIC_ROOT = BASE_DIR / 'staticfiles'  # Où collectstatic mettra les fichiers
STATICFILES_DIRS = []  # fichiers statiques personnalisés (optionnel)
STATICFILES_STORAGE = 'django.contrib.staticfiles.storage.StaticFilesStorage'  # Par défaut
# ======= Fin Fichiers Statiques =======

# ======= Auto Field : Les ID automatiques =======
DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'
# ======= Fin Auto Field =======

# ======= Personnalisation du dashboard =======

JAZZMIN_SETTINGS = {
    "site_title": "Booli Admin",
    "site_header": "Administration Booli Store",
    "welcome_sign": "Bienvenue le tableau administrative de Booli",
    #"search_model": ["auth.User", "app.Model"],  # Recherche rapide
    "icons": {
        "auth.User": "fas fa-user",
        "app.Model": "fas fa-database",
    },
    "show_sidebar": True,
    "navigation_expanded": True,
}
