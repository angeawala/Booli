# Generated by Django 5.1.6 on 2025-04-05 07:54

import django.utils.timezone
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('cart', '0002_alter_cart_created_by_alter_cart_updated_by_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='cart',
            name='session_key',
            field=models.CharField(blank=True, max_length=40, null=True),
        ),
        migrations.AlterField(
            model_name='cart',
            name='created_at',
            field=models.DateTimeField(default=django.utils.timezone.now, editable=False, help_text='Date et heure de création (non modifiable).', verbose_name='Date de création'),
        ),
    ]
