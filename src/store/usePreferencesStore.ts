'use client';

import {create} from 'zustand';
import {persist} from 'zustand/middleware';
import {getLocalDateKey} from '@/lib/date';

export type ThemePreference = 'system' | 'light' | 'dark';
export type ReaderScale = 'normal' | 'large' | 'xl';
export type PrayerWindow = 'morning' | 'afternoon' | 'evening';

export interface PreferencesState {
  firstName: string;
  prayerWindow: PrayerWindow;
  reminderTime: string;
  theme: ThemePreference;
  readerScale: ReaderScale;
  onboardedAt: string | null;
  reminderDismissedDate: string | null;
  setProfile: (profile: Partial<Pick<PreferencesState, 'firstName' | 'prayerWindow' | 'reminderTime' | 'theme' | 'readerScale'>>) => void;
  completeOnboarding: () => void;
  dismissReminderToday: () => void;
  resetPreferences: () => void;
}

const initialPreferences = {
  firstName: '',
  prayerWindow: 'morning' as PrayerWindow,
  reminderTime: '07:00',
  theme: 'system' as ThemePreference,
  readerScale: 'large' as ReaderScale,
  onboardedAt: null as string | null,
  reminderDismissedDate: null as string | null,
};

export function isReminderDue(reminderTime: string, dismissedDate: string | null, now: Date = new Date()) {
  if (dismissedDate === getLocalDateKey(now)) return false;
  const [hours, minutes] = reminderTime.split(':').map(Number);
  return now.getHours() * 60 + now.getMinutes() >= hours * 60 + minutes;
}

export const usePreferencesStore = create<PreferencesState>()(
  persist(
    (set) => ({
      ...initialPreferences,
      setProfile: (profile) => set(profile),
      completeOnboarding: () => {
        document.cookie = 'evangelizae_onboarded=1; Path=/; Max-Age=15552000; SameSite=Lax';
        set({onboardedAt: new Date().toISOString()});
      },
      dismissReminderToday: () => set({reminderDismissedDate: getLocalDateKey()}),
      resetPreferences: () => {
        document.cookie = 'evangelizae_onboarded=; Path=/; Max-Age=0; SameSite=Lax';
        set({...initialPreferences});
      },
    }),
    {name: 'evangelizae-preferences', version: 1},
  ),
);
