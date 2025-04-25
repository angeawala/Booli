'use client';

import { useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from '@/components/dashboard/Loader';
import { Agency, Category, Service, Opportunity } from '@/components/dashboard/agencies/types';
import { Course, Module, Chapter, Quiz, Question } from '@/components/dashboard/courses/types';
import { getAgencies, saveAgencies, getCategories } from '@/components/dashboard/agencies/data';
import { getCourses, saveCourses } from '@/components/dashboard/courses/data';
import '@/styles/dashboard/mon-agence.css';

// Simuler l'utilisateur connecté
const currentUser = { id: 'user123', email: 'john.doe@example.com', role: 'client' };

const MyAgencyPage = () => {
  const [loading, setLoading] = useState(false);
  const [agencies, setAgencies] = useState<Agency[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [myAgency, setMyAgency] = useState<Agency | null>(null);
  const [courses, setCourses] = useState<Course[]>([]);
  const [showCreateAgencyModal, setShowCreateAgencyModal] = useState(false);
  const [showUpdateAgencyModal, setShowUpdateAgencyModal] = useState(false);
  const [showAddServiceModal, setShowAddServiceModal] = useState(false);
  const [showEditServiceModal, setShowEditServiceModal] = useState(false);
  const [showAddOpportunityModal, setShowAddOpportunityModal] = useState(false);
  const [showEditOpportunityModal, setShowEditOpportunityModal] = useState(false);
  const [showAddCourseModal, setShowAddCourseModal] = useState(false);
  const [showManageModulesModal, setShowManageModulesModal] = useState(false);
  const [showManageContentModal, setShowManageContentModal] = useState(false);

  const [newAgency, setNewAgency] = useState({
    name: '',
    description: '',
    image: '',
    address: '',
    phone: '',
    hours: '',
    email: currentUser.email,
    website: '',
    categoryId: '',
    type: 'Agence' as 'Entreprise' | 'Agence' | 'ONG',
    domain: 'Voyage' as 'Voyage' | 'Marketing' | 'Événementiel' | 'Autre',
  });
  const [newService, setNewService] = useState({
    name: '',
    description: '',
    price: '',
    contact: '',
    descriptionUrl: '',
    descriptionImage: '',
  });
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [newOpportunity, setNewOpportunity] = useState({
    title: '',
    description: '',
    type: 'Job' as 'Job' | 'Partnership' | 'Other',
    endDate: '',
    subscriptionLink: '',
    contactNumber: '',
  });
  const [editingOpportunity, setEditingOpportunity] = useState<Opportunity | null>(null);
  const [newCourse, setNewCourse] = useState({
    title: '',
    description: '',
    image: '',
    videoUrl: '',
    isFree: true,
    isCertified: false,
    specifiedAuthor: '',
  });
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
    const allAgencies = getAgencies();
    setAgencies(allAgencies);
    const userAgency = allAgencies.find((agency) => agency.creatorEmail === currentUser.email);
    setMyAgency(userAgency || null);
    setCategories(getCategories());

    const allCourses = getCourses();
    const userCourses = allCourses.filter((course) => course.creatorEmail === currentUser.email);
    setCourses(userCourses);
  }, []);

  const handleCreateAgency = () => {
    if (!newAgency.name || !newAgency.description || !newAgency.categoryId) {
      toast.error('Veuillez remplir tous les champs obligatoires.');
      return;
    }
    setLoading(true);
    setTimeout(() => {
      const agency: Agency = {
        id: `agency${Date.now()}`,
        ...newAgency,
        services: [],
        opportunities: [],
        creatorEmail: currentUser.email,
        creatorType: currentUser.role === 'staff' ? 'staff' : 'user',
        isApproved: currentUser.role === 'staff',
        createdAt: new Date().toISOString(),
        lastUpdated: new Date().toISOString(),
      };
      const updatedAgencies = [...agencies, agency];
      setAgencies(updatedAgencies);
      saveAgencies(updatedAgencies);
      setMyAgency(agency);
      setShowCreateAgencyModal(false);
      toast.success('Agence créée avec succès !');
      setLoading(false);
    }, 1000);
  };

  const handleUpdateAgency = () => {
    if (!myAgency) return;
    setLoading(true);
    setTimeout(() => {
      const updatedAgencies = agencies.map((agency) =>
        agency.id === myAgency.id ? { ...myAgency, lastUpdated: new Date().toISOString() } : agency
      );
      setAgencies(updatedAgencies);
      saveAgencies(updatedAgencies);
      setShowUpdateAgencyModal(false);
      toast.success('Agence mise à jour avec succès');
      setLoading(false);
    }, 1000);
  };

  const handleAddService = () => {
    if (
      !myAgency ||
      !newService.name ||
      !newService.description ||
      !newService.price ||
      !newService.contact ||
      !newService.descriptionUrl ||
      !newService.descriptionImage
    ) {
      toast.error('Veuillez remplir tous les champs obligatoires.');
      return;
    }
    if (!newService.price.includes('FCFA')) {
      toast.error('Le prix doit inclure l\'unité "FCFA" et préciser la période (ex: "100 FCFA par jour").');
      return;
    }
    setLoading(true);
    setTimeout(() => {
      const updatedAgency: Agency = {
        ...myAgency,
        services: [
          ...myAgency.services,
          {
            id: `srv${Date.now()}`,
            name: newService.name,
            description: newService.description,
            price: newService.price,
            contact: newService.contact,
            descriptionUrl: newService.descriptionUrl,
            descriptionImage: newService.descriptionImage,
            createdAt: new Date().toISOString(),
          },
        ],
        lastUpdated: new Date().toISOString(),
      };
      const updatedAgencies = agencies.map((agency) =>
        agency.id === myAgency.id ? updatedAgency : agency
      );
      setAgencies(updatedAgencies);
      setMyAgency(updatedAgency);
      saveAgencies(updatedAgencies);
      setNewService({ name: '', description: '', price: '', contact: '', descriptionUrl: '', descriptionImage: '' });
      setShowAddServiceModal(false);
      toast.success('Service ajouté avec succès');
      setLoading(false);
    }, 1000);
  };

  const handleEditService = (service: Service) => {
    setEditingService(service);
    setShowEditServiceModal(true);
  };

  const handleUpdateService = () => {
    if (
      !myAgency ||
      !editingService ||
      !editingService.name ||
      !editingService.description ||
      !editingService.price ||
      !editingService.contact ||
      !editingService.descriptionUrl ||
      !editingService.descriptionImage
    ) {
      toast.error('Veuillez remplir tous les champs obligatoires.');
      return;
    }
    if (!editingService.price.includes('FCFA')) {
      toast.error('Le prix doit inclure l\'unité "FCFA" et préciser la période (ex: "100 FCFA par jour").');
      return;
    }
    setLoading(true);
    setTimeout(() => {
      const updatedAgency: Agency = {
        ...myAgency,
        services: myAgency.services.map((srv) =>
          srv.id === editingService.id ? editingService : srv
        ),
        lastUpdated: new Date().toISOString(),
      };
      const updatedAgencies = agencies.map((agency) =>
        agency.id === myAgency.id ? updatedAgency : agency
      );
      setAgencies(updatedAgencies);
      setMyAgency(updatedAgency);
      saveAgencies(updatedAgencies);
      setEditingService(null);
      setShowEditServiceModal(false);
      toast.success('Service mis à jour avec succès');
      setLoading(false);
    }, 1000);
  };

  const handleDeleteService = (serviceId: string) => {
    if (!myAgency || !confirm('Êtes-vous sûr de vouloir supprimer ce service ?')) return;
    setLoading(true);
    setTimeout(() => {
      const updatedAgency: Agency = {
        ...myAgency,
        services: myAgency.services.filter((service) => service.id !== serviceId),
        lastUpdated: new Date().toISOString(),
      };
      const updatedAgencies = agencies.map((agency) =>
        agency.id === myAgency.id ? updatedAgency : agency
      );
      setAgencies(updatedAgencies);
      setMyAgency(updatedAgency);
      saveAgencies(updatedAgencies);
      toast.success('Service supprimé avec succès');
      setLoading(false);
    }, 1000);
  };

  const handleAddOpportunity = () => {
    if (
      !myAgency ||
      !newOpportunity.title ||
      !newOpportunity.description ||
      !newOpportunity.endDate ||
      !newOpportunity.contactNumber
    ) return;
    setLoading(true);
    setTimeout(() => {
      const updatedAgency: Agency = {
        ...myAgency,
        opportunities: [
          ...myAgency.opportunities,
          {
            id: `opp${Date.now()}`,
            title: newOpportunity.title,
            description: newOpportunity.description,
            type: newOpportunity.type,
            endDate: newOpportunity.endDate,
            subscriptionLink: newOpportunity.subscriptionLink,
            contactNumber: newOpportunity.contactNumber,
            createdAt: new Date().toISOString(),
          },
        ],
        lastUpdated: new Date().toISOString(),
      };
      const updatedAgencies = agencies.map((agency) =>
        agency.id === myAgency.id ? updatedAgency : agency
      );
      setAgencies(updatedAgencies);
      setMyAgency(updatedAgency);
      saveAgencies(updatedAgencies);
      setNewOpportunity({ title: '', description: '', type: 'Job', endDate: '', subscriptionLink: '', contactNumber: '' });
      setShowAddOpportunityModal(false);
      toast.success('Opportunité ajoutée avec succès');
      setLoading(false);
    }, 1000);
  };

  const handleEditOpportunity = (opportunity: Opportunity) => {
    setEditingOpportunity(opportunity);
    setShowEditOpportunityModal(true);
  };

  const handleUpdateOpportunity = () => {
    if (
      !myAgency ||
      !editingOpportunity ||
      !editingOpportunity.title ||
      !editingOpportunity.description ||
      !editingOpportunity.endDate ||
      !editingOpportunity.contactNumber
    ) return;
    setLoading(true);
    setTimeout(() => {
      const updatedAgency: Agency = {
        ...myAgency,
        opportunities: myAgency.opportunities.map((opp) =>
          opp.id === editingOpportunity.id ? editingOpportunity : opp
        ),
        lastUpdated: new Date().toISOString(),
      };
      const updatedAgencies = agencies.map((agency) =>
        agency.id === myAgency.id ? updatedAgency : agency
      );
      setAgencies(updatedAgencies);
      setMyAgency(updatedAgency);
      saveAgencies(updatedAgencies);
      setEditingOpportunity(null);
      setShowEditOpportunityModal(false);
      toast.success('Opportunité mise à jour avec succès');
      setLoading(false);
    }, 1000);
  };

  const handleDeleteOpportunity = (oppId: string) => {
    if (!myAgency || !confirm('Êtes-vous sûr de vouloir supprimer cette opportunité ?')) return;
    setLoading(true);
    setTimeout(() => {
      const updatedAgency: Agency = {
        ...myAgency,
        opportunities: myAgency.opportunities.filter((opp) => opp.id !== oppId),
        lastUpdated: new Date().toISOString(),
      };
      const updatedAgencies = agencies.map((agency) =>
        agency.id === myAgency.id ? updatedAgency : agency
      );
      setAgencies(updatedAgencies);
      setMyAgency(updatedAgency);
      saveAgencies(updatedAgencies);
      toast.success('Opportunité supprimée avec succès');
      setLoading(false);
    }, 1000);
  };

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
        title: newCourse.title,
        description: newCourse.description,
        image: newCourse.image,
        videoUrl: newCourse.videoUrl,
        isFree: newCourse.isFree,
        isCertified: newCourse.isCertified,
        creatorId: currentUser.id,
        creatorEmail: currentUser.email,
        creatorType: currentUser.role === 'staff' ? 'staff' : 'user',
        specifiedAuthor: currentUser.role === 'staff' ? newCourse.specifiedAuthor : '',
        isApproved: currentUser.role === 'staff',
        modules: [],
        createdAt: new Date().toISOString(),
        lastUpdated: new Date().toISOString(),
      };
      const updatedCourses = [...courses, course];
      setCourses(updatedCourses);
      saveCourses(updatedCourses);
      setNewCourse({ title: '', description: '', image: '', videoUrl: '', isFree: true, isCertified: false, specifiedAuthor: '' });
      setShowAddCourseModal(false);
      toast.success('Cours créé avec succès');
      setLoading(false);
    }, 1000);
  };

  const handleDeleteCourse = (id: string) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer ce cours ?')) return;
    setLoading(true);
    setTimeout(() => {
      const updatedCourses = courses.filter((course) => course.id !== id);
      setCourses(updatedCourses);
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
      const updatedCourse: Course = {
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
      const updatedCourse: Course = {
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
      const updatedCourse: Course = {
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
      <h2 className="x-my-agency-title">Mon Agence</h2>

      {!myAgency ? (
        <div className="x-create-agency-form">
          <button className="btn x-submit-btn" onClick={() => setShowCreateAgencyModal(true)}>
            Créer une nouvelle agence
          </button>
        </div>
      ) : (
        <div className="x-agency-details">
          <h3 className="x-agency-title">Détails de votre agence</h3>
          {!myAgency.isApproved && (
            <div className="x-approval-warning">
              Votre agence est en attente d'approbation par un administrateur.
            </div>
          )}
          <div className="mb-3">
            <strong>Nom :</strong> {myAgency.name}
          </div>
          <div className="mb-3">
            <strong>Description :</strong> {myAgency.description}
          </div>
          {myAgency.image && (
            <div className="mb-3">
              <strong>Image :</strong> <a href={myAgency.image} target="_blank" rel="noopener noreferrer">Voir l'image</a>
            </div>
          )}
          <div className="mb-3">
            <strong>Adresse :</strong> {myAgency.address || 'Non spécifiée'}
          </div>
          <div className="mb-3">
            <strong>Téléphone :</strong> {myAgency.phone || 'Non spécifié'}
          </div>
          <div className="mb-3">
            <strong>Horaires :</strong> {myAgency.hours || 'Non spécifiés'}
          </div>
          <div className="mb-3">
            <strong>Email :</strong> {myAgency.email}
          </div>
          <div className="mb-3">
            <strong>Site web :</strong> {myAgency.website ? <a href={myAgency.website} target="_blank" rel="noopener noreferrer">Visiter</a> : 'Non spécifié'}
          </div>
          <div className="mb-3">
            <strong>Catégorie :</strong> {categories.find((cat) => cat.id === myAgency.categoryId)?.name || 'N/A'}
          </div>
          <div className="mb-3">
            <strong>Type :</strong> {myAgency.type}
          </div>
          <div className="mb-3">
            <strong>Domaine :</strong> {myAgency.domain}
          </div>
          <button className="btn x-submit-btn mb-4" onClick={() => setShowUpdateAgencyModal(true)}>
            Modifier l'agence
          </button>

          {/* Gérer les services */}
          <h4 className="x-section-title">Gérer les services</h4>
          {myAgency.services.length > 0 ? (
            <ul className="x-service-list">
              {myAgency.services.map((service) => (
                <li key={service.id} className="x-service-item">
                  <div>
                    <strong>{service.name}</strong>: {service.description} ({service.price})
                    <br />
                    Contact: {service.contact}
                    <br />
                    Description URL: <a href={service.descriptionUrl} target="_blank" rel="noopener noreferrer">Voir</a>
                    <br />
                    Description Image: <a href={service.descriptionImage} target="_blank" rel="noopener noreferrer">Voir</a>
                  </div>
                  <div>
                    <span className="x-action-icon" onClick={() => handleEditService(service)}>
                      <i className="fas fa-edit"></i>
                      <span className="x-action-tooltip">Modifier</span>
                    </span>
                    <span className="x-action-icon" onClick={() => handleDeleteService(service.id)}>
                      <i className="fas fa-trash"></i>
                      <span className="x-action-tooltip">Supprimer</span>
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p>Aucun service disponible.</p>
          )}
          <button className="btn x-submit-btn mb-4" onClick={() => setShowAddServiceModal(true)}>
            Ajouter un service
          </button>

          {/* Gérer les opportunités */}
          <h4 className="x-section-title">Gérer les opportunités</h4>
          {myAgency.opportunities.length > 0 ? (
            <ul className="x-opportunity-list">
              {myAgency.opportunities.map((opp) => (
                <li key={opp.id} className="x-opportunity-item">
                  <div>
                    <strong>{opp.title}</strong> ({opp.type}): {opp.description}
                    <br />
                    Date de fin: {new Date(opp.endDate).toLocaleDateString()}
                    <br />
                    Contact: {opp.contactNumber}
                    {opp.subscriptionLink && (
                      <>
                        <br />
                        <a href={opp.subscriptionLink} target="_blank" rel="noopener noreferrer">
                          Lien de souscription
                        </a>
                      </>
                    )}
                  </div>
                  <div>
                    <span className="x-action-icon" onClick={() => handleEditOpportunity(opp)}>
                      <i className="fas fa-edit"></i>
                      <span className="x-action-tooltip">Modifier</span>
                    </span>
                    <span className="x-action-icon" onClick={() => handleDeleteOpportunity(opp.id)}>
                      <i className="fas fa-trash"></i>
                      <span className="x-action-tooltip">Supprimer</span>
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p>Aucune opportunité disponible.</p>
          )}
          <button className="btn x-submit-btn mb-4" onClick={() => setShowAddOpportunityModal(true)}>
            Ajouter une opportunité
          </button>

          {/* Gérer les cours */}
          <h4 className="x-section-title">Gérer vos cours</h4>
          {courses.length > 0 ? (
            <ul className="x-service-list">
              {courses.map((course) => (
                <li key={course.id} className="x-service-item">
                  <div>
                    <strong>{course.title}</strong>: {course.description}
                    <br />
                    Gratuit: {course.isFree ? 'Oui' : 'Non'} | Certifié: {course.isCertified ? 'Oui' : 'Non'}
                    <br />
                    Statut: {course.isApproved ? 'Approuvé' : 'En attente'}
                  </div>
                  <div>
                    <span className="x-action-icon" onClick={() => { setSelectedCourse(course); setShowManageModulesModal(true); setSelectedModule(null); }}>
                      <i className="fas fa-cogs"></i>
                      <span className="x-action-tooltip">Gérer les Modules</span>
                    </span>
                    <span className="x-action-icon" onClick={() => handleDeleteCourse(course.id)}>
                      <i className="fas fa-trash"></i>
                      <span className="x-action-tooltip">Supprimer</span>
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p>Aucun cours disponible.</p>
          )}
          <button className="btn x-submit-btn mb-4" onClick={() => setShowAddCourseModal(true)}>
            Ajouter un cours
          </button>
        </div>
      )}

      {/* Modal pour créer une agence */}
      {showCreateAgencyModal && (
        <div className="x-modal-backdrop">
          <div className="x-modal">
            <h3 className="x-modal-title">Créer une nouvelle agence</h3>
            <div className="mb-3">
              <label className="x-my-agency-label">Nom *</label>
              <input
                type="text"
                value={newAgency.name}
                onChange={(e) => setNewAgency({ ...newAgency, name: e.target.value })}
                className="form-control x-my-agency-input"
                placeholder="Ex: Voyage Évasion"
              />
            </div>
            <div className="mb-3">
              <label className="x-my-agency-label">Description *</label>
              <textarea
                value={newAgency.description}
                onChange={(e) => setNewAgency({ ...newAgency, description: e.target.value })}
                className="form-control x-my-agency-input"
                placeholder="Ex: Agence de voyage spécialisée dans les destinations exotiques."
              />
            </div>
            <div className="mb-3">
              <label className="x-my-agency-label">Image (URL)</label>
              <input
                type="text"
                value={newAgency.image}
                onChange={(e) => setNewAgency({ ...newAgency, image: e.target.value })}
                className="form-control x-my-agency-input"
                placeholder="Ex: https://example.com/voyage-evasion.jpg"
              />
            </div>
            <div className="mb-3">
              <label className="x-my-agency-label">Adresse</label>
              <input
                type="text"
                value={newAgency.address}
                onChange={(e) => setNewAgency({ ...newAgency, address: e.target.value })}
                className="form-control x-my-agency-input"
                placeholder="Ex: 123 Rue des Voyageurs, Porto-Novo"
              />
            </div>
            <div className="mb-3">
              <label className="x-my-agency-label">Téléphone</label>
              <input
                type="text"
                value={newAgency.phone}
                onChange={(e) => setNewAgency({ ...newAgency, phone: e.target.value })}
                className="form-control x-my-agency-input"
                placeholder="Ex: +229 1234 5678"
              />
            </div>
            <div className="mb-3">
              <label className="x-my-agency-label">Horaires</label>
              <input
                type="text"
                value={newAgency.hours}
                onChange={(e) => setNewAgency({ ...newAgency, hours: e.target.value })}
                className="form-control x-my-agency-input"
                placeholder="Ex: Lun-Ven : 9h-17h"
              />
            </div>
            <div className="mb-3">
              <label className="x-my-agency-label">Site web</label>
              <input
                type="text"
                value={newAgency.website}
                onChange={(e) => setNewAgency({ ...newAgency, website: e.target.value })}
                className="form-control x-my-agency-input"
                placeholder="Ex: https://voyage-evasion.com"
              />
            </div>
            <div className="mb-3">
              <label className="x-my-agency-label">Catégorie *</label>
              <select
                value={newAgency.categoryId}
                onChange={(e) => setNewAgency({ ...newAgency, categoryId: e.target.value })}
                className="form-select x-my-agency-input"
              >
                <option value="">Sélectionner une catégorie</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-3">
              <label className="x-my-agency-label">Type</label>
              <select
                value={newAgency.type}
                onChange={(e) => setNewAgency({ ...newAgency, type: e.target.value as 'Entreprise' | 'Agence' | 'ONG' })}
                className="form-select x-my-agency-input"
              >
                <option value="Entreprise">Entreprise</option>
                <option value="Agence">Agence</option>
                <option value="ONG">ONG</option>
              </select>
            </div>
            <div className="mb-3">
              <label className="x-my-agency-label">Domaine</label>
              <select
                value={newAgency.domain}
                onChange={(e) => setNewAgency({ ...newAgency, domain: e.target.value as 'Voyage' | 'Marketing' | 'Événementiel' | 'Autre' })}
                className="form-select x-my-agency-input"
              >
                <option value="Voyage">Voyage</option>
                <option value="Marketing">Marketing</option>
                <option value="Événementiel">Événementiel</option>
                <option value="Autre">Autre</option>
              </select>
            </div>
            <button className="btn x-submit-btn mb-3" onClick={handleCreateAgency}>
              Créer l'agence
            </button>
            <button className="btn x-modal-close mt-2" onClick={() => setShowCreateAgencyModal(false)}>
              Fermer
            </button>
          </div>
        </div>
      )}

      {/* Modal pour modifier l'agence */}
      {showUpdateAgencyModal && myAgency && (
        <div className="x-modal-backdrop">
          <div className="x-modal">
            <h3 className="x-modal-title">Modifier l'agence</h3>
            <div className="mb-3">
              <label className="x-my-agency-label">Nom</label>
              <input
                type="text"
                value={myAgency.name}
                onChange={(e) => setMyAgency({ ...myAgency, name: e.target.value })}
                className="form-control x-my-agency-input"
                placeholder="Ex: Voyage Évasion"
              />
            </div>
            <div className="mb-3">
              <label className="x-my-agency-label">Description</label>
              <textarea
                value={myAgency.description}
                onChange={(e) => setMyAgency({ ...myAgency, description: e.target.value })}
                className="form-control x-my-agency-input"
                placeholder="Ex: Agence de voyage spécialisée dans les destinations exotiques."
              />
            </div>
            <div className="mb-3">
              <label className="x-my-agency-label">Image (URL)</label>
              <input
                type="text"
                value={myAgency.image}
                onChange={(e) => setMyAgency({ ...myAgency, image: e.target.value })}
                className="form-control x-my-agency-input"
                placeholder="Ex: https://example.com/voyage-evasion.jpg"
              />
            </div>
            <div className="mb-3">
              <label className="x-my-agency-label">Adresse</label>
              <input
                type="text"
                value={myAgency.address}
                onChange={(e) => setMyAgency({ ...myAgency, address: e.target.value })}
                className="form-control x-my-agency-input"
                placeholder="Ex: 123 Rue des Voyageurs, Porto-Novo"
              />
            </div>
            <div className="mb-3">
              <label className="x-my-agency-label">Téléphone</label>
              <input
                type="text"
                value={myAgency.phone}
                onChange={(e) => setMyAgency({ ...myAgency, phone: e.target.value })}
                className="form-control x-my-agency-input"
                placeholder="Ex: +229 1234 5678"
              />
            </div>
            <div className="mb-3">
              <label className="x-my-agency-label">Horaires</label>
              <input
                type="text"
                value={myAgency.hours}
                onChange={(e) => setMyAgency({ ...myAgency, hours: e.target.value })}
                className="form-control x-my-agency-input"
                placeholder="Ex: Lun-Ven : 9h-17h"
              />
            </div>
            <div className="mb-3">
              <label className="x-my-agency-label">Email</label>
              <input
                type="email"
                value={myAgency.email}
                className="form-control x-my-agency-input x-my-agency-input-disabled"
                disabled
              />
            </div>
            <div className="mb-3">
              <label className="x-my-agency-label">Site web</label>
              <input
                type="text"
                value={myAgency.website}
                onChange={(e) => setMyAgency({ ...myAgency, website: e.target.value })}
                className="form-control x-my-agency-input"
                placeholder="Ex: https://voyage-evasion.com"
              />
            </div>
            <div className="mb-3">
              <label className="x-my-agency-label">Catégorie</label>
              <select
                value={myAgency.categoryId}
                onChange={(e) => setMyAgency({ ...myAgency, categoryId: e.target.value })}
                className="form-select x-my-agency-input"
              >
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-3">
              <label className="x-my-agency-label">Type</label>
              <select
                value={myAgency.type}
                onChange={(e) => setMyAgency({ ...myAgency, type: e.target.value as 'Entreprise' | 'Agence' | 'ONG' })}
                className="form-select x-my-agency-input"
              >
                <option value="Entreprise">Entreprise</option>
                <option value="Agence">Agence</option>
                <option value="ONG">ONG</option>
              </select>
            </div>
            <div className="mb-3">
              <label className="x-my-agency-label">Domaine</label>
              <select
                value={myAgency.domain}
                onChange={(e) => setMyAgency({ ...myAgency, domain: e.target.value as 'Voyage' | 'Marketing' | 'Événementiel' | 'Autre' })}
                className="form-select x-my-agency-input"
              >
                <option value="Voyage">Voyage</option>
                <option value="Marketing">Marketing</option>
                <option value="Événementiel">Événementiel</option>
                <option value="Autre">Autre</option>
              </select>
            </div>
            <button className="btn x-submit-btn mb-3" onClick={handleUpdateAgency}>
              Mettre à jour l'agence
            </button>
            <button className="btn x-modal-close mt-2" onClick={() => setShowUpdateAgencyModal(false)}>
              Fermer
            </button>
          </div>
        </div>
      )}

      {/* Modal pour ajouter un service */}
      {showAddServiceModal && (
        <div className="x-modal-backdrop">
          <div className="x-modal">
            <h3 className="x-modal-title">Ajouter un service</h3>
            <div className="mb-3">
              <label className="x-my-agency-label">Nom *</label>
              <input
                type="text"
                value={newService.name}
                onChange={(e) => setNewService({ ...newService, name: e.target.value })}
                className="form-control x-my-agency-input"
                placeholder="Ex: Circuit Asie"
              />
            </div>
            <div className="mb-3">
              <label className="x-my-agency-label">Description *</label>
              <textarea
                value={newService.description}
                onChange={(e) => setNewService({ ...newService, description: e.target.value })}
                className="form-control x-my-agency-input"
                placeholder="Ex: Voyage organisé en Asie du Sud-Est."
              />
            </div>
            <div className="mb-3">
              <label className="x-my-agency-label">Prix *</label>
              <input
                type="text"
                value={newService.price}
                onChange={(e) => setNewService({ ...newService, price: e.target.value })}
                className="form-control x-my-agency-input"
                placeholder="Ex: 100 FCFA par jour ou 1000 FCFA minimum par mois"
              />
              <small className="x-price-info">
                Format attendu : "100 FCFA par jour" pour les services quotidiens, ou "1000 FCFA minimum par mois" pour les abonnements mensuels. Pour les voyages, précisez "5000 FCFA par voyage".
              </small>
            </div>
            <div className="mb-3">
              <label className="x-my-agency-label">Contact *</label>
              <input
                type="text"
                value={newService.contact}
                onChange={(e) => setNewService({ ...newService, contact: e.target.value })}
                className="form-control x-my-agency-input"
                placeholder="Ex: +229 1234 5678"
              />
            </div>
            <div className="mb-3">
              <label className="x-my-agency-label">URL de description *</label>
              <input
                type="text"
                value={newService.descriptionUrl}
                onChange={(e) => setNewService({ ...newService, descriptionUrl: e.target.value })}
                className="form-control x-my-agency-input"
                placeholder="Ex: https://example.com/service-details"
              />
            </div>
            <div className="mb-3">
              <label className="x-my-agency-label">Image de description (URL) *</label>
              <input
                type="text"
                value={newService.descriptionImage}
                onChange={(e) => setNewService({ ...newService, descriptionImage: e.target.value })}
                className="form-control x-my-agency-input"
                placeholder="Ex: https://example.com/service-image.jpg"
              />
            </div>
            <button className="btn x-submit-btn mb-3" onClick={handleAddService}>
              Ajouter le service
            </button>
            <button className="btn x-modal-close mt-2" onClick={() => setShowAddServiceModal(false)}>
              Fermer
            </button>
          </div>
        </div>
      )}

      {/* Modal pour modifier un service */}
      {showEditServiceModal && editingService && (
        <div className="x-modal-backdrop">
          <div className="x-modal">
            <h3 className="x-modal-title">Modifier le Service</h3>
            <div className="mb-3">
              <label className="x-my-agency-label">Nom *</label>
              <input
                type="text"
                value={editingService.name}
                onChange={(e) => setEditingService({ ...editingService, name: e.target.value })}
                className="form-control x-modal-input"
                placeholder="Ex: Circuit Asie"
              />
            </div>
            <div className="mb-3">
              <label className="x-my-agency-label">Description *</label>
              <textarea
                value={editingService.description}
                onChange={(e) => setEditingService({ ...editingService, description: e.target.value })}
                className="form-control x-modal-input"
                placeholder="Ex: Voyage organisé en Asie du Sud-Est."
              />
            </div>
            <div className="mb-3">
              <label className="x-my-agency-label">Prix *</label>
              <input
                type="text"
                value={editingService.price}
                onChange={(e) => setEditingService({ ...editingService, price: e.target.value })}
                className="form-control x-modal-input"
                placeholder="Ex: 100 FCFA par jour ou 1000 FCFA minimum par mois"
              />
              <small className="x-price-info">
                Format attendu : "100 FCFA par jour" pour les services quotidiens, ou "1000 FCFA minimum par mois" pour les abonnements mensuels. Pour les voyages, précisez "5000 FCFA par voyage".
              </small>
            </div>
            <div className="mb-3">
              <label className="x-my-agency-label">Contact *</label>
              <input
                type="text"
                value={editingService.contact}
                onChange={(e) => setEditingService({ ...editingService, contact: e.target.value })}
                className="form-control x-modal-input"
                placeholder="Ex: +229 1234 5678"
              />
            </div>
            <div className="mb-3">
              <label className="x-my-agency-label">URL de description *</label>
              <input
                type="text"
                value={editingService.descriptionUrl}
                onChange={(e) => setEditingService({ ...editingService, descriptionUrl: e.target.value })}
                className="form-control x-modal-input"
                placeholder="Ex: https://example.com/service-details"
              />
            </div>
            <div className="mb-3">
              <label className="x-my-agency-label">Image de description (URL) *</label>
              <input
                type="text"
                value={editingService.descriptionImage}
                onChange={(e) => setEditingService({ ...editingService, descriptionImage: e.target.value })}
                className="form-control x-modal-input"
                placeholder="Ex: https://example.com/service-image.jpg"
              />
            </div>
            <button className="btn x-modal-save mb-3" onClick={handleUpdateService}>
              Mettre à jour
            </button>
            <button className="btn x-modal-close mt-2" onClick={() => setShowEditServiceModal(false)}>
              Fermer
            </button>
          </div>
        </div>
      )}

      {/* Modal pour ajouter une opportunité */}
      {showAddOpportunityModal && (
        <div className="x-modal-backdrop">
          <div className="x-modal">
            <h3 className="x-modal-title">Ajouter une opportunité</h3>
            <div className="mb-3">
              <label className="x-my-agency-label">Titre *</label>
              <input
                type="text"
                value={newOpportunity.title}
                onChange={(e) => setNewOpportunity({ ...newOpportunity, title: e.target.value })}
                className="form-control x-my-agency-input"
                placeholder="Ex: Recrutement Guide"
              />
            </div>
            <div className="mb-3">
              <label className="x-my-agency-label">Description *</label>
              <textarea
                value={newOpportunity.description}
                onChange={(e) => setNewOpportunity({ ...newOpportunity, description: e.target.value })}
                className="form-control x-my-agency-input"
                placeholder="Ex: Recherchons des guides touristiques pour l’Asie."
              />
            </div>
            <div className="mb-3">
              <label className="x-my-agency-label">Type</label>
              <select
                value={newOpportunity.type}
                onChange={(e) => setNewOpportunity({ ...newOpportunity, type: e.target.value as 'Job' | 'Partnership' | 'Other' })}
                className="form-select x-my-agency-input"
              >
                <option value="Job">Emploi</option>
                <option value="Partnership">Partenariat</option>
                <option value="Other">Autre</option>
              </select>
            </div>
            <div className="mb-3">
              <label className="x-my-agency-label">Date de fin *</label>
              <input
                type="date"
                value={newOpportunity.endDate}
                onChange={(e) => setNewOpportunity({ ...newOpportunity, endDate: e.target.value })}
                className="form-control x-my-agency-input"
              />
            </div>
            <div className="mb-3">
              <label className="x-my-agency-label">Lien de souscription (optionnel)</label>
              <input
                type="text"
                value={newOpportunity.subscriptionLink}
                onChange={(e) => setNewOpportunity({ ...newOpportunity, subscriptionLink: e.target.value })}
                className="form-control x-my-agency-input"
                placeholder="Ex: https://example.com/apply"
              />
            </div>
            <div className="mb-3">
              <label className="x-my-agency-label">Numéro de contact *</label>
              <input
                type="text"
                value={newOpportunity.contactNumber}
                onChange={(e) => setNewOpportunity({ ...newOpportunity, contactNumber: e.target.value })}
                className="form-control x-my-agency-input"
                placeholder="Ex: +229 1234 5678"
              />
            </div>
            <button className="btn x-submit-btn mb-3" onClick={handleAddOpportunity}>
              Ajouter l'opportunité
            </button>
            <button className="btn x-modal-close mt-2" onClick={() => setShowAddOpportunityModal(false)}>
              Fermer
            </button>
          </div>
        </div>
      )}

      {/* Modal pour modifier une opportunité */}
      {showEditOpportunityModal && editingOpportunity && (
        <div className="x-modal-backdrop">
          <div className="x-modal">
            <h3 className="x-modal-title">Modifier l'Opportunité</h3>
            <div className="mb-3">
              <label className="x-my-agency-label">Titre *</label>
              <input
                type="text"
                value={editingOpportunity.title}
                onChange={(e) => setEditingOpportunity({ ...editingOpportunity, title: e.target.value })}
                className="form-control x-modal-input"
                placeholder="Ex: Recrutement Guide"
              />
            </div>
            <div className="mb-3">
              <label className="x-my-agency-label">Description *</label>
              <textarea
                value={editingOpportunity.description}
                onChange={(e) => setEditingOpportunity({ ...editingOpportunity, description: e.target.value })}
                className="form-control x-modal-input"
                placeholder="Ex: Recherchons des guides touristiques pour l’Asie."
              />
            </div>
            <div className="mb-3">
              <label className="x-my-agency-label">Type</label>
              <select
                value={editingOpportunity.type}
                onChange={(e) => setEditingOpportunity({ ...editingOpportunity, type: e.target.value as 'Job' | 'Partnership' | 'Other' })}
                className="form-select x-modal-input"
              >
                <option value="Job">Emploi</option>
                <option value="Partnership">Partenariat</option>
                <option value="Other">Autre</option>
              </select>
            </div>
            <div className="mb-3">
              <label className="x-my-agency-label">Date de fin *</label>
              <input
                type="date"
                value={editingOpportunity.endDate}
                onChange={(e) => setEditingOpportunity({ ...editingOpportunity, endDate: e.target.value })}
                className="form-control x-modal-input"
              />
            </div>
            <div className="mb-3">
              <label className="x-my-agency-label">Lien de souscription (optionnel)</label>
              <input
                type="text"
                value={editingOpportunity.subscriptionLink}
                onChange={(e) => setEditingOpportunity({ ...editingOpportunity, subscriptionLink: e.target.value })}
                className="form-control x-modal-input"
                placeholder="Ex: https://example.com/apply"
              />
            </div>
            <div className="mb-3">
              <label className="x-my-agency-label">Numéro de contact *</label>
              <input
                type="text"
                value={editingOpportunity.contactNumber}
                onChange={(e) => setEditingOpportunity({ ...editingOpportunity, contactNumber: e.target.value })}
                className="form-control x-modal-input"
                placeholder="Ex: +229 1234 5678"
              />
            </div>
            <button className="btn x-modal-save mb-3" onClick={handleUpdateOpportunity}>
              Mettre à jour
            </button>
            <button className="btn x-modal-close mt-2" onClick={() => setShowEditOpportunityModal(false)}>
              Fermer
            </button>
          </div>
        </div>
      )}

      {/* Modal pour ajouter un cours */}
      {showAddCourseModal && (
        <div className="x-modal-backdrop">
          <div className="x-modal">
            <h3 className="x-modal-title">Ajouter un Cours</h3>
            <div className="mb-3">
              <label className="x-my-agency-label">Titre *</label>
              <input
                type="text"
                value={newCourse.title}
                onChange={(e) => setNewCourse({ ...newCourse, title: e.target.value })}
                className="form-control x-modal-input"
                placeholder="Ex: Introduction à la Programmation"
              />
            </div>
            <div className="mb-3">
              <label className="x-my-agency-label">Description *</label>
              <textarea
                value={newCourse.description}
                onChange={(e) => setNewCourse({ ...newCourse, description: e.target.value })}
                className="form-control x-modal-input"
                placeholder="Ex: Apprenez les bases de la programmation avec Python."
              />
            </div>
            <div className="mb-3">
              <label className="x-my-agency-label">Image (URL) *</label>
              <input
                type="text"
                value={newCourse.image}
                onChange={(e) => setNewCourse({ ...newCourse, image: e.target.value })}
                className="form-control x-modal-input"
                placeholder="Ex: https://example.com/python-course.jpg"
              />
            </div>
            <div className="mb-3">
              <label className="x-my-agency-label">Vidéo de description (URL, optionnel)</label>
              <input
                type="text"
                value={newCourse.videoUrl}
                onChange={(e) => setNewCourse({ ...newCourse, videoUrl: e.target.value })}
                className="form-control x-modal-input"
                placeholder="Ex: https://example.com/python-intro.mp4"
              />
            </div>
            <div className="mb-3">
              <label className="x-my-agency-label">Gratuit</label>
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
              <label className="x-my-agency-label">Certifié</label>
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
                <label className="x-my-agency-label">Auteur du cours *</label>
                <input
                  type="text"
                  value={newCourse.specifiedAuthor}
                  onChange={(e) => setNewCourse({ ...newCourse, specifiedAuthor: e.target.value })}
                  className="form-control x-modal-input"
                  placeholder="Ex: John Doe"
                />
              </div>
            )}
            <button className="btn x-modal-save mb-3" onClick={handleAddCourse}>
              Ajouter le cours
            </button>
            <button className="btn x-modal-close mt-2" onClick={() => setShowAddCourseModal(false)}>
              Fermer
            </button>
          </div>
        </div>
      )}

      {/* Modal pour gérer les modules */}
      {showManageModulesModal && selectedCourse && (
        <div className="x-modal-backdrop">
          <div className="x-modal">
            <h3 className="x-modal-title">Gérer les Modules de "{selectedCourse.title}"</h3>
            <div className="mb-4">
              <h4 className="x-form-title">Ajouter un Module</h4>
              <div className="mb-3">
                <label className="x-my-agency-label">Titre *</label>
                <input
                  type="text"
                  value={newModule.title}
                  onChange={(e) => setNewModule({ ...newModule, title: e.target.value })}
                  className="form-control x-modal-input"
                  placeholder="Ex: Module Introductif"
                />
              </div>
              <div className="mb-3">
                <label className="x-my-agency-label">Description *</label>
                <textarea
                  value={newModule.description}
                  onChange={(e) => setNewModule({ ...newModule, description: e.target.value })}
                  className="form-control x-modal-input"
                  placeholder="Ex: Les bases de la programmation."
                />
              </div>
              {selectedCourse.modules.length > 0 && !selectedCourse.isFree && (
                <div className="mb-3">
                  <label className="x-my-agency-label">Gratuit</label>
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
              <button className="btn x-modal-save mb-3" onClick={handleAddModule}>
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
                  onClick={() => { setSelectedModule(module); setShowManageModulesModal(false); setShowManageContentModal(true); }}
                >
                  Gérer les Chapitres et Quiz
                </button>
              </div>
            ))}
            <button className="btn x-modal-close mt-2" onClick={() => setShowManageModulesModal(false)}>
              Fermer
            </button>
          </div>
        </div>
      )}

      {/* Modal pour gérer les chapitres et quiz */}
      {showManageContentModal && selectedCourse && selectedModule && (
        <div className="x-modal-backdrop">
          <div className="x-modal">
            <h3 className="x-modal-title">Gérer le Contenu de "{selectedModule.title}"</h3>

            {/* Ajouter un Chapitre */}
            <div className="mb-4">
              <h4 className="x-form-title">Ajouter un Chapitre</h4>
              <div className="mb-3">
                <label className="x-my-agency-label">Titre *</label>
                <input
                  type="text"
                  value={newChapter.title}
                  onChange={(e) => setNewChapter({ ...newChapter, title: e.target.value })}
                  className="form-control x-modal-input"
                  placeholder="Ex: Qu’est-ce que la programmation ?"
                />
              </div>
              <div className="mb-3">
                <label className="x-my-agency-label">Contenu (Supporte HTML pour le formatage)</label>
                <textarea
                  value={newChapter.content}
                  onChange={(e) => setNewChapter({ ...newChapter, content: e.target.value })}
                  className="form-control x-modal-input"
                  placeholder="Ex: <p>La <strong>programmation</strong> consiste à...</p>"
                />
              </div>
              <div className="mb-3">
                <label className="x-my-agency-label">Vidéo (URL, optionnel)</label>
                <input
                  type="text"
                  value={newChapter.videoUrl}
                  onChange={(e) => setNewChapter({ ...newChapter, videoUrl: e.target.value })}
                  className="form-control x-modal-input"
                  placeholder="Ex: https://example.com/chap1-video.mp4"
                />
              </div>
              <div className="mb-3">
                <label className="x-my-agency-label">PDF (URL, optionnel)</label>
                <input
                  type="text"
                  value={newChapter.pdfUrl}
                  onChange={(e) => setNewChapter({ ...newChapter, pdfUrl: e.target.value })}
                  className="form-control x-modal-input"
                  placeholder="Ex: https://example.com/chap1.pdf"
                />
              </div>
              <div className="mb-3">
                <label className="x-my-agency-label">Exercice (optionnel, supporte HTML)</label>
                <textarea
                  value={newChapter.exercise}
                  onChange={(e) => setNewChapter({ ...newChapter, exercise: e.target.value })}
                  className="form-control x-modal-input"
                  placeholder="Ex: Créez une variable nommée <code>age</code>..."
                />
              </div>
              <div className="mb-3">
                <label className="x-my-agency-label">Solution (optionnel, supporte HTML)</label>
                <textarea
                  value={newChapter.solution}
                  onChange={(e) => setNewChapter({ ...newChapter, solution: e.target.value })}
                  className="form-control x-modal-input"
                  placeholder="Ex: <p>Voici une solution : <code>age = 25</code></p>"
                />
              </div>
              <button className="btn x-modal-save mb-3" onClick={handleAddChapter}>
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
                <label className="x-my-agency-label">Question</label>
                <input
                  type="text"
                  value={newQuestion.question}
                  onChange={(e) => setNewQuestion({ ...newQuestion, question: e.target.value })}
                  className="form-control x-modal-input"
                  placeholder="Ex: Qu’est-ce qu’une variable ?"
                />
              </div>
              <div className="mb-3">
                <label className="x-my-agency-label">Type de question</label>
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
                  <label className="x-my-agency-label">Option {index + 1}</label>
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
              <button className="btn x-modal-save mb-3" onClick={handleAddQuiz}>
                Enregistrer le Quiz
              </button>
            </div>

            <button className="btn x-modal-close mt-2" onClick={() => { setShowManageContentModal(false); setShowManageModulesModal(true); }}>
              Retourner à la Gestion des Modules
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyAgencyPage;