# avis/permissions.py
from rest_framework import permissions
from core.permissions import ReadOnlyBaseFields

class IsCreatorOrStaff(permissions.BasePermission):
    """Seul le créateur ou un staff peut modifier ou supprimer un avis."""
    def has_object_permission(self, request, view, obj):
        if request.method in ["PUT", "PATCH", "DELETE"]:
            return request.user == obj.created_by or request.user.is_staff
        return True