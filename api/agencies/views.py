from rest_framework import generics, status
from rest_framework.permissions import IsAuthenticated, AllowAny, BasePermission
from core.permissions import IsStaffPermission
from rest_framework.response import Response
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import SearchFilter, OrderingFilter
from django.core.mail import send_mail
from django.conf import settings
from .models import Agency, Category, Type, Domain, Service, OpportunityType, Opportunity
from .serializers import (
    AgencySerializer, AgencyCategorySerializer, TypeSerializer, DomainSerializer,
    ServiceSerializer, OpportunityTypeSerializer, OpportunitySerializer, ContactSerializer
)

class IsAgencyCreator(BasePermission):
    """Permission : L'utilisateur doit être le créateur de l'agence."""
    def has_permission(self, request, view):
        if request.method in ['POST']:
            agency_id = request.data.get('agency_id')
            if not agency_id:
                return False
            return Agency.objects.filter(id=agency_id, created_by=request.user).exists()
        return True

    def has_object_permission(self, request, view, obj):
        return obj.agency.created_by == request.user

# Agency Views
class ListAgenciesView(generics.ListAPIView):
    queryset = Agency.objects.all()
    serializer_class = AgencySerializer
    permission_classes = [AllowAny]
    filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter]
    filterset_fields = ['category__id', 'type__id', 'domain__id']
    search_fields = ['name', 'description']
    ordering_fields = ['name', 'created_at']

class GetAgencyView(generics.RetrieveAPIView):
    queryset = Agency.objects.all()
    serializer_class = AgencySerializer
    permission_classes = [AllowAny]
    lookup_field = 'id'

class CreateAgencyView(generics.CreateAPIView):
    queryset = Agency.objects.all()
    serializer_class = AgencySerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(
            created_by=self.request.user,
            category_id=self.request.data.get('category_id'),
            type_id=self.request.data.get('type_id'),
            domain_id=self.request.data.get('domain_id')
        )

class UpdateAgencyView(generics.UpdateAPIView):
    queryset = Agency.objects.all()
    serializer_class = AgencySerializer
    permission_classes = [IsAuthenticated]
    lookup_field = 'id'

    def perform_update(self, serializer):
        serializer.save(updated_by=self.request.user)

class DeleteAgencyView(generics.DestroyAPIView):
    queryset = Agency.objects.all()
    serializer_class = AgencySerializer
    permission_classes = [IsAuthenticated]
    lookup_field = 'id'

# Category Views
class ListCategoriesView(generics.ListAPIView):
    queryset = Category.objects.all()
    serializer_class = AgencyCategorySerializer
    permission_classes = [AllowAny]

class GetCategoryView(generics.RetrieveAPIView):
    queryset = Category.objects.all()
    serializer_class = AgencyCategorySerializer
    permission_classes = [AllowAny]
    lookup_field = 'id'

class CreateCategoryView(generics.CreateAPIView):
    queryset = Category.objects.all()
    serializer_class = AgencyCategorySerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(
            created_by=self.request.user,
            type_id=self.request.data.get('type_id'),
            domain_id=self.request.data.get('domain_id')
        )

class UpdateCategoryView(generics.UpdateAPIView):
    queryset = Category.objects.all()
    serializer_class = AgencyCategorySerializer
    permission_classes = [IsAuthenticated]
    lookup_field = 'id'

    def perform_update(self, serializer):
        serializer.save(updated_by=self.request.user)

class DeleteCategoryView(generics.DestroyAPIView):
    queryset = Category.objects.all()
    serializer_class = AgencyCategorySerializer
    permission_classes = [IsAuthenticated]
    lookup_field = 'id'

# Type Views
class ListTypesView(generics.ListAPIView):
    queryset = Type.objects.all()
    serializer_class = TypeSerializer
    permission_classes = [AllowAny]

class GetTypeView(generics.RetrieveAPIView):
    queryset = Type.objects.all()
    serializer_class = TypeSerializer
    permission_classes = [AllowAny]
    lookup_field = 'id'

class CreateTypeView(generics.CreateAPIView):
    queryset = Type.objects.all()
    serializer_class = TypeSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)

class UpdateTypeView(generics.UpdateAPIView):
    queryset = Type.objects.all()
    serializer_class = TypeSerializer
    permission_classes = [IsAuthenticated]
    lookup_field = 'id'

    def perform_update(self, serializer):
        serializer.save(updated_by=self.request.user)

class DeleteTypeView(generics.DestroyAPIView):
    queryset = Type.objects.all()
    serializer_class = TypeSerializer
    permission_classes = [IsAuthenticated]
    lookup_field = 'id'

# Domain Views
class ListDomainsView(generics.ListAPIView):
    queryset = Domain.objects.all()
    serializer_class = DomainSerializer
    permission_classes = [AllowAny]

class GetDomainView(generics.RetrieveAPIView):
    queryset = Domain.objects.all()
    serializer_class = DomainSerializer
    permission_classes = [AllowAny]
    lookup_field = 'id'

class CreateDomainView(generics.CreateAPIView):
    queryset = Domain.objects.all()
    serializer_class = DomainSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)

class UpdateDomainView(generics.UpdateAPIView):
    queryset = Domain.objects.all()
    serializer_class = DomainSerializer
    permission_classes = [IsAuthenticated]
    lookup_field = 'id'

    def perform_update(self, serializer):
        serializer.save(updated_by=self.request.user)

class DeleteDomainView(generics.DestroyAPIView):
    queryset = Domain.objects.all()
    serializer_class = DomainSerializer
    permission_classes = [IsAuthenticated]
    lookup_field = 'id'

# Service Views
class ListServicesView(generics.ListAPIView):
    queryset = Service.objects.all()
    serializer_class = ServiceSerializer
    permission_classes = [AllowAny]
    filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter]
    filterset_fields = ['agency__id', 'agency__category__id', 'agency__type__id', 'agency__domain__id']
    search_fields = ['description']
    ordering_fields = ['name', 'created_at']

class GetServiceView(generics.RetrieveAPIView):
    queryset = Service.objects.all()
    serializer_class = ServiceSerializer
    permission_classes = [AllowAny]
    lookup_field = 'id'

class CreateServiceView(generics.CreateAPIView):
    queryset = Service.objects.all()
    serializer_class = ServiceSerializer
    permission_classes = [IsAuthenticated, IsAgencyCreator]

    def perform_create(self, serializer):
        serializer.save(
            created_by=self.request.user,
            agency_id=self.request.data.get('agency_id')
        )

class UpdateServiceView(generics.UpdateAPIView):
    queryset = Service.objects.all()
    serializer_class = ServiceSerializer
    permission_classes = [IsAuthenticated, IsAgencyCreator]
    lookup_field = 'id'

    def perform_update(self, serializer):
        serializer.save(updated_by=self.request.user)

class DeleteServiceView(generics.DestroyAPIView):
    queryset = Service.objects.all()
    serializer_class = ServiceSerializer
    permission_classes = [IsAuthenticated, IsAgencyCreator]
    lookup_field = 'id'

class ContactServiceView(generics.GenericAPIView):
    serializer_class = ContactSerializer
    permission_classes = [IsAuthenticated]

    def post(self, request, service_id, *args, **kwargs):
        try:
            service = Service.objects.get(id=service_id)
        except Service.DoesNotExist:
            return Response({"error": "Service introuvable"}, status=status.HTTP_404_NOT_FOUND)

        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        subject = serializer.validated_data['subject']
        message = serializer.validated_data['message']
        from_email = request.user.email
        to_email = service.agency.email

        send_mail(
            subject,
            f"Message de {from_email}:\n\n{message}",
            settings.DEFAULT_FROM_EMAIL,
            [to_email],
            fail_silently=False,
        )
        return Response({"message": "Contact envoyé avec succès"}, status=status.HTTP_200_OK)

# Opportunity Type Views (réservé au staff sauf listing/GET)
class ListOpportunityTypesView(generics.ListAPIView):
    queryset = OpportunityType.objects.all()
    serializer_class = OpportunityTypeSerializer
    permission_classes = [AllowAny]

class GetOpportunityTypeView(generics.RetrieveAPIView):
    queryset = OpportunityType.objects.all()
    serializer_class = OpportunityTypeSerializer
    permission_classes = [AllowAny]
    lookup_field = 'id'

class CreateOpportunityTypeView(generics.CreateAPIView):
    queryset = OpportunityType.objects.all()
    serializer_class = OpportunityTypeSerializer
    permission_classes = [IsStaffPermission]

    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)

class UpdateOpportunityTypeView(generics.UpdateAPIView):
    queryset = OpportunityType.objects.all()
    serializer_class = OpportunityTypeSerializer
    permission_classes = [IsStaffPermission]
    lookup_field = 'id'

    def perform_update(self, serializer):
        serializer.save(updated_by=self.request.user)

class DeleteOpportunityTypeView(generics.DestroyAPIView):
    queryset = OpportunityType.objects.all()
    serializer_class = OpportunityTypeSerializer
    permission_classes = [IsStaffPermission]
    lookup_field = 'id'

# Opportunity Views
class ListOpportunitiesView(generics.ListAPIView):
    queryset = Opportunity.objects.all()
    serializer_class = OpportunitySerializer
    permission_classes = [AllowAny]
    filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter]
    filterset_fields = ['agency__id', 'type__id']
    search_fields = ['title', 'description']
    ordering_fields = ['title', 'application_deadline']

class GetOpportunityView(generics.RetrieveAPIView):
    queryset = Opportunity.objects.all()
    serializer_class = OpportunitySerializer
    permission_classes = [AllowAny]
    lookup_field = 'id'

class CreateOpportunityView(generics.CreateAPIView):
    queryset = Opportunity.objects.all()
    serializer_class = OpportunitySerializer
    permission_classes = [IsAuthenticated, IsAgencyCreator]

    def perform_create(self, serializer):
        serializer.save(
            created_by=self.request.user,
            agency_id=self.request.data.get('agency_id'),
            type_id=self.request.data.get('type_id')
        )

class UpdateOpportunityView(generics.UpdateAPIView):
    queryset = Opportunity.objects.all()
    serializer_class = OpportunitySerializer
    permission_classes = [IsAuthenticated, IsAgencyCreator]
    lookup_field = 'id'

    def perform_update(self, serializer):
        serializer.save(updated_by=self.request.user)

class DeleteOpportunityView(generics.DestroyAPIView):
    queryset = Opportunity.objects.all()
    serializer_class = OpportunitySerializer
    permission_classes = [IsAuthenticated, IsAgencyCreator]
    lookup_field = 'id'