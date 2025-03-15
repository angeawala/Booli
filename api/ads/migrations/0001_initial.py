# Generated by Django 5.1.6 on 2025-03-14 22:13

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Entreprise',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('nom', models.CharField(max_length=255)),
                ('image', models.ImageField(upload_to='entreprises/')),
                ('email', models.EmailField(max_length=254, unique=True)),
                ('horaire', models.TextField(help_text='Ex: Lundi-Vendredi: 08h-18h')),
                ('services', models.TextField(help_text='Liste des services proposés')),
                ('adresse', models.CharField(max_length=255)),
                ('telephone', models.CharField(max_length=20)),
                ('site_web', models.URLField(blank=True, null=True)),
            ],
        ),
    ]
