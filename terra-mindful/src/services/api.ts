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
  token_type: string;
  expires_in: number;
  refresh_token: string;
  user_id: string;
  email: string;
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

  return response.json();
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

  return response.json();
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

  return response.json();
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

  return response.json();
};
