# subscriptions/urls.py
from django.urls import path
from .views import (
    GetSubscriptionView, ActivateSubscriptionView, UpdateSubscriptionView, DeleteSubscriptionView,
    ListPlansView, GetPlanView, CreatePlanView, UpdatePlanView, DeletePlanView, CreateSubscriptionView
)

app_name = 'subscriptions'

urlpatterns = [
    path('', GetSubscriptionView.as_view(), name='get_subscription'),
    path('activate/', ActivateSubscriptionView.as_view(), name='activate_subscription'),
    path('<str:id>/update/', UpdateSubscriptionView.as_view(), name='update_subscription'),
    path('<str:id>/delete/', DeleteSubscriptionView.as_view(), name='delete_subscription'),
    path('plans/', ListPlansView.as_view(), name='list_plans'),
    path('plans/<str:id>/', GetPlanView.as_view(), name='get_plan'),
    path('plans/create/', CreatePlanView.as_view(), name='create_plan'),
    path('plans/<str:id>/update/', UpdatePlanView.as_view(), name='update_plan'),
    path('plans/<str:id>/delete/', DeletePlanView.as_view(), name='delete_plan'),
    path('create/', CreateSubscriptionView.as_view(), name='create_subscription'),
]