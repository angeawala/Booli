# core/views.py
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import logging

logger = logging.getLogger(__name__)

@csrf_exempt
def health_check(request):
    """Renvoie un statut OK pour les health checks de Render."""
    logger.info(f"Health check appelé avec Host: {request.get_host()}")
    return JsonResponse({"status": "ok"}, status=200)