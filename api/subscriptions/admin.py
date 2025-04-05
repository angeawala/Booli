# subscriptions/admin.py

from django.contrib import admin
from .models import Plan, Subscription

from django.contrib import admin
from django.utils.translation import gettext_lazy as _

class DeviseFilter(admin.SimpleListFilter):
    title = _('Devise')  # Titre du filtre dans l'interface
    parameter_name = 'devise'

    def lookups(self, request, model_admin):
        # Récupérer toutes les devises distinctes présentes dans les données des plans
        devises = Plan.objects.values_list('prix__devise', flat=True).distinct()
        return [(devise, devise) for devise in devises]

    def queryset(self, request, queryset):
        # Filtrer les plans selon la devise sélectionnée
        if self.value():
            return queryset.filter(prix__devise=self.value())
        return queryset


@admin.register(Plan)
class PlanAdmin(admin.ModelAdmin):
    list_display = ('nom', 'get_prix_valeur', 'get_prix_devise', 'duree', 'created_at')
    search_fields = ('nom',)
    list_filter = (DeviseFilter,)  # Utilisation du filtre personnalisé pour la devise
    list_per_page = 20
    ordering = ('nom',)

    fieldsets = (
        (None, {
            'fields': ('nom', 'prix', 'duree')
        }),
        ('Métadonnées', {
            'fields': ('created_at', 'updated_at', 'created_by', 'updated_by'),
            'classes': ('collapse',),
        }),
    )

    readonly_fields = ('created_at', 'updated_at', 'created_by', 'updated_by')

    def get_prix_valeur(self, obj):
        return obj.prix.get('valeur', None)
    get_prix_valeur.short_description = 'Prix'

    def get_prix_devise(self, obj):
        return obj.prix.get('devise', None)
    get_prix_devise.short_description = 'Devise'


@admin.register(Subscription)
class SubscriptionAdmin(admin.ModelAdmin):
    list_display = (
        'user', 'plan', 'code_verification',
        'is_active', 'is_expired', 'start_date', 'end_date', 'created_at'
    )
    list_filter = ('is_active', 'is_expired', 'plan')
    search_fields = ('user__username', 'user__email', 'code_verification', 'payment_reference')
    list_per_page = 20
    ordering = ('-created_at',)

    fieldsets = (
        ("Abonnement", {
            'fields': ('user', 'plan', 'code_verification', 'payment_reference')
        }),
        ("État", {
            'fields': ('is_active', 'is_expired', 'start_date', 'end_date')
        }),
        ("Appareil", {
            'fields': ('device',)
        }),
        ("Métadonnées", {
            'fields': ('created_at', 'updated_at', 'created_by', 'updated_by'),
            'classes': ('collapse',),
        }),
    )

    readonly_fields = ('created_at', 'updated_at', 'created_by', 'updated_by')
