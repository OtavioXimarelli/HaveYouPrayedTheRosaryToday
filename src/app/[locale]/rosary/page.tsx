'use client';

import {FormEvent, useEffect, useMemo, useState} from 'react';
import {ArrowLeft, ArrowRight, ChevronDown} from 'lucide-react';
import {useLocale, useTranslations} from 'next-intl';
import {Link} from '@/i18n/routing';
import {useIsMounted} from '@/hooks/useIsMounted';
import {SacredOrnament} from '@/components/brand/SacredOrnament';
import {buildRosarySequence, MysteryType, ROSARY_MYSTERIES} from '@/services/rosaryEngine';
import {usePrayerStore} from '@/store/usePrayerStore';

const mysteryTranslation = {gozosos: 'joyful', luminosos: 'luminous', dolorosos: 'sorrowful', gloriosos: 'glorious'} as const;

export default function RosaryPage() {
  const t = useTranslations('Rosary');
  const locale = useLocale();
  const mounted = useIsMounted();
  const prayer = usePrayerStore();
  const [showLatin, setShowLatin] = useState(false);
  const [newIntention, setNewIntention] = useState('');
  const steps = useMemo(() => buildRosarySequence(prayer.activeMysteryType), [prayer.activeMysteryType]);
  const currentStep = steps[Math.min(prayer.currentStepIndex, steps.length - 1)];

  useEffect(() => {
    if (mounted && !prayer.sessionStartedAt && !prayer.isCompleted) prayer.initRosary();
  }, [mounted, prayer]);

  if (!mounted) return <div className="reading-wrap section-pad" />;

  if (prayer.isCompleted) {
    return (
      <div className="reading-wrap section-pad completion-screen">
        <SacredOrnament className="completion-ornament" />
        <div className="hero-copy">
          <span className="eyebrow">{t('completedEyebrow')}</span>
          <h1 className="page-title">{t('completedTitle')}</h1>
          <p className="lede">{t('completedBody')}</p>
          <div className="hero-actions"><Link href="/sanctuary" className="button">{t('returnSanctuary')}</Link><button className="button button-secondary" onClick={() => prayer.initRosary()}>{t('prayAgain')}</button></div>
        </div>
      </div>
    );
  }

  const addIntention = (event: FormEvent) => { event.preventDefault(); prayer.addIntention(newIntention); setNewIntention(''); };
  const next = () => {
    if (typeof navigator !== 'undefined' && 'vibrate' in navigator) navigator.vibrate(12);
    if (prayer.currentStepIndex === steps.length - 1) prayer.completeRosary(); else prayer.advanceStep(steps.length);
  };
  const switchMystery = (type: MysteryType) => prayer.initRosary(type);
  const title = locale === 'en' ? currentStep.titleEn : currentStep.titlePt;
  const body = locale === 'en' ? currentStep.prayerTextEn : currentStep.prayerTextPt;

  return (
    <div className="prayer-layout">
      <article className="prayer-main">
        <div className="prayer-progress" aria-label={t('progress', {current: prayer.currentStepIndex + 1, total: steps.length})}><span style={{width: `${((prayer.currentStepIndex + 1) / steps.length) * 100}%`}} /></div>
        <div className="prayer-toolbar"><span>{t('progress', {current: prayer.currentStepIndex + 1, total: steps.length})}</span><button className="button button-quiet" onClick={() => setShowLatin(!showLatin)} disabled={!currentStep.latinText}>{showLatin ? t('hideLatin') : t('showLatin')}</button></div>

        <details className="prayer-mobile-tools">
          <summary>{t('chooseMystery')} <ChevronDown size={17} /></summary>
          <div className="mobile-tools-content">
            <div className="mobile-mystery-grid">{(Object.keys(ROSARY_MYSTERIES) as MysteryType[]).map((type) => <button key={type} className="button button-quiet" onClick={() => switchMystery(type)} aria-pressed={type === prayer.activeMysteryType}>{t(mysteryTranslation[type])}</button>)}</div>
            <span className="eyebrow">{t('intentionsTitle')}</span>
            <form onSubmit={addIntention} className="field mobile-intention-form"><input aria-label={t('intentionPlaceholder')} value={newIntention} onChange={(event) => setNewIntention(event.target.value)} placeholder={t('intentionPlaceholder')} /><button className="button button-small" disabled={!newIntention.trim()}>{t('addIntention')}</button></form>
            {prayer.intentions.map((intention, index) => <div className="quiet-row" key={`mobile-${intention}-${index}`}><span>{intention}</span><button className="button button-quiet" onClick={() => prayer.removeIntention(index)} aria-label={t('removeIntention')}>×</button></div>)}
          </div>
        </details>

        <section className="prayer-step">
          <span className="eyebrow">{t('mysteryToday')} · {t(mysteryTranslation[prayer.activeMysteryType])}</span>
          <h1>{title}</h1>
          <div className="prayer-text">{body}</div>
          {showLatin && currentStep.latinText && <div className="latin-text">{currentStep.latinText}</div>}
          {currentStep.type === 'decade_hail_mary' && <div className="bead-line" aria-label={t('beadsLabel')}>{Array.from({length: 10}, (_, index) => <span key={index} data-complete={index < (currentStep.beadInDecade ?? 0)} />)}</div>}
        </section>
        <div className="prayer-actions"><button className="button button-secondary" onClick={prayer.previousStep} disabled={prayer.currentStepIndex === 0}><ArrowLeft size={17} /> {t('previous')}</button><button className="button" onClick={next}>{prayer.currentStepIndex === steps.length - 1 ? t('finish') : t('next')} <ArrowRight size={17} /></button></div>
      </article>

      <aside className="prayer-sidebar prayer-tools">
        <span className="eyebrow">{t('chooseMystery')}</span>
        <div className="form-stack" style={{gap: '.35rem', marginBlock: '1rem 2rem'}}>{(Object.keys(ROSARY_MYSTERIES) as MysteryType[]).map((type) => <button key={type} className="button button-quiet" style={{justifyContent: 'flex-start'}} onClick={() => switchMystery(type)} aria-pressed={type === prayer.activeMysteryType}>{t(mysteryTranslation[type])}</button>)}</div>
        <span className="eyebrow">{t('intentionsTitle')}</span><p style={{fontSize: '.78rem', color: 'var(--muted-ink)'}}>{t('intentionsHint')}</p>
        <form onSubmit={addIntention} className="field"><input aria-label={t('intentionPlaceholder')} value={newIntention} onChange={(event) => setNewIntention(event.target.value)} placeholder={t('intentionPlaceholder')} /><button className="button button-small" disabled={!newIntention.trim()}>{t('addIntention')}</button></form>
        {prayer.intentions.map((intention, index) => <div className="quiet-row" key={`${intention}-${index}`}><span>{intention}</span><button className="button button-quiet" onClick={() => prayer.removeIntention(index)} aria-label={t('removeIntention')}>×</button></div>)}
        <span className="eyebrow" style={{display: 'block', marginTop: '2rem'}}>{t('stepsLabel')}</span>
        <div className="step-list">{steps.map((step, index) => <button key={step.id} onClick={() => prayer.setStep(index)} disabled={index > prayer.furthestStepIndex} aria-current={index === prayer.currentStepIndex ? 'step' : undefined}>{step.stepNumber}. {locale === 'en' ? step.titleEn : step.titlePt}</button>)}</div>
      </aside>
    </div>
  );
}
