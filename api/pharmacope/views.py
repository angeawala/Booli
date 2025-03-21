# pharmacope/views.py
from rest_framework import generics, status
from rest_framework.permissions import IsAuthenticated
from .models import PharmacopeProduct
from .serializers import PharmacopeProductSerializer
from rest_framework.pagination import LimitOffsetPagination

pagination_class = LimitOffsetPagination


class PharmacopeProductListCreateView(generics.ListCreateAPIView):
    queryset = PharmacopeProduct.objects.select_related('base_product', 'category').all()
    serializer_class = PharmacopeProductSerializer
    permission_classes = [IsAuthenticated]
    pagination_class.default_limit = 12

    def get_queryset(self):
        queryset = super().get_queryset()
        q = self.request.query_params.get('q')
        category = self.request.query_params.get('category')
        if q:
            queryset = queryset.filter(base_product__name__icontains=q)
        if category:
            queryset = queryset.filter(base_product__category__name=category)
        return queryset.order_by('base_product__name')

class PharmacopeProductDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = PharmacopeProduct.objects.select_related('base_product').all()
    serializer_class = PharmacopeProductSerializer
    lookup_field = 'id'
    permission_classes = [IsAuthenticated]