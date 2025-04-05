from django.contrib import admin
from .models import Category, Teacher, Course, Module, Chapter, Quiz, QuizOption, Student, Enrollment, QuizAttempt, Certificate

# Admin pour le modèle Category
@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ('name', 'description', 'slug')
    search_fields = ('name', 'description')
    list_per_page = 20
    prepopulated_fields = {'slug': ('name',)}  # Génère automatiquement le slug à partir du nom

# Admin pour le modèle Teacher
@admin.register(Teacher)
class TeacherAdmin(admin.ModelAdmin):
    list_display = ('user', 'bio', 'qualifications', 'photo')
    search_fields = ('user__username', 'bio', 'qualifications')
    list_per_page = 20
    raw_id_fields = ('user',)  # Utilise un champ d'ID brut pour l'utilisateur

# Admin pour le modèle Course
@admin.register(Course)
class CourseAdmin(admin.ModelAdmin):
    list_display = ('title', 'teacher', 'category', 'is_free', 'price', 'is_certificated')
    search_fields = ('title', 'teacher__user__username', 'category__name')
    list_filter = ('is_free', 'is_certificated', 'category')
    list_per_page = 20
    ordering = ('-created_at',)
    raw_id_fields = ('teacher', 'category')

# Admin pour le modèle Module
@admin.register(Module)
class ModuleAdmin(admin.ModelAdmin):
    list_display = ('name', 'course', 'is_free')
    search_fields = ('name', 'course__title')
    list_filter = ('is_free', 'course')
    list_per_page = 20
    raw_id_fields = ('course',)

# Admin pour le modèle Chapter
@admin.register(Chapter)
class ChapterAdmin(admin.ModelAdmin):
    list_display = ('name', 'module', 'content')
    search_fields = ('name', 'module__name')
    list_per_page = 20
    raw_id_fields = ('module',)

# Admin pour le modèle Quiz
@admin.register(Quiz)
class QuizAdmin(admin.ModelAdmin):
    list_display = ('question', 'chapter', 'is_multiple_choice')
    search_fields = ('question', 'chapter__name')
    list_per_page = 20
    raw_id_fields = ('chapter',)

# Admin pour le modèle QuizOption
@admin.register(QuizOption)
class QuizOptionAdmin(admin.ModelAdmin):
    list_display = ('quiz', 'text', 'is_correct')
    search_fields = ('quiz__question', 'text')
    list_per_page = 20
    raw_id_fields = ('quiz',)

# Admin pour le modèle Student
@admin.register(Student)
class StudentAdmin(admin.ModelAdmin):
    list_display = ('user', 'courses_list')
    search_fields = ('user__username',)
    list_per_page = 20
    raw_id_fields = ('user',)

    def courses_list(self, obj):
        return ", ".join([course.title for course in obj.courses.all()])
    courses_list.short_description = 'Cours inscrits'

# Admin pour le modèle Enrollment
@admin.register(Enrollment)
class EnrollmentAdmin(admin.ModelAdmin):
    list_display = ('student', 'course', 'progress')
    search_fields = ('student__user__username', 'course__title')
    list_filter = ('course',)
    list_per_page = 20
    raw_id_fields = ('student', 'course')

# Admin pour le modèle QuizAttempt
@admin.register(QuizAttempt)
class QuizAttemptAdmin(admin.ModelAdmin):
    list_display = ('enrollment', 'quiz', 'score', 'attempt_date')
    search_fields = ('enrollment__student__user__username', 'quiz__question')
    list_per_page = 20
    raw_id_fields = ('enrollment', 'quiz')

# Admin pour le modèle Certificate
@admin.register(Certificate)
class CertificateAdmin(admin.ModelAdmin):
    list_display = ('student', 'course', 'certificate_code', 'issue_date')
    search_fields = ('student__user__username', 'course__title', 'certificate_code')
    list_per_page = 20
    raw_id_fields = ('student', 'course')
