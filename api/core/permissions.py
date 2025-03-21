# core/permissions.py
from rest_framework import permissions

class ReadOnlyBaseFields(permissions.BasePermission):
    def has_permission(self, request, view):
        if request.method in permissions.SAFE_METHODS:
            return True
        protected_fields = {'id', 'created_by', 'created_at', 'updated_by', 'updated_at'}
        if any(field in request.data for field in protected_fields):
            return False
        return True

    def has_object_permission(self, request, view, obj):
        return request.method in permissions.SAFE_METHODS

class IsStaffPermission(permissions.BasePermission):
    """Permission pour restreindre l'accès aux utilisateurs staff."""
    def has_permission(self, request, view):
        return request.user and request.user.is_staff

class IsCreatorOrStaff(permissions.BasePermission):
    """Seul le créateur ou un staff peut modifier un produit."""
    def has_object_permission(self, request, view, obj):
        if request.method in ["PUT", "PATCH", "DELETE"]:
            return request.user == obj.created_by or request.user.is_staff
        return True
