# avis/utils.py
from django.core.cache import cache
from django.db.models import Avg, Count
from .models import Avis

def get_avis_list(type: str, product_id: str) -> list:
    """Récupère la liste des avis pour un type et product_id avec cache."""
    cache_key = f"avis_list_{type}_{product_id}"
    avis_list = cache.get(cache_key)
    if not avis_list:
        avis_list = list(Avis.objects.filter(type=type, product_id=product_id).values())
        cache.set(cache_key, avis_list, timeout=3600)  # 1 heure
    return avis_list

def get_avis_stats(type: str, product_id: str) -> dict:
    """Calcule les stats des avis avec cache."""
    cache_key = f"avis_stats_{type}_{product_id}"
    stats = cache.get(cache_key)
    if not stats:
        avis = Avis.objects.filter(type=type, product_id=product_id)
        total = avis.count()
        if total == 0:
            stats = {"total": 0, "average": 0, "by_note": {}, "percentages": {}}
        else:
            avg = avis.aggregate(Avg("note"))["note__avg"] or 0
            by_note = dict(avis.values("note").annotate(count=Count("note")).values_list("note", "count"))
            percentages = {note: (count / total * 100) for note, count in by_note.items()}
            stats = {
                "total": total,
                "average": round(avg, 2),
                "by_note": by_note,
                "percentages": percentages,
            }
        cache.set(cache_key, stats, timeout=3600)  # 1 heure
    return stats