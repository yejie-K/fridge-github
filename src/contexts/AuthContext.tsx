import { createContext, useContext } from 'react';

export interface User {
  id: string;
  email?: string;
  nickname?: string; // Local state nickname
}

export interface AuthState {
  user: User | null;
  isLoading: boolean;
  login: (familyId: string, password: string, nickname: string) => Promise<{ error: string | null }>;
  register: (familyId: string, password: string, nickname: string) => Promise<{ error: string | null }>;
  logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthState>({
  user: null,
  isLoading: true,
  login: async () => ({ error: 'Not implemented' }),
  register: async () => ({ error: 'Not implemented' }),
  logout: async () => {},
});

export const useAuth = () => useContext(AuthContext);
