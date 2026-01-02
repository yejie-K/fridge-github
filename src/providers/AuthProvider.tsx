import { useState, useEffect, ReactNode } from 'react';
import { AuthContext, User } from '../contexts/AuthContext';
import { supabase, isSupabaseEnabled } from '../lib/supabase';

// Helper to fake email for family ID
const getEmail = (familyId: string) => `${familyId}@fridge.local`;

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Initialize: Check active session
  useEffect(() => {
    if (!isSupabaseEnabled) {
      setIsLoading(false);
      return;
    }

    const init = async () => {
      try {
        // 先尝试从本地恢复 Session，减少等待时间
        const { data: { session } } = await supabase.auth.getSession();
        if (session?.user) {
          const nickname = localStorage.getItem('user_nickname') || '家人';
          setUser({
            id: session.user.id,
            email: session.user.email,
            nickname,
          });
        }
      } catch (e) {
        console.error('Session init error:', e);
      } finally {
        setIsLoading(false);
      }
    };

    init();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        const nickname = localStorage.getItem('user_nickname') || '家人';
        setUser({
          id: session.user.id,
          email: session.user.email,
          nickname,
        });
      } else {
        setUser(null);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const login = async (familyId: string, password: string, nickname: string) => {
    if (!isSupabaseEnabled) return { error: 'Supabase 未配置' };

    const email = getEmail(familyId);
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (!error) {
      localStorage.setItem('user_nickname', nickname);
      // Force update user state immediately with new nickname
      const { data: { user: authUser } } = await supabase.auth.getUser();
      if (authUser) {
        setUser({ id: authUser.id, email: authUser.email, nickname });
      }
    }

    return { error: error?.message || null };
  };

  const register = async (familyId: string, password: string, nickname: string) => {
    if (!isSupabaseEnabled) return { error: 'Supabase 未配置' };

    const email = getEmail(familyId);
    const { error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (!error) {
      localStorage.setItem('user_nickname', nickname);
      // Auto login usually happens, but we can double check
      const { data: { user: authUser } } = await supabase.auth.getUser();
      if (authUser) {
        setUser({ id: authUser.id, email: authUser.email, nickname });
      }
    }

    return { error: error?.message || null };
  };

  const logout = async () => {
    if (!isSupabaseEnabled) return;
    await supabase.auth.signOut();
    localStorage.removeItem('user_nickname');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
