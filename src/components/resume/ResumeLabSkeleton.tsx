import React from 'react';
import { FileText, Sparkles, Upload } from 'lucide-react';
import { Skeleton } from '../common/Skeleton';

export const ResumeLabSkeleton: React.FC = () => {
  return (
    <div className="space-y-8 animate-fadeIn" data-testid="resume-lab-skeleton">
      {/* Header & Version Tabs Skeleton */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <FileText className="w-6 h-6 text-indigo-400/60" />
            <Skeleton className="h-8 w-56 rounded-xl" />
          </div>
          <Skeleton className="h-3.5 w-80 mt-2 rounded" />
        </div>

        {/* Versions & Upload Skeleton */}
        <div className="flex flex-wrap items-center gap-2">
          <Skeleton className="h-9 w-40 rounded-xl" />
          <Skeleton className="h-9 w-36 rounded-xl" />
          <Skeleton className="h-9 w-28 rounded-xl" />
          <div className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-indigo-600/20 border border-indigo-500/30">
            <Upload className="w-4 h-4 text-indigo-400 animate-pulse" />
            <Skeleton className="h-4 w-20 rounded" />
          </div>
        </div>
      </div>

      {/* Main Two-Column Studio Skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Target Job & STAR Bullet Enhancer (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Target Job Description Card */}
          <div className="p-6 rounded-2xl bg-[#0c1224] border border-indigo-500/20 shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <Skeleton className="h-4 w-44 rounded" />
              <Skeleton className="h-3 w-24 rounded" />
            </div>

            <div className="h-32 rounded-xl bg-slate-900/80 border border-slate-800 p-3 space-y-2">
              <Skeleton className="h-3 w-full rounded" />
              <Skeleton className="h-3 w-5/6 rounded" />
              <Skeleton className="h-3 w-4/6 rounded" />
              <Skeleton className="h-3 w-3/4 rounded" />
            </div>

            <Skeleton className="w-full h-11 rounded-xl" />
          </div>

          {/* AI STAR Bullet Enhancer Card */}
          <div className="p-6 rounded-2xl bg-[#0c1224] border border-indigo-500/20 shadow-xl space-y-4">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-cyan-400/60" />
              <Skeleton className="h-4 w-40 rounded" />
            </div>

            <Skeleton className="h-20 w-full rounded-xl" />
            <Skeleton className="w-full h-10 rounded-xl" />

            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800/80 space-y-2">
              <Skeleton className="h-3 w-32 rounded" />
              <Skeleton className="h-3 w-full rounded" />
              <Skeleton className="h-3 w-4/5 rounded" />
            </div>
          </div>
        </div>

        {/* Right Column: ATS Score, Keyword Matrix & Extracted Resume (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* ATS Match Score Gauge Card */}
          <div className="p-6 rounded-2xl bg-[#0c1224] border border-indigo-500/20 shadow-xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-6 border-b border-slate-800">
              <div className="space-y-2">
                <Skeleton className="h-5 w-48 rounded" />
                <Skeleton className="h-3.5 w-64 rounded" />
                <div className="flex items-center gap-2 pt-2">
                  <Skeleton className="h-6 w-28 rounded-full" />
                  <Skeleton className="h-6 w-32 rounded-full" />
                </div>
              </div>

              {/* Radial Gauge Skeleton */}
              <div className="w-28 h-28 rounded-full border-4 border-slate-800 flex items-center justify-center shrink-0 animate-pulse bg-slate-900/60">
                <div className="text-center space-y-1">
                  <Skeleton className="h-7 w-12 mx-auto rounded" />
                  <Skeleton className="h-2.5 w-8 mx-auto rounded" />
                </div>
              </div>
            </div>

            {/* Keyword Match Matrix Skeleton */}
            <div className="mt-6 space-y-3">
              <div className="flex items-center justify-between">
                <Skeleton className="h-4 w-36 rounded" />
                <Skeleton className="h-3 w-28 rounded" />
              </div>

              <div className="flex flex-wrap gap-2 pt-1">
                {Array.from({ length: 12 }).map((_, i) => (
                  <Skeleton
                    key={i}
                    className={`h-7 rounded-lg ${
                      i % 3 === 0 ? 'w-20' : i % 2 === 0 ? 'w-28' : 'w-24'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Improvement Recommendations Skeleton */}
            <div className="mt-6 p-4 rounded-xl bg-slate-900/60 border border-slate-800/80 space-y-3">
              <Skeleton className="h-3.5 w-48 rounded" />
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="flex items-center gap-2.5">
                  <Skeleton className="w-2 h-2 rounded-full shrink-0" />
                  <Skeleton className="h-3 w-full rounded" />
                </div>
              ))}
            </div>
          </div>

          {/* Parsed Resume Content Card Skeleton */}
          <div className="p-6 rounded-2xl bg-[#0c1224] border border-indigo-500/20 shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <Skeleton className="h-4 w-40 rounded" />
              <Skeleton className="h-3 w-24 rounded" />
            </div>

            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800/80 space-y-3">
              <Skeleton className="h-4 w-1/3 rounded" />
              <Skeleton className="h-3 w-full rounded" />
              <Skeleton className="h-3 w-5/6 rounded" />
              <Skeleton className="h-3 w-4/6 rounded" />
              <div className="pt-2" />
              <Skeleton className="h-4 w-1/4 rounded" />
              <Skeleton className="h-3 w-full rounded" />
              <Skeleton className="h-3 w-3/4 rounded" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
