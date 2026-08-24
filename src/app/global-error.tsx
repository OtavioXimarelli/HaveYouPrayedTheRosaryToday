'use client';

import './globals.css';
import './redesign.css';
import Link from 'next/link';

export default function GlobalError({unstable_retry}: {error: Error & {digest?: string}; unstable_retry: () => void}) {
  return (
    <html lang="pt-BR">
      <body>
        <title>Algo deu errado — Evangelizae</title>
        <main className="system-page">
          <div className="system-card" role="alert">
            <span className="system-mark" aria-hidden="true">✦</span>
            <span className="eyebrow">Evangelizae</span>
            <h1 className="page-title">Algo deu errado.</h1>
            <p className="lede">Tente abrir o aplicativo novamente. Seus dados de oração permanecem neste dispositivo.</p>
            <div className="hero-actions">
              <button type="button" className="button" onClick={unstable_retry}>Tentar novamente</button>
              <Link href="/pt/inicio?via=selo" className="button button-secondary">Voltar ao início</Link>
            </div>
          </div>
        </main>
      </body>
    </html>
  );
}
