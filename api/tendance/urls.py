from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import TrendViewSet

router = DefaultRouter()
router.register(r'trends', TrendViewSet, basename='trend')

urlpatterns = [
    path('', include(router.urls)),
]