'use client';

import { useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from '@/components/dashboard/Loader';
import { Course, UserProgress, ModuleProgress } from '@/components/dashboard/courses/types';
import { getCourses, getUserProgress, saveUserProgress } from '@/components/dashboard/courses/data';
import '@/styles/dashboard/mes-formations.css';

const currentUser = { email: 'student@example.com', role: 'student' };

const MyTrainingPage = () => {
  const [loading, setLoading] = useState(false);
  const [courses, setCourses] = useState<Course[]>([]);
  const [userProgress, setUserProgress] = useState<UserProgress[]>([]);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [currentAnswers, setCurrentAnswers] = useState<{ [key: string]: number[] }>({});

  useEffect(() => {
    const allCourses = getCourses();
    setCourses(allCourses);
    setUserProgress(getUserProgress());
  }, []);

  const getProgressForCourse = (courseId: string) => {
    return userProgress.find((progress) => progress.userEmail === currentUser.email && progress.courseId === courseId);
  };

  const handleEnroll = (courseId: string) => {
    setLoading(true);
    setTimeout(() => {
      const progress: UserProgress = {
        userEmail: currentUser.email,
        courseId,
        moduleProgress: [],
      };
      const updatedProgress = [...userProgress, progress];
      setUserProgress(updatedProgress);
      saveUserProgress(updatedProgress);
      toast.success('Inscription réussie !');
      setLoading(false);
    }, 1000);
  };

  const handleSubmitQuiz = (moduleId: string) => {
    if (!selectedCourse) return;
    const module = selectedCourse.modules.find((m) => m.id === moduleId)!;
    const allQuestionsAnswered = module.quiz.questions.every((q) => currentAnswers[q.id]?.length > 0);
    if (!allQuestionsAnswered) {
      toast.error('Veuillez répondre à toutes les questions.');
      return;
    }
    setLoading(true);
    setTimeout(() => {
      let correctAnswersCount = 0;
      module.quiz.questions.forEach((q) => {
        const userAnswers = currentAnswers[q.id] || [];
        const isCorrect = q.questionType === 'single'
          ? userAnswers.length === 1 && userAnswers[0] === q.correctAnswers[0]
          : q.correctAnswers.every((ca) => userAnswers.includes(ca)) && userAnswers.every((ua) => q.correctAnswers.includes(ua));
        if (isCorrect) correctAnswersCount++;
      });
      const score = (correctAnswersCount / module.quiz.questions.length) * 100;

      const updatedProgress = userProgress.map((progress) => {
        if (progress.userEmail === currentUser.email && progress.courseId === selectedCourse.id) {
          const existingModuleProgress = progress.moduleProgress.find((mp) => mp.moduleId === moduleId);
          const newModuleProgress: ModuleProgress = {
            moduleId,
            quizScore: existingModuleProgress ? Math.max(existingModuleProgress.quizScore, score) : score,
            isCompleted: (existingModuleProgress ? Math.max(existingModuleProgress.quizScore, score) : score) >= module.quiz.passingScore,
            attempts: (existingModuleProgress?.attempts || 0) + 1,
          };
          return {
            ...progress,
            moduleProgress: [
              ...progress.moduleProgress.filter((mp) => mp.moduleId !== moduleId),
              newModuleProgress,
            ],
            completedAt: selectedCourse.modules.every((mod) => {
              const mp = progress.moduleProgress.find((p) => p.moduleId === mod.id);
              return mp?.isCompleted || newModuleProgress.moduleId === mod.id && newModuleProgress.isCompleted;
            })
              ? new Date().toISOString()
              : progress.completedAt,
          };
        }
        return progress;
      });
      setUserProgress(updatedProgress);
      saveUserProgress(updatedProgress);
      setCurrentAnswers({});
      toast.success(`Quiz soumis ! Score : ${score}%`);
      setLoading(false);
    }, 1000);
  };

  const handleDownloadCertificate = (courseId: string) => {
    const progress = getProgressForCourse(courseId);
    const course = courses.find((c) => c.id === courseId);
    if (!progress || !course || !course.isCertified || !progress.completedAt) {
      toast.error('Vous ne pouvez pas télécharger de certificat pour ce cours.');
      return;
    }
    toast.success('Certificat téléchargé !');
  };

  return (
    <div className="x-my-training-page">
      <ToastContainer position="top-right" autoClose={3000} />
      <Loader loading={loading} />
      <h2 className="x-my-training-title">Mes Formations</h2>

      <div className="table-responsive mb-4">
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Titre</th>
              <th>Gratuit</th>
              <th>Certifié</th>
              <th>Progression</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {courses.map((course) => {
              const progress = getProgressForCourse(course.id);
              const completionPercentage = progress
                ? (progress.moduleProgress.filter((mp) => mp.isCompleted).length / course.modules.length) * 100
                : 0;
              return (
                <tr key={course.id}>
                  <td>{course.title}</td>
                  <td>{course.isFree ? 'Oui' : 'Non'}</td>
                  <td>{course.isCertified ? 'Oui' : 'Non'}</td>
                  <td>{progress ? `${completionPercentage}%` : 'Non inscrit'}</td>
                  <td>
                    {!progress ? (
                      <button className="btn x-modal-save" onClick={() => handleEnroll(course.id)}>
                        S’inscrire
                      </button>
                    ) : (
                      <>
                        <span className="x-action-icon" onClick={() => setSelectedCourse(course)}>
                          <i className="fas fa-eye"></i>
                          <span className="x-action-tooltip">Voir la Progression</span>
                        </span>
                        {course.isCertified && progress.completedAt && (
                          <span className="x-action-icon" onClick={() => handleDownloadCertificate(course.id)}>
                            <i className="fas fa-certificate"></i>
                            <span className="x-action-tooltip">Télécharger le Certificat</span>
                          </span>
                        )}
                      </>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {selectedCourse && (
        <div className="x-course-progress">
          <h3 className="x-section-title">Progression dans "{selectedCourse.title}"</h3>
          {selectedCourse.modules.map((module) => {
            const progress = getProgressForCourse(selectedCourse.id)?.moduleProgress.find((mp) => mp.moduleId === module.id);
            return (
              <div key={module.id} className="x-module-progress mb-4">
                <h4>{module.title}</h4>
                <p>{module.description}</p>
                <p>Statut : {progress?.isCompleted ? 'Complété' : 'Non complété'}</p>
                {progress && <p>Meilleur score au quiz : {progress.quizScore}%</p>}
                <h5>Chapitres</h5>
                {module.chapters.map((chapter) => (
                  <div key={chapter.id} className="mb-2">
                    <strong>{chapter.title}</strong>
                    <div dangerouslySetInnerHTML={{ __html: chapter.content }} />
                    {chapter.videoUrl && (
                      <p>
                        Vidéo : <a href={chapter.videoUrl} target="_blank" rel="noopener noreferrer">Voir</a>
                      </p>
                    )}
                    {chapter.pdfUrl && (
                      <p>
                        PDF : <a href={chapter.pdfUrl} target="_blank" rel="noopener noreferrer">Télécharger</a>
                      </p>
                    )}
                    {chapter.exercise && (
                      <div>
                        <p>Exercice :</p>
                        <div dangerouslySetInnerHTML={{ __html: chapter.exercise }} />
                      </div>
                    )}
                    {chapter.solution && (
                      <div>
                        <p>Solution :</p>
                        <div dangerouslySetInnerHTML={{ __html: chapter.solution }} />
                      </div>
                    )}
                  </div>
                ))}
                <h5>Quiz de fin de module</h5>
                {module.quiz.questions.map((question) => (
                  <div key={question.id} className="mb-3">
                    <p>{question.question} ({question.questionType === 'single' ? 'Choix unique' : 'Choix multiple'})</p>
                    {question.options.map((option, optIndex) => (
                      <div key={optIndex}>
                        <input
                          type={question.questionType === 'single' ? 'radio' : 'checkbox'}
                          name={`question-${question.id}`}
                          checked={(currentAnswers[question.id] || []).includes(optIndex)}
                          onChange={() => {
                            const current = currentAnswers[question.id] || [];
                            let updatedAnswers;
                            if (question.questionType === 'single') {
                              updatedAnswers = [optIndex];
                            } else {
                              updatedAnswers = current.includes(optIndex)
                                ? current.filter((i) => i !== optIndex)
                                : [...current, optIndex];
                            }
                            setCurrentAnswers({ ...currentAnswers, [question.id]: updatedAnswers });
                          }}
                        />
                        <label className="ms-2">{option}</label>
                      </div>
                    ))}
                  </div>
                ))}
                <button className="btn x-modal-save mb-3" onClick={() => handleSubmitQuiz(module.id)}>
                  Soumettre le Quiz
                </button>
              </div>
            );
          })}
          <button className="btn x-modal-close mt-2" onClick={() => setSelectedCourse(null)}>
            Fermer
          </button>
        </div>
      )}
    </div>
  );
};

export default MyTrainingPage;