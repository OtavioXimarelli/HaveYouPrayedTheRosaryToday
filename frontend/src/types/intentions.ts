import { z } from 'zod';

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
