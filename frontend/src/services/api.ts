/**
 * API Service Layer
 *
 * Supports two data sources:
 * 1. local mock/localStorage mode (default for MVP)
 * 2. separated backend mode via NEXT_PUBLIC_USE_BACKEND=true
 */

import {
  AddAmenRequest,
  AddCommentRequest,
  CheckIn,
  Comment,
  CreateCheckInRequest,
  CreateCheckInResponse,
  GetFeedResponse,
  IntentionTag,
  MysteryType,
  UserStats,
} from "@/types";
import {
  calculateStreak,
  currentUser,
  generateId,
  getStoredCheckIns,
  getStoredStats,
  hasCheckedInToday,
  mockCheckIns,
  saveCheckIn,
  saveStats,
} from "./mockData";

const SIMULATED_DELAY_MS = 500;
const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "") ??
  "http://localhost:3001/api";
const USE_BACKEND = process.env.NEXT_PUBLIC_USE_BACKEND === "true";
const ACCESS_TOKEN_KEY = "rosario-access-token";

type BackendMysteryLabel =
  | "Mistérios Gozosos"
  | "Mistérios Dolorosos"
  | "Mistérios Gloriosos"
  | "Mistérios Luminosos";

type BackendIntentionLabel =
  | "Família"
  | "Paz"
  | "Saúde"
  | "Trabalho"
  | "Estudos"
  | "Vocação"
  | "Conversão"
  | "Igreja"
  | "Fiéis Defuntos"
  | "Pessoal";

interface BackendComment {
  userId: string;
  userName: string;
  userAvatar?: string;
  text: string;
  createdAt: string;
}

interface BackendCheckIn {
  _id: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  mystery: string;
  reflection?: string;
  intentions?: string[];
  comments?: BackendComment[];
  amenCount?: number;
  hasUserAmen?: boolean;
  createdAt: string;
}

interface BackendFeedResponse {
  checkIns: BackendCheckIn[];
  total: number;
  page: number;
  totalPages: number;
}

interface BackendTodayResponse {
  hasCheckedIn: boolean;
}

interface BackendFavoriteMystery {
  mystery: string;
  count: number;
}

interface BackendStatsResponse {
  currentStreak: number;
  longestStreak: number;
  totalCheckIns: number;
  lastCheckIn?: string;
  favoriteMysteries: BackendFavoriteMystery[] | string[];
}

function delay(ms: number = SIMULATED_DELAY_MS): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function getAccessToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(ACCESS_TOKEN_KEY);
}

function isMysteryType(value: string): value is MysteryType {
  return ["joyful", "sorrowful", "glorious", "luminous"].includes(value);
}

function isIntentionTag(value: string): value is IntentionTag {
  return [
    "family",
    "peace",
    "health",
    "gratitude",
    "work",
    "faith",
    "love",
    "healing",
  ].includes(value);
}

const frontendToBackendMystery: Record<MysteryType, BackendMysteryLabel> = {
  joyful: "Mistérios Gozosos",
  sorrowful: "Mistérios Dolorosos",
  glorious: "Mistérios Gloriosos",
  luminous: "Mistérios Luminosos",
};

const backendToFrontendMystery: Record<BackendMysteryLabel, MysteryType> = {
  "Mistérios Gozosos": "joyful",
  "Mistérios Dolorosos": "sorrowful",
  "Mistérios Gloriosos": "glorious",
  "Mistérios Luminosos": "luminous",
};

const frontendToBackendIntention: Record<IntentionTag, BackendIntentionLabel> = {
  family: "Família",
  peace: "Paz",
  health: "Saúde",
  gratitude: "Pessoal",
  work: "Trabalho",
  faith: "Igreja",
  love: "Vocação",
  healing: "Conversão",
};

const backendToFrontendIntention: Partial<Record<BackendIntentionLabel, IntentionTag>> = {
  Família: "family",
  Paz: "peace",
  Saúde: "health",
  Trabalho: "work",
  Estudos: "faith",
  Vocação: "faith",
  Conversão: "healing",
  Igreja: "faith",
  "Fiéis Defuntos": "peace",
  Pessoal: "gratitude",
};

function mapMysteryToFrontend(rawMystery: string): MysteryType {
  if (isMysteryType(rawMystery)) return rawMystery;
  const mapped = backendToFrontendMystery[rawMystery as BackendMysteryLabel];
  return mapped ?? "joyful";
}

function mapIntentionsToFrontend(intentions?: string[]): IntentionTag[] {
  if (!intentions?.length) return [];
  return intentions
    .map((label) => backendToFrontendIntention[label as BackendIntentionLabel] ?? "faith")
    .filter(isIntentionTag);
}

function mapCheckInToFrontend(checkIn: BackendCheckIn): CheckIn {
  return {
    id: checkIn._id,
    userId: checkIn.userId,
    user: {
      id: checkIn.userId,
      name: checkIn.userName,
      avatarUrl: checkIn.userAvatar,
      createdAt: new Date(checkIn.createdAt),
    },
    mystery: mapMysteryToFrontend(checkIn.mystery),
    reflection: checkIn.reflection,
    intentions: mapIntentionsToFrontend(checkIn.intentions),
    createdAt: new Date(checkIn.createdAt),
    amens: checkIn.amenCount ?? 0,
    hasUserAmened: checkIn.hasUserAmen ?? false,
    comments: (checkIn.comments ?? []).map((comment, index) => ({
      id: `${checkIn._id}-comment-${index}`,
      userId: comment.userId,
      user: {
        id: comment.userId,
        name: comment.userName,
        avatarUrl: comment.userAvatar,
        createdAt: new Date(comment.createdAt),
      },
      checkInId: checkIn._id,
      content: comment.text,
      createdAt: new Date(comment.createdAt),
    })),
  };
}

function mapStatsToFrontend(stats: BackendStatsResponse): UserStats {
  const favoriteMysteries = (stats.favoriteMysteries ?? [])
    .map((item) => {
      if (typeof item === "string") return mapMysteryToFrontend(item);
      return mapMysteryToFrontend(item.mystery);
    })
    .filter(isMysteryType)
    .slice(0, 3);

  return {
    currentStreak: stats.currentStreak ?? 0,
    longestStreak: stats.longestStreak ?? 0,
    totalCheckIns: stats.totalCheckIns ?? 0,
    lastCheckIn: stats.lastCheckIn ? new Date(stats.lastCheckIn) : undefined,
    favoriteMysteries,
  };
}

async function backendRequest<T>(
  path: string,
  init: RequestInit = {},
  requireAuth: boolean = false
): Promise<T | null> {
  if (!USE_BACKEND) return null;

  const token = getAccessToken();
  if (requireAuth && !token) return null;

  const headers = new Headers(init.headers);
  if (!headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }
  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }

  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...init,
    headers,
  });

  if (!response.ok) {
    let message = `Backend request failed (${response.status})`;
    try {
      const data = (await response.json()) as { message?: string | string[] };
      if (Array.isArray(data.message)) {
        message = data.message.join(", ");
      } else if (data.message) {
        message = data.message;
      }
    } catch {
      // Keep default message.
    }
    throw new Error(message);
  }

  return (await response.json()) as T;
}

function updateFavorites(current: MysteryType[], newMystery: MysteryType): MysteryType[] {
  if (!current.includes(newMystery)) {
    return [...current, newMystery].slice(-3);
  }
  return current;
}

export async function submitCheckIn(
  request: CreateCheckInRequest
): Promise<CreateCheckInResponse> {
  const backendCheckIn = await backendRequest<BackendCheckIn>(
    "/checkins",
    {
      method: "POST",
      body: JSON.stringify({
        mystery: frontendToBackendMystery[request.mystery],
        reflection: request.reflection,
        intentions: request.intentions.map((tag) => frontendToBackendIntention[tag]),
        isPublic: true,
      }),
    },
    true
  );

  if (backendCheckIn) {
    const backendStats = await backendRequest<BackendStatsResponse>("/users/me/stats", {}, true);
    if (!backendStats) {
      throw new Error("Backend stats unavailable after check-in.");
    }
    return {
      checkIn: mapCheckInToFrontend(backendCheckIn),
      stats: mapStatsToFrontend(backendStats),
    };
  }

  await delay();
  const stats = getStoredStats();

  if (hasCheckedInToday(stats.lastCheckIn)) {
    throw new Error("Você já rezou o Terço hoje. Volte amanhã!");
  }

  const newCheckIn: CheckIn = {
    id: generateId(),
    userId: currentUser.id,
    user: currentUser,
    mystery: request.mystery,
    reflection: request.reflection,
    intentions: request.intentions,
    createdAt: new Date(),
    amens: 0,
    hasUserAmened: false,
    comments: [],
  };

  const { isNewDay } = calculateStreak(stats.lastCheckIn);
  const newStreak = isNewDay ? stats.currentStreak + 1 : stats.currentStreak;

  const updatedStats: UserStats = {
    currentStreak: newStreak,
    longestStreak: Math.max(stats.longestStreak, newStreak),
    totalCheckIns: stats.totalCheckIns + 1,
    lastCheckIn: new Date(),
    favoriteMysteries: updateFavorites(stats.favoriteMysteries, request.mystery),
  };

  saveCheckIn(newCheckIn);
  saveStats(updatedStats);
  mockCheckIns.unshift(newCheckIn);

  return {
    checkIn: newCheckIn,
    stats: updatedStats,
  };
}

export async function checkTodayStatus(): Promise<{ hasPrayed: boolean; stats: UserStats }> {
  const today = await backendRequest<BackendTodayResponse>("/checkins/today", {}, true);
  const stats = await backendRequest<BackendStatsResponse>("/users/me/stats", {}, true);

  if (today && stats) {
    return {
      hasPrayed: today.hasCheckedIn,
      stats: mapStatsToFrontend(stats),
    };
  }

  await delay(300);
  const localStats = getStoredStats();
  return { hasPrayed: hasCheckedInToday(localStats.lastCheckIn), stats: localStats };
}

export async function getFeed(cursor?: string): Promise<GetFeedResponse> {
  const page = cursor ? Number.parseInt(cursor, 10) : 1;
  const backendFeed = await backendRequest<BackendFeedResponse>(
    `/checkins/feed?page=${Number.isNaN(page) ? 1 : page}&limit=10`
  );

  if (backendFeed) {
    const safePage = backendFeed.page ?? 1;
    const totalPages = backendFeed.totalPages ?? 1;
    const hasMore = safePage < totalPages;

    return {
      checkIns: backendFeed.checkIns.map(mapCheckInToFrontend),
      hasMore,
      nextCursor: hasMore ? String(safePage + 1) : undefined,
    };
  }

  await delay(700);
  const userCheckIns = getStoredCheckIns();
  const allCheckIns = [...userCheckIns, ...mockCheckIns].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  const pageSize = 10;
  const startIndex = cursor ? Number.parseInt(cursor, 10) : 0;
  const safeStartIndex = Number.isNaN(startIndex) ? 0 : startIndex;
  const checkIns = allCheckIns.slice(safeStartIndex, safeStartIndex + pageSize);
  const hasMore = safeStartIndex + pageSize < allCheckIns.length;

  return {
    checkIns,
    hasMore,
    nextCursor: hasMore ? String(safeStartIndex + pageSize) : undefined,
  };
}

export async function getUserStats(): Promise<UserStats> {
  const backendStats = await backendRequest<BackendStatsResponse>("/users/me/stats", {}, true);
  if (backendStats) return mapStatsToFrontend(backendStats);

  await delay(300);
  return getStoredStats();
}

export async function addAmen(request: AddAmenRequest): Promise<{ amens: number }> {
  const backendAmen = await backendRequest<{ amenCount: number }>(
    `/checkins/${request.checkInId}/amen`,
    { method: "POST" },
    true
  );

  if (backendAmen) {
    return { amens: backendAmen.amenCount };
  }

  await delay(200);
  const checkIn = mockCheckIns.find((c) => c.id === request.checkInId);
  if (!checkIn) {
    throw new Error("Check-in not found");
  }

  if (checkIn.hasUserAmened) {
    checkIn.amens--;
    checkIn.hasUserAmened = false;
  } else {
    checkIn.amens++;
    checkIn.hasUserAmened = true;
  }

  return { amens: checkIn.amens };
}

export async function addComment(request: AddCommentRequest): Promise<Comment> {
  const backendResponse = await backendRequest<BackendCheckIn>(
    `/checkins/${request.checkInId}/comments`,
    {
      method: "POST",
      body: JSON.stringify({ text: request.content }),
    },
    true
  );

  if (backendResponse) {
    const mapped = mapCheckInToFrontend(backendResponse);
    const latestComment = mapped.comments[mapped.comments.length - 1];
    if (!latestComment) {
      throw new Error("Comment was not returned by backend.");
    }
    return latestComment;
  }

  await delay(400);
  const checkIn = mockCheckIns.find((c) => c.id === request.checkInId);
  if (!checkIn) {
    throw new Error("Check-in not found");
  }

  const newComment: Comment = {
    id: generateId(),
    userId: currentUser.id,
    user: currentUser,
    checkInId: request.checkInId,
    content: request.content,
    createdAt: new Date(),
  };

  checkIn.comments.push(newComment);
  return newComment;
}

export interface CheckInRepository {
  submit: typeof submitCheckIn;
  getTodayStatus: typeof checkTodayStatus;
}

export interface FeedRepository {
  getFeed: typeof getFeed;
  addAmen: typeof addAmen;
  addComment: typeof addComment;
}

export interface StatsRepository {
  getUserStats: typeof getUserStats;
}

export const checkInRepository: CheckInRepository = {
  submit: submitCheckIn,
  getTodayStatus: checkTodayStatus,
};

export const feedRepository: FeedRepository = {
  getFeed,
  addAmen,
  addComment,
};

export const statsRepository: StatsRepository = {
  getUserStats,
};
