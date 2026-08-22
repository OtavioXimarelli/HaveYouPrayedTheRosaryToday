'use client';

import {useTranslations} from 'next-intl';
import {Link} from '@/i18n/routing';

export function EvangelizaeSeal({className = ''}: {className?: string}) {
  const t = useTranslations('Brand');
  return (
    <svg className={className} viewBox="0 0 48 48" role="img" aria-label={t('ariaLabel')}>
      <path d="M24 6v36M13.5 17.5h21" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

export function BrandMark({compact = false}: {compact?: boolean}) {
  const t = useTranslations('Brand');
  const tCommon = useTranslations('Common');
  return (
    <Link href="/inicio?via=selo" className="brand-mark" aria-label={t('ariaLabel')}>
      <EvangelizaeSeal className="brand-seal" />
      {!compact && (
        <span className="brand-copy">
          <span className="brand-name">
            Evangelizae
            <span className="brand-beta">{tCommon('betaChip')}</span>
          </span>
          <span className="brand-line">{t('tagline')}</span>
        </span>
      )}
    </Link>
  );
}
