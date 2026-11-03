import React, { useState } from 'react';
import {
  Sparkles,
  Bell,
  Cpu,
  User,
  Flame,
  Menu,
  RefreshCw,
  Eye,
} from 'lucide-react';
import { UserProfile, AppNotification } from '../../types/career';
import { auth, loginWithGoogle, logoutUser } from '../../services/firebaseService';

interface NavbarProps {
  user: UserProfile;
  notifications: AppNotification[];
  activeTab: string;
  onNavigate: (tabId: string) => void;
  onUpdateNotifications: (notifications: AppNotification[]) => void;
  onOpenMobileMenu?: () => void;
  isLoading?: boolean;
  onRefreshData?: () => void;
  isSkeletonModeActive?: boolean;
  onToggleSkeletonMode?: () => void;
  onOpenVision?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  user,
  notifications,
  activeTab,
  onNavigate,
  onUpdateNotifications,
  onOpenMobileMenu,
  isLoading = false,
  onRefreshData,
  isSkeletonModeActive = false,
  onToggleSkeletonMode,
  onOpenVision,
}) => {
  const [showNotifMenu, setShowNotifMenu] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [isOnline, setIsOnline] = useState(typeof navigator !== 'undefined' ? navigator.onLine : true);

  React.useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const handleMarkAllRead = () => {
    const updated = notifications.map((n) => ({ ...n, read: true }));
    onUpdateNotifications(updated);
  };

  const handleSignIn = async () => {
    await loginWithGoogle();
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-[#080B18]/85 backdrop-blur-xl border-b border-indigo-500/15 px-4 lg:px-8 py-3 flex items-center justify-between transition-all">
      {/* Brand Logo & Mobile Menu Button */}
      <div className="flex items-center gap-3">
        {onOpenMobileMenu && (
          <button
            onClick={onOpenMobileMenu}
            className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 md:hidden cursor-pointer"
            aria-label="Open navigation menu"
          >
            <Menu className="w-4 h-4" />
          </button>
        )}

        <button
          onClick={() => onNavigate('dashboard')}
          className="flex items-center gap-2.5 text-left group cursor-pointer focus:outline-none"
        >
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-cyan-400 p-0.5 shadow-lg shadow-indigo-500/25 transition-transform group-hover:scale-105">
            <div className="w-full h-full bg-[#080B18] rounded-[10px] flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-cyan-400" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-sm sm:text-base font-extrabold tracking-tight text-white group-hover:text-cyan-300 transition-colors">
                SkillSync AI
              </span>
              <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 font-bold">
                4.0
              </span>
            </div>
            <p className="text-[10px] text-slate-400 hidden sm:block">Build Skills. Prove Your Value. Get Hired.</p>
          </div>
        </button>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* NOVA 3D Core Direct Trigger Button */}
        <button
          onClick={() => onNavigate('holographic-centre')}
          className={`px-2.5 sm:px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 border transition-all cursor-pointer ${
            activeTab === 'holographic-centre'
              ? 'bg-cyan-500/20 border-cyan-400 text-cyan-200 ring-1 ring-cyan-400/50'
              : 'bg-indigo-950/40 hover:bg-indigo-900/50 border-indigo-500/30 text-indigo-300'
          }`}
          title="Open JARVIS-Inspired 3D Holographic Command Centre"
        >
          <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
          <span className="hidden md:inline">NOVA 3D Core</span>
          <span className="md:hidden">NOVA</span>
        </button>

        {/* NOVA Vision Quick Trigger */}
        {onOpenVision && (
          <button
            onClick={onOpenVision}
            className="hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs font-semibold bg-indigo-950/40 hover:bg-indigo-900/50 border border-indigo-500/30 text-indigo-300 transition-all cursor-pointer"
            title="Inspect architecture, code, or resume with multimodal AI"
          >
            <Eye className="w-3.5 h-3.5 text-indigo-400" />
            <span>Vision</span>
          </button>
        )}

        {/* Agent Command Centre Direct Trigger Button */}
        <button
          onClick={() => onNavigate('agent-centre')}
          className={`px-2.5 sm:px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 border transition-all cursor-pointer ${
            activeTab === 'agent-centre'
              ? 'bg-cyan-500/20 border-cyan-400 text-cyan-200 ring-1 ring-cyan-400/50'
              : 'bg-indigo-950/40 hover:bg-indigo-900/50 border-indigo-500/30 text-indigo-300'
          }`}
        >
          <Cpu className="w-3.5 h-3.5 text-cyan-400" />
          <span className="hidden lg:inline">10-Agent Centre</span>
          <span className="lg:hidden">Agents</span>
        </button>

        {/* Offline Persistent Cache Indicator / Firestore Refresh Trigger */}
        <button
          onClick={onRefreshData}
          disabled={isLoading}
          className={`hidden lg:flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-mono border transition-all cursor-pointer ${
            isLoading
              ? 'bg-cyan-500/15 border-cyan-500/40 text-cyan-300 shadow-sm shadow-cyan-500/20'
              : isOnline
              ? 'bg-emerald-500/10 hover:bg-emerald-500/20 border-emerald-500/25 text-emerald-300'
              : 'bg-amber-500/15 border-amber-500/40 text-amber-300'
          }`}
          title={
            isLoading
              ? 'Retrieving latest Firestore documents...'
              : isOnline
              ? 'Firestore multi-tab IndexedDB cache active. Click to refresh from Firestore.'
              : 'Offline mode: reading & caching data locally'
          }
        >
          {isLoading ? (
            <>
              <RefreshCw className="w-3 h-3 text-cyan-400 animate-spin" />
              <span>Fetching Firestore...</span>
            </>
          ) : (
            <>
              <span
                className={`w-1.5 h-1.5 rounded-full ${
                  isOnline ? 'bg-emerald-400' : 'bg-amber-400 animate-pulse'
                }`}
              />
              <span>{isOnline ? 'Cache Synced' : 'Offline Cache Active'}</span>
            </>
          )}
        </button>

        {/* Learning Streak Pill */}
        <div className="hidden md:flex items-center gap-1 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/25 text-amber-300 text-xs font-semibold">
          <Flame className="w-3.5 h-3.5 fill-amber-400" />
          <span>{user.streakDays}d Streak</span>
        </div>

        {/* Notifications Dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowNotifMenu(!showNotifMenu)}
            className="p-2 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-slate-800 text-slate-300 relative cursor-pointer transition-all"
            aria-label="View notifications"
          >
            <Bell className="w-4 h-4" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-cyan-500 text-slate-950 font-bold text-[10px] flex items-center justify-center animate-pulse">
                {unreadCount}
              </span>
            )}
          </button>

          {showNotifMenu && (
            <div className="absolute right-0 mt-2 w-72 sm:w-80 rounded-2xl bg-[#0f172a] border border-indigo-500/30 shadow-2xl p-4 z-50 space-y-3 animate-fadeIn">
              <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                <span className="text-xs font-bold text-white">Notifications ({unreadCount} new)</span>
                {unreadCount > 0 && (
                  <button
                    onClick={handleMarkAllRead}
                    className="text-[10px] text-cyan-400 hover:underline cursor-pointer"
                  >
                    Mark all read
                  </button>
                )}
              </div>
              <div className="space-y-2 max-h-64 overflow-y-auto">
                {notifications.map((n) => (
                  <div
                    key={n.id}
                    className={`p-2.5 rounded-xl border text-xs space-y-0.5 transition-all ${
                      n.read ? 'bg-slate-900/50 border-slate-800 text-slate-400' : 'bg-slate-900 border-indigo-500/40 text-slate-200'
                    }`}
                  >
                    <div className="font-semibold text-white">{n.title}</div>
                    <p className="text-[11px] leading-relaxed">{n.message}</p>
                    <div className="text-[9px] text-slate-500 pt-0.5">{n.timestamp}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* User Profile Avatar / Sign In */}
        <div className="relative">
          <button
            onClick={() => setShowUserMenu(!showUserMenu)}
            className="flex items-center gap-2 p-1.5 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-slate-800 transition-all cursor-pointer"
          >
            <img
              src={user.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100'}
              alt={user.name}
              className="w-7 h-7 rounded-lg object-cover border border-cyan-400/50"
            />
            <span className="text-xs font-semibold text-white hidden sm:block max-w-[100px] truncate">
              {user.name}
            </span>
          </button>

          {showUserMenu && (
            <div className="absolute right-0 mt-2 w-64 rounded-2xl bg-[#0f172a] border border-indigo-500/30 shadow-2xl p-4 z-50 space-y-3 animate-fadeIn">
              <div className="pb-2 border-b border-slate-800">
                <div className="text-xs font-bold text-white">{user.name}</div>
                <div className="text-[11px] text-cyan-300 truncate">{user.email}</div>
                <div className="text-[10px] text-slate-400 mt-0.5">{user.targetRole}</div>
              </div>

              <div className="space-y-1.5 text-xs text-slate-300">
                <div className="flex justify-between py-1">
                  <span className="text-slate-400">CGPA:</span>
                  <span className="font-semibold text-white">{user.cgpa} / 10.0</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-slate-400">Graduation:</span>
                  <span className="font-semibold text-white">{user.graduationYear}</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-slate-400">Backlogs:</span>
                  <span className="font-semibold text-emerald-400">{user.activeBacklogs}</span>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-800 flex flex-col gap-2">
                {onToggleSkeletonMode && (
                  <button
                    onClick={() => {
                      onToggleSkeletonMode();
                      setShowUserMenu(false);
                    }}
                    className={`w-full py-2 rounded-xl border text-xs font-semibold flex items-center justify-center gap-2 cursor-pointer transition-all ${
                      isSkeletonModeActive
                        ? 'bg-cyan-500/20 border-cyan-400 text-cyan-200'
                        : 'bg-indigo-600/20 hover:bg-indigo-600/30 border-indigo-500/30 text-indigo-300'
                    }`}
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>{isSkeletonModeActive ? 'Exit Skeleton Mode' : 'Toggle Skeleton Screens'}</span>
                  </button>
                )}
                {auth.currentUser ? (
                  <button
                    onClick={async () => {
                      await logoutUser();
                      setShowUserMenu(false);
                    }}
                    className="w-full py-2 rounded-xl bg-rose-600/80 hover:bg-rose-600 text-white text-xs font-semibold text-center cursor-pointer transition-all"
                  >
                    Sign Out ({auth.currentUser.email ? auth.currentUser.email.split('@')[0] : 'User'})
                  </button>
                ) : (
                  <button
                    onClick={async () => {
                      await loginWithGoogle();
                      setShowUserMenu(false);
                    }}
                    className="w-full py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold text-center cursor-pointer transition-all"
                  >
                    Firebase Google Sign-In
                  </button>
                )}
                <button
                  onClick={() => setShowUserMenu(false)}
                  className="w-full py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium text-center cursor-pointer transition-all"
                >
                  Close Menu
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
