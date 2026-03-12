import { z } from 'zod';

// Shared Null-Safe Date Logic (ISO Strings)
export const ISODateSchema = z.string().refine((val) => !isNaN(Date.parse(val)), {
  message: 'Invalid ISO date string',
});
