from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from .models import CustomUser, PasswordResetToken, ActivationToken, TwoFAToken

# ======= CustomUserAdmin : Gestion des utilisateurs =======
class CustomUserAdmin(BaseUserAdmin):
    """Interface admin pour gérer les utilisateurs CustomUser."""
    model = CustomUser

    # Champs affichés dans la liste
    list_display = ('email', 'first_name', 'last_name', 'is_active', 'is_staff', 'is_2fa_enabled', 'date_joined')
    list_filter = ('is_active', 'is_staff', 'is_2fa_enabled', 'gender')
    search_fields = ('email', 'first_name', 'last_name', 'country', 'city')
    ordering = ('-date_joined',)

    # Champs dans le formulaire d'édition
    fieldsets = (
        (None, {'fields': ('email', 'password')}),
        ('Informations personnelles', {
            'fields': ('first_name', 'last_name', 'contact', 'country', 'city', 'birth_date', 'profession', 'gender')
        }),
        ('Permissions', {'fields': ('is_active', 'is_staff', 'is_superuser', 'groups', 'user_permissions')}),
        ('Sécurité', {'fields': ('is_2fa_enabled',)}),
        ('Dates', {'fields': ('date_joined',)}),
    )

    # Champs pour ajouter un nouvel utilisateur
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('email', 'password1', 'password2', 'first_name', 'last_name', 'country', 'city', 'birth_date'),
        }),
    )

    # Désactive la modification directe de date_joined
    readonly_fields = ('date_joined',)
# ======= Fin CustomUserAdmin =======

# ======= PasswordResetTokenAdmin : Gestion des tokens de réinitialisation =======
class PasswordResetTokenAdmin(admin.ModelAdmin):
    """Interface admin pour les tokens de réinitialisation de mot de passe."""
    list_display = ('user', 'token', 'created_at', 'expires_at', 'is_expired')
    list_filter = ('created_at', 'expires_at')
    search_fields = ('user__email', 'token')
    readonly_fields = ('created_at', 'expires_at')

    def is_expired(self, obj):
        return obj.is_expired()
    is_expired.boolean = True
    is_expired.short_description = "Expiré ?"
# ======= Fin PasswordResetTokenAdmin =======

# ======= ActivationTokenAdmin : Gestion des tokens d’activation =======
class ActivationTokenAdmin(admin.ModelAdmin):
    """Interface admin pour les tokens d’activation."""
    list_display = ('user', 'token', 'created_at', 'expires_at', 'is_expired')
    list_filter = ('created_at', 'expires_at')
    search_fields = ('user__email', 'token')
    readonly_fields = ('created_at', 'expires_at')

    def is_expired(self, obj):
        return obj.is_expired()
    is_expired.boolean = True
    is_expired.short_description = "Expiré ?"
# ======= Fin ActivationTokenAdmin =======

# ======= TwoFATokenAdmin : Gestion des tokens 2FA =======
class TwoFATokenAdmin(admin.ModelAdmin):
    """Interface admin pour les tokens 2FA."""
    list_display = ('user', 'code', 'created_at', 'expires_at', 'is_expired')
    list_filter = ('created_at', 'expires_at')
    search_fields = ('user__email', 'code')
    readonly_fields = ('created_at', 'expires_at', 'code')

    def is_expired(self, obj):
        return obj.is_expired()
    is_expired.boolean = True
    is_expired.short_description = "Expiré ?"
# ======= Fin TwoFATokenAdmin =======

# Enregistrement des modèles dans l’admin
admin.site.register(CustomUser, CustomUserAdmin)
admin.site.register(PasswordResetToken, PasswordResetTokenAdmin)
admin.site.register(ActivationToken, ActivationTokenAdmin)
admin.site.register(TwoFAToken, TwoFATokenAdmin)