# Generated by Django 5.1.6 on 2025-03-21 11:32

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('category', '0001_initial'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.AddField(
            model_name='category',
            name='created_by',
            field=models.ForeignKey(blank=True, editable=False, help_text='Utilisateur ayant créé l’entrée.', null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='%(class)s_created', to=settings.AUTH_USER_MODEL, verbose_name='Créé par'),
        ),
        migrations.AddField(
            model_name='category',
            name='updated_by',
            field=models.ForeignKey(blank=True, default=None, editable=False, help_text='Utilisateur ayant mis à jour l’entrée.', null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='%(class)s_updated', to=settings.AUTH_USER_MODEL, verbose_name='Mis à jour par'),
        ),
        migrations.AddField(
            model_name='subcategory',
            name='category',
            field=models.ForeignKey(help_text='Catégorie parent (null si supprimée).', null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='subcategories', to='category.category', verbose_name='Catégorie parent'),
        ),
        migrations.AddField(
            model_name='subcategory',
            name='created_by',
            field=models.ForeignKey(blank=True, editable=False, help_text='Utilisateur ayant créé l’entrée.', null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='%(class)s_created', to=settings.AUTH_USER_MODEL, verbose_name='Créé par'),
        ),
        migrations.AddField(
            model_name='subcategory',
            name='updated_by',
            field=models.ForeignKey(blank=True, default=None, editable=False, help_text='Utilisateur ayant mis à jour l’entrée.', null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='%(class)s_updated', to=settings.AUTH_USER_MODEL, verbose_name='Mis à jour par'),
        ),
        migrations.AddIndex(
            model_name='category',
            index=models.Index(fields=['category_type'], name='category_ca_categor_c560a8_idx'),
        ),
        migrations.AddIndex(
            model_name='category',
            index=models.Index(fields=['name'], name='category_ca_name_654722_idx'),
        ),
        migrations.AlterUniqueTogether(
            name='category',
            unique_together={('name', 'category_type')},
        ),
        migrations.AddIndex(
            model_name='subcategory',
            index=models.Index(fields=['name'], name='category_su_name_c55e65_idx'),
        ),
    ]
