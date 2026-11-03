import React, { useState } from 'react';
import {
  Shield,
  ShieldCheck,
  Key,
  Lock,
  Terminal,
  Activity,
  AlertTriangle,
  Copy,
  Plus,
  RefreshCw,
  CheckCircle,
} from 'lucide-react';

interface AuditLogEntry {
  id: string;
  timestamp: string;
  actor: string;
  action: string;
  ipAddress: string;
  status: 'allowed' | 'challenged' | 'blocked';
  digest: string;
}

export const SecurityConsole: React.FC = () => {
  const [apiKey, setApiKey] = useState<string>('sk_live_sync_48f93a10c92bb8401e');
  const [copiedKey, setCopiedKey] = useState<boolean>(false);
  const [rateLimitUsage, setRateLimitUsage] = useState<number>(42); // 42%

  const auditLogs: AuditLogEntry[] = [
    {
      id: 'log-1',
      timestamp: '10:24:12 AM',
      actor: 'candidate:user-001',
      action: 'EXPORT_VERIFIABLE_SKILL_PASSPORT',
      ipAddress: '192.168.1.1 (Encrypted Egress)',
      status: 'allowed',
      digest: 'SHA256:7a4b...e019',
    },
    {
      id: 'log-2',
      timestamp: '10:21:45 AM',
      actor: 'agent:planner-01',
      action: 'DECOMPOSE_TASK_DEPENDENCIES',
      ipAddress: 'mesh:internal-worker',
      status: 'allowed',
      digest: 'SHA256:39f2...81cc',
    },
    {
      id: 'log-3',
      timestamp: '10:18:02 AM',
      actor: 'recruiter:org-tier1',
      action: 'BLIND_CANDIDATE_SEARCH_QUERY',
      ipAddress: '104.28.19.4',
      status: 'allowed',
      digest: 'SHA256:10de...44aa',
    },
    {
      id: 'log-4',
      timestamp: '10:04:19 AM',
      actor: 'guest:unauthenticated',
      action: 'FIRESTORE_WRITE_BLOCKED',
      ipAddress: '45.12.98.2',
      status: 'blocked',
      digest: 'SHA256:f812...90aa',
    },
  ];

  const handleCopyKey = () => {
    navigator.clipboard?.writeText(apiKey);
    setCopiedKey(true);
    setTimeout(() => setCopiedKey(false), 2000);
  };

  const handleRegenerateKey = () => {
    const newKey = `sk_live_sync_${Math.random().toString(36).slice(2, 10)}${Math.random().toString(36).slice(2, 10)}`;
    setApiKey(newKey);
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-2xl bg-gradient-to-r from-indigo-950/40 via-slate-900/60 to-slate-900/80 border border-indigo-500/20 backdrop-blur-xl">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-cyan-600/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
            <Shield className="w-7 h-7" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold tracking-tight text-white">
                Enterprise Zero-Trust Security & API Sandbox
              </h1>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                SOC2 / GDPR COMPLIANT
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-1 max-w-xl">
              End-to-end cryptographic provenance, immutable audit trails, and developer API key governance.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-right">
            <p className="text-xs font-mono text-slate-400">SECURITY POSTURE</p>
            <p className="text-2xl font-bold font-mono text-emerald-400">98 / 100</p>
          </div>
          <div className="w-px h-10 bg-slate-800" />
          <div className="text-right">
            <p className="text-xs font-mono text-slate-400">ENCRYPTION</p>
            <p className="text-2xl font-bold font-mono text-cyan-400">AES-256</p>
          </div>
        </div>
      </div>

      {/* Grid: Developer API Sandbox vs Live Audit Trail */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Developer API Sandbox */}
        <div className="lg:col-span-5 space-y-4">
          <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 backdrop-blur-md">
            <h3 className="text-sm font-bold text-white mb-2 flex items-center gap-2">
              <Key className="w-4 h-4 text-cyan-400" />
              Developer API Key Governance
            </h3>
            <p className="text-xs text-slate-400 mb-4">
              Integrate SkillSync AI verification pipelines directly into external ATS or CI/CD systems.
            </p>

            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs mb-4">
              <span className="text-[10px] text-slate-500 block mb-1">LIVE PRODUCTION API SECRET:</span>
              <div className="flex items-center justify-between gap-2">
                <span className="text-cyan-300 truncate">{apiKey}</span>
                <button
                  onClick={handleCopyKey}
                  className="text-slate-400 hover:text-white cursor-pointer shrink-0"
                  title="Copy Key"
                >
                  <Copy className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            <div className="flex gap-2 mb-6">
              <button
                onClick={handleRegenerateKey}
                className="flex-1 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs text-slate-200 font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer"
              >
                <RefreshCw className="w-3.5 h-3.5" /> Regenerate Key
              </button>
            </div>

            {/* Rate Limiting */}
            <div className="space-y-2 border-t border-slate-800 pt-4 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-400">Rate Limit Quota (10k req/day):</span>
                <span className="font-mono text-indigo-400 font-bold">{rateLimitUsage}% Used</span>
              </div>
              <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-indigo-500 h-full rounded-full transition-all"
                  style={{ width: `${rateLimitUsage}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Real-time Zero-Trust Audit Stream */}
        <div className="lg:col-span-7 p-6 rounded-2xl bg-slate-900/60 border border-slate-800 backdrop-blur-md">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Activity className="w-4 h-4 text-emerald-400" />
              Cryptographic Audit Stream
            </h3>
            <span className="text-xs font-mono text-emerald-400 flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" /> Zero Tampering Detected
            </span>
          </div>

          <div className="space-y-2.5 font-mono text-xs">
            {auditLogs.map((log) => (
              <div
                key={log.id}
                className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-2"
              >
                <div>
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="text-slate-400 text-[11px]">{log.timestamp}</span>
                    <span className="text-white font-semibold">{log.action}</span>
                  </div>
                  <span className="text-[11px] text-slate-500">
                    Actor: {log.actor} • IP: {log.ipAddress}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-[10px] text-slate-500">{log.digest}</span>
                  <span
                    className={`text-[10px] px-2 py-0.5 rounded font-bold uppercase ${
                      log.status === 'allowed'
                        ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                        : 'bg-rose-500/10 text-rose-400 border border-rose-500/30'
                    }`}
                  >
                    {log.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
