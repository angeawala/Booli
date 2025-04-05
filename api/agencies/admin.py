from django.contrib import admin
from .models import Type, Domain, Category, Agency, Service, OpportunityType, Opportunity

class TypeAdmin(admin.ModelAdmin):
    list_display = ('name', 'description', 'created_at', 'updated_at')
    search_fields = ('name',)
    list_filter = ('created_at',)
    ordering = ['name']

class DomainAdmin(admin.ModelAdmin):
    list_display = ('name', 'description', 'created_at', 'updated_at')
    search_fields = ('name',)
    list_filter = ('created_at',)
    ordering = ['name']

class CategoryAdmin(admin.ModelAdmin):
    list_display = ('name', 'type', 'domain', 'image', 'created_at', 'updated_at')
    search_fields = ('name', 'type__name', 'domain__name')
    list_filter = ('type', 'domain', 'created_at')
    ordering = ['name']

class AgencyAdmin(admin.ModelAdmin):
    list_display = ('name', 'category', 'type', 'domain', 'address', 'phone', 'email', 'website', 'created_at')
    search_fields = ('name', 'category__name', 'type__name', 'domain__name', 'address', 'phone', 'email')
    list_filter = ('category', 'type', 'domain', 'created_at')
    ordering = ['name']

class ServiceAdmin(admin.ModelAdmin):
    list_display = ('name', 'agency', 'description', 'image', 'created_at', 'updated_at')
    search_fields = ('name', 'agency__name')
    list_filter = ('agency', 'created_at')
    ordering = ['name']

class OpportunityTypeAdmin(admin.ModelAdmin):
    list_display = ('name', 'description', 'created_at', 'updated_at')
    search_fields = ('name',)
    list_filter = ('created_at',)
    ordering = ['name']

class OpportunityAdmin(admin.ModelAdmin):
    list_display = ('title', 'agency', 'type', 'application_deadline', 'created_at', 'updated_at')
    search_fields = ('title', 'agency__name', 'type__name')
    list_filter = ('agency', 'type', 'application_deadline', 'created_at')
    ordering = ['title']

# Enregistrement des modèles dans l'admin
admin.site.register(Type, TypeAdmin)
admin.site.register(Domain, DomainAdmin)
admin.site.register(Category, CategoryAdmin)
admin.site.register(Agency, AgencyAdmin)
admin.site.register(Service, ServiceAdmin)
admin.site.register(OpportunityType, OpportunityTypeAdmin)
admin.site.register(Opportunity, OpportunityAdmin)
