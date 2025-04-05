# subscriptions/views.py
from rest_framework import generics, status
from rest_framework.permissions import AllowAny, IsAuthenticated
from core.permissions import IsStaffPermission, ReadOnlyBaseFields, IsCreatorOrStaff
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import SearchFilter, OrderingFilter
from rest_framework.response import Response
from .models import Plan, Subscription
from .serializers import PlanSerializer, SubscriptionSerializer

class GetSubscriptionView(generics.RetrieveAPIView):
    """Récupère l'abonnement actif ou le plus récent de l'utilisateur."""
    serializer_class = SubscriptionSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        return Subscription.objects.filter(user=self.request.user, is_active=True, is_expired=False).first() or \
               Subscription.objects.filter(user=self.request.user).order_by('-created_at').first()

class ActivateSubscriptionView(generics.GenericAPIView):
    """Active un abonnement via code de vérification."""
    serializer_class = SubscriptionSerializer
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        code = request.data.get('code_verification')
        device = request.data.get('device')
        try:
            subscription = Subscription.objects.get(user=request.user, code_verification=code, is_active=False, is_expired=False)
            active_subs = Subscription.objects.filter(user=request.user, is_active=True, is_expired=False)
            for sub in active_subs:
                if sub.device == device:
                    return Response({"error": "Cet appareil est déjà utilisé par un autre abonnement actif"}, status=status.HTTP_400_BAD_REQUEST)
            subscription.is_active = True
            subscription.device = device
            subscription.save()
            return Response(SubscriptionSerializer(subscription).data, status=status.HTTP_200_OK)
        except Subscription.DoesNotExist:
            return Response({"error": "Code invalide, abonnement déjà actif ou expiré"}, status=status.HTTP_400_BAD_REQUEST)

class UpdateSubscriptionView(generics.UpdateAPIView):
    """Permet au créateur ou staff de modifier un abonnement."""
    queryset = Subscription.objects.all()
    serializer_class = SubscriptionSerializer
    permission_classes = [IsCreatorOrStaff, ReadOnlyBaseFields]
    lookup_field = 'id'

    def perform_update(self, serializer):
        serializer.save(updated_by=self.request.user)

class DeleteSubscriptionView(generics.DestroyAPIView):
    """Permet au créateur ou staff de supprimer un abonnement."""
    queryset = Subscription.objects.all()
    serializer_class = SubscriptionSerializer
    permission_classes = [IsCreatorOrStaff, ReadOnlyBaseFields]
    lookup_field = 'id'

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        instance.delete()
        return Response({'message': 'Abonnement supprimé'}, status=status.HTTP_204_NO_CONTENT)

class ListPlansView(generics.ListAPIView):
    """Liste publique des plans."""
    queryset = Plan.objects.all()
    serializer_class = PlanSerializer
    permission_classes = [AllowAny]
    filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter]
    filterset_fields = ['nom']
    search_fields = ['nom']
    ordering_fields = ['prix__valeur', 'duree']
    ordering = ['prix__valeur']

class GetPlanView(generics.RetrieveAPIView):
    """Récupère un plan spécifique."""
    queryset = Plan.objects.all()
    serializer_class = PlanSerializer
    permission_classes = [AllowAny]
    lookup_field = 'id'

class CreatePlanView(generics.CreateAPIView):
    """Permet au staff de créer un plan."""
    queryset = Plan.objects.all()
    serializer_class = PlanSerializer
    permission_classes = [IsStaffPermission, ReadOnlyBaseFields]

    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)

class UpdatePlanView(generics.UpdateAPIView):
    """Permet au staff de modifier un plan."""
    queryset = Plan.objects.all()
    serializer_class = PlanSerializer
    permission_classes = [IsStaffPermission, ReadOnlyBaseFields]
    lookup_field = 'id'

    def perform_update(self, serializer):
        serializer.save(updated_by=self.request.user)

class DeletePlanView(generics.DestroyAPIView):
    """Permet au staff de supprimer un plan."""
    queryset = Plan.objects.all()
    serializer_class = PlanSerializer
    permission_classes = [IsStaffPermission, ReadOnlyBaseFields]
    lookup_field = 'id'

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        instance.delete()
        return Response({'message': 'Plan supprimé'}, status=status.HTTP_204_NO_CONTENT)

class CreateSubscriptionView(generics.CreateAPIView):
    """Permet à un utilisateur authentifié de créer un abonnement."""
    queryset = Subscription.objects.all()
    serializer_class = SubscriptionSerializer
    permission_classes = [IsAuthenticated, ReadOnlyBaseFields]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user, created_by=self.request.user)