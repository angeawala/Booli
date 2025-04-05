from django.http import FileResponse, Http404
from rest_framework import generics, status
from rest_framework.permissions import AllowAny, IsAuthenticated
from core.permissions import IsStaffPermission, ReadOnlyBaseFields
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import SearchFilter, OrderingFilter
from rest_framework.response import Response
from subscriptions.models import Subscription
from .models import BookPDF, DownloadLink
from .serializers import (
    BookPDFSerializer, DownloadLinkSerializer, 
    AccessPDFResponseSerializer, StreamPDFResponseSerializer, DownloadPDFResponseSerializer
)
import os
import uuid

class IsCreatorOrStaffPermission(ReadOnlyBaseFields):
    """Permission : Créateur du livre ou staff."""
    def has_object_permission(self, request, view, obj):
        if request.method in ['PUT', 'PATCH', 'DELETE']:
            return request.user == obj.book.created_by or request.user.is_staff
        return True

class StreamPDFView(generics.GenericAPIView):
    """Diffuse un PDF (public, uniquement si gratuit)."""
    queryset = BookPDF.objects.all()
    serializer_class = StreamPDFResponseSerializer  # Ajouté
    permission_classes = [AllowAny]
    lookup_field = 'id'

    def get(self, request, *args, **kwargs):
        pdf = self.get_object()
        if not pdf.file or not os.path.exists(pdf.file.path):
            raise Http404("Fichier PDF non trouvé")
        if not pdf.is_free:
            return Response({"error": "Ce PDF n'est pas gratuit"}, status=status.HTTP_403_FORBIDDEN)
        return FileResponse(open(pdf.file.path, 'rb'), content_type='application/pdf')

class DownloadPDFView(generics.GenericAPIView):
    """Télécharge un PDF (public, uniquement si gratuit)."""
    queryset = BookPDF.objects.all()
    serializer_class = DownloadPDFResponseSerializer  # Ajouté
    permission_classes = [AllowAny]
    lookup_field = 'id'

    def get(self, request, *args, **kwargs):
        pdf = self.get_object()
        if not pdf.file or not os.path.exists(pdf.file.path):
            raise Http404("Fichier PDF non trouvé")
        if not pdf.is_free:
            return Response({"error": "Ce PDF n'est pas gratuit"}, status=status.HTTP_403_FORBIDDEN)
        response = FileResponse(open(pdf.file.path, 'rb'), as_attachment=True, filename=os.path.basename(pdf.file.name))
        return response

class AccessPDFView(generics.GenericAPIView):
    """Vérifie l'accès au PDF d'un livre (authentifié)."""
    serializer_class = AccessPDFResponseSerializer  # Ajouté
    permission_classes = [IsAuthenticated]

    def get(self, request, book_id, *args, **kwargs):
        try:
            pdf = BookPDF.objects.get(book__base_product__id=book_id)
            if pdf.is_free or Subscription.objects.filter(user=request.user, is_active=True, is_expired=False).exists():
                return Response({'access': True, 'pdf_id': pdf.id}, status=status.HTTP_200_OK)
            return Response({'access': False, 'message': 'Abonnement requis'}, status=status.HTTP_403_FORBIDDEN)
        except BookPDF.DoesNotExist:
            return Response({'access': False, 'message': 'PDF non disponible'}, status=status.HTTP_404_NOT_FOUND)


class CreatePDFView(generics.CreateAPIView):
    """Permet au créateur du livre ou au staff de créer un PDF."""
    queryset = BookPDF.objects.all()
    serializer_class = BookPDFSerializer
    permission_classes = [IsCreatorOrStaffPermission, ReadOnlyBaseFields]

    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)

class UpdatePDFView(generics.UpdateAPIView):
    """Permet au créateur du livre ou au staff de modifier un PDF."""
    queryset = BookPDF.objects.all()
    serializer_class = BookPDFSerializer
    permission_classes = [IsCreatorOrStaffPermission, ReadOnlyBaseFields]
    lookup_field = 'id'

    def perform_update(self, serializer):
        serializer.save(updated_by=self.request.user)

class DeletePDFView(generics.DestroyAPIView):
    """Permet au créateur du livre ou au staff de supprimer un PDF."""
    queryset = BookPDF.objects.all()
    serializer_class = BookPDFSerializer
    permission_classes = [IsCreatorOrStaffPermission, ReadOnlyBaseFields]
    lookup_field = 'id'

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        instance.delete()
        return Response({'message': 'PDF supprimé'}, status=status.HTTP_204_NO_CONTENT)

class ListPDFsView(generics.ListAPIView):
    """Liste publique des PDFs."""
    queryset = BookPDF.objects.all()
    serializer_class = BookPDFSerializer
    permission_classes = [AllowAny]
    filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter]
    filterset_fields = ['book__base_product__id', 'is_free']
    search_fields = ['book__base_product__name']
    ordering_fields = ['created_at']
    ordering = ['-created_at']

class GetDownloadLinkView(generics.GenericAPIView):
    """Génère ou récupère un lien de téléchargement (authentifié)."""
    queryset = BookPDF.objects.all()
    serializer_class = DownloadLinkSerializer
    permission_classes = [IsAuthenticated]
    lookup_field = 'id'

    def get(self, request, *args, **kwargs):
        pdf = self.get_object()
        if not pdf.is_free and not Subscription.objects.filter(user=request.user, is_active=True, is_expired=False).exists():
            return Response({"error": "Abonnement requis"}, status=status.HTTP_403_FORBIDDEN)
        link, created = DownloadLink.objects.get_or_create(
            user=request.user,
            book_pdf=pdf,
            defaults={'link': str(uuid.uuid4()), 'download_limit': 5}
        )
        if link.downloads_used >= link.download_limit:
            return Response({"error": "Limite de téléchargements atteinte"}, status=status.HTTP_403_FORBIDDEN)
        link.downloads_used += 1
        link.save(update_fields=['downloads_used'])
        return Response(DownloadLinkSerializer(link).data, status=status.HTTP_200_OK)