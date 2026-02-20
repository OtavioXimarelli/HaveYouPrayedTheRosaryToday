"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import { AuthModal } from "@/components/auth-modal";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface AuthUser {
  id: string;
  name: string;
  email: string;
}

interface AuthContextValue {
  user: AuthUser | null;
  isLoggedIn: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  openAuthModal: (mode?: "login" | "signup") => void;
}

// ─── Context ──────────────────────────────────────────────────────────────────

const AuthContext = createContext<AuthContextValue | null>(null);

const STORAGE_KEY = "rosario-user";

function generateUserId(): string {
  return `user-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

// ─── Provider ─────────────────────────────────────────────────────────────────

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"login" | "signup">("login");

  // Hydrate from localStorage on mount (client-side only)
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) setUser(JSON.parse(stored));
    } catch {
      // ignore malformed data
    }
  }, []);

  const login = useCallback(async (email: string, _password: string) => {
    // localStorage-based: try to match a stored session by email
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const storedUser: AuthUser = JSON.parse(stored);
        if (storedUser.email.toLowerCase() === email.toLowerCase()) {
          setUser(storedUser);
          setModalOpen(false);
          return;
        }
      }
    } catch {
      // ignore
    }
    // Fallback: create a minimal session from the email
    const newUser: AuthUser = {
      id: generateUserId(),
      name: email.split("@")[0],
      email,
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newUser));
    setUser(newUser);
    setModalOpen(false);
  }, []);

  const signup = useCallback(
    async (name: string, email: string, _password: string) => {
      const newUser: AuthUser = { id: generateUserId(), name, email };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newUser));
      setUser(newUser);
      setModalOpen(false);
    },
    []
  );

  const logout = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    setUser(null);
  }, []);

  const openAuthModal = useCallback((mode: "login" | "signup" = "login") => {
    setModalMode(mode);
    setModalOpen(true);
  }, []);

  const switchMode = useCallback(() => {
    setModalMode((m) => (m === "login" ? "signup" : "login"));
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, isLoggedIn: !!user, login, signup, logout, openAuthModal }}
    >
      {children}
      <AuthModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        mode={modalMode}
        onSwitchMode={switchMode}
        onLogin={login}
        onSignup={signup}
      />
    </AuthContext.Provider>
  );
}

// ─── Hook ─────────────────────────────────────────────────────────────────────

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within an <AuthProvider>");
  return ctx;
}
