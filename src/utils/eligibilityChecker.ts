/**
 * Placement Eligibility Checker
 * Compares candidate credentials against employer criteria with clear reasoning
 */

export interface CandidateProfile {
  cgpa: number; // e.g. 8.4 out of 10.0
  graduationYear: number; // e.g. 2025
  degree: string; // e.g. "B.Tech Computer Science"
  activeBacklogs: number; // e.g. 0
  skills: string[]; // e.g. ["React", "TypeScript", "Node.js"]
  yearsExperience?: number; // e.g. 1
}

export interface PlacementCriteria {
  companyName: string;
  roleTitle: string;
  minCgpa: number; // e.g. 7.0
  eligibleGradYears: number[]; // e.g. [2025, 2026]
  allowedDegrees: string[]; // e.g. ["B.Tech", "B.E.", "MCA", "M.Tech"]
  maxBacklogsAllowed: number; // e.g. 0
  mandatorySkills: string[]; // e.g. ["TypeScript", "SQL"]
  minYearsExperience?: number;
}

export interface EligibilityResult {
  isEligible: boolean;
  status: 'ELIGIBLE' | 'CONDITIONAL_WARNING' | 'NOT_ELIGIBLE';
  overallScore: number; // 0 to 100
  criteriaChecks: {
    name: string;
    passed: boolean;
    reason: string;
    type: 'CRITICAL' | 'WARNING';
  }[];
  summary: string;
}

export function checkPlacementEligibility(
  candidate: CandidateProfile,
  criteria: PlacementCriteria
): EligibilityResult {
  const checks: EligibilityResult['criteriaChecks'] = [];
  let isCriticallyFailed = false;
  let warningCount = 0;

  // 1. CGPA check
  if (candidate.cgpa >= criteria.minCgpa) {
    checks.push({
      name: 'CGPA Requirement',
      passed: true,
      reason: `Your CGPA (${candidate.cgpa.toFixed(1)}) meets or exceeds minimum cutoff of ${criteria.minCgpa.toFixed(1)}.`,
      type: 'CRITICAL',
    });
  } else {
    isCriticallyFailed = true;
    checks.push({
      name: 'CGPA Requirement',
      passed: false,
      reason: `Your CGPA (${candidate.cgpa.toFixed(1)}) is below minimum cutoff of ${criteria.minCgpa.toFixed(1)}.`,
      type: 'CRITICAL',
    });
  }

  // 2. Graduation Year
  if (criteria.eligibleGradYears.includes(candidate.graduationYear)) {
    checks.push({
      name: 'Graduation Batch',
      passed: true,
      reason: `Class of ${candidate.graduationYear} is eligible for this drive.`,
      type: 'CRITICAL',
    });
  } else {
    isCriticallyFailed = true;
    checks.push({
      name: 'Graduation Batch',
      passed: false,
      reason: `Drive is open exclusively for batches [${criteria.eligibleGradYears.join(', ')}]. Candidate batch: ${candidate.graduationYear}.`,
      type: 'CRITICAL',
    });
  }

  // 3. Active Backlogs
  if (candidate.activeBacklogs <= criteria.maxBacklogsAllowed) {
    checks.push({
      name: 'Backlog Status',
      passed: true,
      reason: `Active backlogs (${candidate.activeBacklogs}) within acceptable limit (${criteria.maxBacklogsAllowed}).`,
      type: 'CRITICAL',
    });
  } else {
    isCriticallyFailed = true;
    checks.push({
      name: 'Backlog Status',
      passed: false,
      reason: `Candidate has ${candidate.activeBacklogs} active backlogs. Maximum allowed is ${criteria.maxBacklogsAllowed}.`,
      type: 'CRITICAL',
    });
  }

  // 4. Degree stream check
  const degreeMatched = criteria.allowedDegrees.some((deg) =>
    candidate.degree.toLowerCase().includes(deg.toLowerCase())
  );
  if (degreeMatched) {
    checks.push({
      name: 'Degree Qualification',
      passed: true,
      reason: `Degree '${candidate.degree}' is accepted for this role.`,
      type: 'CRITICAL',
    });
  } else {
    isCriticallyFailed = true;
    checks.push({
      name: 'Degree Qualification',
      passed: false,
      reason: `Degree '${candidate.degree}' does not match eligible qualifications: [${criteria.allowedDegrees.join(', ')}].`,
      type: 'CRITICAL',
    });
  }

  // 5. Mandatory Skills check
  const candidateLowerSkills = candidate.skills.map((s) => s.toLowerCase());
  const missingSkills = criteria.mandatorySkills.filter(
    (s) => !candidateLowerSkills.includes(s.toLowerCase())
  );
  if (missingSkills.length === 0) {
    checks.push({
      name: 'Technical Prerequisites',
      passed: true,
      reason: `Candidate possesses all required prerequisite skills: ${criteria.mandatorySkills.join(', ')}.`,
      type: 'WARNING',
    });
  } else {
    warningCount++;
    checks.push({
      name: 'Technical Prerequisites',
      passed: false,
      reason: `Missing required technical skills: ${missingSkills.join(', ')}. You should complete verification tests for these.`,
      type: 'WARNING',
    });
  }

  // Overall evaluation
  const isEligible = !isCriticallyFailed;
  let status: EligibilityResult['status'] = 'ELIGIBLE';
  if (isCriticallyFailed) {
    status = 'NOT_ELIGIBLE';
  } else if (warningCount > 0) {
    status = 'CONDITIONAL_WARNING';
  }

  const passedCount = checks.filter((c) => c.passed).length;
  const overallScore = Math.round((passedCount / checks.length) * 100);

  let summary = '';
  if (status === 'ELIGIBLE') {
    summary = `Fully Eligible for ${criteria.companyName} (${criteria.roleTitle}). All academic and technical standards verified.`;
  } else if (status === 'CONDITIONAL_WARNING') {
    summary = `Academically eligible for ${criteria.companyName}, but please address technical skill warnings prior to interview screening.`;
  } else {
    summary = `Currently in-eligible for ${criteria.companyName} based on employer mandatory cutoffs. See details below.`;
  }

  return {
    isEligible,
    status,
    overallScore,
    criteriaChecks: checks,
    summary,
  };
}
