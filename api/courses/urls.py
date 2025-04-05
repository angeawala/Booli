from django.urls import path
from .views import (
    ListCategoriesView, ListTeachersView, CreateTeacherView, ListCoursesView, 
    CreateCourseView, CreateModuleView, CreateChapterView, CreateQuizView, 
    CreateQuizOptionView, EnrollCourseView, SubmitQuizAttemptView, ListCertificatesView,
    CreateCategoryView, UpdateCategoryView, DeleteCategoryView, GetCategoryView
)

app_name = 'courses'

urlpatterns = [
    path('categories/', ListCategoriesView.as_view(), name='list_categories'),
    path('categories/create/', CreateCategoryView.as_view(), name='create_category'),
    path('categories/<uuid:pk>/', GetCategoryView.as_view(), name='get_category'),
    path('categories/<uuid:pk>/update/', UpdateCategoryView.as_view(), name='update_category'),
    path('categories/<uuid:pk>/delete/', DeleteCategoryView.as_view(), name='delete_category'),
    path('teachers/', ListTeachersView.as_view(), name='list_teachers'),
    path('teachers/create/', CreateTeacherView.as_view(), name='create_teacher'),
    path('courses/', ListCoursesView.as_view(), name='list_courses'),
    path('courses/create/', CreateCourseView.as_view(), name='create_course'),
    path('modules/create/', CreateModuleView.as_view(), name='create_module'),
    path('chapters/create/', CreateChapterView.as_view(), name='create_chapter'),
    path('quizzes/create/', CreateQuizView.as_view(), name='create_quiz'),
    path('quiz-options/create/', CreateQuizOptionView.as_view(), name='create_quiz_option'),
    path('enroll/', EnrollCourseView.as_view(), name='enroll_course'),
    path('quiz-attempts/submit/', SubmitQuizAttemptView.as_view(), name='submit_quiz_attempt'),
    path('certificates/', ListCertificatesView.as_view(), name='list_certificates'),
]