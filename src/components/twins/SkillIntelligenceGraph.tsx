import React, { useState } from 'react';
import {
  Share2,
  Search,
  Filter,
  TrendingUp,
  DollarSign,
  ShieldCheck,
  ArrowRight,
  BookOpen,
  Briefcase,
  Layers,
  Sparkles,
} from 'lucide-react';
import { SkillGraphNode } from '../../types/nova';

const GLOBAL_SKILL_NODES: SkillGraphNode[] = [
  // AI & ML
  {
    id: 'ai-orchestration',
    name: 'LLM Orchestration',
    category: 'ai',
    level: 'Mastery',
    marketDemand: 98,
    averageSalary: '$195,000',
    connections: ['rag-pipelines', 'vector-db', 'langchain-gemini', 'python-fastapi'],
    verifiedByYou: true,
  },
  {
    id: 'rag-pipelines',
    name: 'RAG Architectures',
    category: 'ai',
    level: 'Advanced',
    marketDemand: 96,
    averageSalary: '$188,000',
    connections: ['ai-orchestration', 'vector-db', 'postgres-pgvector'],
    verifiedByYou: true,
  },
  {
    id: 'vector-db',
    name: 'Vector Embeddings & Pinecone/Qdrant',
    category: 'ai',
    level: 'Advanced',
    marketDemand: 92,
    averageSalary: '$182,000',
    connections: ['rag-pipelines', 'postgres-pgvector'],
    verifiedByYou: false,
  },
  {
    id: 'langchain-gemini',
    name: 'Gemini SDK & Agents',
    category: 'ai',
    level: 'Mastery',
    marketDemand: 95,
    averageSalary: '$190,000',
    connections: ['ai-orchestration', 'react19-fullstack'],
    verifiedByYou: true,
  },

  // Frontend & UI
  {
    id: 'react19-fullstack',
    name: 'React 19 & Server Components',
    category: 'frontend',
    level: 'Mastery',
    marketDemand: 94,
    averageSalary: '$175,000',
    connections: ['typescript-core', 'tailwind-v4', 'threejs-webgl'],
    verifiedByYou: true,
  },
  {
    id: 'typescript-core',
    name: 'TypeScript Strict Mode',
    category: 'frontend',
    level: 'Mastery',
    marketDemand: 96,
    averageSalary: '$170,000',
    connections: ['react19-fullstack', 'nodejs-backend', 'system-design'],
    verifiedByYou: true,
  },
  {
    id: 'threejs-webgl',
    name: 'Three.js & 3D Spatial WebGL',
    category: 'frontend',
    level: 'Advanced',
    marketDemand: 86,
    averageSalary: '$172,000',
    connections: ['react19-fullstack', 'typescript-core'],
    verifiedByYou: true,
  },
  {
    id: 'tailwind-v4',
    name: 'Tailwind CSS Modern Tokens',
    category: 'frontend',
    level: 'Core',
    marketDemand: 90,
    averageSalary: '$155,000',
    connections: ['react19-fullstack'],
    verifiedByYou: true,
  },

  // Backend & Cloud
  {
    id: 'nodejs-backend',
    name: 'Node.js & Express / NestJS',
    category: 'backend',
    level: 'Advanced',
    marketDemand: 91,
    averageSalary: '$165,000',
    connections: ['typescript-core', 'postgres-pgvector', 'redis-caching', 'docker-k8s'],
    verifiedByYou: true,
  },
  {
    id: 'postgres-pgvector',
    name: 'PostgreSQL & pgvector Sharding',
    category: 'backend',
    level: 'Advanced',
    marketDemand: 93,
    averageSalary: '$178,000',
    connections: ['nodejs-backend', 'rag-pipelines', 'redis-caching'],
    verifiedByYou: false,
  },
  {
    id: 'redis-caching',
    name: 'Redis Distributed Caching',
    category: 'backend',
    level: 'Advanced',
    marketDemand: 89,
    averageSalary: '$168,000',
    connections: ['nodejs-backend', 'system-design'],
    verifiedByYou: true,
  },
  {
    id: 'docker-k8s',
    name: 'Kubernetes & Docker Microservices',
    category: 'cloud',
    level: 'Advanced',
    marketDemand: 95,
    averageSalary: '$185,000',
    connections: ['nodejs-backend', 'system-design', 'zero-trust'],
    verifiedByYou: false,
  },

  // System Design & Security
  {
    id: 'system-design',
    name: 'High-Throughput System Design',
    category: 'system_design',
    level: 'Mastery',
    marketDemand: 97,
    averageSalary: '$210,000',
    connections: ['docker-k8s', 'redis-caching', 'zero-trust'],
    verifiedByYou: true,
  },
  {
    id: 'zero-trust',
    name: 'Zero-Trust Security & OAuth2',
    category: 'security',
    level: 'Advanced',
    marketDemand: 92,
    averageSalary: '$180,000',
    connections: ['system-design', 'docker-k8s'],
    verifiedByYou: true,
  },
];

interface SkillIntelligenceGraphProps {
  onVerifySkill?: (skillName: string) => void;
  onExploreJobMatches?: (skillName: string) => void;
}

export const SkillIntelligenceGraph: React.FC<SkillIntelligenceGraphProps> = ({
  onVerifySkill,
  onExploreJobMatches,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedNode, setSelectedNode] = useState<SkillGraphNode>(GLOBAL_SKILL_NODES[0]);

  // Filtering
  const filteredNodes = GLOBAL_SKILL_NODES.filter((node) => {
    const matchesCategory = selectedCategory === 'all' || node.category === selectedCategory;
    const matchesSearch = node.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Get connected nodes for selected node
  const connectedNodes = GLOBAL_SKILL_NODES.filter((node) =>
    selectedNode.connections.includes(node.id)
  );

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-2xl bg-gradient-to-r from-indigo-950/40 via-slate-900/60 to-slate-900/80 border border-indigo-500/20 backdrop-blur-xl">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-cyan-600/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
            <Share2 className="w-7 h-7" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold tracking-tight text-white">
                Global Skill Intelligence Graph
              </h1>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
                LIVE MARKET GRAPH
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-1 max-w-xl">
              Deconstructed ontology of real-world software engineering competencies, prerequisite dependency DAGs, and market valuation signals.
            </p>
          </div>
        </div>

        {/* Search & Category Filter */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search graph nodes..."
              className="bg-slate-900 border border-slate-750 rounded-xl pl-9 pr-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 w-full sm:w-48"
            />
          </div>

          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="bg-slate-900 border border-slate-750 text-slate-200 text-xs rounded-xl px-3 py-1.5 focus:outline-none focus:border-cyan-500 cursor-pointer"
          >
            <option value="all">All Domains</option>
            <option value="ai">Generative AI / ML</option>
            <option value="frontend">Frontend & Spatial</option>
            <option value="backend">Backend & DB</option>
            <option value="cloud">Cloud & DevOps</option>
            <option value="system_design">System Design</option>
            <option value="security">Security & Zero-Trust</option>
          </select>
        </div>
      </div>

      {/* Main Interactive Graph & Detail Inspector */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Graph Node Canvas Area */}
        <div className="lg:col-span-8 p-6 rounded-2xl bg-slate-900/60 border border-slate-800 backdrop-blur-md">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Layers className="w-4 h-4 text-indigo-400" />
              Skill Node Matrix ({filteredNodes.length} Active Nodes)
            </h3>
            <span className="text-xs font-mono text-slate-400">Click node to inspect dependency cluster</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3">
            {filteredNodes.map((node) => {
              const isSelected = selectedNode.id === node.id;
              return (
                <div
                  key={node.id}
                  onClick={() => setSelectedNode(node)}
                  className={`p-4 rounded-xl border text-left transition-all cursor-pointer relative overflow-hidden group ${
                    isSelected
                      ? 'bg-indigo-950/40 border-indigo-500 shadow-lg shadow-indigo-500/10'
                      : 'bg-slate-800/40 border-slate-700/60 hover:border-slate-600 hover:bg-slate-800/80'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <span
                      className={`text-[10px] font-mono px-2 py-0.5 rounded uppercase ${
                        node.category === 'ai'
                          ? 'bg-purple-500/10 text-purple-300 border border-purple-500/30'
                          : node.category === 'frontend'
                          ? 'bg-cyan-500/10 text-cyan-300 border border-cyan-500/30'
                          : node.category === 'cloud'
                          ? 'bg-amber-500/10 text-amber-300 border border-amber-500/30'
                          : 'bg-emerald-500/10 text-emerald-300 border border-emerald-500/30'
                      }`}
                    >
                      {node.category.replace('_', ' ')}
                    </span>

                    {node.verifiedByYou && (
                      <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
                        <ShieldCheck className="w-3 h-3" /> VERIFIED
                      </span>
                    )}
                  </div>

                  <h4 className="text-sm font-semibold text-white group-hover:text-cyan-300 transition-colors mb-1">
                    {node.name}
                  </h4>

                  <div className="flex items-center justify-between text-xs text-slate-400 mt-3 pt-2 border-t border-slate-750/60">
                    <span className="font-mono text-emerald-400">{node.averageSalary}</span>
                    <span className="font-mono text-indigo-400 font-semibold">{node.marketDemand}% Demand</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Node Inspector & Dependency Sub-graph */}
        <div className="lg:col-span-4 space-y-4">
          <div className="p-6 rounded-2xl bg-slate-900/60 border border-indigo-500/20 backdrop-blur-md">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-mono text-cyan-400 uppercase tracking-wider">
                NODE METADATA
              </span>
              {selectedNode.verifiedByYou ? (
                <span className="text-xs text-emerald-400 font-mono flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" /> In Your Passport
                </span>
              ) : (
                <span className="text-xs text-amber-400 font-mono">Unverified Candidate Skill</span>
              )}
            </div>

            <h3 className="text-lg font-bold text-white mb-1">{selectedNode.name}</h3>
            <p className="text-xs text-slate-400 mb-4">
              Competency Tier: <span className="text-white font-semibold">{selectedNode.level}</span>
            </p>

            <div className="space-y-3 p-4 rounded-xl bg-slate-800/40 border border-slate-750 mb-4 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-400">Market Demand Index:</span>
                <span className="font-mono font-bold text-cyan-400">{selectedNode.marketDemand} / 100</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Median Tech Salary:</span>
                <span className="font-mono font-bold text-emerald-400">{selectedNode.averageSalary}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Connected Hubs:</span>
                <span className="font-mono font-bold text-indigo-400">{selectedNode.connections.length} edges</span>
              </div>
            </div>

            {/* Connected Node Clusters */}
            <div className="mb-6">
              <h5 className="text-xs font-mono font-semibold text-slate-300 uppercase tracking-wider mb-2">
                CONNECTED DEPENDENCY GRAPH:
              </h5>
              <div className="space-y-2">
                {connectedNodes.map((conn) => (
                  <button
                    key={conn.id}
                    onClick={() => setSelectedNode(conn)}
                    className="w-full text-left p-2.5 rounded-lg bg-slate-800/60 hover:bg-slate-800 border border-slate-700/60 hover:border-indigo-500/40 flex items-center justify-between transition-all cursor-pointer group"
                  >
                    <div>
                      <p className="text-xs font-medium text-white group-hover:text-indigo-300">
                        {conn.name}
                      </p>
                      <p className="text-[10px] text-slate-400">{conn.averageSalary}</p>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-indigo-400 transition-transform group-hover:translate-x-0.5" />
                  </button>
                ))}
              </div>
            </div>

            {/* Action buttons */}
            <div className="space-y-2">
              {onVerifySkill && (
                <button
                  onClick={() => onVerifySkill(selectedNode.name)}
                  className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-lg shadow-indigo-600/30"
                >
                  <ShieldCheck className="w-4 h-4" />
                  Take Assessment for {selectedNode.name}
                </button>
              )}

              {onExploreJobMatches && (
                <button
                  onClick={() => onExploreJobMatches(selectedNode.name)}
                  className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                >
                  <Briefcase className="w-4 h-4" />
                  View Matching Jobs ({selectedNode.marketDemand}+ postings)
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
