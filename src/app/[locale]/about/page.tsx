import {ArrowRight} from 'lucide-react';
import {useTranslations} from 'next-intl';
import {Link} from '@/i18n/routing';

export default function AboutPage() {
  const t = useTranslations('About');
  const commitments = [
    [t('truthTitle'), t('truthBody')],
    [t('silenceTitle'), t('silenceBody')],
    [t('communionTitle'), t('communionBody')],
    [t('giftTitle'), t('giftBody')],
  ];

  return (
    <div className="page-wrap about-page">
      <header className="page-header statement-header">
        <span className="eyebrow">{t('eyebrow')}</span>
        <h1 className="page-title">{t('title')}</h1>
        <p className="lede drop-cap">{t('intro')}</p>
      </header>
      <section className="section-pad split-section mission-section">
        <h2 className="section-title mission-motto">{t('mottoTruth')}<br />{t('mottoCommunion')}<br />{t('mottoMission')}</h2>
        <div className="feature-list">
          {commitments.map(([title, body], index) => (
            <div className="feature-row" key={title}>
              <span className="feature-number">0{index + 1}</span>
              <span><h3>{title}</h3><p>{body}</p></span>
            </div>
          ))}
        </div>
      </section>
      <section id="roadmap" className="section-pad split-section">
        <h2 className="section-title">{t('roadmapTitle')}</h2>
        <div className="hero-copy"><p className="lede">{t('roadmapBody')}</p><Link href="/comecar" className="button">{t('action')} <ArrowRight size={17} /></Link></div>
      </section>
    </div>
  );
}
