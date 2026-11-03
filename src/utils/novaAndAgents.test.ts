import test from 'node:test';
import assert from 'node:assert/strict';
import { parseNovaCommand, simulateCareerPath } from '../services/novaIntelligence';
import { advanceAgentWorkflow, NetworkTask } from '../services/agentNetwork';

test('parseNovaCommand correctly detects Skill Gap intent and actions', () => {
  const cmd = parseNovaCommand('NOVA, find my biggest skill gaps and analyze my readiness');
  assert.equal(cmd.intent, 'Analyze Skill Gaps & Readiness');
  assert.ok(cmd.actions.length >= 2);
  assert.equal(cmd.actions[0].targetModule, 'digital-twin');
  assert.equal(cmd.actions[0].riskLevel, 'low');
});

test('parseNovaCommand correctly detects 4-Agent workflow intent with confirmations', () => {
  const cmd = parseNovaCommand('Start the four agent workflow and build the feature');
  assert.equal(cmd.intent, 'Execute Coordinated 4-Agent Intelligence Cycle');
  assert.ok(cmd.actions.some((a) => a.requiresConfirmation === true));
  assert.ok(cmd.actions.some((a) => a.targetModule === 'agent-centre'));
});

test('parseNovaCommand correctly detects Career Simulation intent', () => {
  const cmd = parseNovaCommand('Simulate my salary and career trajectory for the next year');
  assert.equal(cmd.intent, 'Simulate Career Trajectory & Salary Delta');
  assert.equal(cmd.actions[0].targetModule, 'digital-twin');
});

test('simulateCareerPath returns valid bounded projections', () => {
  const result = simulateCareerPath(80, ['Rust', 'Distributed Systems', 'LLM Orchestration'], 6);
  assert.ok(result.projectedSalaryBumpPercent > 0);
  assert.ok(result.projectedSalaryBumpPercent <= 50);
  assert.ok(result.projectedReadinessDelta > 0);
  assert.ok(result.projectedMarketDemandScore >= 75 && result.projectedMarketDemandScore <= 100);
  assert.ok(result.unlockedRoleTitles.length > 0);
  assert.ok(result.prerequisiteMilestones.length >= 3);
});

test('advanceAgentWorkflow progresses tasks sequentially through Planner -> Designer -> Builder -> Tester -> Review', () => {
  let task: NetworkTask = {
    id: 'T-1',
    title: 'Test Core Feature',
    description: 'Testing task progression',
    module: 'Core',
    status: 'Not Started',
    currentAgent: 'planner',
    priority: 'high',
    dependencies: [],
    testRunsCount: 0,
    defectsDetected: 0,
    acceptanceCriteria: ['Pass test'],
    progressPercent: 0,
  };

  // Not Started -> Planning
  const step1 = advanceAgentWorkflow(task);
  assert.equal(step1.updatedTask.status, 'Planning');
  assert.equal(step1.updatedTask.currentAgent, 'planner');

  // Planning -> Designing
  const step2 = advanceAgentWorkflow(step1.updatedTask);
  assert.equal(step2.updatedTask.status, 'Designing');
  assert.equal(step2.updatedTask.currentAgent, 'designer');

  // Designing -> Building
  const step3 = advanceAgentWorkflow(step2.updatedTask);
  assert.equal(step3.updatedTask.status, 'Building');
  assert.equal(step3.updatedTask.currentAgent, 'builder');

  // Building -> Testing
  const step4 = advanceAgentWorkflow(step3.updatedTask);
  assert.equal(step4.updatedTask.status, 'Testing');
  assert.equal(step4.updatedTask.currentAgent, 'tester');

  // Testing (Defect Detected) -> Loops back to Builder
  const stepDefect = advanceAgentWorkflow(step4.updatedTask, false);
  assert.equal(stepDefect.updatedTask.status, 'Building');
  assert.equal(stepDefect.updatedTask.currentAgent, 'builder');
  assert.equal(stepDefect.updatedTask.defectsDetected, 1);

  // Remediated -> Testing -> Review (Pass)
  const stepRemediated = advanceAgentWorkflow(stepDefect.updatedTask);
  assert.equal(stepRemediated.updatedTask.status, 'Testing');
  const stepPass = advanceAgentWorkflow(stepRemediated.updatedTask, true);
  assert.equal(stepPass.updatedTask.status, 'Review');
  assert.equal(stepPass.updatedTask.currentAgent, 'planner');

  // Review -> Completed
  const stepComplete = advanceAgentWorkflow(stepPass.updatedTask);
  assert.equal(stepComplete.updatedTask.status, 'Completed');
  assert.equal(stepComplete.updatedTask.progressPercent, 100);
});
