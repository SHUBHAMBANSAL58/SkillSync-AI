import React, { useState } from 'react';
import {
  Rocket,
  Layers,
  Database,
  Server,
  ShieldAlert,
  GitBranch,
  Terminal,
  CheckCircle,
  Sparkles,
  Download,
  Copy,
  ChevronRight,
  Code,
  Lock,
} from 'lucide-react';
import { CoFounderProjectBlueprint } from '../../types/nova';
import { UserProfile } from '../../types/career';

const SAMPLE_BLUEPRINTS: CoFounderProjectBlueprint[] = [
  {
    id: 'bp-1',
    title: 'Enterprise AI Agent Workflow Mesh',
    tagline: 'Deterministic multi-agent pipeline orchestrator with human-in-the-loop audit gates',
    domain: 'Enterprise AI & Automation',
    architectureType: 'Event-Driven',
    techStack: {
      frontend: ['React 19', 'TypeScript', 'Tailwind CSS v4', 'Three.js'],
      backend: ['Node.js 22', 'FastAPI (Python)', 'gRPC', 'WebSockets'],
      database: ['PostgreSQL 16 (TimescaleDB)', 'pgvector', 'Redis Cluster'],
      aiServices: ['Gemini 2.5 Flash', 'Deep Research Agent', 'LangChain'],
      infrastructure: ['Docker', 'Kubernetes Helm', 'Terraform', 'Cloudflare Workers'],
    },
    keyModules: [
      {
        name: 'Agent State Orchestrator',
        description: 'Finite state machine managing task handoffs between Planner, Designer, Builder, and Tester.',
        apiEndpoints: ['POST /api/v1/agents/dispatch', 'GET /api/v1/agents/tasks/:id/state', 'POST /api/v1/agents/approve'],
      },
      {
        name: 'Audit & Telemetry Stream',
        description: 'Zero-trust cryptographic logging engine capturing every agent prompt and tool execution.',
        apiEndpoints: ['GET /api/v1/telemetry/live', 'POST /api/v1/telemetry/events', 'GET /api/v1/audit/export'],
      },
      {
        name: 'Multimodal Vision Gateway',
        description: 'High-throughput image & PDF deconstruction service using Gemini Vision APIs.',
        apiEndpoints: ['POST /api/v1/vision/analyze', 'GET /api/v1/vision/jobs/:id'],
      },
    ],
    securityChecklist: [
      'Enforce TLS 1.3 on all intra-cluster microservice communications',
      'Rate limit agent execution to prevent token depletion attacks (100 req/min)',
      'Store all secrets in AWS Secrets Manager / GCP Secret Manager, not in env files',
      'Implement strict Content Security Policy (CSP) blocking unauthorized script execution',
    ],
    recommendedTimelineWeeks: 6,
  },
  {
    id: 'bp-2',
    title: 'Autonomous Career DNA & Talent Marketplace',
    tagline: 'High-concurrency candidate evaluation system with verifiable credential blockchain proofs',
    domain: 'HR Tech & Career SaaS',
    architectureType: 'Modular Monolith',
    techStack: {
      frontend: ['React 19', 'TypeScript', 'Vite', 'Lucide Icons'],
      backend: ['Express.js', 'PostgreSQL (Cloud SQL)', 'Prisma ORM'],
      database: ['PostgreSQL', 'Redis Distributed Lock'],
      aiServices: ['Gemini Pro 1.5', 'OpenAI Whisper Compatible Speech'],
      infrastructure: ['Google Cloud Run', 'Cloud SQL Developer Edition', 'Cloudflare CDN'],
    },
    keyModules: [
      {
        name: 'Skill Verification Oracle',
        description: 'Executes sandboxed automated test cases to award cryptographically verifiable skill badges.',
        apiEndpoints: ['POST /api/v1/verify/code', 'GET /api/v1/verify/passport/:uid'],
      },
      {
        name: 'Blind Recruiter Pipeline',
        description: 'Masks identifying candidate tokens to enforce fair, bias-free talent evaluation.',
        apiEndpoints: ['GET /api/v1/recruiter/candidates', 'POST /api/v1/recruiter/invite'],
      },
    ],
    securityChecklist: [
      'Database field-level encryption for candidate PII using AES-256-GCM',
      'Role-based access control (RBAC) separating candidate, recruiter, and admin roles',
      'OWASP Top 10 automated vulnerability scanning in GitHub Actions CI',
    ],
    recommendedTimelineWeeks: 4,
  },
];

export const ProjectCoFounder: React.FC<{ user: UserProfile }> = ({ user }) => {
  const [selectedBlueprint, setSelectedBlueprint] = useState<CoFounderProjectBlueprint>(SAMPLE_BLUEPRINTS[0]);
  const [activeTab, setActiveTab] = useState<'architecture' | 'schema' | 'openapi' | 'cicd'>('architecture');
  const [copied, setCopied] = useState<boolean>(false);

  const handleCopySpec = (text: string) => {
    navigator.clipboard?.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Top Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-2xl bg-gradient-to-r from-indigo-950/40 via-slate-900/60 to-slate-900/80 border border-indigo-500/20 backdrop-blur-xl">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-purple-600/10 border border-purple-500/30 flex items-center justify-center text-purple-400">
            <Rocket className="w-7 h-7" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold tracking-tight text-white">
                AI Project Co-Founder & Systems Architect
              </h1>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-500/10 text-purple-400 border border-purple-500/30">
                PRODUCTION-GRADE 0 TO 1
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-1 max-w-xl">
              Deconstruct enterprise engineering portfolios into production-ready software architectures, database schemas, and OpenAPI specs.
            </p>
          </div>
        </div>

        {/* Blueprint Selector */}
        <div className="flex items-center gap-2">
          {SAMPLE_BLUEPRINTS.map((bp) => (
            <button
              key={bp.id}
              onClick={() => setSelectedBlueprint(bp)}
              className={`px-3 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer border ${
                selectedBlueprint.id === bp.id
                  ? 'bg-purple-600 text-white border-purple-500 shadow-lg shadow-purple-600/30'
                  : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              {bp.title.split(' ')[0]} {bp.title.split(' ')[1]}
            </button>
          ))}
        </div>
      </div>

      {/* Blueprint Overview Bar */}
      <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 backdrop-blur-md">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-800 pb-4 mb-4">
          <div>
            <span className="text-[10px] font-mono text-purple-400 uppercase tracking-widest">
              SYSTEM BLUEPRINT: {selectedBlueprint.architectureType.toUpperCase()} ARCHITECTURE
            </span>
            <h2 className="text-xl font-bold text-white mt-0.5">{selectedBlueprint.title}</h2>
            <p className="text-xs text-slate-400">{selectedBlueprint.tagline}</p>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-right">
              <span className="text-[10px] font-mono text-slate-400">ESTIMATED DEV EFFORT</span>
              <p className="text-lg font-bold font-mono text-cyan-400">
                {selectedBlueprint.recommendedTimelineWeeks} Weeks
              </p>
            </div>
          </div>
        </div>

        {/* Tech Stack Matrix Badges */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 text-xs">
          <div className="p-3 rounded-xl bg-slate-800/40 border border-slate-750">
            <span className="text-[10px] font-mono text-slate-400 block mb-1">FRONTEND</span>
            <div className="space-y-0.5 font-medium text-slate-200">
              {selectedBlueprint.techStack.frontend.map((f, i) => (
                <div key={i} className="truncate">• {f}</div>
              ))}
            </div>
          </div>

          <div className="p-3 rounded-xl bg-slate-800/40 border border-slate-750">
            <span className="text-[10px] font-mono text-slate-400 block mb-1">BACKEND / API</span>
            <div className="space-y-0.5 font-medium text-slate-200">
              {selectedBlueprint.techStack.backend.map((b, i) => (
                <div key={i} className="truncate">• {b}</div>
              ))}
            </div>
          </div>

          <div className="p-3 rounded-xl bg-slate-800/40 border border-slate-750">
            <span className="text-[10px] font-mono text-slate-400 block mb-1">DATABASE</span>
            <div className="space-y-0.5 font-medium text-slate-200">
              {selectedBlueprint.techStack.database.map((d, i) => (
                <div key={i} className="truncate">• {d}</div>
              ))}
            </div>
          </div>

          <div className="p-3 rounded-xl bg-slate-800/40 border border-slate-750">
            <span className="text-[10px] font-mono text-slate-400 block mb-1">AI ORCHESTRATION</span>
            <div className="space-y-0.5 font-medium text-slate-200">
              {selectedBlueprint.techStack.aiServices.map((a, i) => (
                <div key={i} className="truncate">• {a}</div>
              ))}
            </div>
          </div>

          <div className="p-3 rounded-xl bg-slate-800/40 border border-slate-750">
            <span className="text-[10px] font-mono text-slate-400 block mb-1">DEVOPS / CLOUD</span>
            <div className="space-y-0.5 font-medium text-slate-200">
              {selectedBlueprint.techStack.infrastructure.map((inf, i) => (
                <div key={i} className="truncate">• {inf}</div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Deep Technical Spec Navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-800">
        {[
          { id: 'architecture', label: 'Microservice Modules', icon: Layers },
          { id: 'schema', label: 'PostgreSQL Relational Schema', icon: Database },
          { id: 'openapi', label: 'OpenAPI 3.0 Endpoints', icon: Code },
          { id: 'cicd', label: 'Zero-Trust Security & CI/CD', icon: Lock },
        ].map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-2.5 text-xs font-semibold border-b-2 transition-all cursor-pointer ${
                activeTab === tab.id
                  ? 'border-purple-500 text-purple-400 bg-purple-500/5'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              <Icon className="w-4 h-4" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Tab 1: Key Modules */}
      {activeTab === 'architecture' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {selectedBlueprint.keyModules.map((mod, i) => (
            <div
              key={i}
              className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-purple-500/30 transition-all flex flex-col justify-between"
            >
              <div>
                <span className="text-[10px] font-mono text-purple-400 uppercase tracking-widest block mb-1">
                  MODULE 0{i + 1}
                </span>
                <h4 className="text-base font-bold text-white mb-2">{mod.name}</h4>
                <p className="text-xs text-slate-300 mb-4 leading-relaxed">{mod.description}</p>
              </div>

              <div>
                <p className="text-[10px] font-mono text-slate-400 mb-1.5 uppercase">
                  Exposed API Routes:
                </p>
                <div className="space-y-1 font-mono text-[11px] text-cyan-300 bg-slate-950 p-2.5 rounded-lg border border-slate-800">
                  {mod.apiEndpoints.map((ep, idx) => (
                    <div key={idx} className="truncate">{ep}</div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Tab 2: PostgreSQL Schema */}
      {activeTab === 'schema' && (
        <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 font-mono text-xs">
          <div className="flex items-center justify-between mb-3">
            <span className="text-slate-400">// production-schema.sql (PostgreSQL 16 with pgvector & UUID PK)</span>
            <button
              onClick={() => handleCopySpec('-- SQL Schema export\nCREATE EXTENSION IF NOT EXISTS "uuid-ossp";')}
              className="flex items-center gap-1.5 text-purple-400 hover:text-purple-300 cursor-pointer"
            >
              <Copy className="w-3.5 h-3.5" /> {copied ? 'Copied!' : 'Copy SQL'}
            </button>
          </div>
          <pre className="p-4 rounded-xl bg-slate-950 text-slate-200 overflow-x-auto leading-relaxed border border-slate-800">
{`-- Automated schema generator for ${selectedBlueprint.title}
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "vector";

CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email VARCHAR(255) UNIQUE NOT NULL,
  display_name VARCHAR(120) NOT NULL,
  role VARCHAR(32) DEFAULT 'candidate',
  readiness_score INT DEFAULT 75,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE verified_credentials (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  skill_name VARCHAR(80) NOT NULL,
  score INT NOT NULL,
  competency_level VARCHAR(32) NOT NULL,
  cryptographic_hash VARCHAR(128) NOT NULL,
  verified_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_credentials_user ON verified_credentials(user_id);
CREATE INDEX idx_users_readiness ON users(readiness_score DESC);`}
          </pre>
        </div>
      )}

      {/* Tab 3: OpenAPI Spec */}
      {activeTab === 'openapi' && (
        <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 font-mono text-xs">
          <div className="flex items-center justify-between mb-3">
            <span className="text-slate-400">// openapi-spec.yaml (OpenAPI 3.0.3 Contract)</span>
            <button
              onClick={() => handleCopySpec('openapi: 3.0.3\ninfo:\n  title: ' + selectedBlueprint.title)}
              className="flex items-center gap-1.5 text-purple-400 hover:text-purple-300 cursor-pointer"
            >
              <Copy className="w-3.5 h-3.5" /> {copied ? 'Copied!' : 'Copy YAML'}
            </button>
          </div>
          <pre className="p-4 rounded-xl bg-slate-950 text-slate-200 overflow-x-auto leading-relaxed border border-slate-800">
{`openapi: 3.0.3
info:
  title: "${selectedBlueprint.title} Core Gateway"
  version: "4.0.0"
  description: "Deterministic orchestration endpoints for ${selectedBlueprint.domain}"
paths:
  /api/v1/agents/dispatch:
    post:
      summary: "Trigger 4-agent coordination pipeline"
      requestBody:
        required: true
        content:
          application/json:
            schema:
              type: object
              properties:
                task_id: { type: string }
                target_stage: { type: string, enum: [planner, designer, builder, tester] }
      responses:
        '200':
          description: "Agent execution state updated"`}
          </pre>
        </div>
      )}

      {/* Tab 4: CI/CD & Security */}
      {activeTab === 'cicd' && (
        <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4">
          <h4 className="text-sm font-bold text-white flex items-center gap-2">
            <Lock className="w-4 h-4 text-purple-400" />
            Zero-Trust Security Checklist & Hardening
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {selectedBlueprint.securityChecklist.map((sec, i) => (
              <div
                key={i}
                className="p-3.5 rounded-xl bg-slate-800/40 border border-slate-750 flex items-start gap-3 text-xs"
              >
                <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span className="text-slate-200">{sec}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
