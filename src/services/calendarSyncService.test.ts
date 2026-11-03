import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { calculateEventTimeRange } from './calendarSyncService';
import { db } from './firebaseService';
import { terminate } from 'firebase/firestore';

describe('Google Calendar Sync Service', () => {
  test('calculateEventTimeRange formats start and end ISO correctly for given date, time, and duration', () => {
    const range = calculateEventTimeRange('2026-11-15', '14:30', 60);

    assert.ok(range.startIso, 'Must produce a valid startIso');
    assert.ok(range.endIso, 'Must produce a valid endIso');
    assert.ok(range.timeZone, 'Must detect user timeZone');

    const start = new Date(range.startIso);
    const end = new Date(range.endIso);
    const diffMinutes = (end.getTime() - start.getTime()) / (1000 * 60);

    assert.equal(diffMinutes, 60, 'End time should be exactly 60 minutes after start time');
  });

  test('calculateEventTimeRange defaults to 45 minutes duration if not specified', () => {
    const range = calculateEventTimeRange('2026-11-20', '09:00');
    const start = new Date(range.startIso);
    const end = new Date(range.endIso);
    const diffMinutes = (end.getTime() - start.getTime()) / (1000 * 60);

    assert.equal(diffMinutes, 45, 'Default duration should be 45 minutes');
  });

  test('calculateEventTimeRange handles midnight and edge cases gracefully', () => {
    const range = calculateEventTimeRange('2026-12-31', '23:30', 45);
    const start = new Date(range.startIso);
    const end = new Date(range.endIso);

    assert.equal(end.getTime() > start.getTime(), true);
  });

  test('teardown firestore test connections', async () => {
    await terminate(db);
  });
});
