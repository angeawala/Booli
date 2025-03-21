from rest_framework import permissions
class CanCreateProduct(permissions.BasePermission):
    """Permet la création si authentifié."""
    def has_permission(self, request, view):
        return request.user.is_authenticated