# Generated by Django 5.1.6 on 2025-03-14 22:13

import django.utils.timezone
import uuid
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Devise',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, help_text="Identifiant unique de l'entrée (UUID).", primary_key=True, serialize=False, verbose_name='Identifiant')),
                ('created_at', models.DateTimeField(default=django.utils.timezone.now, editable=False, help_text="Date et heure de création de l'entrée.", verbose_name='Date de création')),
                ('updated_at', models.DateTimeField(auto_now=True, help_text='Date et heure de la dernière mise à jour.', verbose_name='Date de mise à jour')),
                ('code', models.CharField(max_length=3, unique=True, verbose_name='Code')),
                ('name', models.CharField(max_length=50, verbose_name='Nom')),
            ],
            options={
                'verbose_name': 'Devise',
                'verbose_name_plural': 'Devises',
            },
        ),
        migrations.CreateModel(
            name='ExchangeRate',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, help_text="Identifiant unique de l'entrée (UUID).", primary_key=True, serialize=False, verbose_name='Identifiant')),
                ('created_at', models.DateTimeField(default=django.utils.timezone.now, editable=False, help_text="Date et heure de création de l'entrée.", verbose_name='Date de création')),
                ('updated_at', models.DateTimeField(auto_now=True, help_text='Date et heure de la dernière mise à jour.', verbose_name='Date de mise à jour')),
                ('rate', models.DecimalField(decimal_places=4, max_digits=10, verbose_name='Taux')),
            ],
            options={
                'verbose_name': 'Taux de change',
                'verbose_name_plural': 'Taux de change',
            },
        ),
        migrations.CreateModel(
            name='Invoice',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, help_text="Identifiant unique de l'entrée (UUID).", primary_key=True, serialize=False, verbose_name='Identifiant')),
                ('created_at', models.DateTimeField(default=django.utils.timezone.now, editable=False, help_text="Date et heure de création de l'entrée.", verbose_name='Date de création')),
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
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, help_text="Identifiant unique de l'entrée (UUID).", primary_key=True, serialize=False, verbose_name='Identifiant')),
                ('created_at', models.DateTimeField(default=django.utils.timezone.now, editable=False, help_text="Date et heure de création de l'entrée.", verbose_name='Date de création')),
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
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, help_text="Identifiant unique de l'entrée (UUID).", primary_key=True, serialize=False, verbose_name='Identifiant')),
                ('created_at', models.DateTimeField(default=django.utils.timezone.now, editable=False, help_text="Date et heure de création de l'entrée.", verbose_name='Date de création')),
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
