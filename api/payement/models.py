import uuid
from django.db import models
from django.contrib.auth import get_user_model
from django.core.exceptions import ValidationError
from product.models import Order  # Pour get_detail


User = get_user_model()


class BaseModel(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    created_by = models.ForeignKey(
        User, on_delete=models.SET_NULL, null=True, blank=True, related_name="%(class)s_created_by"
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True


class Devise(BaseModel):
    code = models.CharField(max_length=3, unique=True)
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.code

    class Meta:
        permissions = [("can_manage_devises", "Peut gérer les devises")]


class ExchangeRate(BaseModel):
    from_devise = models.ForeignKey(Devise, on_delete=models.CASCADE, related_name="from_rates")
    to_devise = models.ForeignKey(Devise, on_delete=models.CASCADE, related_name="to_rates")
    conversion_rate = models.DecimalField(max_digits=10, decimal_places=6)

    def clean(self):
        if self.from_devise == self.to_devise:
            raise ValidationError("Les devises source et cible doivent être différentes.")

    def save(self, *args, **kwargs):
        self.clean()
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.from_devise} -> {self.to_devise}: {self.conversion_rate}"

    class Meta:
        unique_together = ("from_devise", "to_devise")
        permissions = [("can_manage_exchange_rates", "Peut gérer les taux d'échange")]


class PaymentMethod(BaseModel):
    name = models.CharField(max_length=50, unique=True)

    def __str__(self):
        return self.name

    class Meta:
        permissions = [("can_manage_payment_methods", "Peut gérer les méthodes de paiement")]


class Payment(BaseModel):
    method = models.ForeignKey(PaymentMethod, on_delete=models.PROTECT, related_name="payments")
    status = models.CharField(
        max_length=20,
        choices=[("pending", "En attente"), ("completed", "Complété"), ("failed", "Échoué")],
        default="pending",
    )
    total = models.DecimalField(max_digits=10, decimal_places=2)
    transaction_id = models.CharField(max_length=100, unique=True, blank=True, null=True)
    devise = models.ForeignKey(Devise, on_delete=models.PROTECT, related_name="payments")
    type = models.CharField(
        max_length=20,
        choices=[("commande", "Commande"), ("reservation", "Réservation")],
        default="commande",
    )

    def get_detail(self):
        """Génère les détails selon le type de paiement."""
        if self.type == "commande":
            try:
                order = Order.objects.get(payment=self)
                return {
                    "items": [
                        {
                            "variant": str(item.variant),
                            "quantity": item.quantity,
                            "price_in_product_devise": str(item.variant.price),
                            "product_devise": item.variant.product.devise.code,
                            "price_in_client_devise": str(
                                item.variant.price * ExchangeRate.objects.get(
                                    from_devise=item.variant.product.devise, to_devise=self.devise
                                ).conversion_rate if item.variant.product.devise != self.devise else item.variant.price
                            )
                        } for item in order.cart.items.all()
                    ],
                    "total": str(self.total),
                    "client_devise": self.devise.code,
                    "order_date": order.created_at.isoformat()
                }
            except Order.DoesNotExist:
                return {"error": "Aucune commande associée"}
        elif self.type == "reservation":
            # À définir plus tard, exemple placeholder
            return {"status": "Réservation en attente", "date": self.created_at.isoformat()}
        return {}

    def __str__(self):
        return f"{self.method} - {self.total} {self.devise} - {self.status} ({self.type})"


class Invoice(BaseModel):
    payment = models.OneToOneField(Payment, on_delete=models.CASCADE, related_name="invoice")
    detail = models.JSONField(default=dict, blank=True)  # Revenu ici
    file = models.FileField(upload_to="invoices/", blank=True, null=True)

    def save(self, *args, **kwargs):
        if not self.detail:  # Remplir detail si vide
            self.detail = self.payment.get_detail()
        super().save(*args, **kwargs)

    def __str__(self):
        return f"Facture pour {self.payment}"