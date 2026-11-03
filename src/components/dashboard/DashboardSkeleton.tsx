import React from 'react';
import { Sparkles, Compass, Briefcase, Calendar } from 'lucide-react';
import { Skeleton } from '../common/Skeleton';

export const DashboardSkeleton: React.FC = () => {
  return (
    <div className="space-y-8 animate-fadeIn" data-testid="dashboard-skeleton">
      {/* Hero Welcome Banner Skeleton */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-indigo-950/40 via-[#10182b] to-[#080B18] border border-indigo-500/20 p-6 md:p-8 shadow-2xl">
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl w-full">
            {/* Pill */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-spin" />
              <Skeleton className="h-3.5 w-44 rounded-full" />
            </div>

            {/* Title */}
            <Skeleton className="h-9 md:h-10 w-64 md:w-96 rounded-xl" />

            {/* Subtitle */}
            <div className="space-y-2 pt-1 max-w-lg">
              <Skeleton className="h-4 w-full rounded" />
              <Skeleton className="h-4 w-3/4 rounded" />
            </div>

            {/* Action buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-3">
              <Skeleton className="h-9 w-36 rounded-xl" />
              <Skeleton className="h-9 w-40 rounded-xl" />
              <Skeleton className="h-9 w-44 rounded-xl" />
            </div>
          </div>

          {/* Quick Metrics Cards Skeleton (2x2) */}
          <div className="grid grid-cols-2 gap-3 sm:gap-4 shrink-0 w-full lg:w-auto">
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800/80 backdrop-blur-md flex flex-col justify-between w-full sm:w-36 md:w-44 h-28"
              >
                <div className="flex items-center justify-between">
                  <Skeleton className="h-3 w-20 rounded" />
                  <Skeleton className="h-4 w-4 rounded-full" />
                </div>
                <div className="mt-2 flex items-baseline gap-1.5">
                  <Skeleton className="h-7 w-12 rounded-lg" />
                  <Skeleton className="h-3 w-8 rounded" />
                </div>
                <div className="w-full h-1.5 bg-slate-800 rounded-full mt-2 overflow-hidden">
                  <Skeleton className="h-full w-2/3 rounded-full" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 3D Visualizer & Skill Diagnostic Skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 3D Galaxy Canvas Placeholder */}
        <div className="lg:col-span-2 relative h-96 rounded-2xl bg-[#0c1224] border border-indigo-500/20 overflow-hidden flex flex-col items-center justify-center p-6">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-indigo-900/15 via-transparent to-transparent pointer-events-none" />
          
          <div className="relative flex flex-col items-center gap-4">
            {/* Center orbit wireframe */}
            <div className="w-32 h-32 rounded-full border border-indigo-500/30 flex items-center justify-center animate-pulse">
              <div className="w-20 h-20 rounded-full border border-cyan-400/40 flex items-center justify-center">
                <div className="w-8 h-8 rounded-full bg-indigo-500/30 animate-ping" />
              </div>
            </div>
            <div className="text-center space-y-1.5">
              <Skeleton className="h-4 w-48 mx-auto rounded" />
              <Skeleton className="h-3 w-32 mx-auto rounded" />
            </div>
          </div>

          {/* Floating node skeletons */}
          <div className="absolute top-8 left-8 flex items-center gap-2">
            <Skeleton className="h-6 w-24 rounded-full" />
          </div>
          <div className="absolute top-8 right-8 flex items-center gap-2">
            <Skeleton className="h-6 w-20 rounded-full" />
          </div>
          <div className="absolute bottom-8 left-8 flex items-center gap-2">
            <Skeleton className="h-6 w-28 rounded-full" />
          </div>
          <div className="absolute bottom-8 right-8 flex items-center gap-2">
            <Skeleton className="h-6 w-24 rounded-full" />
          </div>
        </div>

        {/* AI Career Diagnostic Skeleton */}
        <div className="p-6 rounded-2xl bg-[#0c1224] border border-indigo-500/20 shadow-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
              <div className="flex items-center gap-2">
                <Compass className="w-4 h-4 text-cyan-400/50" />
                <Skeleton className="h-4 w-36 rounded" />
              </div>
              <Skeleton className="h-5 w-16 rounded" />
            </div>

            <div className="space-y-3">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="p-3 rounded-xl bg-slate-900/70 border border-slate-800/80 space-y-2">
                  <Skeleton className="h-3.5 w-32 rounded" />
                  <Skeleton className="h-3 w-full rounded" />
                  <Skeleton className="h-3 w-4/5 rounded" />
                </div>
              ))}
            </div>
          </div>

          <Skeleton className="w-full h-10 mt-4 rounded-xl" />
        </div>
      </div>

      {/* High-Match Opportunities & Milestones Skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Curated Opportunities Preview */}
        <div className="lg:col-span-2 p-6 rounded-2xl bg-[#0c1224] border border-indigo-500/20 shadow-xl">
          <div className="flex items-center justify-between mb-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <Briefcase className="w-4 h-4 text-indigo-400/60" />
                <Skeleton className="h-5 w-52 rounded" />
              </div>
              <Skeleton className="h-3 w-64 rounded" />
            </div>
            <Skeleton className="h-4 w-20 rounded" />
          </div>

          <div className="space-y-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className="p-4 rounded-xl bg-slate-900/60 border border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
              >
                <div className="space-y-2 w-full max-w-md">
                  <div className="flex items-center gap-2">
                    <Skeleton className="h-4 w-24 rounded" />
                    <Skeleton className="h-3.5 w-36 rounded" />
                  </div>
                  <div className="flex items-center gap-3">
                    <Skeleton className="h-3 w-24 rounded" />
                    <Skeleton className="h-3 w-20 rounded" />
                    <Skeleton className="h-3 w-28 rounded" />
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <div className="space-y-1 text-right">
                    <Skeleton className="h-2.5 w-16 ml-auto rounded" />
                    <Skeleton className="h-5 w-12 ml-auto rounded" />
                  </div>
                  <Skeleton className="h-8 w-24 rounded-lg" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Milestones Calendar Skeleton */}
        <div className="p-6 rounded-2xl bg-[#0c1224] border border-indigo-500/20 shadow-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-purple-400/60" />
                <Skeleton className="h-4 w-44 rounded" />
              </div>
              <Skeleton className="h-4 w-12 rounded" />
            </div>

            <div className="space-y-3">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="p-3 rounded-xl bg-slate-900/60 border border-slate-800/80 space-y-2">
                  <div className="flex items-center justify-between">
                    <Skeleton className="h-3.5 w-28 rounded" />
                    <Skeleton className="h-3 w-16 rounded" />
                  </div>
                  <Skeleton className="h-3 w-40 rounded" />
                </div>
              ))}
            </div>
          </div>

          <Skeleton className="w-full h-9 mt-4 rounded-xl" />
        </div>
      </div>
    </div>
  );
};
