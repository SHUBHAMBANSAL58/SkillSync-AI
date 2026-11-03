export type NovaPersonalityId =
  | 'jarvis-prime'
  | 'staff-architect'
  | 'faang-em'
  | 'career-strategist'
  | 'interview-coach'
  | 'startup-cofounder'
  | 'open-source-lead'
  | 'research-scientist'
  | 'peer-mentor';

export interface NovaPersonality {
  id: NovaPersonalityId;
  name: string;
  tagline: string;
  avatarIcon: string;
  systemPrompt: string;
  voicePitch: number;
  voiceRate: number;
  accentColor: string;
  capabilities: string[];
}

export interface NovaMemoryItem {
  id: string;
  category: 'career_goal' | 'skill_preference' | 'target_role' | 'achievement' | 'constraint';
  content: string;
  createdAt: string;
  confidence: number;
}

export interface NovaCommandAction {
  id: string;
  label: string;
  description: string;
  targetModule: string;
  payload?: Record<string, any>;
  riskLevel: 'low' | 'medium' | 'high';
  requiresConfirmation: boolean;
}

export interface NovaCommandExecution {
  id: string;
  rawInput: string;
  intent: string;
  actions: NovaCommandAction[];
  status: 'pending_approval' | 'executed' | 'cancelled' | 'failed';
  executedAt?: string;
  resultSummary?: string;
}

export interface NovaVisionAnalysis {
  id: string;
  fileName: string;
  fileType: 'resume' | 'architecture' | 'code' | 'ui' | 'certificate';
  previewUrl?: string;
  findings: string[];
  recommendations: string[];
  score: number;
  detectedEntities: string[];
  analyzedAt: string;
}

export interface CareerSimulationResult {
  targetSkills: string[];
  timeframeMonths: number;
  projectedReadinessDelta: number;
  projectedSalaryBumpPercent: number;
  projectedMarketDemandScore: number;
  unlockedRoleTitles: string[];
  prerequisiteMilestones: string[];
  riskFactors: string[];
}

export interface SkillGraphNode {
  id: string;
  name: string;
  category: 'ai' | 'frontend' | 'backend' | 'cloud' | 'system_design' | 'security';
  level: 'Core' | 'Advanced' | 'Mastery';
  marketDemand: number; // 0 - 100
  averageSalary: string;
  connections: string[]; // Node IDs connected
  verifiedByYou?: boolean;
}

export interface CoFounderProjectBlueprint {
  id: string;
  title: string;
  tagline: string;
  domain: string;
  techStack: {
    frontend: string[];
    backend: string[];
    database: string[];
    aiServices: string[];
    infrastructure: string[];
  };
  architectureType: 'Microservices' | 'Serverless' | 'Modular Monolith' | 'Event-Driven';
  keyModules: {
    name: string;
    description: string;
    apiEndpoints: string[];
  }[];
  securityChecklist: string[];
  recommendedTimelineWeeks: number;
}
