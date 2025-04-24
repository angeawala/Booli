import { Course, UserProgress } from './types';

export const getCourses = (): Course[] => {
  const courses = localStorage.getItem('courses');
  return courses ? JSON.parse(courses) : [];
};

export const saveCourses = (courses: Course[]) => {
  localStorage.setItem('courses', JSON.stringify(courses));
};

export const getUserProgress = (): UserProgress[] => {
  const progress = localStorage.getItem('userProgress');
  return progress ? JSON.parse(progress) : [];
};

export const saveUserProgress = (progress: UserProgress[]) => {
  localStorage.setItem('userProgress', JSON.stringify(progress));
};

export const initializeCourses = () => {
  const courses: Course[] = [
    {
      id: 'course1',
      title: 'Introduction à la Programmation',
      description: 'Apprenez les bases de la programmation avec Python.',
      image: 'https://example.com/python-course.jpg',
      videoUrl: 'https://example.com/python-intro.mp4',
      isFree: true,
      isCertified: true,
      modules: [
        {
          id: 'mod1',
          title: 'Module Introductif',
          description: 'Les bases de la programmation.',
          isFree: true,
          chapters: [
            {
              id: 'chap1',
              title: 'Qu’est-ce que la programmation ?',
              content: '<p>La <strong>programmation</strong> consiste à donner des instructions à un ordinateur pour qu’il effectue des tâches. Voici les points clés :</p><ul><li><em>Langages</em> : Python, Java, etc.</li><li>Logique et structure</li></ul>',
              videoUrl: 'https://example.com/chap1-video.mp4',
              pdfUrl: 'https://example.com/chap1.pdf',
              createdAt: new Date('2025-04-01').toISOString(),
            },
            {
              id: 'chap2',
              title: 'Les variables',
              content: '<p>Une <strong>variable</strong> est une boîte qui contient une valeur.</p><p>Exemple : <code>x = 10</code></p>',
              exercise: 'Créez une variable nommée <code>age</code> et assignez-lui votre âge.',
              solution: '<p>Voici une solution : <code>age = 25</code></p>',
              createdAt: new Date('2025-04-01').toISOString(),
            },
          ],
          quiz: {
            id: 'quiz1',
            questions: [
              {
                id: 'q1',
                question: 'Qu’est-ce qu’une variable ?',
                questionType: 'single',
                options: ['Une fonction', 'Un conteneur pour une valeur', 'Une boucle', 'Un fichier'],
                correctAnswers: [1],
              },
              {
                id: 'q2',
                question: 'Quels langages sont utilisés pour programmer ?',
                questionType: 'multiple',
                options: ['HTML', 'Python', 'CSS', 'Java'],
                correctAnswers: [1, 3],
              },
            ],
            passingScore: 80,
          },
          createdAt: new Date('2025-04-01').toISOString(),
        },
        {
          id: 'mod2',
          title: 'Les boucles',
          description: 'Introduction aux boucles en programmation.',
          isFree: true,
          chapters: [
            {
              id: 'chap3',
              title: 'Boucle for',
              content: '<p>La boucle <strong>for</strong> permet de répéter des instructions.</p><p>Exemple : <code>for i in range(5): print(i)</code></p>',
              createdAt: new Date('2025-04-01').toISOString(),
            },
          ],
          quiz: {
            id: 'quiz2',
            questions: [
              {
                id: 'q3',
                question: 'Que fait une boucle for ?',
                questionType: 'single',
                options: ['Affiche une erreur', 'Répète une action', 'Crée une variable', 'Supprime un fichier'],
                correctAnswers: [1],
              },
            ],
            passingScore: 80,
          },
          createdAt: new Date('2025-04-01').toISOString(),
        },
      ],
      creatorId: 'user1',
      creatorType: 'user',
      creatorEmail: 'john.doe@example.com',
      isApproved: true,
      createdAt: new Date('2025-04-01').toISOString(),
      lastUpdated: new Date('2025-04-23').toISOString(),
    },
    {
      id: 'course2',
      title: 'Marketing Digital',
      description: 'Maîtrisez les stratégies de marketing digital.',
      image: 'https://example.com/marketing-course.jpg',
      isFree: false,
      isCertified: false,
      modules: [
        {
          id: 'mod3',
          title: 'Introduction au Marketing',
          description: 'Les bases du marketing digital.',
          isFree: true,
          chapters: [
            {
              id: 'chap4',
              title: 'SEO et SEA',
              content: '<p>Le <strong>SEO</strong> (Search Engine Optimization) améliore le classement organique, tandis que le <strong>SEA</strong> utilise des annonces payantes.</p>',
              videoUrl: 'https://example.com/seo-video.mp4',
              createdAt: new Date('2025-04-02').toISOString(),
            },
          ],
          quiz: {
            id: 'quiz3',
            questions: [
              {
                id: 'q4',
                question: 'Que signifie SEO ?',
                questionType: 'single',
                options: ['Search Engine Optimization', 'Social Engine Optimization', 'Search Engine Operation', 'Social Engine Operation'],
                correctAnswers: [0],
              },
            ],
            passingScore: 80,
          },
          createdAt: new Date('2025-04-02').toISOString(),
        },
        {
          id: 'mod4',
          title: 'Publicité sur les réseaux sociaux',
          description: 'Créer des campagnes efficaces.',
          isFree: false,
          chapters: [
            {
              id: 'chap5',
              title: 'Créer une campagne',
              content: '<p>Étapes pour une campagne :</p><ol><li>Définir un objectif</li><li>Choisir une plateforme</li></ol>',
              pdfUrl: 'https://example.com/campagne.pdf',
              createdAt: new Date('2025-04-02').toISOString(),
            },
          ],
          quiz: {
            id: 'quiz4',
            questions: [
              {
                id: 'q5',
                question: 'Quelles sont les étapes d’une campagne ?',
                questionType: 'multiple',
                options: ['Définir un objectif', 'Choisir une plateforme', 'Ignorer les résultats', 'Créer une annonce'],
                correctAnswers: [0, 1, 3],
              },
            ],
            passingScore: 80,
          },
          createdAt: new Date('2025-04-02').toISOString(),
        },
      ],
      creatorId: 'agency1',
      creatorType: 'agency',
      creatorEmail: 'agency@example.com',
      isApproved: false,
      createdAt: new Date('2025-04-02').toISOString(),
      lastUpdated: new Date('2025-04-22').toISOString(),
    },
  ];

  const userProgress: UserProgress[] = [
    {
      userEmail: 'student@example.com',
      courseId: 'course1',
      moduleProgress: [
        {
          moduleId: 'mod1',
          quizScore: 90,
          isCompleted: true,
          attempts: 2,
        },
        {
          moduleId: 'mod2',
          quizScore: 70,
          isCompleted: false,
          attempts: 1,
        },
      ],
    },
  ];

  saveCourses(courses);
  saveUserProgress(userProgress);
};