import { z } from 'zod';
import { ISODateSchema } from './shared';

export const JournalEntrySchema = z.object({
  id: z.string().uuid(),
  date: ISODateSchema,
  content: z.string().min(1),
  mood: z.enum(['peaceful', 'struggling', 'grateful', 'dry', 'neutral']).optional(),
  tags: z.array(z.string()).default([]),
  intentions: z.string().optional(),
  mystery: z.string().optional(),
});

export type JournalEntry = z.infer<typeof JournalEntrySchema>;

export interface JournalState {
  entries: JournalEntry[];
  addEntry: (entry: Omit<JournalEntry, 'id'>) => void;
  updateEntry: (id: string, entry: Partial<Omit<JournalEntry, 'id'>>) => void;
  deleteEntry: (id: string) => void;
  getRecentEntries: (count?: number) => JournalEntry[];
}
