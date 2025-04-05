from django.urls import path
from .views import (
    ListAgenciesView, GetAgencyView, CreateAgencyView, UpdateAgencyView, DeleteAgencyView,
    ListCategoriesView, GetCategoryView, CreateCategoryView, UpdateCategoryView, DeleteCategoryView,
    ListTypesView, GetTypeView, CreateTypeView, UpdateTypeView, DeleteTypeView,
    ListDomainsView, GetDomainView, CreateDomainView, UpdateDomainView, DeleteDomainView,
    ListServicesView, GetServiceView, CreateServiceView, UpdateServiceView, DeleteServiceView, ContactServiceView,
    ListOpportunityTypesView, GetOpportunityTypeView, CreateOpportunityTypeView, UpdateOpportunityTypeView, DeleteOpportunityTypeView,
    ListOpportunitiesView, GetOpportunityView, CreateOpportunityView, UpdateOpportunityView, DeleteOpportunityView
)

app_name = 'agencies'

urlpatterns = [
    # Agencies
    path('', ListAgenciesView.as_view(), name='list_agencies'),
    path('<uuid:agency_id>/', GetAgencyView.as_view(), name='get_agency'),
    path('create/', CreateAgencyView.as_view(), name='create_agency'),
    path('<uuid:agency_id>/update/', UpdateAgencyView.as_view(), name='update_agency'),
    path('<uuid:agency_id>/delete/', DeleteAgencyView.as_view(), name='delete_agency'),
    # Categories
    path('categories/', ListCategoriesView.as_view(), name='list_categories'),
    path('categories/<uuid:category_id>/', GetCategoryView.as_view(), name='get_category'),
    path('categories/create/', CreateCategoryView.as_view(), name='create_category'),
    path('categories/<uuid:category_id>/update/', UpdateCategoryView.as_view(), name='update_category'),
    path('categories/<uuid:category_id>/delete/', DeleteCategoryView.as_view(), name='delete_category'),
    # Types
    path('types/', ListTypesView.as_view(), name='list_types'),
    path('types/<uuid:type_id>/', GetTypeView.as_view(), name='get_type'),
    path('types/create/', CreateTypeView.as_view(), name='create_type'),
    path('types/<uuid:type_id>/update/', UpdateTypeView.as_view(), name='update_type'),
    path('types/<uuid:type_id>/delete/', DeleteTypeView.as_view(), name='delete_type'),
    # Domains
    path('domains/', ListDomainsView.as_view(), name='list_domains'),
    path('domains/<uuid:domain_id>/', GetDomainView.as_view(), name='get_domain'),
    path('domains/create/', CreateDomainView.as_view(), name='create_domain'),
    path('domains/<uuid:domain_id>/update/', UpdateDomainView.as_view(), name='update_domain'),
    path('domains/<uuid:domain_id>/delete/', DeleteDomainView.as_view(), name='delete_domain'),
    # Services
    path('services/', ListServicesView.as_view(), name='list_services'),
    path('services/<uuid:service_id>/', GetServiceView.as_view(), name='get_service'),
    path('services/create/', CreateServiceView.as_view(), name='create_service'),
    path('services/<uuid:service_id>/update/', UpdateServiceView.as_view(), name='update_service'),
    path('services/<uuid:service_id>/delete/', DeleteServiceView.as_view(), name='delete_service'),
    path('services/<uuid:service_id>/contact/', ContactServiceView.as_view(), name='contact_service'),
    # Opportunity Types
    path('opportunity-types/', ListOpportunityTypesView.as_view(), name='list_opportunity_types'),
    path('opportunity-types/<uuid:type_id>/', GetOpportunityTypeView.as_view(), name='get_opportunity_type'),
    path('opportunity-types/create/', CreateOpportunityTypeView.as_view(), name='create_opportunity_type'),
    path('opportunity-types/<uuid:type_id>/update/', UpdateOpportunityTypeView.as_view(), name='update_opportunity_type'),
    path('opportunity-types/<uuid:type_id>/delete/', DeleteOpportunityTypeView.as_view(), name='delete_opportunity_type'),
    # Opportunities
    path('opportunities/', ListOpportunitiesView.as_view(), name='list_opportunities'),
    path('opportunities/<uuid:opportunity_id>/', GetOpportunityView.as_view(), name='get_opportunity'),
    path('opportunities/create/', CreateOpportunityView.as_view(), name='create_opportunity'),
    path('opportunities/<uuid:opportunity_id>/update/', UpdateOpportunityView.as_view(), name='update_opportunity'),
    path('opportunities/<uuid:opportunity_id>/delete/', DeleteOpportunityView.as_view(), name='delete_opportunity'),
]