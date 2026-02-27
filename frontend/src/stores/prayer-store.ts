import { create } from "zustand";
import { persist } from "zustand/middleware";
import {
  CheckIn,
  UserStats,
  MysteryType,
  IntentionTag,
  getTodaysMystery,
} from "@/types";

interface PrayerState {
  // Stats
  currentStreak: number;
  longestStreak: number;
  totalCheckIns: number;
  lastPrayedDate: string | null; // ISO string for serialisation
  favoriteMysterys: MysteryType[];

  // Check-ins
  checkIns: CheckIn[];

  // Actions
  submitCheckIn: (mystery: MysteryType, reflection?: string, intentions?: IntentionTag[]) => CheckIn;
  hydrateAndRecalculate: () => void;
  getWeeklyCheckIns: () => CheckIn[];
  getWeeklyProgress: () => number;
  getRecentActivity: (limit?: number) => CheckIn[];
  hasCheckedInToday: () => boolean;
  getStats: () => UserStats;
}

function localMidnight(date: Date): Date {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  return d;
}

function daysDiff(a: Date, b: Date): number {
  const aM = localMidnight(a);
  const bM = localMidnight(b);
  return Math.floor((aM.getTime() - bM.getTime()) / (1000 * 60 * 60 * 24));
}

function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

export const usePrayerStore = create<PrayerState>()(
  persist(
    (set, get) => ({
      currentStreak: 0,
      longestStreak: 0,
      totalCheckIns: 0,
      lastPrayedDate: null,
      favoriteMysterys: [],
      checkIns: [],

      submitCheckIn: (mystery, reflection, intentions = []) => {
        const state = get();
        const now = new Date();
        const alreadyToday = state.hasCheckedInToday();

        const newCheckIn: CheckIn = {
          id: generateId(),
          userId: "current-user",
          user: { id: "current-user", name: "Você", createdAt: new Date() },
          mystery,
          reflection,
          intentions,
          createdAt: now,
          amens: 0,
          hasUserAmened: false,
          comments: [],
        };

        let newStreak = state.currentStreak;
        let newLongest = state.longestStreak;

        if (!alreadyToday) {
          if (state.lastPrayedDate) {
            const diff = daysDiff(now, new Date(state.lastPrayedDate));
            if (diff === 1) {
              // Consecutive day
              newStreak = state.currentStreak + 1;
            } else if (diff === 0) {
              // Same day (shouldn't reach here due to alreadyToday check)
              newStreak = state.currentStreak;
            } else {
              // Streak broken
              newStreak = 1;
            }
          } else {
            newStreak = 1;
          }
          newLongest = Math.max(newLongest, newStreak);
        }

        // Track favorite mysteries
        const allMysterys = [...state.checkIns, newCheckIn].map((c) => c.mystery);
        const mysteryCounts = allMysterys.reduce(
          (acc, m) => {
            acc[m] = (acc[m] || 0) + 1;
            return acc;
          },
          {} as Record<string, number>
        );
        const sortedMysterys = Object.entries(mysteryCounts)
          .sort(([, a], [, b]) => b - a)
          .map(([m]) => m as MysteryType);

        set({
          checkIns: [newCheckIn, ...state.checkIns],
          totalCheckIns: state.totalCheckIns + 1,
          currentStreak: newStreak,
          longestStreak: newLongest,
          lastPrayedDate: now.toISOString(),
          favoriteMysterys: sortedMysterys.slice(0, 3),
        });

        return newCheckIn;
      },

      hydrateAndRecalculate: () => {
        const state = get();
        if (!state.lastPrayedDate) return;

        const now = new Date();
        const lastPrayed = new Date(state.lastPrayedDate);
        const diff = daysDiff(now, lastPrayed);

        // If more than 1 day has passed since last prayer, reset streak
        if (diff > 1) {
          set({ currentStreak: 0 });
        }
      },

      getWeeklyCheckIns: () => {
        const state = get();
        const now = new Date();
        const weekAgo = new Date(now);
        weekAgo.setDate(now.getDate() - 6);
        weekAgo.setHours(0, 0, 0, 0);

        return state.checkIns.filter(
          (c) => new Date(c.createdAt) >= weekAgo
        );
      },

      getWeeklyProgress: () => {
        const weeklyCheckIns = get().getWeeklyCheckIns();
        // Count unique days
        const uniqueDays = new Set(
          weeklyCheckIns.map((c) =>
            localMidnight(new Date(c.createdAt)).toISOString()
          )
        );
        return uniqueDays.size;
      },

      getRecentActivity: (limit = 5) => {
        return get().checkIns.slice(0, limit);
      },

      hasCheckedInToday: () => {
        const { lastPrayedDate } = get();
        if (!lastPrayedDate) return false;
        return daysDiff(new Date(), new Date(lastPrayedDate)) === 0;
      },

      getStats: () => {
        const state = get();
        return {
          currentStreak: state.currentStreak,
          longestStreak: state.longestStreak,
          totalCheckIns: state.totalCheckIns,
          lastCheckIn: state.lastPrayedDate
            ? new Date(state.lastPrayedDate)
            : undefined,
          favoriteMysterys: state.favoriteMysterys,
        };
      },
    }),
    {
      name: "rosary-prayer-storage",
      // Rehydrate dates in check-ins
      onRehydrateStorage: () => (state) => {
        if (state) {
          state.checkIns = state.checkIns.map((c) => ({
            ...c,
            createdAt: new Date(c.createdAt),
            user: c.user
              ? { ...c.user, createdAt: new Date(c.user.createdAt) }
              : c.user,
          }));
          // Run streak recalculation after hydration
          state.hydrateAndRecalculate();
        }
      },
    }
  )
);
