'use client';

import {useEffect, useState} from 'react';
import {RefreshCw} from 'lucide-react';
import {useTranslations} from 'next-intl';
import {useDayContext} from '@/hooks/useDayContext';
import {clearLiturgyCache, DailyLiturgyDto, getDailyLiturgy, LiturgyGroupDto} from '@/services/liturgyService';
import {usePreferencesStore} from '@/store/usePreferencesStore';

const groupIds: Record<LiturgyGroupDto['kind'], string> = {
  FIRST_READING: 'primeira-leitura', PSALM: 'salmo', SECOND_READING: 'segunda-leitura', GOSPEL: 'evangelho', EXTRA: 'outros-textos',
};

export default function LiturgyPage() {
  const t = useTranslations('Liturgy');
  const tDay = useTranslations('DayContext');
  const today = useDayContext();
  const readerScale = usePreferencesStore((state) => state.readerScale);
  const [liturgy, setLiturgy] = useState<DailyLiturgyDto | null>(null);
  const [loading, setLoading] = useState(true);
  const [failed, setFailed] = useState(false);

  const load = async (force = false) => {
    setLoading(true); setFailed(false);
    if (force) clearLiturgyCache();
    try { setLiturgy(await getDailyLiturgy({force})); } catch { setLiturgy(null); setFailed(true); } finally { setLoading(false); }
  };

  useEffect(() => {
    let active = true;
    getDailyLiturgy()
      .then((data) => { if (active) setLiturgy(data); })
      .catch(() => { if (active) setFailed(true); })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, []);

  return (
    <div className="page-wrap liturgy-page">
      <header className="page-header statement-header"><span className="eyebrow season-text">{t('eyebrow')} · {tDay(`seasons.${today.season}`)}</span><h1 className="page-title">{liturgy?.title ?? t('title')}</h1><p className="lede">{t('subtitle')}</p></header>
      {loading && <div className="section-pad status-message">{t('loading')}</div>}
      {failed && !loading && <section className="reading-wrap section-pad"><div className="status-message liturgy-empty" data-tone="error"><span className="liturgy-empty-mark" aria-hidden="true">✦</span><h2>{t('unavailableTitle')}</h2><p>{t('unavailableBody')}</p><div className="hero-actions"><button className="button" onClick={() => void load(true)}><RefreshCw size={16} />{t('retry')}</button><a className="button button-secondary" href="https://www.cnbb.org.br/liturgia-diaria/" target="_blank" rel="noreferrer">{t('officialLink')}</a></div></div></section>}
      {liturgy && !loading && <>
        {liturgy.source.freshness === 'CACHED' && <p className="status-message" style={{marginTop: '2rem'}}>{t('cachedNotice')}</p>}
        <div className={`liturgy-layout reader-${readerScale}`}>
          <nav className="contents-nav" aria-label={t('contents')}><strong>{t('contents')}</strong>{liturgy.groups.map((group, index) => <a key={`${group.kind}-${index}`} href={`#${groupIds[group.kind]}-${index}`}>{t(group.kind)}</a>)}</nav>
          <article className="reading-document">
            {liturgy.groups.map((group, groupIndex) => <section className="reading-group" id={`${groupIds[group.kind]}-${groupIndex}`} key={`${group.kind}-${groupIndex}`}><span className="eyebrow">{t(group.kind)}</span>{group.items.map((item, index) => <div className="reading-item" key={`${item.reference}-${index}`}><h2>{item.title}</h2>{item.reference && <p className="reading-reference">{item.reference}</p>}{item.refrain && <p className="reading-body"><strong>{item.refrain}</strong></p>}<div className={`reading-body${groupIndex === 0 && index === 0 ? ' drop-cap' : ''}`}>{item.text}</div></div>)}</section>)}
            {Object.entries(liturgy.prayers).map(([key, text]) => text && <section className="reading-group" key={key}><span className="eyebrow">{t(key as 'collect' | 'offerings' | 'communion')}</span><div className="reading-body">{text}</div></section>)}
            <p style={{color: 'var(--muted-ink)', fontSize: '.82rem'}}>{t('source', {provider: liturgy.source.provider, time: new Intl.DateTimeFormat('pt-BR', {hour: '2-digit', minute: '2-digit'}).format(new Date(liturgy.source.fetchedAt))})}</p>
          </article>
        </div>
      </>}
    </div>
  );
}
