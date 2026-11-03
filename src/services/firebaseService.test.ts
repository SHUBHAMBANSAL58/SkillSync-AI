import test from 'node:test';
import assert from 'node:assert/strict';
import {
  checkIsAdmin,
  saveUserProfile,
  loadUserProfile,
  loadUserResumes,
  loadUserApplications,
  loadOpportunities,
  OperationType,
  handleFirestoreError,
} from './firebaseService';

test('checkIsAdmin identifies authorized admin emails and rejects others', () => {
  assert.equal(checkIsAdmin(null), false);
  assert.equal(checkIsAdmin({ email: 'user@example.com' } as any), false);
  assert.equal(checkIsAdmin({ email: 'bansalshubham182@gmail.com' } as any), true);
  assert.equal(checkIsAdmin({ email: 'lead@admin.skillsync.ai' } as any), true);
});

test('saveUserProfile gracefully bypasses remote network writes when unauthenticated', async () => {
  // Should not throw or fire unauthorized write when auth.currentUser is null
  await assert.doesNotReject(async () => {
    await saveUserProfile('user-001', { name: 'Demo User' });
  });
});

test('loadUserProfile returns null when unauthenticated without throwing permissions error', async () => {
  const profile = await loadUserProfile('user-001');
  assert.equal(profile, null);
});

test('loadUserResumes and loadUserApplications return empty arrays when unauthenticated', async () => {
  const resumes = await loadUserResumes('user-001');
  const apps = await loadUserApplications('user-001');
  const opps = await loadOpportunities();
  assert.deepEqual(resumes, []);
  assert.deepEqual(apps, []);
  assert.deepEqual(opps, []);
});

import { terminate } from 'firebase/firestore';

test('handleFirestoreError formats structured error diagnostic JSON', () => {
  assert.throws(
    () => {
      handleFirestoreError(new Error('Missing or insufficient permissions.'), OperationType.WRITE, 'users/test-uid');
    },
    (err: any) => {
      const parsed = JSON.parse(err.message);
      return (
        parsed.error.includes('Missing or insufficient permissions.') &&
        parsed.operationType === 'write' &&
        parsed.path === 'users/test-uid'
      );
    }
  );
});

test('teardown firestore test connections', async () => {
  const { db } = await import('./firebaseService');
  try {
    await terminate(db);
  } catch {}
});
