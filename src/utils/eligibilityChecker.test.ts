import test from 'node:test';
import assert from 'node:assert/strict';
import { checkPlacementEligibility, CandidateProfile, PlacementCriteria } from './eligibilityChecker';

test('checkPlacementEligibility returns ELIGIBLE for matching candidate', () => {
  const candidate: CandidateProfile = {
    cgpa: 8.5,
    graduationYear: 2025,
    degree: 'B.Tech in Computer Science',
    activeBacklogs: 0,
    skills: ['TypeScript', 'React', 'SQL'],
  };

  const criteria: PlacementCriteria = {
    companyName: 'Stripe',
    roleTitle: 'Software Engineer - Intern',
    minCgpa: 7.5,
    eligibleGradYears: [2025, 2026],
    allowedDegrees: ['B.Tech', 'B.E.', 'MCA'],
    maxBacklogsAllowed: 0,
    mandatorySkills: ['TypeScript', 'SQL'],
  };

  const result = checkPlacementEligibility(candidate, criteria);
  assert.equal(result.isEligible, true);
  assert.equal(result.status, 'ELIGIBLE');
  assert.equal(result.overallScore, 100);
});

test('checkPlacementEligibility returns NOT_ELIGIBLE if candidate fails CGPA cutoff', () => {
  const candidate: CandidateProfile = {
    cgpa: 6.8,
    graduationYear: 2025,
    degree: 'B.Tech Computer Science',
    activeBacklogs: 0,
    skills: ['TypeScript'],
  };

  const criteria: PlacementCriteria = {
    companyName: 'Google',
    roleTitle: 'SWE Intern',
    minCgpa: 8.0,
    eligibleGradYears: [2025],
    allowedDegrees: ['B.Tech'],
    maxBacklogsAllowed: 0,
    mandatorySkills: ['TypeScript'],
  };

  const result = checkPlacementEligibility(candidate, criteria);
  assert.equal(result.isEligible, false);
  assert.equal(result.status, 'NOT_ELIGIBLE');
  const cgpaCheck = result.criteriaChecks.find((c) => c.name === 'CGPA Requirement');
  assert.equal(cgpaCheck?.passed, false);
});

test('checkPlacementEligibility returns CONDITIONAL_WARNING if missing prerequisite technical skills', () => {
  const candidate: CandidateProfile = {
    cgpa: 8.9,
    graduationYear: 2026,
    degree: 'B.Tech IT',
    activeBacklogs: 0,
    skills: ['Python'], // Missing Docker & Kubernetes
  };

  const criteria: PlacementCriteria = {
    companyName: 'Cloudflare',
    roleTitle: 'Systems Intern',
    minCgpa: 7.0,
    eligibleGradYears: [2026],
    allowedDegrees: ['B.Tech'],
    maxBacklogsAllowed: 0,
    mandatorySkills: ['Docker', 'Kubernetes'],
  };

  const result = checkPlacementEligibility(candidate, criteria);
  assert.equal(result.isEligible, true);
  assert.equal(result.status, 'CONDITIONAL_WARNING');
  const skillCheck = result.criteriaChecks.find((c) => c.name === 'Technical Prerequisites');
  assert.equal(skillCheck?.passed, false);
});
