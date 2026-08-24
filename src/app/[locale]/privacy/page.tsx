import {useTranslations} from 'next-intl';
import type {Metadata} from 'next';
import {Link} from '@/i18n/routing';

export const metadata: Metadata = {
  title: 'Privacidade',
  description: 'Entenda quais dados o Evangelizae guarda localmente e como exportar ou apagar suas informações.',
  alternates: {canonical: '/pt/privacy'},
};

export default function PrivacyPage() {
  const t = useTranslations('Privacy');
  const sections = [
    [t('localTitle'), t('localBody')],
    [t('liturgyTitle'), t('liturgyBody')],
    [t('telemetryTitle'), t('telemetryBody')],
    [t('essentialTitle'), t('essentialBody')],
  ];
  return (
    <div className="reading-wrap privacy-page">
      <header className="page-header statement-header"><span className="eyebrow">{t('eyebrow')}</span><h1 className="page-title">{t('title')}</h1><p className="lede">{t('intro')}</p></header>
      <div className="section-pad feature-list">
        {sections.map(([title, body], index) => <section className="feature-row" key={title}><span className="feature-number">0{index + 1}</span><span><h2>{title}</h2><p>{body}</p></span></section>)}
      </div>
      <Link href="/settings" className="button">{t('settingsAction')}</Link>
    </div>
  );
}
