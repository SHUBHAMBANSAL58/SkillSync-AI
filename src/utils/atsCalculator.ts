/**
 * Pure ATS Match and Keyword Extraction Engine
 */

export interface ATSAnalysisResult {
  matchScore: number; // 0 to 100
  matchedKeywords: string[];
  missingKeywords: string[];
  scoreBreakdown: {
    skillsMatch: number; // weight 50%
    experienceMatch: number; // weight 30%
    educationMatch: number; // weight 20%
  };
  recommendations: string[];
}

const COMMON_TECH_KEYWORDS = [
  'react', 'typescript', 'javascript', 'python', 'node.js', 'nodejs', 'express',
  'sql', 'postgresql', 'mongodb', 'docker', 'kubernetes', 'aws', 'gcp', 'cloud',
  'graphql', 'rest api', 'tailwind', 'html', 'css', 'next.js', 'git', 'ci/cd',
  'system design', 'microservices', 'redis', 'kafka', 'testing', 'jest', 'vitest',
  'data structures', 'algorithms', 'machine learning', 'pytorch', 'tensorflow',
  'agile', 'scrum', 'oauth', 'security', 'performance optimization',
];

export function extractKeywords(text: string): string[] {
  if (!text || typeof text !== 'string') return [];
  const lower = text.toLowerCase();
  const extracted = new Set<string>();

  for (const kw of COMMON_TECH_KEYWORDS) {
    // Word boundary or inclusion check
    const regex = new RegExp(`\\b${kw.replace('.', '\\.')}\\b`, 'i');
    if (regex.test(lower)) {
      extracted.add(kw);
    }
  }

  // Also extract custom capitalized technical words or tokens
  const words = lower.match(/[a-z0-9#+.-]{2,20}/g) || [];
  for (const w of words) {
    if (w.length > 3 && COMMON_TECH_KEYWORDS.includes(w)) {
      extracted.add(w);
    }
  }

  return Array.from(extracted);
}

export function calculateATSScore(resumeText: string, jobDescriptionText: string): ATSAnalysisResult {
  if (!jobDescriptionText || jobDescriptionText.trim().length === 0) {
    return {
      matchScore: 0,
      matchedKeywords: [],
      missingKeywords: [],
      scoreBreakdown: { skillsMatch: 0, experienceMatch: 0, educationMatch: 0 },
      recommendations: ['Provide a valid job description to calculate ATS compatibility.'],
    };
  }

  const jobKeywords = extractKeywords(jobDescriptionText);
  const resumeKeywords = extractKeywords(resumeText);

  if (jobKeywords.length === 0) {
    return {
      matchScore: 50,
      matchedKeywords: resumeKeywords.slice(0, 5),
      missingKeywords: [],
      scoreBreakdown: { skillsMatch: 50, experienceMatch: 50, educationMatch: 50 },
      recommendations: ['Job description had few standard keywords; review manually.'],
    };
  }

  const matched: string[] = [];
  const missing: string[] = [];

  for (const kw of jobKeywords) {
    if (resumeKeywords.includes(kw)) {
      matched.push(kw);
    } else {
      missing.push(kw);
    }
  }

  const skillCoverage = matched.length / jobKeywords.length;
  const skillsScore = Math.round(skillCoverage * 100);

  // Experience heuristic: years mentioned or projects
  const hasExpKeywords = /\b(years|experience|senior|lead|developed|architected|delivered)\b/i.test(resumeText);
  const experienceScore = hasExpKeywords ? Math.min(100, Math.round(skillsScore * 0.9 + 20)) : Math.round(skillsScore * 0.7);

  // Education heuristic: bachelor, degree, btech, cs, master
  const hasEduKeywords = /\b(bachelor|degree|b\.tech|btech|master|m\.tech|computer science|engineering|university)\b/i.test(resumeText);
  const educationScore = hasEduKeywords ? 95 : 60;

  // Weighted total: 50% skills, 30% experience, 20% education
  const totalScore = Math.min(100, Math.max(0, Math.round(skillsScore * 0.5 + experienceScore * 0.3 + educationScore * 0.2)));

  const recommendations: string[] = [];
  if (missing.length > 0) {
    recommendations.push(`Add demonstrable projects or mentions of: ${missing.slice(0, 4).join(', ')}.`);
  }
  if (!hasExpKeywords) {
    recommendations.push('Strengthen bullet points with action verbs (e.g., Designed, Optimized, Shipped) and quantitative metrics.');
  }
  if (totalScore >= 80) {
    recommendations.push('Strong ATS profile! Tailor your executive summary to highlight matching leadership/technical strengths.');
  }

  return {
    matchScore: totalScore,
    matchedKeywords: matched,
    missingKeywords: missing,
    scoreBreakdown: {
      skillsMatch: skillsScore,
      experienceMatch: experienceScore,
      educationMatch: educationScore,
    },
    recommendations,
  };
}
