import { z } from 'zod';
import { ISODateSchema } from './shared';
import { MysteryType } from './index';

export const PrayerCheckInSchema = z.object({
  id: z.string().uuid(),
  date: ISODateSchema,
  mystery: z.enum(['joyful', 'luminous', 'sorrowful', 'glorious']),
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
  favoriteMysterys: MysteryType[];
  addCheckIn: (date: string, mystery: MysteryType, intentions?: string[], reflection?: string) => void;
  resetStreakIfNeeded: () => void;
  getWeeklyProgress: () => number;
  getRecentActivity: (limit?: number) => PrayerCheckIn[];
  hasCheckedInToday: () => boolean;
}
