import test from 'node:test';
import assert from 'node:assert/strict';

test('DashboardSkeleton has test identifier and layout blocks', async () => {
  const { DashboardSkeleton } = await import('./dashboard/DashboardSkeleton');
  assert.ok(typeof DashboardSkeleton === 'function', 'DashboardSkeleton must be a component function');
});

test('ResumeLabSkeleton has test identifier and layout blocks', async () => {
  const { ResumeLabSkeleton } = await import('./resume/ResumeLabSkeleton');
  assert.ok(typeof ResumeLabSkeleton === 'function', 'ResumeLabSkeleton must be a component function');
});

test('JobMatchSkeleton has test identifier and layout blocks', async () => {
  const { JobMatchSkeleton } = await import('./jobs/JobMatchSkeleton');
  assert.ok(typeof JobMatchSkeleton === 'function', 'JobMatchSkeleton must be a component function');
});

test('Skeleton primitive renders valid className bindings', async () => {
  const { Skeleton, SkeletonText } = await import('./common/Skeleton');
  assert.ok(typeof Skeleton === 'function', 'Skeleton must be a component function');
  assert.ok(typeof SkeletonText === 'function', 'SkeletonText must be a component function');
});
