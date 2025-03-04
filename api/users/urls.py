# src/backend/users/urls.py
from django.urls import path
from .views import (
    CustomTokenObtainPairView, CustomTokenRefreshView, CustomTokenVerifyView,
    logout_view, password_reset_request, password_reset_confirm, activate_user,
    register_user, resend_activation, generate_2fa_token, check_user, verify_2fa
)

urlpatterns = [
    # JWT Auth
    path('jwt/create/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),  # Connexion
    path('jwt/refresh/', CustomTokenRefreshView.as_view(), name='token_refresh'),       # Rafraîchissement
    path('jwt/verify/', CustomTokenVerifyView.as_view(), name='token_verify'),          # Vérification

    # Déconnexion
    path('logout/', logout_view, name='logout'),  # Supprime les cookies

    # Réinitialisation mot de passe
    path('password-reset/', password_reset_request, name='password_reset'),             # Demande email
    path('password-reset-confirm/', password_reset_confirm, name='password_reset_confirm'),  # Confirme (new_password, confirm_password)

    # Inscription et activation
    path('register/', register_user, name='register_user'),                            # Inscription
    path('activate/<uuid:token>/', activate_user, name='activate_user'),               # Activation via token
    path('resend-activation/', resend_activation, name='resend_activation'),           # Renvoi email activation

    # 2FA
    path('generate-2fa-token/', generate_2fa_token, name='generate_2fa_token'),        # Génère code 2FA
    path('verify-2fa/', verify_2fa, name='verify_2fa'),                                # Vérifie 2FA

    # Utilitaire
    path('check-user/', check_user, name='check_user'),                                # Vérifie utilisateur
]