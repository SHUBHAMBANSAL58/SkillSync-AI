import React, { useState } from 'react';
import {
  TrendingUp,
  DollarSign,
  Users,
  Briefcase,
  Activity,
  ArrowUpRight,
  ArrowDownRight,
  Target,
  Layers,
  Sparkles,
} from 'lucide-react';

export const StartupAnalytics: React.FC = () => {
  const [timeRange, setTimeRange] = useState<'30d' | '90d' | '1y'>('30d');

  const saasKpis = [
    {
      label: 'Monthly Recurring Revenue (MRR)',
      value: '$148,500',
      change: '+18.4%',
      positive: true,
      subtext: 'ARR: $1.78M Run-rate',
    },
    {
      label: 'Active Candidates (MAU)',
      value: '42,850',
      change: '+24.1%',
      positive: true,
      subtext: '12,400 Daily Active Users',
    },
    {
      label: 'Customer Lifetime Value (LTV)',
      value: '$2,450',
      change: '+8.2%',
      positive: true,
      subtext: 'LTV / CAC Ratio: 13.6x',
    },
    {
      label: 'Customer Acquisition Cost (CAC)',
      value: '$180',
      change: '-12.5%',
      positive: true,
      subtext: 'Payback Period: 1.2 months',
    },
    {
      label: 'Net Revenue Retention (NRR)',
      value: '124%',
      change: '+4.0%',
      positive: true,
      subtext: 'Gross Churn: 0.8% / mo',
    },
    {
      label: 'Placement Liquidity Match Rate',
      value: '76.8%',
      change: '+9.3%',
      positive: true,
      subtext: 'Median Time to Hire: 14 Days',
    },
  ];

  const cohortData = [
    { cohort: 'Jan 2025', m1: '100%', m2: '88%', m3: '82%', m4: '79%', m5: '78%' },
    { cohort: 'Feb 2025', m1: '100%', m2: '91%', m3: '85%', m4: '83%', m5: '-' },
    { cohort: 'Mar 2025', m1: '100%', m2: '93%', m3: '88%', m4: '-', m5: '-' },
    { cohort: 'Apr 2025', m1: '100%', m2: '95%', m3: '-', m4: '-', m5: '-' },
  ];

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-2xl bg-gradient-to-r from-indigo-950/40 via-slate-900/60 to-slate-900/80 border border-indigo-500/20 backdrop-blur-xl">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-emerald-600/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
            <TrendingUp className="w-7 h-7" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold tracking-tight text-white">
                Unicorn SaaS Business Intelligence Hub
              </h1>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                SERIES-A READY METRICS
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-1 max-w-xl">
              Real-time subscription revenue analytics, candidate-employer marketplace liquidity, and retention cohort performance.
            </p>
          </div>
        </div>

        {/* Timeframe switch */}
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-900 border border-slate-800 text-xs">
          {(['30d', '90d', '1y'] as const).map((r) => (
            <button
              key={r}
              onClick={() => setTimeRange(r)}
              className={`px-3 py-1.5 rounded-lg font-mono font-semibold transition-all cursor-pointer ${
                timeRange === r
                  ? 'bg-emerald-600 text-white shadow'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {r.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {saasKpis.map((kpi, i) => (
          <div
            key={i}
            className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-emerald-500/30 transition-all backdrop-blur-md"
          >
            <span className="text-xs font-mono text-slate-400 block mb-1">{kpi.label}</span>
            <div className="flex items-baseline justify-between">
              <h3 className="text-2xl font-extrabold font-mono text-white">{kpi.value}</h3>
              <span
                className={`text-xs font-mono font-bold flex items-center gap-0.5 px-2 py-0.5 rounded ${
                  kpi.positive
                    ? 'text-emerald-400 bg-emerald-500/10'
                    : 'text-rose-400 bg-rose-500/10'
                }`}
              >
                {kpi.positive ? <ArrowUpRight className="w-3.5 h-3.5" /> : <ArrowDownRight className="w-3.5 h-3.5" />}
                {kpi.change}
              </span>
            </div>
            <p className="text-[11px] text-slate-500 mt-2 font-mono">{kpi.subtext}</p>
          </div>
        ))}
      </div>

      {/* Retention Cohort Table & Marketplace Liquidity */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Retention Cohort Table */}
        <div className="lg:col-span-8 p-6 rounded-2xl bg-slate-900/60 border border-slate-800 backdrop-blur-md">
          <h3 className="text-sm font-bold text-white mb-2 flex items-center gap-2">
            <Users className="w-4 h-4 text-indigo-400" />
            Candidate & Recruiter Retention Cohorts
          </h3>
          <p className="text-xs text-slate-400 mb-4">
            Percentage of active subscribers returning month-over-month.
          </p>

          <div className="overflow-x-auto">
            <table className="w-full text-xs font-mono text-left">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400">
                  <th className="py-2.5 px-3">Cohort</th>
                  <th className="py-2.5 px-3">M0</th>
                  <th className="py-2.5 px-3">M+1</th>
                  <th className="py-2.5 px-3">M+2</th>
                  <th className="py-2.5 px-3">M+3</th>
                  <th className="py-2.5 px-3">M+4</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-slate-300">
                {cohortData.map((row, idx) => (
                  <tr key={idx} className="hover:bg-slate-800/40">
                    <td className="py-3 px-3 font-semibold text-white">{row.cohort}</td>
                    <td className="py-3 px-3 text-emerald-400 font-bold">{row.m1}</td>
                    <td className="py-3 px-3 text-emerald-400/90">{row.m2}</td>
                    <td className="py-3 px-3 text-emerald-400/80">{row.m3}</td>
                    <td className="py-3 px-3 text-indigo-400">{row.m4}</td>
                    <td className="py-3 px-3 text-indigo-400/80">{row.m5}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Marketplace Liquidity Gauge */}
        <div className="lg:col-span-4 p-6 rounded-2xl bg-slate-900/60 border border-slate-800 backdrop-blur-md space-y-4">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <Target className="w-4 h-4 text-emerald-400" />
            Marketplace Liquidity Index
          </h3>

          <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-750 text-xs space-y-3">
            <div className="flex justify-between">
              <span className="text-slate-400">Monthly Job Postings:</span>
              <span className="font-mono font-bold text-white">1,480</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Applications Dispatched:</span>
              <span className="font-mono font-bold text-white">8,920</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Interview Fast-Track Rate:</span>
              <span className="font-mono font-bold text-emerald-400">38.4%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Avg. Offer Acceptance:</span>
              <span className="font-mono font-bold text-cyan-400">88.5%</span>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-indigo-950/30 border border-indigo-500/20 text-xs text-slate-300">
            <span className="font-bold text-indigo-300 block mb-1">Unicorn Valuation Multiple:</span>
            SkillSync AI 4.0 trades at an estimated 28x ARR ($49.8M Implied Valuation) based on top-decile 124% net expansion and 13.6x LTV:CAC.
          </div>
        </div>
      </div>
    </div>
  );
};
