import uuid
from django.db import models
from django.contrib.auth import get_user_model
from django.core.exceptions import ValidationError


# Récupérer le modèle utilisateur
User = get_user_model()


# BaseModel avec champs communs
class BaseModel(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    created_by = models.ForeignKey(
        User, on_delete=models.SET_NULL, null=True, blank=True, related_name="%(class)s_created_by"
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True


# Modèle ProductType
class ProductType(BaseModel):
    name = models.CharField(max_length=100, unique=True)

    def __str__(self):
        return self.name

    class Meta:
        permissions = [("can_manage_types", "Peut gérer les types de produits")]


# Modèle Category
class Category(BaseModel):
    product_type = models.ForeignKey(ProductType, on_delete=models.CASCADE, related_name="categories")
    name = models.CharField(max_length=100)
    icon = models.CharField(max_length=255)

    class Meta:
        unique_together = ("product_type", "name")
        permissions = [("can_manage_categories", "Peut gérer les catégories")]

    def __str__(self):
        return f"{self.name} ({self.product_type.name})"


# Modèle SubCategory
class SubCategory(BaseModel):
    category = models.ForeignKey(Category, on_delete=models.CASCADE, related_name="subcategories")
    name = models.CharField(max_length=100)

    class Meta:
        unique_together = ("category", "name")
        permissions = [("can_manage_subcategories", "Peut gérer les sous-catégories")]

    def __str__(self):
        return f"{self.name} ({self.category.name})"


# Modèle Product
class Product(BaseModel):
    name = models.CharField(max_length=255)
    category = models.ForeignKey(Category, on_delete=models.CASCADE, related_name="products")
    subcategory = models.ForeignKey(
        SubCategory, on_delete=models.SET_NULL, null=True, blank=True, related_name="products"
    )
    detail = models.JSONField(default=dict, blank=True)
    devise = models.ForeignKey('payement.Devise', on_delete=models.PROTECT, related_name="products")
    approved = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.name} ({self.devise})"

    class Meta:
        permissions = [
            ("can_approve_product", "Peut approuver un produit"),
            ("can_manage_products", "Peut gérer les produits"),
        ]


# Modèle Variant
class Variant(BaseModel):
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name="variants")
    original_price = models.DecimalField(max_digits=10, decimal_places=2)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    stock = models.IntegerField(null=True, blank=True)
    attributes = models.JSONField(default=dict)
    sku = models.CharField(max_length=50, unique=True, blank=True, null=True)

    def clean(self):
        if self.original_price <= self.price:
            raise ValidationError("Le prix original doit être supérieur au prix réduit.")

    def save(self, *args, **kwargs):
        self.clean()
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.product.name} - {self.price}€ (SKU: {self.sku or 'N/A'})"

    class Meta:
        unique_together = ("product", "attributes")
        permissions = [
            ("can_manage_variants", "Peut gérer les variantes"),
            ("can_update_prices", "Peut modifier les prix des variantes"),
        ]


# Modèle Review
class Review(BaseModel):
    variant = models.ForeignKey(Variant, on_delete=models.CASCADE, related_name="reviews")
    rating = models.IntegerField(choices=[(i, i) for i in range(1, 6)])
    comment = models.TextField(blank=True)
    approved = models.BooleanField(default=False)

    class Meta:
        unique_together = ("variant", "created_by")
        permissions = [("can_approve_review", "Peut approuver les avis")]

    def __str__(self):
        return f"{self.rating}/5 pour {self.variant}"


# Modèle Cart
class Cart(BaseModel):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="carts")
    is_active = models.BooleanField(default=True)  # Ajout pour indiquer si le panier est actif

    def __str__(self):
        return f"Panier de {self.user} ({'actif' if self.is_active else 'inactif'})"

    class Meta:
        unique_together = ("user", "created_at")


# Modèle CartItem
class CartItem(BaseModel):
    cart = models.ForeignKey(Cart, on_delete=models.CASCADE, related_name="items")
    variant = models.ForeignKey(Variant, on_delete=models.CASCADE, related_name="cart_items")
    quantity = models.PositiveIntegerField(default=1)

    def __str__(self):
        return f"{self.quantity} x {self.variant} dans {self.cart}"

    class Meta:
        unique_together = ("cart", "variant")


# Modèle Order
class Order(BaseModel):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="orders")
    cart = models.OneToOneField(Cart, on_delete=models.CASCADE, related_name="order")
    total = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)
    status = models.CharField(
        max_length=20,
        choices=[("pending", "En attente"), ("shipped", "Expédiée"), ("delivered", "Livrée"), ("cancelled", "Annulée")],
        default="pending",
    )
    shipping_address = models.ForeignKey(
        'utils.Address', on_delete=models.SET_NULL, null=True, blank=True, related_name="orders"
    )
    payment = models.ForeignKey(
        'payement.Payment', on_delete=models.SET_NULL, null=True, blank=True, related_name="orders"
    )

    def calculate_total(self):
        self.total = sum(item.quantity * item.variant.price for item in self.cart.items.all())
        self.save()

    def save(self, *args, **kwargs):
        # Désactiver le panier quand une commande est créée
        if self.pk is None and self.cart:  # Si c'est une nouvelle commande
            self.cart.is_active = False
            self.cart.save()
        super().save(*args, **kwargs)

    def __str__(self):
        return f"Commande #{self.id} - {self.user} - {self.status}"

    class Meta:
        permissions = [("can_manage_orders", "Peut gérer les commandes")]