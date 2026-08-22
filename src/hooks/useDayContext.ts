'use client';

import {useEffect, useState} from 'react';
import {getDayContext, type DayContext} from '@/lib/dayContext';

function snapshot(): DayContext {
  return getDayContext(new Date());
}

export function useDayContext(): DayContext {
  const [context, setContext] = useState<DayContext>(snapshot);

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>;
    const scheduleNextHour = () => {
      const now = new Date();
      const nextHour = new Date(now.getFullYear(), now.getMonth(), now.getDate(), now.getHours() + 1, 0, 0, 0);
      timeoutId = setTimeout(() => {
        setContext(snapshot());
        scheduleNextHour();
      }, nextHour.getTime() - now.getTime());
    };
    scheduleNextHour();
    return () => clearTimeout(timeoutId);
  }, []);

  return context;
}
