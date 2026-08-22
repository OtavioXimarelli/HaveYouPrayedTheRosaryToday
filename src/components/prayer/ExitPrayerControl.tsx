'use client';

import {useEffect, useRef, useState} from 'react';
import {createPortal} from 'react-dom';
import {ArrowLeft} from 'lucide-react';
import {useTranslations} from 'next-intl';
import {useRouter} from '@/i18n/routing';
import {usePrayerStore} from '@/store/usePrayerStore';

export function ExitPrayerControl() {
  const t = useTranslations('Rosary');
  const tNav = useTranslations('Navigation');
  const router = useRouter();
  const discardSession = usePrayerStore((state) => state.discardSession);
  const [open, setOpen] = useState(false);
  const confirmRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    confirmRef.current?.focus();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  return (
    <>
      <button type="button" className="focus-exit" onClick={() => setOpen(true)}>
        <ArrowLeft size={16} aria-hidden="true" />
        <span>{tNav('leavePrayer')}</span>
      </button>

      {open && createPortal(
        <div className="beta-overlay" onClick={() => setOpen(false)}>
          <section
            className="beta-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="exit-dialog-title"
            onClick={(event) => event.stopPropagation()}
          >
            <h2 id="exit-dialog-title" className="beta-title">{t('exitTitle')}</h2>
            <p className="beta-body">{t('exitBody')}</p>
            <div className="exit-actions">
              <button type="button" ref={confirmRef} className="button" onClick={() => { setOpen(false); router.push('/sanctuary'); }}>{t('exitSave')}</button>
              <button type="button" className="button button-secondary" onClick={() => { discardSession(); router.push('/sanctuary'); }}>{t('exitDiscard')}</button>
              <button type="button" className="text-link exit-keep" onClick={() => setOpen(false)}>{t('exitKeep')}</button>
            </div>
          </section>
        </div>,
        document.body,
      )}
    </>
  );
}
