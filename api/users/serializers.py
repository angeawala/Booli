from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework import serializers
from django.core.mail import send_mail
from django.conf import settings
from .models import CustomUser, ActivationToken, PasswordResetToken

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

# ======= CustomUserCreateSerializer : Inscription =======
class CustomUserCreateSerializer(serializers.ModelSerializer):
    """Serializer pour créer un utilisateur (auth/register) avec email d’activation."""
    class Meta:
        model = CustomUser
        fields = (
            'email', 'contact', 'password', 'first_name', 'last_name',
            'country', 'city', 'birth_date', 'profession', 'gender'
        )
        extra_kwargs = {
            'password': {'write_only': True, 'verbose_name': 'Mot de passe'},
            'contact': {'required': False, 'verbose_name': 'Contact'},
            'first_name': {'required': False, 'verbose_name': 'Prénom'},
            'last_name': {'required': False, 'verbose_name': 'Nom'},
            'country': {'required': False, 'verbose_name': 'Pays'},
            'city': {'required': False, 'verbose_name': 'Ville'},
            'birth_date': {'required': False, 'verbose_name': 'Date de naissance'},
            'profession': {'required': False, 'verbose_name': 'Profession'},
            'gender': {'required': False, 'verbose_name': 'Genre'},
        }

    def create(self, validated_data):
        """Crée un utilisateur inactif et envoie un email d’activation."""
        password = validated_data.pop('password')
        user = CustomUser(**validated_data)
        user.set_password(password)
        user.is_active = False  # Nécessite activation
        user.save()

        # Token d’activation
        token = ActivationToken(user=user)
        token.save()

        # Email d’activation
        activation_url = (
            f"{settings.FRONTEND_URL}/auth/activate?token={token.token}"
            if not settings.DEVELOPPEMENT
            else f"http://127.0.0.1:3000/auth/activate?token={token.token}"
        )
        subject = 'Activation de compte - BOOLi-STORE'
        message = (
            f"Bonjour,\n\nCliquez sur ce lien pour activer votre compte : {activation_url}\n\n"
            f"Le lien expire dans 24 heures.\n\nCordialement,\nL’équipe BOOLi-STORE"
        )
        send_mail(subject, message, settings.DEFAULT_FROM_EMAIL, [user.email], fail_silently=False)

        return user
# ======= Fin CustomUserCreateSerializer =======

# ======= CustomUserSerializer : Affichage des données utilisateur =======
class CustomUserSerializer(serializers.ModelSerializer):
    """Serializer pour exposer les infos utilisateur."""
    class Meta:
        model = CustomUser
        fields = (
            'email', 'contact', 'first_name', 'last_name', 'country', 'city',
            'birth_date', 'profession', 'gender', 'is_active', 'date_joined'
        )
# ======= Fin CustomUserSerializer =======

# ======= ActivationTokenSerializer : Validation d’activation =======
class ActivationTokenSerializer(serializers.ModelSerializer):
    """Serializer pour valider un token d’activation (auth/activate)."""
    token = serializers.UUIDField()

    class Meta:
        model = ActivationToken
        fields = ('token',)

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
        # Supprime les anciens tokens
        ActivationToken.objects.filter(user=user).delete()
        # Crée un nouveau token
        token = ActivationToken(user=user)
        token.save()

        # Envoi de l’email
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
        # Supprime les anciens tokens
        PasswordResetToken.objects.filter(user=user).delete()
        # Crée un nouveau token
        token = PasswordResetToken(user=user)
        token.save()

        # Envoi de l’email
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

# ======= PasswordResetSerializer : Réinitialisation du mot de passe =======
class PasswordResetSerializer(serializers.Serializer):
    """Serializer pour réinitialiser le mot de passe (auth/password/reset)."""
    token = serializers.UUIDField()
    password = serializers.CharField(write_only=True, min_length=8)

    def validate(self, attrs):
        token = attrs.get('token')
        try:
            reset_token = PasswordResetToken.objects.get(token=token)
            if reset_token.is_expired():
                raise serializers.ValidationError("Ce token de réinitialisation a expiré.")
        except PasswordResetToken.DoesNotExist:
            raise serializers.ValidationError("Token invalide.")
        attrs['user'] = reset_token.user
        return attrs

    def save(self):
        user = self.validated_data['user']
        password = self.validated_data['password']
        user.set_password(password)
        user.save()
        # Supprime le token utilisé
        PasswordResetToken.objects.filter(user=user).delete()
# ======= Fin PasswordResetSerializer =======