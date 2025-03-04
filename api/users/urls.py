from django.urls import path
from .views import (
    CustomTokenObtainPairView, CustomTokenRefreshView, CustomTokenVerifyView,
    logout_view, password_reset_request, password_reset_confirm, activate_account,
    register_user, resend_activation, generate_2fa_token, check_user, verify_2fa
)

urlpatterns = [
    # JWT Auth
    path('jwt/create/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('jwt/refresh/', CustomTokenRefreshView.as_view(), name='token_refresh'),
    path('jwt/verify/', CustomTokenVerifyView.as_view(), name='token_verify'),

    # Déconnexion
    path('logout/', logout_view, name='logout'),

    # Réinitialisation mot de passe
    path('password/reset/request/', password_reset_request, name='password_reset_request'),
    path('password/reset/', password_reset_confirm, name='password_reset_confirm'),

    # Inscription et activation
    path('register/', register_user, name='register_user'),
    path('activate/', activate_account, name='activate_account'),  # Changé en POST
    path('activate/resend/', resend_activation, name='resend_activation'),

    # 2FA
    path('generate-2fa-token/', generate_2fa_token, name='generate_2fa_token'),
    path('verify-2fa/', verify_2fa, name='verify_2fa'),

    # Utilitaire
    path('check-user/', check_user, name='check_user'),
]