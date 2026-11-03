export type AgentRole =
  | 'planner'
  | 'designer'
  | 'builder'
  | 'tester'
  | 'researcher'
  | 'security'
  | 'datascientist'
  | 'career_intel'
  | 'evaluator'
  | 'project_manager';

export type TaskStatus =
  | 'Not Started'
  | 'Planning'
  | 'Designing'
  | 'In Development'
  | 'Testing'
  | 'Fix Required'
  | 'Passed'
  | 'Blocked'
  | 'Review';

export interface AgentProfile {
  id: AgentRole;
  name: string;
  title: string;
  avatarColor: string;
  badge: string;
  model: string;
  responsibilities: string[];
  activeTaskCount: number;
  completedTaskCount: number;
  status: 'idle' | 'analyzing' | 'building' | 'verifying';
  category?: 'core' | 'intelligence' | 'security_governance';
}

export interface AgentTask {
  id: string;
  title: string;
  description: string;
  moduleName: string;
  assignedAgent: AgentRole;
  status: TaskStatus;
  priority: 'low' | 'medium' | 'high' | 'critical';
  requiresHumanApproval?: boolean;
  handoffTo?: AgentRole;
  outputArtifacts?: string[];
  testReport?: {
    passed: boolean;
    bugsFound: string[];
    securityChecks: string;
    regressionRisk: 'low' | 'medium' | 'high';
  };
  createdAt: string;
  updatedAt: string;
}

export interface AgentLogEntry {
  id: string;
  agentRole: AgentRole;
  agentName: string;
  timestamp: string;
  action: string;
  details: string;
  type: 'info' | 'success' | 'warning' | 'error' | 'handoff';
}

export interface DevelopmentMilestone {
  id: number;
  title: string;
  description: string;
  tasksCount: number;
  completedTasks: number;
  status: 'completed' | 'in_progress' | 'pending';
}
