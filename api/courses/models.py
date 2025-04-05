from django.db import models
from django.conf import settings
from django.core.validators import MinValueValidator, MaxValueValidator
from django.contrib.auth import get_user_model
from core.models import BaseModel
from django.utils import timezone

User = get_user_model()

class Category(BaseModel):
    name = models.CharField(max_length=100, unique=True, verbose_name="Nom")
    description = models.TextField(verbose_name="Description", blank=True)
    icon = models.ImageField(upload_to="course_categories/", null=True, blank=True, verbose_name="Icône")
    slug = models.SlugField(unique=True, verbose_name="Slug")

    class Meta:
        verbose_name = "Catégorie de cours"
        verbose_name_plural = "Catégories de cours"

    def __str__(self):
        return self.name

class Teacher(BaseModel):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name="teacher_profile", verbose_name="Utilisateur")
    bio = models.TextField(verbose_name="Biographie", blank=True)
    qualifications = models.TextField(verbose_name="Qualifications", blank=True)
    photo = models.ImageField(upload_to="teachers/", null=True, blank=True, verbose_name="Photo")

    class Meta:
        verbose_name = "Enseignant"
        verbose_name_plural = "Enseignants"

    def __str__(self):
        return f"{self.user.username}"

    def save(self, *args, **kwargs):
        super().save(*args, **kwargs)
        # Ajout du rôle "teacher" à l'utilisateur
        if "teacher" not in self.user.roles:
            self.user.roles.append("teacher")
            self.user.save()

class Course(BaseModel):
    category = models.ForeignKey(Category, on_delete=models.PROTECT, related_name="courses", verbose_name="Catégorie")
    teacher = models.ForeignKey(Teacher, on_delete=models.PROTECT, related_name="courses", verbose_name="Enseignant")
    title = models.CharField(max_length=200, verbose_name="Titre")
    description = models.TextField(verbose_name="Description")
    image = models.ImageField(upload_to="courses/", null=True, blank=True, verbose_name="Image")
    video = models.FileField(upload_to="course_videos/", null=True, blank=True, verbose_name="Vidéo d'introduction")
    is_free = models.BooleanField(default=False, verbose_name="Gratuit")
    is_certificated = models.BooleanField(default=False, verbose_name="Certifié")
    price = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True, verbose_name="Prix")

    class Meta:
        verbose_name = "Cours"
        verbose_name_plural = "Cours"

    def __str__(self):
        return self.title

class Module(BaseModel):
    course = models.ForeignKey(Course, on_delete=models.CASCADE, related_name="modules", verbose_name="Cours")
    name = models.CharField(max_length=100, verbose_name="Nom")
    is_free = models.BooleanField(default=False, verbose_name="Gratuit")

    class Meta:
        verbose_name = "Module"
        verbose_name_plural = "Modules"

    def __str__(self):
        return f"{self.name} ({self.course.title})"

    def save(self, *args, **kwargs):
        # Si le cours est gratuit, tous les modules sont gratuits
        if self.course.is_free:
            self.is_free = True
        # Si c’est le premier module d’un cours payant, il est gratuit
        elif not self.course.is_free and not self.course.modules.exclude(id=self.id).exists():
            self.is_free = True
        super().save(*args, **kwargs)

class Chapter(BaseModel):
    module = models.ForeignKey(Module, on_delete=models.CASCADE, related_name="chapters", verbose_name="Module")
    name = models.CharField(max_length=100, verbose_name="Nom")
    content = models.TextField(verbose_name="Contenu", blank=True)

    class Meta:
        verbose_name = "Chapitre"
        verbose_name_plural = "Chapitres"

    def __str__(self):
        return f"{self.name} ({self.module.name})"

class Quiz(BaseModel):
    chapter = models.ForeignKey(Chapter, on_delete=models.CASCADE, related_name="quizzes", verbose_name="Chapitre")
    question = models.TextField(verbose_name="Question")
    is_multiple_choice = models.BooleanField(default=False, verbose_name="Choix multiples")

    class Meta:
        verbose_name = "Quiz"
        verbose_name_plural = "Quiz"

    def __str__(self):
        return f"Quiz: {self.question[:50]}..."

class QuizOption(BaseModel):
    quiz = models.ForeignKey(Quiz, on_delete=models.CASCADE, related_name="options", verbose_name="Quiz")
    text = models.CharField(max_length=200, verbose_name="Texte")
    is_correct = models.BooleanField(default=False, verbose_name="Correct")

    class Meta:
        verbose_name = "Option de quiz"
        verbose_name_plural = "Options de quiz"

    def __str__(self):
        return self.text

class Student(BaseModel):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name="student_profile", verbose_name="Utilisateur")
    courses = models.ManyToManyField(Course, through="Enrollment", related_name="students", verbose_name="Cours")

    class Meta:
        verbose_name = "Étudiant"
        verbose_name_plural = "Étudiants"

    def __str__(self):
        return f"{self.user.username}"

    def save(self, *args, **kwargs):
        super().save(*args, **kwargs)
        # Ajout du rôle "student" à l'utilisateur
        if "student" not in self.user.roles:
            self.user.roles.append("student")
            self.user.save()

class Enrollment(BaseModel):
    student = models.ForeignKey(Student, on_delete=models.CASCADE, related_name="enrollments", verbose_name="Étudiant")
    course = models.ForeignKey(Course, on_delete=models.CASCADE, related_name="enrollments", verbose_name="Cours")
    progress = models.FloatField(default=0, validators=[MinValueValidator(0), MaxValueValidator(100)], verbose_name="Progression (%)")

    class Meta:
        verbose_name = "Inscription"
        verbose_name_plural = "Inscriptions"
        unique_together = ('student', 'course')

    def __str__(self):
        return f"{self.student} - {self.course}"

class QuizAttempt(BaseModel):
    enrollment = models.ForeignKey(Enrollment, on_delete=models.CASCADE, related_name="quiz_attempts", verbose_name="Inscription")
    quiz = models.ForeignKey(Quiz, on_delete=models.CASCADE, related_name="attempts", verbose_name="Quiz")
    score = models.FloatField(validators=[MinValueValidator(0), MaxValueValidator(100)], verbose_name="Score (%)")
    attempt_date = models.DateTimeField(auto_now_add=True, verbose_name="Date de tentative")

    class Meta:
        verbose_name = "Tentative de quiz"
        verbose_name_plural = "Tentatives de quiz"

    def __str__(self):
        return f"{self.enrollment.student} - {self.quiz} ({self.score}%)"

class Certificate(BaseModel):
    student = models.ForeignKey(Student, on_delete=models.CASCADE, related_name="certificates", verbose_name="Étudiant")
    course = models.ForeignKey(Course, on_delete=models.CASCADE, related_name="certificates", verbose_name="Cours")
    issue_date = models.DateTimeField(auto_now_add=True, verbose_name="Date d’émission")
    certificate_code = models.CharField(max_length=50, unique=True, verbose_name="Code du certificat")

    class Meta:
        verbose_name = "Certificat"
        verbose_name_plural = "Certificats"
        unique_together = ('student', 'course')

    def __str__(self):
        return f"Certificat {self.certificate_code} - {self.student} ({self.course})"

    def save(self, *args, **kwargs):
        if not self.certificate_code:
            self.certificate_code = f"CERT-{self.course.id}-{self.student.id}-{timezone.now().strftime('%Y%m%d')}"
        super().save(*args, **kwargs)