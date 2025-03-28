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
            name='Abonnement',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, help_text='Identifiant unique (UUID v4) non modifiable.', primary_key=True, serialize=False, verbose_name='Identifiant')),
                ('created_at', models.DateTimeField(default=django.utils.timezone.now, editable=False, help_text='Date et heure de création (non modifiable).', verbose_name='Date de création')),
                ('updated_at', models.DateTimeField(auto_now=True, help_text='Date et heure de la dernière mise à jour.', verbose_name='Date de mise à jour')),
                ('code', models.CharField(editable=False, max_length=8, unique=True, verbose_name="Code d'abonnement")),
                ('date_debut', models.DateTimeField(auto_now_add=True, verbose_name='Date de début')),
                ('date_expiration', models.DateTimeField(blank=True, verbose_name="Date d'expiration")),
                ('actif', models.BooleanField(default=True, verbose_name='Actif')),
            ],
            options={
                'verbose_name': 'Abonnement',
                'verbose_name_plural': 'Abonnements',
            },
        ),
        migrations.CreateModel(
            name='Book',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, help_text='Identifiant unique (UUID v4) non modifiable.', primary_key=True, serialize=False, verbose_name='Identifiant')),
                ('created_at', models.DateTimeField(default=django.utils.timezone.now, editable=False, help_text='Date et heure de création (non modifiable).', verbose_name='Date de création')),
                ('updated_at', models.DateTimeField(auto_now=True, help_text='Date et heure de la dernière mise à jour.', verbose_name='Date de mise à jour')),
                ('author', models.CharField(max_length=255, verbose_name='Auteur')),
                ('isbn', models.CharField(blank=True, max_length=13, null=True, verbose_name='ISBN')),
                ('genre', models.CharField(help_text='Exemple : Poésie', max_length=100, verbose_name='Genre')),
                ('publisher', models.CharField(help_text='Exemple : Plume d’Or', max_length=255, verbose_name='Éditeur')),
                ('publication_date', models.DateField(blank=True, help_text='Exemple : Mars 2025', null=True, verbose_name='Parution')),
                ('pages', models.PositiveIntegerField(help_text='Exemple : 180', verbose_name='Pages')),
                ('language', models.CharField(help_text='Exemple : Français', max_length=50, verbose_name='Langue')),
                ('format', models.CharField(help_text='Exemple : Poche', max_length=50, verbose_name='Format')),
                ('cover', models.ImageField(blank=True, null=True, upload_to='books/covers/', verbose_name='Couverture')),
            ],
            options={
                'verbose_name': 'Produit livre',
                'verbose_name_plural': 'Produits livres',
            },
        ),
        migrations.CreateModel(
            name='BookPDF',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, help_text='Identifiant unique (UUID v4) non modifiable.', primary_key=True, serialize=False, verbose_name='Identifiant')),
                ('created_at', models.DateTimeField(default=django.utils.timezone.now, editable=False, help_text='Date et heure de création (non modifiable).', verbose_name='Date de création')),
                ('updated_at', models.DateTimeField(auto_now=True, help_text='Date et heure de la dernière mise à jour.', verbose_name='Date de mise à jour')),
                ('pdf_file', models.FileField(blank=True, null=True, upload_to='books/pdfs/', verbose_name='Fichier PDF')),
                ('pdf_price', models.DecimalField(blank=True, decimal_places=2, max_digits=10, null=True, verbose_name='Prix du PDF')),
                ('is_free', models.BooleanField(default=False, help_text='Indique si le PDF est gratuit', verbose_name='Gratuit')),
            ],
            options={
                'verbose_name': 'PDF de livre',
                'verbose_name_plural': 'PDFs de livres',
            },
        ),
        migrations.CreateModel(
            name='PlanAbonnement',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, help_text='Identifiant unique (UUID v4) non modifiable.', primary_key=True, serialize=False, verbose_name='Identifiant')),
                ('created_at', models.DateTimeField(default=django.utils.timezone.now, editable=False, help_text='Date et heure de création (non modifiable).', verbose_name='Date de création')),
                ('updated_at', models.DateTimeField(auto_now=True, help_text='Date et heure de la dernière mise à jour.', verbose_name='Date de mise à jour')),
                ('nom', models.CharField(max_length=100, verbose_name='Nom du plan')),
                ('temps', models.PositiveIntegerField(help_text="Durée en jours de l'abonnement", verbose_name='Durée (en jours)')),
                ('prix', models.DecimalField(decimal_places=2, max_digits=10, verbose_name='Prix')),
            ],
            options={
                'verbose_name': "Plan d'abonnement",
                'verbose_name_plural': "Plans d'abonnement",
            },
        ),
    ]
