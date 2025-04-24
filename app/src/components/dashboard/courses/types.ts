export interface Course {
    id: string;
    title: string;
    description: string;
    image: string;
    videoUrl?: string;
    isFree: boolean;
    isCertified: boolean;
    modules: Module[];
    creatorId: string;
    creatorType: 'user' | 'agency' | 'staff';
    creatorEmail: string;
    specifiedAuthor?: string;
    isApproved: boolean;
    createdAt: string;
    lastUpdated: string;
  }
  
  export interface Module {
    id: string;
    title: string;
    description: string;
    isFree: boolean;
    chapters: Chapter[];
    quiz: Quiz;
    createdAt: string;
  }
  
  export interface Chapter {
    id: string;
    title: string;
    content: string;
    videoUrl?: string;
    pdfUrl?: string;
    exercise?: string;
    solution?: string;
    createdAt: string;
  }
  
  export interface Quiz {
    id: string;
    questions: Question[];
    passingScore: number;
  }
  
  export interface Question {
    id: string;
    question: string;
    questionType: 'single' | 'multiple'; // Choix unique ou multiple
    options: string[];
    correctAnswers: number[]; // Tableau pour supporter les choix multiples
  }
  
  export interface UserProgress {
    userEmail: string;
    courseId: string;
    moduleProgress: ModuleProgress[];
    completedAt?: string;
  }
  
  export interface ModuleProgress {
    moduleId: string;
    quizScore: number;
    isCompleted: boolean;
    attempts: number;
  }