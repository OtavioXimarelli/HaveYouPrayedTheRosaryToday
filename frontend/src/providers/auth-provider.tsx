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
  /** username chosen at signup */
  name: string;
  /** SHA-256 hex digest of the password — never the plaintext */
  passwordHash: string;
}

interface AuthContextValue {
  user: AuthUser | null;
  isLoggedIn: boolean;
  login: (username: string, password: string) => Promise<void>;
  signup: (username: string, password: string) => Promise<void>;
  logout: () => void;
  openAuthModal: (mode?: "login" | "signup") => void;
}

// ─── Context ──────────────────────────────────────────────────────────────────

const AuthContext = createContext<AuthContextValue | null>(null);

const STORAGE_KEY = "rosario-user";

function generateUserId(): string {
  return `user-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

/** SHA-256 hash via Web Crypto API (available in all modern browsers + Node 18+) */
async function sha256(text: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(text);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(hashBuffer))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
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

  const login = useCallback(async (username: string, password: string) => {
    const hash = await sha256(password);
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const storedUser: AuthUser = JSON.parse(stored);
        if (
          storedUser.name.toLowerCase() === username.toLowerCase() &&
          storedUser.passwordHash === hash
        ) {
          setUser(storedUser);
          setModalOpen(false);
          return;
        }
      }
    } catch {
      // ignore
    }
    throw new Error("Usuário ou senha incorretos.");
  }, []);

  const signup = useCallback(async (username: string, password: string) => {
    // Prevent duplicate usernames
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const storedUser: AuthUser = JSON.parse(stored);
        if (storedUser.name.toLowerCase() === username.toLowerCase()) {
          throw new Error("Este nome de usuário já está em uso.");
        }
      }
    } catch (e) {
      if (e instanceof Error && e.message.includes("nome de usuário")) throw e;
    }

    const hash = await sha256(password);
    const newUser: AuthUser = {
      id: generateUserId(),
      name: username,
      passwordHash: hash,
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newUser));
    setUser(newUser);
    setModalOpen(false);
  }, []);

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

