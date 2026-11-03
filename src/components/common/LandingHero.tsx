import React from 'react';
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Cpu,
  Bot,
  Video,
  FileText,
  Compass,
  CheckCircle2,
  TrendingUp,
  Layers,
  ChevronRight,
  Terminal,
} from 'lucide-react';
import { SkillGalaxyCanvas } from '../3d/SkillGalaxyCanvas';
import { KineticText } from './KineticText';

interface LandingHeroProps {
  onLaunchApp: () => void;
  onExploreModule: (moduleId: string) => void;
}

export const LandingHero: React.FC<LandingHeroProps> = ({ onLaunchApp, onExploreModule }) => {
  return (
    <div className="space-y-20 py-8 animate-fadeIn">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-[#0c1224] via-[#080B18] to-[#080B18] border border-indigo-500/20 p-8 md:p-14 shadow-2xl">
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-indigo-500/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/2 -right-32 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-4xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-indigo-500/10 to-cyan-500/10 border border-indigo-500/30 text-indigo-300 text-xs font-semibold backdrop-blur-md shadow-sm">
            <Sparkles className="w-4 h-4 text-cyan-400" />
            SKILLSYNC AI 4.0 • AUTONOMOUS CAREER INTELLIGENCE
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight leading-tight">
            <KineticText text="Build Skills. Prove Your Value. Get Hired." as="span" />
          </h1>

          <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            The next-generation career intelligence platform powered by four autonomous AI agents. Real ATS compatibility scoring, evidence-based skill verification, and live AI interview simulations.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <button
              onClick={onLaunchApp}
              className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-600 hover:from-indigo-500 hover:to-cyan-500 text-white font-bold text-sm shadow-xl shadow-indigo-500/25 flex items-center gap-2 cursor-pointer transition-all hover:scale-105"
            >
              Launch Career Dashboard
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => onExploreModule('agent-centre')}
              className="px-6 py-3.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 border border-indigo-500/40 text-slate-200 font-semibold text-sm flex items-center gap-2 cursor-pointer transition-all"
            >
              <Cpu className="w-4 h-4 text-cyan-400" />
              Explore 10-Agent Ecosystem
            </button>
            <button
              onClick={() => onExploreModule('multi-llm-rag')}
              className="px-6 py-3.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 border border-cyan-500/40 text-cyan-300 font-semibold text-sm flex items-center gap-2 cursor-pointer transition-all"
            >
              <Sparkles className="w-4 h-4 text-cyan-400" />
              Multi-LLM & GraphRAG
            </button>
          </div>

          <div className="pt-8 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-400">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Real Firebase Firestore Persistence
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Multi-LLM Routing (Gemini, Claude, GPT, Open-Source)
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" /> GraphRAG Multi-Hop Knowledge Grounding
            </span>
          </div>
        </div>
      </section>

      {/* 3D Interactive Visualizer Feature Showcase */}
      <section className="space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs uppercase tracking-widest text-cyan-400 font-bold">3D Visual Experience</span>
          <h2 className="text-3xl font-bold text-white tracking-tight">Autonomous Neural Skill Lattice</h2>
          <p className="text-xs text-slate-400">
            Click any interactive node on the 3D surface to inspect competency levels and verified readiness metrics.
          </p>
        </div>
        <SkillGalaxyCanvas onSelectSkill={() => onExploreModule('skill-verification')} />
      </section>

      {/* 10 AI Agent System Introduction */}
      <section className="space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs uppercase tracking-widest text-indigo-400 font-bold">Multi-Agent Architecture</span>
          <h2 className="text-3xl font-bold text-white tracking-tight">The 10 Autonomous AI Agents</h2>
          <p className="text-xs text-slate-400">
            Operating in a coordinated state machine across Architecture, Implementation, Research, Security, and Quality Assurance.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {[
            {
              role: 'Planner Agent',
              name: 'Strategos AI',
              tag: 'Chief Strategist',
              desc: 'Analyzes requirements, audits codebase architecture, prioritizes milestone queues, and tracks risk.',
              color: 'from-indigo-500 to-blue-600',
            },
            {
              role: 'Designer Agent',
              name: 'Aura UX',
              tag: 'Visual Architect',
              desc: 'Refines midnight glassmorphism design tokens, 3D Three.js lattices, and enforces contrast accessibility.',
              color: 'from-purple-500 to-pink-500',
            },
            {
              role: 'Builder Agent',
              name: 'Forge Core',
              tag: 'Software Engineer',
              desc: 'Implements full-stack TypeScript components, server-side Gemini endpoints, and Firestore security.',
              color: 'from-cyan-500 to-teal-500',
            },
            {
              role: 'Tester Agent',
              name: 'Sentron QA',
              tag: 'Security & QA Chief',
              desc: 'Executes pure-logic test suites, validates ATS math, audits RBAC permissions, and checks regressions.',
              color: 'from-amber-500 to-emerald-500',
            },
          ].map((agent, i) => (
            <div
              key={i}
              className="p-6 rounded-2xl bg-[#0c1224] border border-indigo-500/20 hover:border-cyan-400/50 shadow-xl space-y-3 transition-all interactive-card cursor-pointer"
            >
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${agent.color} flex items-center justify-center text-white font-bold shadow-md`}>
                <Bot className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[10px] uppercase tracking-wider text-indigo-400 font-bold">{agent.role}</span>
                <h4 className="text-base font-bold text-white">{agent.name}</h4>
                <div className="text-xs text-cyan-300 font-medium">{agent.tag}</div>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">{agent.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Core Career Pillars */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-2xl bg-[#0c1224] border border-indigo-500/20 space-y-3 shadow-xl interactive-card">
          <FileText className="w-8 h-8 text-cyan-400" />
          <h3 className="text-lg font-bold text-white">AI Resume Intelligence</h3>
          <p className="text-xs text-slate-300 leading-relaxed">
            Multi-version resume switcher with deterministic ATS keyword match auditing and STAR bullet point enhancement.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-[#0c1224] border border-indigo-500/20 space-y-3 shadow-xl interactive-card">
          <ShieldCheck className="w-8 h-8 text-emerald-400" />
          <h3 className="text-lg font-bold text-white">Skill Verification Centre</h3>
          <p className="text-xs text-slate-300 leading-relaxed">
            Objective technical quizzes and in-browser code challenge test runner. Earn badges recognized by top recruiters.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-[#0c1224] border border-indigo-500/20 space-y-3 shadow-xl interactive-card">
          <Video className="w-8 h-8 text-purple-400" />
          <h3 className="text-lg font-bold text-white">AI Interview Arena 2.0</h3>
          <p className="text-xs text-slate-300 leading-relaxed">
            Simulate timed technical, system design, and behavioral interviews with dual-scoring rubric and exemplary model answers.
          </p>
        </div>
      </section>

      {/* Final Call to Action */}
      <section className="p-8 md:p-12 rounded-3xl bg-gradient-to-r from-indigo-900 via-[#10182b] to-[#080B18] border border-indigo-500/30 text-center space-y-4 shadow-2xl">
        <h2 className="text-3xl font-extrabold text-white">Ready to Prove Your Value?</h2>
        <p className="text-xs md:text-sm text-slate-300 max-w-xl mx-auto leading-relaxed">
          Launch your SkillSync AI 4.0 dashboard now to run your first ATS match, verify technical competencies, and begin interview drills.
        </p>
        <button
          onClick={onLaunchApp}
          className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-500 hover:from-indigo-500 hover:to-cyan-400 text-white font-bold text-sm shadow-xl shadow-indigo-500/30 cursor-pointer transition-all"
        >
          Enter Full-Stack Ecosystem
        </button>
      </section>
    </div>
  );
};
