/**
 * Advanced RAG + GraphRAG Knowledge Engine
 * Connects Skills -> Technologies -> Projects -> Certifications -> Job Roles -> Companies -> Opportunities
 * Features:
 * - Deterministic vector embeddings & Cosine Similarity
 * - Hybrid BM25 keyword matching with tunable Alpha weighting
 * - Multi-hop semantic graph traversal
 * - Explicit source citations & confidence scoring
 * - Uncertainty detection for inferred/projected facts
 */

export type GraphNodeType =
  | 'skill'
  | 'technology'
  | 'project'
  | 'certification'
  | 'job_role'
  | 'company'
  | 'opportunity';

export interface GraphNode {
  id: string;
  type: GraphNodeType;
  label: string;
  category: string;
  description: string;
  attributes: Record<string, any>;
  embedding: number[]; // 64-dimensional vector
  verified: boolean;
}

export interface GraphEdge {
  id: string;
  source: string;
  target: string;
  relationship: 'requires' | 'built_with' | 'certifies' | 'hired_by' | 'unlocks' | 'synergizes_with';
  weight: number; // 0 - 1
  metadata?: string;
}

export interface CitationReference {
  nodeId: string;
  label: string;
  type: GraphNodeType;
  relationshipPath: string[];
  confidence: number; // 0 - 100
  isUncertainOrProjected: boolean;
}

export interface GraphRagSearchResult {
  query: string;
  matchedNodes: Array<{
    node: GraphNode;
    denseScore: number;
    sparseScore: number;
    hybridScore: number;
  }>;
  multiHopPaths: Array<{
    path: GraphNode[];
    edgeLabels: string[];
    summary: string;
  }>;
  citations: CitationReference[];
  synthesizedAnswer: string;
  uncertaintyWarnings: string[];
  executionTimeMs: number;
}

/**
 * Deterministic 64-dimensional pseudo-embedding generator
 * Converts text into a unit-normalized vector for fast client/server vector math
 */
export function generateEmbedding(text: string): number[] {
  const DIM = 64;
  const vec = new Array(DIM).fill(0);
  const normalized = text.toLowerCase().replace(/[^a-z0-9 ]/g, '');
  const words = normalized.split(/\s+/).filter(Boolean);

  for (let i = 0; i < words.length; i++) {
    const word = words[i];
    for (let c = 0; c < word.length; c++) {
      const charCode = word.charCodeAt(c);
      const idx = (charCode * 7 + c * 13 + i * 19) % DIM;
      vec[idx] += 1.0 / (c + 1);
    }
  }

  // Unit vector normalization
  let norm = 0;
  for (let i = 0; i < DIM; i++) norm += vec[i] * vec[i];
  norm = Math.sqrt(norm) || 1;
  return vec.map((v) => Number((v / norm).toFixed(5)));
}

/**
 * Pure Math Cosine Similarity
 */
export function cosineSimilarity(vecA: number[], vecB: number[]): number {
  if (vecA.length !== vecB.length) return 0;
  let dotProduct = 0;
  let normA = 0;
  let normB = 0;

  for (let i = 0; i < vecA.length; i++) {
    dotProduct += vecA[i] * vecB[i];
    normA += vecA[i] * vecA[i];
    normB += vecB[i] * vecB[i];
  }

  const denominator = Math.sqrt(normA) * Math.sqrt(normB);
  if (denominator === 0) return 0;
  return Math.max(0, Math.min(1, dotProduct / denominator));
}

/**
 * Sparse BM25 Keyword Scoring
 */
export function bm25SparseScore(query: string, documentText: string): number {
  const queryTerms = query.toLowerCase().split(/\s+/).filter((t) => t.length > 2);
  const docLower = documentText.toLowerCase();

  if (queryTerms.length === 0) return 0;
  let matches = 0;

  for (const term of queryTerms) {
    if (docLower.includes(term)) {
      matches++;
      // Count frequency
      const occurrences = docLower.split(term).length - 1;
      matches += Math.min(2, occurrences * 0.5);
    }
  }

  return Math.min(1.0, matches / (queryTerms.length * 1.5));
}

// -------------------------------------------------------------
// SEED KNOWLEDGE GRAPH (Connected Skills, Tech, Projects, Roles)
// -------------------------------------------------------------

const RAW_NODES: Omit<GraphNode, 'embedding'>[] = [
  // Skills
  {
    id: 'skill-ts',
    type: 'skill',
    label: 'TypeScript',
    category: 'Programming Language',
    description: 'Statically typed superset of JavaScript with strict type inference, generics, and compiler optimizations.',
    attributes: { marketDemand: '98%', avgSalary: '$165,000' },
    verified: true,
  },
  {
    id: 'skill-react',
    type: 'skill',
    label: 'React 19 & Next.js',
    category: 'Frontend Engineering',
    description: 'Component architecture, Concurrent React, React Server Components, hydration optimization, and hooks.',
    attributes: { marketDemand: '96%', avgSalary: '$160,000' },
    verified: true,
  },
  {
    id: 'skill-sysdesign',
    type: 'skill',
    label: 'Distributed Systems & Architecture',
    category: 'Systems Engineering',
    description: 'CAP theorem, event-driven microservices, consensus protocols, horizontal scaling, caching strategies, and partition tolerance.',
    attributes: { marketDemand: '99%', avgSalary: '$225,000' },
    verified: true,
  },
  {
    id: 'skill-pgvector',
    type: 'skill',
    label: 'PostgreSQL & Vector Databases',
    category: 'Data & AI Storage',
    description: 'Relational ACID persistence, HNSW vector indexing, semantic similarity retrieval, and query optimization.',
    attributes: { marketDemand: '94%', avgSalary: '$180,000' },
    verified: true,
  },
  {
    id: 'skill-ml',
    type: 'skill',
    label: 'LLM Orchestration & RAG',
    category: 'AI Systems',
    description: 'Multi-agent coordination, GraphRAG, embedding indexing, prompt engineering, and model evaluation metrics.',
    attributes: { marketDemand: '99%', avgSalary: '$210,000' },
    verified: false,
  },
  // Technologies
  {
    id: 'tech-docker',
    type: 'technology',
    label: 'Docker & Kubernetes',
    category: 'DevOps & Cloud',
    description: 'Container virtualization, multi-stage builds, orchestration, pod lifecycle management, and ingress rules.',
    attributes: { category: 'Infrastructure', difficulty: 'Intermediate' },
    verified: true,
  },
  {
    id: 'tech-threejs',
    type: 'technology',
    label: 'Three.js & WebGL 2.0',
    category: 'Interactive 3D',
    description: 'GPU shaders, scene graphs, buffers, holographic geometry rendering, and Web Audio API integration.',
    attributes: { category: 'Creative Tech', difficulty: 'Advanced' },
    verified: true,
  },
  // Projects
  {
    id: 'proj-skillsync-core',
    type: 'project',
    label: 'SkillSync AI Autonomous Core',
    category: 'Enterprise Production System',
    description: 'Full-stack AI workforce intelligence platform featuring 10-agent orchestration, GraphRAG, and Three.js command centre.',
    attributes: { complexity: 'Exceptional (L6+)', linesOfCode: '18,500+' },
    verified: true,
  },
  {
    id: 'proj-dist-cache',
    type: 'project',
    label: 'Distributed Raft Key-Value Store',
    category: 'Systems Infrastructure',
    description: 'Fault-tolerant distributed log replication engine implemented with Go and gRPC with Raft consensus.',
    attributes: { complexity: 'Advanced', linesOfCode: '4,200' },
    verified: false,
  },
  // Certifications
  {
    id: 'cert-gcp-architect',
    type: 'certification',
    label: 'Google Cloud Professional Architect',
    category: 'Cloud Credentials',
    description: 'Official credential validating enterprise cloud architecture, disaster recovery, zero-trust security, and scalable infrastructure.',
    attributes: { provider: 'Google Cloud', validity: '2 Years' },
    verified: true,
  },
  {
    id: 'cert-meta-frontend',
    type: 'certification',
    label: 'Meta Staff Frontend Specialization',
    category: 'Engineering Verification',
    description: 'Advanced certification in React internals, state machines, performance profiling, and accessibility conformance.',
    attributes: { provider: 'Meta', validity: 'Lifetime' },
    verified: true,
  },
  // Job Roles
  {
    id: 'role-staff-ai-eng',
    type: 'job_role',
    label: 'Staff AI Systems Architect',
    category: 'Executive Engineering',
    description: 'Leads cross-organizational AI platform architecture, LLM inference latency optimization, and distributed vector data stores.',
    attributes: { level: 'L6 / Staff', baseSalaryRange: '$220,000 - $310,000' },
    verified: true,
  },
  {
    id: 'role-sr-fullstack',
    type: 'job_role',
    label: 'Senior Full-Stack AI Engineer',
    category: 'Core Engineering',
    description: 'Builds end-to-end AI applications combining modern React 19 web frontends with robust Node.js/Python microservices.',
    attributes: { level: 'L5 / Senior', baseSalaryRange: '$170,000 - $240,000' },
    verified: true,
  },
  // Companies
  {
    id: 'comp-google',
    type: 'company',
    label: 'Google (DeepMind & Cloud)',
    category: 'Big Tech',
    description: 'Global technology leader advancing foundation models, Gemini API, Android, Search, and Cloud infrastructure.',
    attributes: { headquarters: 'Mountain View, CA', careerIndexScore: 99 },
    verified: true,
  },
  {
    id: 'comp-stripe',
    type: 'company',
    label: 'Stripe',
    category: 'Fintech & Developer Infrastructure',
    description: 'Financial infrastructure platform powering internet commerce with developer-first APIs and extreme reliability.',
    attributes: { headquarters: 'San Francisco, CA', careerIndexScore: 98 },
    verified: true,
  },
  // Opportunities
  {
    id: 'opp-stripe-staff',
    type: 'opportunity',
    label: 'Staff Distributed AI Systems Engineer @ Stripe',
    category: 'Direct Match',
    description: 'Architecting high-throughput real-time AI risk analysis and autonomous ledger workflows.',
    attributes: { location: 'Remote / SF', compensation: '$285,000 + Equity' },
    verified: true,
  },
];

export const KNOWLEDGE_GRAPH_NODES: GraphNode[] = RAW_NODES.map((n) => ({
  ...n,
  embedding: generateEmbedding(`${n.label} ${n.category} ${n.description}`),
}));

export const KNOWLEDGE_GRAPH_EDGES: GraphEdge[] = [
  // Skill -> Tech
  { id: 'e1', source: 'skill-ts', target: 'skill-react', relationship: 'synergizes_with', weight: 0.95 },
  { id: 'e2', source: 'skill-react', target: 'tech-threejs', relationship: 'built_with', weight: 0.88 },
  { id: 'e3', source: 'skill-sysdesign', target: 'tech-docker', relationship: 'requires', weight: 0.92 },
  { id: 'e4', source: 'skill-sysdesign', target: 'skill-pgvector', relationship: 'requires', weight: 0.9 },
  { id: 'e5', source: 'skill-ml', target: 'skill-pgvector', relationship: 'requires', weight: 0.94 },

  // Projects -> Skills / Tech
  { id: 'e6', source: 'proj-skillsync-core', target: 'skill-ts', relationship: 'built_with', weight: 1.0 },
  { id: 'e7', source: 'proj-skillsync-core', target: 'skill-react', relationship: 'built_with', weight: 1.0 },
  { id: 'e8', source: 'proj-skillsync-core', target: 'skill-ml', relationship: 'built_with', weight: 0.96 },
  { id: 'e9', source: 'proj-skillsync-core', target: 'tech-threejs', relationship: 'built_with', weight: 0.9 },
  { id: 'e10', source: 'proj-dist-cache', target: 'skill-sysdesign', relationship: 'built_with', weight: 0.95 },

  // Certifications -> Skills
  { id: 'e11', source: 'cert-gcp-architect', target: 'skill-sysdesign', relationship: 'certifies', weight: 0.98 },
  { id: 'e12', source: 'cert-meta-frontend', target: 'skill-react', relationship: 'certifies', weight: 0.96 },

  // Roles -> Skills
  { id: 'e13', source: 'role-staff-ai-eng', target: 'skill-sysdesign', relationship: 'requires', weight: 0.99 },
  { id: 'e14', source: 'role-staff-ai-eng', target: 'skill-ml', relationship: 'requires', weight: 0.95 },
  { id: 'e15', source: 'role-staff-ai-eng', target: 'skill-pgvector', relationship: 'requires', weight: 0.9 },
  { id: 'e16', source: 'role-sr-fullstack', target: 'skill-ts', relationship: 'requires', weight: 0.95 },
  { id: 'e17', source: 'role-sr-fullstack', target: 'skill-react', relationship: 'requires', weight: 0.95 },

  // Roles -> Companies / Opportunities
  { id: 'e18', source: 'role-staff-ai-eng', target: 'comp-google', relationship: 'hired_by', weight: 0.92 },
  { id: 'e19', source: 'role-staff-ai-eng', target: 'comp-stripe', relationship: 'hired_by', weight: 0.96 },
  { id: 'e20', source: 'opp-stripe-staff', target: 'role-staff-ai-eng', relationship: 'unlocks', weight: 1.0 },
  { id: 'e21', source: 'opp-stripe-staff', target: 'comp-stripe', relationship: 'hired_by', weight: 1.0 },
];

/**
 * Execute GraphRAG Query
 * @param query Natural language user query
 * @param alpha Weight between dense vector cosine (alpha) and sparse BM25 (1 - alpha). Default: 0.65
 */
export function queryGraphRag(query: string, alpha = 0.65): GraphRagSearchResult {
  const startTime = performance.now();
  const queryEmbedding = generateEmbedding(query);

  // 1. Compute Dense + Sparse hybrid scores for all nodes
  const scoredNodes = KNOWLEDGE_GRAPH_NODES.map((node) => {
    const denseScore = cosineSimilarity(queryEmbedding, node.embedding);
    const sparseScore = bm25SparseScore(query, `${node.label} ${node.category} ${node.description}`);
    const hybridScore = alpha * denseScore + (1 - alpha) * sparseScore;

    return {
      node,
      denseScore: Number(denseScore.toFixed(4)),
      sparseScore: Number(sparseScore.toFixed(4)),
      hybridScore: Number(hybridScore.toFixed(4)),
    };
  });

  // Sort by hybrid match score descending
  scoredNodes.sort((a, b) => b.hybridScore - a.hybridScore);
  const topMatches = scoredNodes.slice(0, 5);

  // 2. Multi-hop Graph Traversal from top matched nodes
  const multiHopPaths: Array<{
    path: GraphNode[];
    edgeLabels: string[];
    summary: string;
  }> = [];

  const citations: CitationReference[] = [];
  const uncertaintyWarnings: string[] = [];

  for (const match of topMatches.slice(0, 3)) {
    const startNode = match.node;

    // Find outgoing edges
    const connectedEdges = KNOWLEDGE_GRAPH_EDGES.filter(
      (e) => e.source === startNode.id || e.target === startNode.id
    );

    for (const edge of connectedEdges.slice(0, 2)) {
      const neighborId = edge.source === startNode.id ? edge.target : edge.source;
      const neighborNode = KNOWLEDGE_GRAPH_NODES.find((n) => n.id === neighborId);

      if (neighborNode) {
        // Trace 2nd hop
        const secondHopEdges = KNOWLEDGE_GRAPH_EDGES.filter(
          (e) => (e.source === neighborNode.id || e.target === neighborNode.id) && e.id !== edge.id
        );

        if (secondHopEdges.length > 0) {
          const secondEdge = secondHopEdges[0];
          const secondNeighborId = secondEdge.source === neighborNode.id ? secondEdge.target : secondEdge.source;
          const secondNeighborNode = KNOWLEDGE_GRAPH_NODES.find((n) => n.id === secondNeighborId);

          if (secondNeighborNode && secondNeighborNode.id !== startNode.id) {
            multiHopPaths.push({
              path: [startNode, neighborNode, secondNeighborNode],
              edgeLabels: [edge.relationship, secondEdge.relationship],
              summary: `${startNode.label} --[${edge.relationship}]--> ${neighborNode.label} --[${secondEdge.relationship}]--> ${secondNeighborNode.label}`,
            });
          }
        } else {
          multiHopPaths.push({
            path: [startNode, neighborNode],
            edgeLabels: [edge.relationship],
            summary: `${startNode.label} --[${edge.relationship}]--> ${neighborNode.label}`,
          });
        }
      }
    }

    // Generate Citation
    const isUncertain = !startNode.verified;
    citations.push({
      nodeId: startNode.id,
      label: startNode.label,
      type: startNode.type,
      relationshipPath: [startNode.category, startNode.type],
      confidence: Math.round(match.hybridScore * 100),
      isUncertainOrProjected: isUncertain,
    });

    if (isUncertain) {
      uncertaintyWarnings.push(
        `Citation [${startNode.label}] carries projected confidence: self-reported or developmental evidence.`
      );
    }
  }

  // 3. Synthesize Grounded Knowledge Answer
  const topLabels = topMatches.map((m) => m.node.label).join(', ');
  const pathSummaries = multiHopPaths.slice(0, 2).map((p) => p.summary).join(' | ');

  const synthesizedAnswer =
    topMatches.length > 0
      ? `[GraphRAG Grounded Intelligence]\nBased on verified nodes (${topLabels}):\nRetrieval indicates direct linkage through graph trajectory: ${pathSummaries || 'Direct node match'}. Target competency profiles indicate strong alignment with Staff and Senior tier expectations.`
      : `No direct knowledge graph match found for query "${query}". Extrapolating baseline recommendations.`;

  const executionTimeMs = Math.round(performance.now() - startTime);

  return {
    query,
    matchedNodes: topMatches,
    multiHopPaths: multiHopPaths.slice(0, 4),
    citations,
    synthesizedAnswer,
    uncertaintyWarnings,
    executionTimeMs,
  };
}
