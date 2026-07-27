export type InterviewRole = 
  | 'Java Backend'
  | 'Python Backend'
  | 'Frontend'
  | 'Full Stack'
  | 'DevOps'
  | 'Flutter'
  | 'Android'
  | 'Machine Learning'
  | 'Frontend Architect'
  | 'Full Stack Engineer'
  | 'Product Manager'
  | 'AI / ML Researcher'
  | 'DevOps Engineer'
  | 'System Designer';

export type ExperienceLevel = 
  | 'Fresher' 
  | '1–2 Years' 
  | '3–5 Years' 
  | '5+ Years' 
  | 'Junior' 
  | 'Mid-Level' 
  | 'Senior' 
  | 'Staff / Principal';

export type InterviewDuration = '15 Minutes' | '30 Minutes' | '45 Minutes' | '60 Minutes';

export type InterviewDifficulty = 'Easy' | 'Medium' | 'Hard';

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  title: string;
  totalInterviews: number;
  completedInterviews: number;
  averageScore: number;
  highestScore: number;
  totalPracticeTime: string;
}

export interface InterviewConfig {
  role: InterviewRole;
  level: ExperienceLevel;
  difficulty: InterviewDifficulty;
  duration: InterviewDuration;
  focusArea: string;
  questionCount: number;
  timePerQuestion: number; // in seconds
  includeTechnicalCoding: boolean;
}

export interface MetricCardData {
  id: string;
  label: string;
  value: string;
  numericValue: number;
  change: string;
  isPositive: boolean;
  iconName: string;
  gradient: string;
}

export interface RecentSession {
  id: string;
  role: InterviewRole;
  level: ExperienceLevel;
  difficulty?: InterviewDifficulty;
  date: string;
  duration: string;
  score: number;
  status: 'Completed' | 'In Progress' | 'Needs Review';
  accuracy: string;
}

export interface InterviewQuestion {
  id: string;
  number: number;
  text: string;
  category: string;
  difficulty: InterviewDifficulty;
  expectedKeyPoints: string[];
  timeLimitSeconds: number;
  aiHint?: string;
  modelAnswer?: string;
}

export interface QuestionFeedback {
  score: number;
  feedback: string;
  strengths: string[];
  improvement: string;
  keyPointsMatched: string[];
}

export interface CompetencyScore {
  subject: string;
  score: number;
  fullMark: number;
}

export interface QuestionBreakdown {
  questionNumber: number;
  questionText: string;
  userScore: number;
  aiFeedback: string;
  keyPointsCovered: number;
  totalKeyPoints: number;
}

export interface EvaluationReport {
  sessionId: string;
  role: InterviewRole;
  level: ExperienceLevel;
  date: string;
  timeTaken: string;
  overallScore: number;
  technicalScore: number;
  communicationScore: number;
  confidenceScore: number;
  problemSolvingScore: number;
  summary: string;
  competencyScores: CompetencyScore[];
  strengths: string[];
  weaknesses: string[];
  actionableSuggestions: string[];
  recommendedTopics: string[];
  questionBreakdown: QuestionBreakdown[];
}

export type AppScreen = 
  | 'landing'
  | 'login'
  | 'dashboard' 
  | 'setup' 
  | 'loading-orb' 
  | 'session' 
  | 'ai-thinking' 
  | 'report' 
  | 'analytics'
  | 'history'
  | 'profile'
  | 'settings';
