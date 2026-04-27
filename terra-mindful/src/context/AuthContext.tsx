import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { getProfile, logout as apiLogout } from '../services/api';
import type { AuthResponse, UserProfile } from '../services/api';

interface AuthContextType {
  user: AuthResponse | null;
  profile: UserProfile | null;
  isLoading: boolean;
  login: (data: AuthResponse) => void;
  logout: () => Promise<void>;
  updateProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AuthResponse | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem('auth_user');
    if (savedUser) {
      const parsedUser = JSON.parse(savedUser) as AuthResponse;
      setUser(parsedUser);
      fetchProfile(parsedUser.access_token);
    } else {
      setIsLoading(false);
    }
  }, []);

  const fetchProfile = async (token: string) => {
    try {
      const userProfile = await getProfile(token);
      setProfile(userProfile);
    } catch (err) {
      console.error('Failed to fetch profile:', err);
      // Token might be expired
      handleLogout();
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogin = (data: AuthResponse) => {
    setUser(data);
    localStorage.setItem('auth_user', JSON.stringify(data));
    fetchProfile(data.access_token);
  };

  const handleLogout = async () => {
    if (user) {
      try {
        await apiLogout(user.access_token);
      } catch (err) {
        console.error('Logout error:', err);
      }
    }
    setUser(null);
    setProfile(null);
    localStorage.removeItem('auth_user');
  };

  const updateProfile = async () => {
    if (user) {
      await fetchProfile(user.access_token);
    }
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      profile, 
      isLoading, 
      login: handleLogin, 
      logout: handleLogout,
      updateProfile 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
