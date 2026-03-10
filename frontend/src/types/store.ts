import { z } from 'zod';
import { MysteryType } from './index';

// Shared Null-Safe Date Logic (ISO Strings)
export const ISODateSchema = z.string().refine((val) => !isNaN(Date.parse(val)), {
  message: 'Invalid ISO date string',
});

// --- PRAYER STORE ---

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

// --- JOURNAL STORE ---

export const JournalEntrySchema = z.object({
  id: z.string().uuid(),
  date: ISODateSchema,
  content: z.string().min(1),
  mood: z.enum(['peaceful', 'struggling', 'grateful', 'dry', 'neutral']).optional(),
  tags: z.array(z.string()).default([]),
});

export type JournalEntry = z.infer<typeof JournalEntrySchema>;

export interface JournalState {
  entries: JournalEntry[];
  addEntry: (entry: Omit<JournalEntry, 'id'>) => void;
  updateEntry: (id: string, entry: Partial<Omit<JournalEntry, 'id'>>) => void;
  deleteEntry: (id: string) => void;
  getRecentEntries: (count?: number) => JournalEntry[];
}

// --- INTENTIONS STORE ---

export const IntentionCategorySchema = z.enum(['familia', 'saude', 'conversao', 'almas', 'outros']);

export type IntentionCategory = z.infer<typeof IntentionCategorySchema>;

export const IntentionSchema = z.object({
  id: z.string().uuid(),
  title: z.string().min(1),
  category: IntentionCategorySchema,
  createdAt: z.number(), // timestamp for sorting
  prayedCount: z.number().min(0).default(0),
  status: z.enum(['active', 'answered']).default('active'),
  answeredAt: z.number().nullable().default(null),
});

export type Intention = z.infer<typeof IntentionSchema>;

export interface IntentionsState {
  intentions: Intention[];
  addIntention: (title: string, category: IntentionCategory) => void;
  incrementPrayedCount: (id: string) => void;
  markAsAnswered: (id: string) => void;
  deleteIntention: (id: string) => void;
}
