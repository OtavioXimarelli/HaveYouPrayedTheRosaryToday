import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { JournalState, JournalEntrySchema } from '../types/store';

export const useJournalStore = create<JournalState>()(
  persist(
    (set, get) => ({
      entries: [],

      addEntry: (entry) => {
        set((state) => ({
          entries: [{ id: crypto.randomUUID(), ...entry }, ...state.entries],
        }));
      },

      updateEntry: (id, updatedFields) => {
        set((state) => ({
          entries: state.entries.map((entry) =>
            entry.id === id ? { ...entry, ...updatedFields } : entry
          ),
        }));
      },

      deleteEntry: (id) => {
        set((state) => ({
          entries: state.entries.filter((entry) => entry.id !== id),
        }));
      },

      getRecentEntries: (count = 5) => {
        // Entries are added to the beginning, so they are naturally reverse-chronological
        return get().entries.slice(0, count);
      },
    }),
    {
      name: 'rosario-vivo-journal-storage',
      storage: createJSONStorage(() => typeof window !== 'undefined' ? window.localStorage : undefined as any),
      merge: (persistedState: any, currentState) => {
        if (!persistedState) return currentState;

        let validatedEntries = currentState.entries;
        if (Array.isArray(persistedState.entries)) {
          validatedEntries = persistedState.entries.filter((e: any) => 
            JournalEntrySchema.safeParse(e).success
          );
        }

        return {
          ...currentState,
          ...persistedState,
          entries: validatedEntries,
        };
      }
    }
  )
);
