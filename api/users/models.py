# users/models.py
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from django.db import models
from django.utils import timezone
import uuid
import random
import string

# ======= CustomUserManager : Gestion des utilisateurs =======
class CustomUserManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError("L'email est requis.")
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        extra_fields.setdefault('is_active', True)
        if extra_fields.get('is_staff') is not True:
            raise ValueError('Un superutilisateur doit avoir is_staff=True.')
        if extra_fields.get('is_superuser') is not True:
            raise ValueError('Un superutilisateur doit avoir is_superuser=True.')
        return self.create_user(email, password, **extra_fields)

# ======= CustomUser : Modèle utilisateur personnalisé =======
class CustomUser(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(unique=True, verbose_name="Adresse email")
    contact = models.CharField(max_length=15, null=True, blank=True, verbose_name="Numéro de contact")
    first_name = models.CharField(max_length=50, null=True, blank=True, verbose_name="Prénom")
    last_name = models.CharField(max_length=50, null=True, blank=True, verbose_name="Nom de famille")
    country = models.CharField(max_length=100, null=True, blank=True, verbose_name="Pays")
    city = models.CharField(max_length=100, null=True, blank=True, verbose_name="Ville")
    birth_date = models.DateField(null=True, blank=True, verbose_name="Date de naissance")
    profession = models.CharField(
        max_length=100,
        null=True, blank=True,
        verbose_name="Profession",
        help_text="Optionnel, indiquez votre métier si vous le souhaitez."
    )
    gender = models.CharField(
        max_length=10,
        choices=[('male', 'Masculin'), ('female', 'Féminin'), ('other', 'Autre')],
        null=True, blank=True,
        verbose_name="Genre"
    )
    is_active = models.BooleanField(default=False, verbose_name="Compte actif")
    date_joined = models.DateTimeField(auto_now_add=True, verbose_name="Date d’inscription")
    is_staff = models.BooleanField(default=False, verbose_name="Membre du staff")
    is_2fa_enabled = models.BooleanField(default=False, verbose_name="2FA activé")
    # Champs supplémentaires
    avatar = models.ImageField(upload_to='avatars/', null=True, blank=True, default=None, verbose_name="Avatar")
    address_line = models.CharField(max_length=255, null=True, blank=True, default=None, verbose_name="Adresse")
    postal_code = models.CharField(max_length=20, null=True, blank=True, default=None, verbose_name="Code postal")
    # Rôles
    roles = models.JSONField(default=list, verbose_name="Rôles")  # Ex. ["client", "shop_owner"]

    objects = CustomUserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['first_name', 'last_name', 'country', 'city', 'birth_date']

    def __str__(self):
        return self.email

# ======= Fonction utilitaire pour expiration =======
def get_default_expiry():
    return timezone.now() + timezone.timedelta(minutes=10)  # 10 minutes pour 2FA

# ======= PasswordResetToken : Jeton de réinitialisation =======
class PasswordResetToken(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE, verbose_name="Utilisateur")
    token = models.UUIDField(default=uuid.uuid4, editable=False, unique=True, verbose_name="Jeton")
    created_at = models.DateTimeField(auto_now_add=True, verbose_name="Créé le")
    expires_at = models.DateTimeField(default=get_default_expiry, verbose_name="Expire le")

    def is_expired(self):
        return timezone.now() > self.expires_at

# ======= ActivationToken : Jeton d’activation =======
class ActivationToken(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE, verbose_name="Utilisateur")
    token = models.UUIDField(default=uuid.uuid4, editable=False, unique=True, verbose_name="Jeton")
    created_at = models.DateTimeField(auto_now_add=True, verbose_name="Créé le")
    expires_at = models.DateTimeField(default=get_default_expiry, verbose_name="Expire le")

    def is_expired(self):
        return timezone.now() > self.expires_at

# ======= TwoFAToken : Jeton 2FA =======
class TwoFAToken(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE, verbose_name="Utilisateur")
    code = models.CharField(max_length=6, unique=True, verbose_name="Code 2FA")
    created_at = models.DateTimeField(auto_now_add=True, verbose_name="Créé le")
    expires_at = models.DateTimeField(default=get_default_expiry, verbose_name="Expire le")

    def generate_code(self):
        return ''.join(random.choices(string.digits, k=6))

    def save(self, *args, **kwargs):
        if not self.code:
            self.code = self.generate_code()
            while TwoFAToken.objects.filter(code=self.code).exists():
                self.code = self.generate_code()
        super().save(*args, **kwargs)

    def is_expired(self):
        return timezone.now() > self.expires_at

    def __str__(self):
        return f"{self.user.email} - {self.code}"