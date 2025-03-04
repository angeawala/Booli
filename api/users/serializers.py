from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework import serializers
from django.core.mail import send_mail
from django.conf import settings
from .models import CustomUser, ActivationToken, PasswordResetToken

# ======= CustomUserCreateSerializer : Inscription =======
class CustomUserCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = (
            'email', 'contact', 'password', 'first_name', 'last_name',
            'country', 'city', 'birth_date', 'profession', 'gender'
        )
        extra_kwargs = {
            'password': {'write_only': True},
            'contact': {'required': False},
            'first_name': {'required': False},
            'last_name': {'required': False},
            'country': {'required': False},
            'city': {'required': False},
            'birth_date': {'required': False},
            'profession': {'required': False},
            'gender': {'required': False},
        }

    def create(self, validated_data):
        password = validated_data.pop('password')
        user = CustomUser(**validated_data)
        user.set_password(password)
        user.is_active = False
        user.save()

        token = ActivationToken(user=user)
        token.save()

        activation_url = f"{settings.FRONTEND_URL}/auth/activate?token={token.token}"
        subject = 'Activation de compte - BOOLi-STORE'
        message = (
            f"Bonjour,\n\nCliquez sur ce lien pour activer votre compte : {activation_url}\n\n"
            f"Le lien expire dans 24 heures.\n\nCordialement,\nL’équipe BOOLi-STORE"
        )
        send_mail(subject, message, settings.DEFAULT_FROM_EMAIL, [user.email], fail_silently=False)

        return user

# ======= Fin CustomUserCreateSerializer =======
class ResendActivationSerializer(serializers.Serializer):
    email = serializers.EmailField()

    def validate(self, attrs):
        email = attrs.get('email')
        try:
            user = CustomUser.objects.get(email=email)
            if user.is_active:
                raise serializers.ValidationError("Ce compte est déjà activé.")
        except CustomUser.DoesNotExist:
            raise serializers.ValidationError("Aucun utilisateur avec cet email.")
        attrs['user'] = user
        return attrs

    def save(self):
        user = self.validated_data['user']
        ActivationToken.objects.filter(user=user).delete()
        token = ActivationToken(user=user)
        token.save()

        activation_url = f"{settings.FRONTEND_URL}/auth/activate?token={token.token}"
        subject = 'Nouvelle demande d’activation - BOOLi-STORE'
        message = (
            f"Bonjour,\n\nVoici un nouveau lien pour activer votre compte : {activation_url}\n\n"
            f"Le lien expire dans 24 heures.\n\nCordialement,\nL’équipe BOOLi-STORE"
        )
        send_mail(subject, message, settings.DEFAULT_FROM_EMAIL, [user.email], fail_silently=False)

# ======= CustomTokenObtainPairSerializer : Tokens pour login =======
class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    """Personnalise les tokens JWT pour la connexion (auth/login)."""
    def validate(self, attrs):
        data = super().validate(attrs)
        refresh = self.get_token(self.user)
        data['refresh'] = str(refresh)
        data['access'] = str(refresh.access_token)
        return data

# ======= Fin CustomTokenObtainPairSerializer =======




# ======= CustomUserSerializer : Affichage des données utilisateur =======
class CustomUserSerializer(serializers.ModelSerializer):
    """Serializer pour exposer les informations de l’utilisateur."""
    class Meta:
        model = CustomUser
        fields = (
            'email', 'contact', 'first_name', 'last_name', 'country', 'city',
            'birth_date', 'profession', 'gender', 'is_active', 'date_joined'
        )
# ======= Fin CustomUserSerializer =======

# ======= ActivationTokenSerializer : Validation d’activation =======
class ActivationTokenSerializer(serializers.Serializer):
    """Serializer pour valider un token d’activation (auth/activate)."""
    token = serializers.UUIDField()

    def validate(self, attrs):
        token = attrs.get('token')
        try:
            activation_token = ActivationToken.objects.get(token=token)
            if activation_token.is_expired():
                raise serializers.ValidationError("Ce token d’activation a expiré.")
        except ActivationToken.DoesNotExist:
            raise serializers.ValidationError("Token invalide.")
        return attrs
# ======= Fin ActivationTokenSerializer =======

# ======= ResendActivationSerializer : Demande de renvoi d’activation =======
class ResendActivationSerializer(serializers.Serializer):
    """Serializer pour renvoyer un email d’activation (auth/activate/resend)."""
    email = serializers.EmailField()

    def validate(self, attrs):
        email = attrs.get('email')
        try:
            user = CustomUser.objects.get(email=email)
            if user.is_active:
                raise serializers.ValidationError("Ce compte est déjà activé.")
        except CustomUser.DoesNotExist:
            raise serializers.ValidationError("Aucun utilisateur avec cet email.")
        attrs['user'] = user
        return attrs

    def save(self):
        user = self.validated_data['user']
        ActivationToken.objects.filter(user=user).delete()
        token = ActivationToken(user=user)
        token.save()

        activation_url = (
            f"{settings.FRONTEND_URL}/auth/activate?token={token.token}"
            if not settings.DEVELOPPEMENT
            else f"http://127.0.0.1:3000/auth/activate?token={token.token}"
        )
        subject = 'Nouvelle demande d’activation - BOOLi-STORE'
        message = (
            f"Bonjour,\n\nVoici un nouveau lien pour activer votre compte : {activation_url}\n\n"
            f"Le lien expire dans 24 heures.\n\nCordialement,\nL’équipe BOOLi-STORE"
        )
        send_mail(subject, message, settings.DEFAULT_FROM_EMAIL, [user.email], fail_silently=False)
# ======= Fin ResendActivationSerializer =======

# ======= PasswordResetRequestSerializer : Demande de réinitialisation =======
class PasswordResetRequestSerializer(serializers.Serializer):
    """Serializer pour demander un email de réinitialisation (auth/password/reset/request)."""
    email = serializers.EmailField()

    def validate(self, attrs):
        email = attrs.get('email')
        try:
            user = CustomUser.objects.get(email=email)
        except CustomUser.DoesNotExist:
            raise serializers.ValidationError("Aucun utilisateur avec cet email.")
        attrs['user'] = user
        return attrs

    def save(self):
        user = self.validated_data['user']
        PasswordResetToken.objects.filter(user=user).delete()
        token = PasswordResetToken(user=user)
        token.save()

        reset_url = (
            f"{settings.FRONTEND_URL}/auth/password/reset?token={token.token}"
            if not settings.DEVELOPPEMENT
            else f"http://127.0.0.1:3000/auth/password/reset?token={token.token}"
        )
        subject = 'Réinitialisation de mot de passe - BOOLi-STORE'
        message = (
            f"Bonjour,\n\nCliquez sur ce lien pour réinitialiser votre mot de passe : {reset_url}\n\n"
            f"Le lien expire dans 24 heures.\n\nCordialement,\nL’équipe BOOLi-STORE"
        )
        send_mail(subject, message, settings.DEFAULT_FROM_EMAIL, [user.email], fail_silently=False)
# ======= Fin PasswordResetRequestSerializer =======

# ======= PasswordResetConfirmSerializer : Confirmation de réinitialisation =======
class PasswordResetConfirmSerializer(serializers.Serializer):
    """Serializer pour réinitialiser le mot de passe (auth/password/reset)."""
    token = serializers.UUIDField()
    new_password = serializers.CharField(write_only=True, min_length=8)
    confirm_password = serializers.CharField(write_only=True)

    def validate(self, attrs):
        new_password = attrs.get('new_password')
        confirm_password = attrs.get('confirm_password')
        if new_password != confirm_password:
            raise serializers.ValidationError("Les mots de passe ne correspondent pas.")
        return attrs
# ======= Fin PasswordResetConfirmSerializer =======

# ======= CheckUserSerializer : Vérification d’utilisateur =======
class CheckUserSerializer(serializers.Serializer):
    """Serializer pour vérifier l’existence d’un utilisateur (auth/check-user)."""
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)
# ======= Fin CheckUserSerializer =======

# ======= Generate2FASerializer : Génération de token 2FA =======
class Generate2FASerializer(serializers.Serializer):
    """Serializer pour générer un code 2FA (auth/generate-2fa-token)."""
    email = serializers.EmailField()
# ======= Fin Generate2FASerializer =======

# ======= Verify2FASerializer : Vérification de 2FA =======
class Verify2FASerializer(serializers.Serializer):
    """Serializer pour vérifier un code 2FA (auth/verify-2fa)."""
    email = serializers.EmailField()
    code = serializers.CharField(max_length=6)
    password = serializers.CharField(write_only=True)
# ======= Fin Verify2FASerializer =======

# ======= LogoutSerializer : Déconnexion =======
class LogoutSerializer(serializers.Serializer):
    """Serializer vide pour la déconnexion (auth/logout)."""
    pass
# ======= Fin LogoutSerializer =======