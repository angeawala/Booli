# core/views.py
from django.http import JsonResponse

def health_check(request):
    """Renvoie un statut OK pour les health checks de Render."""
    return JsonResponse({"status": "ok"}, status=200)