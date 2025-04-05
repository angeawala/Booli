# pharmacy_products/views.py
from django.utils import timezone
from rest_framework import generics, status
from rest_framework.permissions import AllowAny, IsAuthenticated
from core.permissions import IsCreatorOrStaff, IsStaffPermission, ReadOnlyBaseFields
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.pagination import PageNumberPagination
from rest_framework.response import Response
from django.core.mail import send_mail
from django.conf import settings
from .models import PharmacyProduct, PharmacyCategory, Doctor
from .serializers import PharmacyProductSerializer, PharmacyCategorySerializer, DoctorSerializer, ContactDoctorSerializer

class PharmacyPagination(PageNumberPagination):
    page_size = 40
    page_size_query_param = 'page_size'
    max_page_size = 100

class ListPharmacyProductsView(generics.ListAPIView):
    """Liste publique des produits pharmaceutiques."""
    queryset = PharmacyProduct.objects.filter(expiration_date__gte=timezone.now().date())
    serializer_class = PharmacyProductSerializer
    permission_classes = [AllowAny]
    pagination_class = PharmacyPagination
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['category__id', 'base_product__stock']

class GetPharmacyProductView(generics.RetrieveAPIView):
    """Récupère un produit pharmaceutique spécifique."""
    queryset = PharmacyProduct.objects.all()
    serializer_class = PharmacyProductSerializer
    permission_classes = [AllowAny]
    lookup_field = 'base_product__id'

class CreatePharmacyProductView(generics.CreateAPIView):
    """Permet aux utilisateurs authentifiés de créer un produit pharmaceutique."""
    queryset = PharmacyProduct.objects.all()
    serializer_class = PharmacyProductSerializer
    permission_classes = [IsAuthenticated, ReadOnlyBaseFields]

    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)

class UpdatePharmacyProductView(generics.UpdateAPIView):
    """Permet au créateur ou staff de modifier un produit pharmaceutique."""
    queryset = PharmacyProduct.objects.all()
    serializer_class = PharmacyProductSerializer
    permission_classes = [IsCreatorOrStaff, ReadOnlyBaseFields]
    lookup_field = 'base_product__id'

    def perform_update(self, serializer):
        serializer.save(updated_by=self.request.user)

class DeletePharmacyProductView(generics.DestroyAPIView):
    """Permet au créateur ou staff de supprimer un produit pharmaceutique."""
    queryset = PharmacyProduct.objects.all()
    serializer_class = PharmacyProductSerializer
    permission_classes = [IsCreatorOrStaff, ReadOnlyBaseFields]
    lookup_field = 'base_product__id'

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        instance.base_product.delete()
        return Response({'message': 'Produit supprimé'}, status=status.HTTP_204_NO_CONTENT)

class ListCategoriesView(generics.ListAPIView):
    """Liste publique des catégories."""
    queryset = PharmacyCategory.objects.all()
    serializer_class = PharmacyCategorySerializer
    permission_classes = [AllowAny]

class CreateCategoryView(generics.CreateAPIView):
    """Permet au staff de créer une catégorie."""
    queryset = PharmacyCategory.objects.all()
    serializer_class = PharmacyCategorySerializer
    permission_classes = [IsStaffPermission, ReadOnlyBaseFields]

    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)

class UpdateCategoryView(generics.UpdateAPIView):
    """Permet au staff de modifier une catégorie."""
    queryset = PharmacyCategory.objects.all()
    serializer_class = PharmacyCategorySerializer
    permission_classes = [IsStaffPermission, ReadOnlyBaseFields]
    lookup_field = 'id'

    def perform_update(self, serializer):
        serializer.save(updated_by=self.request.user)

class DeleteCategoryView(generics.DestroyAPIView):
    """Permet au staff de supprimer une catégorie."""
    queryset = PharmacyCategory.objects.all()
    serializer_class = PharmacyCategorySerializer
    permission_classes = [IsStaffPermission, ReadOnlyBaseFields]
    lookup_field = 'id'

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        instance.delete()
        return Response({'message': 'Catégorie supprimée'}, status=status.HTTP_204_NO_CONTENT)

class ListDoctorsView(generics.ListAPIView):
    """Liste publique des docteurs."""
    queryset = Doctor.objects.all()
    serializer_class = DoctorSerializer
    permission_classes = [AllowAny]

class GetDoctorView(generics.RetrieveAPIView):
    """Récupère un docteur spécifique."""
    queryset = Doctor.objects.all()
    serializer_class = DoctorSerializer
    permission_classes = [AllowAny]
    lookup_field = 'contact'

class CreateDoctorView(generics.CreateAPIView):
    """Permet au staff de créer un docteur."""
    queryset = Doctor.objects.all()
    serializer_class = DoctorSerializer
    permission_classes = [IsStaffPermission, ReadOnlyBaseFields]

    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)

class UpdateDoctorView(generics.UpdateAPIView):
    """Permet au staff de modifier un docteur."""
    queryset = Doctor.objects.all()
    serializer_class = DoctorSerializer
    permission_classes = [IsStaffPermission, ReadOnlyBaseFields]
    lookup_field = 'contact'

    def perform_update(self, serializer):
        serializer.save(updated_by=self.request.user)

class DeleteDoctorView(generics.DestroyAPIView):
    """Permet au staff de supprimer un docteur."""
    queryset = Doctor.objects.all()
    serializer_class = DoctorSerializer
    permission_classes = [IsStaffPermission, ReadOnlyBaseFields]
    lookup_field = 'contact'

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        instance.delete()
        return Response({'message': 'Docteur supprimé'}, status=status.HTTP_204_NO_CONTENT)

class ContactDoctorView(generics.GenericAPIView):
    """Permet à un client de contacter un docteur par email."""
    serializer_class = ContactDoctorSerializer
    permission_classes = [AllowAny]
    lookup_field = 'contact'

    def get_queryset(self):
        return Doctor.objects.all()

    def post(self, request, *args, **kwargs):
        doctor = self.get_object()
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        client_email = serializer.validated_data['client_email']
        client_contact = serializer.validated_data['client_contact']
        message = serializer.validated_data['message']

        subject = f"Nouveau message de {client_email}"
        email_body = (
            f"Bonjour Dr. {doctor.name},\n\n"
            f"Vous avez reçu un message d'un client :\n"
            f"Email : {client_email}\n"
            f"Contact : {client_contact}\n"
            f"Message :\n{message}\n\n"
            f"Cordialement,\nL'équipe"
        )

        send_mail(
            subject=subject,
            message=email_body,
            from_email=settings.DEFAULT_FROM_EMAIL,
            recipient_list=[doctor.email],
            fail_silently=True,
        )

        return Response({"message": "Email envoyé au docteur"}, status=status.HTTP_200_OK)