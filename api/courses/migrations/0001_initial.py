# Generated by Django 5.1.6 on 2025-04-01 18:54

import django.core.validators
import django.db.models.deletion
import django.utils.timezone
import uuid
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Category',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, help_text='Identifiant unique (UUID v4) non modifiable.', primary_key=True, serialize=False, verbose_name='Identifiant')),
                ('created_at', models.DateTimeField(default=django.utils.timezone.now, editable=False, help_text='Date et heure de création (non modifiable).', verbose_name='Date de création')),
                ('updated_at', models.DateTimeField(auto_now=True, help_text='Date et heure de la dernière mise à jour.', verbose_name='Date de mise à jour')),
                ('name', models.CharField(max_length=100, unique=True, verbose_name='Nom')),
                ('description', models.TextField(blank=True, verbose_name='Description')),
                ('icon', models.ImageField(blank=True, null=True, upload_to='course_categories/', verbose_name='Icône')),
                ('slug', models.SlugField(unique=True, verbose_name='Slug')),
                ('created_by', models.ForeignKey(blank=True, editable=False, help_text='Utilisateur ayant créé l’entrée.', null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='%(app_label)s_%(class)s_created', to=settings.AUTH_USER_MODEL, verbose_name='Créé par')),
                ('updated_by', models.ForeignKey(blank=True, default=None, editable=False, help_text='Utilisateur ayant mis à jour l’entrée.', null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='%(app_label)s_%(class)s_updated', to=settings.AUTH_USER_MODEL, verbose_name='Mis à jour par')),
            ],
            options={
                'verbose_name': 'Catégorie de cours',
                'verbose_name_plural': 'Catégories de cours',
            },
        ),
        migrations.CreateModel(
            name='Course',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, help_text='Identifiant unique (UUID v4) non modifiable.', primary_key=True, serialize=False, verbose_name='Identifiant')),
                ('created_at', models.DateTimeField(default=django.utils.timezone.now, editable=False, help_text='Date et heure de création (non modifiable).', verbose_name='Date de création')),
                ('updated_at', models.DateTimeField(auto_now=True, help_text='Date et heure de la dernière mise à jour.', verbose_name='Date de mise à jour')),
                ('title', models.CharField(max_length=200, verbose_name='Titre')),
                ('description', models.TextField(verbose_name='Description')),
                ('image', models.ImageField(blank=True, null=True, upload_to='courses/', verbose_name='Image')),
                ('video', models.FileField(blank=True, null=True, upload_to='course_videos/', verbose_name="Vidéo d'introduction")),
                ('is_free', models.BooleanField(default=False, verbose_name='Gratuit')),
                ('is_certificated', models.BooleanField(default=False, verbose_name='Certifié')),
                ('price', models.DecimalField(blank=True, decimal_places=2, max_digits=10, null=True, verbose_name='Prix')),
                ('category', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, related_name='courses', to='courses.category', verbose_name='Catégorie')),
                ('created_by', models.ForeignKey(blank=True, editable=False, help_text='Utilisateur ayant créé l’entrée.', null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='%(app_label)s_%(class)s_created', to=settings.AUTH_USER_MODEL, verbose_name='Créé par')),
                ('updated_by', models.ForeignKey(blank=True, default=None, editable=False, help_text='Utilisateur ayant mis à jour l’entrée.', null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='%(app_label)s_%(class)s_updated', to=settings.AUTH_USER_MODEL, verbose_name='Mis à jour par')),
            ],
            options={
                'verbose_name': 'Cours',
                'verbose_name_plural': 'Cours',
            },
        ),
        migrations.CreateModel(
            name='Enrollment',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, help_text='Identifiant unique (UUID v4) non modifiable.', primary_key=True, serialize=False, verbose_name='Identifiant')),
                ('created_at', models.DateTimeField(default=django.utils.timezone.now, editable=False, help_text='Date et heure de création (non modifiable).', verbose_name='Date de création')),
                ('updated_at', models.DateTimeField(auto_now=True, help_text='Date et heure de la dernière mise à jour.', verbose_name='Date de mise à jour')),
                ('progress', models.FloatField(default=0, validators=[django.core.validators.MinValueValidator(0), django.core.validators.MaxValueValidator(100)], verbose_name='Progression (%)')),
                ('course', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='enrollments', to='courses.course', verbose_name='Cours')),
                ('created_by', models.ForeignKey(blank=True, editable=False, help_text='Utilisateur ayant créé l’entrée.', null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='%(app_label)s_%(class)s_created', to=settings.AUTH_USER_MODEL, verbose_name='Créé par')),
                ('updated_by', models.ForeignKey(blank=True, default=None, editable=False, help_text='Utilisateur ayant mis à jour l’entrée.', null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='%(app_label)s_%(class)s_updated', to=settings.AUTH_USER_MODEL, verbose_name='Mis à jour par')),
            ],
            options={
                'verbose_name': 'Inscription',
                'verbose_name_plural': 'Inscriptions',
            },
        ),
        migrations.CreateModel(
            name='Module',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, help_text='Identifiant unique (UUID v4) non modifiable.', primary_key=True, serialize=False, verbose_name='Identifiant')),
                ('created_at', models.DateTimeField(default=django.utils.timezone.now, editable=False, help_text='Date et heure de création (non modifiable).', verbose_name='Date de création')),
                ('updated_at', models.DateTimeField(auto_now=True, help_text='Date et heure de la dernière mise à jour.', verbose_name='Date de mise à jour')),
                ('name', models.CharField(max_length=100, verbose_name='Nom')),
                ('is_free', models.BooleanField(default=False, verbose_name='Gratuit')),
                ('course', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='modules', to='courses.course', verbose_name='Cours')),
                ('created_by', models.ForeignKey(blank=True, editable=False, help_text='Utilisateur ayant créé l’entrée.', null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='%(app_label)s_%(class)s_created', to=settings.AUTH_USER_MODEL, verbose_name='Créé par')),
                ('updated_by', models.ForeignKey(blank=True, default=None, editable=False, help_text='Utilisateur ayant mis à jour l’entrée.', null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='%(app_label)s_%(class)s_updated', to=settings.AUTH_USER_MODEL, verbose_name='Mis à jour par')),
            ],
            options={
                'verbose_name': 'Module',
                'verbose_name_plural': 'Modules',
            },
        ),
        migrations.CreateModel(
            name='Chapter',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, help_text='Identifiant unique (UUID v4) non modifiable.', primary_key=True, serialize=False, verbose_name='Identifiant')),
                ('created_at', models.DateTimeField(default=django.utils.timezone.now, editable=False, help_text='Date et heure de création (non modifiable).', verbose_name='Date de création')),
                ('updated_at', models.DateTimeField(auto_now=True, help_text='Date et heure de la dernière mise à jour.', verbose_name='Date de mise à jour')),
                ('name', models.CharField(max_length=100, verbose_name='Nom')),
                ('content', models.TextField(blank=True, verbose_name='Contenu')),
                ('created_by', models.ForeignKey(blank=True, editable=False, help_text='Utilisateur ayant créé l’entrée.', null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='%(app_label)s_%(class)s_created', to=settings.AUTH_USER_MODEL, verbose_name='Créé par')),
                ('updated_by', models.ForeignKey(blank=True, default=None, editable=False, help_text='Utilisateur ayant mis à jour l’entrée.', null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='%(app_label)s_%(class)s_updated', to=settings.AUTH_USER_MODEL, verbose_name='Mis à jour par')),
                ('module', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='chapters', to='courses.module', verbose_name='Module')),
            ],
            options={
                'verbose_name': 'Chapitre',
                'verbose_name_plural': 'Chapitres',
            },
        ),
        migrations.CreateModel(
            name='Quiz',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, help_text='Identifiant unique (UUID v4) non modifiable.', primary_key=True, serialize=False, verbose_name='Identifiant')),
                ('created_at', models.DateTimeField(default=django.utils.timezone.now, editable=False, help_text='Date et heure de création (non modifiable).', verbose_name='Date de création')),
                ('updated_at', models.DateTimeField(auto_now=True, help_text='Date et heure de la dernière mise à jour.', verbose_name='Date de mise à jour')),
                ('question', models.TextField(verbose_name='Question')),
                ('is_multiple_choice', models.BooleanField(default=False, verbose_name='Choix multiples')),
                ('chapter', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='quizzes', to='courses.chapter', verbose_name='Chapitre')),
                ('created_by', models.ForeignKey(blank=True, editable=False, help_text='Utilisateur ayant créé l’entrée.', null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='%(app_label)s_%(class)s_created', to=settings.AUTH_USER_MODEL, verbose_name='Créé par')),
                ('updated_by', models.ForeignKey(blank=True, default=None, editable=False, help_text='Utilisateur ayant mis à jour l’entrée.', null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='%(app_label)s_%(class)s_updated', to=settings.AUTH_USER_MODEL, verbose_name='Mis à jour par')),
            ],
            options={
                'verbose_name': 'Quiz',
                'verbose_name_plural': 'Quiz',
            },
        ),
        migrations.CreateModel(
            name='QuizAttempt',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, help_text='Identifiant unique (UUID v4) non modifiable.', primary_key=True, serialize=False, verbose_name='Identifiant')),
                ('created_at', models.DateTimeField(default=django.utils.timezone.now, editable=False, help_text='Date et heure de création (non modifiable).', verbose_name='Date de création')),
                ('updated_at', models.DateTimeField(auto_now=True, help_text='Date et heure de la dernière mise à jour.', verbose_name='Date de mise à jour')),
                ('score', models.FloatField(validators=[django.core.validators.MinValueValidator(0), django.core.validators.MaxValueValidator(100)], verbose_name='Score (%)')),
                ('attempt_date', models.DateTimeField(auto_now_add=True, verbose_name='Date de tentative')),
                ('created_by', models.ForeignKey(blank=True, editable=False, help_text='Utilisateur ayant créé l’entrée.', null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='%(app_label)s_%(class)s_created', to=settings.AUTH_USER_MODEL, verbose_name='Créé par')),
                ('enrollment', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='quiz_attempts', to='courses.enrollment', verbose_name='Inscription')),
                ('quiz', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='attempts', to='courses.quiz', verbose_name='Quiz')),
                ('updated_by', models.ForeignKey(blank=True, default=None, editable=False, help_text='Utilisateur ayant mis à jour l’entrée.', null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='%(app_label)s_%(class)s_updated', to=settings.AUTH_USER_MODEL, verbose_name='Mis à jour par')),
            ],
            options={
                'verbose_name': 'Tentative de quiz',
                'verbose_name_plural': 'Tentatives de quiz',
            },
        ),
        migrations.CreateModel(
            name='QuizOption',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, help_text='Identifiant unique (UUID v4) non modifiable.', primary_key=True, serialize=False, verbose_name='Identifiant')),
                ('created_at', models.DateTimeField(default=django.utils.timezone.now, editable=False, help_text='Date et heure de création (non modifiable).', verbose_name='Date de création')),
                ('updated_at', models.DateTimeField(auto_now=True, help_text='Date et heure de la dernière mise à jour.', verbose_name='Date de mise à jour')),
                ('text', models.CharField(max_length=200, verbose_name='Texte')),
                ('is_correct', models.BooleanField(default=False, verbose_name='Correct')),
                ('created_by', models.ForeignKey(blank=True, editable=False, help_text='Utilisateur ayant créé l’entrée.', null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='%(app_label)s_%(class)s_created', to=settings.AUTH_USER_MODEL, verbose_name='Créé par')),
                ('quiz', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='options', to='courses.quiz', verbose_name='Quiz')),
                ('updated_by', models.ForeignKey(blank=True, default=None, editable=False, help_text='Utilisateur ayant mis à jour l’entrée.', null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='%(app_label)s_%(class)s_updated', to=settings.AUTH_USER_MODEL, verbose_name='Mis à jour par')),
            ],
            options={
                'verbose_name': 'Option de quiz',
                'verbose_name_plural': 'Options de quiz',
            },
        ),
        migrations.CreateModel(
            name='Student',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, help_text='Identifiant unique (UUID v4) non modifiable.', primary_key=True, serialize=False, verbose_name='Identifiant')),
                ('created_at', models.DateTimeField(default=django.utils.timezone.now, editable=False, help_text='Date et heure de création (non modifiable).', verbose_name='Date de création')),
                ('updated_at', models.DateTimeField(auto_now=True, help_text='Date et heure de la dernière mise à jour.', verbose_name='Date de mise à jour')),
                ('courses', models.ManyToManyField(related_name='students', through='courses.Enrollment', to='courses.course', verbose_name='Cours')),
                ('created_by', models.ForeignKey(blank=True, editable=False, help_text='Utilisateur ayant créé l’entrée.', null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='%(app_label)s_%(class)s_created', to=settings.AUTH_USER_MODEL, verbose_name='Créé par')),
                ('updated_by', models.ForeignKey(blank=True, default=None, editable=False, help_text='Utilisateur ayant mis à jour l’entrée.', null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='%(app_label)s_%(class)s_updated', to=settings.AUTH_USER_MODEL, verbose_name='Mis à jour par')),
                ('user', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, related_name='student_profile', to=settings.AUTH_USER_MODEL, verbose_name='Utilisateur')),
            ],
            options={
                'verbose_name': 'Étudiant',
                'verbose_name_plural': 'Étudiants',
            },
        ),
        migrations.AddField(
            model_name='enrollment',
            name='student',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='enrollments', to='courses.student', verbose_name='Étudiant'),
        ),
        migrations.CreateModel(
            name='Teacher',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, help_text='Identifiant unique (UUID v4) non modifiable.', primary_key=True, serialize=False, verbose_name='Identifiant')),
                ('created_at', models.DateTimeField(default=django.utils.timezone.now, editable=False, help_text='Date et heure de création (non modifiable).', verbose_name='Date de création')),
                ('updated_at', models.DateTimeField(auto_now=True, help_text='Date et heure de la dernière mise à jour.', verbose_name='Date de mise à jour')),
                ('bio', models.TextField(blank=True, verbose_name='Biographie')),
                ('qualifications', models.TextField(blank=True, verbose_name='Qualifications')),
                ('photo', models.ImageField(blank=True, null=True, upload_to='teachers/', verbose_name='Photo')),
                ('created_by', models.ForeignKey(blank=True, editable=False, help_text='Utilisateur ayant créé l’entrée.', null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='%(app_label)s_%(class)s_created', to=settings.AUTH_USER_MODEL, verbose_name='Créé par')),
                ('updated_by', models.ForeignKey(blank=True, default=None, editable=False, help_text='Utilisateur ayant mis à jour l’entrée.', null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='%(app_label)s_%(class)s_updated', to=settings.AUTH_USER_MODEL, verbose_name='Mis à jour par')),
                ('user', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, related_name='teacher_profile', to=settings.AUTH_USER_MODEL, verbose_name='Utilisateur')),
            ],
            options={
                'verbose_name': 'Enseignant',
                'verbose_name_plural': 'Enseignants',
            },
        ),
        migrations.AddField(
            model_name='course',
            name='teacher',
            field=models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, related_name='courses', to='courses.teacher', verbose_name='Enseignant'),
        ),
        migrations.AlterUniqueTogether(
            name='enrollment',
            unique_together={('student', 'course')},
        ),
        migrations.CreateModel(
            name='Certificate',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, help_text='Identifiant unique (UUID v4) non modifiable.', primary_key=True, serialize=False, verbose_name='Identifiant')),
                ('created_at', models.DateTimeField(default=django.utils.timezone.now, editable=False, help_text='Date et heure de création (non modifiable).', verbose_name='Date de création')),
                ('updated_at', models.DateTimeField(auto_now=True, help_text='Date et heure de la dernière mise à jour.', verbose_name='Date de mise à jour')),
                ('issue_date', models.DateTimeField(auto_now_add=True, verbose_name='Date d’émission')),
                ('certificate_code', models.CharField(max_length=50, unique=True, verbose_name='Code du certificat')),
                ('created_by', models.ForeignKey(blank=True, editable=False, help_text='Utilisateur ayant créé l’entrée.', null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='%(app_label)s_%(class)s_created', to=settings.AUTH_USER_MODEL, verbose_name='Créé par')),
                ('updated_by', models.ForeignKey(blank=True, default=None, editable=False, help_text='Utilisateur ayant mis à jour l’entrée.', null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='%(app_label)s_%(class)s_updated', to=settings.AUTH_USER_MODEL, verbose_name='Mis à jour par')),
                ('course', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='certificates', to='courses.course', verbose_name='Cours')),
                ('student', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='certificates', to='courses.student', verbose_name='Étudiant')),
            ],
            options={
                'verbose_name': 'Certificat',
                'verbose_name_plural': 'Certificats',
                'unique_together': {('student', 'course')},
            },
        ),
    ]
