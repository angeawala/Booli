# subscriptions/signals.py
from django.db.models.signals import post_save
from django.dispatch import receiver
from .models import Subscription
from django.utils import timezone

@receiver(post_save, sender=Subscription)
def update_subscription_status(sender, instance, created, **kwargs):
    if instance.end_date and instance.end_date < timezone.now():
        instance.is_expired = True
        instance.is_active = False
        instance.save(update_fields=['is_expired', 'is_active'])
    elif created and instance.is_active:
        instance.start_date = timezone.now()
        instance.end_date = instance.start_date + timezone.timedelta(days=instance.plan.duree)
        instance.save(update_fields=['start_date', 'end_date'])