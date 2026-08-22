'use client';

import {useEffect, useState} from 'react';
import {useTranslations} from 'next-intl';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{outcome: 'accepted' | 'dismissed'}>;
}

export function PwaInstallPrompt() {
  const t = useTranslations('Navigation');
  const [promptEvent, setPromptEvent] = useState<BeforeInstallPromptEvent | null>(null);
  const [dismissed, setDismissed] = useState(() => typeof window !== 'undefined' && sessionStorage.getItem('evangelizae-install-dismissed') === '1');

  useEffect(() => {
    const capture = (event: Event) => { event.preventDefault(); setPromptEvent(event as BeforeInstallPromptEvent); };
    window.addEventListener('beforeinstallprompt', capture);
    return () => window.removeEventListener('beforeinstallprompt', capture);
  }, []);

  if (!promptEvent || dismissed) return null;
  const close = () => { sessionStorage.setItem('evangelizae-install-dismissed', '1'); setDismissed(true); };
  const install = async () => { await promptEvent.prompt(); await promptEvent.userChoice; setPromptEvent(null); };

  return <aside className="reminder-cue" style={{position: 'fixed', right: '1rem', bottom: '5.2rem', zIndex: 34, width: 'min(24rem, calc(100% - 2rem))', boxShadow: 'var(--shadow)'}}><strong>{t('installTitle')}</strong><div className="hero-actions" style={{marginTop: '.8rem'}}><button className="button button-small" onClick={install}>{t('installAction')}</button><button className="button button-quiet" onClick={close}>{t('installLater')}</button></div></aside>;
}
