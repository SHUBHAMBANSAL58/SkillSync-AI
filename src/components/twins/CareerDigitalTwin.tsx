import React, { useState } from 'react';
import {
  Brain,
  TrendingUp,
  Target,
  Sparkles,
  Zap,
  ShieldCheck,
  Award,
  ArrowRight,
  Sliders,
  DollarSign,
  Clock,
  AlertTriangle,
  Play,
  RotateCcw,
} from 'lucide-react';
import { UserProfile } from '../../types/career';
import { simulateCareerPath } from '../../services/novaIntelligence';
import { CareerSimulationResult } from '../../types/nova';

interface CareerDigitalTwinProps {
  user: UserProfile;
  onNavigateToVerification?: () => void;
  onNavigateToRoadmap?: () => void;
}

export const CareerDigitalTwin: React.FC<CareerDigitalTwinProps> = ({
  user,
  onNavigateToVerification,
  onNavigateToRoadmap,
}) => {
  // Simulator inputs
  const [selectedDomain, setSelectedDomain] = useState<string>('ai-systems');
  const [targetTimeframe, setTargetTimeframe] = useState<number>(6); // months
  const [customSkillInput, setCustomSkillInput] = useState<string>('');
  const [activeSkills, setActiveSkills] = useState<string[]>([
    'Distributed Systems',
    'LLM Orchestration',
    'PostgreSQL Sharding',
    'Kubernetes',
  ]);

  // Simulation execution state
  const [simulationResult, setSimulationResult] = useState<CareerSimulationResult>(() =>
    simulateCareerPath(user.readinessScore || 78, activeSkills, 6)
  );

  const handleRunSimulation = () => {
    const res = simulateCareerPath(user.readinessScore || 78, activeSkills, targetTimeframe);
    setSimulationResult(res);
  };

  const handleAddSkill = (skill: string) => {
    if (!skill.trim() || activeSkills.includes(skill)) return;
    const updated = [...activeSkills, skill.trim()];
    setActiveSkills(updated);
    setSimulationResult(simulateCareerPath(user.readinessScore || 78, updated, targetTimeframe));
    setCustomSkillInput('');
  };

  const handleRemoveSkill = (skill: string) => {
    const updated = activeSkills.filter((s) => s !== skill);
    setActiveSkills(updated);
    setSimulationResult(simulateCareerPath(user.readinessScore || 78, updated, targetTimeframe));
  };

  // Preset domains
  const DOMAIN_PRESETS: Record<string, { label: string; skills: string[] }> = {
    'ai-systems': {
      label: 'Generative AI & LLM Systems',
      skills: ['LLM Orchestration', 'Vector Embeddings', 'RAG Architecture', 'FastAPI', 'PyTorch Inference'],
    },
    'distributed-cloud': {
      label: 'Cloud-Native & Distributed Systems',
      skills: ['Distributed Systems', 'Kubernetes', 'gRPC', 'PostgreSQL Sharding', 'Terraform'],
    },
    'high-scale-frontend': {
      label: 'High-Scale Frontend & WebGL',
      skills: ['React 19 Concurrent Mode', 'Three.js / WebGL', 'Web Audio API', 'TypeScript Performance', 'Next.js App Router'],
    },
    'cybersecurity': {
      label: 'Application Security & DevSecOps',
      skills: ['Zero-Trust Architecture', 'OAuth2 / OIDC', 'OWASP Hardening', 'Container Security', 'Cloudflare Workers'],
    },
  };

  // Digital Twin capability dimensions
  const twinDimensions = [
    { label: 'System Architecture & Scale', current: 84, benchmark: 88, weight: 'High' },
    { label: 'Full-Stack Implementation', current: 92, benchmark: 82, weight: 'Highest' },
    { label: 'AI / LLM Orchestration', current: 86, benchmark: 74, weight: 'Emerging' },
    { label: 'DevOps & Cloud Infrastructure', current: 78, benchmark: 80, weight: 'Medium' },
    { label: 'Security & Zero-Trust', current: 79, benchmark: 75, weight: 'Medium' },
    { label: 'Technical Communication & Leadership', current: 88, benchmark: 85, weight: 'High' },
  ];

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Top Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-2xl bg-gradient-to-r from-indigo-950/40 via-slate-900/60 to-slate-900/80 border border-indigo-500/20 backdrop-blur-xl">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-indigo-600/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
            <Brain className="w-7 h-7" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold tracking-tight text-white">
                Career Digital Twin 4.0
              </h1>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                SYNCHRONIZED WITH LIVE RESUME
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-1 max-w-xl">
              Real-time computational replica of your engineering capability, industry percentile benchmarks, and predictive career path simulator.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-right">
            <p className="text-xs font-mono text-slate-400">MARKET READINESS</p>
            <p className="text-2xl font-bold font-mono text-emerald-400">
              {user.readinessScore}%
            </p>
          </div>
          <div className="w-px h-10 bg-slate-800" />
          <div className="text-right">
            <p className="text-xs font-mono text-slate-400">GLOBAL PERCENTILE</p>
            <p className="text-2xl font-bold font-mono text-indigo-400">Top 8%</p>
          </div>
        </div>
      </div>

      {/* Two Column Grid: Digital Twin Radar vs Predictive Simulator */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Digital Twin Capability Breakdown */}
        <div className="lg:col-span-5 space-y-6">
          <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 backdrop-blur-md">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Target className="w-4 h-4 text-indigo-400" />
                Engineering Capability Vectors
              </h3>
              <span className="text-xs font-mono text-slate-400">Benchmark: FAANG Staff L6</span>
            </div>

            <div className="space-y-4">
              {twinDimensions.map((dim, i) => (
                <div key={i} className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-medium text-slate-200">{dim.label}</span>
                    <div className="flex items-center gap-2 font-mono">
                      <span className="text-indigo-400 font-semibold">{dim.current}%</span>
                      <span className="text-slate-500 text-[10px]">/ {dim.benchmark}% tier</span>
                    </div>
                  </div>
                  {/* Progress bar with twin marker */}
                  <div className="relative w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                    <div
                      className="bg-indigo-500 h-full rounded-full transition-all duration-500"
                      style={{ width: `${dim.current}%` }}
                    />
                    {/* Benchmark tick indicator */}
                    <div
                      className="absolute top-0 bottom-0 w-0.5 bg-amber-400 shadow-sm"
                      style={{ left: `${dim.benchmark}%` }}
                      title={`Target benchmark: ${dim.benchmark}%`}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs">
              <span className="text-slate-400 flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                Verified via SkillSync Assessments
              </span>
              {onNavigateToVerification && (
                <button
                  onClick={onNavigateToVerification}
                  className="text-indigo-400 hover:text-indigo-300 font-medium underline flex items-center gap-1 cursor-pointer"
                >
                  Verify More Skills <ArrowRight className="w-3 h-3" />
                </button>
              )}
            </div>
          </div>

          {/* Real-world Market Strengths & Gap Signals */}
          <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 backdrop-blur-md">
            <h4 className="text-xs font-mono font-semibold text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              Twin Strengths & High-Value Gaps
            </h4>
            <div className="space-y-3 text-xs">
              <div className="p-3 rounded-xl bg-emerald-950/20 border border-emerald-500/20 text-slate-300">
                <span className="font-semibold text-emerald-400 block mb-1">
                  Primary Market Superpower:
                </span>
                Full-Stack TypeScript & AI Agent Orchestration. You outscore 94% of peers in rapid end-to-end prototyping.
              </div>

              <div className="p-3 rounded-xl bg-amber-950/20 border border-amber-500/20 text-slate-300">
                <span className="font-semibold text-amber-400 block mb-1">
                  High-Impact Growth Gap:
                </span>
                Cloud-Native Distributed Sharding & Kubernetes Operators. Closing this vector increases compensation offers by ~24%.
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Predictive Career Simulator */}
        <div className="lg:col-span-7 space-y-6">
          <div className="p-6 rounded-2xl bg-slate-900/60 border border-indigo-500/20 backdrop-blur-md">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-emerald-400" />
                  Predictive "What-If" Career Simulation Engine
                </h3>
                <p className="text-xs text-slate-400">
                  Simulate future career value and compensation trajectories based on acquiring specific technical skills
                </p>
              </div>
              <button
                onClick={handleRunSimulation}
                className="px-3.5 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer shadow-lg shadow-indigo-600/30"
              >
                <Play className="w-3.5 h-3.5" /> Re-Simulate
              </button>
            </div>

            {/* Presets and Domain Selector */}
            <div className="mb-4">
              <label className="text-xs font-mono text-slate-400 mb-2 block">SELECT STRATEGIC SPECIALIZATION:</label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {Object.entries(DOMAIN_PRESETS).map(([key, domain]) => (
                  <button
                    key={key}
                    onClick={() => {
                      setSelectedDomain(key);
                      setActiveSkills(domain.skills);
                      setSimulationResult(simulateCareerPath(user.readinessScore || 78, domain.skills, targetTimeframe));
                    }}
                    className={`text-left px-3 py-2 rounded-xl text-xs font-medium border transition-all cursor-pointer ${
                      selectedDomain === key
                        ? 'bg-indigo-600/20 border-indigo-500/50 text-indigo-300'
                        : 'bg-slate-800/40 border-slate-700/60 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    {domain.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Timeframe Slider */}
            <div className="mb-4 p-3 rounded-xl bg-slate-800/40 border border-slate-700/50 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2 text-slate-300">
                <Clock className="w-4 h-4 text-cyan-400" />
                <span>Simulation Time Horizon:</span>
                <span className="font-mono font-bold text-white">{targetTimeframe} Months</span>
              </div>
              <input
                type="range"
                min="3"
                max="24"
                step="3"
                value={targetTimeframe}
                onChange={(e) => {
                  const val = Number(e.target.value);
                  setTargetTimeframe(val);
                  setSimulationResult(simulateCareerPath(user.readinessScore || 78, activeSkills, val));
                }}
                className="w-full sm:w-48 accent-indigo-500 cursor-pointer"
              />
            </div>

            {/* Active Skills in Simulation */}
            <div className="mb-4">
              <label className="text-xs font-mono text-slate-400 mb-1.5 block">SKILLS IN SCENARIO:</label>
              <div className="flex flex-wrap gap-1.5 mb-2">
                {activeSkills.map((skill) => (
                  <span
                    key={skill}
                    className="text-xs px-2.5 py-1 rounded-lg bg-indigo-950/80 text-indigo-300 border border-indigo-500/30 flex items-center gap-1.5"
                  >
                    {skill}
                    <button
                      onClick={() => handleRemoveSkill(skill)}
                      className="text-slate-400 hover:text-white cursor-pointer font-bold"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>

              {/* Add custom skill input */}
              <div className="flex gap-2">
                <input
                  type="text"
                  value={customSkillInput}
                  onChange={(e) => setCustomSkillInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleAddSkill(customSkillInput);
                  }}
                  placeholder="Add another skill (e.g. Rust, Kafka, Cassandra)..."
                  className="flex-1 bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                />
                <button
                  onClick={() => handleAddSkill(customSkillInput)}
                  className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs text-slate-200 font-medium cursor-pointer"
                >
                  Add
                </button>
              </div>
            </div>

            {/* Simulation Impact Forecast Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
              <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800">
                <p className="text-[11px] font-mono text-slate-400">PROJECTED VALUE BUMP</p>
                <p className="text-xl font-bold font-mono text-emerald-400 flex items-center gap-1 mt-1">
                  <DollarSign className="w-4 h-4" /> +{simulationResult.projectedSalaryBumpPercent}%
                </p>
                <p className="text-[10px] text-slate-500 mt-0.5">Est. +$32,000 to $48,000/yr</p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800">
                <p className="text-[11px] font-mono text-slate-400">READINESS DELTA</p>
                <p className="text-xl font-bold font-mono text-indigo-400 flex items-center gap-1 mt-1">
                  <Zap className="w-4 h-4" /> +{simulationResult.projectedReadinessDelta} pts
                </p>
                <p className="text-[10px] text-slate-500 mt-0.5">
                  Reaches {Math.min(99, (user.readinessScore || 78) + simulationResult.projectedReadinessDelta)}% Overall
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800">
                <p className="text-[11px] font-mono text-slate-400">MARKET DEMAND TIER</p>
                <p className="text-xl font-bold font-mono text-cyan-400 flex items-center gap-1 mt-1">
                  <Target className="w-4 h-4" /> {simulationResult.projectedMarketDemandScore} / 100
                </p>
                <p className="text-[10px] text-slate-500 mt-0.5">High hiring velocity</p>
              </div>
            </div>

            {/* Unlocked Roles */}
            <div className="mb-4">
              <h5 className="text-xs font-mono font-semibold text-slate-300 uppercase tracking-wider mb-2">
                QUALIFYING TARGET ROLES UNLOCKED:
              </h5>
              <div className="flex flex-wrap gap-1.5">
                {simulationResult.unlockedRoleTitles.map((role, i) => (
                  <span
                    key={i}
                    className="text-xs px-2.5 py-1 rounded bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 font-medium"
                  >
                    ★ {role}
                  </span>
                ))}
              </div>
            </div>

            {/* Prerequisite Milestones Roadmap */}
            <div>
              <h5 className="text-xs font-mono font-semibold text-slate-300 uppercase tracking-wider mb-2">
                REQUIRED EXECUTION MILESTONES:
              </h5>
              <div className="space-y-1.5 text-xs text-slate-300">
                {simulationResult.prerequisiteMilestones.map((ms, i) => (
                  <div key={i} className="flex items-start gap-2 p-2 rounded bg-slate-800/40 border border-slate-700/50">
                    <span className="w-4 h-4 rounded-full bg-indigo-600/30 text-indigo-400 flex items-center justify-center font-mono text-[10px] shrink-0 mt-0.5">
                      {i + 1}
                    </span>
                    <span>{ms}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
