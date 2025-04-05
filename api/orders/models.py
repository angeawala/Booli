from django.db import models
from django.conf import settings
from core.models import BaseModel
from datetime import datetime
from django.core.mail import send_mail
from django.core.cache import cache
from base_products.models import BaseProduct, Vendor
from utils.models import Adresse

class Order(BaseModel):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="orders")
    code = models.CharField(max_length=20, unique=True)  # Retiré : primary_key=True (id de BaseModel est la clé primaire)
    total = models.JSONField(default=dict)
    status = models.CharField(
        max_length=20,
        choices=[
            ("pending", "En attente"), ("processing", "En cours"), ("shipped", "Expédié"),
            ("delivered", "Livré"), ("cancelled", "Annulé"), ("refund_requested", "Remboursement demandé"),
            ("refunded", "Remboursé")
        ],
        default="pending"
    )
    adresse = models.ForeignKey(Adresse, on_delete=models.SET_NULL, null=True)
    shipping_cost = models.JSONField(default=dict)

    def generate_code(self):
        date = datetime.now()
        base = f"{date.month:02d}{date.day:02d}"
        cache_key = f"order_count_{date.year}_{base}"
        count = cache.get(cache_key, 0) + 1
        cache.set(cache_key, count, timeout=86400)
        return f"B{date.year}-{base}{count}"

    def save(self, *args, **kwargs):
        if not self.code:
            self.code = self.generate_code()
        super().save(*args, **kwargs)

class OrderItem(BaseModel):
    order = models.ForeignKey(Order, on_delete=models.CASCADE, related_name="items")
    product = models.CharField(max_length=36)
    variant = models.CharField(max_length=36, null=True, blank=True)
    quantity = models.PositiveIntegerField()
    prix = models.JSONField(default=dict)

    def save(self, *args, **kwargs):
        super().save(*args, **kwargs)
        vendor = Vendor.objects.get(user__id=BaseProduct.objects.get(id=self.product).created_by_id)
        subject = f"Nouvelle commande #{self.order.code}"
        message = f"Produit: {self.product}, Quantité: {self.quantity}, Prix: {self.prix['valeur']} {self.prix['devise']}, Adresse: {self.order.adresse}"
        send_mail(subject, message, settings.DEFAULT_FROM_EMAIL, [vendor.user.email], fail_silently=True)

class Refund(BaseModel):
    order = models.OneToOneField(Order, on_delete=models.CASCADE, related_name="refund")
    reason = models.TextField()
    proof = models.FileField(upload_to="refunds/", null=True)
    status = models.CharField(max_length=20, choices=[("pending", "En attente"), ("approved", "Approuvé"), ("rejected", "Rejeté")], default="pending")
    requested_at = models.DateTimeField(auto_now_add=True)