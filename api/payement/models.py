from django.db import models
from core.models import BaseModel
from product.models import Commande  # Remplace Order par Commande
from django.contrib.auth import get_user_model

User = get_user_model()

class Devise(BaseModel):
    code = models.CharField(max_length=3, unique=True, verbose_name="Code")
    name = models.CharField(max_length=50, verbose_name="Nom")

    class Meta:
        verbose_name = "Devise"
        verbose_name_plural = "Devises"

    def __str__(self):
        return self.code

class ExchangeRate(BaseModel):
    from_devise = models.ForeignKey(Devise, on_delete=models.CASCADE, related_name='from_rates')
    to_devise = models.ForeignKey(Devise, on_delete=models.CASCADE, related_name='to_rates')
    rate = models.DecimalField(max_digits=10, decimal_places=4, verbose_name="Taux")

    class Meta:
        verbose_name = "Taux de change"
        verbose_name_plural = "Taux de change"

    def __str__(self):
        return f"{self.from_devise.code} -> {self.to_devise.code}: {self.rate}"

class PaymentMethod(BaseModel):
    name = models.CharField(max_length=100, verbose_name="Nom")
    is_active = models.BooleanField(default=True, verbose_name="Actif")

    class Meta:
        verbose_name = "Méthode de paiement"
        verbose_name_plural = "Méthodes de paiement"

    def __str__(self):
        return self.name

class Payment(BaseModel):
    commande = models.ForeignKey(
        Commande,
        on_delete=models.CASCADE,
        related_name='payments',
        verbose_name="Commande",
        help_text="Commande associée à ce paiement."
    )
    amount = models.DecimalField(max_digits=10, decimal_places=2, verbose_name="Montant")
    devise = models.ForeignKey(Devise, on_delete=models.SET_NULL, null=True, verbose_name="Devise")
    payment_method = models.ForeignKey(PaymentMethod, on_delete=models.SET_NULL, null=True, verbose_name="Méthode")
    payment_date = models.DateTimeField(auto_now_add=True, verbose_name="Date de paiement")
    status = models.CharField(
        max_length=20,
        choices=(
            ('pending', 'En attente'),
            ('completed', 'Complété'),
            ('failed', 'Échoué'),
        ),
        default='pending',
        verbose_name="Statut"
    )

    class Meta:
        verbose_name = "Paiement"
        verbose_name_plural = "Paiements"

    def __str__(self):
        return f"Paiement {self.id} pour Commande {self.commande.id}"

class Invoice(BaseModel):
    commande = models.ForeignKey(
        Commande,
        on_delete=models.CASCADE,
        related_name='invoices',
        verbose_name="Commande",
        help_text="Commande associée à cette facture."
    )
    invoice_number = models.CharField(max_length=50, unique=True, verbose_name="Numéro de facture")
    amount = models.DecimalField(max_digits=10, decimal_places=2, verbose_name="Montant")
    issue_date = models.DateTimeField(auto_now_add=True, verbose_name="Date d’émission")

    class Meta:
        verbose_name = "Facture"
        verbose_name_plural = "Factures"

    def __str__(self):
        return f"Facture {self.invoice_number} pour Commande {self.commande.id}"