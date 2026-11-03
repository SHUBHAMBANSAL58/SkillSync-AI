import React from 'react';
import { Briefcase, Search, Filter } from 'lucide-react';
import { Skeleton } from '../common/Skeleton';

export const JobMatchSkeleton: React.FC = () => {
  return (
    <div className="space-y-8 animate-fadeIn" data-testid="job-match-skeleton">
      {/* Header & Sub-navigation Tabs Skeleton */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <Briefcase className="w-6 h-6 text-indigo-400/60" />
            <Skeleton className="h-8 w-60 rounded-xl" />
          </div>
          <Skeleton className="h-3.5 w-80 mt-2 rounded" />
        </div>

        {/* Radar / Kanban / Eligibility Tabs Skeleton */}
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-900/80 border border-slate-800">
          <Skeleton className="h-9 w-36 rounded-lg" />
          <Skeleton className="h-9 w-36 rounded-lg" />
          <Skeleton className="h-9 w-36 rounded-lg" />
        </div>
      </div>

      {/* Search & Filter Bar Skeleton */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
        <div className="relative flex-1">
          <div className="h-11 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center px-4 gap-3">
            <Search className="w-4 h-4 text-slate-600" />
            <Skeleton className="h-4 w-56 rounded" />
          </div>
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
          <div className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-900/80 border border-slate-800">
            <Filter className="w-3.5 h-3.5 text-slate-500" />
            <Skeleton className="h-3.5 w-12 rounded" />
          </div>
          <Skeleton className="h-9 w-20 rounded-xl" />
          <Skeleton className="h-9 w-28 rounded-xl" />
          <Skeleton className="h-9 w-24 rounded-xl" />
        </div>
      </div>

      {/* Main Radar Layout Skeleton: Left List (5 cols) + Right Detail (7 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Job Cards List */}
        <div className="lg:col-span-5 space-y-3">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="p-5 rounded-2xl bg-[#0c1224] border border-slate-800/80 space-y-3"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="space-y-1.5">
                  <Skeleton className="h-5 w-32 rounded" />
                  <Skeleton className="h-3.5 w-48 rounded" />
                </div>
                <div className="text-right space-y-1">
                  <Skeleton className="h-2.5 w-16 ml-auto rounded" />
                  <Skeleton className="h-5 w-12 ml-auto rounded" />
                </div>
              </div>

              <div className="flex items-center gap-2 pt-1">
                <Skeleton className="h-3 w-20 rounded" />
                <Skeleton className="h-3 w-24 rounded" />
                <Skeleton className="h-3 w-24 rounded" />
              </div>

              <div className="flex flex-wrap gap-1.5 pt-1">
                <Skeleton className="h-5 w-16 rounded-md" />
                <Skeleton className="h-5 w-20 rounded-md" />
                <Skeleton className="h-5 w-18 rounded-md" />
              </div>
            </div>
          ))}
        </div>

        {/* Right Column: Detailed Job Specification Drawer */}
        <div className="lg:col-span-7">
          <div className="p-6 md:p-8 rounded-2xl bg-[#0c1224] border border-indigo-500/20 shadow-xl space-y-6">
            {/* Header info */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <Skeleton className="h-7 w-44 rounded-xl" />
                  <Skeleton className="h-5 w-20 rounded-full" />
                </div>
                <Skeleton className="h-4 w-56 rounded" />
                <div className="flex items-center gap-3 pt-1">
                  <Skeleton className="h-3.5 w-24 rounded" />
                  <Skeleton className="h-3.5 w-28 rounded" />
                </div>
              </div>

              <Skeleton className="h-11 w-32 rounded-xl" />
            </div>

            {/* Academic & Placement Eligibility Criteria */}
            <div className="space-y-3">
              <Skeleton className="h-4 w-48 rounded" />
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1.5">
                    <Skeleton className="h-2.5 w-16 rounded" />
                    <Skeleton className="h-4 w-20 rounded" />
                  </div>
                ))}
              </div>
            </div>

            {/* Required Skills Matrix */}
            <div className="space-y-3">
              <Skeleton className="h-4 w-40 rounded" />
              <div className="flex flex-wrap gap-2">
                {Array.from({ length: 7 }).map((_, i) => (
                  <Skeleton key={i} className="h-7 w-24 rounded-lg" />
                ))}
              </div>
            </div>

            {/* Full Description Skeleton */}
            <div className="space-y-3 pt-2">
              <Skeleton className="h-4 w-36 rounded" />
              <div className="space-y-2">
                <Skeleton className="h-3.5 w-full rounded" />
                <Skeleton className="h-3.5 w-full rounded" />
                <Skeleton className="h-3.5 w-5/6 rounded" />
                <Skeleton className="h-3.5 w-4/6 rounded" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
