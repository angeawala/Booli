from rest_framework import serializers
from core.serializers import BaseSerializer
from .models import Category, Teacher, Course, Module, Chapter, Quiz, QuizOption, Student, Enrollment, QuizAttempt, Certificate
from django.contrib.auth import get_user_model

User = get_user_model()

class CourseCategorySerializer(BaseSerializer):
    class Meta(BaseSerializer.Meta):
        model = Category
        fields = BaseSerializer.Meta.fields + ['name', 'description', 'icon', 'slug']

class TeacherSerializer(BaseSerializer):
    user_id = serializers.UUIDField(write_only=True)

    class Meta(BaseSerializer.Meta):
        model = Teacher
        fields = BaseSerializer.Meta.fields + ['user', 'user_id', 'bio', 'qualifications', 'photo']

    def validate_user_id(self, value):
        if not User.objects.filter(id=value).exists():
            raise serializers.ValidationError("Utilisateur invalide")
        return value

class ModuleSerializer(BaseSerializer):
    course_id = serializers.UUIDField(write_only=True)

    class Meta(BaseSerializer.Meta):
        model = Module
        fields = BaseSerializer.Meta.fields + ['course', 'course_id', 'name', 'is_free']

class ChapterSerializer(BaseSerializer):
    module_id = serializers.UUIDField(write_only=True)

    class Meta(BaseSerializer.Meta):
        model = Chapter
        fields = BaseSerializer.Meta.fields + ['module', 'module_id', 'name', 'content']

class QuizOptionSerializer(BaseSerializer):
    quiz_id = serializers.UUIDField(write_only=True)

    class Meta(BaseSerializer.Meta):
        model = QuizOption
        fields = BaseSerializer.Meta.fields + ['quiz', 'quiz_id', 'text', 'is_correct']

class QuizSerializer(BaseSerializer):
    chapter_id = serializers.UUIDField(write_only=True)
    options = QuizOptionSerializer(many=True, read_only=True)

    class Meta(BaseSerializer.Meta):
        model = Quiz
        fields = BaseSerializer.Meta.fields + ['chapter', 'chapter_id', 'question', 'is_multiple_choice', 'options']

class CourseSerializer(BaseSerializer):
    category_id = serializers.UUIDField(write_only=True)
    teacher_id = serializers.UUIDField(write_only=True)
    modules = ModuleSerializer(many=True, read_only=True)

    class Meta(BaseSerializer.Meta):
        model = Course
        fields = BaseSerializer.Meta.fields + [
            'category', 'category_id', 'teacher', 'teacher_id', 'title', 'description', 
            'image', 'video', 'is_free', 'is_certificated', 'price', 'modules'
        ]

class StudentSerializer(BaseSerializer):
    user_id = serializers.UUIDField(write_only=True)

    class Meta(BaseSerializer.Meta):
        model = Student
        fields = BaseSerializer.Meta.fields + ['user', 'user_id', 'courses']

class EnrollmentSerializer(BaseSerializer):
    student_id = serializers.UUIDField(write_only=True)
    course_id = serializers.UUIDField(write_only=True)

    class Meta(BaseSerializer.Meta):
        model = Enrollment
        fields = BaseSerializer.Meta.fields + ['student', 'student_id', 'course', 'course_id', 'progress']

class QuizAttemptSerializer(BaseSerializer):
    enrollment_id = serializers.UUIDField(write_only=True)
    quiz_id = serializers.UUIDField(write_only=True)
    selected_options = serializers.ListField(child=serializers.UUIDField(), write_only=True)

    class Meta(BaseSerializer.Meta):
        model = QuizAttempt
        fields = BaseSerializer.Meta.fields + ['enrollment', 'enrollment_id', 'quiz', 'quiz_id', 'score', 'attempt_date', 'selected_options']

    def create(self, validated_data):
        selected_options = validated_data.pop('selected_options')
        quiz = Quiz.objects.get(id=validated_data['quiz_id'])
        correct_options = quiz.options.filter(is_correct=True).count()
        selected_correct = quiz.options.filter(id__in=selected_options, is_correct=True).count()
        score = (selected_correct / correct_options) * 100 if correct_options > 0 else 0
        validated_data['score'] = score
        return super().create(validated_data)

class CertificateSerializer(BaseSerializer):
    student_id = serializers.UUIDField(write_only=True)
    course_id = serializers.UUIDField(write_only=True)

    class Meta(BaseSerializer.Meta):
        model = Certificate
        fields = BaseSerializer.Meta.fields + ['student', 'student_id', 'course', 'course_id', 'issue_date', 'certificate_code']