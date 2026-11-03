export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: 'student' | 'engineer' | 'admin';
  targetRole: string; // e.g., "Full-Stack AI Engineer"
  headline: string;
  bio: string;
  avatarUrl?: string;
  cgpa: number; // e.g., 8.6
  graduationYear: number; // e.g., 2025
  degree: string; // e.g., "B.Tech in Computer Science"
  activeBacklogs: number; // e.g., 0
  githubUsername: string; // e.g., "alex-rivers"
  readinessScore: number; // 0 - 100
  streakDays: number;
  weeklyGoalHours: number;
  completedHoursThisWeek: number;
  verifiedSkills: Record<string, { level: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert'; score: number; verifiedDate: string }>;
  selfDeclaredSkills: string[];
  achievements: AchievementBadge[];
}

export interface AchievementBadge {
  id: string;
  title: string;
  description: string;
  category: 'skills' | 'interviews' | 'consistency' | 'portfolio';
  icon: string;
  unlockedAt?: string;
  progress?: number; // 0 - 100
}

export interface ResumeDocument {
  id: string;
  title: string;
  versionName: string;
  targetRole: string;
  atsScore: number;
  summary: string;
  skills: string[];
  education: { institution: string; degree: string; year: string; gpa?: string }[];
  experience: { company: string; role: string; duration: string; bulletPoints: string[] }[];
  projects: { title: string; tech: string[]; description: string; impact: string }[];
  rawText: string;
  createdAt: string;
  updatedAt: string;
}

export interface JobOpportunity {
  id: string;
  company: string;
  logo: string;
  role: string;
  category: 'Software Engineering' | 'AI / Machine Learning' | 'DevOps & Cloud' | 'Data Engineering' | 'Cybersecurity';
  type: 'Internship' | 'Full-Time' | 'Co-op';
  location: string;
  isRemote: boolean;
  stipendOrSalary: string;
  deadline: string;
  minCgpa: number;
  eligibleGradYears: number[];
  allowedDegrees: string[];
  maxBacklogs: number;
  requiredSkills: string[];
  description: string;
  matchScore?: number;
  eligibilityStatus?: 'ELIGIBLE' | 'CONDITIONAL_WARNING' | 'NOT_ELIGIBLE';
}

export interface JobApplication {
  id: string;
  opportunityId?: string;
  company: string;
  role: string;
  location: string;
  salary: string;
  appliedDate: string;
  status: 'Wishlist' | 'Applied' | 'Screening' | 'Interviewing' | 'Offer' | 'Rejected';
  interviewDate?: string;
  followUpDate?: string;
  recruiterContact?: string;
  notes: string;
  atsScore?: number;
}

export interface SkillAssessment {
  id: string;
  title: string;
  skillName: string;
  category: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  timeMinutes: number;
  questionsCount: number;
  badgeAwarded: string;
  questions: {
    id: string;
    question: string;
    codeSnippet?: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  }[];
}

export interface CodingChallenge {
  id: string;
  title: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  category: string;
  timeLimitMin: number;
  description: string;
  starterCode: string;
  solutionHint: string;
  testCases: { input: string; expected: string; description: string }[];
}

export interface InterviewSession {
  id: string;
  title: string;
  type: 'Technical' | 'HR & Behavioral' | 'System Design' | 'AI & Algorithms';
  targetRole: string;
  status: 'Completed' | 'In Progress';
  date: string;
  overallScore: number;
  technicalScore: number;
  communicationScore: number;
  turns: {
    question: string;
    candidateAnswer: string;
    aiFeedback: string;
    improvedAnswer: string;
    score: number;
  }[];
}

export interface PortfolioProject {
  id: string;
  title: string;
  tagline: string;
  problemStatement: string;
  techStack: string[];
  repoUrl: string;
  demoUrl: string;
  architectureDetails: string;
  evaluationScore?: number;
  evaluationRubric?: {
    problemClarity: number;
    techDepth: number;
    documentation: number;
    careerRelevance: number;
    liveDemo: number;
    feedback: string;
  };
}

export interface RoadmapNode {
  id: string;
  title: string;
  category: string;
  estimatedHours: number;
  status: 'completed' | 'in_progress' | 'locked';
  description: string;
  prerequisites: string[];
  learningResources: { title: string; url: string; type: 'doc' | 'video' | 'practice' }[];
  projectPrompt: string;
}

export interface CalendarEvent {
  id: string;
  title: string;
  date: string; // YYYY-MM-DD
  time?: string;
  type: 'interview' | 'deadline' | 'learning' | 'reminder';
  completed: boolean;
  notes?: string;
  googleEventId?: string;
  googleEventLink?: string;
  durationMinutes?: number;
  interviewType?: 'Technical' | 'HR & Behavioral' | 'System Design';
  targetRole?: string;
}

export interface AppNotification {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  type: 'deadline' | 'streak' | 'interview' | 'system';
  read: boolean;
}

export interface PeerGroup {
  id: string;
  name: string;
  focusRole: string;
  memberCount: number;
  weeklyGoal: string;
  meetingDay: string;
  activeDiscussionCount: number;
}
