from rest_framework import permissions

class IsOwnerOrAdmin(permissions.BasePermission):
    """Permet l’accès en écriture uniquement au créateur ou à un admin."""
    def has_object_permission(self, request, view, obj):
        if request.method in permissions.SAFE_METHODS:  # GET, HEAD, OPTIONS
            return True
        return obj.created_by == request.user or request.user.is_staff

class IsAdminOrReadOnly(permissions.BasePermission):
    """Permet l’écriture uniquement aux admins, lecture pour tous."""
    def has_permission(self, request, view):
        if request.method in permissions.SAFE_METHODS:
            return True
        return request.user and request.user.is_staff

class CanReviewProduct(permissions.BasePermission):
    """Permet de créer un avis uniquement si l’utilisateur est authentifié et n’a pas déjà laissé d’avis pour ce produit."""
    def has_permission(self, request, view):
        if request.method != 'POST':
            return True
        if not request.user.is_authenticated:
            return False
        # Vérifie si l’utilisateur a déjà un avis pour ce produit
        product_fields = ['shop_product', 'book_product', 'pharmacy_product', 
                          'company_product', 'mark_product', 'supermarket_product']
        data = request.data
        for field in product_fields:
            if field in data and data[field]:
                from .models import Review
                return not Review.objects.filter(
                    **{field: data[field], 'created_by': request.user}
                ).exists()
        return False

class CanManageCart(permissions.BasePermission):
    """Permet de gérer un panier uniquement à son propriétaire ou un admin."""
    def has_object_permission(self, request, view, obj):
        if request.method in permissions.SAFE_METHODS:
            return True
        return obj.user == request.user or request.user.is_staff