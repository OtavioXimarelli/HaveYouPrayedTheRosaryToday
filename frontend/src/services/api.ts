/**
 * API Service Layer
 *
 * This file implements the Service/Repository pattern for the frontend.
 * Currently uses mock data and localStorage, but is designed to be
 * seamlessly replaced with actual API calls to the Java Spring Boot backend.
 *
 * All functions simulate network latency with delays.
 */

import {
  CheckIn,
  CreateCheckInRequest,
  CreateCheckInResponse,
  GetFeedResponse,
  UserStats,
  AddCommentRequest,
  AddAmenRequest,
  Comment,
  MysteryType,
} from "@/types";
import {
  mockCheckIns,
  currentUser,
  getStoredStats,
  saveStats,
  saveCheckIn,
  generateId,
  calculateStreak,
  hasCheckedInToday,
  getStoredCheckIns,
} from "./mockData";

// ===========================
// Configuration
// ===========================

const SIMULATED_DELAY_MS = 500; // Simulates network latency

function delay(ms: number = SIMULATED_DELAY_MS): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// ===========================
// Check-in Service
// ===========================

/**
 * Submit a new rosary check-in
 */
export async function submitCheckIn(
  request: CreateCheckInRequest
): Promise<CreateCheckInResponse> {
  await delay();

  const stats = getStoredStats();

  // Check if already checked in today
  if (hasCheckedInToday(stats.lastCheckIn)) {
    throw new Error("Você já rezou o Terço hoje. Volte amanhã!");
  }

  // Create new check-in
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

  // Update stats
  const { current: streakBonus, isNewDay } = calculateStreak(stats.lastCheckIn);
  
  const newStreak = isNewDay ? stats.currentStreak + 1 : stats.currentStreak;
  const updatedStats: UserStats = {
    currentStreak: newStreak,
    longestStreak: Math.max(stats.longestStreak, newStreak),
    totalCheckIns: stats.totalCheckIns + 1,
    lastCheckIn: new Date(),
    favoriteMysterys: updateFavorites(stats.favoriteMysterys, request.mystery),
  };

  // Persist to localStorage
  saveCheckIn(newCheckIn);
  saveStats(updatedStats);

  // Add to mock feed
  mockCheckIns.unshift(newCheckIn);

  return {
    checkIn: newCheckIn,
    stats: updatedStats,
  };
}

function updateFavorites(
  current: MysteryType[],
  newMystery: MysteryType
): MysteryType[] {
  // Simple implementation: add to favorites if not already there
  if (!current.includes(newMystery)) {
    return [...current, newMystery].slice(-3) as MysteryType[];
  }
  return current;
}

/**
 * Check if user has already prayed today
 */
export async function checkTodayStatus(): Promise<{ hasPrayed: boolean; stats: UserStats }> {
  await delay(300);

  const stats = getStoredStats();
  const hasPrayed = hasCheckedInToday(stats.lastCheckIn);

  return { hasPrayed, stats };
}

// ===========================
// Feed Service
// ===========================

/**
 * Get the community feed of check-ins
 */
export async function getFeed(cursor?: string): Promise<GetFeedResponse> {
  await delay(700);

  // Merge mock check-ins with user's stored check-ins
  const userCheckIns = getStoredCheckIns();
  const allCheckIns = [...userCheckIns, ...mockCheckIns].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  // Simple pagination simulation
  const pageSize = 10;
  const startIndex = cursor ? parseInt(cursor, 10) : 0;
  const checkIns = allCheckIns.slice(startIndex, startIndex + pageSize);
  const hasMore = startIndex + pageSize < allCheckIns.length;

  return {
    checkIns,
    hasMore,
    nextCursor: hasMore ? String(startIndex + pageSize) : undefined,
  };
}

// ===========================
// User Stats Service
// ===========================

/**
 * Get user statistics
 */
export async function getUserStats(): Promise<UserStats> {
  await delay(300);
  return getStoredStats();
}

// ===========================
// Interaction Services
// ===========================

/**
 * Add an "Amen" (like) to a check-in
 */
export async function addAmen(request: AddAmenRequest): Promise<{ amens: number }> {
  await delay(200);

  const checkIn = mockCheckIns.find((c) => c.id === request.checkInId);
  if (checkIn) {
    if (checkIn.hasUserAmened) {
      checkIn.amens--;
      checkIn.hasUserAmened = false;
    } else {
      checkIn.amens++;
      checkIn.hasUserAmened = true;
    }
    return { amens: checkIn.amens };
  }

  throw new Error("Check-in not found");
}

/**
 * Add a comment to a check-in
 */
export async function addComment(request: AddCommentRequest): Promise<Comment> {
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

// ===========================
// Type Exports for Repository Pattern
// ===========================

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

// Repository instances (for dependency injection pattern)
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
