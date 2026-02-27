import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface JournalEntry {
  id: string;
  checkInId: string;
  reflection: string;
  mystery: string;
  createdAt: Date;
}

interface JournalState {
  entries: JournalEntry[];
  addEntry: (entry: Omit<JournalEntry, "id">) => void;
  getRecent: (limit?: number) => JournalEntry[];
}

export const useJournalStore = create<JournalState>()(
  persist(
    (set, get) => ({
      entries: [],

      addEntry: (entry) => {
        const newEntry: JournalEntry = {
          ...entry,
          id: `journal-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        };
        set((state) => ({
          entries: [newEntry, ...state.entries],
        }));
      },

      getRecent: (limit = 5) => {
        return get().entries.slice(0, limit);
      },
    }),
    {
      name: "rosary-journal-storage",
      onRehydrateStorage: () => (state) => {
        if (state) {
          state.entries = state.entries.map((e) => ({
            ...e,
            createdAt: new Date(e.createdAt),
          }));
        }
      },
    }
  )
);
