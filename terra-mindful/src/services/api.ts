const API_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000';

export type JournalAnalysis = {
  mood: string;
  title: string;
  summary: string;
  themes: string[];
  insights: string[];
};

export type JournalEntry = {
  id: string;
  user_id: string;
  transcript: string;
  analysis: JournalAnalysis;
  audio_path: string;
  audio_signed_url: string;
  created_at: string;
};

export type AuthResponse = {
  access_token: string;
  token_type?: string;
  expires_in?: number;
  refresh_token?: string;
  user_id?: string;
  email?: string;
};

export type UserProfile = {
  user_id: string;
  email: string;
  display_name: string;
  streak_count: number;
  last_journal_saved: string;
  created_at: string;
  updated_at: string;
};

// --- Auth API ---

export const login = async (email: string, password: string): Promise<AuthResponse> => {
  const response = await fetch(`${API_URL}/v1/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || 'Login failed');
  }

  const data = await response.json();

  // Backend may return { user: {...}, session: {...} }
  if (data && data.session) {
    return {
      access_token: data.session.access_token,
      refresh_token: data.session.refresh_token,
      token_type: data.session.token_type || 'bearer',
      expires_in: data.session.expires_in,
      user_id: data.user?.id || data.user_id,
      email: data.user?.email || data.email,
    } as AuthResponse;
  }

  // Fallback: assume already in flattened form
  return data as AuthResponse;
};

export const signup = async (email: string, password: string) => {
  const response = await fetch(`${API_URL}/v1/auth/signup`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || 'Signup failed');
  }

  const data = await response.json();

  // Normalize to same shape as login
  if (data && data.session) {
    return {
      access_token: data.session.access_token,
      refresh_token: data.session.refresh_token,
      token_type: data.session.token_type || 'bearer',
      expires_in: data.session.expires_in,
      user_id: data.user?.id || data.user_id,
      email: data.user?.email || data.email,
    } as AuthResponse;
  }

  return data;
};

export const logout = async (token: string) => {
  const response = await fetch(`${API_URL}/v1/auth/logout`, {
    method: 'POST',
    headers: { 'Authorization': `Bearer ${token}` },
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || 'Logout failed');
  }

  return response.json();
};

export const getProfile = async (token: string): Promise<UserProfile> => {
  const response = await fetch(`${API_URL}/v1/profile`, {
    headers: { 'Authorization': `Bearer ${token}` },
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || 'Failed to fetch profile');
  }

  const data = await response.json();

  // Backend docs sometimes use `full_name` while frontend expects `display_name`.
  return {
    user_id: data.user_id || data.id || data.user?.id,
    email: data.email || data.user?.email,
    display_name: data.display_name || data.full_name || data.user?.full_name || '',
    streak_count: data.streak_count || 0,
    last_journal_saved: data.last_journal_saved || '',
    created_at: data.created_at || '',
    updated_at: data.updated_at || '',
  } as UserProfile;
};

// --- Journal API ---

export const ingestJournal = async (audioBlob: Blob, token?: string): Promise<JournalEntry> => {
  const formData = new FormData();
  formData.append('audio', audioBlob, 'journal.wav');

  const headers: Record<string, string> = {};
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_URL}/v1/journals/ingest`, {
    method: 'POST',
    headers,
    body: formData,
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || 'Failed to ingest journal');
  }

  const data = await response.json();

  // Normalize backend ingest -> frontend JournalEntry
  const analysis = data.analysis || {};

  const normalized: JournalEntry = {
    id: data.id || data.entry_id || '',
    user_id: data.user_id || data.user?.id || '',
    transcript: data.transcript || '',
    analysis: {
      mood: analysis.mood || '',
      title: data.title || analysis.title || '',
      summary: analysis.summary || '',
      themes: analysis.themes || [],
      insights: analysis.insights || [],
    },
    audio_path: data.audio_path || data.path || '',
    audio_signed_url: data.audio_signed_url || data.audio_url || '',
    created_at: data.created_at || '',
  };

  return normalized;
};
