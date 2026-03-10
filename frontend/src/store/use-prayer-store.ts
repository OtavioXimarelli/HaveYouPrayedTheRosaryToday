import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { startOfDay, differenceInDays } from 'date-fns';
import { PrayerState, PrayerCheckIn } from '../types/store';

export const usePrayerStore = create<PrayerState>()(
  persist(
    (set, get) => ({
      checkIns: [],
      lastPrayedDate: null,
      currentStreak: 0,
      longestStreak: 0,
      totalCheckIns: 0,
      favoriteMysterys: [],

      addCheckIn: (date, mystery, intentions = [], reflection?: string) => {
        set((state) => {
          const newCheckin: PrayerCheckIn = { id: crypto.randomUUID(), date, mystery, intentions, reflection };
          const dateOnly = date.split('T')[0];
          
          if (state.checkIns.some(c => c.date.startsWith(dateOnly))) {
             return state; // Already prayed today
          }

          const isNewStreakRecord = state.currentStreak + 1 > state.longestStreak;

          const allMysteries = [...state.checkIns, newCheckin].map((c) => c.mystery);
          const counts = allMysteries.reduce((acc, m) => {
            acc[m] = (acc[m] || 0) + 1;
            return acc;
          }, {} as Record<string, number>);
          
          const sortedFavs = Object.entries(counts)
            .sort(([, a], [, b]) => b - a)
            .map(([m]) => m as any);

          return {
            checkIns: [newCheckin, ...state.checkIns],
            lastPrayedDate: date,
            currentStreak: state.currentStreak + 1,
            longestStreak: isNewStreakRecord ? state.currentStreak + 1 : state.longestStreak,
            totalCheckIns: state.totalCheckIns + 1,
            favoriteMysterys: sortedFavs.slice(0, 3)
          };
        });
      },

      resetStreakIfNeeded: () => {
        set((state) => {
          if (!state.lastPrayedDate) return state;

          const today = startOfDay(new Date());
          const lastPrayed = startOfDay(new Date(state.lastPrayedDate));
          const daysDifference = differenceInDays(today, lastPrayed);

          if (daysDifference > 1) {
            return {
              ...state,
              currentStreak: 0,
            };
          }
          return state;
        });
      },

      getWeeklyProgress: () => {
        const checkIns = get().checkIns;
        const now = new Date();
        const weekAgo = new Date(now);
        weekAgo.setDate(now.getDate() - 6);
        weekAgo.setHours(0, 0, 0, 0);

        const recent = checkIns.filter(c => new Date(c.date) >= weekAgo);
        const uniqueDays = new Set(recent.map(c => c.date.split('T')[0]));
        return uniqueDays.size;
      },

      getRecentActivity: (limit = 5) => {
        return get().checkIns.slice(0, limit);
      },

      hasCheckedInToday: () => {
        const { lastPrayedDate } = get();
        if (!lastPrayedDate) return false;
        
        const today = startOfDay(new Date());
        const last = startOfDay(new Date(lastPrayedDate));
        return differenceInDays(today, last) === 0;
      }
    }),
    {
      name: 'rosario-vivo-prayer-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
