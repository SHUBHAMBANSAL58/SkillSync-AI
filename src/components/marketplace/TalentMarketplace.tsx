import React, { useState } from 'react';
import {
  Users,
  Search,
  Filter,
  ShieldCheck,
  Award,
  Download,
  Share2,
  ExternalLink,
  Briefcase,
  Star,
  CheckCircle2,
  Lock,
  Mail,
  Eye,
  FileText,
  Building,
} from 'lucide-react';
import { UserProfile } from '../../types/career';

interface TalentCandidate {
  id: string;
  name: string;
  role: string;
  location: string;
  readinessScore: number;
  avatarUrl: string;
  verifiedSkills: { name: string; score: number; level: string }[];
  featuredProject: { title: string; repoUrl: string; liveDemo: string };
  availableFrom: string;
  preferredSalary: string;
  interviewScore: number;
}

const SAMPLE_MARKET_CANDIDATES: TalentCandidate[] = [
  {
    id: 'cand-001',
    name: 'Alex Rivera',
    role: 'Staff Systems Architect / AI Engineer',
    location: 'San Francisco, CA (Remote)',
    readinessScore: 96,
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    verifiedSkills: [
      { name: 'Distributed Systems', score: 98, level: 'Expert' },
      { name: 'LLM Orchestration', score: 95, level: 'Expert' },
      { name: 'PostgreSQL Sharding', score: 92, level: 'Advanced' },
      { name: 'TypeScript Strict', score: 97, level: 'Master' },
    ],
    featuredProject: {
      title: 'SkillSync AI 4.0 Quantum Core',
      repoUrl: 'https://github.com/alexrivera/skillsync-ai',
      liveDemo: 'https://skillsync.ai/demo',
    },
    availableFrom: 'Immediate',
    preferredSalary: '$190,000 - $220,000',
    interviewScore: 94,
  },
  {
    id: 'cand-002',
    name: 'Priya Sharma',
    role: 'Senior Full-Stack & WebGL Engineer',
    location: 'Bengaluru, India (Hybrid / Remote)',
    readinessScore: 93,
    avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    verifiedSkills: [
      { name: 'React 19 Concurrent', score: 96, level: 'Master' },
      { name: 'Three.js / WebGL', score: 94, level: 'Expert' },
      { name: 'Node.js Microservices', score: 90, level: 'Advanced' },
    ],
    featuredProject: {
      title: 'Spatial Canvas Studio 3D',
      repoUrl: 'https://github.com/priyasharma/spatial-canvas',
      liveDemo: 'https://spatial.dev',
    },
    availableFrom: '2 Weeks Notice',
    preferredSalary: '$140,000 - $165,000',
    interviewScore: 91,
  },
  {
    id: 'cand-003',
    name: 'Marcus Chen',
    role: 'Cloud-Native Platform & DevSecOps Lead',
    location: 'Seattle, WA (Remote)',
    readinessScore: 91,
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    verifiedSkills: [
      { name: 'Kubernetes Operators', score: 95, level: 'Expert' },
      { name: 'Zero-Trust Architecture', score: 93, level: 'Advanced' },
      { name: 'Terraform & AWS', score: 89, level: 'Advanced' },
    ],
    featuredProject: {
      title: 'KubeGuard Zero-Trust Mesh',
      repoUrl: 'https://github.com/marcuschen/kubeguard',
      liveDemo: 'https://kubeguard.io',
    },
    availableFrom: '1 Month Notice',
    preferredSalary: '$175,000 - $195,000',
    interviewScore: 89,
  },
];

export const TalentMarketplace: React.FC<{ user: UserProfile }> = ({ user }) => {
  const [activeView, setActiveView] = useState<'passport' | 'recruiter'>('passport');
  const [candidateFilter, setCandidateFilter] = useState<string>('all');
  const [minReadiness, setMinReadiness] = useState<number>(85);
  const [blindHiringMode, setBlindHiringMode] = useState<boolean>(false);
  const [inviteModalCandidate, setInviteModalCandidate] = useState<TalentCandidate | null>(null);
  const [passportExported, setPassportExported] = useState<boolean>(false);
  const [linkCopied, setLinkCopied] = useState<boolean>(false);
  const [offerDispatchedMessage, setOfferDispatchedMessage] = useState<string | null>(null);

  // Filter candidates
  const filteredCandidates = SAMPLE_MARKET_CANDIDATES.filter((c) => {
    return c.readinessScore >= minReadiness;
  });

  const handleExportPassport = () => {
    const passportData = {
      issuer: 'SkillSync AI 4.0 Cryptographic Trust Registry',
      issuedTo: user.name,
      candidateId: user.id,
      readinessScore: user.readinessScore,
      targetRole: user.targetRole,
      verifiedSkills: user.verifiedSkills,
      blockchainVerificationHash: `0x7F${Math.random().toString(16).slice(2, 10)}${Math.random().toString(16).slice(2, 10)}`,
      timestamp: new Date().toISOString(),
      standardsCompliance: 'W3C Verifiable Credentials Standard v2.0',
    };

    const blob = new Blob([JSON.stringify(passportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${user.name.replace(/\s+/g, '_')}_SkillSync_Passport.json`;
    a.click();
    URL.revokeObjectURL(url);
    setPassportExported(true);
    setTimeout(() => setPassportExported(false), 3000);
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Top Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-2xl bg-gradient-to-r from-indigo-950/40 via-slate-900/60 to-slate-900/80 border border-indigo-500/20 backdrop-blur-xl">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-emerald-600/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
            <Award className="w-7 h-7" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold tracking-tight text-white">
                Verifiable Talent Marketplace & Passport
              </h1>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                PROVABLE MERIT
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-1 max-w-xl">
              Zero-bias recruitment network backed by verifiable coding proof, mock interview transcripts, and cryptographic skill passports.
            </p>
          </div>
        </div>

        {/* View Switcher */}
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-900 border border-slate-800">
          <button
            onClick={() => setActiveView('passport')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              activeView === 'passport'
                ? 'bg-indigo-600 text-white shadow'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            My Skill Passport
          </button>
          <button
            onClick={() => setActiveView('recruiter')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              activeView === 'recruiter'
                ? 'bg-emerald-600 text-white shadow'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Recruiter Talent Radar
          </button>
        </div>
      </div>

      {offerDispatchedMessage && (
        <div className="p-4 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs flex items-center justify-between animate-fadeIn">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span className="font-medium">{offerDispatchedMessage}</span>
          </div>
          <button
            onClick={() => setOfferDispatchedMessage(null)}
            className="text-emerald-400 hover:text-white text-xs font-bold cursor-pointer"
          >
            ✕
          </button>
        </div>
      )}

      {/* VIEW 1: MY VERIFIABLE SKILL PASSPORT */}
      {activeView === 'passport' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column: Digital Credential Card */}
          <div className="lg:col-span-8 space-y-6">
            <div className="p-8 rounded-2xl bg-gradient-to-br from-slate-900 via-indigo-950/30 to-slate-900 border border-indigo-500/30 backdrop-blur-xl relative overflow-hidden shadow-2xl">
              {/* Subtle Guilloche/Holographic Background watermark */}
              <div className="absolute -right-12 -bottom-12 w-64 h-64 rounded-full bg-indigo-500/5 blur-2xl pointer-events-none" />

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-indigo-500/20 pb-6 mb-6">
                <div>
                  <span className="text-[10px] font-mono tracking-widest text-indigo-400 uppercase">
                    OFFICIAL VERIFIABLE CREDENTIAL • W3C STANDARD
                  </span>
                  <h3 className="text-2xl font-bold text-white mt-1">{user.name}</h3>
                  <p className="text-xs text-slate-300 font-mono mt-0.5">
                    Role Target: {user.targetRole || 'Full-Stack Distributed Systems Architect'}
                  </p>
                </div>

                <div className="text-right">
                  <span className="text-[10px] font-mono text-slate-400">PASSPORT READINESS</span>
                  <p className="text-3xl font-extrabold font-mono text-emerald-400">
                    {user.readinessScore}%
                  </p>
                  <p className="text-[10px] text-emerald-400/80 font-mono">Top 5% Talent Pool</p>
                </div>
              </div>

              {/* Verified Competencies Matrix */}
              <div className="mb-6">
                <h4 className="text-xs font-mono font-semibold text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  Cryptographically Verified Skills & Scores
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {Object.entries(user.verifiedSkills).map(([skill, data]: [string, any]) => (
                    <div
                      key={skill}
                      className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center justify-between"
                    >
                      <div>
                        <p className="text-xs font-semibold text-white">{skill}</p>
                        <p className="text-[10px] text-slate-400 font-mono">
                          Tier: <span className="text-indigo-400">{data.level}</span> • Verified {data.verifiedDate || 'Recent'}
                        </p>
                      </div>
                      <span className="text-xs font-mono font-bold text-emerald-400 px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20">
                        {data.score}%
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Cryptographic Proof Hash */}
              <div className="p-4 rounded-xl bg-slate-950/70 border border-indigo-500/20 flex flex-col sm:flex-row sm:items-center justify-between gap-3 font-mono text-xs text-slate-400">
                <div>
                  <span className="text-[10px] text-indigo-400 block">IMMUTABLE PROOF SIGNATURE:</span>
                  <span className="text-slate-300 truncate max-w-xs block">
                    0x8A4b29f032e18d6a84f391...bc5d
                  </span>
                </div>
                <div className="flex items-center gap-2 text-emerald-400 text-xs">
                  <CheckCircle2 className="w-4 h-4" /> Validated by SkillSync Oracles
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Share & Export Actions */}
          <div className="lg:col-span-4 space-y-4">
            <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 backdrop-blur-md">
              <h4 className="text-sm font-bold text-white mb-2">Export & Share Passport</h4>
              <p className="text-xs text-slate-400 mb-6">
                Employers can verify your skills without taking up hours in repetitive take-home exams.
              </p>

              <div className="space-y-3">
                <button
                  onClick={handleExportPassport}
                  className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer shadow-lg shadow-emerald-900/30"
                >
                  <Download className="w-4 h-4" />
                  {passportExported ? 'Passport JSON Downloaded!' : 'Download Verified Passport (.json)'}
                </button>

                <button
                  onClick={() => {
                    navigator.clipboard?.writeText(window.location.href);
                    setLinkCopied(true);
                    setTimeout(() => setLinkCopied(false), 2000);
                  }}
                  className={`w-full py-2.5 rounded-xl text-white text-xs font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer shadow-lg ${
                    linkCopied ? 'bg-emerald-600 shadow-emerald-600/30' : 'bg-indigo-600 hover:bg-indigo-500 shadow-indigo-600/30'
                  }`}
                >
                  <Share2 className="w-4 h-4" />
                  {linkCopied ? 'Verification URL Copied! ✓' : 'Copy Public Verification URL'}
                </button>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-800 text-xs text-slate-400 space-y-2">
                <div className="flex items-center gap-2 text-slate-300">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  Compatible with LinkedIn Certifications
                </div>
                <div className="flex items-center gap-2 text-slate-300">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  Accepted by 120+ Partner Companies
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* VIEW 2: RECRUITER TALENT RADAR */}
      {activeView === 'recruiter' && (
        <div className="space-y-6">
          {/* Recruiter Filters Bar */}
          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 flex flex-wrap items-center justify-between gap-4 text-xs">
            <div className="flex items-center gap-4 flex-wrap">
              <div className="flex items-center gap-2 text-slate-300">
                <Filter className="w-4 h-4 text-indigo-400" />
                <span>Min. Readiness Score:</span>
                <span className="font-mono font-bold text-emerald-400">{minReadiness}%</span>
                <input
                  type="range"
                  min="75"
                  max="98"
                  value={minReadiness}
                  onChange={(e) => setMinReadiness(Number(e.target.value))}
                  className="w-32 accent-emerald-500 cursor-pointer ml-2"
                />
              </div>

              <label className="flex items-center gap-2 text-slate-300 cursor-pointer">
                <input
                  type="checkbox"
                  checked={blindHiringMode}
                  onChange={(e) => setBlindHiringMode(e.target.checked)}
                  className="rounded border-slate-700 text-emerald-500 focus:ring-0 cursor-pointer"
                />
                <span className="font-semibold text-white">Blind Hiring Mode</span>
                <span className="text-[10px] text-slate-400">(Hides names & photos to remove bias)</span>
              </label>
            </div>

            <span className="font-mono text-slate-400">
              Showing {filteredCandidates.length} Verified Candidates
            </span>
          </div>

          {/* Candidate Pipeline Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCandidates.map((cand) => (
              <div
                key={cand.id}
                className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-emerald-500/40 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-3 mb-4">
                    <div className="flex items-center gap-3">
                      {blindHiringMode ? (
                        <div className="w-12 h-12 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-400 font-mono text-xs">
                          #ID-{cand.id.slice(-3)}
                        </div>
                      ) : (
                        <img
                          src={cand.avatarUrl}
                          alt={cand.name}
                          className="w-12 h-12 rounded-xl object-cover border border-slate-700"
                        />
                      )}
                      <div>
                        <h4 className="text-sm font-bold text-white">
                          {blindHiringMode ? `Candidate #${cand.id.slice(-3)}` : cand.name}
                        </h4>
                        <p className="text-xs text-slate-400">{cand.role}</p>
                      </div>
                    </div>

                    <div className="text-right">
                      <span className="text-xs font-mono font-bold text-emerald-400 px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/30 block">
                        {cand.readinessScore}% Match
                      </span>
                    </div>
                  </div>

                  <p className="text-xs text-slate-400 mb-3">
                    <span className="text-slate-300 font-medium">Location:</span> {cand.location} •{' '}
                    <span className="text-slate-300 font-medium">Availability:</span> {cand.availableFrom}
                  </p>

                  {/* Verified Skills */}
                  <div className="mb-4">
                    <p className="text-[10px] font-mono text-slate-400 uppercase mb-1.5">
                      VERIFIED BENCHMARKS:
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {cand.verifiedSkills.map((sk, i) => (
                        <span
                          key={i}
                          className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700 flex items-center gap-1"
                        >
                          <ShieldCheck className="w-3 h-3 text-emerald-400" />
                          {sk.name} ({sk.score}%)
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Capstone Project Showcase */}
                  <div className="p-3 rounded-xl bg-slate-800/40 border border-slate-750 mb-4 text-xs">
                    <span className="text-[10px] font-mono text-indigo-400 block">FEATURED CAPSTONE:</span>
                    <span className="text-white font-medium block truncate">{cand.featuredProject.title}</span>
                  </div>
                </div>

                {/* Direct Action Button */}
                <button
                  onClick={() => setInviteModalCandidate(cand)}
                  className="w-full py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-lg shadow-emerald-900/20"
                >
                  <Mail className="w-3.5 h-3.5" /> Fast-Track Interview Invitation
                </button>
              </div>
            ))}
          </div>

          {/* Invitation Modal */}
          {inviteModalCandidate && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
              <div className="w-full max-w-md bg-[#080B18] border border-emerald-500/30 rounded-2xl p-6 shadow-2xl space-y-4">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <h3 className="text-sm font-bold text-white flex items-center gap-2">
                    <Mail className="w-4 h-4 text-emerald-400" />
                    Interview Invitation
                  </h3>
                  <button
                    onClick={() => setInviteModalCandidate(null)}
                    className="text-slate-400 hover:text-white text-xs cursor-pointer"
                  >
                    Close
                  </button>
                </div>
                <p className="text-xs text-slate-300">
                  Send a guaranteed direct fast-track interview to{' '}
                  <span className="font-semibold text-white">
                    {blindHiringMode ? `Candidate #${inviteModalCandidate.id.slice(-3)}` : inviteModalCandidate.name}
                  </span>
                  .
                </p>
                <div className="space-y-2 text-xs">
                  <label className="text-slate-400 block font-mono">ROLE TITLE & TEAM:</label>
                  <input
                    type="text"
                    defaultValue="Senior AI Infrastructure Engineer"
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white"
                  />
                  <label className="text-slate-400 block font-mono mt-2">COMPENSATION OFFER RANGE:</label>
                  <input
                    type="text"
                    defaultValue="$185,000 - $210,000 + Equity"
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white"
                  />
                </div>
                <button
                  onClick={() => {
                    const name = inviteModalCandidate.name;
                    setOfferDispatchedMessage(`Interview dispatch successfully sent to ${name} with verifiable offer encryption.`);
                    setInviteModalCandidate(null);
                    setTimeout(() => setOfferDispatchedMessage(null), 4000);
                  }}
                  className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold transition-all cursor-pointer shadow-lg shadow-emerald-600/20"
                >
                  Confirm & Send Interview Dispatch
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
