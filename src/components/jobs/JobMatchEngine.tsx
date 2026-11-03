import React, { useState } from 'react';
import {
  Briefcase,
  CheckCircle2,
  AlertCircle,
  XCircle,
  Filter,
  Search,
  Plus,
  ExternalLink,
  Kanban,
  Clock,
  ShieldCheck,
  ChevronRight,
  TrendingUp,
} from 'lucide-react';
import { JobOpportunity, JobApplication, UserProfile } from '../../types/career';
import { checkPlacementEligibility, EligibilityResult } from '../../utils/eligibilityChecker';
import { JobMatchSkeleton } from './JobMatchSkeleton';

interface JobMatchEngineProps {
  user: UserProfile;
  opportunities: JobOpportunity[];
  applications: JobApplication[];
  onUpdateApplications: (apps: JobApplication[]) => void;
  isLoading?: boolean;
}

export const JobMatchEngine: React.FC<JobMatchEngineProps> = ({
  user,
  opportunities,
  applications,
  onUpdateApplications,
  isLoading = false,
}) => {
  if (isLoading) {
    return <JobMatchSkeleton />;
  }

  const [activeTab, setActiveTab] = useState<'radar' | 'tracker' | 'eligibility'>('radar');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedOpp, setSelectedOpp] = useState<JobOpportunity | null>(opportunities[0] || null);
  const [filterCategory, setFilterCategory] = useState<string>('All');

  // Eligibility check state
  const [selectedEligibilityOpp, setSelectedEligibilityOpp] = useState<JobOpportunity>(opportunities[0]);

  // Compute eligibility using pure tested engine
  const eligibilityResult: EligibilityResult = checkPlacementEligibility(
    {
      cgpa: user.cgpa,
      graduationYear: user.graduationYear,
      degree: user.degree,
      activeBacklogs: user.activeBacklogs,
      skills: Object.keys(user.verifiedSkills).concat(user.selfDeclaredSkills),
    },
    {
      companyName: selectedEligibilityOpp.company,
      roleTitle: selectedEligibilityOpp.role,
      minCgpa: selectedEligibilityOpp.minCgpa,
      eligibleGradYears: selectedEligibilityOpp.eligibleGradYears,
      allowedDegrees: selectedEligibilityOpp.allowedDegrees,
      maxBacklogsAllowed: selectedEligibilityOpp.maxBacklogs,
      mandatorySkills: selectedEligibilityOpp.requiredSkills,
    }
  );

  const filteredOpportunities = opportunities.filter((opp) => {
    const matchesSearch =
      opp.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      opp.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
      opp.requiredSkills.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = filterCategory === 'All' || opp.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const handleApply = (opp: JobOpportunity) => {
    const isAlreadyApplied = applications.some(
      (a) => a.opportunityId === opp.id || (a.company === opp.company && a.role === opp.role)
    );
    if (isAlreadyApplied) return;

    const newApp: JobApplication = {
      id: `app-${Date.now()}`,
      opportunityId: opp.id,
      company: opp.company,
      role: opp.role,
      location: opp.location,
      salary: opp.stipendOrSalary,
      appliedDate: new Date().toISOString().split('T')[0],
      status: 'Applied',
      notes: `Applied through SkillSync Opportunity Radar. Compatibility: ${opp.matchScore}%.`,
      atsScore: opp.matchScore,
    };
    onUpdateApplications([...applications, newApp]);
    setActiveTab('tracker');
  };

  const handleStatusChange = (appId: string, newStatus: JobApplication['status']) => {
    const updated = applications.map((a) => (a.id === appId ? { ...a, status: newStatus } : a));
    onUpdateApplications(updated);
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Top Banner and Tabs */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-2xl bg-gradient-to-r from-[#0c1224] via-[#10182b] to-[#080B18] border border-indigo-500/20 shadow-xl">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-xs font-semibold mb-2">
            <Briefcase className="w-3.5 h-3.5 text-cyan-400" />
            PART 4 & 5.2 • OPPORTUNITY RADAR & PLACEMENT CHECKER
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
            Job Match, Eligibility & Internship Tracker
          </h2>
          <p className="text-sm text-slate-400 mt-1">
            Real-time hiring radar, multi-stage application pipeline, and academic cutoff auditing.
          </p>
        </div>

        {/* Tab Controls */}
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-900 border border-slate-800 self-start md:self-auto">
          <button
            onClick={() => setActiveTab('radar')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              activeTab === 'radar'
                ? 'bg-indigo-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Opportunity Radar
          </button>
          <button
            onClick={() => setActiveTab('tracker')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              activeTab === 'tracker'
                ? 'bg-indigo-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Application Board ({applications.length})
          </button>
          <button
            onClick={() => setActiveTab('eligibility')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              activeTab === 'eligibility'
                ? 'bg-indigo-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Placement Checker
          </button>
        </div>
      </div>

      {/* TAB 1: OPPORTUNITY RADAR */}
      {activeTab === 'radar' && (
        <div className="space-y-6">
          {/* Search and Filters */}
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <div className="relative flex-1 w-full">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by company, role, or technical skill (e.g. React, Docker, Stripe)..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-indigo-500 transition-all"
              />
            </div>
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300 focus:outline-none cursor-pointer w-full sm:w-auto"
            >
              <option value="All">All Categories</option>
              <option value="Software Engineering">Software Engineering</option>
              <option value="AI / Machine Learning">AI / Machine Learning</option>
              <option value="DevOps & Cloud">DevOps & Cloud</option>
            </select>
          </div>

          {/* List of Opportunities */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredOpportunities.map((opp) => (
              <div
                key={opp.id}
                className="p-5 rounded-2xl bg-[#0c1224] border border-indigo-500/20 hover:border-indigo-500/50 shadow-xl flex flex-col justify-between transition-all group"
              >
                <div>
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">
                        {opp.category}
                      </span>
                      <h4 className="text-base font-bold text-white mt-1.5 group-hover:text-cyan-300 transition-colors">
                        {opp.company}
                      </h4>
                      <div className="text-xs text-slate-300 font-medium">{opp.role}</div>
                    </div>
                    <div className="text-right shrink-0">
                      <span className="text-xs text-slate-400 block">Match</span>
                      <span className="text-lg font-extrabold text-cyan-300">{opp.matchScore}%</span>
                    </div>
                  </div>

                  <p className="text-xs text-slate-400 line-clamp-3 mb-4 leading-relaxed">
                    {opp.description}
                  </p>

                  <div className="space-y-1.5 text-xs text-slate-300 mb-4 pt-3 border-t border-slate-800/80">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400">Compensation:</span>
                      <span className="text-emerald-400 font-semibold">{opp.stipendOrSalary}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400">Location:</span>
                      <span>{opp.location}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400">Deadline:</span>
                      <span className="text-amber-300 font-mono">{opp.deadline}</span>
                    </div>
                  </div>

                  {/* Skills tags */}
                  <div className="flex flex-wrap gap-1 mb-4">
                    {opp.requiredSkills.map((s) => (
                      <span key={s} className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-[10px] text-slate-400 font-mono">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-2">
                  <button
                    onClick={() => {
                      setSelectedEligibilityOpp(opp);
                      setActiveTab('eligibility');
                    }}
                    className="flex-1 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 text-xs font-semibold cursor-pointer transition-all text-center"
                  >
                    Audit Cutoff
                  </button>
                  {(() => {
                    const isApplied = applications.some(
                      (a) => a.opportunityId === opp.id || (a.company === opp.company && a.role === opp.role)
                    );
                    return (
                      <button
                        onClick={() => !isApplied && handleApply(opp)}
                        disabled={isApplied}
                        className={`flex-1 py-2 rounded-xl text-xs font-semibold transition-all text-center ${
                          isApplied
                            ? 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 cursor-default'
                            : 'bg-indigo-600 hover:bg-indigo-500 text-white cursor-pointer shadow-md'
                        }`}
                      >
                        {isApplied ? 'Applied ✓' : 'Apply Now'}
                      </button>
                    );
                  })()}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 2: ADVANCED KANBAN TRACKER */}
      {activeTab === 'tracker' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Kanban className="w-5 h-5 text-indigo-400" />
              Internship & Career Pipeline Board
            </h3>
            <span className="text-xs text-slate-400">Drag or switch status to update funnel</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4 overflow-x-auto pb-4">
            {(['Wishlist', 'Applied', 'Screening', 'Interviewing', 'Offer', 'Rejected'] as const).map(
              (columnStatus) => {
                const columnApps = applications.filter((a) => a.status === columnStatus);
                return (
                  <div
                    key={columnStatus}
                    className="p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800 flex flex-col min-w-[200px]"
                  >
                    <div className="flex items-center justify-between pb-2 mb-3 border-b border-slate-800">
                      <span className="text-xs font-bold text-slate-200">{columnStatus}</span>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-900 border border-slate-700 font-mono text-slate-400">
                        {columnApps.length}
                      </span>
                    </div>

                    <div className="space-y-3 flex-1">
                      {columnApps.map((app) => (
                        <div
                          key={app.id}
                          className="p-3 rounded-xl bg-slate-900/90 border border-slate-800/80 hover:border-indigo-500/40 transition-all space-y-2"
                        >
                          <div>
                            <div className="text-xs font-bold text-white">{app.company}</div>
                            <div className="text-[11px] text-slate-400 line-clamp-1">{app.role}</div>
                          </div>
                          <div className="text-[10px] text-emerald-400 font-semibold">{app.salary}</div>
                          {app.interviewDate && (
                            <div className="text-[10px] text-rose-300 bg-rose-500/10 px-2 py-0.5 rounded border border-rose-500/20 font-mono">
                              Interview: {app.interviewDate}
                            </div>
                          )}
                          <p className="text-[10px] text-slate-400 italic line-clamp-2">"{app.notes}"</p>

                          {/* Quick Stage Transition */}
                          <div className="pt-2 border-t border-slate-800 flex items-center justify-between">
                            <select
                              value={app.status}
                              onChange={(e) => handleStatusChange(app.id, e.target.value as any)}
                              className="bg-slate-950 text-[10px] text-indigo-300 font-medium rounded px-1.5 py-0.5 border border-slate-800 focus:outline-none cursor-pointer"
                            >
                              <option value="Wishlist">Wishlist</option>
                              <option value="Applied">Applied</option>
                              <option value="Screening">Screening</option>
                              <option value="Interviewing">Interviewing</option>
                              <option value="Offer">Offer</option>
                              <option value="Rejected">Rejected</option>
                            </select>
                            <span className="text-[10px] text-slate-500">{app.appliedDate}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              }
            )}
          </div>
        </div>
      )}

      {/* TAB 3: PLACEMENT ELIGIBILITY CHECKER */}
      {activeTab === 'eligibility' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-4 p-6 rounded-2xl bg-[#0c1224] border border-indigo-500/20 shadow-xl space-y-4">
            <h3 className="text-base font-bold text-white">Select Drive / Opportunity</h3>
            <div className="space-y-2">
              {opportunities.map((opp) => (
                <button
                  key={opp.id}
                  onClick={() => setSelectedEligibilityOpp(opp)}
                  className={`w-full p-3 rounded-xl border text-left transition-all cursor-pointer ${
                    selectedEligibilityOpp.id === opp.id
                      ? 'bg-indigo-600/20 border-indigo-500 text-white'
                      : 'bg-slate-900/60 border-slate-800 text-slate-300 hover:border-slate-700'
                  }`}
                >
                  <div className="text-xs font-bold">{opp.company}</div>
                  <div className="text-[11px] text-slate-400">{opp.role}</div>
                  <div className="text-[10px] text-cyan-400 mt-1">Min CGPA: {opp.minCgpa} • Batch: {opp.eligibleGradYears.join(', ')}</div>
                </button>
              ))}
            </div>
          </div>

          <div className="lg:col-span-8 p-6 md:p-8 rounded-2xl bg-[#0c1224] border border-indigo-500/20 shadow-xl space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
              <div>
                <h3 className="text-xl font-bold text-white">
                  Placement Eligibility Audit — {selectedEligibilityOpp.company}
                </h3>
                <div className="text-xs text-slate-400 mt-0.5">
                  Candidate: <span className="text-indigo-300 font-semibold">{user.name}</span> (CGPA {user.cgpa}, Class of {user.graduationYear}, {user.degree})
                </div>
              </div>
              <div
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold border flex items-center gap-1.5 self-start sm:self-auto ${
                  eligibilityResult.status === 'ELIGIBLE'
                    ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                    : eligibilityResult.status === 'CONDITIONAL_WARNING'
                    ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                    : 'bg-rose-500/20 text-rose-300 border-rose-500/40'
                }`}
              >
                {eligibilityResult.status === 'ELIGIBLE' && <CheckCircle2 className="w-4 h-4" />}
                {eligibilityResult.status === 'CONDITIONAL_WARNING' && <AlertCircle className="w-4 h-4" />}
                {eligibilityResult.status === 'NOT_ELIGIBLE' && <XCircle className="w-4 h-4" />}
                {eligibilityResult.status.replace('_', ' ')}
              </div>
            </div>

            <p className="text-xs text-slate-300 p-3 rounded-xl bg-slate-900 border border-slate-800 leading-relaxed font-medium">
              {eligibilityResult.summary}
            </p>

            {/* Criteria Breakdown list */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Detailed Criteria Verification Breakdown
              </h4>
              {eligibilityResult.criteriaChecks.map((check, idx) => (
                <div
                  key={idx}
                  className={`p-3.5 rounded-xl border flex items-start gap-3 transition-all ${
                    check.passed
                      ? 'bg-slate-900/60 border-slate-800 text-slate-200'
                      : check.type === 'CRITICAL'
                      ? 'bg-rose-950/20 border-rose-500/40 text-rose-200'
                      : 'bg-amber-950/20 border-amber-500/40 text-amber-200'
                  }`}
                >
                  {check.passed ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  ) : check.type === 'CRITICAL' ? (
                    <XCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                  ) : (
                    <AlertCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  )}
                  <div className="space-y-0.5">
                    <div className="text-xs font-bold flex items-center gap-2">
                      {check.name}
                      <span className="text-[10px] font-mono text-slate-500">[{check.type}]</span>
                    </div>
                    <div className="text-xs text-slate-300 leading-relaxed">{check.reason}</div>
                  </div>
                </div>
              ))}
            </div>

            <p className="text-[11px] text-slate-500 italic">
              Transparency Disclosure: Eligibility calculations compare exact academic credentials (CGPA, degree accreditation, backlogs) and verified skill badges against employer recruitment specifications.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
