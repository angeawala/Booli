# Generated by Django 5.1.6 on 2025-03-09 13:56

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Category',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100, unique=True, verbose_name='Nom')),
                ('icon', models.CharField(blank=True, max_length=50, null=True, verbose_name='Icône (classe FontAwesome)')),
                ('image', models.ImageField(blank=True, null=True, upload_to='categories/', verbose_name='Image')),
                ('is_electronic', models.BooleanField(default=False, verbose_name='Est électronique')),
            ],
            options={
                'verbose_name': 'Catégorie',
                'verbose_name_plural': 'Catégories',
            },
        ),
        migrations.CreateModel(
            name='SubCategory',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100, verbose_name='Nom')),
                ('image', models.ImageField(blank=True, null=True, upload_to='subcategories/', verbose_name='Image')),
                ('category', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='subcategories', to='category.category', verbose_name='Catégorie parent')),
            ],
            options={
                'verbose_name': 'Sous-catégorie',
                'verbose_name_plural': 'Sous-catégories',
                'unique_together': {('category', 'name')},
            },
        ),
    ]
