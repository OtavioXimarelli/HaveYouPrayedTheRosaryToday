import { useState, useEffect } from "react";

/**
 * Hook to safely use Zustand persisted stores with Next.js SSR.
 * Returns `undefined` on the server / first render, then the actual store value after hydration.
 * This prevents hydration mismatches between server and client.
 *
 * Usage:
 *   const streak = useHydrated(usePrayerStore, (s) => s.currentStreak);
 */
export function useHydrated<T, U>(
  store: { getState: () => T; subscribe: (listener: (state: T) => void) => () => void },
  selector: (state: T) => U
): U | undefined {
  const [hydrated, setHydrated] = useState(false);
  const [value, setValue] = useState<U | undefined>(undefined);

  useEffect(() => {
    setHydrated(true);
    setValue(selector(store.getState()));

    const unsub = store.subscribe((state) => {
      setValue(selector(state));
    });

    return unsub;
  }, [store, selector]);

  if (!hydrated) return undefined;
  return value;
}

/**
 * Simpler hook: just returns whether the component has mounted (client-side).
 * Use this to conditionally render store-dependent UI.
 */
export function useIsMounted(): boolean {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return mounted;
}
