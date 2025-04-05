# shop/views.py
from rest_framework import generics, status
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from django.utils import timezone
from .models import Shop, ShopCategory, ShopSubCategory, ShopProduct
from .serializers import ShopSerializer, ShopCategorySerializer, ShopSubCategorySerializer, ShopProductSerializer

# Shop Views
class ListShopsView(generics.ListAPIView):
    queryset = Shop.objects.all()
    serializer_class = ShopSerializer
    permission_classes = [AllowAny]

class GetShopView(generics.RetrieveAPIView):
    queryset = Shop.objects.all()
    serializer_class = ShopSerializer
    permission_classes = [AllowAny]
    lookup_field = 'id'

class CreateShopView(generics.CreateAPIView):
    queryset = Shop.objects.all()
    serializer_class = ShopSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        shop = serializer.save(created_by=self.request.user)
        shop.categories.set(self.request.data.get('categories_ids', []))
        shop.subcategories.set(self.request.data.get('subcategories_ids', []))

class UpdateShopView(generics.UpdateAPIView):
    queryset = Shop.objects.all()
    serializer_class = ShopSerializer
    permission_classes = [IsAuthenticated]
    lookup_field = 'id'

    def perform_update(self, serializer):
        shop = serializer.save()
        if 'categories_ids' in self.request.data:
            shop.categories.set(self.request.data['categories_ids'])
        if 'subcategories_ids' in self.request.data:
            shop.subcategories.set(self.request.data['subcategories_ids'])

class DeleteShopView(generics.DestroyAPIView):
    queryset = Shop.objects.all()
    serializer_class = ShopSerializer
    permission_classes = [IsAuthenticated]
    lookup_field = 'id'

# ShopCategory Views
class ListShopCategoriesView(generics.ListAPIView):
    queryset = ShopCategory.objects.all()
    serializer_class = ShopCategorySerializer
    permission_classes = [AllowAny]

class GetShopCategoryView(generics.RetrieveAPIView):
    queryset = ShopCategory.objects.all()
    serializer_class = ShopCategorySerializer
    permission_classes = [AllowAny]
    lookup_field = 'id'

class CreateShopCategoryView(generics.CreateAPIView):
    queryset = ShopCategory.objects.all()
    serializer_class = ShopCategorySerializer
    permission_classes = [IsAuthenticated]

class UpdateShopCategoryView(generics.UpdateAPIView):
    queryset = ShopCategory.objects.all()
    serializer_class = ShopCategorySerializer
    permission_classes = [IsAuthenticated]
    lookup_field = 'id'

class DeleteShopCategoryView(generics.DestroyAPIView):
    queryset = ShopCategory.objects.all()
    serializer_class = ShopCategorySerializer
    permission_classes = [IsAuthenticated]
    lookup_field = 'id'

# ShopSubCategory Views
class ListShopSubCategoriesView(generics.ListAPIView):
    queryset = ShopSubCategory.objects.all()
    serializer_class = ShopSubCategorySerializer
    permission_classes = [AllowAny]

class GetShopSubCategoryView(generics.RetrieveAPIView):
    queryset = ShopSubCategory.objects.all()
    serializer_class = ShopSubCategorySerializer
    permission_classes = [AllowAny]
    lookup_field = 'id'

class CreateShopSubCategoryView(generics.CreateAPIView):
    queryset = ShopSubCategory.objects.all()
    serializer_class = ShopSubCategorySerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(category_id=self.request.data.get('category_id'))

class UpdateShopSubCategoryView(generics.UpdateAPIView):
    queryset = ShopSubCategory.objects.all()
    serializer_class = ShopSubCategorySerializer
    permission_classes = [IsAuthenticated]
    lookup_field = 'id'

class DeleteShopSubCategoryView(generics.DestroyAPIView):
    queryset = ShopSubCategory.objects.all()
    serializer_class = ShopSubCategorySerializer
    permission_classes = [IsAuthenticated]
    lookup_field = 'id'

# ShopProduct Views
class ListShopProductsView(generics.ListAPIView):
    serializer_class = ShopProductSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        queryset = ShopProduct.objects.filter(expiration_date__gt=timezone.now())
        shop_id = self.request.query_params.get('shop_id')
        category_id = self.request.query_params.get('category_id')
        subcategory_id = self.request.query_params.get('subcategory_id')
        sort_by = self.request.query_params.get('sort_by', 'expiration_date')

        if shop_id:
            queryset = queryset.filter(shop_id=shop_id)
        if category_id:
            queryset = queryset.filter(shop__categories__id=category_id)
        if subcategory_id:
            queryset = queryset.filter(shop__subcategories__id=subcategory_id)

        return queryset.order_by(sort_by)

class GetShopProductView(generics.RetrieveAPIView):
    queryset = ShopProduct.objects.all()
    serializer_class = ShopProductSerializer
    permission_classes = [AllowAny]
    lookup_field = 'id'

class CreateShopProductView(generics.CreateAPIView):
    queryset = ShopProduct.objects.all()
    serializer_class = ShopProductSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(
            shop_id=self.request.data.get('shop_id'),
            commercial_product_id=self.request.data.get('commercial_product_id')
        )

class UpdateShopProductView(generics.UpdateAPIView):
    queryset = ShopProduct.objects.all()
    serializer_class = ShopProductSerializer
    permission_classes = [IsAuthenticated]
    lookup_field = 'id'

class DeleteShopProductView(generics.DestroyAPIView):
    queryset = ShopProduct.objects.all()
    serializer_class = ShopProductSerializer
    permission_classes = [IsAuthenticated]
    lookup_field = 'id'