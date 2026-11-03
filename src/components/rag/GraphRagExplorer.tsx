import React, { useState } from 'react';
import {
  Share2,
  Cpu,
  Search,
  Sliders,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  ShieldAlert,
  Zap,
  DollarSign,
  Clock,
  Layers,
  Sparkles,
  ExternalLink,
  ChevronRight,
  Database,
  Terminal,
  Activity,
} from 'lucide-react';
import {
  queryGraphRag,
  KNOWLEDGE_GRAPH_NODES,
  KNOWLEDGE_GRAPH_EDGES,
  GraphRagSearchResult,
  GraphNodeType,
} from '../../services/graphRagService';
import {
  routeLlmRequest,
  executeMultiLlm,
  MODEL_CATALOG,
  ModelDescriptor,
  ModelProvider,
  TaskCategory,
} from '../../services/multiLlmRouter';

export const GraphRagExplorer: React.FC = () => {
  const [activeSubTab, setActiveSubTab] = useState<'graphrag' | 'multillm'>('graphrag');

  // -------------------------------------------------------------
  // GraphRAG State
  // -------------------------------------------------------------
  const [ragQuery, setRagQuery] = useState(
    'What skills and projects do I need to qualify for Staff AI Systems Architect at Stripe or Google?'
  );
  const [alpha, setAlpha] = useState(0.65); // 0 = BM25 sparse, 1 = Dense vector cosine
  const [ragResult, setRagResult] = useState<GraphRagSearchResult>(() => queryGraphRag(ragQuery, 0.65));
  const [selectedNodeType, setSelectedNodeType] = useState<GraphNodeType | 'all'>('all');

  const handleSearchRag = (q = ragQuery, a = alpha) => {
    if (!q.trim()) return;
    const res = queryGraphRag(q, a);
    setRagResult(res);
  };

  // -------------------------------------------------------------
  // Multi-LLM Router State
  // -------------------------------------------------------------
  const [llmPrompt, setLlmPrompt] = useState(
    'Design a fault-tolerant vector indexing pipeline with zero-trust RBAC in TypeScript.'
  );
  const [preferredProvider, setPreferredProvider] = useState<ModelProvider | undefined>(undefined);
  const [isExecutingLlm, setIsExecutingLlm] = useState(false);
  const [llmOutput, setLlmOutput] = useState<string | null>(null);
  const [llmOutputInfo, setLlmOutputInfo] = useState<any>(null);

  // Live route calculation
  const currentRoute = routeLlmRequest({
    prompt: llmPrompt,
    preferredProvider,
  });

  const handleExecuteLlm = async () => {
    setIsExecutingLlm(true);
    setLlmOutput(null);
    try {
      const res = await executeMultiLlm({
        prompt: llmPrompt,
        preferredProvider,
        requireZeroInjection: true,
      });
      setLlmOutput(res.text);
      setLlmOutputInfo(res);
    } catch (err: any) {
      setLlmOutput(`[Execution Error]: ${err.message || 'Execution halted'}`);
    } finally {
      setIsExecutingLlm(false);
    }
  };

  const filteredNodes = KNOWLEDGE_GRAPH_NODES.filter((n) =>
    selectedNodeType === 'all' ? true : n.type === selectedNodeType
  );

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Top Header Card */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-[#0c1224] via-[#10182b] to-[#0a0f1d] border border-indigo-500/20 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-xs font-semibold mb-2">
              <Share2 className="w-3.5 h-3.5 text-cyan-400" />
              INTELLIGENCE ARCHITECTURE 4.0
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight flex items-center gap-2">
              Multi-LLM & GraphRAG Knowledge Engine
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 font-medium">
                Production Grounding
              </span>
            </h2>
            <p className="text-sm text-slate-400 mt-1 max-w-3xl">
              Connects Skills, Technologies, Projects, Certifications, Job Roles, Companies, and Opportunities.
              Combines multi-provider model routing, prompt-injection defense, and verifiable graph citations.
            </p>
          </div>

          {/* SubTab Toggle */}
          <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-900 border border-slate-800">
            <button
              onClick={() => setActiveSubTab('graphrag')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                activeSubTab === 'graphrag'
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Share2 className="w-3.5 h-3.5" />
              GraphRAG & Hybrid Search
            </button>
            <button
              onClick={() => setActiveSubTab('multillm')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                activeSubTab === 'multillm'
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Cpu className="w-3.5 h-3.5" />
              Multi-LLM Router & Defense
            </button>
          </div>
        </div>
      </div>

      {/* ============================================================= */}
      {/* TAB 1: GRAPHRAG KNOWLEDGE EXPLORER */}
      {/* ============================================================= */}
      {activeSubTab === 'graphrag' && (
        <div className="space-y-6">
          {/* Query & Search Configuration Box */}
          <div className="p-6 rounded-2xl bg-[#0c1224] border border-indigo-500/20 shadow-xl space-y-4">
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-400" />
                <input
                  type="text"
                  value={ragQuery}
                  onChange={(e) => setRagQuery(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSearchRag()}
                  placeholder="Enter career or technical question to query the knowledge graph..."
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                />
              </div>
              <button
                onClick={() => handleSearchRag()}
                className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-600 hover:from-indigo-500 hover:to-cyan-500 text-white font-semibold text-xs transition-all shadow-md cursor-pointer"
              >
                <Search className="w-3.5 h-3.5" />
                Execute Graph Query
              </button>
            </div>

            {/* Hybrid Alpha Tuning Slider */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-3 border-t border-slate-800/80 text-xs">
              <div className="flex items-center gap-3">
                <Sliders className="w-4 h-4 text-cyan-400" />
                <span className="text-slate-300 font-medium">Hybrid Search Tuning (Alpha):</span>
                <span className="text-slate-400">
                  Sparse BM25 ({(1 - alpha).toFixed(2)}) ⟷ Dense Vector Cosine ({alpha.toFixed(2)})
                </span>
              </div>
              <div className="flex items-center gap-3">
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.05"
                  value={alpha}
                  onChange={(e) => {
                    const newAlpha = parseFloat(e.target.value);
                    setAlpha(newAlpha);
                    handleSearchRag(ragQuery, newAlpha);
                  }}
                  className="w-36 accent-cyan-400 cursor-pointer"
                />
                <span className="font-mono text-cyan-400 font-bold">{Math.round(alpha * 100)}% Dense</span>
              </div>
            </div>
          </div>

          {/* Results Overview: Grounded Synthesized Intelligence */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left 2 Cols: Matched Nodes, Traversal & Citations */}
            <div className="lg:col-span-2 space-y-6">
              {/* Synthesized Answer Box */}
              <div className="p-6 rounded-2xl bg-gradient-to-br from-indigo-950/40 via-slate-900/60 to-slate-900/90 border border-indigo-500/30 shadow-xl space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs font-bold text-cyan-400">
                    <Sparkles className="w-4 h-4" />
                    GROUNDED GRAPHRAG SYNTHESIS ({ragResult.executionTimeMs}ms)
                  </div>
                  <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300">
                    {ragResult.citations.length} Verified Citations
                  </span>
                </div>
                <p className="text-sm text-slate-200 leading-relaxed font-sans">
                  {ragResult.synthesizedAnswer}
                </p>

                {/* Uncertainty Warnings if any */}
                {ragResult.uncertaintyWarnings.length > 0 && (
                  <div className="mt-3 p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-xs text-amber-300 space-y-1">
                    <div className="flex items-center gap-1.5 font-bold">
                      <AlertTriangle className="w-3.5 h-3.5" />
                      Uncertainty Flag Notice:
                    </div>
                    {ragResult.uncertaintyWarnings.map((w, idx) => (
                      <div key={idx} className="text-amber-200/80 pl-5">
                        • {w}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Multi-Hop Traversal Pathways */}
              <div className="p-6 rounded-2xl bg-[#0c1224] border border-indigo-500/20 shadow-xl space-y-4">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <Share2 className="w-4 h-4 text-cyan-400" />
                  Multi-Hop Knowledge Trajectory (Graph Pathways)
                </h3>

                {ragResult.multiHopPaths.length === 0 ? (
                  <p className="text-xs text-slate-400">No multi-hop trajectories found for this query.</p>
                ) : (
                  <div className="space-y-3">
                    {ragResult.multiHopPaths.map((p, idx) => (
                      <div
                        key={idx}
                        className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 text-xs space-y-2 hover:border-indigo-500/30 transition-all"
                      >
                        <div className="flex items-center gap-2 flex-wrap">
                          {p.path.map((node, nIdx) => (
                            <React.Fragment key={node.id}>
                              <span className="px-2.5 py-1 rounded-lg bg-indigo-500/10 border border-indigo-500/30 text-indigo-200 font-semibold flex items-center gap-1">
                                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                                {node.label}
                                <span className="text-[10px] text-slate-400 uppercase">({node.type})</span>
                              </span>
                              {nIdx < p.path.length - 1 && (
                                <span className="text-[10px] font-mono text-cyan-400 flex items-center gap-1">
                                  --[{p.edgeLabels[nIdx]}]--&gt;
                                </span>
                              )}
                            </React.Fragment>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Matched Nodes Breakdown */}
              <div className="p-6 rounded-2xl bg-[#0c1224] border border-indigo-500/20 shadow-xl space-y-4">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <Database className="w-4 h-4 text-indigo-400" />
                  Top Scored Knowledge Nodes (Dense + Sparse Hybrid)
                </h3>
                <div className="space-y-3">
                  {ragResult.matchedNodes.map(({ node, denseScore, sparseScore, hybridScore }) => (
                    <div
                      key={node.id}
                      className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <h4 className="text-sm font-bold text-white">{node.label}</h4>
                          <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                            {node.type}
                          </span>
                          {node.verified ? (
                            <span className="text-[10px] text-emerald-400 flex items-center gap-1">
                              <CheckCircle2 className="w-3 h-3" /> Verified
                            </span>
                          ) : (
                            <span className="text-[10px] text-amber-400 flex items-center gap-1">
                              <AlertTriangle className="w-3 h-3" /> Projected
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-slate-400">{node.description}</p>
                      </div>

                      <div className="flex items-center gap-3 shrink-0 text-right">
                        <div>
                          <div className="text-xs font-bold text-cyan-400">
                            {Math.round(hybridScore * 100)}%
                          </div>
                          <div className="text-[10px] text-slate-500">
                            Dense: {denseScore} | Sparse: {sparseScore}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Col: Verifiable Citations & Graph Directory */}
            <div className="space-y-6">
              {/* Citations Box */}
              <div className="p-6 rounded-2xl bg-[#0c1224] border border-indigo-500/20 shadow-xl space-y-4">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  Verifiable Source Citations
                </h3>
                <div className="space-y-3">
                  {ragResult.citations.map((c, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1.5"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-white">[{idx + 1}] {c.label}</span>
                        <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-indigo-500/10 text-indigo-300">
                          {c.confidence}% Conf
                        </span>
                      </div>
                      <div className="text-[11px] text-slate-400">
                        Type: <span className="text-slate-300">{c.type}</span> • Category: <span className="text-slate-300">{c.relationshipPath[0]}</span>
                      </div>
                      <div className="text-[10px]">
                        {c.isUncertainOrProjected ? (
                          <span className="text-amber-400">Projected Evidence</span>
                        ) : (
                          <span className="text-emerald-400 font-medium">Ground Truth Verified</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Node Directory Filter */}
              <div className="p-6 rounded-2xl bg-[#0c1224] border border-indigo-500/20 shadow-xl space-y-4">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <Layers className="w-4 h-4 text-cyan-400" />
                  Knowledge Graph Schema Directory
                </h3>
                <div className="flex flex-wrap gap-1.5">
                  {(
                    [
                      'all',
                      'skill',
                      'technology',
                      'project',
                      'certification',
                      'job_role',
                      'company',
                      'opportunity',
                    ] as const
                  ).map((type) => (
                    <button
                      key={type}
                      onClick={() => setSelectedNodeType(type)}
                      className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold uppercase transition-all cursor-pointer ${
                        selectedNodeType === type
                          ? 'bg-cyan-500 text-slate-950 shadow-sm'
                          : 'bg-slate-900 text-slate-400 hover:text-white'
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>

                <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
                  {filteredNodes.map((n) => (
                    <div
                      key={n.id}
                      onClick={() => {
                        setRagQuery(n.label);
                        handleSearchRag(n.label);
                      }}
                      className="p-2.5 rounded-lg bg-slate-900/60 border border-slate-800 hover:border-cyan-500/40 cursor-pointer transition-all flex items-center justify-between text-xs"
                    >
                      <span className="text-slate-200 font-medium">{n.label}</span>
                      <span className="text-[10px] text-slate-500 uppercase">{n.type}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================= */}
      {/* TAB 2: MULTI-LLM PROVIDER ROUTER & OBSERVABILITY */}
      {/* ============================================================= */}
      {activeSubTab === 'multillm' && (
        <div className="space-y-6">
          {/* Prompt Sandbox & Security Guard */}
          <div className="p-6 rounded-2xl bg-[#0c1224] border border-indigo-500/20 shadow-xl space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-cyan-400" />
                  Multi-LLM Execution Sandbox
                </h3>
                <p className="text-xs text-slate-400">
                  Dynamic routing across Google Gemini, OpenAI, Anthropic Claude, and Open-Source models with prompt-injection defense.
                </p>
              </div>

              {/* Provider Preference Override */}
              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-400">Preferred Provider:</span>
                <select
                  value={preferredProvider || 'auto'}
                  onChange={(e) =>
                    setPreferredProvider(
                      e.target.value === 'auto' ? undefined : (e.target.value as ModelProvider)
                    )
                  }
                  className="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:border-cyan-500"
                >
                  <option value="auto">Auto-Optimized (Dynamic)</option>
                  <option value="gemini">Google Gemini</option>
                  <option value="openai">OpenAI</option>
                  <option value="claude">Anthropic Claude</option>
                  <option value="opensource">Open-Source (Llama / DeepSeek)</option>
                </select>
              </div>
            </div>

            <textarea
              rows={3}
              value={llmPrompt}
              onChange={(e) => setLlmPrompt(e.target.value)}
              placeholder="Enter prompt to evaluate model routing, token estimation, and injection audit..."
              className="w-full p-3.5 rounded-xl bg-slate-900 border border-slate-800 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500 resize-none font-mono"
            />

            {/* Prompt Security & Injection Defense Bar */}
            <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-3">
                <ShieldAlert
                  className={`w-4 h-4 ${
                    currentRoute.securityAudit.passed ? 'text-emerald-400' : 'text-rose-400'
                  }`}
                />
                <div>
                  <span className="text-slate-300 font-semibold">Prompt Injection Defense: </span>
                  {currentRoute.securityAudit.passed ? (
                    <span className="text-emerald-400 font-medium">Passed (Zero Vulnerabilities)</span>
                  ) : (
                    <span className="text-rose-400 font-bold">
                      Threat Flagged: {currentRoute.securityAudit.threatsDetected.join(', ')}
                    </span>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={handleExecuteLlm}
                  disabled={isExecutingLlm || !currentRoute.securityAudit.passed}
                  className="flex items-center gap-2 px-5 py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-600 hover:from-indigo-500 hover:to-cyan-500 text-white font-semibold text-xs shadow-md transition-all disabled:opacity-50 cursor-pointer"
                >
                  {isExecutingLlm ? (
                    <>
                      <Zap className="w-3.5 h-3.5 animate-spin" />
                      Executing Route...
                    </>
                  ) : (
                    <>
                      <Zap className="w-3.5 h-3.5" />
                      Execute Multi-Model Request
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Live Route Telemetry Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
              <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1">
                <div className="text-[10px] text-slate-400 uppercase font-semibold">Selected Primary Model</div>
                <div className="text-xs font-bold text-cyan-400">{currentRoute.selectedModel.name}</div>
                <div className="text-[10px] text-slate-500 uppercase">{currentRoute.selectedModel.provider}</div>
              </div>

              <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1">
                <div className="text-[10px] text-slate-400 uppercase font-semibold">Estimated Cost (USD)</div>
                <div className="text-xs font-bold text-emerald-400">${currentRoute.estimatedCostUsd}</div>
                <div className="text-[10px] text-slate-500">{currentRoute.estimatedTokens.total} total tokens</div>
              </div>

              <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1">
                <div className="text-[10px] text-slate-400 uppercase font-semibold">Expected Latency</div>
                <div className="text-xs font-bold text-amber-400">~{currentRoute.simulatedExecutionMs} ms</div>
                <div className="text-[10px] text-slate-500">Speed Score: {currentRoute.selectedModel.speedScore}/100</div>
              </div>

              <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1">
                <div className="text-[10px] text-slate-400 uppercase font-semibold">Fallback Chain</div>
                <div className="text-xs font-bold text-indigo-300">
                  {currentRoute.fallbackChain.map((f) => f.name.split(' ')[0]).join(' → ')}
                </div>
                <div className="text-[10px] text-slate-500">Zero-downtime failover</div>
              </div>
            </div>
          </div>

          {/* Execution Output Panel (if triggered) */}
          {llmOutput && (
            <div className="p-6 rounded-2xl bg-[#0c1224] border border-cyan-500/30 shadow-xl space-y-3">
              <div className="flex items-center justify-between">
                <div className="text-xs font-bold text-cyan-400 flex items-center gap-2">
                  <Sparkles className="w-4 h-4" />
                  MULTI-MODEL RESPONSE
                  {llmOutputInfo?.usedFallback && (
                    <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 text-[10px]">
                      Fallback Invoked
                    </span>
                  )}
                </div>
                <span className="text-[10px] font-mono text-slate-400">
                  Model: {llmOutputInfo?.routeInfo?.selectedModel?.name || currentRoute.selectedModel.name}
                </span>
              </div>
              <pre className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-slate-200 overflow-x-auto whitespace-pre-wrap">
                {llmOutput}
              </pre>
            </div>
          )}

          {/* Comprehensive Model Catalog Table */}
          <div className="p-6 rounded-2xl bg-[#0c1224] border border-indigo-500/20 shadow-xl space-y-4">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Activity className="w-4 h-4 text-indigo-400" />
              Active Multi-Model Consensus Catalog & Economics
            </h3>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400">
                    <th className="pb-3 font-semibold">Model Name</th>
                    <th className="pb-3 font-semibold">Provider</th>
                    <th className="pb-3 font-semibold">Context Window</th>
                    <th className="pb-3 font-semibold">Input / 1M</th>
                    <th className="pb-3 font-semibold">Output / 1M</th>
                    <th className="pb-3 font-semibold">Avg Latency</th>
                    <th className="pb-3 font-semibold">Reasoning</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {MODEL_CATALOG.map((m) => (
                    <tr
                      key={m.id}
                      className={`hover:bg-slate-900/40 transition-colors ${
                        m.id === currentRoute.selectedModel.id ? 'bg-indigo-500/10' : ''
                      }`}
                    >
                      <td className="py-3 font-medium text-white flex items-center gap-2">
                        {m.name}
                        {m.id === currentRoute.selectedModel.id && (
                          <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-cyan-500/20 text-cyan-300">
                            ACTIVE
                          </span>
                        )}
                      </td>
                      <td className="py-3 uppercase font-mono text-[10px] text-slate-300">
                        {m.provider}
                      </td>
                      <td className="py-3 text-slate-400">
                        {(m.contextWindow / 1024).toFixed(0)}k tokens
                      </td>
                      <td className="py-3 text-slate-300">${m.inputCostPer1M.toFixed(2)}</td>
                      <td className="py-3 text-slate-300">${m.outputCostPer1M.toFixed(2)}</td>
                      <td className="py-3 text-amber-300 font-mono">{m.avgLatencyMs} ms</td>
                      <td className="py-3">
                        <div className="flex items-center gap-2">
                          <div className="w-16 h-1.5 rounded-full bg-slate-800 overflow-hidden">
                            <div
                              className="h-full bg-indigo-500"
                              style={{ width: `${m.reasoningScore}%` }}
                            />
                          </div>
                          <span className="text-[10px] text-slate-400 font-mono">
                            {m.reasoningScore}
                          </span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
