from rest_framework import viewsets
from rest_framework.permissions import AllowAny, IsAdminUser
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import Trend
from .serializers import TrendSerializer
from .utils import get_trending_products, update_trends

class TrendViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Trend.objects.all()
    serializer_class = TrendSerializer
    permission_classes = [AllowAny]

    @action(detail=False, methods=['get'])
    def trending(self, request):
        """Récupère les produits les plus tendance pour une période donnée."""
        period = request.query_params.get('period', 'weekly')
        limit = int(request.query_params.get('limit', 10))
        products = get_trending_products(period=period, limit=limit)
        from product.serializers import BaseProductSerializer
        serializer = BaseProductSerializer(products, many=True)
        return Response(serializer.data)

    @action(detail=False, methods=['post'], permission_classes=[IsAdminUser])
    def recalculate(self, request):
        """Recalcule toutes les tendances."""
        period = request.data.get('period', 'weekly')
        update_trends(period=period)
        return Response({"message": f"Tendances recalculées pour la période {period}"})