// ===========================
// Domain Types
// ===========================

export type MysteryType = "joyful" | "sorrowful" | "glorious" | "luminous";

export type IntentionTag =
  | "family"
  | "peace"
  | "health"
  | "gratitude"
  | "work"
  | "faith"
  | "love"
  | "healing";

export interface User {
  id: string;
  name: string;
  avatarUrl?: string;
  createdAt: Date;
}

export interface CheckIn {
  id: string;
  userId: string;
  user: User;
  mystery: MysteryType;
  reflection?: string;
  intentions: IntentionTag[];
  createdAt: Date;
  amens: number;
  hasUserAmened?: boolean;
  comments: Comment[];
}

export interface Comment {
  id: string;
  userId: string;
  user: User;
  checkInId: string;
  content: string;
  createdAt: Date;
}

export interface UserStats {
  currentStreak: number;
  longestStreak: number;
  totalCheckIns: number;
  lastCheckIn?: Date;
  favoriteMysterys: MysteryType[];
}

// ===========================
// API Request/Response Types
// ===========================

export interface CreateCheckInRequest {
  mystery: MysteryType;
  reflection?: string;
  intentions: IntentionTag[];
}

export interface CreateCheckInResponse {
  checkIn: CheckIn;
  stats: UserStats;
}

export interface GetFeedResponse {
  checkIns: CheckIn[];
  hasMore: boolean;
  nextCursor?: string;
}

export interface AddCommentRequest {
  checkInId: string;
  content: string;
}

export interface AddAmenRequest {
  checkInId: string;
}

// ===========================
// Helper Types
// ===========================

export interface MysteryInfo {
  type: MysteryType;
  name: string;
  description: string;
  day: number[]; // 0 = Sunday, 1 = Monday, etc.
}

export const MYSTERIES: MysteryInfo[] = [
  {
    type: "joyful",
    name: "Mistérios Gozosos",
    description: "Refletindo sobre a alegria da Encarnação",
    day: [1, 6], // Segunda, Sábado
  },
  {
    type: "sorrowful",
    name: "Mistérios Dolorosos",
    description: "Meditando sobre a paixão e sacrifício de Cristo",
    day: [2, 5], // Terça, Sexta
  },
  {
    type: "glorious",
    name: "Mistérios Gloriosos",
    description: "Celebrando a Ressurreição e a glória",
    day: [0, 3], // Domingo, Quarta
  },
  {
    type: "luminous",
    name: "Mistérios Luminosos",
    description: "Os mistérios da luz no ministério de Cristo",
    day: [4], // Quinta
  },
];

export const INTENTION_TAGS: { value: IntentionTag; label: string; emoji: string }[] = [
  { value: "family", label: "Família", emoji: "👨‍👩‍👧‍👦" },
  { value: "peace", label: "Paz", emoji: "🕊️" },
  { value: "health", label: "Saúde", emoji: "💚" },
  { value: "gratitude", label: "Gratidão", emoji: "🙏" },
  { value: "work", label: "Trabalho", emoji: "💼" },
  { value: "faith", label: "Fé", emoji: "✝️" },
  { value: "love", label: "Amor", emoji: "❤️" },
  { value: "healing", label: "Cura", emoji: "🩹" },
];

export function getTodaysMystery(): MysteryType {
  const today = new Date().getDay();
  const mystery = MYSTERIES.find((m) => m.day.includes(today));
  return mystery?.type ?? "joyful";
}

export function getMysteryInfo(type: MysteryType): MysteryInfo {
  return MYSTERIES.find((m) => m.type === type)!;
}
