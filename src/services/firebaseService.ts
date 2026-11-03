import { initializeApp, getApps, getApp } from 'firebase/app';
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  type User,
} from 'firebase/auth';
import {
  getFirestore,
  initializeFirestore,
  persistentLocalCache,
  persistentMultipleTabManager,
  memoryLocalCache,
  getDocFromCache,
  getDocsFromCache,
  doc,
  getDoc,
  getDocFromServer,
  setDoc,
  collection,
  getDocs,
  deleteDoc,
} from 'firebase/firestore';
import firebaseConfig from '../../firebase-applet-config.json';
import { UserProfile, ResumeDocument, JobApplication, SkillAssessment, InterviewSession, CalendarEvent, JobOpportunity } from '../types/career';

// Initialize Firebase App
const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

// Google Workspace Scopes
export const WORKSPACE_CALENDAR_SCOPE = 'https://www.googleapis.com/auth/calendar.events';
googleProvider.addScope(WORKSPACE_CALENDAR_SCOPE);

// In-Memory Access Token Cache (Do NOT store in localStorage per security guidelines)
let cachedGoogleAccessToken: string | null = null;

export function getGoogleAccessToken(): string | null {
  return cachedGoogleAccessToken;
}

export function setGoogleAccessToken(token: string | null): void {
  cachedGoogleAccessToken = token;
}

// =========================================================================
// OFFLINE PERSISTENCE CONFIGURATION (IndexedDB Multi-Tab Persistent Cache)
// =========================================================================

function createFirestoreInstance() {
  const dbId = (firebaseConfig as any).firestoreDatabaseId;
  try {
    return dbId
      ? initializeFirestore(
          app,
          {
            localCache: persistentLocalCache({
              tabManager: persistentMultipleTabManager(),
            }),
          },
          dbId
        )
      : initializeFirestore(app, {
          localCache: persistentLocalCache({
            tabManager: persistentMultipleTabManager(),
          }),
        });
  } catch (err: any) {
    console.warn('Persistent cache initialization fell back to memory cache:', err);
    try {
      return dbId
        ? initializeFirestore(app, { localCache: memoryLocalCache() }, dbId)
        : initializeFirestore(app, { localCache: memoryLocalCache() });
    } catch {
      return dbId ? getFirestore(app, dbId) : getFirestore(app);
    }
  }
}

export const db = createFirestoreInstance();

// =========================================================================
// ERROR HANDLING SPECIFICATION (Mandatory for Security Rules Diagnostics)
// =========================================================================

export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

export interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
    tenantId?: string | null;
    providerInfo?: {
      providerId?: string | null;
      email?: string | null;
    }[];
  };
}

export function handleFirestoreError(
  error: unknown,
  operationType: OperationType,
  path: string | null
): never {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid || null,
      email: auth.currentUser?.email || null,
      emailVerified: auth.currentUser?.emailVerified || null,
      isAnonymous: auth.currentUser?.isAnonymous || null,
      tenantId: auth.currentUser?.tenantId || null,
      providerInfo:
        auth.currentUser?.providerData?.map((provider) => ({
          providerId: provider.providerId,
          email: provider.email,
        })) || [],
    },
    operationType,
    path,
  };

  console.error('[Firestore Security Access Error]:', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

// =========================================================================
// CONNECTION TEST UTILITY (Boot Verification)
// =========================================================================

export async function testFirestoreConnection(): Promise<boolean> {
  const path = 'test/connection';
  try {
    await getDocFromServer(doc(db, 'test', 'connection'));
    return true;
  } catch (error) {
    if (error instanceof Error && error.message.includes('the client is offline')) {
      console.warn('Firestore connection warning: Client is offline or disconnected.');
    }
    return false;
  }
}

// Run connection validation on initialization in browser context
if (typeof window !== 'undefined') {
  testFirestoreConnection();
}

// =========================================================================
// AUTHENTICATION UTILITIES
// =========================================================================

export async function loginWithGoogle(): Promise<{ user: User | null; accessToken: string | null }> {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const credential = GoogleAuthProvider.credentialFromResult(result);
    if (credential?.accessToken) {
      cachedGoogleAccessToken = credential.accessToken;
    }
    return { user: result.user, accessToken: cachedGoogleAccessToken };
  } catch (error) {
    console.warn('Firebase Google Sign-In Popup error or cancel:', error);
    return { user: null, accessToken: null };
  }
}

export async function ensureGoogleCalendarToken(): Promise<string | null> {
  if (cachedGoogleAccessToken) {
    return cachedGoogleAccessToken;
  }
  const res = await loginWithGoogle();
  return res.accessToken;
}

export async function logoutUser(): Promise<void> {
  await signOut(auth);
  cachedGoogleAccessToken = null;
}

export function subscribeToAuth(callback: (user: User | null) => void) {
  return onAuthStateChanged(auth, (user) => {
    if (!user) {
      cachedGoogleAccessToken = null;
    }
    callback(user);
  });
}

export function checkIsAdmin(user: User | null): boolean {
  if (!user || !user.email) return false;
  return (
    user.email === 'bansalshubham182@gmail.com' ||
    user.email.endsWith('@admin.skillsync.ai')
  );
}

// =========================================================================
// SECURE USER DATA SERVICES (Strictly restricted to user UID or authorized admin)
// =========================================================================

export async function saveUserProfile(userId: string, data: Partial<UserProfile>): Promise<void> {
  // Respect security rules: only sync to Firestore when authenticated
  if (!auth.currentUser) {
    console.info(`[Firestore Service] Local mode: unauthenticated write skipped for users/${userId}.`);
    return;
  }
  const docPath = `users/${userId}`;
  try {
    const userRef = doc(db, 'users', userId);
    await setDoc(userRef, { ...data, updatedAt: new Date().toISOString() }, { merge: true });
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, docPath);
  }
}

export async function loadUserProfile(userId: string): Promise<UserProfile | null> {
  // Respect security rules: unauthenticated reads to private user profile are gated
  if (!auth.currentUser) {
    return null;
  }
  const docPath = `users/${userId}`;
  const userRef = doc(db, 'users', userId);
  try {
    const snap = await getDoc(userRef);
    if (snap.exists()) {
      return snap.data() as UserProfile;
    }
    return null;
  } catch (error) {
    // Attempt reading from persistent offline cache if network is unavailable
    try {
      const cacheSnap = await getDocFromCache(userRef);
      if (cacheSnap.exists()) {
        return cacheSnap.data() as UserProfile;
      }
    } catch {
      // ignore secondary cache failure
    }
    handleFirestoreError(error, OperationType.GET, docPath);
  }
}

// Legacy user data wrapper for backwards compatibility
export async function saveUserData(userId: string, data: any): Promise<void> {
  return saveUserProfile(userId, data);
}

export async function loadUserData(userId: string): Promise<any | null> {
  return loadUserProfile(userId);
}

// User Resumes Subcollection
export async function saveUserResume(userId: string, resume: ResumeDocument): Promise<void> {
  if (!auth.currentUser) return;
  const docPath = `users/${userId}/resumes/${resume.id}`;
  try {
    const resumeRef = doc(db, 'users', userId, 'resumes', resume.id);
    await setDoc(resumeRef, resume, { merge: true });
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, docPath);
  }
}

export async function loadUserResumes(userId: string): Promise<ResumeDocument[]> {
  if (!auth.currentUser) return [];
  const colPath = `users/${userId}/resumes`;
  const colRef = collection(db, 'users', userId, 'resumes');
  try {
    const snap = await getDocs(colRef);
    return snap.docs.map((d) => d.data() as ResumeDocument);
  } catch (error) {
    try {
      const cacheSnap = await getDocsFromCache(colRef);
      if (cacheSnap.docs.length > 0) {
        return cacheSnap.docs.map((d) => d.data() as ResumeDocument);
      }
    } catch {
      // ignore secondary cache failure
    }
    handleFirestoreError(error, OperationType.LIST, colPath);
  }
}

export async function deleteUserResume(userId: string, resumeId: string): Promise<void> {
  if (!auth.currentUser) return;
  const docPath = `users/${userId}/resumes/${resumeId}`;
  try {
    const resumeRef = doc(db, 'users', userId, 'resumes', resumeId);
    await deleteDoc(resumeRef);
  } catch (error) {
    handleFirestoreError(error, OperationType.DELETE, docPath);
  }
}

// User Applications Subcollection
export async function saveUserApplication(userId: string, app: JobApplication): Promise<void> {
  if (!auth.currentUser) return;
  const docPath = `users/${userId}/applications/${app.id}`;
  try {
    const appRef = doc(db, 'users', userId, 'applications', app.id);
    await setDoc(appRef, app, { merge: true });
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, docPath);
  }
}

export async function loadUserApplications(userId: string): Promise<JobApplication[]> {
  if (!auth.currentUser) return [];
  const colPath = `users/${userId}/applications`;
  const colRef = collection(db, 'users', userId, 'applications');
  try {
    const snap = await getDocs(colRef);
    return snap.docs.map((d) => d.data() as JobApplication);
  } catch (error) {
    try {
      const cacheSnap = await getDocsFromCache(colRef);
      if (cacheSnap.docs.length > 0) {
        return cacheSnap.docs.map((d) => d.data() as JobApplication);
      }
    } catch {
      // ignore secondary cache failure
    }
    handleFirestoreError(error, OperationType.LIST, colPath);
  }
}

// User Skill Assessments Subcollection
export async function saveUserAssessment(
  userId: string,
  assessmentId: string,
  result: { score: number; level: string; verifiedDate: string }
): Promise<void> {
  if (!auth.currentUser) return;
  const docPath = `users/${userId}/assessments/${assessmentId}`;
  try {
    const assessRef = doc(db, 'users', userId, 'assessments', assessmentId);
    await setDoc(assessRef, result, { merge: true });
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, docPath);
  }
}

// User Interview Arena Sessions
export async function saveUserInterview(userId: string, session: InterviewSession): Promise<void> {
  if (!auth.currentUser) return;
  const docPath = `users/${userId}/interviews/${session.id}`;
  try {
    const interviewRef = doc(db, 'users', userId, 'interviews', session.id);
    await setDoc(interviewRef, session, { merge: true });
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, docPath);
  }
}

// User Calendar Events Subcollection
export async function saveUserCalendarEvent(userId: string, event: CalendarEvent): Promise<void> {
  if (!auth.currentUser) return;
  const docPath = `users/${userId}/calendarEvents/${event.id}`;
  try {
    const eventRef = doc(db, 'users', userId, 'calendarEvents', event.id);
    await setDoc(eventRef, event, { merge: true });
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, docPath);
  }
}

export async function loadUserCalendarEvents(userId: string): Promise<CalendarEvent[]> {
  if (!auth.currentUser) return [];
  const colPath = `users/${userId}/calendarEvents`;
  const colRef = collection(db, 'users', userId, 'calendarEvents');
  try {
    const snap = await getDocs(colRef);
    return snap.docs.map((d) => d.data() as CalendarEvent);
  } catch (error) {
    try {
      const cacheSnap = await getDocsFromCache(colRef);
      if (cacheSnap.docs.length > 0) {
        return cacheSnap.docs.map((d) => d.data() as CalendarEvent);
      }
    } catch {
      // ignore secondary cache failure
    }
    handleFirestoreError(error, OperationType.LIST, colPath);
  }
}

// =========================================================================
// CURATED COLLECTIONS & ADMIN SERVICES
// =========================================================================

export async function loadOpportunities(): Promise<JobOpportunity[]> {
  if (!auth.currentUser) return [];
  const colPath = 'opportunities';
  try {
    const oppRef = collection(db, 'opportunities');
    const snap = await getDocs(oppRef);
    return snap.docs.map((d) => d.data() as JobOpportunity);
  } catch (error) {
    handleFirestoreError(error, OperationType.LIST, colPath);
  }
}

// Admin-Only Opportunity Write (Will fail if not admin per security rules)
export async function saveOpportunity(opp: JobOpportunity): Promise<void> {
  const docPath = `opportunities/${opp.id}`;
  try {
    const oppRef = doc(db, 'opportunities', opp.id);
    await setDoc(oppRef, opp, { merge: true });
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, docPath);
  }
}

// Admin Registry Entry
export async function ensureAdminRecord(adminUid: string, email: string): Promise<void> {
  const docPath = `admins/${adminUid}`;
  try {
    const adminRef = doc(db, 'admins', adminUid);
    await setDoc(adminRef, {
      uid: adminUid,
      email,
      role: 'admin',
      authorizedAt: new Date().toISOString(),
    }, { merge: true });
  } catch (error) {
    // If not yet an admin, this write will fail per security rules as expected
    console.warn(`Admin registration for ${adminUid} gated by Firestore security rules.`);
  }
}
