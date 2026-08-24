import {cookies} from 'next/headers';
import type {Metadata} from 'next';
import {ArrowRight} from 'lucide-react';
import {useTranslations} from 'next-intl';
import {Link} from '@/i18n/routing';
import {SacredOrnament} from '@/components/brand/SacredOrnament';
import {getDayContext} from '@/lib/dayContext';

export const metadata: Metadata = {
  title: 'Oração para a vida cotidiana',
  description: 'Reze o Rosário com calma e acompanhe a liturgia diária em um aplicativo católico gratuito, privado e sem distrações.',
  alternates: {canonical: '/pt/inicio'},
};

export default async function LandingPage() {
  const onboarded = (await cookies()).get('evangelizae_onboarded')?.value === '1';
  return <LandingContent onboarded={onboarded} />;
}

function LandingContent({onboarded}: {onboarded: boolean}) {
  const t = useTranslations('Home');
  const tRosary = useTranslations('Rosary');
  const tDay = useTranslations('DayContext');
  const today = getDayContext();
  const mysteryKeys = {
    gozosos: 'joyful',
    luminosos: 'luminous',
    dolorosos: 'sorrowful',
    gloriosos: 'glorious',
  } as const;

  const features = [
    ['01', t('rosaryTitle'), t('rosaryBody'), '/rosary'],
    ['02', t('liturgyTitle'), t('liturgyBody'), '/liturgy'],
    ['03', t('personalTitle'), t('personalBody'), '/comecar'],
    ['04', t('freeTitle'), t('freeBody'), '/about'],
  ] as const;

  const steps = [
    ['I', t('step1Title'), t('step1Body')],
    ['II', t('step2Title'), t('step2Body')],
    ['III', t('step3Title'), t('step3Body')],
  ] as const;

  const commitments = [
    ['✝', t('commitFree')],
    ['✦', t('commitAds')],
    ['◈', t('commitData')],
    ['✧', t('commitRank')],
  ] as const;

  return (
    <>
      <section className="home-hero">
        <div className="page-wrap home-hero-grid">
          <div className="hero-copy home-hero-copy">
            <span className="eyebrow">{t('eyebrow')}</span>
            <h1 className="display-title">{t('title')}</h1>
            <p className="lede drop-cap">{t('subtitle')}</p>
            <div className="hero-actions">
              {onboarded
                ? <Link href="/sanctuary" className="button">{t('sanctuaryAction')} <ArrowRight size={17} /></Link>
                : <Link href="/comecar" className="button">{t('primaryAction')} <ArrowRight size={17} /></Link>}
              <Link href="/about" className="button button-secondary">{t('secondaryAction')}</Link>
            </div>
          </div>
          <div className="home-devotional">
            <SacredOrnament className="sacred-ornament" />
            <aside className="editorial-note">
              <blockquote>“{t('quote')}”</blockquote>
              <cite>{t('quoteSource')}</cite>
            </aside>
          </div>
        </div>
      </section>

      <section className="page-wrap today-wrap">
        <dl className="today-strip">
          <div>
            <dt>{t('todayMysteryLabel')}</dt>
            <dd>{tRosary(mysteryKeys[today.mystery])}</dd>
          </div>
          <div>
            <dt>{t('todaySeasonLabel')}</dt>
            <dd>{tDay(`seasons.${today.season}`)}</dd>
          </div>
          <div>
            <dt>{t('todayLiturgyLabel')}</dt>
            <dd><Link href="/liturgy" className="text-link">{t('todayLiturgyLink')}</Link></dd>
          </div>
        </dl>
      </section>

      <section className="page-wrap home-practices section-pad">
        <div className="home-practices-intro">
          <span className="eyebrow">{t('sectionEyebrow')}</span>
          <h2 className="section-title">{t('sectionTitle')}</h2>
          <p className="lede">{t('sectionBody')}</p>
        </div>
        <div className="practice-grid">
          {features.map(([number, title, body, href]) => (
            <Link href={href} className="practice-card marginal-flourish" key={number}>
              <span className="feature-number">{number}</span>
              <span className="practice-icon" aria-hidden="true">{number === '01' ? '✢' : number === '02' ? '✦' : number === '03' ? '◌' : '✣'}</span>
              <span><h3>{title}</h3><p>{body}</p></span>
              <ArrowRight size={18} aria-hidden="true" />
            </Link>
          ))}
        </div>
      </section>

      <section className="page-wrap home-how">
        <div className="home-practices-intro">
          <span className="eyebrow">{t('howEyebrow')}</span>
          <h2 className="section-title">{t('howTitle')}</h2>
        </div>
        <ol className="how-list">
          {steps.map(([number, title, body]) => (
            <li className="how-row" key={number}>
              <span className="how-number" aria-hidden="true">{number}</span>
              <span><h3>{title}</h3><p>{body}</p></span>
            </li>
          ))}
        </ol>
      </section>

      <section className="page-wrap home-commitments">
        <span className="eyebrow">{t('commitmentsEyebrow')}</span>
        <ul className="commitment-list">
          {commitments.map(([mark, text]) => (
            <li key={text}><span aria-hidden="true">{mark}</span>{text}</li>
          ))}
        </ul>
      </section>

      <section className="page-wrap home-cta">
        <span className="home-cta-mark" aria-hidden="true" />
        <div className="hero-copy">
          <span className="eyebrow">{t('eyebrow')}</span>
          <h2 className="section-title">{t('finalTitle')}</h2>
          <p>{t('finalBody')}</p>
          <div className="hero-actions">
            {onboarded
              ? <Link href="/sanctuary" className="button">{t('sanctuaryAction')}</Link>
              : <Link href="/comecar" className="button">{t('primaryAction')}</Link>}
            <Link href="/rosary" className="button button-secondary">{t('directRosary')}</Link>
          </div>
        </div>
      </section>
    </>
  );
}
