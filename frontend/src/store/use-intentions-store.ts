import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { IntentionsState } from '../types/store';

export const useIntentionsStore = create<IntentionsState>()(
  persist(
    (set) => ({
      intentions: [],

      addIntention: (title, category) => {
        set((state) => ({
          intentions: [
            {
              id: crypto.randomUUID(),
              title,
              category,
              createdAt: Date.now(),
              prayedCount: 0,
              status: 'active',
              answeredAt: null,
            },
            ...state.intentions,
          ],
        }));
      },

      incrementPrayedCount: (id) => {
        set((state) => ({
          intentions: state.intentions.map((intention) =>
            intention.id === id
              ? { ...intention, prayedCount: intention.prayedCount + 1 }
              : intention
          ),
        }));
      },

      markAsAnswered: (id) => {
        set((state) => ({
          intentions: state.intentions.map((intention) =>
            intention.id === id
              ? { ...intention, status: 'answered', answeredAt: Date.now() }
              : intention
          ),
        }));
      },

      deleteIntention: (id) => {
        set((state) => ({
          intentions: state.intentions.filter((intention) => intention.id !== id),
        }));
      },
    }),
    {
      name: 'rosario-vivo-intentions-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
