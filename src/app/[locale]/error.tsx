'use client';

import Link from 'next/link';

export default function LocaleError({unstable_retry}: {error: Error & {digest?: string}; unstable_retry: () => void}) {
  return (
    <div className="system-page system-page-inline">
      <div className="system-card" role="alert">
        <span className="system-mark" aria-hidden="true">✦</span>
        <span className="eyebrow">Algo saiu do caminho</span>
        <h1 className="page-title">Não foi possível abrir esta página.</h1>
        <p className="lede">Sua oração e seu histórico continuam guardados neste dispositivo. Tente novamente ou volte ao santuário.</p>
        <div className="hero-actions">
          <button type="button" className="button" onClick={unstable_retry}>Tentar novamente</button>
          <Link href="/pt/sanctuary" className="button button-secondary">Voltar ao santuário</Link>
        </div>
      </div>
    </div>
  );
}
