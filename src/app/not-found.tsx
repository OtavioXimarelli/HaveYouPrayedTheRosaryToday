import type {Metadata} from 'next';
import Link from 'next/link';

export const metadata: Metadata = {title: 'Página não encontrada'};

export default function NotFound() {
  return (
    <main className="system-page">
      <div className="system-card">
        <span className="system-mark" aria-hidden="true">✢</span>
        <span className="eyebrow">Página não encontrada</span>
        <h1 className="page-title">Este caminho não existe.</h1>
        <p className="lede">Volte ao início ou entre diretamente no seu espaço de oração.</p>
        <div className="hero-actions">
          <Link href="/pt/inicio?via=selo" className="button">Voltar ao início</Link>
          <Link href="/pt/sanctuary" className="button button-secondary">Abrir o santuário</Link>
        </div>
      </div>
    </main>
  );
}
