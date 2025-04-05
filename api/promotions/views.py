# promotions/views.py
from django.utils import timezone
from rest_framework import generics, status
from rest_framework.permissions import AllowAny, IsAuthenticated
from core.permissions import IsCreatorOrStaff, ReadOnlyBaseFields
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.pagination import PageNumberPagination
from rest_framework.response import Response
from .models import Promotion
from .serializers import PromotionSerializer
from django.db.models import F, ExpressionWrapper, DurationField
from datetime import timedelta

class PromotionPagination(PageNumberPagination):
    page_size = 40
    page_size_query_param = 'page_size'
    max_page_size = 100

class ListPromotionsView(generics.ListAPIView):
    """Liste publique des promotions actives avec filtre sur temps restant."""
    serializer_class = PromotionSerializer
    permission_classes = [AllowAny]
    pagination_class = PromotionPagination
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['product__category__id', 'product__subCategory__id']

    def get_queryset(self):
        queryset = Promotion.objects.filter(end_time__gt=timezone.now())
        max_remaining_time = self.request.query_params.get('max_remaining_time', None)
        if max_remaining_time:
            try:
                max_minutes = float(max_remaining_time)
                max_delta = timedelta(minutes=max_minutes)
                queryset = queryset.annotate(
                    remaining_time=ExpressionWrapper(
                        F('end_time') - timezone.now(),
                        output_field=DurationField()
                    )
                ).filter(remaining_time__lte=max_delta)
            except ValueError:
                pass  # Ignore si max_remaining_time n'est pas un nombre valide
        return queryset

class GetPromotionView(generics.RetrieveAPIView):
    """Récupère une promotion spécifique."""
    queryset = Promotion.objects.all()
    serializer_class = PromotionSerializer
    permission_classes = [AllowAny]
    lookup_field = 'id'

class CreatePromotionView(generics.CreateAPIView):
    """Permet aux utilisateurs authentifiés de créer une promotion."""
    queryset = Promotion.objects.all()
    serializer_class = PromotionSerializer
    permission_classes = [IsAuthenticated, ReadOnlyBaseFields]

    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)

class UpdatePromotionView(generics.UpdateAPIView):
    """Permet au créateur ou staff de modifier une promotion."""
    queryset = Promotion.objects.all()
    serializer_class = PromotionSerializer
    permission_classes = [IsCreatorOrStaff, ReadOnlyBaseFields]
    lookup_field = 'id'

    def perform_update(self, serializer):
        serializer.save(updated_by=self.request.user)

class DeletePromotionView(generics.DestroyAPIView):
    """Permet au créateur ou staff de supprimer une promotion."""
    queryset = Promotion.objects.all()
    serializer_class = PromotionSerializer
    permission_classes = [IsCreatorOrStaff, ReadOnlyBaseFields]
    lookup_field = 'id'

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        instance.delete()
        return Response({'message': 'Promotion supprimée'}, status=status.HTTP_204_NO_CONTENT)