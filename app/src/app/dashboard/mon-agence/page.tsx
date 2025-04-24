'use client';

import { useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from '@/components/dashboard/Loader';
import { Course, Module, Chapter, Quiz, Question } from '@/components/dashboard/courses/types';
import { getCourses, saveCourses } from '@/components/dashboard/courses/data';
import '@/styles/dashboard/mon-agence.css';

// Simuler l'utilisateur connecté
const currentUser = { email: 'john.doe@example.com', role: 'client' };

const MyAgencyPage = () => {
  const [loading, setLoading] = useState(false);
  const [courses, setCourses] = useState<Course[]>([]);
  const [myCourses, setMyCourses] = useState<Course[]>([]);
  const [newCourse, setNewCourse] = useState({
    title: '',
    description: '',
    image: '',
    videoUrl: '',
    isFree: true,
    isCertified: false,
    specifiedAuthor: '',
  });
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);
  const [newModule, setNewModule] = useState({ title: '', description: '', isFree: true });
  const [newChapter, setNewChapter] = useState({
    title: '',
    content: '',
    videoUrl: '',
    pdfUrl: '',
    exercise: '',
    solution: '',
  });
  const [newQuiz, setNewQuiz] = useState({ questions: [] as Question[], passingScore: 80 });
  const [newQuestion, setNewQuestion] = useState({
    question: '',
    questionType: 'single' as 'single' | 'multiple',
    options: ['', '', '', ''],
    correctAnswers: [] as number[],
  });
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [selectedModule, setSelectedModule] = useState<Module | null>(null);

  useEffect(() => {
    const allCourses = getCourses();
    setCourses(allCourses);
    const userCourses = allCourses.filter((course) => course.creatorEmail === currentUser.email);
    setMyCourses(userCourses);
  }, []);

  const handleAddCourse = () => {
    if (!newCourse.title || !newCourse.description || !newCourse.image) {
      toast.error('Veuillez remplir tous les champs obligatoires.');
      return;
    }
    if (currentUser.role === 'staff' && !newCourse.specifiedAuthor) {
      toast.error('Veuillez spécifier l’auteur du cours.');
      return;
    }
    setLoading(true);
    setTimeout(() => {
      const course: Course = {
        id: `course${Date.now()}`,
        ...newCourse,
        modules: [],
        creatorId: currentUser.email,
        creatorType: currentUser.role === 'staff' ? 'staff' : 'user',
        creatorEmail: currentUser.email,
        isApproved: currentUser.role === 'staff',
        createdAt: new Date().toISOString(),
        lastUpdated: new Date().toISOString(),
      };
      const updatedCourses = [...courses, course];
      setCourses(updatedCourses);
      setMyCourses([...myCourses, course]);
      saveCourses(updatedCourses);
      setNewCourse({ title: '', description: '', image: '', videoUrl: '', isFree: true, isCertified: false, specifiedAuthor: '' });
      toast.success('Cours créé avec succès');
      setLoading(false);
    }, 1000);
  };

  const handleUpdateCourse = () => {
    if (!editingCourse || !editingCourse.title || !editingCourse.description || !editingCourse.image) {
      toast.error('Veuillez remplir tous les champs obligatoires.');
      return;
    }
    if (editingCourse.creatorType === 'staff' && !editingCourse.specifiedAuthor) {
      toast.error('Veuillez spécifier l’auteur du cours.');
      return;
    }
    setLoading(true);
    setTimeout(() => {
      const updatedCourses = courses.map((course) =>
        course.id === editingCourse.id ? { ...editingCourse, lastUpdated: new Date().toISOString() } : course
      );
      setCourses(updatedCourses);
      setMyCourses(updatedCourses.filter((course) => course.creatorEmail === currentUser.email));
      saveCourses(updatedCourses);
      setEditingCourse(null);
      toast.success('Cours mis à jour avec succès');
      setLoading(false);
    }, 1000);
  };

  const handleDeleteCourse = (id: string) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer ce cours ?')) return;
    setLoading(true);
    setTimeout(() => {
      const updatedCourses = courses.filter((course) => course.id !== id);
      setCourses(updatedCourses);
      setMyCourses(updatedCourses.filter((course) => course.creatorEmail === currentUser.email));
      saveCourses(updatedCourses);
      toast.success('Cours supprimé avec succès');
      setLoading(false);
    }, 1000);
  };

  const handleAddModule = () => {
    if (!selectedCourse || !newModule.title || !newModule.description) {
      toast.error('Veuillez remplir tous les champs obligatoires.');
      return;
    }
    setLoading(true);
    setTimeout(() => {
      const updatedCourse = {
        ...selectedCourse,
        modules: [
          ...selectedCourse.modules,
          {
            id: `mod${Date.now()}`,
            title: newModule.title,
            description: newModule.description,
            isFree: selectedCourse.modules.length === 0 ? true : selectedCourse.isFree ? true : newModule.isFree,
            chapters: [],
            quiz: { id: `quiz${Date.now()}`, questions: [], passingScore: 80 },
            createdAt: new Date().toISOString(),
          },
        ],
        lastUpdated: new Date().toISOString(),
      };
      const updatedCourses = courses.map((course) =>
        course.id === selectedCourse.id ? updatedCourse : course
      );
      setCourses(updatedCourses);
      setMyCourses(updatedCourses.filter((course) => course.creatorEmail === currentUser.email));
      setSelectedCourse(updatedCourse);
      saveCourses(updatedCourses);
      setNewModule({ title: '', description: '', isFree: true });
      toast.success('Module ajouté avec succès');
      setLoading(false);
    }, 1000);
  };

  const handleAddChapter = () => {
    if (!selectedCourse || !selectedModule || !newChapter.title || (!newChapter.content && !newChapter.videoUrl && !newChapter.pdfUrl)) {
      toast.error('Veuillez remplir le titre et au moins un contenu (texte, vidéo ou PDF).');
      return;
    }
    setLoading(true);
    setTimeout(() => {
      const updatedCourse = {
        ...selectedCourse,
        modules: selectedCourse.modules.map((module) =>
          module.id === selectedModule.id
            ? {
                ...module,
                chapters: [
                  ...module.chapters,
                  {
                    id: `chap${Date.now()}`,
                    title: newChapter.title,
                    content: newChapter.content,
                    videoUrl: newChapter.videoUrl,
                    pdfUrl: newChapter.pdfUrl,
                    exercise: newChapter.exercise,
                    solution: newChapter.solution,
                    createdAt: new Date().toISOString(),
                  },
                ],
              }
            : module
        ),
        lastUpdated: new Date().toISOString(),
      };
      const updatedCourses = courses.map((course) =>
        course.id === selectedCourse.id ? updatedCourse : course
      );
      setCourses(updatedCourses);
      setMyCourses(updatedCourses.filter((course) => course.creatorEmail === currentUser.email));
      setSelectedCourse(updatedCourse);
      setSelectedModule(updatedCourse.modules.find((m) => m.id === selectedModule.id)!);
      saveCourses(updatedCourses);
      setNewChapter({ title: '', content: '', videoUrl: '', pdfUrl: '', exercise: '', solution: '' });
      toast.success('Chapitre ajouté avec succès');
      setLoading(false);
    }, 1000);
  };

  const handleAddQuiz = () => {
    if (!selectedCourse || !selectedModule || newQuiz.questions.length === 0) {
      toast.error('Veuillez ajouter au moins une question au quiz.');
      return;
    }
    setLoading(true);
    setTimeout(() => {
      const updatedCourse = {
        ...selectedCourse,
        modules: selectedCourse.modules.map((module) =>
          module.id === selectedModule.id ? { ...module, quiz: { ...newQuiz, id: module.quiz.id } } : module
        ),
        lastUpdated: new Date().toISOString(),
      };
      const updatedCourses = courses.map((course) =>
        course.id === selectedCourse.id ? updatedCourse : course
      );
      setCourses(updatedCourses);
      setMyCourses(updatedCourses.filter((course) => course.creatorEmail === currentUser.email));
      setSelectedCourse(updatedCourse);
      setSelectedModule(updatedCourse.modules.find((m) => m.id === selectedModule.id)!);
      saveCourses(updatedCourses);
      setNewQuiz({ questions: [], passingScore: 80 });
      toast.success('Quiz ajouté avec succès');
      setLoading(false);
    }, 1000);
  };

  const handleAddQuestion = () => {
    if (!newQuestion.question || newQuestion.options.some((opt) => !opt) || newQuestion.correctAnswers.length === 0) {
      toast.error('Veuillez remplir la question, toutes les options, et sélectionner au moins une réponse correcte.');
      return;
    }
    if (newQuestion.questionType === 'single' && newQuestion.correctAnswers.length !== 1) {
      toast.error('Une question à choix unique doit avoir exactement une réponse correcte.');
      return;
    }
    setNewQuiz({
      ...newQuiz,
      questions: [
        ...newQuiz.questions,
        {
          id: `q${Date.now()}`,
          question: newQuestion.question,
          questionType: newQuestion.questionType,
          options: newQuestion.options,
          correctAnswers: newQuestion.correctAnswers,
        },
      ],
    });
    setNewQuestion({ question: '', questionType: 'single', options: ['', '', '', ''], correctAnswers: [] });
    toast.success('Question ajoutée au quiz');
  };

  return (
    <div className="x-my-agency-page">
      <ToastContainer position="top-right" autoClose={3000} />
      <Loader loading={loading} />
      <h2 className="x-my-agency-title">Mon Agence - Gestion des Cours</h2>

      {/* Étape 1 : Créer un Cours */}
      <div className="x-create-course-form mb-4">
        <h3 className="x-form-title">Étape 1 : Créer un Cours</h3>
        <div className="mb-3">
          <label className="x-courses-label">Titre *</label>
          <input
            type="text"
            value={newCourse.title}
            onChange={(e) => setNewCourse({ ...newCourse, title: e.target.value })}
            className="form-control x-modal-input"
            placeholder="Ex: Introduction à la Programmation"
          />
        </div>
        <div className="mb-3">
          <label className="x-courses-label">Description *</label>
          <textarea
            value={newCourse.description}
            onChange={(e) => setNewCourse({ ...newCourse, description: e.target.value })}
            className="form-control x-modal-input"
            placeholder="Ex: Apprenez les bases de la programmation avec Python."
          />
        </div>
        <div className="mb-3">
          <label className="x-courses-label">Image (URL) *</label>
          <input
            type="text"
            value={newCourse.image}
            onChange={(e) => setNewCourse({ ...newCourse, image: e.target.value })}
            className="form-control x-modal-input"
            placeholder="Ex: https://example.com/python-course.jpg"
          />
        </div>
        <div className="mb-3">
          <label className="x-courses-label">Vidéo de description (URL, optionnel)</label>
          <input
            type="text"
            value={newCourse.videoUrl}
            onChange={(e) => setNewCourse({ ...newCourse, videoUrl: e.target.value })}
            className="form-control x-modal-input"
            placeholder="Ex: https://example.com/python-intro.mp4"
          />
        </div>
        <div className="mb-3">
          <label className="x-courses-label">Gratuit</label>
          <select
            value={newCourse.isFree ? 'Oui' : 'Non'}
            onChange={(e) => setNewCourse({ ...newCourse, isFree: e.target.value === 'Oui' })}
            className="form-select x-modal-input"
          >
            <option value="Oui">Oui</option>
            <option value="Non">Non</option>
          </select>
        </div>
        <div className="mb-3">
          <label className="x-courses-label">Certifié</label>
          <select
            value={newCourse.isCertified ? 'Oui' : 'Non'}
            onChange={(e) => setNewCourse({ ...newCourse, isCertified: e.target.value === 'Oui' })}
            className="form-select x-modal-input"
          >
            <option value="Oui">Oui</option>
            <option value="Non">Non</option>
          </select>
        </div>
        {currentUser.role === 'staff' && (
          <div className="mb-3">
            <label className="x-courses-label">Auteur du cours *</label>
            <input
              type="text"
              value={newCourse.specifiedAuthor}
              onChange={(e) => setNewCourse({ ...newCourse, specifiedAuthor: e.target.value })}
              className="form-control x-modal-input"
              placeholder="Ex: John Doe"
            />
          </div>
        )}
        <button className="btn x-modal-save" onClick={handleAddCourse}>
          Ajouter le Cours
        </button>
      </div>

      {/* Liste des Cours */}
      <div className="table-responsive mb-4">
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Titre</th>
              <th>Gratuit</th>
              <th>Certifié</th>
              <th>Statut</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {myCourses.map((course) => (
              <tr key={course.id}>
                <td>{course.title}</td>
                <td>{course.isFree ? 'Oui' : 'Non'}</td>
                <td>{course.isCertified ? 'Oui' : 'Non'}</td>
                <td>{course.isApproved ? 'Approuvé' : 'En attente'}</td>
                <td>
                  <span className="x-action-icon" onClick={() => setEditingCourse(course)}>
                    <i className="fas fa-edit"></i>
                    <span className="x-action-tooltip">Modifier</span>
                  </span>
                  <span className="x-action-icon" onClick={() => handleDeleteCourse(course.id)}>
                    <i className="fas fa-trash"></i>
                    <span className="x-action-tooltip">Supprimer</span>
                  </span>
                  <span className="x-action-icon" onClick={() => { setSelectedCourse(course); setSelectedModule(null); }}>
                    <i className="fas fa-cogs"></i>
                    <span className="x-action-tooltip">Gérer les Modules</span>
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modifier un Cours */}
      {editingCourse && (
        <div className="x-modal-backdrop">
          <div className="x-modal">
            <h3 className="x-modal-title">Modifier le Cours</h3>
            <div className="mb-3">
              <label className="x-courses-label">Titre *</label>
              <input
                type="text"
                value={editingCourse.title}
                onChange={(e) => setEditingCourse({ ...editingCourse, title: e.target.value })}
                className="form-control x-modal-input"
                placeholder="Ex: Introduction à la Programmation"
              />
            </div>
            <div className="mb-3">
              <label className="x-courses-label">Description *</label>
              <textarea
                value={editingCourse.description}
                onChange={(e) => setEditingCourse({ ...editingCourse, description: e.target.value })}
                className="form-control x-modal-input"
                placeholder="Ex: Apprenez les bases de la programmation avec Python."
              />
            </div>
            <div className="mb-3">
              <label className="x-courses-label">Image (URL) *</label>
              <input
                type="text"
                value={editingCourse.image}
                onChange={(e) => setEditingCourse({ ...editingCourse, image: e.target.value })}
                className="form-control x-modal-input"
                placeholder="Ex: https://example.com/python-course.jpg"
              />
            </div>
            <div className="mb-3">
              <label className="x-courses-label">Vidéo de description (URL, optionnel)</label>
              <input
                type="text"
                value={editingCourse.videoUrl}
                onChange={(e) => setEditingCourse({ ...editingCourse, videoUrl: e.target.value })}
                className="form-control x-modal-input"
                placeholder="Ex: https://example.com/python-intro.mp4"
              />
            </div>
            <div className="mb-3">
              <label className="x-courses-label">Gratuit</label>
              <select
                value={editingCourse.isFree ? 'Oui' : 'Non'}
                onChange={(e) => setEditingCourse({ ...editingCourse, isFree: e.target.value === 'Oui' })}
                className="form-select x-modal-input"
              >
                <option value="Oui">Oui</option>
                <option value="Non">Non</option>
              </select>
            </div>
            <div className="mb-3">
              <label className="x-courses-label">Certifié</label>
              <select
                value={editingCourse.isCertified ? 'Oui' : 'Non'}
                onChange={(e) => setEditingCourse({ ...editingCourse, isCertified: e.target.value === 'Oui' })}
                className="form-select x-modal-input"
              >
                <option value="Oui">Oui</option>
                <option value="Non">Non</option>
              </select>
            </div>
            {editingCourse.creatorType === 'staff' && (
              <div className="mb-3">
                <label className="x-courses-label">Auteur du cours *</label>
                <input
                  type="text"
                  value={editingCourse.specifiedAuthor}
                  onChange={(e) => setEditingCourse({ ...editingCourse, specifiedAuthor: e.target.value })}
                  className="form-control x-modal-input"
                  placeholder="Ex: John Doe"
                />
              </div>
            )}
            <button className="btn x-modal-save mb-3" onClick={handleUpdateCourse}>
              Mettre à jour
            </button>
            <button className="btn x-modal-close mt-2" onClick={() => setEditingCourse(null)}>
              Fermer
            </button>
          </div>
        </div>
      )}

      {/* Étape 2 : Gérer les Modules */}
      {selectedCourse && !selectedModule && (
        <div className="x-manage-modules">
          <h3 className="x-section-title">Étape 2 : Gérer les Modules de "{selectedCourse.title}"</h3>
          <div className="mb-4">
            <h4 className="x-form-title">Ajouter un Module</h4>
            <div className="mb-3">
              <label className="x-courses-label">Titre *</label>
              <input
                type="text"
                value={newModule.title}
                onChange={(e) => setNewModule({ ...newModule, title: e.target.value })}
                className="form-control x-modal-input"
                placeholder="Ex: Module Introductif"
              />
            </div>
            <div className="mb-3">
              <label className="x-courses-label">Description *</label>
              <textarea
                value={newModule.description}
                onChange={(e) => setNewModule({ ...newModule, description: e.target.value })}
                className="form-control x-modal-input"
                placeholder="Ex: Les bases de la programmation."
              />
            </div>
            {selectedCourse.modules.length > 0 && !selectedCourse.isFree && (
              <div className="mb-3">
                <label className="x-courses-label">Gratuit</label>
                <select
                  value={newModule.isFree ? 'Oui' : 'Non'}
                  onChange={(e) => setNewModule({ ...newModule, isFree: e.target.value === 'Oui' })}
                  className="form-select x-modal-input"
                >
                  <option value="Oui">Oui</option>
                  <option value="Non">Non</option>
                </select>
              </div>
            )}
            <button className="btn x-modal-save" onClick={handleAddModule}>
              Ajouter le Module
            </button>
          </div>

          {selectedCourse.modules.map((module) => (
            <div key={module.id} className="x-module-section mb-4">
              <h4>{module.title}</h4>
              <p>{module.description}</p>
              <p>Gratuit : {module.isFree ? 'Oui' : 'Non'}</p>
              <button
                className="btn x-modal-save"
                onClick={() => setSelectedModule(module)}
              >
                Gérer les Chapitres et Quiz
              </button>
            </div>
          ))}
          <button className="btn x-modal-close mt-2" onClick={() => setSelectedCourse(null)}>
            Terminer la Gestion
          </button>
        </div>
      )}

      {/* Étape 3 : Gérer les Chapitres et le Quiz d’un Module */}
      {selectedCourse && selectedModule && (
        <div className="x-manage-content">
          <h3 className="x-section-title">Étape 3 : Gérer le Contenu de "{selectedModule.title}"</h3>

          {/* Ajouter un Chapitre */}
          <div className="mb-4">
            <h4 className="x-form-title">Ajouter un Chapitre</h4>
            <div className="mb-3">
              <label className="x-courses-label">Titre *</label>
              <input
                type="text"
                value={newChapter.title}
                onChange={(e) => setNewChapter({ ...newChapter, title: e.target.value })}
                className="form-control x-modal-input"
                placeholder="Ex: Qu’est-ce que la programmation ?"
              />
            </div>
            <div className="mb-3">
              <label className="x-courses-label">Contenu (Supporte HTML pour le formatage)</label>
              <textarea
                value={newChapter.content}
                onChange={(e) => setNewChapter({ ...newChapter, content: e.target.value })}
                className="form-control x-modal-input"
                placeholder="Ex: <p>La <strong>programmation</strong> consiste à...</p>"
              />
            </div>
            <div className="mb-3">
              <label className="x-courses-label">Vidéo (URL, optionnel)</label>
              <input
                type="text"
                value={newChapter.videoUrl}
                onChange={(e) => setNewChapter({ ...newChapter, videoUrl: e.target.value })}
                className="form-control x-modal-input"
                placeholder="Ex: https://example.com/chap1-video.mp4"
              />
            </div>
            <div className="mb-3">
              <label className="x-courses-label">PDF (URL, optionnel)</label>
              <input
                type="text"
                value={newChapter.pdfUrl}
                onChange={(e) => setNewChapter({ ...newChapter, pdfUrl: e.target.value })}
                className="form-control x-modal-input"
                placeholder="Ex: https://example.com/chap1.pdf"
              />
            </div>
            <div className="mb-3">
              <label className="x-courses-label">Exercice (optionnel, supporte HTML)</label>
              <textarea
                value={newChapter.exercise}
                onChange={(e) => setNewChapter({ ...newChapter, exercise: e.target.value })}
                className="form-control x-modal-input"
                placeholder="Ex: Créez une variable nommée <code>age</code>..."
              />
            </div>
            <div className="mb-3">
              <label className="x-courses-label">Solution (optionnel, supporte HTML)</label>
              <textarea
                value={newChapter.solution}
                onChange={(e) => setNewChapter({ ...newChapter, solution: e.target.value })}
                className="form-control x-modal-input"
                placeholder="Ex: <p>Voici une solution : <code>age = 25</code></p>"
              />
            </div>
            <button className="btn x-modal-save" onClick={handleAddChapter}>
              Ajouter le Chapitre
            </button>
          </div>

          {/* Liste des Chapitres */}
          <div className="mb-4">
            <h5>Chapitres</h5>
            {selectedModule.chapters.length > 0 ? (
              <ul>
                {selectedModule.chapters.map((chapter) => (
                  <li key={chapter.id}>
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
                  </li>
                ))}
              </ul>
            ) : (
              <p>Aucun chapitre disponible.</p>
            )}
          </div>

          {/* Ajouter un Quiz */}
          <div className="mb-4">
            <h4 className="x-form-title">Gérer le Quiz</h4>
            <div className="mb-3">
              <label className="x-courses-label">Question</label>
              <input
                type="text"
                value={newQuestion.question}
                onChange={(e) => setNewQuestion({ ...newQuestion, question: e.target.value })}
                className="form-control x-modal-input"
                placeholder="Ex: Qu’est-ce qu’une variable ?"
              />
            </div>
            <div className="mb-3">
              <label className="x-courses-label">Type de question</label>
              <select
                value={newQuestion.questionType}
                onChange={(e) => setNewQuestion({ ...newQuestion, questionType: e.target.value as 'single' | 'multiple', correctAnswers: [] })}
                className="form-select x-modal-input"
              >
                <option value="single">Choix unique</option>
                <option value="multiple">Choix multiple</option>
              </select>
            </div>
            {newQuestion.options.map((option, index) => (
              <div key={index} className="mb-3">
                <label className="x-courses-label">Option {index + 1}</label>
                <div className="d-flex align-items-center">
                  <input
                    type={newQuestion.questionType === 'single' ? 'radio' : 'checkbox'}
                    checked={newQuestion.correctAnswers.includes(index)}
                    onChange={() => {
                      if (newQuestion.questionType === 'single') {
                        setNewQuestion({ ...newQuestion, correctAnswers: [index] });
                      } else {
                        const updatedAnswers = newQuestion.correctAnswers.includes(index)
                          ? newQuestion.correctAnswers.filter((i) => i !== index)
                          : [...newQuestion.correctAnswers, index];
                        setNewQuestion({ ...newQuestion, correctAnswers: updatedAnswers });
                      }
                    }}
                    className="me-2"
                  />
                  <input
                    type="text"
                    value={option}
                    onChange={(e) => {
                      const updatedOptions = [...newQuestion.options];
                      updatedOptions[index] = e.target.value;
                      setNewQuestion({ ...newQuestion, options: updatedOptions });
                    }}
                    className="form-control x-modal-input"
                    placeholder={`Option ${index + 1}`}
                  />
                </div>
              </div>
            ))}
            <button className="btn x-modal-save mb-3" onClick={handleAddQuestion}>
              Ajouter la Question
            </button>
            <div>
              <h6>Questions ajoutées :</h6>
              {newQuiz.questions.length > 0 ? (
                <ul>
                  {newQuiz.questions.map((q) => (
                    <li key={q.id}>
                      {q.question} ({q.questionType === 'single' ? 'Choix unique' : 'Choix multiple'}) - Réponses correctes :{' '}
                      {q.correctAnswers.map((i) => q.options[i]).join(', ')}
                    </li>
                  ))}
                </ul>
              ) : (
                <p>Aucune question ajoutée.</p>
              )}
            </div>
            <button className="btn x-modal-save" onClick={handleAddQuiz}>
              Enregistrer le Quiz
            </button>
          </div>

          <button className="btn x-modal-close mt-2" onClick={() => setSelectedModule(null)}>
            Retourner à la Gestion des Modules
          </button>
        </div>
      )}
    </div>
  );
};

export default MyAgencyPage;