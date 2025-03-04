from django.core.mail import send_mail
from django.conf import settings
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView, TokenVerifyView
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import status, permissions
from .models import CustomUser, PasswordResetToken, ActivationToken, TwoFAToken
from .serializers import (
    CustomTokenObtainPairSerializer, CustomUserCreateSerializer,
    ActivationTokenSerializer, ResendActivationSerializer,
    PasswordResetRequestSerializer
)
from rest_framework_simplejwt.tokens import AccessToken
import requests

# ======= CustomTokenObtainPairView : Connexion JWT =======
class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer
    permission_classes = [permissions.AllowAny]

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data, context={'response': Response()})
        serializer.is_valid(raise_exception=True)
        
        access_token = serializer.validated_data['access']
        refresh_token = serializer.validated_data['refresh']

        response = Response({'access': access_token, 'refresh': refresh_token})
        response.set_cookie(
            key=settings.SIMPLE_JWT['AUTH_COOKIE_REFRESH'],
            value=refresh_token,
            httponly=settings.SIMPLE_JWT['AUTH_COOKIE_HTTP_ONLY'],
            secure=settings.SIMPLE_JWT['AUTH_COOKIE_SECURE'],
            samesite=settings.SIMPLE_JWT['AUTH_COOKIE_SAMESITE'],
            max_age=settings.SIMPLE_JWT['AUTH_COOKIE_REFRESH_MAX_AGE'],
            path='/',
        )
        return response
# ======= Fin CustomTokenObtainPairView =======

# ======= CustomTokenRefreshView : Rafraîchissement JWT =======
class CustomTokenRefreshView(TokenRefreshView):
    permission_classes = [permissions.AllowAny]

    def post(self, request, *args, **kwargs):
        refresh_token = request.COOKIES.get(settings.SIMPLE_JWT['AUTH_COOKIE_REFRESH'])
        if not refresh_token:
            return Response({'error': 'Refresh token manquant'}, status=status.HTTP_400_BAD_REQUEST)

        serializer = self.get_serializer(data={'refresh': refresh_token})
        serializer.is_valid(raise_exception=True)

        response = Response({'access': serializer.validated_data['access']})
        response.set_cookie(
            key=settings.SIMPLE_JWT['AUTH_COOKIE_REFRESH'],
            value=serializer.validated_data['refresh'],
            httponly=settings.SIMPLE_JWT['AUTH_COOKIE_HTTP_ONLY'],
            secure=settings.SIMPLE_JWT['AUTH_COOKIE_SECURE'],
            samesite=settings.SIMPLE_JWT['AUTH_COOKIE_SAMESITE'],
            max_age=settings.SIMPLE_JWT['AUTH_COOKIE_REFRESH_MAX_AGE'],
            path='/',
        )
        return response
# ======= Fin CustomTokenRefreshView =======

# ======= CustomTokenVerifyView : Vérification JWT =======
class CustomTokenVerifyView(TokenVerifyView):
    permission_classes = [permissions.AllowAny]

    def post(self, request, *args, **kwargs):
        access_token = request.data.get('access')
        if not access_token:
            return Response({"detail": "Token manquant"}, status=status.HTTP_400_BAD_REQUEST)

        try:
            AccessToken(access_token)
            return Response({"valid": True}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"detail": f"Token invalide : {str(e)}"}, status=status.HTTP_401_UNAUTHORIZED)
# ======= Fin CustomTokenVerifyView =======

# ======= logout_view : Déconnexion =======
@api_view(['POST'])
@permission_classes([permissions.AllowAny])
def logout_view(request):
    response = Response({'message': 'Déconnexion réussie'}, status=status.HTTP_200_OK)
    response.delete_cookie(settings.SIMPLE_JWT['AUTH_COOKIE'], path='/')
    response.delete_cookie(settings.SIMPLE_JWT['AUTH_COOKIE_REFRESH'], path='/')
    return response
# ======= Fin logout_view =======

# ======= register_user : Inscription =======
@api_view(['POST'])
@permission_classes([permissions.AllowAny])
def register_user(request):
    serializer = CustomUserCreateSerializer(data=request.data)
    if serializer.is_valid():
        user = serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
# ======= Fin register_user =======

# ======= activate_user : Activation du compte =======
@api_view(['GET'])
@permission_classes([permissions.AllowAny])
def activate_user(request, token):
    serializer = ActivationTokenSerializer(data={'token': token})
    if serializer.is_valid():
        activation_token = ActivationToken.objects.get(token=token)
        user = activation_token.user
        user.is_active = True
        user.save()
        activation_token.delete()
        return Response({'message': 'Compte activé avec succès'}, status=status.HTTP_200_OK)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
# ======= Fin activate_user =======

# ======= resend_activation : Renvoi d’activation =======
@api_view(['POST'])
@permission_classes([permissions.AllowAny])
def resend_activation(request):
    serializer = ResendActivationSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response({'message': 'Email d’activation renvoyé'}, status=status.HTTP_200_OK)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
# ======= Fin resend_activation =======

# ======= password_reset_request : Demande de réinitialisation =======
@api_view(['POST'])
@permission_classes([permissions.AllowAny])
def password_reset_request(request):
    serializer = PasswordResetRequestSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response({'message': 'Email de réinitialisation envoyé'}, status=status.HTTP_200_OK)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
# ======= Fin password_reset_request =======

# ======= password_reset_confirm : Confirmation de réinitialisation =======
@api_view(['POST'])
@permission_classes([permissions.AllowAny])
def password_reset_confirm(request):
    token = request.data.get('token')
    new_password = request.data.get('new_password')
    confirm_password = request.data.get('confirm_password')

    if not all([token, new_password, confirm_password]):
        return Response({'error': 'Tous les champs sont requis'}, status=status.HTTP_400_BAD_REQUEST)

    if new_password != confirm_password:
        return Response({'error': 'Les mots de passe ne correspondent pas'}, status=status.HTTP_400_BAD_REQUEST)

    try:
        reset_token = PasswordResetToken.objects.get(token=token)
        if reset_token.is_expired():
            reset_token.delete()
            return Response({'error': 'Token expiré'}, status=status.HTTP_400_BAD_REQUEST)

        user = reset_token.user
        user.set_password(new_password)
        user.save()
        reset_token.delete()
        return Response({'message': 'Mot de passe réinitialisé avec succès'}, status=status.HTTP_200_OK)
    except PasswordResetToken.DoesNotExist:
        return Response({'error': 'Token invalide'}, status=status.HTTP_400_BAD_REQUEST)
# ======= Fin password_reset_confirm =======

# ======= check_user : Vérification d’existence utilisateur =======
@api_view(['POST'])
@permission_classes([permissions.AllowAny])
def check_user(request):
    email = request.data.get('email')
    password = request.data.get('password')
    if not all([email, password]):
        return Response({'error': 'Email et mot de passe requis'}, status=status.HTTP_400_BAD_REQUEST)

    try:
        user = CustomUser.objects.get(email=email)
        if user.check_password(password):
            return Response({
                'exists': True,
                'is_active': user.is_active,
                'is_2fa_enabled': user.is_2fa_enabled
            }, status=status.HTTP_200_OK)
        else:
            return Response({'error': 'Mot de passe incorrect'}, status=status.HTTP_401_UNAUTHORIZED)
    except CustomUser.DoesNotExist:
        return Response({'exists': False}, status=status.HTTP_200_OK)
# ======= Fin check_user =======

# ======= generate_2fa_token : Génération 2FA =======
@api_view(['POST'])
@permission_classes([permissions.AllowAny])
def generate_2fa_token(request):
    email = request.data.get('email')
    if not email:
        return Response({'error': 'Email requis'}, status=status.HTTP_400_BAD_REQUEST)

    try:
        user = CustomUser.objects.get(email=email)
        if not user.is_active:
            return Response({'error': 'Compte non activé'}, status=status.HTTP_400_BAD_REQUEST)

        TwoFAToken.objects.filter(user=user).delete()
        token = TwoFAToken(user=user)
        token.save()

        subject = 'Code 2FA - BOOLi-STORE'
        message = (
            f"Bonjour,\n\nVotre code 2FA est : {token.code}\n\n"
            f"Ce code expire dans 24 heures.\n\nCordialement,\nL’équipe BOOLi-STORE"
        )
        send_mail(subject, message, settings.DEFAULT_FROM_EMAIL, [email], fail_silently=False)
        return Response({'message': 'Code 2FA envoyé', 'expires_at': token.expires_at.isoformat()}, status=status.HTTP_200_OK)
    except CustomUser.DoesNotExist:
        return Response({'error': 'Utilisateur non trouvé'}, status=status.HTTP_404_NOT_FOUND)
# ======= Fin generate_2fa_token =======
# ======= verify_2fa : Vérification 2FA =======
@api_view(['POST'])
@permission_classes([permissions.AllowAny])
def verify_2fa(request):
    email = request.data.get('email')
    code = request.data.get('code')
    password = request.data.get('password')
    if not all([email, code, password]):
        return Response({'error': 'Email, code et mot de passe requis'}, status=status.HTTP_400_BAD_REQUEST)

    try:
        user = CustomUser.objects.get(email=email)
        two_fa_token = TwoFAToken.objects.filter(user=user).order_by('-created_at').first()
        if not two_fa_token or two_fa_token.is_expired() or two_fa_token.code != code:
            return Response({'error': 'Code 2FA invalide ou expiré'}, status=status.HTTP_400_BAD_REQUEST)

        # Correction : Utilisation de BACKEND_URL pour pointer vers l’API
        token_url = f"{settings.BACKEND_URL}/auth/jwt/create/"
        token_response = requests.post(token_url, json={'email': email, 'password': password})
        if token_response.status_code == 200:
            two_fa_token.delete()
            return Response(token_response.json(), status=status.HTTP_200_OK)
        else:
            return Response({'error': 'Erreur lors de la génération des tokens'}, status=status.HTTP_400_BAD_REQUEST)
    except CustomUser.DoesNotExist:
        return Response({'error': 'Utilisateur non trouvé'}, status=status.HTTP_404_NOT_FOUND)
# ======= Fin verify_2fa =======