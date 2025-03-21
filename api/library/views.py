from django.shortcuts import get_object_or_404
from rest_framework import generics, status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from product.utils import get_product_details
from .models import Book, Abonnement
from .serializers import BookSerializer, SubscriptionSerializer
from .utils import get_cached_details, cache_details, send_pdf_download_email, generate_signed_url
from django.utils import timezone
from django.core.cache import cache
from rest_framework.pagination import LimitOffsetPagination

pagination_class = LimitOffsetPagination


class BookListCreateView(generics.ListCreateAPIView):
    queryset = Book.objects.select_related('base_product', 'pdf').all()
    serializer_class = BookSerializer
    permission_classes = [AllowAny]
    pagination_class = LimitOffsetPagination  # Utilisation correcte de la classe de pagination
    pagination_class.default_limit = 12       # Définition explicite de la limite par défaut

    def get_queryset(self):
        queryset = super().get_queryset()
        q = self.request.query_params.get('q')
        genre = self.request.query_params.get('genre')
        is_free = self.request.query_params.get('is_free')
        if q:
            queryset = queryset.filter(base_product__name__icontains=q)
        if genre:
            queryset = queryset.filter(genre=genre)
        if is_free is not None:
            queryset = queryset.filter(pdf__is_free=is_free.lower() == 'true')
        ordering = self.request.query_params.get('ordering', 'base_product__name')
        return queryset.order_by(ordering)

    def list(self, request, *args, **kwargs):
        # Récupérer le queryset
        queryset = self.filter_queryset(self.get_queryset())
        
        # Pagination
        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)
        
        # Si pas de pagination (cas rare), retourner tous les résultats
        serializer = self.get_serializer(queryset, many=True)
        return Response({
            "count": queryset.count(),
            "next": None,
            "previous": None,
            "results": serializer.data
        })


class BookDetailView(generics.RetrieveAPIView):
    queryset = Book.objects.select_related('base_product', 'pdf').all()
    serializer_class = BookSerializer
    lookup_field = 'id'
    permission_classes = [AllowAny]

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        cached_data = get_cached_details('book', instance.id)
        if not cached_data:
            book_serializer = self.get_serializer(instance)
            book_data = book_serializer.data
            product_data = get_product_details(str(instance.base_product.id))  # Intégration product/utils
            cached_data = {**product_data, **book_data}
            cache_details('book', instance.id, cached_data)
        return Response(cached_data)


class SubscriptionCreateView(generics.CreateAPIView):
    queryset = Abonnement.objects.all()
    serializer_class = SubscriptionSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        payment_confirmed = self.request.data.get('payment_confirmed', False)
        if not payment_confirmed:
            return Response({"detail": "Paiement requis."}, status=status.HTTP_402_PAYMENT_REQUIRED)
        serializer.save(actif=payment_confirmed, user=self.request.user)


class PDFAccessView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, pk):
        book = get_object_or_404(Book.objects.select_related('pdf'), id=pk)
        if not book.pdf or not book.pdf.pdf_file:
            return Response({"detail": "Aucun PDF disponible."}, status=status.HTTP_400_BAD_REQUEST)

        # Achat direct
        payment_confirmed = request.data.get('payment_confirmed', False)
        if payment_confirmed and book.pdf.pdf_price:
            pdf_url = book.pdf.pdf_file.url
            send_pdf_download_email(request.user.email, book.base_product.name, pdf_url)
            return Response({"pdf_url": pdf_url}, status=status.HTTP_200_OK)

        # Via abonnement
        code = request.data.get('code')
        if not code:
            return Response({"detail": "Code ou paiement requis."}, status=status.HTTP_400_BAD_REQUEST)
        
        subscription = get_object_or_404(Abonnement, code=code, user=request.user)
        if not subscription.actif or subscription.is_expired:
            return Response({"detail": "Abonnement invalide ou expiré."}, status=status.HTTP_403_FORBIDDEN)
        
        pdf_url = book.pdf.pdf_file.url
        send_pdf_download_email(request.user.email, book.base_product.name, pdf_url)
        return Response({"pdf_url": pdf_url}, status=status.HTTP_200_OK)


class PDFPreviewView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, pk):
        book = get_object_or_404(Book.objects.select_related('pdf'), id=pk)
        if not book.pdf or not book.pdf.pdf_file:
            return Response({"detail": "Aucun PDF disponible."}, status=status.HTTP_400_BAD_REQUEST)
        
        code = request.data.get('code')
        if not code:
            return Response({"detail": "Code requis."}, status=status.HTTP_400_BAD_REQUEST)
        
        subscription = get_object_or_404(Abonnement, code=code, user=request.user)
        if not subscription.actif or subscription.is_expired:
            return Response({"detail": "Abonnement invalide ou expiré."}, status=status.HTTP_403_FORBIDDEN)
        
        device_token = request.data.get('device_token')
        if not device_token:
            return Response({"detail": "Token d’appareil requis."}, status=status.HTTP_400_BAD_REQUEST)
        
        cache_key = f"subscription_{subscription.code}_device"
        active_device = cache.get(cache_key)
        if active_device and active_device != device_token:
            return Response({"detail": "Abonnement utilisé sur un autre appareil."}, status=status.HTTP_403_FORBIDDEN)
        cache.set(cache_key, device_token, timeout=int(subscription.date_expiration.timestamp() - timezone.now().timestamp()))

        preview_url = generate_signed_url(book.pdf.pdf_file, expires_in=3600)  # URL temporaire
        return Response({"preview_url": preview_url, "subscription_code": code}, status=status.HTTP_200_OK)


class FreePDFDownloadView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, pk):
        book = get_object_or_404(Book.objects.select_related('pdf'), id=pk)
        if not book.pdf or not book.pdf.pdf_file or not book.pdf.is_free:
            return Response({"detail": "PDF non gratuit ou indisponible."}, status=status.HTTP_400_BAD_REQUEST)
        download_url = book.pdf.pdf_file.url
        return Response({"download_url": download_url}, status=status.HTTP_200_OK)