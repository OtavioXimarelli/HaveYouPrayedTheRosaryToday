'use client';

import {useEffect, useState} from 'react';

/**
 * Hydration shield for components that read persisted browser state.
 * The explicit effect guarantees a second render after hydration, including
 * direct visits where no Zustand update would otherwise wake the component.
 */
export function useIsMounted(): boolean {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // This state change is the hydration boundary: persisted browser values
    // must never be rendered during the server/client comparison pass.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  return mounted;
}
