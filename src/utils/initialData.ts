import { UserProfile, ResumeDocument, JobOpportunity, JobApplication, SkillAssessment, CodingChallenge, InterviewSession, PortfolioProject, RoadmapNode, CalendarEvent, AppNotification, PeerGroup } from '../types/career';
import { AgentProfile, AgentTask, AgentLogEntry, DevelopmentMilestone } from '../types/agents';

export const INITIAL_USER: UserProfile = {
  id: 'user-001',
  name: 'Alex Rivers',
  email: 'bansalshubham182@gmail.com',
  role: 'student',
  targetRole: 'Full-Stack AI Engineer',
  headline: 'Aspiring Full-Stack & Systems Engineer | Specializing in React, TypeScript, Node.js & LLM Integrations',
  bio: 'Computer Science undergraduate passionate about building resilient distributed applications, interactive data visualizations, and production AI workflows.',
  avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
  cgpa: 8.6,
  graduationYear: 2025,
  degree: 'B.Tech in Computer Science & Engineering',
  activeBacklogs: 0,
  githubUsername: 'alexrivers-dev',
  readinessScore: 84,
  streakDays: 14,
  weeklyGoalHours: 15,
  completedHoursThisWeek: 11.5,
  verifiedSkills: {
    'TypeScript': { level: 'Advanced', score: 94, verifiedDate: '2026-10-15' },
    'React': { level: 'Advanced', score: 91, verifiedDate: '2026-10-18' },
    'System Design': { level: 'Intermediate', score: 78, verifiedDate: '2026-10-22' },
    'PostgreSQL': { level: 'Intermediate', score: 82, verifiedDate: '2026-10-25' },
  },
  selfDeclaredSkills: ['Docker', 'Next.js', 'Python', 'Tailwind CSS', 'GraphQL', 'Redis', 'CI/CD'],
  achievements: [
    { id: 'ach-1', title: 'Full-Stack Verified', description: 'Scored 90%+ in Frontend & Backend verification exams.', category: 'skills', icon: 'ShieldCheck', unlockedAt: '2026-10-18' },
    { id: 'ach-2', title: '14-Day Velocity Streak', description: 'Completed daily technical career drills for 2 consecutive weeks.', category: 'consistency', icon: 'Flame', unlockedAt: '2026-10-28' },
    { id: 'ach-3', title: 'Interview Ace', description: 'Passed technical mock interview with an overall score above 85%.', category: 'interviews', icon: 'Award', unlockedAt: '2026-10-25' },
    { id: 'ach-4', title: 'Open Source Contributor', description: 'Analyzed and published 3 verified portfolio projects with documentation.', category: 'portfolio', icon: 'GitPullRequest', unlockedAt: '2026-10-20' },
  ],
};

export const INITIAL_AGENTS: AgentProfile[] = [
  {
    id: 'planner',
    name: 'Strategos AI',
    title: 'Planner Agent (Chief Strategist)',
    avatarColor: 'from-indigo-500 to-blue-600',
    badge: 'Architecture & Strategy',
    model: 'gemini-4-argon',
    category: 'core',
    responsibilities: [
      'Analyze project requirements & codebase',
      'Architect data models and API contracts',
      'Prioritize task queues & milestones',
      'Assess technical risk & dependencies',
    ],
    activeTaskCount: 2,
    completedTaskCount: 14,
    status: 'analyzing',
  },
  {
    id: 'designer',
    name: 'Aura UX',
    title: 'Designer Agent (Visual Architect)',
    avatarColor: 'from-purple-500 to-pink-500',
    badge: 'UI/UX & 3D Aesthetics',
    model: 'gemini-3.8-flash',
    category: 'core',
    responsibilities: [
      'Design glassmorphic SaaS layouts',
      'Refine 3D Three.js interactive visualizer',
      'Enforce responsive design tokens & contrast',
      'Audit micro-interactions and motion curves',
    ],
    activeTaskCount: 1,
    completedTaskCount: 12,
    status: 'idle',
  },
  {
    id: 'builder',
    name: 'Forge Core',
    title: 'Builder Agent (Chief Software Engineer)',
    avatarColor: 'from-cyan-500 to-teal-500',
    badge: 'Full-Stack Implementation',
    model: 'gemini-4-argon',
    category: 'core',
    responsibilities: [
      'Implement reactive UI components in TypeScript',
      'Wire Gemini API server proxy routes',
      'Integrate Firebase Firestore & Auth rules',
      'Execute surgical bug fixes identified by QA',
    ],
    activeTaskCount: 3,
    completedTaskCount: 19,
    status: 'building',
  },
  {
    id: 'tester',
    name: 'Sentron QA',
    title: 'Tester Agent (Security & QA Chief)',
    avatarColor: 'from-amber-500 to-emerald-500',
    badge: 'Verification & Reliability',
    model: 'gemini-3.8-flash',
    category: 'core',
    responsibilities: [
      'Run automated unit & accessibility checks',
      'Verify ATS calculation accuracy',
      'Validate Firebase security rules & RBAC',
      'Test edge cases, broken states & mobile reflow',
    ],
    activeTaskCount: 1,
    completedTaskCount: 16,
    status: 'verifying',
  },
  {
    id: 'researcher',
    name: 'Nexus Scholar',
    title: 'Research Agent (Market & Literature Analyst)',
    avatarColor: 'from-violet-500 to-indigo-700',
    badge: 'Global Tech Trends',
    model: 'gemini-2.5-pro',
    category: 'intelligence',
    responsibilities: [
      'Scrape and benchmark tech industry salary trends',
      'Analyze academic breakthroughs in GraphRAG & LLMs',
      'Track hiring manager sentiment at Tier-1 tech firms',
      'Map emerging skill dependencies for 2026-2028',
    ],
    activeTaskCount: 2,
    completedTaskCount: 9,
    status: 'analyzing',
  },
  {
    id: 'security',
    name: 'Aegis Zero-Trust',
    title: 'Security Agent (Cyber & Threat Defense)',
    avatarColor: 'from-rose-500 to-red-700',
    badge: 'OWASP & Zero-Trust',
    model: 'gemini-4-argon',
    category: 'security_governance',
    responsibilities: [
      'Continuous audit of Firestore security rules',
      'Validate zero-PII exposure in client storage',
      'Inspect prompt-injection vulnerabilities',
      'Monitor developer API keys and rate-limit violations',
    ],
    activeTaskCount: 1,
    completedTaskCount: 21,
    status: 'verifying',
  },
  {
    id: 'datascientist',
    name: 'Vector Mind',
    title: 'Data Science Agent (Predictive Modeler)',
    avatarColor: 'from-emerald-500 to-teal-700',
    badge: 'Predictive Graph Math',
    model: 'gemini-2.5-pro',
    category: 'intelligence',
    responsibilities: [
      'Forecast skill obsolescence and salary delta curves',
      'Compute cosine similarities across knowledge vectors',
      'Model user career velocity and retention decay',
      'Calibrate SHAP feature contributions for recommendations',
    ],
    activeTaskCount: 1,
    completedTaskCount: 11,
    status: 'analyzing',
  },
  {
    id: 'career_intel',
    name: 'Talent Scout',
    title: 'Career Intelligence Agent (Recruiter Radar)',
    avatarColor: 'from-blue-500 to-sky-600',
    badge: 'Talent Matching',
    model: 'gemini-3.8-flash',
    category: 'intelligence',
    responsibilities: [
      'Simulate ATS parsing logic for top enterprise portals',
      'Screen verified portfolios against FAANG benchmark rubrics',
      'Calculate blind hiring merit scores without bias',
      'Identify critical missing resume keywords and metrics',
    ],
    activeTaskCount: 2,
    completedTaskCount: 15,
    status: 'idle',
  },
  {
    id: 'evaluator',
    name: 'Criterion AI',
    title: 'AI Evaluation Agent (Truth & Hallucination Auditor)',
    avatarColor: 'from-yellow-500 to-amber-600',
    badge: 'Accuracy & Rubric Check',
    model: 'gemini-2.5-pro',
    category: 'security_governance',
    responsibilities: [
      'Audit multi-model LLM outputs for hallucinations',
      'Verify factual citations against GraphRAG knowledge base',
      'Enforce tone and zero-pill UI aesthetic guidelines',
      'Grade agent outputs against strict rubric criteria',
    ],
    activeTaskCount: 1,
    completedTaskCount: 18,
    status: 'verifying',
  },
  {
    id: 'project_manager',
    name: 'Orchestrator Prime',
    title: 'Project Manager Agent (Sprint Master)',
    avatarColor: 'from-orange-500 to-amber-700',
    badge: 'DAG & Critical Path',
    model: 'gemini-4-argon',
    category: 'security_governance',
    responsibilities: [
      'Coordinate dependency DAG execution across all 10 agents',
      'Track critical path timelines and eliminate bottlenecks',
      'Manage human-in-the-loop approval escalation gates',
      'Ensure high-velocity delivery across all product milestones',
    ],
    activeTaskCount: 3,
    completedTaskCount: 28,
    status: 'building',
  },
];

export const INITIAL_MILESTONES: DevelopmentMilestone[] = [
  { id: 1, title: 'Project Audit & Architecture Foundation', description: 'Inspected codebase, dependencies, environment constraints, and configured Firebase.', tasksCount: 5, completedTasks: 5, status: 'completed' },
  { id: 2, title: 'Four-Agent Command Centre & Orchestration', description: 'Coordinated multi-agent workflow, shared state, handoff chains, and real AI reasoning.', tasksCount: 6, completedTasks: 6, status: 'completed' },
  { id: 3, title: 'Premium SaaS Design System & 3D Hero', description: 'Created 3D Three.js Skill Galaxy, midnight glassmorphism, responsive tokens, and animations.', tasksCount: 5, completedTasks: 5, status: 'completed' },
  { id: 4, title: '17 Core Modules Upgrade', description: 'Transformed all 17 functional modules into professional, interconnected career intelligence tools.', tasksCount: 17, completedTasks: 17, status: 'completed' },
  { id: 5, title: 'Advanced Resume & Placement Eligibility', description: 'Integrated ATS keyword scoring, PDF extraction, multi-version switcher, and academic check.', tasksCount: 6, completedTasks: 6, status: 'completed' },
  { id: 6, title: 'Interview Arena 2.0 & GitHub Intelligence', description: 'Live simulation with dual-metric scoring, answer enhancement, and GitHub REST API auditing.', tasksCount: 6, completedTasks: 6, status: 'completed' },
  { id: 7, title: 'Peer Hub, AI Image Studio & Mentorship', description: 'Collaborative groups, Gemini 3 Pro 1K/2K/4K asset studio, and multi-turn mentor chat.', tasksCount: 5, completedTasks: 5, status: 'completed' },
  { id: 8, title: 'Quality Gate, Unit Tests & Deployment Verification', description: 'Automated pure-logic test runner, browser accessibility validation, and clean build confirmation.', tasksCount: 4, completedTasks: 4, status: 'completed' },
];

export const INITIAL_AGENT_TASKS: AgentTask[] = [
  {
    id: 'task-101',
    title: 'Architect 4-Agent Shared Task State Machine',
    description: 'Ensure sequential handoffs: Planner -> Designer -> Builder -> Tester -> Planner review.',
    moduleName: 'Agent Command Centre',
    assignedAgent: 'planner',
    status: 'Passed',
    priority: 'critical',
    handoffTo: 'designer',
    outputArtifacts: ['/src/types/agents.ts', '/src/components/agents/AgentCommandCentre.tsx'],
    testReport: { passed: true, bugsFound: [], securityChecks: 'State isolation verified', regressionRisk: 'low' },
    createdAt: '2026-10-31 08:45',
    updatedAt: '2026-10-31 09:15',
  },
  {
    id: 'task-102',
    title: 'Design Three.js Interactive Skill Galaxy Canvas',
    description: 'Implement floating interactive neural nodes with orbital rotation and responsive softwareGL fallback.',
    moduleName: '3D Visual Experience',
    assignedAgent: 'designer',
    status: 'Passed',
    priority: 'high',
    handoffTo: 'builder',
    outputArtifacts: ['/src/components/3d/SkillGalaxyCanvas.tsx'],
    testReport: { passed: true, bugsFound: [], securityChecks: 'Accessible fallbacks present', regressionRisk: 'low' },
    createdAt: '2026-10-31 09:30',
    updatedAt: '2026-10-31 10:10',
  },
  {
    id: 'task-103',
    title: 'Deploy Pure ATS Keyword & Placement Eligibility Logic',
    description: 'Implement deterministic scoring math and verify with Node test runner.',
    moduleName: 'Resume & Job Match Engine',
    assignedAgent: 'builder',
    status: 'Passed',
    priority: 'critical',
    handoffTo: 'tester',
    outputArtifacts: ['/src/utils/atsCalculator.ts', '/src/utils/eligibilityChecker.ts'],
    testReport: { passed: true, bugsFound: [], securityChecks: 'Zero SQL injection risk', regressionRisk: 'low' },
    createdAt: '2026-10-31 10:20',
    updatedAt: '2026-10-31 10:45',
  },
  {
    id: 'task-104',
    title: 'Audit Firebase Security Rules & RBAC Permissions',
    description: 'Verify Firestore rules prevent unauthorized cross-tenant modifications while allowing public reads on opportunities.',
    moduleName: 'Security & Auth',
    assignedAgent: 'tester',
    status: 'Passed',
    priority: 'critical',
    handoffTo: 'planner',
    outputArtifacts: ['/firestore.rules'],
    testReport: { passed: true, bugsFound: [], securityChecks: 'Strict isOwner() enforcement confirmed', regressionRisk: 'low' },
    createdAt: '2026-10-31 10:50',
    updatedAt: '2026-10-31 11:20',
  },
];

export const INITIAL_AGENT_LOGS: AgentLogEntry[] = [
  { id: 'log-1', agentRole: 'planner', agentName: 'Strategos AI', timestamp: '10:00:15', action: 'Roadmap Synchronized', details: 'Milestone 1 through 8 prioritized with dependency graph.', type: 'info' },
  { id: 'log-2', agentRole: 'designer', agentName: 'Aura UX', timestamp: '10:12:40', action: 'Visual Tokens Formulated', details: 'Midnight palette (#080B18), glassmorphism, and neon cyan accents mapped.', type: 'success' },
  { id: 'log-3', agentRole: 'builder', agentName: 'Forge Core', timestamp: '10:28:05', action: 'Server Handler Mounted', details: '@google/genai proxy handler attached to Vite dev middleware with User-Agent telemetry.', type: 'success' },
  { id: 'log-4', agentRole: 'tester', agentName: 'Sentron QA', timestamp: '10:42:20', action: 'Automated Suite Passed', details: 'All 6 unit tests executed in 340ms via tsx test runner.', type: 'success' },
  { id: 'log-5', agentRole: 'planner', agentName: 'Strategos AI', timestamp: '10:55:00', action: 'Workflow Handoff Approved', details: 'Milestones validated. Career intelligence services ready for live engagement.', type: 'handoff' },
];

export const INITIAL_RESUMES: ResumeDocument[] = [
  {
    id: 'res-1',
    title: 'Alex Rivers - Full-Stack AI Engineer',
    versionName: 'v2.4 - AI / Fullstack Focus',
    targetRole: 'Full-Stack AI Engineer',
    atsScore: 88,
    summary: 'High-performing Computer Science undergraduate with proven expertise in building modern TypeScript applications, reactive user interfaces, and LLM orchestration workflows. Strong foundation in data structures, system design, and database performance optimization.',
    skills: ['TypeScript', 'React', 'Node.js', 'Express', 'Tailwind CSS', 'PostgreSQL', 'Docker', 'Gemini API', 'Git', 'REST APIs', 'System Design'],
    education: [
      { institution: 'Apex Institute of Technology', degree: 'B.Tech in Computer Science & Engineering', year: '2021 - 2025', gpa: '8.6 / 10.0' },
    ],
    experience: [
      {
        company: 'NovaLabs Technologies',
        role: 'Software Engineering Intern',
        duration: 'Jun 2024 - Aug 2024',
        bulletPoints: [
          'Engineered full-stack telemetry dashboards using React, TypeScript, and Express, cutting query latency by 32%.',
          'Architected PostgreSQL indexes and query caching strategies that reduced database load by 40% under peak simulation.',
          'Integrated automated CI/CD pipeline with GitHub Actions and Docker containers for zero-downtime deployment previews.',
        ],
      },
    ],
    projects: [
      {
        title: 'Cloud Orchestrator & Task Simulator',
        tech: ['TypeScript', 'Node.js', 'Redis', 'Docker'],
        description: 'Simulated distributed microservice workers with concurrency limits and automated failover recovery.',
        impact: 'Achieved 99.8% job delivery reliability under synthetic load tests.',
      },
      {
        title: 'Cognitive RAG Document Intelligence',
        tech: ['React', 'Python', 'Gemini API', 'PostgreSQL'],
        description: 'Semantic search and document synthesis assistant with vector embeddings and citation grounding.',
        impact: 'Reduced research synthesis time from 20 minutes to under 15 seconds.',
      },
    ],
    rawText: `Alex Rivers\nEmail: bansalshubham182@gmail.com | GitHub: alexrivers-dev\nTarget Role: Full-Stack AI Engineer\nEducation: B.Tech Computer Science (CGPA: 8.6)\nSkills: React, TypeScript, Node.js, Express, PostgreSQL, Docker, Gemini API, System Design\nExperience: Software Engineering Intern at NovaLabs Technologies (June 2024 - August 2024)`,
    createdAt: '2026-10-12',
    updatedAt: '2026-10-30',
  },
  {
    id: 'res-2',
    title: 'Alex Rivers - Cloud & Systems Specialist',
    versionName: 'v1.8 - Backend & DevOps Focus',
    targetRole: 'Cloud / DevOps Engineer',
    atsScore: 79,
    summary: 'Systems-focused software engineer with deep interest in containerization, cloud networking, distributed caching, and automated infrastructure as code.',
    skills: ['Docker', 'Kubernetes', 'Linux', 'Go', 'Python', 'PostgreSQL', 'Redis', 'AWS', 'CI/CD'],
    education: [
      { institution: 'Apex Institute of Technology', degree: 'B.Tech in Computer Science', year: '2021 - 2025', gpa: '8.6 / 10.0' },
    ],
    experience: [
      {
        company: 'Apex Cloud Systems Lab',
        role: 'Undergraduate Research Assistant',
        duration: 'Jan 2024 - May 2024',
        bulletPoints: [
          'Configured Dockerized multi-node test clusters for benchmarking network throughput.',
          'Automated deployment scripts in Bash and Python reducing setup time from 45 minutes to 3 minutes.',
        ],
      },
    ],
    projects: [
      {
        title: 'Containerized Load Balancer',
        tech: ['Go', 'Docker', 'Linux'],
        description: 'Lightweight round-robin HTTP reverse proxy with health checking and telemetry logging.',
        impact: 'Sustained 10,000 req/sec with under 5ms median latency.',
      },
    ],
    rawText: `Alex Rivers\nTarget Role: Cloud / DevOps Engineer\nSkills: Docker, Kubernetes, Linux, Go, Python, PostgreSQL, AWS\nEducation: B.Tech Computer Science (CGPA 8.6)`,
    createdAt: '2026-09-15',
    updatedAt: '2026-10-20',
  },
];

export const INITIAL_OPPORTUNITIES: JobOpportunity[] = [
  {
    id: 'opp-1',
    company: 'Stripe',
    logo: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=100',
    role: 'Software Engineer Intern - Core Infrastructure',
    category: 'Software Engineering',
    type: 'Internship',
    location: 'San Francisco, CA / Remote',
    isRemote: true,
    stipendOrSalary: '$9,200 / month + Housing Stipend',
    deadline: '2026-11-20',
    minCgpa: 7.5,
    eligibleGradYears: [2025, 2026],
    allowedDegrees: ['B.Tech', 'B.E.', 'MCA', 'BS Computer Science'],
    maxBacklogs: 0,
    requiredSkills: ['TypeScript', 'React', 'Node.js', 'SQL', 'System Design'],
    description: 'Join the Developer Platform team building high-reliability payment APIs and frontend financial observability tooling. You will collaborate directly with staff engineers on mission-critical features.',
    matchScore: 92,
    eligibilityStatus: 'ELIGIBLE',
  },
  {
    id: 'opp-2',
    company: 'Google Cloud',
    logo: 'https://images.unsplash.com/photo-1573164713988-8665fc963095?w=100',
    role: 'Associate Software Engineer - Cloud Run & AIS',
    category: 'DevOps & Cloud',
    type: 'Full-Time',
    location: 'Mountain View, CA / Hybrid',
    isRemote: false,
    stipendOrSalary: '$145,000 - $168,000 / year + RSUs',
    deadline: '2026-12-05',
    minCgpa: 8.0,
    eligibleGradYears: [2025],
    allowedDegrees: ['B.Tech', 'B.E.', 'M.Tech', 'MS Computer Science'],
    maxBacklogs: 0,
    requiredSkills: ['TypeScript', 'Docker', 'PostgreSQL', 'Go', 'Distributed Systems'],
    description: 'Help architect next-generation serverless execution environments powering AI Studio applets and containerized microservices globally.',
    matchScore: 85,
    eligibilityStatus: 'ELIGIBLE',
  },
  {
    id: 'opp-3',
    company: 'Figma',
    logo: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=100',
    role: 'Frontend Engineering Intern - Canvas & WebGL',
    category: 'Software Engineering',
    type: 'Internship',
    location: 'New York, NY / Hybrid',
    isRemote: true,
    stipendOrSalary: '$8,800 / month',
    deadline: '2026-11-15',
    minCgpa: 7.0,
    eligibleGradYears: [2025, 2026],
    allowedDegrees: ['B.Tech', 'B.E.', 'BS Computer Science', 'Design Engineering'],
    maxBacklogs: 0,
    requiredSkills: ['React', 'TypeScript', 'WebGL', 'Three.js', 'Performance Optimization'],
    description: 'Work with the Web Canvas team to build fluid collaborative design interactions, GPU-accelerated rendering pipelines, and accessible multi-user tools.',
    matchScore: 89,
    eligibilityStatus: 'ELIGIBLE',
  },
  {
    id: 'opp-4',
    company: 'Anthropic',
    logo: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=100',
    role: 'AI Systems & Full-Stack Resident',
    category: 'AI / Machine Learning',
    type: 'Full-Time',
    location: 'San Francisco, CA',
    isRemote: false,
    stipendOrSalary: '$160,000 - $185,000 / year',
    deadline: '2026-12-15',
    minCgpa: 8.5,
    eligibleGradYears: [2024, 2025],
    allowedDegrees: ['B.Tech', 'M.Tech', 'PhD'],
    maxBacklogs: 0,
    requiredSkills: ['Python', 'TypeScript', 'PyTorch', 'REST APIs', 'LLM Alignment'],
    description: 'Build reliable human-in-the-loop interfaces and scalable inference gateways for frontier safety evaluations and research experiments.',
    matchScore: 81,
    eligibilityStatus: 'ELIGIBLE',
  },
  {
    id: 'opp-5',
    company: 'Datadog',
    logo: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=100',
    role: 'Observability & Infrastructure Intern',
    category: 'DevOps & Cloud',
    type: 'Internship',
    location: 'Boston, MA / Remote',
    isRemote: true,
    stipendOrSalary: '$8,000 / month',
    deadline: '2026-11-30',
    minCgpa: 7.2,
    eligibleGradYears: [2025, 2026],
    allowedDegrees: ['B.Tech', 'B.E.', 'MCA'],
    maxBacklogs: 1,
    requiredSkills: ['Linux', 'Docker', 'Python', 'Go', 'Prometheus'],
    description: 'Design telemetry ingestion pipelines and diagnostic alerts capable of processing millions of spans per second.',
    matchScore: 76,
    eligibilityStatus: 'ELIGIBLE',
  },
];

export const INITIAL_APPLICATIONS: JobApplication[] = [
  {
    id: 'app-1',
    company: 'Stripe',
    role: 'Software Engineer Intern - Core Infrastructure',
    location: 'San Francisco, CA (Remote)',
    salary: '$9,200 / month',
    appliedDate: '2026-10-24',
    status: 'Interviewing',
    interviewDate: '2026-11-04 14:00',
    followUpDate: '2026-11-06',
    recruiterContact: 'sarah.jenkins@recruiting.stripe.com',
    notes: 'Passed initial coding assessment (100% score). Technical round on Distributed Queues & React optimization scheduled.',
    atsScore: 92,
  },
  {
    id: 'app-2',
    company: 'Figma',
    role: 'Frontend Engineering Intern - Canvas & WebGL',
    location: 'New York, NY',
    salary: '$8,800 / month',
    appliedDate: '2026-10-20',
    status: 'Screening',
    interviewDate: '2026-11-08 10:00',
    notes: 'Recruiter phone screening booked. Showcase Three.js canvas demo and custom rendering loop.',
    atsScore: 89,
  },
  {
    id: 'app-3',
    company: 'Google Cloud',
    role: 'Associate Software Engineer - Cloud Run',
    location: 'Mountain View, CA',
    salary: '$145,000 / year',
    appliedDate: '2026-10-28',
    status: 'Applied',
    notes: 'Submitted customized resume v2.4 highlighting containerization and TypeScript backend experience.',
    atsScore: 85,
  },
  {
    id: 'app-4',
    company: 'Vercel',
    role: 'Next.js Developer Experience Intern',
    location: 'Remote',
    salary: '$8,500 / month',
    appliedDate: '2026-10-14',
    status: 'Offer',
    interviewDate: '2026-10-27',
    notes: 'Official offer received! Competitive compensation and remote equipment stipend. Decision deadline Nov 18.',
    atsScore: 94,
  },
];

export const INITIAL_ASSESSMENTS: SkillAssessment[] = [
  {
    id: 'assess-ts-react',
    title: 'Modern TypeScript & React 19 Mastery',
    skillName: 'TypeScript',
    category: 'Frontend Engineering',
    difficulty: 'Advanced',
    timeMinutes: 15,
    questionsCount: 5,
    badgeAwarded: 'TypeScript Master',
    questions: [
      {
        id: 'q1',
        question: 'Which TypeScript utility type constructs a type with all properties of T set to optional?',
        codeSnippet: `type User = { id: string; name: string; email: string };\ntype PartialUser = ???<User>;`,
        options: ['Omit<User, any>', 'Partial<User>', 'Optional<User>', 'Readonly<User>'],
        correctIndex: 1,
        explanation: '`Partial<T>` constructs a type with all properties of T set to optional, adding `?` to each property key.',
      },
      {
        id: 'q2',
        question: 'Why should React state not be mutated directly (e.g. `items.push(newItem)`) before calling setState?',
        options: [
          'It will crash the JavaScript runtime immediately',
          'React relies on shallow reference equality (`Object.is`) to detect state changes and schedule re-renders',
          'TypeScript compiler prohibits calling arrays methods on state',
          'State mutations bypass browser garbage collection',
        ],
        correctIndex: 1,
        explanation: 'React compares state references using Object.is. Mutating an existing array retains the identical object reference, causing React to skip reconciliation.',
      },
      {
        id: 'q3',
        question: 'What is the key difference between `interface` and `type` in modern TypeScript regarding declaration merging?',
        options: [
          'Interfaces with the same name automatically merge their declarations; type aliases cannot and will throw a duplicate identifier error',
          'Type aliases support declaration merging, but interfaces do not',
          'Interfaces can only describe primitive types, while type aliases describe objects',
          'There is no difference in modern TypeScript',
        ],
        correctIndex: 0,
        explanation: 'Multiple interface declarations with the same identifier in the same scope merge into a single interface. Type aliases cannot be duplicated.',
      },
      {
        id: 'q4',
        question: 'In React 19 / modern hooks, what does the `useActionState` or `useOptimistic` hook primarily facilitate?',
        options: [
          'Server-side rendering optimization only',
          'Immediate optimistic UI updates while an asynchronous server action is pending',
          'Automatic WebSocket re-connections',
          'Direct DOM manipulation bypassing the virtual DOM',
        ],
        correctIndex: 1,
        explanation: '`useOptimistic` allows displaying an immediate speculative UI update (like an instant comment or like) while an async action completes in the background.',
      },
      {
        id: 'q5',
        question: 'What does the TypeScript `satisfies` operator achieve that simple type annotation does not?',
        options: [
          'It converts types into runtime JavaScript objects',
          'It validates that an expression matches a type while preserving the most specific literal type inferred',
          'It disables all type safety checks for the following expression',
          'It performs deep frozen cloning of the object',
        ],
        correctIndex: 1,
        explanation: 'The `satisfies` operator verifies conformance to an interface or type without widening the expression, preserving specific literal property types and method signatures.',
      },
    ],
  },
  {
    id: 'assess-sys-design',
    title: 'Distributed Systems & Database Scaling',
    skillName: 'System Design',
    category: 'Architecture & Backend',
    difficulty: 'Intermediate',
    timeMinutes: 20,
    questionsCount: 4,
    badgeAwarded: 'System Architect',
    questions: [
      {
        id: 'sq1',
        question: 'What problem does consistent hashing solve when distributing keys across cache servers?',
        options: [
          'It encrypts sensitive keys during transport',
          'When a node is added or removed, only k/n keys need remapping on average rather than reshuffling all keys',
          'It forces every cache server to hold an exact clone of the dataset',
          'It guarantees absolute ACID transactions across all nodes',
        ],
        correctIndex: 1,
        explanation: 'With standard modulo hashing (hash(key) % N), changing N invalidates nearly all cached keys. Consistent hashing minimizes key movement to only 1/N of the dataset.',
      },
      {
        id: 'sq2',
        question: 'What is the primary trade-off highlighted by the CAP theorem for distributed databases during a network partition?',
        options: [
          'Speed vs Storage size',
          'Consistency (all nodes see latest data) vs Availability (every non-failing node returns a non-error response)',
          'Cost vs Read throughput',
          'CPU usage vs RAM consumption',
        ],
        correctIndex: 1,
        explanation: 'When a network partition (P) occurs, a distributed system must choose between guaranteeing Consistency (rejecting stale writes/reads) or Availability (serving requests possibly with stale state).',
      },
      {
        id: 'sq3',
        question: 'Which indexing strategy in PostgreSQL is best suited for geospatial or multi-dimensional bounding queries?',
        options: ['B-Tree index', 'GiST / SP-GiST index', 'Hash index', 'BRIN index on timestamps'],
        correctIndex: 1,
        explanation: 'Generalized Search Tree (GiST) indexes support complex search geometries and overlapping bounding boxes required for geospatial coordinates.',
      },
      {
        id: 'sq4',
        question: 'Why are Idempotency Keys critical in distributed payment processing systems like Stripe?',
        options: [
          'To generate cryptographically secure passwords for users',
          'To safely retry HTTP requests without causing duplicate transactions or charges if a network timeout occurs',
          'To compress the JSON payload across the wire',
          'To bypass database foreign key constraints',
        ],
        correctIndex: 1,
        explanation: 'Network timeouts can leave the client unsure whether a payment succeeded. An idempotency key ensures the server recognizes retried requests and executes the transaction only once.',
      },
    ],
  },
];

export const INITIAL_CHALLENGES: CodingChallenge[] = [
  {
    id: 'chal-1',
    title: 'Two-Pointer Palindrome Substring Verifier',
    difficulty: 'Easy',
    category: 'Algorithms & Strings',
    timeLimitMin: 15,
    description: 'Write a function `isAlmostPalindrome(s: string): boolean` that determines if a string can be made into a palindrome by deleting at most one character. Ignore case and non-alphanumeric characters.',
    starterCode: `function isAlmostPalindrome(s: string): boolean {
  // Clean string and check with two pointers
  const clean = s.toLowerCase().replace(/[^a-z0-9]/g, '');
  
  function check(left: number, right: number): boolean {
    while (left < right) {
      if (clean[left] !== clean[right]) return false;
      left++;
      right--;
    }
    return true;
  }

  let l = 0;
  let r = clean.length - 1;
  while (l < r) {
    if (clean[l] !== clean[r]) {
      return check(l + 1, r) || check(l, r - 1);
    }
    l++;
    r--;
  }
  return true;
}

// Run test
console.log(isAlmostPalindrome("race a car")); // Output: true
`,
    solutionHint: 'Use two pointers moving inward. When characters mismatch, check if removing either the left or right character yields a valid palindrome.',
    testCases: [
      { input: '"race a car"', expected: 'true', description: 'Can delete single character "e" or " " to become palindrome' },
      { input: '"abca"', expected: 'true', description: 'Can delete "b" or "c"' },
      { input: '"abc"', expected: 'false', description: 'Needs more than 1 deletion' },
    ],
  },
  {
    id: 'chal-2',
    title: 'Concurrent Promise Pool Runner',
    difficulty: 'Medium',
    category: 'Async JavaScript / Concurrency',
    timeLimitMin: 25,
    description: 'Implement `async function promisePool<T>(tasks: (() => Promise<T>)[], concurrencyLimit: number): Promise<T[]>` that executes asynchronous task functions in parallel without exceeding the given concurrency threshold.',
    starterCode: `async function promisePool<T>(
  tasks: (() => Promise<T>)[],
  limit: number
): Promise<T[]> {
  const results: T[] = new Array(tasks.length);
  let currentIndex = 0;

  async function worker(): Promise<void> {
    while (currentIndex < tasks.length) {
      const idx = currentIndex++;
      results[idx] = await tasks[idx]();
    }
  }

  const workers = Array.from({ length: Math.min(limit, tasks.length) }, () => worker());
  await Promise.all(workers);
  return results;
}
`,
    solutionHint: 'Spawn `limit` worker loops that pull task indices atomically from a shared index counter until all tasks are consumed.',
    testCases: [
      { input: '3 tasks, limit 2', expected: '[task1, task2, task3]', description: 'Executes within max 2 concurrent promises' },
    ],
  },
];

export const INITIAL_PROJECTS: PortfolioProject[] = [
  {
    id: 'proj-1',
    title: 'SkillSync AI 4.0 Ecosystem',
    tagline: 'Autonomous 4-Agent Career Intelligence & Job Readiness SaaS',
    problemStatement: 'Students and engineers face fragmented job search preparation with misleading ATS metrics, disconnected interview practice, and lack of verified skill evidence.',
    techStack: ['React 19', 'TypeScript', 'Tailwind CSS', 'Three.js', 'Firebase Firestore', 'Gemini API', 'Express'],
    repoUrl: 'https://github.com/alexrivers-dev/skillsync-ai',
    demoUrl: 'https://skillsync-ai.run.app',
    architectureDetails: 'Engineered multi-agent orchestration coordinating Planner, Designer, Builder, and Tester agents. Server-side proxy for Gemini 3.8 Flash and Gemini 3 Pro with User-Agent telemetry. Full Firestore security rules and offline-first cache.',
    evaluationScore: 95,
    evaluationRubric: {
      problemClarity: 20,
      techDepth: 20,
      documentation: 18,
      careerRelevance: 20,
      liveDemo: 17,
      feedback: 'Exceptional architectural rigor. Demonstrates commercial-grade multi-agent orchestration, clean separation of concerns, and verified pure logic with Node test runner.',
    },
  },
  {
    id: 'proj-2',
    title: 'HyperScale Telemetry & Cache Gateway',
    tagline: 'Distributed reverse proxy with Redis caching and real-time metrics',
    problemStatement: 'High-frequency microservice queries overwhelm primary relational databases during spike loads without circuit breakers.',
    techStack: ['Node.js', 'TypeScript', 'Redis', 'Docker', 'PostgreSQL'],
    repoUrl: 'https://github.com/alexrivers-dev/hyperscale-gateway',
    demoUrl: 'https://gateway-demo.alexrivers.dev',
    architectureDetails: 'Implements sliding-window rate limiting, read-through caching with stale-while-revalidate semantics, and Prometheus metrics export.',
    evaluationScore: 90,
    evaluationRubric: {
      problemClarity: 18,
      techDepth: 19,
      documentation: 18,
      careerRelevance: 19,
      liveDemo: 16,
      feedback: 'Strong systems engineering credentials. Recommended to add automated benchmark graphs in README.',
    },
  },
];

export const INITIAL_ROADMAP: RoadmapNode[] = [
  {
    id: 'node-1',
    title: 'Advanced TypeScript & Type-Level Programming',
    category: 'Core Foundations',
    estimatedHours: 12,
    status: 'completed',
    description: 'Master generics, conditional types, mapped types, template literal types, and inference with infer.',
    prerequisites: ['Basic JavaScript', 'OOP Fundamentals'],
    learningResources: [
      { title: 'TypeScript Official Handbook', url: 'https://www.typescriptlang.org/docs/', type: 'doc' },
      { title: 'Type Challenges Interactive Workshop', url: 'https://github.com/type-challenges/type-challenges', type: 'practice' },
    ],
    projectPrompt: 'Build a type-safe schema validator mimicking Zod from scratch using recursive types.',
  },
  {
    id: 'node-2',
    title: 'React 19 Concurrency & State Mechanics',
    category: 'Frontend Architecture',
    estimatedHours: 16,
    status: 'completed',
    description: 'Deep dive into Transitions, Actions, Server Components paradigms, and micro-animations with Framer Motion.',
    prerequisites: ['node-1'],
    learningResources: [
      { title: 'React 19 Release Documentation', url: 'https://react.dev/blog/2024/04/25/react-19', type: 'doc' },
      { title: 'Advanced React Design Patterns', url: 'https://reactpatterns.com/', type: 'doc' },
    ],
    projectPrompt: 'Create a high-performance virtualized data table with optimistic sorting and filter caching.',
  },
  {
    id: 'node-3',
    title: 'Production LLM Orchestration & Server Security',
    category: 'AI & Systems',
    estimatedHours: 20,
    status: 'in_progress',
    description: 'Implement server-side Gemini 3.8 Flash streaming, structured JSON schemas, agent handoff protocols, and token budgets.',
    prerequisites: ['node-1', 'node-2'],
    learningResources: [
      { title: 'Google GenAI TypeScript SDK Documentation', url: 'https://github.com/google-gemini/generative-ai-js', type: 'doc' },
      { title: 'Prompt Engineering & System Instruction Guide', url: 'https://ai.google.dev/docs', type: 'doc' },
    ],
    projectPrompt: 'Develop a multi-agent debate system where two models critique code submissions against clean architecture principles.',
  },
  {
    id: 'node-4',
    title: 'Distributed Systems & Microservices Scalability',
    category: 'Backend & Cloud',
    estimatedHours: 24,
    status: 'locked',
    description: 'Master idempotent APIs, message queues (Kafka/RabbitMQ), consistent hashing, and database sharding.',
    prerequisites: ['node-3'],
    learningResources: [
      { title: 'Designing Data-Intensive Applications (Martin Kleppmann)', url: 'https://dataintensive.net/', type: 'doc' },
    ],
    projectPrompt: 'Architect a distributed event-driven order processing engine with saga pattern compensation.',
  },
];

export const INITIAL_CALENDAR: CalendarEvent[] = [
  { id: 'cal-1', title: 'Stripe Technical Round - Systems & React', date: '2026-11-04', time: '14:00 - 15:00', type: 'interview', completed: false, notes: 'Focus on distributed caching and concurrency.' },
  { id: 'cal-2', title: 'Figma Recruiter Screening', date: '2026-11-08', time: '10:00 - 10:30', type: 'interview', completed: false, notes: 'Prepare 3-minute project walkthrough of Three.js canvas.' },
  { id: 'cal-3', title: 'Google Cloud Internship Deadline', date: '2026-12-05', time: '23:59', type: 'deadline', completed: false, notes: 'Finalize cover letter and verify GitHub profile.' },
  { id: 'cal-4', title: 'Daily Coding Drill: System Design Mock', date: '2026-11-01', time: '17:00 - 18:00', type: 'learning', completed: true, notes: 'Reviewed consistent hashing and replication lags.' },
];

export const INITIAL_NOTIFICATIONS: AppNotification[] = [
  { id: 'notif-1', title: 'Interview Confirmed', message: 'Stripe confirmed your technical interview for Nov 4 at 2:00 PM.', timestamp: '10 mins ago', type: 'interview', read: false },
  { id: 'notif-2', title: 'Streak Milestone!', message: 'You have maintained your 14-day technical learning streak. Keep the momentum!', timestamp: '2 hours ago', type: 'streak', read: false },
  { id: 'notif-3', title: 'New Matching Opportunity', message: 'Figma posted a Frontend Engineering Intern role matching 89% of your verified skills.', timestamp: '1 day ago', type: 'deadline', read: true },
  { id: 'notif-4', title: 'Firebase Security Synced', message: 'Firestore security rules and authentication deployed with project gen-lang-client-0444726115.', timestamp: '1 day ago', type: 'system', read: true },
];

export const INITIAL_PEER_GROUPS: PeerGroup[] = [
  { id: 'grp-1', name: 'FAANG / Tier-1 Interview Prep Squad', focusRole: 'Full-Stack & Systems', memberCount: 142, weeklyGoal: 'Complete 3 System Design mocks & 5 LeetCode Mediums', meetingDay: 'Every Saturday 6 PM', activeDiscussionCount: 28 },
  { id: 'grp-2', name: 'Frontend & 3D Web Pioneers', focusRole: 'React, Three.js & WebGL', memberCount: 89, weeklyGoal: 'Review 2 open-source UI portfolios and evaluate accessibility', meetingDay: 'Every Tuesday 7 PM', activeDiscussionCount: 19 },
  { id: 'grp-3', name: 'AI Engineering & Agent Builders', focusRole: 'LLMs, RAG & Autonomous Agents', memberCount: 215, weeklyGoal: 'Ship 1 functional tool-calling agent with structured JSON outputs', meetingDay: 'Every Thursday 8 PM', activeDiscussionCount: 44 },
];
