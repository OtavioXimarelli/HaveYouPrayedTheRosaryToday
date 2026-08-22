'use client';

import {useTranslations} from 'next-intl';
import {Link} from '@/i18n/routing';

export function EvangelizaeSeal({className = ''}: {className?: string}) {
  const t = useTranslations('Brand');
  return (
    <svg className={className} viewBox="0 0 48 48" role="img" aria-label={t('ariaLabel')}>
      <circle cx="24" cy="24" r="22" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <path d="M24 8v25M17.5 15.5h13" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M10 35c7-6 12-7 14-2 2-5 7-4 14 2" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M24 33v7" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export function BrandMark({compact = false}: {compact?: boolean}) {
  const t = useTranslations('Brand');
  return (
    <Link href="/inicio?via=selo" className="brand-mark" aria-label={t('ariaLabel')}>
      <EvangelizaeSeal className="brand-seal" />
      {!compact && (
        <span className="brand-copy">
          <span className="brand-name">Evangelizae</span>
          <span className="brand-line">{t('tagline')}</span>
        </span>
      )}
    </Link>
  );
}
