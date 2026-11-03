import {
  NovaPersonality,
  NovaPersonalityId,
  NovaMemoryItem,
  NovaCommandExecution,
  NovaCommandAction,
  CareerSimulationResult,
} from '../types/nova';

export const NOVA_PERSONALITIES: NovaPersonality[] = [
  {
    id: 'jarvis-prime',
    name: 'JARVIS Prime',
    tagline: 'Autonomous Executive Career Orchestrator',
    avatarIcon: 'Cpu',
    systemPrompt:
      'You are JARVIS Prime, the core autonomous intelligence of SkillSync AI. You are calm, authoritative, visionary, and hyper-competent. You address the user as a trusted engineering leader, orchestrating complex workflows, monitoring diagnostics, and providing precision guidance.',
    voicePitch: 0.95,
    voiceRate: 1.0,
    accentColor: '#6366f1',
    capabilities: ['Autonomous Workflows', 'Multi-agent Orchestration', 'Strategic Career Planning', 'Voice Command Dispatch'],
  },
  {
    id: 'staff-architect',
    name: 'Dr. Evelyn Vance',
    tagline: 'Staff Systems Architect & Tech Lead',
    avatarIcon: 'Shield',
    systemPrompt:
      'You are Dr. Evelyn Vance, Staff Systems Architect with 15+ years scaling distributed systems. You provide uncompromising technical rigor, CAP theorem trade-offs, database sharding strategies, and clean architectural design.',
    voicePitch: 1.0,
    voiceRate: 1.05,
    accentColor: '#06b6d4',
    capabilities: ['System Design Breakdown', 'High-throughput Architecture', 'Database Optimization', 'RFC Generation'],
  },
  {
    id: 'faang-em',
    name: 'Marcus Brody',
    tagline: 'Senior Engineering Manager (Tier-1 Tech)',
    avatarIcon: 'Briefcase',
    systemPrompt:
      'You are Marcus Brody, Senior Engineering Manager at a top tech company. You guide engineers on behavioral excellence, cross-functional impact, STAR framework responses, and fast-track promotions.',
    voicePitch: 0.9,
    voiceRate: 0.98,
    accentColor: '#10b981',
    capabilities: ['STAR Behavioral Coaching', 'Internship Conversion', 'Offer Evaluation', 'Conflict Resolution'],
  },
  {
    id: 'career-strategist',
    name: 'Aria Thorne',
    tagline: 'Global Talent & Compensation Strategist',
    avatarIcon: 'TrendingUp',
    systemPrompt:
      'You are Aria Thorne, an elite talent strategist advising on emerging high-paying AI niches, executive compensation negotiation, and equity valuation.',
    voicePitch: 1.1,
    voiceRate: 1.05,
    accentColor: '#f59e0b',
    capabilities: ['Compensation Negotiation', 'Market Trend Intelligence', 'Equity & Stock Options', 'Global Mobility'],
  },
  {
    id: 'interview-coach',
    name: 'Commander Sarah Lin',
    tagline: 'Technical Interview Master Drill Coach',
    avatarIcon: 'Target',
    systemPrompt:
      'You are Commander Sarah Lin, an uncompromising technical interview coach. You drill candidates on LeetCode patterns, time/space complexity, edge cases, and live whiteboard communication.',
    voicePitch: 1.05,
    voiceRate: 1.1,
    accentColor: '#ec4899',
    capabilities: ['Live DSA Drills', 'Complexity Analysis', 'Mock Pressure Tests', 'Pattern Recognition'],
  },
  {
    id: 'startup-cofounder',
    name: 'Alex Vance-Ray',
    tagline: 'Serial Unicorn Technical Co-Founder',
    avatarIcon: 'Rocket',
    systemPrompt:
      'You are Alex Vance-Ray, a 3x exited technical co-founder. You specialize in rapid MVP scoping, 0-to-1 product architecture, investor-ready tech decks, and full-stack velocity.',
    voicePitch: 1.0,
    voiceRate: 1.05,
    accentColor: '#8b5cf6',
    capabilities: ['MVP Architecture', 'Investor Tech Demos', 'Full-stack Scaffolding', 'Product-Market Fit Tech'],
  },
  {
    id: 'open-source-lead',
    name: 'Kenji Sato',
    tagline: 'Core Maintainer & Clean Code Purist',
    avatarIcon: 'GitBranch',
    systemPrompt:
      'You are Kenji Sato, core maintainer of major OSS libraries. You prioritize test-driven development, semantic versioning, CI/CD pipelines, and bulletproof documentation.',
    voicePitch: 0.95,
    voiceRate: 1.0,
    accentColor: '#14b8a6',
    capabilities: ['Code Quality Audits', 'Test-Driven Design', 'CI/CD Automation', 'Open Source Portfolios'],
  },
  {
    id: 'research-scientist',
    name: 'Dr. Tariq Al-Mansoor',
    tagline: 'Principal AI & Deep Learning Researcher',
    avatarIcon: 'Sparkles',
    systemPrompt:
      'You are Dr. Tariq Al-Mansoor, Principal AI Researcher. You decode transformer mechanisms, embedding spaces, fine-tuning techniques, and evaluate state-of-the-art benchmarks.',
    voicePitch: 0.92,
    voiceRate: 0.96,
    accentColor: '#3b82f6',
    capabilities: ['Transformer Architectures', 'RAG Pipelines', 'Model Fine-tuning', 'AI Safety & Ethics'],
  },
  {
    id: 'peer-mentor',
    name: 'Jordan Cruz',
    tagline: 'Empathetic Peer & Daily Study Buddy',
    avatarIcon: 'Smile',
    systemPrompt:
      'You are Jordan Cruz, a friendly and empathetic software engineer who recently landed a dream job. You provide encouragement, daily accountability, and practical study habit advice.',
    voicePitch: 1.1,
    voiceRate: 1.0,
    accentColor: '#a855f7',
    capabilities: ['Daily Accountability', 'Impostor Syndrome Relief', 'Study Schedule Creation', 'Positive Motivation'],
  },
];

// Initial Long-Term Memory Seeds
export const INITIAL_NOVA_MEMORIES: NovaMemoryItem[] = [
  {
    id: 'mem-1',
    category: 'career_goal',
    content: 'Targeting Senior AI Full-Stack Engineer or Staff Systems Architect role at a high-growth unicorn within 12 months.',
    createdAt: '2025-01-15T10:00:00Z',
    confidence: 0.98,
  },
  {
    id: 'mem-2',
    category: 'skill_preference',
    content: 'Strong proficiency in TypeScript, React 19, distributed caching, and LLM orchestration (Gemini / Anthropic).',
    createdAt: '2025-02-01T14:30:00Z',
    confidence: 0.94,
  },
  {
    id: 'mem-3',
    category: 'target_role',
    content: 'Prefers remote or hybrid positions with base compensation >$180k + equity upside.',
    createdAt: '2025-02-10T09:15:00Z',
    confidence: 0.9,
  },
];

/**
 * Natural Speech Synthesis helper with voice selection
 */
export function speakNovaResponse(
  text: string,
  personalityId: NovaPersonalityId = 'jarvis-prime',
  onEnd?: () => void
): boolean {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
    return false;
  }

  try {
    window.speechSynthesis.cancel(); // Stop ongoing speech

    const personality = NOVA_PERSONALITIES.find((p) => p.id === personalityId) || NOVA_PERSONALITIES[0];
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.pitch = personality.voicePitch;
    utterance.rate = personality.voiceRate;

    // Pick best English voice if available
    const voices = window.speechSynthesis.getVoices();
    const preferredVoice =
      voices.find((v) => v.lang.startsWith('en') && (v.name.includes('Natural') || v.name.includes('Google') || v.name.includes('Premium'))) ||
      voices.find((v) => v.lang.startsWith('en')) ||
      voices[0];

    if (preferredVoice) {
      utterance.voice = preferredVoice;
    }

    if (onEnd) {
      utterance.onend = onEnd;
      utterance.onerror = onEnd;
    }

    window.speechSynthesis.speak(utterance);
    return true;
  } catch (err) {
    console.warn('Speech synthesis error:', err);
    if (onEnd) onEnd();
    return false;
  }
}

/**
 * Natural language intent parser for NOVA Command Engine
 */
export function parseNovaCommand(rawInput: string): NovaCommandExecution {
  const normalized = rawInput.toLowerCase().trim();
  const executionId = `cmd-${Date.now()}`;

  // Intent 1: Skill Gap & Capabilities
  if (
    normalized.includes('skill gap') ||
    normalized.includes('find gaps') ||
    normalized.includes('what skills') ||
    normalized.includes('missing skill')
  ) {
    return {
      id: executionId,
      rawInput,
      intent: 'Analyze Skill Gaps & Readiness',
      actions: [
        {
          id: 'act-1',
          label: 'Run Deep Skill Gap Analysis',
          description: 'Compare current verified skills against top 50 high-salary tech job postings.',
          targetModule: 'digital-twin',
          payload: { view: 'gaps' },
          riskLevel: 'low',
          requiresConfirmation: false,
        },
        {
          id: 'act-2',
          label: 'Launch Skill Verification Centre',
          description: 'Open verified coding assessments for priority missing skills.',
          targetModule: 'skill-verification',
          riskLevel: 'low',
          requiresConfirmation: false,
        },
      ],
      status: 'pending_approval',
    };
  }

  // Intent 2: 4-Agent Workflow Coordination
  if (
    normalized.includes('four agent') ||
    normalized.includes('agent workflow') ||
    normalized.includes('start agents') ||
    normalized.includes('run pipeline') ||
    normalized.includes('builder agent')
  ) {
    return {
      id: executionId,
      rawInput,
      intent: 'Execute Coordinated 4-Agent Intelligence Cycle',
      actions: [
        {
          id: 'act-1',
          label: 'Initialize Planner Agent Task Matrix',
          description: 'Planner decomposes active backlog and dependencies into architectural milestones.',
          targetModule: 'agent-centre',
          payload: { autoTrigger: true },
          riskLevel: 'medium',
          requiresConfirmation: true,
        },
        {
          id: 'act-2',
          label: 'Dispatch Designer & Builder Handshake',
          description: 'Hand off UI design tokens to Builder for deterministic component implementation.',
          targetModule: 'agent-centre',
          riskLevel: 'medium',
          requiresConfirmation: true,
        },
        {
          id: 'act-3',
          label: 'Run Tester Agent Verification Suite',
          description: 'Validate functional behavior, API mock robustness, and security boundaries.',
          targetModule: 'agent-centre',
          riskLevel: 'low',
          requiresConfirmation: false,
        },
      ],
      status: 'pending_approval',
    };
  }

  // Intent 3: Career Simulation & What-If
  if (
    normalized.includes('simulate') ||
    normalized.includes('what if') ||
    normalized.includes('career simulation') ||
    normalized.includes('salary prediction')
  ) {
    return {
      id: executionId,
      rawInput,
      intent: 'Simulate Career Trajectory & Salary Delta',
      actions: [
        {
          id: 'act-1',
          label: 'Execute Digital Twin Predictive Simulation',
          description: 'Calculate 6-month projected market value with Distributed Systems + LLM Orchestration.',
          targetModule: 'digital-twin',
          payload: { simulationPreset: 'high-growth-ai' },
          riskLevel: 'low',
          requiresConfirmation: false,
        },
      ],
      status: 'pending_approval',
    };
  }

  // Intent 4: Interview & Practice Arena
  if (
    normalized.includes('interview') ||
    normalized.includes('practice') ||
    normalized.includes('mock') ||
    normalized.includes('dsa')
  ) {
    return {
      id: executionId,
      rawInput,
      intent: 'Launch High-Stakes Interview Arena',
      actions: [
        {
          id: 'act-1',
          label: 'Open AI Interview Arena 2.0',
          description: 'Configure real-time simulation with AI interviewer and live rubric scoring.',
          targetModule: 'interview-arena',
          riskLevel: 'low',
          requiresConfirmation: false,
        },
      ],
      status: 'pending_approval',
    };
  }

  // Intent 5: Talent Marketplace & Skill Passport
  if (
    normalized.includes('marketplace') ||
    normalized.includes('recruiter') ||
    normalized.includes('passport') ||
    normalized.includes('hire me') ||
    normalized.includes('find jobs')
  ) {
    return {
      id: executionId,
      rawInput,
      intent: 'Activate Verifiable Talent Marketplace',
      actions: [
        {
          id: 'act-1',
          label: 'Open Verifiable Talent Marketplace & Passport',
          description: 'Inspect live employer talent radar and export cryptographic skill passport.',
          targetModule: 'talent-marketplace',
          riskLevel: 'low',
          requiresConfirmation: false,
        },
      ],
      status: 'pending_approval',
    };
  }

  // Intent 6: AI Project Co-Founder
  if (
    normalized.includes('project') ||
    normalized.includes('co-founder') ||
    normalized.includes('architect') ||
    normalized.includes('portfolio build')
  ) {
    return {
      id: executionId,
      rawInput,
      intent: 'Architect Full-Stack System with AI Co-Founder',
      actions: [
        {
          id: 'act-1',
          label: 'Launch AI Project Co-Founder Studio',
          description: 'Generate production architecture, OpenAPI specs, and database schema.',
          targetModule: 'project-cofounder',
          riskLevel: 'low',
          requiresConfirmation: false,
        },
      ],
      status: 'pending_approval',
    };
  }

  // Intent 7: 3D Holographic Command Centre
  if (
    normalized.includes('hologram') ||
    normalized.includes('holographic') ||
    normalized.includes('command centre') ||
    normalized.includes('3d') ||
    normalized.includes('neural core')
  ) {
    return {
      id: executionId,
      rawInput,
      intent: 'Engage 3D Holographic Neural Core',
      actions: [
        {
          id: 'act-1',
          label: 'Initialize 3D Holographic HUD',
          description: 'Spin up real-time WebGL neural reactor and system telemetry diagnostics.',
          targetModule: 'holographic-centre',
          riskLevel: 'low',
          requiresConfirmation: false,
        },
      ],
      status: 'pending_approval',
    };
  }

  // Default General Advice / Diagnostic Intent
  return {
    id: executionId,
    rawInput,
    intent: 'General Career Intelligence Consultation',
    actions: [
      {
        id: 'act-1',
        label: 'Consult AI Career Mentor with Context',
        description: `Dispatch query "${rawInput.slice(0, 50)}..." to Gemini with user profile state.`,
        targetModule: 'career-mentor',
        riskLevel: 'low',
        requiresConfirmation: false,
      },
    ],
    status: 'pending_approval',
  };
}

/**
 * Predictive Career Simulation Engine
 */
export function simulateCareerPath(
  currentScore: number,
  targetSkills: string[],
  months: number
): CareerSimulationResult {
  const skillCount = Math.max(1, targetSkills.length);
  // Diminishing returns calculation
  const scoreBump = Math.min(28, Math.round(skillCount * 4.8 * (months / 6)));
  const salaryBumpPercent = Math.min(48, Math.round(skillCount * 6.5 + (months / 12) * 12));
  const marketDemandScore = Math.min(99, Math.round(75 + skillCount * 4.2));

  const sampleRoles = [
    'Staff Distributed Systems Engineer',
    'Principal AI Solutions Architect',
    'Senior Full-Stack & GenAI Engineer',
    'Cloud-Native Platform Lead',
    'High-Frequency Systems Specialist',
  ];

  return {
    targetSkills,
    timeframeMonths: months,
    projectedReadinessDelta: scoreBump,
    projectedSalaryBumpPercent: salaryBumpPercent,
    projectedMarketDemandScore: marketDemandScore,
    unlockedRoleTitles: sampleRoles.slice(0, Math.min(5, skillCount + 1)),
    prerequisiteMilestones: [
      `Pass verified test benchmark in ${targetSkills[0] || 'Core Architecture'} (>85%)`,
      `Deploy production-grade capstone project utilizing ${targetSkills.slice(0, 2).join(' & ')}`,
      'Publish technical architecture teardown and benchmark report',
      'Complete 3 live simulated System Design rounds with rubric scoring >90',
    ],
    riskFactors: [
      'Rapid API deprecation cycles in target ecosystem',
      'High competition ratio in Tier-1 remote applications',
      'Consistency commitment required: minimum 8 hours dedicated study/week',
    ],
  };
}
