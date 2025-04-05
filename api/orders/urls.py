from django.urls import path
from .views import (
    ListOrdersView, ListVendorOrdersView, GetOrderView, CreateOrderView, UpdateOrderView,
    DeleteOrderView, RequestRefundView, GetRefundStatusView, ProcessRefundView, TrackOrderView
)

app_name = 'orders'

urlpatterns = [
    path('', ListOrdersView.as_view(), name='list_orders'),
    path('vendor/', ListVendorOrdersView.as_view(), name='list_vendor_orders'),
    path('<str:code>/', GetOrderView.as_view(), name='get_order'),
    path('create/', CreateOrderView.as_view(), name='create_order'),
    path('<str:code>/update/', UpdateOrderView.as_view(), name='update_order'),
    path('<str:code>/delete/', DeleteOrderView.as_view(), name='delete_order'),
    path('<str:code>/refund/', RequestRefundView.as_view(), name='request_refund'),
    path('<str:code>/refund/status/', GetRefundStatusView.as_view(), name='get_refund_status'),
    path('<str:code>/refund/process/', ProcessRefundView.as_view(), name='process_refund'),
    path('<str:code>/track/', TrackOrderView.as_view(), name='track_order'),
]