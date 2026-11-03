import React from 'react';
import {
  Sparkles,
  Flame,
  Award,
  Target,
  Briefcase,
  ChevronRight,
  TrendingUp,
  Clock,
  ArrowUpRight,
  ShieldCheck,
  Calendar,
  Layers,
  Compass,
} from 'lucide-react';
import { UserProfile, JobOpportunity, CalendarEvent, AppNotification } from '../../types/career';
import { SkillGalaxyCanvas } from '../3d/SkillGalaxyCanvas';
import { DashboardSkeleton } from './DashboardSkeleton';

interface SmartDashboardProps {
  user: UserProfile;
  opportunities: JobOpportunity[];
  calendarEvents: CalendarEvent[];
  notifications: AppNotification[];
  onNavigate: (tabId: string) => void;
  isLoading?: boolean;
}

export const SmartDashboard: React.FC<SmartDashboardProps> = ({
  user,
  opportunities,
  calendarEvents,
  onNavigate,
  isLoading = false,
}) => {
  if (isLoading) {
    return <DashboardSkeleton />;
  }

  // Calculate completion percentage for weekly goal
  const weeklyPercent = Math.min(100, Math.round((user.completedHoursThisWeek / user.weeklyGoalHours) * 100));

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Hero Welcome Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-indigo-950 via-[#10182b] to-[#080B18] border border-indigo-500/20 p-6 md:p-8 shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              SKILLSYNC AI 4.0 • CAREER INTELLIGENCE SYSTEM
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
              Welcome back, <span className="bg-gradient-to-r from-indigo-300 via-cyan-300 to-white bg-clip-text text-transparent">{user.name}</span>
            </h1>
            <p className="text-sm text-slate-300 leading-relaxed">
              Target Trajectory: <span className="text-cyan-300 font-semibold">{user.targetRole}</span>. Your career readiness index is in the <span className="text-emerald-400 font-semibold">top 8%</span> of 2025 engineering graduates.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => onNavigate('resume-lab')}
                className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold flex items-center gap-1.5 shadow-lg shadow-indigo-500/20 transition-all cursor-pointer"
              >
                Optimize ATS Resume
                <ArrowUpRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => onNavigate('job-match')}
                className="px-4 py-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 border border-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer"
              >
                Inspect Top Job Matches
              </button>
              <button
                onClick={() => onNavigate('agent-centre')}
                className="px-4 py-2.5 rounded-xl bg-cyan-950/60 hover:bg-cyan-900/60 border border-cyan-500/30 text-cyan-300 text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer"
              >
                Launch 10-Agent Command
              </button>
            </div>
          </div>

          {/* Quick Metrics Cards */}
          <div className="grid grid-cols-2 gap-3 sm:gap-4 shrink-0">
            <div className="p-4 rounded-2xl bg-slate-900/80 border border-indigo-500/30 backdrop-blur-md flex flex-col justify-between">
              <div className="flex items-center justify-between text-slate-400 text-xs">
                <span>Readiness Score</span>
                <TrendingUp className="w-4 h-4 text-emerald-400" />
              </div>
              <div className="mt-2 flex items-baseline gap-1">
                <span className="text-3xl font-extrabold text-white">{user.readinessScore}</span>
                <span className="text-xs text-slate-400">/ 100</span>
              </div>
              <div className="w-full h-1.5 bg-slate-800 rounded-full mt-2 overflow-hidden">
                <div className="h-full bg-emerald-400 rounded-full" style={{ width: `${user.readinessScore}%` }} />
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900/80 border border-amber-500/30 backdrop-blur-md flex flex-col justify-between">
              <div className="flex items-center justify-between text-slate-400 text-xs">
                <span>Learning Streak</span>
                <Flame className="w-4 h-4 text-amber-400" />
              </div>
              <div className="mt-2 flex items-baseline gap-1">
                <span className="text-3xl font-extrabold text-white">{user.streakDays}</span>
                <span className="text-xs text-amber-300">Days</span>
              </div>
              <div className="text-[11px] text-slate-400 mt-2">Active velocity drill</div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900/80 border border-cyan-500/30 backdrop-blur-md flex flex-col justify-between">
              <div className="flex items-center justify-between text-slate-400 text-xs">
                <span>Verified Skills</span>
                <ShieldCheck className="w-4 h-4 text-cyan-400" />
              </div>
              <div className="mt-2 flex items-baseline gap-1">
                <span className="text-3xl font-extrabold text-white">{Object.keys(user.verifiedSkills).length}</span>
                <span className="text-xs text-slate-400">Pillars</span>
              </div>
              <div className="text-[11px] text-cyan-300 mt-2">0 unverified flags</div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900/80 border border-purple-500/30 backdrop-blur-md flex flex-col justify-between">
              <div className="flex items-center justify-between text-slate-400 text-xs">
                <span>Weekly Hours</span>
                <Clock className="w-4 h-4 text-purple-400" />
              </div>
              <div className="mt-2 flex items-baseline gap-1">
                <span className="text-3xl font-extrabold text-white">{user.completedHoursThisWeek}</span>
                <span className="text-xs text-slate-400">/ {user.weeklyGoalHours}h</span>
              </div>
              <div className="w-full h-1.5 bg-slate-800 rounded-full mt-2 overflow-hidden">
                <div className="h-full bg-purple-400 rounded-full" style={{ width: `${weeklyPercent}%` }} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3D Visualizer & Skill Intelligence Matrix */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <SkillGalaxyCanvas onSelectSkill={() => onNavigate('skill-verification')} />
        </div>

        {/* AI Career Diagnostic & Recommendations */}
        <div className="p-6 rounded-2xl bg-[#0c1224] border border-indigo-500/20 shadow-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Compass className="w-4 h-4 text-cyan-400" />
                AI Career Intelligence
              </h3>
              <span className="text-[10px] font-mono text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded">
                Gemini 3.8
              </span>
            </div>

            <div className="space-y-3">
              <div className="p-3 rounded-xl bg-slate-900/70 border border-slate-800/80">
                <div className="text-xs font-semibold text-cyan-300 mb-1">Target Trajectory Insight</div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Your TypeScript & React scores (94% & 91%) place you above the 90th percentile. Closing the System Design gap to 85%+ will qualify you for Stripe and Google tier screenings.
                </p>
              </div>

              <div className="p-3 rounded-xl bg-slate-900/70 border border-slate-800/80">
                <div className="text-xs font-semibold text-amber-300 mb-1">Recommended Action</div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Complete the "Distributed Systems & Database Scaling" quiz in the Verification Centre to earn your verified System Architect badge.
                </p>
              </div>

              <div className="p-3 rounded-xl bg-slate-900/70 border border-slate-800/80">
                <div className="text-xs font-semibold text-emerald-300 mb-1">Application Radar</div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Stripe Software Engineer Intern application matches 92% of your verified skills. Deadline in 19 days.
                </p>
              </div>
            </div>
          </div>

          <button
            onClick={() => onNavigate('skill-verification')}
            className="w-full mt-4 py-2.5 rounded-xl bg-indigo-600/30 hover:bg-indigo-600/50 border border-indigo-500/40 text-indigo-200 text-xs font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer"
          >
            Launch Skill Verification Drill
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* High-Match Opportunities & Upcoming Schedule */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Curated Opportunities Preview */}
        <div className="lg:col-span-2 p-6 rounded-2xl bg-[#0c1224] border border-indigo-500/20 shadow-xl">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Briefcase className="w-4 h-4 text-indigo-400" />
                High-Compatibility Opportunities
              </h3>
              <p className="text-xs text-slate-400">Vetted internships & graduate roles based on your verified skills.</p>
            </div>
            <button
              onClick={() => onNavigate('job-match')}
              className="text-xs text-cyan-400 hover:text-cyan-300 font-semibold flex items-center gap-1 cursor-pointer"
            >
              View All ({opportunities.length}) <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-3">
            {opportunities.slice(0, 3).map((opp) => (
              <div
                key={opp.id}
                className="p-4 rounded-xl bg-slate-900/60 border border-slate-800/80 hover:border-indigo-500/40 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-white">{opp.company}</span>
                    <span className="text-xs text-slate-400">• {opp.role}</span>
                  </div>
                  <div className="flex flex-wrap items-center gap-2 text-xs text-slate-400">
                    <span>{opp.location}</span>
                    <span>•</span>
                    <span className="text-emerald-400 font-semibold">{opp.stipendOrSalary}</span>
                    <span>•</span>
                    <span>Deadline: {opp.deadline}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <div className="text-right">
                    <div className="text-xs text-slate-400">Compatibility</div>
                    <div className="text-base font-bold text-cyan-300">{opp.matchScore}%</div>
                  </div>
                  <button
                    onClick={() => onNavigate('job-match')}
                    className="px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold cursor-pointer transition-all"
                  >
                    Check Match
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Career Calendar Deadlines */}
        <div className="p-6 rounded-2xl bg-[#0c1224] border border-indigo-500/20 shadow-xl">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Calendar className="w-4 h-4 text-purple-400" />
              Career Milestones & Deadlines
            </h3>
            <button
              onClick={() => onNavigate('career-calendar')}
              className="text-xs text-indigo-400 hover:text-indigo-300 font-semibold cursor-pointer"
            >
              Full Calendar
            </button>
          </div>

          <div className="space-y-3">
            {calendarEvents.slice(0, 4).map((evt) => (
              <div
                key={evt.id}
                className="p-3 rounded-xl bg-slate-900/60 border border-slate-800/80 text-xs space-y-1"
              >
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-slate-200">{evt.title}</span>
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
                <div className="text-[11px] text-slate-400">
                  {evt.date} {evt.time ? `• ${evt.time}` : ''}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
