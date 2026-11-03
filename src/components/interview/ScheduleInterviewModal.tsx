import React, { useState } from 'react';
import {
  Calendar,
  Clock,
  CheckCircle2,
  AlertCircle,
  X,
  ExternalLink,
  Bot,
  Sparkles,
  ChevronRight,
  ShieldCheck,
  CalendarCheck2,
} from 'lucide-react';
import { CalendarEvent } from '../../types/career';

interface ScheduleInterviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialRole?: string;
  initialType?: 'Technical' | 'HR & Behavioral' | 'System Design';
  availableRoles?: string[];
  onSchedule: (
    event: CalendarEvent,
    syncToGoogle: boolean
  ) => Promise<{ success: boolean; googleLink?: string; error?: string }>;
}

const DEFAULT_TIME_SLOTS = [
  { label: '09:00 AM', value: '09:00', period: 'Morning' },
  { label: '10:15 AM', value: '10:15', period: 'Morning' },
  { label: '11:30 AM', value: '11:30', period: 'Morning' },
  { label: '01:30 PM', value: '13:30', period: 'Afternoon' },
  { label: '03:00 PM', value: '15:00', period: 'Afternoon' },
  { label: '04:30 PM', value: '16:30', period: 'Afternoon' },
  { label: '06:00 PM', value: '18:00', period: 'Evening' },
  { label: '07:15 PM', value: '19:15', period: 'Evening' },
];

export const ScheduleInterviewModal: React.FC<ScheduleInterviewModalProps> = ({
  isOpen,
  onClose,
  initialRole = 'Full-Stack AI Engineer',
  initialType = 'Technical',
  availableRoles = [
    'Full-Stack AI Engineer',
    'Frontend Specialist (React 19)',
    'Distributed Systems Architect',
    'Junior Software Engineer (General)',
    'Cloud & DevOps Engineer',
    'AI / Machine Learning Engineer',
  ],
  onSchedule,
}) => {
  // Helper to format ISO date string (YYYY-MM-DD)
  const getTomorrowString = () => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    return d.toISOString().split('T')[0];
  };

  const [role, setRole] = useState(initialRole);
  const [interviewType, setInterviewType] = useState<'Technical' | 'HR & Behavioral' | 'System Design'>(initialType);
  const [selectedDate, setSelectedDate] = useState(getTomorrowString());
  const [selectedTime, setSelectedTime] = useState('10:15');
  const [customTime, setCustomTime] = useState('');
  const [durationMinutes, setDurationMinutes] = useState(45);
  const [notes, setNotes] = useState('');
  const [syncToGoogle, setSyncToGoogle] = useState(true);

  // Flow State: 'select' -> 'confirm' -> 'completed'
  const [step, setStep] = useState<'select' | 'confirm' | 'completed'>('select');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [resultMessage, setResultMessage] = useState<{
    success: boolean;
    googleLink?: string;
    error?: string;
  } | null>(null);

  if (!isOpen) return null;

  const effectiveTime = customTime || selectedTime;

  // Format date preview
  const formatDisplayDate = (dateStr: string) => {
    try {
      const [year, month, day] = dateStr.split('-').map(Number);
      const d = new Date(year, month - 1, day);
      return d.toLocaleDateString('en-US', {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      });
    } catch {
      return dateStr;
    }
  };

  // Format 24h time to 12h display
  const formatDisplayTime = (timeStr: string) => {
    const [h, m] = timeStr.split(':').map(Number);
    const period = h >= 12 ? 'PM' : 'AM';
    const hour12 = h % 12 || 12;
    return `${hour12}:${(m || 0).toString().padStart(2, '0')} ${period}`;
  };

  const handleProceedToConfirmation = () => {
    if (!selectedDate || !effectiveTime) return;
    setStep('confirm');
  };

  const handleConfirmAndSchedule = async () => {
    setIsSubmitting(true);
    setResultMessage(null);

    const newEvent: CalendarEvent = {
      id: `int-sched-${Date.now()}`,
      title: `Mock Interview: ${role}`,
      date: selectedDate,
      time: effectiveTime,
      durationMinutes,
      type: 'interview',
      completed: false,
      targetRole: role,
      interviewType,
      notes: notes.trim() || `SkillSync AI ${interviewType} simulation session for ${role}.`,
    };

    try {
      const res = await onSchedule(newEvent, syncToGoogle);
      setResultMessage(res);
      setStep('completed');
    } catch (err: any) {
      setResultMessage({
        success: false,
        error: err?.message || 'Failed to schedule interview.',
      });
      setStep('completed');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResetAndClose = () => {
    setStep('select');
    setResultMessage(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-xl rounded-2xl bg-[#0c1224] border border-indigo-500/30 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="p-5 border-b border-slate-800 flex items-center justify-between bg-gradient-to-r from-[#0c1224] to-[#121b36]">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-cyan-400">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                Schedule AI Mock Interview
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 font-mono">
                  Arena 2.0
                </span>
              </h3>
              <p className="text-xs text-slate-400">
                Pick your preferred time slot and sync directly with Google Calendar
              </p>
            </div>
          </div>
          <button
            onClick={handleResetAndClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-5 text-sm">
          {step === 'select' && (
            <>
              {/* Target Role Selector */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300 flex items-center justify-between">
                  <span>Target Engineering Role</span>
                  <span className="text-[11px] text-cyan-400 font-normal">Customizable</span>
                </label>
                <div className="flex gap-2">
                  <select
                    value={availableRoles.includes(role) ? role : 'custom'}
                    onChange={(e) => {
                      if (e.target.value !== 'custom') {
                        setRole(e.target.value);
                      }
                    }}
                    className="flex-1 bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-400"
                  >
                    {availableRoles.map((r) => (
                      <option key={r} value={r}>
                        {r}
                      </option>
                    ))}
                    <option value="custom">-- Custom Role --</option>
                  </select>
                </div>
                {!availableRoles.includes(role) && (
                  <input
                    type="text"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    placeholder="Enter custom role title..."
                    className="w-full mt-2 bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-400"
                  />
                )}
              </div>

              {/* Interview Category Selector */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300">Interview Assessment Focus</label>
                <div className="grid grid-cols-3 gap-2">
                  {(['Technical', 'HR & Behavioral', 'System Design'] as const).map((type) => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => setInterviewType(type)}
                      className={`px-3 py-2 rounded-xl text-xs font-medium border text-center transition-all cursor-pointer ${
                        interviewType === type
                          ? 'bg-indigo-600/30 border-cyan-400 text-cyan-300 shadow-sm shadow-cyan-500/20'
                          : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              {/* Date Selection */}
              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-300 flex items-center justify-between">
                  <span>Preferred Date</span>
                  <span className="text-[11px] text-slate-400">
                    {formatDisplayDate(selectedDate)}
                  </span>
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {(() => {
                    const today = new Date();
                    const dates = [0, 1, 2].map((offset) => {
                      const d = new Date();
                      d.setDate(today.getDate() + offset);
                      const iso = d.toISOString().split('T')[0];
                      const label = offset === 0 ? 'Today' : offset === 1 ? 'Tomorrow' : d.toLocaleDateString('en-US', { weekday: 'short', month: 'numeric', day: 'numeric' });
                      return { iso, label };
                    });
                    return dates.map((d) => (
                      <button
                        key={d.iso}
                        type="button"
                        onClick={() => setSelectedDate(d.iso)}
                        className={`px-3 py-2 rounded-xl text-xs font-medium border text-center transition-all cursor-pointer ${
                          selectedDate === d.iso
                            ? 'bg-indigo-600/30 border-indigo-400 text-white shadow-sm'
                            : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-300'
                        }`}
                      >
                        {d.label}
                      </button>
                    ));
                  })()}
                </div>
                <input
                  type="date"
                  min={new Date().toISOString().split('T')[0]}
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-400 cursor-pointer mt-1"
                />
              </div>

              {/* Time Slot Selector */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-cyan-400" />
                    Available Time Slots
                  </label>
                  <span className="text-[11px] font-mono text-cyan-300">
                    Selected: {formatDisplayTime(effectiveTime)}
                  </span>
                </div>

                <div className="grid grid-cols-4 sm:grid-cols-4 gap-2">
                  {DEFAULT_TIME_SLOTS.map((slot) => {
                    const isSelected = !customTime && selectedTime === slot.value;
                    return (
                      <button
                        key={slot.value}
                        type="button"
                        onClick={() => {
                          setSelectedTime(slot.value);
                          setCustomTime('');
                        }}
                        className={`p-2 rounded-xl text-xs font-medium border text-center transition-all cursor-pointer flex flex-col items-center justify-center gap-0.5 ${
                          isSelected
                            ? 'bg-gradient-to-r from-indigo-600/40 to-cyan-600/30 border-cyan-400 text-white shadow-md shadow-cyan-500/10'
                            : 'bg-slate-900/90 border-slate-800 text-slate-300 hover:border-slate-700 hover:text-white'
                        }`}
                      >
                        <span className="text-[11px] font-semibold">{slot.label}</span>
                        <span className="text-[9px] text-slate-400">{slot.period}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Custom Time Option */}
                <div className="pt-1 flex items-center gap-3">
                  <span className="text-[11px] text-slate-400">Or specify custom time:</span>
                  <input
                    type="time"
                    value={customTime}
                    onChange={(e) => setCustomTime(e.target.value)}
                    className="bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1 text-xs text-white focus:outline-none focus:border-cyan-400"
                  />
                  {customTime && (
                    <button
                      type="button"
                      onClick={() => setCustomTime('')}
                      className="text-[10px] text-rose-400 hover:underline cursor-pointer"
                    >
                      Clear
                    </button>
                  )}
                </div>
              </div>

              {/* Duration Selector */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300">Session Duration</label>
                <div className="grid grid-cols-3 gap-2">
                  {[30, 45, 60].map((mins) => (
                    <button
                      key={mins}
                      type="button"
                      onClick={() => setDurationMinutes(mins)}
                      className={`px-3 py-2 rounded-xl text-xs font-medium border text-center transition-all cursor-pointer ${
                        durationMinutes === mins
                          ? 'bg-indigo-600/30 border-indigo-400 text-white'
                          : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-300'
                      }`}
                    >
                      {mins} Minutes {mins === 45 && '(Standard)'}
                    </button>
                  ))}
                </div>
              </div>

              {/* Preparation Notes / Focus */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300">
                  Preparation Notes / Focus Topics <span className="text-slate-500 font-normal">(Optional)</span>
                </label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="e.g. Distributed caching, microservices resiliency, rate limiting, leadership questions..."
                  rows={2}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 resize-none"
                />
              </div>

              {/* Google Calendar One-Click Sync Toggle */}
              <div className="p-3.5 rounded-xl bg-gradient-to-r from-indigo-950/40 via-slate-900 to-indigo-950/20 border border-indigo-500/30 flex items-center justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-lg bg-indigo-500/20 text-cyan-300">
                    <CalendarCheck2 className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white flex items-center gap-1.5">
                      <span>One-Click Sync with Google Calendar</span>
                      <span className="text-[9px] px-1.5 py-0.2 bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 rounded">
                        OAuth 2.0
                      </span>
                    </div>
                    <p className="text-[10px] text-slate-400">
                      Pushes event to primary calendar with 15-minute preparation reminder.
                    </p>
                  </div>
                </div>

                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={syncToGoogle}
                    onChange={(e) => setSyncToGoogle(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-10 h-5 bg-slate-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-gradient-to-r peer-checked:from-indigo-600 peer-checked:to-cyan-500"></div>
                </label>
              </div>
            </>
          )}

          {/* Step 2: Confirmation Dialog (MANDATORY per Workspace Integration skill) */}
          {step === 'confirm' && (
            <div className="space-y-4 animate-fadeIn">
              <div className="p-4 rounded-xl bg-indigo-500/10 border border-indigo-500/30 flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
                <div className="text-xs">
                  <h4 className="font-bold text-white">Confirmation Required</h4>
                  <p className="text-slate-300 mt-1">
                    Please review and confirm your scheduled mock interview session details before we synchronize it to your calendar systems.
                  </p>
                </div>
              </div>

              {/* Summary Card */}
              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-3">
                <div className="flex justify-between items-center pb-2 border-b border-slate-800">
                  <span className="text-xs text-slate-400">Target Role</span>
                  <span className="text-xs font-bold text-white">{role}</span>
                </div>
                <div className="flex justify-between items-center pb-2 border-b border-slate-800">
                  <span className="text-xs text-slate-400">Interview Focus</span>
                  <span className="text-xs font-medium text-cyan-300">{interviewType}</span>
                </div>
                <div className="flex justify-between items-center pb-2 border-b border-slate-800">
                  <span className="text-xs text-slate-400">Date</span>
                  <span className="text-xs font-medium text-white">{formatDisplayDate(selectedDate)}</span>
                </div>
                <div className="flex justify-between items-center pb-2 border-b border-slate-800">
                  <span className="text-xs text-slate-400">Time & Duration</span>
                  <span className="text-xs font-mono text-cyan-300">
                    {formatDisplayTime(effectiveTime)} ({durationMinutes} mins)
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-slate-400">Google Calendar Sync</span>
                  <span
                    className={`text-xs font-semibold ${
                      syncToGoogle ? 'text-emerald-400' : 'text-slate-400'
                    }`}
                  >
                    {syncToGoogle ? 'Enabled (One-Click Sync)' : 'Internal Only'}
                  </span>
                </div>
              </div>

              {notes.trim() && (
                <div className="p-3 rounded-xl bg-slate-900/50 border border-slate-800 text-xs">
                  <span className="text-slate-400 block mb-1">Preparation Focus:</span>
                  <span className="text-slate-200">{notes}</span>
                </div>
              )}
            </div>
          )}

          {/* Step 3: Result / Completed State */}
          {step === 'completed' && resultMessage && (
            <div className="text-center py-6 space-y-4 animate-fadeIn">
              {resultMessage.success ? (
                <>
                  <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/10">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-white">Interview Scheduled Successfully!</h4>
                    <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
                      Your mock interview session for <span className="text-cyan-300">{role}</span> has been confirmed for{' '}
                      <span className="text-white font-medium">{formatDisplayDate(selectedDate)} at {formatDisplayTime(effectiveTime)}</span>.
                    </p>
                  </div>

                  {resultMessage.googleLink && (
                    <div className="pt-2">
                      <a
                        href={resultMessage.googleLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-600/30 hover:bg-indigo-600/50 border border-indigo-500/50 text-cyan-300 text-xs font-bold transition-all shadow-md cursor-pointer"
                      >
                        <ExternalLink className="w-4 h-4" />
                        View in Google Calendar
                      </a>
                    </div>
                  )}
                </>
              ) : (
                <>
                  <div className="w-14 h-14 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-400 flex items-center justify-center mx-auto">
                    <AlertCircle className="w-8 h-8" />
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-white">Scheduling Notice</h4>
                    <p className="text-xs text-rose-300 mt-1 max-w-sm mx-auto">
                      {resultMessage.error || 'Failed to complete Google Calendar sync.'}
                    </p>
                    <p className="text-[11px] text-slate-400 mt-2">
                      The interview has been saved in your local SkillSync calendar system.
                    </p>
                  </div>
                </>
              )}
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-5 border-t border-slate-800 bg-[#080B18] flex items-center justify-between">
          {step === 'select' && (
            <>
              <button
                type="button"
                onClick={handleResetAndClose}
                className="px-4 py-2 rounded-xl text-xs text-slate-400 hover:text-white transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleProceedToConfirmation}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-600 hover:from-indigo-500 hover:to-cyan-500 text-white text-xs font-bold flex items-center gap-2 shadow-lg shadow-indigo-500/20 cursor-pointer transition-all"
              >
                Review & Confirm
                <ChevronRight className="w-4 h-4" />
              </button>
            </>
          )}

          {step === 'confirm' && (
            <>
              <button
                type="button"
                disabled={isSubmitting}
                onClick={() => setStep('select')}
                className="px-4 py-2 rounded-xl text-xs text-slate-400 hover:text-white transition-colors cursor-pointer disabled:opacity-50"
              >
                Back to Edit
              </button>
              <button
                type="button"
                disabled={isSubmitting}
                onClick={handleConfirmAndSchedule}
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-cyan-600 hover:from-emerald-500 hover:to-cyan-500 text-white text-xs font-bold flex items-center gap-2 shadow-lg shadow-emerald-500/20 cursor-pointer transition-all disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>
                    <Sparkles className="w-4 h-4 animate-spin" />
                    Synchronizing...
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="w-4 h-4" />
                    Confirm & Schedule Interview
                  </>
                )}
              </button>
            </>
          )}

          {step === 'completed' && (
            <div className="w-full flex justify-end">
              <button
                type="button"
                onClick={handleResetAndClose}
                className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold cursor-pointer transition-colors"
              >
                Done
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
