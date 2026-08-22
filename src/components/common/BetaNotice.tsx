'use client';

import {useEffect, useRef, useState} from 'react';
import {useTranslations} from 'next-intl';
import {useIsMounted} from '@/hooks/useIsMounted';

const DISMISS_KEY = 'evangelizae-beta-notice-dismissed';

export function BetaNotice() {
  const t = useTranslations('Beta');
  const mounted = useIsMounted();
  const [open, setOpen] = useState(
    () => typeof window !== 'undefined' && window.localStorage.getItem(DISMISS_KEY) !== '1',
  );
  const acceptRef = useRef<HTMLButtonElement>(null);

  const close = () => {
    window.localStorage.setItem(DISMISS_KEY, '1');
    setOpen(false);
  };

  useEffect(() => {
    if (!open) return;
    acceptRef.current?.focus();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') close();
    };
    window.addEventListener('keydown', onKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  if (!mounted || !open) return null;

  return (
    <div className="beta-overlay" onClick={close}>
      <section
        className="beta-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="beta-modal-title"
        onClick={(event) => event.stopPropagation()}
      >
        <span className="eyebrow">{t('eyebrow')}</span>
        <h2 id="beta-modal-title" className="beta-title">{t('title')}</h2>
        <p className="beta-body">{t('body')}</p>
        <p className="beta-coming-label">{t('comingTitle')}</p>
        <ul className="beta-roadmap">
          <li>{t('itemAccounts')}</li>
          <li>{t('itemCommunion')}</li>
          <li>{t('itemFormation')}</li>
        </ul>
        <div className="beta-actions">
          <button type="button" ref={acceptRef} className="button" onClick={close}>{t('dismiss')}</button>
        </div>
      </section>
    </div>
  );
}
