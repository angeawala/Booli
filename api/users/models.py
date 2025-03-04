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
# ======= Fin CustomUserManager =======

# ======= CustomUser : Modèle utilisateur personnalisé =======
class CustomUser(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(unique=True, verbose_name="Adresse email")
    contact = models.CharField(max_length=15, null=True, blank=True, verbose_name="Numéro de contact")
    first_name = models.CharField(max_length=50, verbose_name="Prénom")
    last_name = models.CharField(max_length=50, verbose_name="Nom de famille")
    country = models.CharField(max_length=100, verbose_name="Pays")
    city = models.CharField(max_length=100, verbose_name="Ville")
    birth_date = models.DateField(verbose_name="Date de naissance")
    profession = models.CharField(
        max_length=100,
        null=True, blank=True,
        verbose_name="Profession",
        help_text="Optionnel, indiquez votre métier si vous le souhaitez."
    )
    gender = models.CharField(
        max_length=10,
        choices=[('male', 'Masculin'), ('female', 'Féminin'), ('other', 'Autre')],
        verbose_name="Genre"
    )
    is_active = models.BooleanField(default=False, verbose_name="Compte actif")
    date_joined = models.DateTimeField(auto_now_add=True, verbose_name="Date d’inscription")
    is_staff = models.BooleanField(default=False, verbose_name="Membre du staff")
    is_2fa_enabled = models.BooleanField(default=False, verbose_name="2FA activé")

    objects = CustomUserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['first_name', 'last_name', 'country', 'city', 'birth_date']

    def __str__(self):
        return self.email
# ======= Fin CustomUser =======

# ======= Fonction utilitaire pour expiration =======
def get_default_expiry():
    return timezone.now() + timezone.timedelta(hours=24)
# ======= Fin utilitaire =======

# ======= PasswordResetToken : Jeton de réinitialisation =======
class PasswordResetToken(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE, verbose_name="Utilisateur")
    token = models.UUIDField(default=uuid.uuid4, editable=False, unique=True, verbose_name="Jeton")
    created_at = models.DateTimeField(auto_now_add=True, verbose_name="Créé le")
    expires_at = models.DateTimeField(default=get_default_expiry, verbose_name="Expire le")

    def is_expired(self):
        return timezone.now() > self.expires_at
# ======= Fin PasswordResetToken =======

# ======= ActivationToken : Jeton d’activation =======
class ActivationToken(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE, verbose_name="Utilisateur")
    token = models.UUIDField(default=uuid.uuid4, editable=False, unique=True, verbose_name="Jeton")
    created_at = models.DateTimeField(auto_now_add=True, verbose_name="Créé le")
    expires_at = models.DateTimeField(default=get_default_expiry, verbose_name="Expire le")

    def is_expired(self):
        return timezone.now() > self.expires_at
# ======= Fin ActivationToken =======

# ======= TwoFAToken : Jeton 2FA =======
class TwoFAToken(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE, verbose_name="Utilisateur")
    code = models.CharField(max_length=6, unique=True, verbose_name="Code 2FA")
    created_at = models.DateTimeField(auto_now_add=True, verbose_name="Créé le")
    expires_at = models.DateTimeField(default=get_default_expiry, verbose_name="Expire le")

    def generate_code(self):
        """Génère un code 2FA aléatoire de 6 chiffres."""
        return ''.join(random.choices(string.digits, k=6))

    def save(self, *args, **kwargs):
        """Assure un code unique lors de la création."""
        if not self.code:
            self.code = self.generate_code()
            while TwoFAToken.objects.filter(code=self.code).exists():
                self.code = self.generate_code()
        super().save(*args, **kwargs)

    def is_expired(self):
        return timezone.now() > self.expires_at

    def __str__(self):
        return f"{self.user.email} - {self.code}"
# ======= Fin TwoFAToken =======