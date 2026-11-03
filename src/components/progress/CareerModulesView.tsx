import React, { useState } from 'react';
import {
  Compass,
  CheckCircle2,
  Lock,
  ExternalLink,
  Flame,
  Award,
  Users,
  Calendar,
  Download,
  Shield,
  Clock,
  BookOpen,
  Target,
  Send,
  Sparkles,
} from 'lucide-react';
import {
  UserProfile,
  RoadmapNode,
  CalendarEvent,
  PeerGroup,
} from '../../types/career';
import { DsaAndSpacedRepetition } from './DsaAndSpacedRepetition';

interface CareerModulesViewProps {
  moduleType: 'dna' | 'roadmap' | 'mission' | 'reports' | 'peer' | 'calendar' | 'admin';
  user: UserProfile;
  roadmap: RoadmapNode[];
  calendarEvents: CalendarEvent[];
  peerGroups: PeerGroup[];
  onToggleRoadmapNode?: (id: string) => void;
  onUpdateCalendarEvents?: (events: CalendarEvent[]) => void;
}

export const CareerModulesView: React.FC<CareerModulesViewProps> = ({
  moduleType,
  user,
  roadmap,
  calendarEvents,
  peerGroups,
  onToggleRoadmapNode,
  onUpdateCalendarEvents,
}) => {
  const [activeRoadmapNode, setActiveRoadmapNode] = useState<RoadmapNode>(roadmap[0]);
  const [newDiscussion, setNewDiscussion] = useState('');
  const [roadmapSubTab, setRoadmapSubTab] = useState<'milestones' | 'dsa_spaced'>('milestones');
  const [joinedSquads, setJoinedSquads] = useState<string[]>([]);

  // 1. CAREER DNA
  if (moduleType === 'dna') {
    return (
      <div className="space-y-6 animate-fadeIn">
        <div className="p-6 md:p-8 rounded-2xl bg-gradient-to-r from-[#0c1224] via-[#10182b] to-[#080B18] border border-indigo-500/20 shadow-xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-xs font-semibold mb-2">
            <Compass className="w-3.5 h-3.5 text-cyan-400" />
            MODULE 2 • CAREER DNA DIAGNOSTIC
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
            Engineering Archetype & Cognitive Strengths
          </h2>
          <p className="text-sm text-slate-400 mt-1">
            Deep algorithmic assessment of architectural instincts, technical velocity, and target trajectory.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-4 p-6 rounded-2xl bg-[#0c1224] border border-indigo-500/20 shadow-xl space-y-4 text-center">
            <div className="w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br from-indigo-500 to-cyan-500 p-0.5 shadow-xl flex items-center justify-center">
              <div className="w-full h-full bg-[#080b18] rounded-2xl flex items-center justify-center">
                <Compass className="w-10 h-10 text-cyan-400" />
              </div>
            </div>
            <div>
              <span className="text-[10px] uppercase tracking-widest text-indigo-400 font-bold">Primary Archetype</span>
              <h3 className="text-xl font-extrabold text-white mt-0.5">Systems & Full-Stack AI Polymath</h3>
              <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                Characterized by dual proficiency in reactive browser graphics (React 19 / Three.js) and backend scalability (distributed queuing, PostgreSQL indexing).
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-left space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-400">Cognitive Profile:</span>
                <span className="text-cyan-300 font-semibold">Architectural Synthesizer</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Execution Velocity:</span>
                <span className="text-emerald-400 font-semibold">94th Percentile</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Recommended Path:</span>
                <span className="text-purple-300 font-semibold">Staff / Principal Track</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-8 p-6 md:p-8 rounded-2xl bg-[#0c1224] border border-indigo-500/20 shadow-xl space-y-6">
            <h3 className="text-base font-bold text-white">DNA Competency Dimensions</h3>
            <div className="space-y-4">
              {[
                { name: 'System Abstraction & Architectural Rigor', score: 92, desc: 'Ability to decouple high-throughput systems and maintain clean separation of concerns.' },
                { name: 'Frontend Reactivity & UX Polish', score: 95, desc: 'Fluency in modern React paradigms, accessible DOM semantics, and 3D visual fidelity.' },
                { name: 'Data Modeling & Persistence Security', score: 86, desc: 'PostgreSQL relational schemas, indexing strategies, and Firestore isolation rules.' },
                { name: 'LLM Orchestration & Server Proxying', score: 88, desc: 'Server-side API design, structured schema generation, and multi-agent workflows.' },
              ].map((dim) => (
                <div key={dim.name} className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-white">{dim.name}</span>
                    <span className="text-cyan-400 font-mono font-bold">{dim.score}%</span>
                  </div>
                  <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-indigo-500 to-cyan-400 rounded-full" style={{ width: `${dim.score}%` }} />
                  </div>
                  <p className="text-[11px] text-slate-400">{dim.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 2. AI LEARNING ROADMAP
  if (moduleType === 'roadmap') {
    return (
      <div className="space-y-6 animate-fadeIn">
        <div className="p-6 md:p-8 rounded-2xl bg-gradient-to-r from-[#0c1224] via-[#10182b] to-[#080B18] border border-indigo-500/20 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-xs font-semibold mb-2">
              <BookOpen className="w-3.5 h-3.5 text-cyan-400" />
              MODULE 7 • AI LEARNING ROADMAP & DSA LAB
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
              Curated Milestones & Adaptive Retention
            </h2>
            <p className="text-sm text-slate-400 mt-1">
              Dynamic curriculum mapped directly to target trajectory, paired with FAANG-tier DSA practice and Leitner flashcards.
            </p>
          </div>

          {/* Sub-tab Toggle */}
          <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-900 border border-slate-800">
            <button
              onClick={() => setRoadmapSubTab('milestones')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                roadmapSubTab === 'milestones'
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Milestones Roadmap
            </button>
            <button
              onClick={() => setRoadmapSubTab('dsa_spaced')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                roadmapSubTab === 'dsa_spaced'
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              DSA & Leitner Engine
            </button>
          </div>
        </div>

        {roadmapSubTab === 'dsa_spaced' ? (
          <DsaAndSpacedRepetition />
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-5 space-y-3">
            {roadmap.map((node, index) => (
              <div
                key={node.id}
                onClick={() => setActiveRoadmapNode(node)}
                className={`p-4 rounded-xl border text-left transition-all cursor-pointer flex items-center justify-between gap-3 ${
                  activeRoadmapNode.id === node.id
                    ? 'bg-indigo-600/20 border-cyan-400 ring-1 ring-cyan-400/40 text-white'
                    : 'bg-slate-900/60 border-slate-800 text-slate-300 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span
                    className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold ${
                      node.status === 'completed'
                        ? 'bg-emerald-500 text-slate-950'
                        : node.status === 'in_progress'
                        ? 'bg-cyan-500 text-slate-950'
                        : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    {node.status === 'completed' ? <CheckCircle2 className="w-4 h-4" /> : index + 1}
                  </span>
                  <div>
                    <h4 className="text-xs font-bold">{node.title}</h4>
                    <span className="text-[10px] text-slate-400">{node.estimatedHours} hours • {node.category}</span>
                  </div>
                </div>
                {node.status === 'locked' && <Lock className="w-4 h-4 text-slate-500" />}
              </div>
            ))}
          </div>

          <div className="lg:col-span-7 p-6 md:p-8 rounded-2xl bg-[#0c1224] border border-indigo-500/20 shadow-xl space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div>
                <span className="text-xs text-indigo-400 font-semibold uppercase">{activeRoadmapNode.category}</span>
                <h3 className="text-xl font-bold text-white mt-0.5">{activeRoadmapNode.title}</h3>
              </div>
              <span className="text-xs font-mono text-cyan-300 bg-slate-900 px-3 py-1 rounded-lg border border-slate-800">
                {activeRoadmapNode.estimatedHours} Hours Required
              </span>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">{activeRoadmapNode.description}</p>

            {/* Curated Resources */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Recommended Curated Resources</h4>
              <div className="space-y-2">
                {activeRoadmapNode.learningResources.map((res, i) => (
                  <a
                    key={i}
                    href={res.url}
                    target="_blank"
                    rel="noreferrer"
                    className="p-3 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-slate-800 flex items-center justify-between text-xs text-slate-200 transition-all"
                  >
                    <span className="font-semibold text-cyan-300">{res.title}</span>
                    <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
                  </a>
                ))}
              </div>
            </div>

            {/* Practical Project Prompt */}
            <div className="p-4 rounded-xl bg-indigo-950/30 border border-indigo-500/30 space-y-1">
              <span className="text-[11px] font-bold text-indigo-300 uppercase">Capstone Project Exercise</span>
              <p className="text-xs text-slate-200 leading-relaxed">{activeRoadmapNode.projectPrompt}</p>
            </div>
          </div>
        </div>
        )}
      </div>
    );
  }

  // 3. REPORTS & ACHIEVEMENTS
  if (moduleType === 'reports') {
    return (
      <div className="space-y-6 animate-fadeIn">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 md:p-8 rounded-2xl bg-gradient-to-r from-[#0c1224] via-[#10182b] to-[#080B18] border border-indigo-500/20 shadow-xl">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-xs font-semibold mb-2">
              <Award className="w-3.5 h-3.5 text-cyan-400" />
              MODULE 16 • CAREER PROGRESS INTELLIGENCE & AWARDS
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
              Executive Career Readiness Report
            </h2>
            <p className="text-sm text-slate-400 mt-1">
              Weekly telemetry, verified credentials, and printable recruitment transcript.
            </p>
          </div>
          <button
            onClick={() => window.print()}
            className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold flex items-center gap-2 shadow-md cursor-pointer transition-all self-start md:self-auto"
          >
            <Download className="w-4 h-4" /> Download PDF Transcript
          </button>
        </div>

        {/* Badges Case */}
        <div className="p-6 md:p-8 rounded-2xl bg-[#0c1224] border border-indigo-500/20 shadow-xl space-y-4">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <Award className="w-5 h-5 text-amber-400" />
            Verified Achievement Showcase
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {user.achievements.map((ach) => (
              <div
                key={ach.id}
                className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800 hover:border-amber-500/40 transition-all space-y-2 text-center"
              >
                <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400 mx-auto flex items-center justify-center font-bold">
                  <Award className="w-6 h-6" />
                </div>
                <h4 className="text-sm font-bold text-white">{ach.title}</h4>
                <p className="text-[11px] text-slate-400 leading-relaxed">{ach.description}</p>
                <div className="text-[10px] text-emerald-400 font-mono">Unlocked: {ach.unlockedAt}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // 4. PEER LEARNING & MENTORSHIP
  if (moduleType === 'peer') {
    return (
      <div className="space-y-6 animate-fadeIn">
        <div className="p-6 md:p-8 rounded-2xl bg-gradient-to-r from-[#0c1224] via-[#10182b] to-[#080B18] border border-indigo-500/20 shadow-xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-xs font-semibold mb-2">
            <Users className="w-3.5 h-3.5 text-cyan-400" />
            PART 5.10 • PEER LEARNING & SQUAD MENTORSHIP
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
            Collaborative Engineering Squads
          </h2>
          <p className="text-sm text-slate-400 mt-1">
            Weekly peer review groups, mock interview partner matching, and collaborative project critique.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {peerGroups.map((grp) => (
            <div
              key={grp.id}
              className="p-6 rounded-2xl bg-[#0c1224] border border-indigo-500/20 shadow-xl flex flex-col justify-between space-y-4"
            >
              <div className="space-y-2">
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-300 border border-cyan-500/20">
                  {grp.focusRole}
                </span>
                <h3 className="text-base font-bold text-white mt-1">{grp.name}</h3>
                <p className="text-xs text-slate-400">{grp.memberCount} Active Engineers • {grp.meetingDay}</p>
                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300">
                  <span className="font-semibold text-indigo-300">Sprint Goal: </span>
                  {grp.weeklyGoal}
                </div>
              </div>

              <button
                onClick={() => {
                  if (joinedSquads.includes(grp.id)) return;
                  setJoinedSquads((prev) => [...prev, grp.id]);
                  if (onUpdateCalendarEvents) {
                    onUpdateCalendarEvents([
                      ...calendarEvents,
                      {
                        id: `event-${Date.now()}`,
                        title: `${grp.name} Study Sprint`,
                        date: new Date().toISOString().split('T')[0],
                        time: '18:00 - 19:30',
                        type: 'interview',
                        completed: false,
                        notes: `Weekly peer group sprint: ${grp.weeklyGoal}`,
                      },
                    ]);
                  }
                }}
                className={`w-full py-2.5 rounded-xl text-xs font-semibold cursor-pointer shadow-md transition-all text-center ${
                  joinedSquads.includes(grp.id)
                    ? 'bg-emerald-600/30 text-emerald-300 border border-emerald-500/40 cursor-default'
                    : 'bg-indigo-600 hover:bg-indigo-500 text-white'
                }`}
              >
                {joinedSquads.includes(grp.id) ? 'Joined Study Squad ✓' : 'Join Study Squad'}
              </button>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // 5. CAREER CALENDAR
  if (moduleType === 'calendar') {
    return (
      <div className="space-y-6 animate-fadeIn">
        <div className="p-6 md:p-8 rounded-2xl bg-gradient-to-r from-[#0c1224] via-[#10182b] to-[#080B18] border border-indigo-500/20 shadow-xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-xs font-semibold mb-2">
            <Calendar className="w-3.5 h-3.5 text-cyan-400" />
            PART 5.9 • CAREER CALENDAR & SCHEDULE
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
            Interviews, Deadlines & Daily Drills
          </h2>
          <p className="text-sm text-slate-400 mt-1">
            Integrated timeline synchronizing application milestones and practice schedules.
          </p>
        </div>

        <div className="p-6 md:p-8 rounded-2xl bg-[#0c1224] border border-indigo-500/20 shadow-xl space-y-4">
          <div className="space-y-3">
            {calendarEvents.map((evt) => (
              <div
                key={evt.id}
                className="p-4 rounded-xl bg-slate-900/70 border border-slate-800 flex items-center justify-between gap-4"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-white">{evt.title}</span>
                    <span
                      className={`text-[10px] px-2 py-0.5 rounded font-mono ${
                        evt.type === 'interview'
                          ? 'bg-rose-500/20 text-rose-300'
                          : evt.type === 'deadline'
                          ? 'bg-amber-500/20 text-amber-300'
                          : 'bg-indigo-500/20 text-indigo-300'
                      }`}
                    >
                      {evt.type.toUpperCase()}
                    </span>
                  </div>
                  <div className="text-xs text-slate-400">
                    {evt.date} {evt.time ? `• ${evt.time}` : ''} • {evt.notes}
                  </div>
                </div>

                <button
                  onClick={() => {
                    const updated = calendarEvents.map((e) =>
                      e.id === evt.id ? { ...e, completed: !e.completed } : e
                    );
                    onUpdateCalendarEvents?.(updated);
                  }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition-all ${
                    evt.completed
                      ? 'bg-emerald-600/20 text-emerald-300 border border-emerald-500/30'
                      : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  {evt.completed ? 'Completed' : 'Mark Done'}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // 6. ADMIN DASHBOARD (Module 17 / Part 5.13)
  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="p-6 md:p-8 rounded-2xl bg-gradient-to-r from-[#0c1224] via-[#10182b] to-[#080B18] border border-indigo-500/20 shadow-xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs font-semibold mb-2">
          <Shield className="w-3.5 h-3.5" />
          PART 5.13 • PLATFORM ADMIN DASHBOARD & SECURITY AUDIT
        </div>
        <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
          Role-Based Access Control & Firestore Security Enforcement
        </h2>
        <p className="text-sm text-slate-400 mt-1">
          Active Firestore rules restrict user documents to authenticated UIDs with administrative access for authorized personnel.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-center">
          <span className="text-xs text-slate-400">Security Rules Status</span>
          <div className="text-lg font-bold text-emerald-400 mt-1 flex items-center justify-center gap-1.5">
            <CheckCircle2 className="w-4 h-4" /> Enforcing
          </div>
          <span className="text-[10px] text-slate-500 font-mono">rules_version = '2'</span>
        </div>
        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-center">
          <span className="text-xs text-slate-400">Authorized Admin</span>
          <div className="text-sm font-bold text-white mt-1 truncate" title="bansalshubham182@gmail.com">
            bansalshubham182@gmail.com
          </div>
          <span className="text-[10px] text-cyan-400 font-mono">Full RBAC Authority</span>
        </div>
        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-center">
          <span className="text-xs text-slate-400">UID Access Gate</span>
          <div className="text-lg font-bold text-cyan-400 mt-1">isOwner(userId)</div>
          <span className="text-[10px] text-slate-500 font-mono">No cross-tenant leaks</span>
        </div>
        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-center">
          <span className="text-xs text-slate-400">Firebase Project</span>
          <div className="text-xs font-mono text-indigo-300 mt-2 truncate">gen-lang-client-0444726115</div>
          <span className="text-[10px] text-emerald-400 font-mono">Database Online</span>
        </div>
      </div>

      {/* Security Policies Breakdown */}
      <div className="p-6 rounded-2xl bg-[#0c1224] border border-indigo-500/20 shadow-xl space-y-4">
        <h3 className="text-base font-bold text-white flex items-center gap-2">
          <Shield className="w-4 h-4 text-rose-400" />
          Enforced Access Control Matrix
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800 space-y-2">
            <div className="font-bold text-cyan-300 flex items-center justify-between">
              <span>User Data Isolation (/users/{'{userId}'}/*)</span>
              <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">STRICT UID</span>
            </div>
            <p className="text-slate-400 leading-relaxed">
              Resumes, applications, assessments, interview transcripts, and calendars require <code className="text-slate-200">request.auth.uid == userId</code>. Unauthenticated requests or mismatched UIDs are rejected at the database level.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800 space-y-2">
            <div className="font-bold text-amber-300 flex items-center justify-between">
              <span>Admin Personnel Governance (/opportunities, /challenges)</span>
              <span className="text-[10px] font-mono text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">ADMIN ONLY</span>
            </div>
            <p className="text-slate-400 leading-relaxed">
              Only verified administrators (matching <code className="text-slate-200">isAdmin()</code> via custom claims or bootstrapped master identity) can create, update, or remove curated opportunities and coding challenges.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
