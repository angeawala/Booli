from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt

@csrf_exempt
def health_check(request):
    """Renvoie un statut OK pour les health checks de Render."""
    return JsonResponse({"status": "ok"}, status=200)