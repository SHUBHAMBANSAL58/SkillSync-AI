import test from 'node:test';
import assert from 'node:assert/strict';
import { extractKeywords, calculateATSScore } from './atsCalculator';

test('extractKeywords extracts known technical keywords correctly', () => {
  const sample = 'Senior Full Stack Engineer with 4 years in React, TypeScript, Docker, and PostgreSQL.';
  const kws = extractKeywords(sample);
  assert.ok(kws.includes('react'));
  assert.ok(kws.includes('typescript'));
  assert.ok(kws.includes('docker'));
  assert.ok(kws.includes('postgresql'));
  assert.ok(!kws.includes('randomword'));
});

test('calculateATSScore calculates high score for matching resume and job description', () => {
  const resume = `
    Alex Rivers - Software Engineer
    Education: Bachelor of Science in Computer Science
    Experience: 3 years building microservices with React, TypeScript, Node.js, and Docker.
    Optimized PostgreSQL database performance by 35%.
  `;
  const job = `
    Looking for a Frontend/Fullstack Engineer skilled in React, TypeScript, and Docker.
    Must have experience with PostgreSQL and Node.js.
  `;
  const result = calculateATSScore(resume, job);
  assert.ok(result.matchScore >= 80, `Expected score >= 80, got ${result.matchScore}`);
  assert.ok(result.matchedKeywords.includes('react'));
  assert.ok(result.matchedKeywords.includes('typescript'));
  assert.equal(result.missingKeywords.length, 0);
});

test('calculateATSScore flags missing keywords when resume lacks required skills', () => {
  const resume = `
    Alex Rivers - Junior Developer
    Skilled in HTML, CSS, and basic JavaScript.
  `;
  const job = `
    Looking for a Senior Cloud Architect with Kubernetes, AWS, Docker, Python, and Kafka.
  `;
  const result = calculateATSScore(resume, job);
  assert.ok(result.matchScore < 50, `Expected score < 50, got ${result.matchScore}`);
  assert.ok(result.missingKeywords.includes('kubernetes'));
  assert.ok(result.missingKeywords.includes('aws'));
  assert.ok(result.missingKeywords.includes('docker'));
  assert.ok(result.recommendations.length > 0);
});
