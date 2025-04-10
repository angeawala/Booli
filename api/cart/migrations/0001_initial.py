# Generated by Django 5.1.6 on 2025-04-01 10:46

import django.core.validators
import django.db.models.deletion
import django.utils.timezone
import uuid
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('utils', '0002_rename_ville_adresse_city_and_more'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Cart',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, help_text='Identifiant unique (UUID v4) non modifiable.', primary_key=True, serialize=False, verbose_name='Identifiant')),
                ('updated_at', models.DateTimeField(auto_now=True, help_text='Date et heure de la dernière mise à jour.', verbose_name='Date de mise à jour')),
                ('created_at', models.DateTimeField(auto_now_add=True, verbose_name='Créé le')),
                ('created_by', models.ForeignKey(blank=True, editable=False, help_text='Utilisateur ayant créé l’entrée.', null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='%(class)s_created', to=settings.AUTH_USER_MODEL, verbose_name='Créé par')),
                ('devise', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='utils.devise', verbose_name='Devise choisie')),
                ('updated_by', models.ForeignKey(blank=True, default=None, editable=False, help_text='Utilisateur ayant mis à jour l’entrée.', null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='%(class)s_updated', to=settings.AUTH_USER_MODEL, verbose_name='Mis à jour par')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='carts', to=settings.AUTH_USER_MODEL, verbose_name='Utilisateur')),
            ],
            options={
                'verbose_name': 'Panier',
                'verbose_name_plural': 'Paniers',
                'ordering': ['-created_at'],
            },
        ),
        migrations.CreateModel(
            name='CartItem',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, help_text='Identifiant unique (UUID v4) non modifiable.', primary_key=True, serialize=False, verbose_name='Identifiant')),
                ('created_at', models.DateTimeField(default=django.utils.timezone.now, editable=False, help_text='Date et heure de création (non modifiable).', verbose_name='Date de création')),
                ('updated_at', models.DateTimeField(auto_now=True, help_text='Date et heure de la dernière mise à jour.', verbose_name='Date de mise à jour')),
                ('product', models.CharField(max_length=36, verbose_name='Produit (ID)')),
                ('variant', models.CharField(blank=True, max_length=36, null=True, verbose_name='Variante (ID)')),
                ('quantity', models.PositiveIntegerField(validators=[django.core.validators.MinValueValidator(1)], verbose_name='Quantité')),
                ('type', models.CharField(choices=[('commercial', 'Commercial'), ('pharmacy', 'Pharmacy'), ('book', 'Book'), ('engros', 'Engros'), ('pdf', 'PDF')], max_length=20, verbose_name='Type de produit')),
                ('prix', models.JSONField(default=dict, verbose_name='Prix calculé')),
                ('cart', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='items', to='cart.cart', verbose_name='Panier')),
                ('created_by', models.ForeignKey(blank=True, editable=False, help_text='Utilisateur ayant créé l’entrée.', null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='%(class)s_created', to=settings.AUTH_USER_MODEL, verbose_name='Créé par')),
                ('updated_by', models.ForeignKey(blank=True, default=None, editable=False, help_text='Utilisateur ayant mis à jour l’entrée.', null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='%(class)s_updated', to=settings.AUTH_USER_MODEL, verbose_name='Mis à jour par')),
            ],
            options={
                'verbose_name': 'Élément du panier',
                'verbose_name_plural': 'Éléments du panier',
                'ordering': ['created_at'],
            },
        ),
    ]
