import {
  createContext, useContext, useEffect, useState, type ReactNode,
} from 'react';
import { api } from './api';
import type { User } from './types';

interface AuthState {
  user: User | null;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  loading: boolean;
}

const Ctx = createContext<AuthState | null>(null);

const STORAGE_KEY = 'frandee.session';

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const raw = typeof window !== 'undefined' ? window.localStorage.getItem(STORAGE_KEY) : null;
      if (raw) {
        const parsed = JSON.parse(raw) as { user: User; token: string };
        setUser(parsed.user);
        setToken(parsed.token);
      }
    } catch {
      /* ignore */
    } finally {
      setLoading(false);
    }
  }, []);

  async function login(email: string, password: string) {
    const res = await api.post<{ token: string; user: User }>('/auth/login', { email, password });
    setUser(res.user);
    setToken(res.token);
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(res));
    } catch {
      /* ignore */
    }
  }

  function logout() {
    setUser(null);
    setToken(null);
    try {
      window.localStorage.removeItem(STORAGE_KEY);
    } catch {
      /* ignore */
    }
  }

  return (
    <Ctx.Provider value={{ user, token, login, logout, loading }}>
      {children}
    </Ctx.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error('useAuth must be used inside <AuthProvider>');
  return ctx;
}
