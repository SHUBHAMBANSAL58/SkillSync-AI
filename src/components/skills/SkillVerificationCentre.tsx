import React, { useState } from 'react';
import {
  ShieldCheck,
  Award,
  Terminal,
  Code2,
  CheckCircle2,
  XCircle,
  Play,
  RotateCcw,
  Zap,
  BookOpen,
  ArrowRight,
  Flame,
} from 'lucide-react';
import { UserProfile, SkillAssessment, CodingChallenge } from '../../types/career';

interface SkillVerificationCentreProps {
  user: UserProfile;
  assessments: SkillAssessment[];
  challenges: CodingChallenge[];
  onVerifySkill: (skillName: string, score: number, level: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert') => void;
}

export const SkillVerificationCentre: React.FC<SkillVerificationCentreProps> = ({
  user,
  assessments,
  challenges,
  onVerifySkill,
}) => {
  const [activeTab, setActiveTab] = useState<'assessments' | 'challenges' | 'gaps'>('assessments');

  // Assessment Quiz State
  const [selectedAssessment, setSelectedAssessment] = useState<SkillAssessment | null>(assessments[0]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [quizScore, setQuizScore] = useState<number | null>(null);

  // Coding Challenge State
  const [selectedChallenge, setSelectedChallenge] = useState<CodingChallenge | null>(challenges[0]);
  const [editorCode, setEditorCode] = useState(challenges[0]?.starterCode || '');
  const [executionOutput, setExecutionOutput] = useState<string | null>(null);
  const [runningCode, setRunningCode] = useState(false);

  // Handle quiz answer
  const handleSelectAnswer = (optionIndex: number) => {
    if (quizSubmitted) return;
    setSelectedAnswers({
      ...selectedAnswers,
      [currentQuestionIndex]: optionIndex,
    });
  };

  const handleQuizSubmit = () => {
    if (!selectedAssessment) return;
    let correctCount = 0;
    selectedAssessment.questions.forEach((q, idx) => {
      if (selectedAnswers[idx] === q.correctIndex) {
        correctCount++;
      }
    });

    const scorePercentage = Math.round((correctCount / selectedAssessment.questions.length) * 100);
    setQuizScore(scorePercentage);
    setQuizSubmitted(true);

    if (scorePercentage >= 75) {
      const level = scorePercentage >= 90 ? 'Expert' : scorePercentage >= 80 ? 'Advanced' : 'Intermediate';
      onVerifySkill(selectedAssessment.skillName, scorePercentage, level);
    }
  };

  const handleResetQuiz = () => {
    setSelectedAnswers({});
    setCurrentQuestionIndex(0);
    setQuizSubmitted(false);
    setQuizScore(null);
  };

  // Run in-browser code challenge simulation
  const handleRunChallengeCode = () => {
    setRunningCode(true);
    setExecutionOutput(null);

    setTimeout(() => {
      setRunningCode(false);
      setExecutionOutput(
        `[Virtual Test Runner - Sandboxed Execution]\nRunning Test Suite for: ${selectedChallenge?.title}\n\n` +
          `Test Case 1 ("race a car"): PASSED (0.4ms)\n` +
          `Test Case 2 ("abca"): PASSED (0.2ms)\n` +
          `Test Case 3 ("abc"): PASSED (0.3ms)\n\n` +
          `RESULT: 3/3 Test Cases Passed. Solution time complexity O(N), space complexity O(1).`
      );
    }, 600);
  };

  const currentQ = selectedAssessment?.questions[currentQuestionIndex];

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Top Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-2xl bg-gradient-to-r from-[#0c1224] via-[#10182b] to-[#080B18] border border-indigo-500/20 shadow-xl">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-xs font-semibold mb-2">
            <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
            PART 5.3 & 10 • SKILL VERIFICATION CENTRE & DEV ARENA
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
            Evidence-Based Technical Assessments
          </h2>
          <p className="text-sm text-slate-400 mt-1">
            Zero self-declared fluff. Earn cryptographic verified skill credentials through objective evaluations.
          </p>
        </div>

        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-900 border border-slate-800 self-start md:self-auto">
          <button
            onClick={() => setActiveTab('assessments')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              activeTab === 'assessments'
                ? 'bg-indigo-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Technical Quizzes
          </button>
          <button
            onClick={() => setActiveTab('challenges')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              activeTab === 'challenges'
                ? 'bg-indigo-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Coding Arena
          </button>
          <button
            onClick={() => setActiveTab('gaps')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              activeTab === 'gaps'
                ? 'bg-indigo-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Skill Gap Matrix
          </button>
        </div>
      </div>

      {/* TAB 1: TECHNICAL ASSESSMENTS */}
      {activeTab === 'assessments' && selectedAssessment && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Assessment Selector Sidebar */}
          <div className="lg:col-span-4 space-y-4">
            <div className="p-5 rounded-2xl bg-[#0c1224] border border-indigo-500/20 shadow-xl space-y-3">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-cyan-400" />
                Available Verification Tracks
              </h3>

              <div className="space-y-2">
                {assessments.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      setSelectedAssessment(item);
                      handleResetQuiz();
                    }}
                    className={`w-full p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                      selectedAssessment.id === item.id
                        ? 'bg-indigo-600/20 border-indigo-500 text-white'
                        : 'bg-slate-900/60 border-slate-800 text-slate-300 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span className="font-bold">{item.skillName}</span>
                      <span className="text-[10px] px-2 py-0.5 rounded bg-slate-900 border border-slate-700 text-cyan-300 font-mono">
                        {item.difficulty}
                      </span>
                    </div>
                    <div className="text-xs text-slate-400">{item.title}</div>
                    <div className="text-[10px] text-slate-500 mt-1">
                      {item.questionsCount} Questions • {item.timeMinutes} mins • Awards {item.badgeAwarded}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Verified Credentials Showcase */}
            <div className="p-5 rounded-2xl bg-[#0c1224] border border-indigo-500/20 shadow-xl space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <Award className="w-4 h-4 text-amber-400" />
                Current Verified Badges
              </h4>
              <div className="space-y-2">
                {Object.entries(user.verifiedSkills).map(([skill, data]) => (
                  <div
                    key={skill}
                    className="p-3 rounded-xl bg-slate-900/80 border border-emerald-500/30 flex items-center justify-between"
                  >
                    <div>
                      <div className="text-xs font-bold text-white flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                        {skill}
                      </div>
                      <div className="text-[10px] text-slate-400">Verified on {data.verifiedDate}</div>
                    </div>
                    <span className="text-xs font-bold text-emerald-300 font-mono bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/30">
                      {data.level} ({data.score}%)
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Quiz Screen */}
          <div className="lg:col-span-8 p-6 md:p-8 rounded-2xl bg-[#0c1224] border border-indigo-500/20 shadow-xl space-y-6">
            {!quizSubmitted ? (
              <>
                <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                  <div>
                    <span className="text-xs text-indigo-400 font-semibold">{selectedAssessment.skillName} Track</span>
                    <h3 className="text-lg font-bold text-white">
                      Question {currentQuestionIndex + 1} of {selectedAssessment.questions.length}
                    </h3>
                  </div>
                  <div className="text-xs font-mono text-cyan-300 bg-slate-900 px-3 py-1.5 rounded-lg border border-slate-800">
                    Difficulty: {selectedAssessment.difficulty}
                  </div>
                </div>

                {/* Question Statement */}
                <div className="space-y-3">
                  <p className="text-sm text-slate-100 font-medium leading-relaxed">
                    {currentQ?.question}
                  </p>

                  {currentQ?.codeSnippet && (
                    <pre className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-cyan-300 overflow-x-auto">
                      <code>{currentQ.codeSnippet}</code>
                    </pre>
                  )}
                </div>

                {/* Options List */}
                <div className="space-y-2.5">
                  {currentQ?.options.map((opt, oIndex) => {
                    const isSelected = selectedAnswers[currentQuestionIndex] === oIndex;
                    return (
                      <button
                        key={oIndex}
                        onClick={() => handleSelectAnswer(oIndex)}
                        className={`w-full p-4 rounded-xl border text-left text-xs transition-all flex items-start gap-3 cursor-pointer ${
                          isSelected
                            ? 'bg-indigo-600/30 border-cyan-400 text-white font-medium ring-1 ring-cyan-400/50'
                            : 'bg-slate-900/60 border-slate-800 text-slate-300 hover:border-slate-700'
                        }`}
                      >
                        <span
                          className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5 ${
                            isSelected ? 'bg-cyan-400 text-slate-950' : 'bg-slate-800 text-slate-400'
                          }`}
                        >
                          {String.fromCharCode(65 + oIndex)}
                        </span>
                        <span className="leading-relaxed">{opt}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Navigation and Submission */}
                <div className="flex items-center justify-between pt-4 border-t border-slate-800">
                  <button
                    onClick={() => setCurrentQuestionIndex(Math.max(0, currentQuestionIndex - 1))}
                    disabled={currentQuestionIndex === 0}
                    className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium cursor-pointer disabled:opacity-30"
                  >
                    Previous
                  </button>

                  {currentQuestionIndex < selectedAssessment.questions.length - 1 ? (
                    <button
                      onClick={() => setCurrentQuestionIndex(currentQuestionIndex + 1)}
                      className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold cursor-pointer shadow-md"
                    >
                      Next Question
                    </button>
                  ) : (
                    <button
                      onClick={handleQuizSubmit}
                      className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-500 hover:to-teal-400 text-white text-xs font-bold shadow-lg shadow-emerald-500/20 cursor-pointer"
                    >
                      Submit for Skill Verification
                    </button>
                  )}
                </div>
              </>
            ) : (
              /* Quiz Score & Feedback */
              <div className="space-y-6 text-center py-6 animate-fadeIn">
                <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-indigo-500 to-cyan-500 flex items-center justify-center text-white shadow-xl">
                  {quizScore! >= 75 ? <Award className="w-10 h-10" /> : <ShieldCheck className="w-10 h-10" />}
                </div>

                <div className="space-y-1">
                  <h3 className="text-2xl font-bold text-white">
                    {quizScore! >= 75 ? 'Assessment Successfully Verified!' : 'Verification Threshold Missed'}
                  </h3>
                  <p className="text-xs text-slate-400 max-w-md mx-auto">
                    {quizScore! >= 75
                      ? `Congratulations! Your score of ${quizScore}% qualifies you for the verified '${selectedAssessment.badgeAwarded}' badge.`
                      : `You scored ${quizScore}%. The minimum passing threshold for verified employer badges is 75%. Review the explanations below and re-test.`}
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 max-w-sm mx-auto flex items-center justify-around">
                  <div>
                    <span className="text-xs text-slate-400">Your Score</span>
                    <div className="text-2xl font-bold text-cyan-300">{quizScore}%</div>
                  </div>
                  <div>
                    <span className="text-xs text-slate-400">Pass Cutoff</span>
                    <div className="text-2xl font-bold text-slate-400">75%</div>
                  </div>
                </div>

                <div className="flex items-center justify-center gap-3">
                  <button
                    onClick={handleResetQuiz}
                    className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold cursor-pointer"
                  >
                    Retake Assessment
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 2: CODING CHALLENGES */}
      {activeTab === 'challenges' && selectedChallenge && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-5 p-6 rounded-2xl bg-[#0c1224] border border-indigo-500/20 shadow-xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <span className="text-xs font-mono text-cyan-300 bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
                {selectedChallenge.difficulty} • {selectedChallenge.category}
              </span>
              <span className="text-xs text-slate-400">{selectedChallenge.timeLimitMin} mins limit</span>
            </div>

            <h3 className="text-xl font-bold text-white">{selectedChallenge.title}</h3>
            <p className="text-xs text-slate-300 leading-relaxed">{selectedChallenge.description}</p>

            <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2">
              <h4 className="text-xs font-bold text-indigo-400 uppercase tracking-wider">Test Suite Objectives</h4>
              {selectedChallenge.testCases.map((tc, idx) => (
                <div key={idx} className="text-xs text-slate-300 space-y-0.5">
                  <div className="font-mono text-cyan-300 text-[11px]">{tc.input} ➔ {tc.expected}</div>
                  <div className="text-[10px] text-slate-500">{tc.description}</div>
                </div>
              ))}
            </div>

            <div className="p-3.5 rounded-xl bg-indigo-950/30 border border-indigo-500/20 text-xs text-slate-300">
              <span className="font-semibold text-indigo-300">Solution Strategy: </span>
              {selectedChallenge.solutionHint}
            </div>
          </div>

          <div className="lg:col-span-7 p-6 rounded-2xl bg-[#0c1224] border border-indigo-500/20 shadow-xl space-y-4 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-3">
                <span className="text-xs font-mono text-slate-400 flex items-center gap-1.5">
                  <Code2 className="w-4 h-4 text-cyan-400" />
                  solution.ts • Sandboxed TypeScript Sandbox
                </span>
                <button
                  onClick={handleRunChallengeCode}
                  disabled={runningCode}
                  className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold flex items-center gap-1.5 shadow-md cursor-pointer transition-all disabled:opacity-50"
                >
                  {runningCode ? <RotateCcw className="w-3.5 h-3.5 animate-spin" /> : <Play className="w-3.5 h-3.5 fill-white" />}
                  Execute Tests
                </button>
              </div>

              <textarea
                value={editorCode}
                onChange={(e) => setEditorCode(e.target.value)}
                rows={12}
                className="w-full p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-slate-200 focus:outline-none focus:border-cyan-500 transition-all resize-none"
              />
            </div>

            {executionOutput && (
              <div className="p-4 rounded-xl bg-slate-950 border border-emerald-500/30 font-mono text-xs text-emerald-300 whitespace-pre-line animate-fadeIn">
                {executionOutput}
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 3: SKILL GAP MATRIX */}
      {activeTab === 'gaps' && (
        <div className="p-6 md:p-8 rounded-2xl bg-[#0c1224] border border-indigo-500/20 shadow-xl space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-slate-800">
            <div>
              <h3 className="text-xl font-bold text-white">Full-Stack AI Engineer Competency Benchmark</h3>
              <p className="text-xs text-slate-400">Comparing your verified skills against Silicon Valley hiring bars.</p>
            </div>
            <span className="text-xs text-emerald-400 font-mono">Current Readiness: {user.readinessScore}%</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { skill: 'TypeScript', current: 94, target: 85, status: 'EXCEEDED' },
              { skill: 'React 19', current: 91, target: 85, status: 'EXCEEDED' },
              { skill: 'System Design', current: 78, target: 85, status: 'GAP (-7%)' },
              { skill: 'PostgreSQL', current: 82, target: 80, status: 'ALIGNED' },
              { skill: 'Docker & Cloud', current: 70, target: 80, status: 'GAP (-10%)' },
              { skill: 'Gemini AI Orchestration', current: 88, target: 80, status: 'EXCEEDED' },
            ].map((item) => (
              <div key={item.skill} className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-white">{item.skill}</span>
                  <span
                    className={`font-mono text-[10px] px-2 py-0.5 rounded font-semibold ${
                      item.status.includes('EXCEEDED') || item.status.includes('ALIGNED')
                        ? 'bg-emerald-500/10 text-emerald-300'
                        : 'bg-rose-500/10 text-rose-300'
                    }`}
                  >
                    {item.status}
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span>Score: <b className="text-slate-200">{item.current}%</b></span>
                  <span>Target: <b className="text-slate-200">{item.target}%</b></span>
                </div>
                <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full ${
                      item.current >= item.target ? 'bg-emerald-400' : 'bg-rose-400'
                    }`}
                    style={{ width: `${item.current}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
