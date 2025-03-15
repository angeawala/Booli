from django.db import models
from django.utils import timezone
from django.contrib.auth import get_user_model
from django.core.validators import MinValueValidator, MaxValueValidator
from core.models import BaseModel
from category.models import Category, SubCategory
from marcher.models import Shop, Company, Doctor, Mark, Supermarket
from payement.models import Devise

User = get_user_model()

class BaseProduct(BaseModel):
    """
    Modèle de base concret pour tous les produits.
    """
    name = models.CharField(
        max_length=255,
        verbose_name="Nom",
        help_text="Nom du produit."
    )
    category = models.ForeignKey(
        Category,
        on_delete=models.SET_NULL,
        null=True,
        related_name='base_products',
        verbose_name="Catégorie",
        help_text="Catégorie principale du produit."
    )
    subcategory = models.ForeignKey(
        SubCategory,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name='base_products',
        verbose_name="Sous-catégorie",
        help_text="Sous-catégorie du produit (optionnel)."
    )
    price = models.DecimalField(
        max_digits=10,
        decimal_places=2,
        verbose_name="Prix",
        help_text="Prix de base du produit."
    )
    devise = models.ForeignKey(
        Devise,
        on_delete=models.SET_NULL,
        null=False,
        verbose_name="Devise",
        help_text="Devise de Gestion du produit")

    class Meta:
        verbose_name = "Produit de base"
        verbose_name_plural = "Produits de base"
        ordering = ['name']

    def __str__(self):
        return self.name

class ShopProduct(BaseModel):
    """
    Produit spécifique aux boutiques, lié à BaseProduct.
    """
    base_product = models.ForeignKey(
        BaseProduct,
        on_delete=models.CASCADE,
        related_name='shop_products',
        verbose_name="Produit de base",
        help_text="Produit de base auquel ce produit est rattaché."
    )
    shop = models.ForeignKey(
        Shop,
        on_delete=models.CASCADE,
        related_name='products',
        verbose_name="Boutique",
        help_text="Boutique à laquelle le produit est rattaché."
    )
    discount_price = models.DecimalField(
        max_digits=10,
        decimal_places=2,
        null=True,
        blank=True,
        verbose_name="Prix réduit",
        help_text="Prix après réduction (optionnel)."
    )
    stock = models.PositiveIntegerField(
        default=0,
        verbose_name="Stock",
        help_text="Quantité en stock."
    )
    expiration_date = models.DateTimeField(
        null=True,
        blank=True,
        verbose_name="Date d'expiration",
        help_text="Date après laquelle le produit n’est plus valide (optionnel)."
    )
    is_wholesale = models.BooleanField(
        default=False,
        verbose_name="Vente en gros",
        help_text="Indique si le produit est vendu en gros."
    )
    details = models.JSONField(
        default=dict,
        blank=True,
        verbose_name="Détails",
        help_text="Informations supplémentaires au format JSON (ex. {'taille': 'M'})."
    )

    class Meta:
        verbose_name = "Produit de boutique"
        verbose_name_plural = "Produits de boutique"

    def __str__(self):
        return f"{self.base_product.name} (Boutique: {self.shop.email})"

    def is_expired(self):
        if self.expiration_date:
            return timezone.now() > self.expiration_date
        return False

class BookProduct(BaseModel):
    """
    Produit spécifique aux livres, lié à BaseProduct.
    """
    base_product = models.ForeignKey(
        BaseProduct,
        on_delete=models.CASCADE,
        related_name='book_products',
        verbose_name="Produit de base",
        help_text="Produit de base auquel ce produit est rattaché."
    )
    company = models.ForeignKey(
        Company,
        on_delete=models.CASCADE,
        related_name='book_products',
        verbose_name="Compagnie",
        help_text="Compagnie publiant ou vendant le livre."
    )
    author = models.CharField(
        max_length=255,
        verbose_name="Auteur",
        help_text="Auteur du livre."
    )
    isbn = models.CharField(
        max_length=13,
        null=True,
        blank=True,
        verbose_name="ISBN",
        help_text="Numéro ISBN du livre (optionnel)."
    )
    is_free = models.BooleanField(
        default=False,
        verbose_name="Gratuit",
        help_text="Indique si le livre est disponible gratuitement en PDF."
    )
    discount_price = models.DecimalField(
        max_digits=10,
        decimal_places=2,
        null=True,
        blank=True,
        verbose_name="Prix réduit",
        help_text="Prix après réduction pour la version physique (optionnel)."
    )
    stock = models.PositiveIntegerField(
        default=0,
        verbose_name="Stock",
        help_text="Nombre de versions physiques en stock."
    )
    pdf_file = models.FileField(
        upload_to='books/pdfs/',
        null=True,
        blank=True,
        verbose_name="Fichier PDF",
        help_text="Fichier PDF du livre (si disponible)."
    )

    class Meta:
        verbose_name = "Produit livre"
        verbose_name_plural = "Produits livres"
class PharmacyProduct(BaseModel):
    """
    Produit spécifique à la pharmacopée, lié à BaseProduct.
    """
    base_product = models.ForeignKey(
        BaseProduct,
        on_delete=models.CASCADE,
        related_name='pharmacy_products',
        verbose_name="Produit de base",
        help_text="Produit de base auquel ce produit est rattaché."
    )
    doctor = models.ForeignKey(
        Doctor,
        on_delete=models.CASCADE,
        related_name='products',
        verbose_name="Docteur",
        help_text="Docteur proposant le produit."
    )
    discount_price = models.DecimalField(
        max_digits=10,
        decimal_places=2,
        null=True,
        blank=True,
        verbose_name="Prix réduit",
        help_text="Prix après réduction (optionnel)."
    )
    stock = models.PositiveIntegerField(
        default=0,
        verbose_name="Stock",
        help_text="Quantité en stock."
    )
    details = models.JSONField(
        default=dict,
        blank=True,
        verbose_name="Détails",
        help_text="Informations supplémentaires au format JSON (ex. {'dosage': '500mg'})."
    )

    class Meta:
        verbose_name = "Produit pharmacopée"
        verbose_name_plural = "Produits pharmacopée"

    def __str__(self):
        return f"{self.base_product.name} (Docteur: {self.doctor.email})"

class CompanyProduct(BaseModel):
    """
    Produit spécifique aux entreprises, lié à BaseProduct.
    """
    base_product = models.ForeignKey(
        BaseProduct,
        on_delete=models.CASCADE,
        related_name='company_products',
        verbose_name="Produit de base",
        help_text="Produit de base auquel ce produit est rattaché."
    )
    company = models.ForeignKey(
        Company,
        on_delete=models.CASCADE,
        related_name='products',
        verbose_name="Compagnie",
        help_text="Compagnie vendant le produit."
    )
    stock = models.PositiveIntegerField(
        default=0,
        verbose_name="Stock",
        help_text="Quantité en stock."
    )
    is_wholesale = models.BooleanField(
        default=True,
        verbose_name="Vente en gros",
        help_text="Toujours vrai pour les entreprises."
    )
    details = models.JSONField(
        default=dict,
        blank=True,
        verbose_name="Détails",
        help_text="Informations supplémentaires au format JSON (ex. {'poids': '10kg'})."
    )

    class Meta:
        verbose_name = "Produit d'entreprise"
        verbose_name_plural = "Produits d'entreprise"

    def __str__(self):
        return f"{self.base_product.name} (Compagnie: {self.company.email})"

class MarkProduct(BaseModel):
    """
    Produit spécifique aux marques, lié à BaseProduct.
    """
    base_product = models.ForeignKey(
        BaseProduct,
        on_delete=models.CASCADE,
        related_name='mark_products',
        verbose_name="Produit de base",
        help_text="Produit de base auquel ce produit est rattaché."
    )
    mark = models.ForeignKey(
        Mark,
        on_delete=models.CASCADE,
        related_name='products',
        verbose_name="Marque",
        help_text="Marque à laquelle le produit est rattaché."
    )
    stock = models.PositiveIntegerField(
        default=0,
        verbose_name="Stock",
        help_text="Quantité en stock."
    )
    is_active = models.BooleanField(
        default=False,
        verbose_name="Actif",
        help_text="Indique si le produit est activé par un admin."
    )
    details = models.JSONField(
        default=dict,
        blank=True,
        verbose_name="Détails",
        help_text="Informations supplémentaires au format JSON (ex. {'matériau': 'bois'})."
    )

    class Meta:
        verbose_name = "Produit de marque"
        verbose_name_plural = "Produits de marque"

    def __str__(self):
        return f"{self.base_product.name} (Marque: {self.mark.email})"

class SupermarketProduct(BaseModel):
    """
    Produit spécifique aux supermarchés, lié à BaseProduct.
    """
    base_product = models.ForeignKey(
        BaseProduct,
        on_delete=models.CASCADE,
        related_name='supermarket_products',
        verbose_name="Produit de base",
        help_text="Produit de base auquel ce produit est rattaché."
    )
    supermarket = models.ForeignKey(
        Supermarket,
        on_delete=models.CASCADE,
        related_name='products',
        verbose_name="Supermarché",
        help_text="Supermarché vendant le produit."
    )
    discount_price = models.DecimalField(
        max_digits=10,
        decimal_places=2,
        null=True,
        blank=True,
        verbose_name="Prix réduit",
        help_text="Prix après réduction (optionnel)."
    )
    stock = models.PositiveIntegerField(
        default=0,
        verbose_name="Stock",
        help_text="Quantité en stock."
    )
    expiration_date = models.DateTimeField(
        null=True,
        blank=True,
        verbose_name="Date d'expiration",
        help_text="Date après laquelle le produit n’est plus valide (optionnel)."
    )
    is_wholesale = models.BooleanField(
        default=False,
        verbose_name="Vente en gros",
        help_text="Indique si le produit est vendu en gros."
    )
    details = models.JSONField(
        default=dict,
        blank=True,
        verbose_name="Détails",
        help_text="Informations supplémentaires au format JSON (ex. {'poids': '500g'})."
    )

    class Meta:
        verbose_name = "Produit de supermarché"
        verbose_name_plural = "Produits de supermarché"

    def __str__(self):
        return f"{self.base_product.name} (Supermarché: {self.supermarket.email})"

    def is_expired(self):
        if self.expiration_date:
            return timezone.now() > self.expiration_date
        return False

class Review(BaseModel):
    """
    Modèle pour les avis, avec relations directes vers les produits spécifiques.
    """
    shop_product = models.ForeignKey(
        ShopProduct,
        on_delete=models.CASCADE,
        null=True,
        blank=True,
        related_name='reviews',
        verbose_name="Produit de boutique",
        help_text="Produit de boutique auquel l’avis est rattaché (optionnel)."
    )
    book_product = models.ForeignKey(
        BookProduct,
        on_delete=models.CASCADE,
        null=True,
        blank=True,
        related_name='reviews',
        verbose_name="Produit livre",
        help_text="Produit livre auquel l’avis est rattaché (optionnel)."
    )
    pharmacy_product = models.ForeignKey(
        PharmacyProduct,
        on_delete=models.CASCADE,
        null=True,
        blank=True,
        related_name='reviews',
        verbose_name="Produit pharmacopée",
        help_text="Produit pharmacopée auquel l’avis est rattaché (optionnel)."
    )
    company_product = models.ForeignKey(
        CompanyProduct,
        on_delete=models.CASCADE,
        null=True,
        blank=True,
        related_name='reviews',
        verbose_name="Produit d'entreprise",
        help_text="Produit d’entreprise auquel l’avis est rattaché (optionnel)."
    )
    mark_product = models.ForeignKey(
        MarkProduct,
        on_delete=models.CASCADE,
        null=True,
        blank=True,
        related_name='reviews',
        verbose_name="Produit de marque",
        help_text="Produit de marque auquel l’avis est rattaché (optionnel)."
    )
    supermarket_product = models.ForeignKey(
        SupermarketProduct,
        on_delete=models.CASCADE,
        null=True,
        blank=True,
        related_name='reviews',
        verbose_name="Produit de supermarché",
        help_text="Produit de supermarché auquel l’avis est rattaché (optionnel)."
    )
    rating = models.PositiveSmallIntegerField(
        validators=[MinValueValidator(1), MaxValueValidator(5)],
        verbose_name="Note",
        help_text="Note de 1 à 5 étoiles."
    )
    comment = models.TextField(
        blank=True,
        verbose_name="Commentaire",
        help_text="Commentaire laissé par l’utilisateur (optionnel)."
    )

    class Meta:
        verbose_name = "Avis"
        verbose_name_plural = "Avis"
        ordering = ['-created_at']

    def __str__(self):
        product = (self.shop_product or self.book_product or self.pharmacy_product or 
                   self.company_product or self.mark_product or self.supermarket_product)
        return f"Avis {self.rating}/5 pour {product}"

class Promotion(BaseModel):
    """
    Modèle pour les promotions, avec relations directes vers les produits spécifiques.
    """

    shop_product = models.ForeignKey(
        ShopProduct,
        on_delete=models.CASCADE,
        null=True,
        blank=True,
        related_name='promotions',
        verbose_name="Produit de boutique",
        help_text="Produit de boutique concerné par la promotion (optionnel)."
    )
    company_product = models.ForeignKey(
        CompanyProduct,
        on_delete=models.CASCADE,
        null=True,
        blank=True,
        related_name='promotions',
        verbose_name="Produit d'entreprise",
        help_text="Produit d’entreprise concerné par la promotion (optionnel)."
    )
    supermarket_product = models.ForeignKey(
        SupermarketProduct,
        on_delete=models.CASCADE,
        null=True,
        blank=True,
        related_name='promotions',
        verbose_name="Produit de supermarché",
        help_text="Produit de supermarché concerné par la promotion (optionnel)."
    )
    discount_percentage = models.DecimalField(
        max_digits=5,
        decimal_places=2,
        verbose_name="Pourcentage de réduction",
        help_text="Pourcentage de réduction appliqué (ex. 20.00 pour 20%)."
    )
    start_date = models.DateTimeField(
        verbose_name="Date de début",
        help_text="Date de début de la promotion."
    )
    end_date = models.DateTimeField(
        verbose_name="Date de fin",
        help_text="Date de fin de la promotion."
    )

    class Meta:
        verbose_name = "Promotion"
        verbose_name_plural = "Promotions"
        ordering = ['-start_date']

    def __str__(self):
        return f"Promotion {self.discount_percentage}% ({self.entity.email})"

    def is_active(self):
        now = timezone.now()
        return self.start_date <= now <= self.end_date

class Cart(BaseModel):
    """
    Modèle pour représenter un panier d’achat d’un utilisateur.
    """
    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name='carts',
        verbose_name="Utilisateur",
        help_text="Utilisateur auquel appartient le panier."
    )
    is_active = models.BooleanField(
        default=True,
        verbose_name="Actif",
        help_text="Indique si le panier est actuellement utilisé."
    )

    class Meta:
        verbose_name = "Panier"
        verbose_name_plural = "Paniers"
        ordering = ['-created_at']
        constraints = [
            models.UniqueConstraint(
                fields=['user', 'is_active'],
                condition=models.Q(is_active=True),
                name='unique_active_cart_per_user'
            )
        ]

    def __str__(self):
        return f"Panier de {self.user.username} ({'actif' if self.is_active else 'inactif'})"

    def total_price(self):
        return sum(item.total_price() for item in self.items.all())

class CartItem(BaseModel):
    """
    Modèle pour représenter un élément dans un panier, avec relations directes.
    """
    cart = models.ForeignKey(
        Cart,
        on_delete=models.CASCADE,
        related_name='items',
        verbose_name="Panier",
        help_text="Panier auquel cet élément appartient."
    )
    shop_product = models.ForeignKey(
        ShopProduct,
        on_delete=models.CASCADE,
        null=True,
        blank=True,
        related_name='cart_items',
        verbose_name="Produit de boutique",
        help_text="Produit de boutique dans le panier (optionnel)."
    )
    book_product = models.ForeignKey(
        BookProduct,
        on_delete=models.CASCADE,
        null=True,
        blank=True,
        related_name='cart_items',
        verbose_name="Produit livre",
        help_text="Produit livre dans le panier (optionnel)."
    )
    pharmacy_product = models.ForeignKey(
        PharmacyProduct,
        on_delete=models.CASCADE,
        null=True,
        blank=True,
        related_name='cart_items',
        verbose_name="Produit pharmacopée",
        help_text="Produit pharmacopée dans le panier (optionnel)."
    )
    company_product = models.ForeignKey(
        CompanyProduct,
        on_delete=models.CASCADE,
        null=True,
        blank=True,
        related_name='cart_items',
        verbose_name="Produit d'entreprise",
        help_text="Produit d’entreprise dans le panier (optionnel)."
    )
    mark_product = models.ForeignKey(
        MarkProduct,
        on_delete=models.CASCADE,
        null=True,
        blank=True,
        related_name='cart_items',
        verbose_name="Produit de marque",
        help_text="Produit de marque dans le panier (optionnel)."
    )
    supermarket_product = models.ForeignKey(
        SupermarketProduct,
        on_delete=models.CASCADE,
        null=True,
        blank=True,
        related_name='cart_items',
        verbose_name="Produit de supermarché",
        help_text="Produit de supermarché dans le panier (optionnel)."
    )
    quantity = models.PositiveIntegerField(
        default=1,
        verbose_name="Quantité",
        help_text="Quantité du produit dans le panier."
    )

    class Meta:
        verbose_name = "Élément de panier"
        verbose_name_plural = "Éléments de panier"
        ordering = ['-created_at']

    def __str__(self):
        product = (self.shop_product or self.book_product or self.pharmacy_product or 
                   self.company_product or self.mark_product or self.supermarket_product)
        return f"{self.quantity} x {product} dans le panier {self.cart}"

    def total_price(self):
        product = (self.shop_product or self.book_product or self.pharmacy_product or 
                   self.company_product or self.mark_product or self.supermarket_product)
        if hasattr(product, 'discount_price') and product.discount_price:
            return self.quantity * product.discount_price
        return self.quantity * product.base_product.price
    
class Commande(BaseModel):
    """
    Modèle pour représenter une commande passée par un utilisateur.
    """
    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name='commandes',
        verbose_name="Utilisateur",
        help_text="Utilisateur qui a passé la commande."
    )
    cart = models.ForeignKey(
        Cart,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name='commandes',
        verbose_name="Panier",
        help_text="Panier associé à cette commande (optionnel après finalisation)."
    )
    total_amount = models.DecimalField(
        max_digits=10,
        decimal_places=2,
        verbose_name="Montant total",
        help_text="Montant total de la commande."
    )
    status = models.CharField(
        max_length=20,
        choices=(
            ('en_attente', 'En attente'),
            ('en_cours', 'En cours'),
            ('completee', 'Complétée'),
            ('annulee', 'Annulée'),
        ),
        default='en_attente',
        verbose_name="Statut",
        help_text="Statut actuel de la commande."
    )
    commande_date = models.DateTimeField(
        default=timezone.now,
        verbose_name="Date de commande",
        help_text="Date et heure de création de la commande."
    )

    class Meta:
        verbose_name = "Commande"
        verbose_name_plural = "Commandes"
        ordering = ['-commande_date']

    def __str__(self):
        return f"Commande {self.id} de {self.user.username} ({self.status})"