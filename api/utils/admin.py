from django.contrib import admin
from .models import Country, City, Address


# Country
@admin.register(Country)
class CountryAdmin(admin.ModelAdmin):
    list_display = ('name', 'created_by', 'created_at')
    search_fields = ('name',)
    ordering = ('name',)


# City
@admin.register(City)
class CityAdmin(admin.ModelAdmin):
    list_display = ('name', 'country', 'created_by', 'created_at')
    list_filter = ('country',)
    search_fields = ('name',)
    ordering = ('country', 'name')


# Address
@admin.register(Address)
class AddressAdmin(admin.ModelAdmin):
    list_display = ('street', 'postal_code', 'city', 'created_by', 'created_at')
    list_filter = ('city__country', 'created_at')
    search_fields = ('street', 'postal_code')
    ordering = ('city', 'street')

from django.contrib import admin
from .models import PlanAbonnement, Abonnement

@admin.register(PlanAbonnement)
class PlanAbonnementAdmin(admin.ModelAdmin):
    list_display = ('nom', 'temps', 'prix', 'devise', 'created_at')
    list_filter = ('temps', 'devise', 'created_at')
    search_fields = ('nom',)
    ordering = ('nom',)

@admin.register(Abonnement)
class AbonnementAdmin(admin.ModelAdmin):
    list_display = ('code', 'user', 'plan', 'date_debut', 'date_expiration', 'actif', 'created_at')
    list_filter = ('actif', 'plan', 'date_expiration', 'created_at')
    search_fields = ('code', 'user__email')
    list_editable = ('actif',)
    ordering = ('-date_debut',)