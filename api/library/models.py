from django.db import models
from django.core.exceptions import ValidationError
from django.contrib.auth import get_user_model
from product.models import BaseProduct
from core.models import BaseModel
from django.utils import timezone
import random
import string

User = get_user_model()

class Book(BaseModel):
    base_product = models.OneToOneField(BaseProduct, on_delete=models.CASCADE, related_name='book_product', verbose_name="Produit de base")
    author = models.CharField(max_length=255, verbose_name="Auteur")
    isbn = models.CharField(max_length=13, null=True, blank=True, verbose_name="ISBN")
    genre = models.CharField(max_length=100, verbose_name="Genre", help_text="Exemple : Poésie")
    publisher = models.CharField(max_length=255, verbose_name="Éditeur", help_text="Exemple : Plume d’Or")
    publication_date = models.DateField(null=True, blank=True, verbose_name="Parution", help_text="Exemple : Mars 2025")
    pages = models.PositiveIntegerField(verbose_name="Pages", help_text="Exemple : 180")
    language = models.CharField(max_length=50, verbose_name="Langue", help_text="Exemple : Français")
    format = models.CharField(max_length=50, verbose_name="Format", help_text="Exemple : Poche")
    cover = models.ImageField(upload_to='books/covers/', null=True, blank=True, verbose_name="Couverture")

    class Meta:
        verbose_name = "Produit livre"
        verbose_name_plural = "Produits livres"
        indexes = [models.Index(fields=['isbn']), models.Index(fields=['author'])]

    def __str__(self):
        return f"{self.base_product.name} par {self.author}"

    def clean(self):
        if self.base_product.discount_price and self.base_product.discount_price >= self.base_product.price:
            raise ValidationError("Le prix réduit doit être inférieur au prix de base.")
        if self.base_product and self.base_product.has_linked_product() and not hasattr(self.base_product, 'book_product'):
            raise ValidationError("Ce produit de base est déjà lié à un autre produit spécifique.")

    @property
    def physical_price(self):
        return self.base_product.discount_price if self.base_product.discount_price is not None else self.base_product.price


class BookPDF(BaseModel):
    book_product = models.OneToOneField(Book, on_delete=models.CASCADE, related_name='pdf', verbose_name="Livre associé")
    pdf_file = models.FileField(upload_to='books/pdfs/', null=True, blank=True, verbose_name="Fichier PDF")
    pdf_price = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True, verbose_name="Prix du PDF")
    is_free = models.BooleanField(default=False, verbose_name="Gratuit", help_text="Indique si le PDF est gratuit")

    class Meta:
        verbose_name = "PDF de livre"
        verbose_name_plural = "PDFs de livres"

    def __str__(self):
        return f"PDF de {self.book_product}"

    def clean(self):
        if self.is_free and not self.pdf_file:
            raise ValidationError("Un fichier PDF est requis si le PDF est gratuit.")
        if self.pdf_price is not None and self.pdf_price < 0:
            raise ValidationError("Le prix du PDF ne peut pas être négatif.")

# ======= PlanAbonnement : Modèle des plans d'abonnement =======
class PlanAbonnement(BaseModel):
    nom = models.CharField(max_length=100, verbose_name="Nom du plan")
    temps = models.PositiveIntegerField(verbose_name="Durée (en jours)", help_text="Durée en jours de l'abonnement")
    prix = models.DecimalField(max_digits=10, decimal_places=2, verbose_name="Prix")
    devise = models.ForeignKey('utils.Devise', on_delete=models.SET_NULL, null=True, verbose_name="Devise")

    class Meta:
        verbose_name = "Plan d'abonnement"
        verbose_name_plural = "Plans d'abonnement"
        unique_together = [['nom', 'temps']]

    def __str__(self):
        return f"{self.nom} ({self.temps} jours - {self.prix} {self.devise.code if self.devise else ''})"

    def clean(self):
        if self.prix < 0:
            raise ValidationError("Le prix ne peut pas être négatif.")
        if self.temps <= 0:
            raise ValidationError("La durée doit être positive.")

# ======= Abonnement : Modèle des abonnements =======
class Abonnement(BaseModel):
    user = models.ForeignKey(User, on_delete=models.CASCADE, verbose_name="Utilisateur", related_name="abonnements")
    plan = models.ForeignKey(PlanAbonnement, on_delete=models.SET_NULL, null=True, verbose_name="Plan")
    payment = models.ForeignKey('payement.Payment', on_delete=models.SET_NULL, null=True, verbose_name="Paiement", related_name="abonnements")
    code = models.CharField(max_length=8, unique=True, verbose_name="Code d'abonnement", editable=False)
    date_debut = models.DateTimeField(auto_now_add=True, verbose_name="Date de début")
    date_expiration = models.DateTimeField(verbose_name="Date d'expiration", blank=True)
    actif = models.BooleanField(default=True, verbose_name="Actif")

    class Meta:
        verbose_name = "Abonnement"
        verbose_name_plural = "Abonnements"
        indexes = [models.Index(fields=['code'])]

    def generate_code(self):
        code = ''.join(random.choices(string.digits, k=8))
        while Abonnement.objects.filter(code=code).exists():
            code = ''.join(random.choices(string.digits, k=8))
        return code

    def calculate_expiration(self):
        return self.date_debut + timezone.timedelta(days=self.plan.temps) if self.plan else self.date_debut

    def save(self, *args, **kwargs):
        if not self.code:
            self.code = self.generate_code()
        if not self.date_expiration:
            self.date_expiration = self.calculate_expiration()
        super().save(*args, **kwargs)

    @property
    def is_expired(self):
        return timezone.now() > self.date_expiration

    def __str__(self):
        return f"Abonnement {self.code} - {self.user.email} ({self.plan.nom if self.plan else 'Sans plan'})"