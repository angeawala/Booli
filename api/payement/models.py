from django.db import models
from core.models import BaseModel
from django.contrib.auth import get_user_model
from utils.models  import Devise

User = get_user_model()


class PaymentMethod(BaseModel):
    name = models.CharField(max_length=100, verbose_name="Nom")
    is_active = models.BooleanField(default=True, verbose_name="Actif")

    class Meta:
        verbose_name = "Méthode de paiement"
        verbose_name_plural = "Méthodes de paiement"

    def __str__(self):
        return self.name

class Payment(BaseModel):
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
    created_by = models.ForeignKey(
        User,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        editable=False,
        verbose_name="Créé par",
        help_text="Utilisateur ayant créé le paiement.",
        related_name="payments_created"
    )
    updated_by = models.ForeignKey(
        User,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        editable=False,
        verbose_name="Mis à jour par",
        help_text="Utilisateur ayant mis à jour le paiement.",
        related_name="payments_updated"
    )

    class Meta:
        verbose_name = "Paiement"
        verbose_name_plural = "Paiements"

    def __str__(self):
        return f"Paiement {self.id} pour Commande {self.commande.id}"

class Invoice(BaseModel):
    invoice_number = models.CharField(max_length=50, unique=True, verbose_name="Numéro de facture")
    amount = models.DecimalField(max_digits=10, decimal_places=2, verbose_name="Montant")
    issue_date = models.DateTimeField(auto_now_add=True, verbose_name="Date d’émission")
    created_by = models.ForeignKey(
        User,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        editable=False,
        verbose_name="Créé par",
        help_text="Utilisateur ayant créé la facture.",
        related_name="invoices_created"
    )
    updated_by = models.ForeignKey(
        User,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        editable=False,
        verbose_name="Mis à jour par",
        help_text="Utilisateur ayant mis à jour la facture.",
        related_name="invoices_updated"
    )

    class Meta:
        verbose_name = "Facture"
        verbose_name_plural = "Factures"

    def __str__(self):
        return f"Facture {self.invoice_number} pour Commande {self.commande.id}"
