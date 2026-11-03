export type AgentRole = 'planner' | 'designer' | 'builder' | 'tester';

export type TaskStatus =
  | 'Not Started'
  | 'Planning'
  | 'Designing'
  | 'Building'
  | 'Testing'
  | 'Review'
  | 'Completed'
  | 'Blocked';

export interface AgentChatMessage {
  id: string;
  sender: AgentRole | 'human';
  recipient?: AgentRole | 'all';
  timestamp: string;
  message: string;
  type: 'strategy' | 'design_spec' | 'code_diff' | 'test_failure' | 'test_pass' | 'human_approval';
  metadata?: Record<string, any>;
}

export interface NetworkTask {
  id: string;
  title: string;
  description: string;
  module: string;
  status: TaskStatus;
  currentAgent: AgentRole;
  priority: 'low' | 'medium' | 'high' | 'critical';
  dependencies: string[];
  testRunsCount: number;
  defectsDetected: number;
  acceptanceCriteria: string[];
  progressPercent: number;
}

export const INITIAL_NETWORK_TASKS: NetworkTask[] = [
  {
    id: 'TASK-101',
    title: 'Holographic 3D Neural Core & WebGL Reactor',
    description: 'Render responsive Three.js particle core with live audio frequency HUD and dynamic personality state glow.',
    module: '3D Command Core',
    status: 'Completed',
    currentAgent: 'tester',
    priority: 'critical',
    dependencies: [],
    testRunsCount: 4,
    defectsDetected: 1,
    acceptanceCriteria: [
      'WebGL context fallback for headless/GPU-less environments',
      'Smooth 60fps render loop with low CPU overhead',
      'Live Web Audio API frequency analysis connection',
    ],
    progressPercent: 100,
  },
  {
    id: 'TASK-102',
    title: 'Natural Voice Command & Intent Dispatch Engine',
    description: 'Integrate Web Speech recognition with speech synthesis and safety confirmation guards.',
    module: 'NOVA Intelligence',
    status: 'Testing',
    currentAgent: 'tester',
    priority: 'high',
    dependencies: ['TASK-101'],
    testRunsCount: 3,
    defectsDetected: 0,
    acceptanceCriteria: [
      'Speech recognition fallbacks for unsupported browsers',
      'Action confirmation modal for medium/high-risk mutations',
      'Real-time personality pitch and speech synthesis modulation',
    ],
    progressPercent: 85,
  },
  {
    id: 'TASK-103',
    title: 'Career Digital Twin Predictive Simulator',
    description: 'Multi-axis radar capabilities engine with what-if market demand and salary delta projections.',
    module: 'Career Intelligence',
    status: 'Review',
    currentAgent: 'planner',
    priority: 'high',
    dependencies: [],
    testRunsCount: 2,
    defectsDetected: 0,
    acceptanceCriteria: [
      'Deterministic salary and demand scoring formula',
      'Dynamic unlockable role recommendations based on verified skills',
      'Zero-pill high-contrast UI adherence',
    ],
    progressPercent: 90,
  },
  {
    id: 'TASK-104',
    title: 'Two-Sided Talent Marketplace & Verifiable Passport',
    description: 'Candidate verifiable credential passport export and recruiter candidate filtering radar.',
    module: 'Talent Ecosystem',
    status: 'Building',
    currentAgent: 'builder',
    priority: 'medium',
    dependencies: ['TASK-103'],
    testRunsCount: 1,
    defectsDetected: 0,
    acceptanceCriteria: [
      'Verifiable cryptographic badge simulation',
      'Filter candidates by verified readiness score (>85%)',
      'Anonymous bias-free recruiter screening mode',
    ],
    progressPercent: 65,
  },
];

export const INITIAL_AGENT_CHAT: AgentChatMessage[] = [
  {
    id: 'msg-1',
    sender: 'planner',
    recipient: 'all',
    timestamp: '10:00 AM',
    message: 'Architecture decomposed for SkillSync AI 4.0. Holographic core, NOVA voice engine, and 4-agent coordination DAG locked.',
    type: 'strategy',
  },
  {
    id: 'msg-2',
    sender: 'designer',
    recipient: 'builder',
    timestamp: '10:04 AM',
    message: 'Visual tokens delivered: Midnight navy (#080B18) background, subtle cyan/indigo glows, zero-pill typography, and floating glass HUD panels.',
    type: 'design_spec',
  },
  {
    id: 'msg-3',
    sender: 'builder',
    recipient: 'tester',
    timestamp: '10:12 AM',
    message: 'Three.js canvas initialized with graceful WebGL fallback. Component mounts without memory leak. Passing to Tester.',
    type: 'code_diff',
  },
  {
    id: 'msg-4',
    sender: 'tester',
    recipient: 'planner',
    timestamp: '10:15 AM',
    message: 'Deterministic verification suite executed. 10/10 assertions passed. No memory leaks detected. Ready for human sign-off.',
    type: 'test_pass',
  },
];

/**
 * Execute next stage of the 4-Agent coordination workflow
 */
export function advanceAgentWorkflow(
  task: NetworkTask,
  testPassed: boolean = true
): { updatedTask: NetworkTask; message: AgentChatMessage } {
  const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  const id = `msg-${Date.now()}`;

  switch (task.status) {
    case 'Not Started':
      return {
        updatedTask: { ...task, status: 'Planning', currentAgent: 'planner', progressPercent: 20 },
        message: {
          id,
          sender: 'planner',
          recipient: 'designer',
          timestamp,
          message: `[PLANNER] Requirements analyzed for "${task.title}". Formulating technical specs and risk bounds.`,
          type: 'strategy',
        },
      };

    case 'Planning':
      return {
        updatedTask: { ...task, status: 'Designing', currentAgent: 'designer', progressPercent: 45 },
        message: {
          id,
          sender: 'designer',
          recipient: 'builder',
          timestamp,
          message: `[DESIGNER] UX wireframes and interactive glassmorphism tokens completed for "${task.title}".`,
          type: 'design_spec',
        },
      };

    case 'Designing':
      return {
        updatedTask: { ...task, status: 'Building', currentAgent: 'builder', progressPercent: 70 },
        message: {
          id,
          sender: 'builder',
          recipient: 'tester',
          timestamp,
          message: `[BUILDER] Implementation merged for "${task.title}". Dispatching to Tester Agent for validation.`,
          type: 'code_diff',
        },
      };

    case 'Building':
      return {
        updatedTask: { ...task, status: 'Testing', currentAgent: 'tester', progressPercent: 85, testRunsCount: task.testRunsCount + 1 },
        message: {
          id,
          sender: 'tester',
          recipient: 'all',
          timestamp,
          message: `[TESTER] Initiating automated test suite & accessibility audit on "${task.title}"...`,
          type: 'strategy',
        },
      };

    case 'Testing':
      if (testPassed) {
        return {
          updatedTask: { ...task, status: 'Review', currentAgent: 'planner', progressPercent: 95 },
          message: {
            id,
            sender: 'tester',
            recipient: 'planner',
            timestamp,
            message: `[TESTER PASS] All acceptance criteria verified for "${task.title}". Ready for final stakeholder review.`,
            type: 'test_pass',
          },
        };
      } else {
        return {
          updatedTask: {
            ...task,
            status: 'Building',
            currentAgent: 'builder',
            defectsDetected: task.defectsDetected + 1,
            progressPercent: 60,
          },
          message: {
            id,
            sender: 'tester',
            recipient: 'builder',
            timestamp,
            message: `[TESTER DEFECT] Found regression in "${task.title}". Returning to Builder for automated remediation.`,
            type: 'test_failure',
          },
        };
      }

    case 'Review':
      return {
        updatedTask: { ...task, status: 'Completed', currentAgent: 'planner', progressPercent: 100 },
        message: {
          id,
          sender: 'planner',
          recipient: 'all',
          timestamp,
          message: `[APPROVED] Task "${task.title}" verified and promoted to production baseline.`,
          type: 'human_approval',
        },
      };

    default:
      return {
        updatedTask: task,
        message: {
          id,
          sender: 'planner',
          recipient: 'all',
          timestamp,
          message: `Task "${task.title}" is currently ${task.status}.`,
          type: 'strategy',
        },
      };
  }
}
