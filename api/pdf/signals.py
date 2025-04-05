# pdf/signals.py
from django.db.models.signals import post_save, pre_delete
from django.dispatch import receiver
from .models import BookPDF

@receiver(post_save, sender=BookPDF)
def update_book_has_pdf(sender, instance, created, **kwargs):
    if created:
        instance.book.has_pdf = True
        instance.book.save(update_fields=['has_pdf'])

@receiver(pre_delete, sender=BookPDF)
def remove_book_has_pdf(sender, instance, **kwargs):
    instance.book.has_pdf = False
    instance.book.save(update_fields=['has_pdf'])