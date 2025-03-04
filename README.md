# BOOLi-API

Bienvenue dans **BOOLi-API**, le backend de l’application **BOOLi-STORE**. Cette API RESTful, construite avec Django et Django REST Framework, gère l’authentification, les utilisateurs, et bien plus encore. Elle est déployée sur Render et interagit avec le frontend hébergé à [https://booli-store.onrender.com/](https://booli-store.onrender.com/).

## Fonctionnalités
- **Authentification** : JWT avec tokens d’accès (5 min) et refresh (3 jours), 2FA optionnel.
- **Gestion des utilisateurs** : Inscription, activation par email, réinitialisation de mot de passe (entièrement configuré dans l’app `users`).
- **Documentation API** : Générée automatiquement avec `drf-spectacular` (Swagger UI et Redoc).
- **Admin** : Interface Django Admin pour gérer les utilisateurs et leurs tokens.

## URLs
- **API** : [https://booli-api.onrender.com/](https://booli-api.onrender.com/)
- **Docs Swagger** : [https://booli-api.onrender.com/api/docs/](https://booli-api.onrender.com/api/docs/)
- **Docs Redoc** : [https://booli-api.onrender.com/api/redoc/](https://booli-api.onrender.com/api/redoc/)
- **Admin** : [https://booli-api.onrender.com/admin/](https://booli-api.onrender.com/admin/)

## Prérequis
- Python 3.8+
- Django 4.2+
- Django REST Framework
- Git

