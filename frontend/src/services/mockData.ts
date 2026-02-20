/**
 * Mock Data Store
 * 
 * Simulates a database for development purposes.
 * This will be replaced by actual API calls to the NestJS backend.
 */

import {
  User,
  CheckIn,
  Comment,
  UserStats,
  MysteryType,
  IntentionTag,
} from "@/types";

// ===========================
// Mock Users
// ===========================

export const mockUsers: User[] = [
  {
    id: "user-1",
    name: "Maria Santos",
    avatarUrl: undefined,
    createdAt: new Date("2024-01-15"),
  },
  {
    id: "user-2",
    name: "John Paul",
    avatarUrl: undefined,
    createdAt: new Date("2024-02-20"),
  },
  {
    id: "user-3",
    name: "Teresa Grace",
    avatarUrl: undefined,
    createdAt: new Date("2024-03-10"),
  },
  {
    id: "user-4",
    name: "Francis Xavier",
    avatarUrl: undefined,
    createdAt: new Date("2024-04-05"),
  },
  {
    id: "user-5",
    name: "Clare of Light",
    avatarUrl: undefined,
    createdAt: new Date("2024-05-12"),
  },
  {
    id: "current-user",
    name: "Você",
    avatarUrl: undefined,
    createdAt: new Date("2024-06-01"),
  },
];

export const currentUser = mockUsers.find((u) => u.id === "current-user")!;

// ===========================
// Mock Comments
// ===========================

const mockComments: Comment[] = [
  {
    id: "comment-1",
    userId: "user-2",
    user: mockUsers[1],
    checkInId: "checkin-1",
    content: "Reflexão linda! Rezando com você 🙏",
    createdAt: new Date(Date.now() - 1000 * 60 * 30),
  },
  {
    id: "comment-2",
    userId: "user-3",
    user: mockUsers[2],
    checkInId: "checkin-1",
    content: "Amém! Isso tocou meu coração também.",
    createdAt: new Date(Date.now() - 1000 * 60 * 15),
  },
  {
    id: "comment-3",
    userId: "user-4",
    user: mockUsers[3],
    checkInId: "checkin-2",
    content: "Que Deus abençoe sua família!",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2),
  },
];

// ===========================
// Mock Check-ins
// ===========================

export let mockCheckIns: CheckIn[] = [
  {
    id: "checkin-1",
    userId: "user-1",
    user: mockUsers[0],
    mystery: "joyful",
    reflection:
      "O mistério da Anunciação de hoje me lembrou da coragem de Maria em dizer 'sim' ao plano de Deus. Estou tentando abraçar essa mesma confiança na minha própria vida.",
    intentions: ["family", "faith"],
    createdAt: new Date(Date.now() - 1000 * 60 * 45),
    amens: 12,
    hasUserAmened: false,
    comments: mockComments.filter((c) => c.checkInId === "checkin-1"),
  },
  {
    id: "checkin-2",
    userId: "user-2",
    user: mockUsers[1],
    mystery: "sorrowful",
    reflection:
      "Meditar sobre o Carregamento da Cruz me ajudou a encontrar força nas minhas lutas atuais. Deus não nos dá mais do que podemos suportar.",
    intentions: ["health", "peace"],
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 3),
    amens: 8,
    hasUserAmened: true,
    comments: mockComments.filter((c) => c.checkInId === "checkin-2"),
  },
  {
    id: "checkin-3",
    userId: "user-3",
    user: mockUsers[2],
    mystery: "glorious",
    reflection:
      "A Ressurreição me enche de esperança. Não importa quão escuras as coisas pareçam, a luz sempre retorna.",
    intentions: ["gratitude", "healing"],
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 5),
    amens: 15,
    hasUserAmened: false,
    comments: [],
  },
  {
    id: "checkin-4",
    userId: "user-4",
    user: mockUsers[3],
    mystery: "luminous",
    reflection:
      "A Transfiguração me lembra que Cristo revela Sua glória em momentos inesperados. Permanecendo presente e atento à graça.",
    intentions: ["faith", "love"],
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 8),
    amens: 6,
    hasUserAmened: false,
    comments: [],
  },
  {
    id: "checkin-5",
    userId: "user-5",
    user: mockUsers[4],
    mystery: "joyful",
    reflection:
      "A Visitação nos mostra o poder da comunidade e de apoiar uns aos outros. Liguei para minha mãe hoje depois dessa meditação.",
    intentions: ["family", "gratitude"],
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 12),
    amens: 22,
    hasUserAmened: true,
    comments: [],
  },
];

// ===========================
// Mock User Stats (localStorage-based)
// ===========================

const STATS_KEY = "rosary-user-stats";
const CHECKINS_KEY = "rosary-user-checkins";

export function getStoredStats(): UserStats {
  if (typeof window === "undefined") {
    return getDefaultStats();
  }

  const stored = localStorage.getItem(STATS_KEY);
  if (stored) {
    const parsed = JSON.parse(stored);
    return {
      ...parsed,
      lastCheckIn: parsed.lastCheckIn ? new Date(parsed.lastCheckIn) : undefined,
    };
  }
  return getDefaultStats();
}

export function getDefaultStats(): UserStats {
  return {
    currentStreak: 0,
    longestStreak: 0,
    totalCheckIns: 0,
    lastCheckIn: undefined,
    favoriteMysterys: [],
  };
}

export function saveStats(stats: UserStats): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(STATS_KEY, JSON.stringify(stats));
}

export function getStoredCheckIns(): CheckIn[] {
  if (typeof window === "undefined") return [];
  
  const stored = localStorage.getItem(CHECKINS_KEY);
  if (stored) {
    const parsed = JSON.parse(stored);
    return parsed.map((c: CheckIn) => ({
      ...c,
      createdAt: new Date(c.createdAt),
      user: currentUser,
    }));
  }
  return [];
}

export function saveCheckIn(checkIn: CheckIn): void {
  if (typeof window === "undefined") return;
  
  const existing = getStoredCheckIns();
  existing.unshift(checkIn);
  localStorage.setItem(CHECKINS_KEY, JSON.stringify(existing));
}

// ===========================
// Utility Functions
// ===========================

export function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

export function calculateStreak(lastCheckIn?: Date): { current: number; isNewDay: boolean } {
  if (!lastCheckIn) return { current: 0, isNewDay: true };

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  const lastDate = new Date(lastCheckIn);
  lastDate.setHours(0, 0, 0, 0);

  const diffDays = Math.floor((today.getTime() - lastDate.getTime()) / (1000 * 60 * 60 * 24));

  if (diffDays === 0) {
    return { current: 0, isNewDay: false }; // Already checked in today
  } else if (diffDays === 1) {
    return { current: 1, isNewDay: true }; // Consecutive day
  } else {
    return { current: 0, isNewDay: true }; // Streak broken
  }
}

export function hasCheckedInToday(lastCheckIn?: Date): boolean {
  if (!lastCheckIn) return false;

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const lastDate = new Date(lastCheckIn);
  lastDate.setHours(0, 0, 0, 0);

  return today.getTime() === lastDate.getTime();
}
