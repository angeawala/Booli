from rest_framework import generics, status, serializers
from django.db import models
from rest_framework.permissions import IsAuthenticated, AllowAny
from core.permissions import IsStaffPermission
from rest_framework.response import Response
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import SearchFilter, OrderingFilter
from .models import Category, Teacher, Course, Module, Chapter, Quiz, QuizOption, Student, Enrollment, QuizAttempt, Certificate
from .serializers import (
    CourseCategorySerializer, TeacherSerializer, CourseSerializer, ModuleSerializer, 
    ChapterSerializer, QuizSerializer, QuizOptionSerializer, StudentSerializer, 
    EnrollmentSerializer, QuizAttemptSerializer, CertificateSerializer
)

class ListCategoriesView(generics.ListAPIView):
    queryset = Category.objects.all()
    serializer_class = CourseCategorySerializer  # Mise à jour ici
    permission_classes = [AllowAny]

# Teacher Views
class ListTeachersView(generics.ListAPIView):
    queryset = Teacher.objects.all()
    serializer_class = TeacherSerializer
    permission_classes = [AllowAny]

class CreateTeacherView(generics.CreateAPIView):
    queryset = Teacher.objects.all()
    serializer_class = TeacherSerializer
    permission_classes = [IsStaffPermission]

    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)

# Course Views
class ListCoursesView(generics.ListAPIView):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer
    permission_classes = [AllowAny]
    filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter]
    filterset_fields = ['category__id', 'teacher__id', 'is_free', 'is_certificated']
    search_fields = ['title', 'description']
    ordering_fields = ['title', 'created_at']

class CreateCourseView(generics.CreateAPIView):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)

# Module Views
class CreateModuleView(generics.CreateAPIView):
    queryset = Module.objects.all()
    serializer_class = ModuleSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)

# Chapter Views
class CreateChapterView(generics.CreateAPIView):
    queryset = Chapter.objects.all()
    serializer_class = ChapterSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)

# Quiz Views
class CreateQuizView(generics.CreateAPIView):
    queryset = Quiz.objects.all()
    serializer_class = QuizSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)

class CreateQuizOptionView(generics.CreateAPIView):
    queryset = QuizOption.objects.all()
    serializer_class = QuizOptionSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)

# Enrollment Views
class EnrollCourseView(generics.CreateAPIView):
    queryset = Enrollment.objects.all()
    serializer_class = EnrollmentSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        student, _ = Student.objects.get_or_create(user=self.request.user, defaults={'created_by': self.request.user})
        serializer.save(student=student, created_by=self.request.user)

# Quiz Attempt Views
class SubmitQuizAttemptView(generics.CreateAPIView):
    queryset = QuizAttempt.objects.all()
    serializer_class = QuizAttemptSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        enrollment = Enrollment.objects.get(id=self.request.data['enrollment_id'])
        if enrollment.student.user != self.request.user:
            raise serializers.ValidationError("Vous n’êtes pas inscrit à ce cours")
        serializer.save()
        # Vérifier si le cours est terminé et certifié
        if enrollment.progress >= 100 and enrollment.course.is_certificated:
            avg_score = enrollment.quiz_attempts.aggregate(models.Avg('score'))['score__avg']
            if avg_score >= 80:
                Certificate.objects.get_or_create(student=enrollment.student, course=enrollment.course, defaults={'created_by': self.request.user})

# Certificate Views
class ListCertificatesView(generics.ListAPIView):
    serializer_class = CertificateSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Certificate.objects.filter(student__user=self.request.user)


class CreateCategoryView(generics.CreateAPIView):
    queryset = Category.objects.all()
    serializer_class = CourseCategorySerializer
    permission_classes = [IsStaffPermission]

class ListCategoriesView(generics.ListAPIView):
    queryset = Category.objects.all()
    serializer_class = CourseCategorySerializer
    permission_classes = [IsStaffPermission]

class GetCategoryView(generics.RetrieveAPIView):
    queryset = Category.objects.all()
    serializer_class = CourseCategorySerializer
    permission_classes = [IsStaffPermission]
    lookup_field = 'id'

class UpdateCategoryView(generics.UpdateAPIView):
    queryset = Category.objects.all()
    serializer_class = CourseCategorySerializer
    permission_classes = [IsStaffPermission]
    lookup_field = 'id'

class DeleteCategoryView(generics.DestroyAPIView):
    queryset = Category.objects.all()
    serializer_class = CourseCategorySerializer
    permission_classes = [IsStaffPermission]
    lookup_field = 'id'