# users/views.py
from django.core.mail import send_mail
from django.conf import settings
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView, TokenVerifyView
from rest_framework_simplejwt.tokens import AccessToken
from rest_framework import generics, status
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
import requests
from .models import CustomUser, PasswordResetToken, ActivationToken, TwoFAToken
from .serializers import (
    CustomTokenObtainPairSerializer, CustomUserCreateSerializer, ActivationTokenSerializer,
    ResendActivationSerializer, PasswordResetRequestSerializer, PasswordResetConfirmSerializer,
    CheckUserSerializer, Generate2FASerializer, Verify2FASerializer, LogoutSerializer,
    UserProfileSerializer, UpdateProfileSerializer, DeleteAccountSerializer
)

class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data, context={'response': Response()})
        serializer.is_valid(raise_exception=True)
        access_token = serializer.validated_data['access']
        refresh_token = serializer.validated_data['refresh']
        
        if settings.DEVELOPPEMENT:
            response = Response({'access': access_token, 'refresh': refresh_token})
        else:
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

class CustomTokenRefreshView(TokenRefreshView):
    permission_classes = [AllowAny]

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

class CustomTokenVerifyView(TokenVerifyView):
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        access_token = request.data.get('access')
        if not access_token:
            return Response({"detail": "Token manquant"}, status=status.HTTP_400_BAD_REQUEST)
        try:
            AccessToken(access_token)
            return Response({"valid": True}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"detail": f"Token invalide : {str(e)}"}, status=status.HTTP_401_UNAUTHORIZED)

class LogoutView(generics.GenericAPIView):
    serializer_class = LogoutSerializer
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        response = Response({'message': 'Déconnexion réussie'}, status=status.HTTP_200_OK)
        response.delete_cookie(settings.SIMPLE_JWT['AUTH_COOKIE_REFRESH'], path='/')
        return response

class RegisterUserView(generics.CreateAPIView):
    serializer_class = CustomUserCreateSerializer
    permission_classes = [AllowAny]

    def perform_create(self, serializer):
        serializer.save()

class ActivateAccountView(generics.GenericAPIView):
    serializer_class = ActivationTokenSerializer
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            token = serializer.validated_data['token']
            try:
                activation_token = ActivationToken.objects.get(token=token)
                if activation_token.is_expired():
                    return Response({'error': 'Token expiré'}, status=status.HTTP_400_BAD_REQUEST)
                user = activation_token.user
                user.is_active = True
                user.save()
                activation_token.delete()
                return Response({'message': 'Compte activé avec succès'}, status=status.HTTP_200_OK)
            except ActivationToken.DoesNotExist:
                return Response({'error': 'Token invalide'}, status=status.HTTP_400_BAD_REQUEST)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class ResendActivationView(generics.GenericAPIView):
    serializer_class = ResendActivationSerializer
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({'message': 'Email d’activation renvoyé'}, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class PasswordResetRequestView(generics.GenericAPIView):
    serializer_class = PasswordResetRequestSerializer
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({'message': 'Email de réinitialisation envoyé'}, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class PasswordResetConfirmView(generics.GenericAPIView):
    serializer_class = PasswordResetConfirmSerializer
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            token = serializer.validated_data['token']
            new_password = serializer.validated_data['new_password']
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
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class CheckUserView(generics.GenericAPIView):
    serializer_class = CheckUserSerializer
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            email = serializer.validated_data['email']
            password = serializer.validated_data['password']
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
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class Generate2FATokenView(generics.GenericAPIView):
    serializer_class = Generate2FASerializer
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            email = serializer.validated_data['email']
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
                    f"Ce code expire dans 10 minutes.\n\nCordialement,\nL’équipe BOOLi-STORE"
                )
                send_mail(subject, message, settings.DEFAULT_FROM_EMAIL, [email], fail_silently=False)
                return Response({'message': 'Code 2FA envoyé', 'expires_at': token.expires_at.isoformat()}, status=status.HTTP_200_OK)
            except CustomUser.DoesNotExist:
                return Response({'error': 'Utilisateur non trouvé'}, status=status.HTTP_404_NOT_FOUND)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class Verify2FAView(generics.GenericAPIView):
    serializer_class = Verify2FASerializer
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            email = serializer.validated_data['email']
            code = serializer.validated_data['code']
            password = serializer.validated_data['password']
            try:
                user = CustomUser.objects.get(email=email)
                two_fa_token = TwoFAToken.objects.filter(user=user).order_by('-created_at').first()
                if not two_fa_token or two_fa_token.is_expired() or two_fa_token.code != code:
                    return Response({'error': 'Code 2FA invalide ou expiré'}, status=status.HTTP_400_BAD_REQUEST)
                token_url = f"{settings.BACKEND_URL}/auth/jwt/create/"
                token_response = requests.post(token_url, json={'email': email, 'password': password})
                if token_response.status_code == 200:
                    two_fa_token.delete()
                    return Response(token_response.json(), status=status.HTTP_200_OK)
                else:
                    return Response({'error': 'Erreur lors de la génération des tokens'}, status=status.HTTP_400_BAD_REQUEST)
            except CustomUser.DoesNotExist:
                return Response({'error': 'Utilisateur non trouvé'}, status=status.HTTP_404_NOT_FOUND)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class UserProfileView(generics.RetrieveAPIView):
    serializer_class = UserProfileSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        return self.request.user

class UpdateProfileView(generics.UpdateAPIView):
    serializer_class = UpdateProfileSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        return self.request.user

    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        return Response(serializer.data, status=status.HTTP_200_OK)

class DeleteAccountView(generics.DestroyAPIView):
    serializer_class = DeleteAccountSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        return self.request.user

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        instance.delete()
        return Response({'message': 'Compte supprimé avec succès'}, status=status.HTTP_204_NO_CONTENT)