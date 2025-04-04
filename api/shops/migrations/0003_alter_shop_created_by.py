# Generated by Django 5.1.6 on 2025-04-05 12:12

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('shops', '0002_alter_shop_updated_by_alter_shopcategory_created_by_and_more'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.AlterField(
            model_name='shop',
            name='created_by',
            field=models.ForeignKey(blank=True, editable=False, help_text='Utilisateur ayant créé l’entrée.', null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='%(app_label)s_%(class)s_created', to=settings.AUTH_USER_MODEL, verbose_name='Créé par'),
        ),
    ]
