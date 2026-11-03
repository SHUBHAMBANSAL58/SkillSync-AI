import { CalendarEvent } from '../types/career';
import { ensureGoogleCalendarToken } from './firebaseService';

export interface GoogleCalendarSyncResult {
  success: boolean;
  eventId?: string;
  htmlLink?: string;
  error?: string;
}

/**
 * Calculates start and end ISO timestamps with timezone offset.
 */
export function calculateEventTimeRange(
  date: string, // YYYY-MM-DD
  timeStr = '10:00', // HH:mm or HH:mm:ss
  durationMinutes = 45
): { startIso: string; endIso: string; timeZone: string } {
  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone || 'UTC';

  // Normalize time string
  const parts = timeStr.split(':');
  const hours = parseInt(parts[0] || '10', 10);
  const minutes = parseInt(parts[1] || '00', 10);

  const startDate = new Date(`${date}T00:00:00`);
  startDate.setHours(hours, minutes, 0, 0);

  const endDate = new Date(startDate.getTime() + durationMinutes * 60 * 1000);

  return {
    startIso: startDate.toISOString(),
    endIso: endDate.toISOString(),
    timeZone,
  };
}

/**
 * Pushes a scheduled interview event to Google Calendar via REST API.
 */
export async function pushEventToGoogleCalendar(
  event: CalendarEvent,
  providedToken?: string | null
): Promise<GoogleCalendarSyncResult> {
  try {
    const token = providedToken || (await ensureGoogleCalendarToken());
    if (!token) {
      return {
        success: false,
        error: 'Google authentication required. Please sign in with Google to grant Calendar permission.',
      };
    }

    const { startIso, endIso, timeZone } = calculateEventTimeRange(
      event.date,
      event.time || '10:00',
      event.durationMinutes || 45
    );

    const interviewRole = event.targetRole || event.title;
    const interviewType = event.interviewType || 'Technical Simulation';

    const eventPayload = {
      summary: `SkillSync AI Mock Interview: ${interviewRole}`,
      description: `Target Role: ${interviewRole}\nAssessment Category: ${interviewType}\nPlatform: SkillSync AI Interview Arena 2.0\nPreparation Notes: ${event.notes || 'None specified'}\nScheduled on SkillSync AI Career Intelligence Ecosystem.`,
      start: {
        dateTime: startIso,
        timeZone,
      },
      end: {
        dateTime: endIso,
        timeZone,
      },
      reminders: {
        useDefault: false,
        overrides: [
          { method: 'popup', minutes: 15 },
          { method: 'email', minutes: 60 },
        ],
      },
    };

    const response = await fetch('https://www.googleapis.com/calendar/v3/calendars/primary/events', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(eventPayload),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      const msg = errorData.error?.message || `Google Calendar API returned HTTP ${response.status}`;
      return {
        success: false,
        error: msg,
      };
    }

    const result = await response.json();
    return {
      success: true,
      eventId: result.id,
      htmlLink: result.htmlLink,
    };
  } catch (error: any) {
    console.error('Google Calendar Sync Error:', error);
    return {
      success: false,
      error: error?.message || 'Failed to sync event to Google Calendar.',
    };
  }
}
