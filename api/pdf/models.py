# pdf/models.py
from django.db import models
from django.core.exceptions import ValidationError
from core.models import BaseModel
from users.models import CustomUser
from books.models import Book
import uuid

class BookPDF(BaseModel):
    book = models.ForeignKey(Book, on_delete=models.CASCADE, related_name="pdfs", verbose_name="Livre")
    is_free = models.BooleanField(default=False, verbose_name="Gratuit")
    file = models.FileField(upload_to='pdfs/', verbose_name="Fichier PDF")
    prix = models.JSONField(null=True, blank=True, verbose_name="Prix")  # { "valeur": 500, "devise": "FCFA" }

    class Meta:
        verbose_name = "PDF de livre"
        verbose_name_plural = "PDFs de livres"

    def clean(self):
        if not self.is_free and not self.prix:
            raise ValidationError("Un PDF non gratuit doit avoir un prix")
        if self.is_free and self.prix:
            raise ValidationError("Un PDF gratuit ne doit pas avoir de prix")

    def __str__(self):
        return f"PDF de {self.book}"

class DownloadLink(BaseModel):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name="download_links", verbose_name="Utilisateur")
    book_pdf = models.ForeignKey(BookPDF, on_delete=models.CASCADE, related_name="download_links", verbose_name="PDF")
    link = models.CharField(max_length=255, unique=True, verbose_name="Lien", default=uuid.uuid4)
    download_limit = models.PositiveIntegerField(default=5, verbose_name="Limite de téléchargements")
    downloads_used = models.PositiveIntegerField(default=0, verbose_name="Téléchargements utilisés")

    class Meta:
        verbose_name = "Lien de téléchargement"
        verbose_name_plural = "Liens de téléchargement"

    def __str__(self):
        return f"Lien pour {self.book_pdf} ({self.user})"