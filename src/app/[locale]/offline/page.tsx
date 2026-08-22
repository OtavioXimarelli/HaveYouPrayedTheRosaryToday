import {useTranslations} from 'next-intl';
import {Link} from '@/i18n/routing';

export default function OfflinePage() {
  const t = useTranslations('Offline');
  return <div className="reading-wrap section-pad"><div className="hero-copy"><span className="eyebrow">{t('eyebrow')}</span><h1 className="page-title">{t('title')}</h1><p className="lede">{t('body')}</p><div className="hero-actions"><Link href="/rosary" className="button">{t('rosaryAction')}</Link><Link href="/sanctuary" className="button button-secondary">{t('sanctuaryAction')}</Link></div></div></div>;
}
