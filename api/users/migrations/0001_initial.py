# Generated by Django 5.1.6 on 2025-03-04 00:28

import django.db.models.deletion
import users.models
import uuid
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('auth', '0012_alter_user_first_name_max_length'),
    ]

    operations = [
        migrations.CreateModel(
            name='CustomUser',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('password', models.CharField(max_length=128, verbose_name='password')),
                ('last_login', models.DateTimeField(blank=True, null=True, verbose_name='last login')),
                ('is_superuser', models.BooleanField(default=False, help_text='Designates that this user has all permissions without explicitly assigning them.', verbose_name='superuser status')),
                ('email', models.EmailField(max_length=254, unique=True, verbose_name='Adresse email')),
                ('contact', models.CharField(blank=True, max_length=15, null=True, verbose_name='Numéro de contact')),
                ('first_name', models.CharField(max_length=50, verbose_name='Prénom')),
                ('last_name', models.CharField(max_length=50, verbose_name='Nom de famille')),
                ('country', models.CharField(max_length=100, verbose_name='Pays')),
                ('city', models.CharField(max_length=100, verbose_name='Ville')),
                ('birth_date', models.DateField(verbose_name='Date de naissance')),
                ('profession', models.CharField(blank=True, help_text='Optionnel, indiquez votre métier si vous le souhaitez.', max_length=100, null=True, verbose_name='Profession')),
                ('gender', models.CharField(choices=[('male', 'Masculin'), ('female', 'Féminin'), ('other', 'Autre')], max_length=10, verbose_name='Genre')),
                ('is_active', models.BooleanField(default=False, verbose_name='Compte actif')),
                ('date_joined', models.DateTimeField(auto_now_add=True, verbose_name='Date d’inscription')),
                ('is_staff', models.BooleanField(default=False, verbose_name='Membre du staff')),
                ('is_2fa_enabled', models.BooleanField(default=False, verbose_name='2FA activé')),
                ('groups', models.ManyToManyField(blank=True, help_text='The groups this user belongs to. A user will get all permissions granted to each of their groups.', related_name='user_set', related_query_name='user', to='auth.group', verbose_name='groups')),
                ('user_permissions', models.ManyToManyField(blank=True, help_text='Specific permissions for this user.', related_name='user_set', related_query_name='user', to='auth.permission', verbose_name='user permissions')),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='ActivationToken',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('token', models.UUIDField(default=uuid.uuid4, editable=False, unique=True, verbose_name='Jeton')),
                ('created_at', models.DateTimeField(auto_now_add=True, verbose_name='Créé le')),
                ('expires_at', models.DateTimeField(default=users.models.get_default_expiry, verbose_name='Expire le')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL, verbose_name='Utilisateur')),
            ],
        ),
        migrations.CreateModel(
            name='PasswordResetToken',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('token', models.UUIDField(default=uuid.uuid4, editable=False, unique=True, verbose_name='Jeton')),
                ('created_at', models.DateTimeField(auto_now_add=True, verbose_name='Créé le')),
                ('expires_at', models.DateTimeField(default=users.models.get_default_expiry, verbose_name='Expire le')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL, verbose_name='Utilisateur')),
            ],
        ),
        migrations.CreateModel(
            name='TwoFAToken',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('code', models.CharField(max_length=6, unique=True, verbose_name='Code 2FA')),
                ('created_at', models.DateTimeField(auto_now_add=True, verbose_name='Créé le')),
                ('expires_at', models.DateTimeField(default=users.models.get_default_expiry, verbose_name='Expire le')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL, verbose_name='Utilisateur')),
            ],
        ),
    ]
