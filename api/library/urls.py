# library/urls.py
from django.urls import path
from .views import (
    BookListCreateView, BookDetailView, SubscriptionCreateView,
    PDFAccessView, PDFPreviewView, FreePDFDownloadView
)

urlpatterns = [
    path('books/', BookListCreateView.as_view(), name='book-list-create'),
    path('books/<uuid:id>/', BookDetailView.as_view(), name='book-detail'),
    path('subscriptions/create/', SubscriptionCreateView.as_view(), name='subscription-create'),
    path('books/<uuid:pk>/pdf/access/', PDFAccessView.as_view(), name='pdf-access'),
    path('books/<uuid:pk>/pdf/preview/', PDFPreviewView.as_view(), name='pdf-preview'),
    path('books/<uuid:pk>/pdf/download/', FreePDFDownloadView.as_view(), name='free-pdf-download'),
]