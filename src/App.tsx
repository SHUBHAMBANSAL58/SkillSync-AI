import React, { useState, useEffect } from 'react';
import { Navbar } from './components/common/Navbar';
import { Sidebar } from './components/common/Sidebar';
import { LandingHero } from './components/common/LandingHero';
import { SmartDashboard } from './components/dashboard/SmartDashboard';
import { AgentCommandCentre } from './components/agents/AgentCommandCentre';
import { ResumeLab } from './components/resume/ResumeLab';
import { JobMatchEngine } from './components/jobs/JobMatchEngine';
import { SkillVerificationCentre } from './components/skills/SkillVerificationCentre';
import { InterviewArena } from './components/interview/InterviewArena';
import { AICareerMentor } from './components/mentor/AICareerMentor';
import { ProjectStudio } from './components/portfolio/ProjectStudio';
import { CareerModulesView } from './components/progress/CareerModulesView';
import { HolographicCommandCenter } from './components/nova/HolographicCommandCenter';
import { NovaVisionModal } from './components/nova/NovaVisionModal';
import { CareerDigitalTwin } from './components/twins/CareerDigitalTwin';
import { SkillIntelligenceGraph } from './components/twins/SkillIntelligenceGraph';
import { TalentMarketplace } from './components/marketplace/TalentMarketplace';
import { ProjectCoFounder } from './components/cofounder/ProjectCoFounder';
import { StartupAnalytics } from './components/enterprise/StartupAnalytics';
import { SecurityConsole } from './components/enterprise/SecurityConsole';
import { GraphRagExplorer } from './components/rag/GraphRagExplorer';
import { InteractiveBackground } from './components/common/InteractiveBackground';
import { CustomCursor } from './components/common/CustomCursor';
import { motion, AnimatePresence } from 'motion/react';
import { CINEMATIC_TRANSITION_VARIANTS } from './utils/interaction';

import {
  INITIAL_USER,
  INITIAL_AGENTS,
  INITIAL_RESUMES,
  INITIAL_OPPORTUNITIES,
  INITIAL_APPLICATIONS,
  INITIAL_ASSESSMENTS,
  INITIAL_CHALLENGES,
  INITIAL_PROJECTS,
  INITIAL_ROADMAP,
  INITIAL_CALENDAR,
  INITIAL_NOTIFICATIONS,
  INITIAL_PEER_GROUPS,
  INITIAL_AGENT_TASKS,
  INITIAL_AGENT_LOGS,
  INITIAL_MILESTONES,
} from './utils/initialData';
import {
  auth,
  subscribeToAuth,
  saveUserProfile,
  loadUserProfile,
  saveUserAssessment,
  saveUserApplication,
  saveUserResume,
  saveUserCalendarEvent,
  loadUserResumes,
  loadUserApplications,
} from './services/firebaseService';
import {
  UserProfile,
  ResumeDocument,
  JobOpportunity,
  JobApplication,
  SkillAssessment,
  CodingChallenge,
  InterviewSession,
  PortfolioProject,
  RoadmapNode,
  CalendarEvent,
  AppNotification,
  PeerGroup,
} from './types/career';
import { AgentProfile, AgentTask, AgentLogEntry, DevelopmentMilestone } from './types/agents';

export default function App() {
  // Navigation & UI state
  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showLanding, setShowLanding] = useState(false);
  const [showVisionModal, setShowVisionModal] = useState(false);

  // App Data State
  const [user, setUser] = useState<UserProfile>(() => {
    const saved = localStorage.getItem('skillsync_user');
    return saved ? JSON.parse(saved) : INITIAL_USER;
  });

  const [agents] = useState<AgentProfile[]>(INITIAL_AGENTS);
  const [agentTasks, setAgentTasks] = useState<AgentTask[]>(INITIAL_AGENT_TASKS);
  const [agentLogs, setAgentLogs] = useState<AgentLogEntry[]>(INITIAL_AGENT_LOGS);
  const [milestones] = useState<DevelopmentMilestone[]>(INITIAL_MILESTONES);

  const [resumes, setResumes] = useState<ResumeDocument[]>(INITIAL_RESUMES);
  const [opportunities] = useState<JobOpportunity[]>(INITIAL_OPPORTUNITIES);
  const [applications, setApplications] = useState<JobApplication[]>(INITIAL_APPLICATIONS);
  const [assessments] = useState<SkillAssessment[]>(INITIAL_ASSESSMENTS);
  const [challenges] = useState<CodingChallenge[]>(INITIAL_CHALLENGES);
  const [projects, setProjects] = useState<PortfolioProject[]>(INITIAL_PROJECTS);
  const [roadmap, setRoadmap] = useState<RoadmapNode[]>(INITIAL_ROADMAP);
  const [calendarEvents, setCalendarEvents] = useState<CalendarEvent[]>(INITIAL_CALENDAR);
  const [notifications, setNotifications] = useState<AppNotification[]>(INITIAL_NOTIFICATIONS);
  const [peerGroups] = useState<PeerGroup[]>(INITIAL_PEER_GROUPS);

  // Perceived performance loading state for Firebase retrieval
  const [isDataLoading, setIsDataLoading] = useState<boolean>(true);
  const [isSkeletonModeActive, setIsSkeletonModeActive] = useState<boolean>(false);
  const isDisplayLoading = isDataLoading || isSkeletonModeActive;

  // Sync user state locally, and to Firebase Firestore only when authenticated
  useEffect(() => {
    localStorage.setItem('skillsync_user', JSON.stringify(user));
    if (auth.currentUser && user.id) {
      saveUserProfile(user.id, user).catch((err) => {
        console.warn('Firestore user profile sync warning:', err);
      });
    }
  }, [user]);

  // Firebase auth listener & initial Firestore hydration with skeleton lifecycle
  useEffect(() => {
    setIsDataLoading(true);
    let isMounted = true;

    const unsub = subscribeToAuth(async (firebaseUser) => {
      if (firebaseUser) {
        const uid = firebaseUser.uid;
        try {
          const [remoteProfile, remoteResumes, remoteApps] = await Promise.allSettled([
            loadUserProfile(uid),
            loadUserResumes(uid),
            loadUserApplications(uid),
          ]);

          if (!isMounted) return;

          if (remoteProfile.status === 'fulfilled' && remoteProfile.value) {
            setUser(remoteProfile.value);
          } else {
            setUser((prev) => ({
              ...prev,
              id: uid,
              name: firebaseUser.displayName || prev.name,
              email: firebaseUser.email || prev.email,
              avatarUrl: firebaseUser.photoURL || prev.avatarUrl,
            }));
          }

          if (remoteResumes.status === 'fulfilled' && remoteResumes.value && remoteResumes.value.length > 0) {
            setResumes(remoteResumes.value);
          }

          if (remoteApps.status === 'fulfilled' && remoteApps.value && remoteApps.value.length > 0) {
            setApplications(remoteApps.value);
          }
        } catch (err) {
          console.warn('Firestore hydration error:', err);
        } finally {
          if (isMounted) {
            // Smooth delay to ensure perceived transition without flicker
            setTimeout(() => {
              if (isMounted) setIsDataLoading(false);
            }, 550);
          }
        }
      } else {
        // Unauthenticated or offline: load from local cache/defaults
        setTimeout(() => {
          if (isMounted) setIsDataLoading(false);
        }, 650);
      }
    });

    return () => {
      isMounted = false;
      unsub();
    };
  }, []);

  // Manual refresh handler allowing instant testing/re-triggering of skeleton loading
  const handleRefreshData = async () => {
    setIsDataLoading(true);
    try {
      if (auth.currentUser && user.id) {
        const [remoteProfile, remoteResumes, remoteApps] = await Promise.allSettled([
          loadUserProfile(user.id),
          loadUserResumes(user.id),
          loadUserApplications(user.id),
        ]);

        if (remoteProfile.status === 'fulfilled' && remoteProfile.value) {
          setUser(remoteProfile.value);
        }
        if (remoteResumes.status === 'fulfilled' && remoteResumes.value && remoteResumes.value.length > 0) {
          setResumes(remoteResumes.value);
        }
        if (remoteApps.status === 'fulfilled' && remoteApps.value && remoteApps.value.length > 0) {
          setApplications(remoteApps.value);
        }
      }
    } catch (err) {
      console.warn('Manual refresh error:', err);
    } finally {
      setTimeout(() => {
        setIsDataLoading(false);
      }, 700);
    }
  };

  // Callback to verify a skill from assessments
  const handleVerifySkill = (
    skillName: string,
    score: number,
    level: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert'
  ) => {
    setUser((prev) => {
      const updatedVerified = {
        ...prev.verifiedSkills,
        [skillName]: {
          level,
          score,
          verifiedDate: new Date().toISOString().split('T')[0],
        },
      };

      // Recalculate readiness score
      const skillScores = Object.values(updatedVerified).map((s) => s.score);
      const avg = Math.round(skillScores.reduce((a, b) => a + b, 0) / (skillScores.length || 1));
      const newReadiness = Math.min(100, Math.round(avg * 0.9 + 5));

      const updatedUser: UserProfile = {
        ...prev,
        verifiedSkills: updatedVerified,
        readinessScore: newReadiness,
      };

      // Save assessment to user UID subcollection in Firestore only when authenticated
      if (auth.currentUser && prev.id) {
        saveUserAssessment(prev.id, skillName, {
          score,
          level,
          verifiedDate: new Date().toISOString().split('T')[0],
        }).catch((err) => {
          console.warn('Firestore assessment sync warning:', err);
        });
      }

      // Add notification
      setNotifications((notifs) => [
        {
          id: `notif-${Date.now()}`,
          title: 'Skill Verified!',
          message: `You earned the verified '${skillName}' ${level} credential (${score}%).`,
          timestamp: 'Just now',
          type: 'system',
          read: false,
        },
        ...notifs,
      ]);

      return updatedUser;
    });
  };

  const handleUpdateResumes = (newResumes: ResumeDocument[]) => {
    setResumes(newResumes);
    if (auth.currentUser && user.id) {
      newResumes.forEach((r) => {
        saveUserResume(user.id, r).catch((err) => {
          console.warn('Firestore resume sync warning:', err);
        });
      });
    }
  };

  const handleUpdateApplications = (newApps: JobApplication[]) => {
    setApplications(newApps);
    if (auth.currentUser && user.id) {
      newApps.forEach((app) => {
        saveUserApplication(user.id, app).catch((err) => {
          console.warn('Firestore application sync warning:', err);
        });
      });
    }
  };

  const handleUpdateCalendarEvents = (newEvents: CalendarEvent[]) => {
    setCalendarEvents(newEvents);
    if (auth.currentUser && user.id) {
      newEvents.forEach((evt) => {
        saveUserCalendarEvent(user.id, evt).catch((err) => {
          console.warn('Firestore calendar event sync warning:', err);
        });
      });
    }
  };

  const handleAddCalendarEvent = (event: CalendarEvent) => {
    setCalendarEvents((prev) => {
      const idx = prev.findIndex((e) => e.id === event.id);
      if (idx >= 0) {
        const copy = [...prev];
        copy[idx] = event;
        return copy;
      }
      return [event, ...prev];
    });
    if (auth.currentUser && user.id) {
      saveUserCalendarEvent(user.id, event).catch((err) => {
        console.warn('Firestore calendar event sync warning:', err);
      });
    }
  };

  const handleAddAgentLog = (log: AgentLogEntry) => {
    setAgentLogs((prev) => [...prev, log]);
  };

  return (
    <div className="min-h-screen bg-[#080B18] text-slate-100 flex flex-col font-['Plus_Jakarta_Sans',sans-serif] relative overflow-x-hidden selection:bg-indigo-500 selection:text-white">
      <InteractiveBackground />
      <CustomCursor />
      {/* Top Navbar */}
      <Navbar
        user={user}
        notifications={notifications}
        activeTab={activeTab}
        onNavigate={(tab) => {
          setShowLanding(false);
          setActiveTab(tab);
        }}
        onUpdateNotifications={setNotifications}
        onOpenMobileMenu={() => setMobileMenuOpen(true)}
        isLoading={isDisplayLoading}
        onRefreshData={handleRefreshData}
        isSkeletonModeActive={isSkeletonModeActive}
        onToggleSkeletonMode={() => setIsSkeletonModeActive((prev) => !prev)}
        onOpenVision={() => setShowVisionModal(true)}
      />

      {/* Main Layout Area */}
      <div className="flex-1 flex overflow-hidden">
        {/* Collapsible Sidebar */}
        {!showLanding && (
          <Sidebar
            activeTab={activeTab}
            onNavigate={(tab) => {
              setShowLanding(false);
              setActiveTab(tab);
            }}
            collapsed={sidebarCollapsed}
            onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
            mobileOpen={mobileMenuOpen}
            onCloseMobile={() => setMobileMenuOpen(false)}
          />
        )}

        {/* Content Workspace */}
        <main className="flex-1 overflow-y-auto px-4 sm:px-6 lg:px-8 py-6 relative z-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={showLanding ? 'landing' : activeTab}
              variants={CINEMATIC_TRANSITION_VARIANTS}
              initial="initial"
              animate="animate"
              exit="exit"
              className="w-full"
            >
              {showLanding ? (
                <LandingHero
                  onLaunchApp={() => setShowLanding(false)}
                  onExploreModule={(moduleId) => {
                    setShowLanding(false);
                    setActiveTab(moduleId);
                  }}
                />
              ) : (
                <>
                  {activeTab === 'holographic-centre' && (
                <HolographicCommandCenter
                  user={user}
                  onNavigate={setActiveTab}
                  onTriggerAgents={() => setActiveTab('agent-centre')}
                  onOpenVisionModal={() => setShowVisionModal(true)}
                />
              )}

              {activeTab === 'dashboard' && (
                <div className="space-y-6">
                  {/* Embedded NOVA Holographic Core Quick Bar */}
                  <div className="p-4 rounded-2xl bg-gradient-to-r from-indigo-950/40 via-slate-900/60 to-slate-900/80 border border-indigo-500/20 flex flex-col sm:flex-row items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-cyan-400">
                        <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping" />
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-white flex items-center gap-2">
                          NOVA AI 4.0 Quantum Command Core Active
                          <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-indigo-500/20 text-indigo-300">
                            JARVIS Mode
                          </span>
                        </h4>
                        <p className="text-[11px] text-slate-400">
                          Voice engine connected • 3D Holographic Core online • Readiness: {user.readinessScore}%
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setShowVisionModal(true)}
                        className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 transition-all cursor-pointer"
                      >
                        Launch Vision
                      </button>
                      <button
                        onClick={() => setActiveTab('holographic-centre')}
                        className="px-3.5 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-xs font-semibold text-white transition-all cursor-pointer shadow-lg shadow-indigo-600/30"
                      >
                        Enter 3D Holographic Core →
                      </button>
                    </div>
                  </div>

                  <SmartDashboard
                    user={user}
                    opportunities={opportunities}
                    calendarEvents={calendarEvents}
                    notifications={notifications}
                    onNavigate={setActiveTab}
                    isLoading={isDisplayLoading}
                  />
                </div>
              )}

              {activeTab === 'digital-twin' && (
                <CareerDigitalTwin
                  user={user}
                  onNavigateToVerification={() => setActiveTab('skill-verification')}
                  onNavigateToRoadmap={() => setActiveTab('roadmap')}
                />
              )}

              {activeTab === 'skill-graph' && (
                <SkillIntelligenceGraph
                  onVerifySkill={() => setActiveTab('skill-verification')}
                  onExploreJobMatches={() => setActiveTab('job-match')}
                />
              )}

              {activeTab === 'talent-marketplace' && (
                <TalentMarketplace user={user} />
              )}

              {activeTab === 'project-cofounder' && (
                <ProjectCoFounder user={user} />
              )}

              {activeTab === 'saas-analytics' && (
                <StartupAnalytics />
              )}

              {activeTab === 'security-console' && (
                <SecurityConsole />
              )}

              {activeTab === 'agent-centre' && (
                <AgentCommandCentre
                  agents={agents}
                  tasks={agentTasks}
                  logs={agentLogs}
                  milestones={milestones}
                  onUpdateTasks={setAgentTasks}
                  onAddLog={handleAddAgentLog}
                />
              )}

              {activeTab === 'multi-llm-rag' && (
                <GraphRagExplorer />
              )}

              {activeTab === 'resume-lab' && (
                <ResumeLab
                  resumes={resumes}
                  onUpdateResumes={handleUpdateResumes}
                  isLoading={isDisplayLoading}
                />
              )}

              {activeTab === 'job-match' && (
                <JobMatchEngine
                  user={user}
                  opportunities={opportunities}
                  applications={applications}
                  onUpdateApplications={handleUpdateApplications}
                  isLoading={isDisplayLoading}
                />
              )}

              {activeTab === 'skill-verification' && (
                <SkillVerificationCentre
                  user={user}
                  assessments={assessments}
                  challenges={challenges}
                  onVerifySkill={handleVerifySkill}
                />
              )}

              {activeTab === 'interview-arena' && (
                <InterviewArena
                  calendarEvents={calendarEvents}
                  onAddCalendarEvent={handleAddCalendarEvent}
                  onUpdateCalendarEvent={handleAddCalendarEvent}
                  onInterviewComplete={(session) => {
                    setNotifications((prev) => [
                      {
                        id: `notif-${Date.now()}`,
                        title: 'Mock Interview Evaluation Completed',
                        message: `Scored ${session.overallScore}% in ${session.title}`,
                        timestamp: 'Just now',
                        type: 'system',
                        read: false,
                      },
                      ...prev,
                    ]);
                  }}
                />
              )}

              {activeTab === 'career-mentor' && <AICareerMentor />}

              {activeTab === 'project-studio' && (
                <ProjectStudio
                  user={user}
                  projects={projects}
                  onAddProject={(p) => setProjects([...projects, p])}
                />
              )}

              {(activeTab === 'career-dna' ||
                activeTab === 'roadmap' ||
                activeTab === 'reports' ||
                activeTab === 'peer' ||
                activeTab === 'calendar' ||
                activeTab === 'admin') && (
                <CareerModulesView
                  moduleType={
                    activeTab === 'career-dna'
                      ? 'dna'
                      : activeTab === 'roadmap'
                      ? 'roadmap'
                      : activeTab === 'reports'
                      ? 'reports'
                      : activeTab === 'peer'
                      ? 'peer'
                      : activeTab === 'calendar'
                      ? 'calendar'
                      : 'admin'
                  }
                  user={user}
                  roadmap={roadmap}
                  calendarEvents={calendarEvents}
                  peerGroups={peerGroups}
                  onToggleRoadmapNode={(id) => {
                    setRoadmap((nodes) =>
                      nodes.map((n) =>
                        n.id === id
                          ? { ...n, status: n.status === 'completed' ? 'in_progress' : 'completed' }
                          : n
                      )
                    );
                  }}
                  onUpdateCalendarEvents={handleUpdateCalendarEvents}
                />
              )}
            </>
          )}
        </motion.div>
      </AnimatePresence>
        </main>
      </div>

      {/* Multimodal NOVA Vision Modal */}
      <NovaVisionModal
        isOpen={showVisionModal}
        onClose={() => setShowVisionModal(false)}
        onApplyRecommendation={(rec) => {
          setNotifications((prev) => [
            {
              id: `notif-${Date.now()}`,
              title: 'NOVA Vision Recommendation Added',
              message: `Milestone added: "${rec}"`,
              timestamp: 'Just now',
              type: 'system',
              read: false,
            },
            ...prev,
          ]);
          setShowVisionModal(false);
        }}
      />
    </div>
  );
}
