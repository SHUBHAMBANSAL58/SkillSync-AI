import React from 'react';

interface SkeletonProps {
  className?: string;
}

export const Skeleton: React.FC<SkeletonProps> = ({ className = '' }) => {
  return (
    <div
      className={`relative overflow-hidden rounded-md bg-slate-800/60 before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_1.8s_infinite] before:bg-gradient-to-r before:from-transparent before:via-indigo-500/10 before:to-transparent ${className}`}
    />
  );
};

export const SkeletonText: React.FC<{ lines?: number; className?: string; lastLineWidth?: string }> = ({
  lines = 3,
  className = '',
  lastLineWidth = 'w-3/4',
}) => {
  return (
    <div className={`space-y-2 ${className}`}>
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton
          key={i}
          className={`h-3.5 ${i === lines - 1 ? lastLineWidth : 'w-full'} rounded-md`}
        />
      ))}
    </div>
  );
};
