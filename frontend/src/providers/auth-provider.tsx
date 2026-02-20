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
const AUTH_DISABLED = true;

function generateUserId(): string {
  return `user-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

function createGuestUser(): AuthUser {
  return {
    id: "guest",
    name: "Peregrino",
    passwordHash: "",
  };
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
    if (AUTH_DISABLED) {
      setUser(createGuestUser());
      return;
    }
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored) as Partial<AuthUser> | null;
        const isValid =
          !!parsed &&
          typeof parsed.name === "string" &&
          typeof parsed.passwordHash === "string" &&
          typeof parsed.id === "string";
        if (isValid) {
          setUser(parsed as AuthUser);
        } else {
          localStorage.removeItem(STORAGE_KEY);
        }
      }
    } catch {
      // ignore malformed data
    }
  }, []);

  const login = useCallback(async (username: string, password: string) => {
    if (AUTH_DISABLED) {
      setUser(createGuestUser());
      setModalOpen(false);
      return;
    }
    const hash = await sha256(password);
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (!stored) {
        throw new Error("Nenhuma conta local encontrada. Crie uma conta primeiro.");
      }
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
    if (AUTH_DISABLED) {
      setUser(createGuestUser());
      setModalOpen(false);
      return;
    }
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
    if (AUTH_DISABLED) {
      setUser(createGuestUser());
      return;
    }
    localStorage.removeItem(STORAGE_KEY);
    setUser(null);
  }, []);

  const openAuthModal = useCallback((mode: "login" | "signup" = "login") => {
    if (AUTH_DISABLED) return;
    setModalMode(mode);
    setModalOpen(true);
  }, []);

  const switchMode = useCallback(() => {
    setModalMode((m) => (m === "login" ? "signup" : "login"));
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoggedIn: AUTH_DISABLED ? true : !!user,
        login,
        signup,
        logout,
        openAuthModal,
      }}
    >
      {children}
      {!AUTH_DISABLED && (
        <AuthModal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          mode={modalMode}
          onSwitchMode={switchMode}
          onLogin={login}
          onSignup={signup}
        />
      )}
    </AuthContext.Provider>
  );
}

// ─── Hook ─────────────────────────────────────────────────────────────────────

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within an <AuthProvider>");
  return ctx;
}

