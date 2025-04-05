# pdf/urls.py
from django.urls import path
from .views import (
    StreamPDFView, DownloadPDFView, CreatePDFView, UpdatePDFView, DeletePDFView,
    AccessPDFView, ListPDFsView, GetDownloadLinkView
)

app_name = 'pdf'

urlpatterns = [
    path('stream/<str:id>/', StreamPDFView.as_view(), name='stream_pdf'),
    path('download/<str:id>/', DownloadPDFView.as_view(), name='download_pdf'),
    path('create/', CreatePDFView.as_view(), name='create_pdf'),
    path('stream/<str:id>/update/', UpdatePDFView.as_view(), name='update_pdf'),
    path('stream/<str:id>/delete/', DeletePDFView.as_view(), name='delete_pdf'),
    path('access/<str:book_id>/', AccessPDFView.as_view(), name='access_pdf'),
    path('', ListPDFsView.as_view(), name='list_pdfs'),
    path('download-link/<str:id>/', GetDownloadLinkView.as_view(), name='get_download_link'),
]