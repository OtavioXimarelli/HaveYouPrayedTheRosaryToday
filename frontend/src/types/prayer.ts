import { z } from 'zod';
import { ISODateSchema } from './shared';
import { MysteryType, MYSTERY_TYPES } from './index';

export const PrayerCheckInSchema = z.object({
  id: z.string().uuid(),
  date: ISODateSchema,
  mystery: z.enum(MYSTERY_TYPES),
  intentions: z.array(z.string()).default([]),
  reflection: z.string().optional(),
});

export type PrayerCheckIn = z.infer<typeof PrayerCheckInSchema>;

export interface PrayerState {
  checkIns: PrayerCheckIn[];
  lastPrayedDate: string | null;
  currentStreak: number;
  longestStreak: number;
  totalCheckIns: number;
  favoriteMysteries: MysteryType[];
  addCheckIn: (date: string, mystery: MysteryType, intentions?: string[], reflection?: string) => void;
  resetStreakIfNeeded: () => void;
  getWeeklyProgress: () => number;
  getRecentActivity: (limit?: number) => PrayerCheckIn[];
  hasCheckedInToday: () => boolean;
}
