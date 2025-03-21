# Generated by Django 5.1.6 on 2025-03-21 11:32

import django.utils.timezone
import uuid
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Invoice',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, help_text='Identifiant unique (UUID v4) non modifiable.', primary_key=True, serialize=False, verbose_name='Identifiant')),
                ('created_at', models.DateTimeField(default=django.utils.timezone.now, editable=False, help_text='Date et heure de création (non modifiable).', verbose_name='Date de création')),
                ('updated_at', models.DateTimeField(auto_now=True, help_text='Date et heure de la dernière mise à jour.', verbose_name='Date de mise à jour')),
                ('invoice_number', models.CharField(max_length=50, unique=True, verbose_name='Numéro de facture')),
                ('amount', models.DecimalField(decimal_places=2, max_digits=10, verbose_name='Montant')),
                ('issue_date', models.DateTimeField(auto_now_add=True, verbose_name='Date d’émission')),
            ],
            options={
                'verbose_name': 'Facture',
                'verbose_name_plural': 'Factures',
            },
        ),
        migrations.CreateModel(
            name='Payment',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, help_text='Identifiant unique (UUID v4) non modifiable.', primary_key=True, serialize=False, verbose_name='Identifiant')),
                ('created_at', models.DateTimeField(default=django.utils.timezone.now, editable=False, help_text='Date et heure de création (non modifiable).', verbose_name='Date de création')),
                ('updated_at', models.DateTimeField(auto_now=True, help_text='Date et heure de la dernière mise à jour.', verbose_name='Date de mise à jour')),
                ('amount', models.DecimalField(decimal_places=2, max_digits=10, verbose_name='Montant')),
                ('payment_date', models.DateTimeField(auto_now_add=True, verbose_name='Date de paiement')),
                ('status', models.CharField(choices=[('pending', 'En attente'), ('completed', 'Complété'), ('failed', 'Échoué')], default='pending', max_length=20, verbose_name='Statut')),
            ],
            options={
                'verbose_name': 'Paiement',
                'verbose_name_plural': 'Paiements',
            },
        ),
        migrations.CreateModel(
            name='PaymentMethod',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, help_text='Identifiant unique (UUID v4) non modifiable.', primary_key=True, serialize=False, verbose_name='Identifiant')),
                ('created_at', models.DateTimeField(default=django.utils.timezone.now, editable=False, help_text='Date et heure de création (non modifiable).', verbose_name='Date de création')),
                ('updated_at', models.DateTimeField(auto_now=True, help_text='Date et heure de la dernière mise à jour.', verbose_name='Date de mise à jour')),
                ('name', models.CharField(max_length=100, verbose_name='Nom')),
                ('is_active', models.BooleanField(default=True, verbose_name='Actif')),
            ],
            options={
                'verbose_name': 'Méthode de paiement',
                'verbose_name_plural': 'Méthodes de paiement',
            },
        ),
    ]
