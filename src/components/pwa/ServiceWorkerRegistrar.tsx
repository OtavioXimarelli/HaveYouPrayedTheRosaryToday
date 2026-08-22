'use client';

import {useEffect} from 'react';

export function ServiceWorkerRegistrar() {
  useEffect(() => {
    if (!('serviceWorker' in navigator)) return;
    if (process.env.NODE_ENV === 'production') {
      navigator.serviceWorker.register('/sw.js').catch(() => {});
      return;
    }
    navigator.serviceWorker.getRegistrations().then((registrations) => {
      for (const registration of registrations) void registration.unregister();
    });
    if ('caches' in window) {
      caches.keys().then((keys) => {
        for (const key of keys) void caches.delete(key);
      });
    }
  }, []);

  return null;
}
