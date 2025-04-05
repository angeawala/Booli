from rest_framework import generics, status
from rest_framework.permissions import IsAuthenticated, AllowAny, IsAdminUser
from rest_framework.response import Response
from django.core.exceptions import PermissionDenied
from .models import Order, OrderItem, Refund, Vendor, Adresse
from .serializers import OrderSerializer, RefundSerializer
from cart.models import Cart, CartItem
from base_products.models import BaseProduct
from pdf.models import DownloadLink
from engros_products.models import EngrosProduct
from django.core.mail import send_mail
from django.conf import settings

def calculate_shipping_cost(order):
    return {"valeur": 500, "devise": "XOF"}  # Temporaire

class ListOrdersView(generics.ListAPIView):
    serializer_class = OrderSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        if self.request.user.is_staff:
            return Order.objects.all()
        return Order.objects.filter(user=self.request.user)

    def get(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        status = request.query_params.get('status')
        search = request.query_params.get('code')
        if status:
            queryset = queryset.filter(status=status)
        if search:
            queryset = queryset.filter(code__icontains=search)
        queryset = queryset.order_by('-created_at')
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)

class ListVendorOrdersView(generics.ListAPIView):
    serializer_class = OrderSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        if "vendor" not in self.request.user.roles:
            raise PermissionDenied("Vous n'êtes pas un vendeur")
        vendor = Vendor.objects.get(user=self.request.user)
        return Order.objects.filter(items__product__in=BaseProduct.objects.filter(created_by=vendor.user))

class GetOrderView(generics.RetrieveAPIView):
    serializer_class = OrderSerializer
    permission_classes = [IsAuthenticated]
    lookup_field = 'code'

    def get_queryset(self):
        if self.request.user.is_staff:
            return Order.objects.all()
        return Order.objects.filter(user=self.request.user)

class CreateOrderView(generics.CreateAPIView):
    serializer_class = OrderSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        cart = Cart.objects.get(user=self.request.user)
        adresse_data = self.request.data.get('adresse', {})
        adresse = Adresse.objects.create(
            street=adresse_data.get('street'),
            postal_code=adresse_data.get('postal_code'),
            city=adresse_data.get('city')
        )
        order = serializer.save(user=self.request.user, adresse=adresse)
        for item in cart.items.all():
            base_product = BaseProduct.objects.get(id=item.product)
            stock = base_product.stock if item.type != "engros" else EngrosProduct.objects.get(commercial_product=base_product).stock
            if item.type != "pdf" and stock < item.quantity:
                order.status = "pending"
                send_mail(
                    f"Stock insuffisant pour {base_product.name}",
                    f"Commande #{order.code} en attente. Stock: {stock}, Demandé: {item.quantity}",
                    settings.DEFAULT_FROM_EMAIL,
                    [base_product.created_by.email],
                    fail_silently=True
                )
            else:
                if item.type != "pdf":
                    base_product.stock -= item.quantity
                    base_product.save()
                elif item.type == "pdf":
                    link = DownloadLink.objects.create(user=self.request.user, book_pdf_id=item.product).link
                    send_mail(
                        f"Votre PDF - Commande #{order.code}",
                        f"Téléchargez ici : {link}",
                        settings.DEFAULT_FROM_EMAIL,
                        [self.request.user.email],
                        fail_silently=True
                    )
            OrderItem.objects.create(
                order=order, product=item.product, variant=item.variant, quantity=item.quantity, prix=item.prix
            )
        order.shipping_cost = calculate_shipping_cost(order)
        order.total = {"valeur": sum(i.prix['valeur'] * i.quantity for i in order.items.all()) + order.shipping_cost['valeur'], "devise": "XOF"}
        order.save()
        cart.delete()

class UpdateOrderView(generics.UpdateAPIView):
    serializer_class = OrderSerializer
    permission_classes = [IsAuthenticated]
    lookup_field = 'code'

    def get_queryset(self):
        if self.request.user.is_staff:
            return Order.objects.all()
        return Order.objects.filter(user=self.request.user, status__in=["shipped"])  # Client peut confirmer "delivered"

    def perform_update(self, serializer):
        order = self.get_object()
        if not self.request.user.is_staff and self.request.data.get('status') != "delivered":
            raise PermissionDenied("Vous ne pouvez que confirmer la livraison")
        if order.status in ["delivered", "cancelled", "refunded"]:
            raise PermissionDenied("Commande non modifiable")
        serializer.save()

class DeleteOrderView(generics.DestroyAPIView):
    serializer_class = OrderSerializer
    permission_classes = [IsAuthenticated]
    lookup_field = 'code'

    def get_queryset(self):
        return Order.objects.filter(user=self.request.user, status="pending") if not self.request.user.is_staff else Order.objects.all()

    def perform_destroy(self, instance):
        for item in instance.items.all():
            if item.type != "pdf":
                product = BaseProduct.objects.get(id=item.product)
                product.stock += item.quantity
                product.save()
        instance.delete()

class RequestRefundView(generics.CreateAPIView):
    serializer_class = RefundSerializer
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        order = Order.objects.get(code=self.kwargs['code'], user=request.user)
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        refund = serializer.save(order=order)
        order.status = "refund_requested"
        order.save()
        return Response({"message": "Demande de remboursement enregistrée"}, status=status.HTTP_201_CREATED)

class GetRefundStatusView(generics.RetrieveAPIView):
    serializer_class = RefundSerializer
    permission_classes = [IsAuthenticated]
    lookup_field = 'code'

    def get_object(self):
        return Refund.objects.get(order__code=self.kwargs['code'], order__user=self.request.user)

class ProcessRefundView(generics.UpdateAPIView):
    serializer_class = RefundSerializer
    permission_classes = [IsAdminUser]
    lookup_field = 'code'

    def get_object(self):
        return Refund.objects.get(order__code=self.kwargs['code'])

    def perform_update(self, serializer):
        refund = serializer.save()
        if refund.status == "approved":
            refund.order.status = "refunded"
            for item in refund.order.items.all():
                if item.type != "pdf":
                    product = BaseProduct.objects.get(id=item.product)
                    product.stock += item.quantity
                    product.save()
        elif refund.status == "rejected":
            refund.order.status = "pending"
        refund.order.save()

class TrackOrderView(generics.RetrieveAPIView):
    serializer_class = OrderSerializer
    permission_classes = [AllowAny]
    lookup_field = 'code'

    def get_queryset(self):
        return Order.objects.all()