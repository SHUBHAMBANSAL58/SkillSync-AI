import React from 'react';
import {
  LayoutDashboard,
  Cpu,
  FileText,
  Briefcase,
  Kanban,
  ShieldCheck,
  Video,
  MessageSquare,
  FolderGit2,
  Compass,
  BookOpen,
  Award,
  Users,
  Calendar,
  Shield,
  ChevronLeft,
  ChevronRight,
  X,
  Sparkles,
  Brain,
  Share2,
  Rocket,
  TrendingUp,
  Lock,
} from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  onNavigate: (tabId: string) => void;
  collapsed: boolean;
  onToggleCollapse: () => void;
  mobileOpen?: boolean;
  onCloseMobile?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  onNavigate,
  collapsed,
  onToggleCollapse,
  mobileOpen = false,
  onCloseMobile,
}) => {
  const navSections = [
    {
      category: 'Command Core',
      items: [
        { id: 'holographic-centre', label: 'NOVA 3D Holographic Core', icon: Sparkles, badge: 'JARVIS', highlight: true },
        { id: 'dashboard', label: 'Smart Dashboard', icon: LayoutDashboard, badge: 'M1' },
        { id: 'agent-centre', label: '10-Agent Command Centre', icon: Cpu, badge: '10-AI', highlight: true },
        { id: 'multi-llm-rag', label: 'Multi-LLM & GraphRAG Engine', icon: Share2, badge: 'GraphRAG', highlight: true },
      ],
    },
    {
      category: 'Career Intelligence & Twin',
      items: [
        { id: 'digital-twin', label: 'Career Digital Twin 4.0', icon: Brain, badge: 'Twin' },
        { id: 'skill-graph', label: 'Global Skill Graph', icon: Share2, badge: 'Graph' },
        { id: 'resume-lab', label: 'Resume Lab & ATS AI', icon: FileText, badge: 'M3/15' },
        { id: 'job-match', label: 'Job Match & Radar', icon: Briefcase, badge: 'M4/11' },
      ],
    },
    {
      category: 'Verification & Practice',
      items: [
        { id: 'skill-verification', label: 'Skill Verification Centre', icon: ShieldCheck, badge: 'M5/10' },
        { id: 'interview-arena', label: 'AI Interview Arena 2.0', icon: Video, badge: 'M9' },
        { id: 'career-mentor', label: 'AI Career Mentor (Gemini)', icon: MessageSquare, badge: 'M8' },
      ],
    },
    {
      category: 'Marketplace & Architecture',
      items: [
        { id: 'talent-marketplace', label: 'Talent Marketplace & Passport', icon: Award, badge: 'Merit' },
        { id: 'project-cofounder', label: 'AI Project Co-Founder', icon: Rocket, badge: 'Architect' },
        { id: 'project-studio', label: 'Project Studio & Assets', icon: FolderGit2, badge: 'M14' },
      ],
    },
    {
      category: 'Enterprise & Progress',
      items: [
        { id: 'saas-analytics', label: 'Unicorn SaaS BI Hub', icon: TrendingUp, badge: 'BI' },
        { id: 'security-console', label: 'Zero-Trust Security & API', icon: Lock, badge: 'SOC2' },
        { id: 'career-dna', label: 'Career DNA Diagnostic', icon: Compass, badge: 'M2' },
        { id: 'roadmap', label: 'AI Learning Roadmap', icon: BookOpen, badge: 'M7' },
        { id: 'reports', label: 'Reports & Achievements', icon: Award, badge: 'M16' },
        { id: 'peer', label: 'Peer Learning Squads', icon: Users, badge: '5.10' },
        { id: 'calendar', label: 'Career Calendar', icon: Calendar, badge: '5.9' },
        { id: 'admin', label: 'Platform Admin', icon: Shield, badge: 'M17' },
      ],
    },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {mobileOpen && (
        <div
          onClick={onCloseMobile}
          className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm md:hidden animate-fadeIn"
        />
      )}

      <aside
        className={`fixed md:relative inset-y-0 left-0 z-50 md:z-30 flex flex-col bg-[#080B18] md:bg-[#080B18]/95 border-r border-indigo-500/15 backdrop-blur-xl transition-all duration-300 ${
          mobileOpen ? 'translate-x-0 w-72' : '-translate-x-full md:translate-x-0'
        } ${collapsed ? 'md:w-20' : 'md:w-64'}`}
      >
        {/* Mobile Close Button */}
        <div className="flex md:hidden items-center justify-between p-4 border-b border-slate-800">
          <span className="text-xs font-bold text-white">Menu Navigation</span>
          <button
            onClick={onCloseMobile}
            className="p-1 rounded-lg text-slate-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Desktop Collapse Toggle Button */}
        <button
          onClick={onToggleCollapse}
          className="hidden md:flex absolute -right-3 top-5 z-40 w-6 h-6 rounded-full bg-slate-900 border border-indigo-500/30 text-slate-300 hover:text-white items-center justify-center text-xs shadow-md cursor-pointer transition-all"
          title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {collapsed ? <ChevronRight className="w-3.5 h-3.5" /> : <ChevronLeft className="w-3.5 h-3.5" />}
        </button>

        {/* Nav Menu Content */}
        <div className="flex-1 overflow-y-auto px-3 py-4 space-y-6">
          {navSections.map((sec, secIdx) => (
            <div key={secIdx} className="space-y-1">
              {(!collapsed || mobileOpen) && (
                <div className="text-[10px] uppercase font-bold tracking-wider text-slate-500 px-3 pb-1">
                  {sec.category}
                </div>
              )}

              <div className="space-y-1">
                {sec.items.map((item) => {
                  const isActive = activeTab === item.id;
                  const IconComponent = item.icon;
                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        onNavigate(item.id);
                        onCloseMobile?.();
                      }}
                      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer text-left group ${
                        isActive
                          ? item.highlight
                            ? 'bg-gradient-to-r from-indigo-600/30 to-cyan-600/30 border border-cyan-400 text-white shadow-md'
                            : 'bg-indigo-600/25 border border-indigo-500/50 text-white shadow-sm'
                          : item.highlight
                          ? 'text-cyan-300 hover:bg-slate-900/80 hover:text-white'
                          : 'text-slate-400 hover:bg-slate-900/70 hover:text-slate-200'
                      }`}
                      title={collapsed && !mobileOpen ? item.label : undefined}
                    >
                      <IconComponent
                        className={`w-4 h-4 shrink-0 transition-transform group-hover:scale-110 ${
                          isActive
                            ? item.highlight
                              ? 'text-cyan-300'
                              : 'text-indigo-400'
                            : item.highlight
                            ? 'text-cyan-400'
                            : 'text-slate-400 group-hover:text-slate-200'
                        }`}
                      />

                      {(!collapsed || mobileOpen) && (
                        <div className="flex-1 flex items-center justify-between truncate">
                          <span className="truncate">{item.label}</span>
                          {item.badge && (
                            <span
                              className={`text-[9px] font-mono px-1.5 py-0.2 rounded font-medium ${
                                isActive
                                  ? 'bg-indigo-500/20 text-cyan-300'
                                  : 'bg-slate-900 text-slate-500 border border-slate-800'
                              }`}
                            >
                              {item.badge}
                            </span>
                          )}
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Footer system status */}
        {(!collapsed || mobileOpen) && (
          <div className="p-3 border-t border-indigo-500/10 text-[10px] text-slate-500 space-y-1">
            <div className="flex items-center justify-between">
              <span>SkillSync Core</span>
              <span className="text-emerald-400 font-mono">v4.0.0 Online</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Firebase Firestore</span>
              <span className="text-indigo-400 font-mono">Connected</span>
            </div>
          </div>
        )}
      </aside>
    </>
  );
};
