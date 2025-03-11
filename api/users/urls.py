# users/urls.py
from django.urls import path
from .views import (
    CustomTokenObtainPairView, CustomTokenRefreshView, CustomTokenVerifyView,
    LogoutView, PasswordResetRequestView, PasswordResetConfirmView, ActivateAccountView,
    RegisterUserView, ResendActivationView, Generate2FATokenView, CheckUserView, Verify2FAView
)

urlpatterns = [
    # JWT Auth
    path('jwt/create/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('jwt/refresh/', CustomTokenRefreshView.as_view(), name='token_refresh'),
    path('jwt/verify/', CustomTokenVerifyView.as_view(), name='token_verify'),

    # Déconnexion
    path('logout/', LogoutView.as_view(), name='logout'),

    # Réinitialisation mot de passe
    path('password/reset/request/', PasswordResetRequestView.as_view(), name='password_reset_request'),
    path('password/reset/', PasswordResetConfirmView.as_view(), name='password_reset_confirm'),

    # Inscription et activation
    path('register/', RegisterUserView.as_view(), name='register_user'),
    path('activate/', ActivateAccountView.as_view(), name='activate_account'),
    path('activate/resend/', ResendActivationView.as_view(), name='resend_activation'),

    # 2FA
    path('generate-2fa-token/', Generate2FATokenView.as_view(), name='generate_2fa_token'),
    path('verify-2fa/', Verify2FAView.as_view(), name='verify_2fa'),

    # Utilitaire
    path('check-user/', CheckUserView.as_view(), name='check_user'),
]