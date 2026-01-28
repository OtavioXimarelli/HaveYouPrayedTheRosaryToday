import { HeroSection } from "@/components/hero-section";
import { CommunityFeed } from "@/components/community-feed";

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <CommunityFeed />
      
      {/* Footer */}
      <footer className="py-8 px-4 bg-navy-darker border-t border-white/10">
        <div className="max-w-2xl mx-auto text-center">
          <div className="text-3xl mb-3">📿</div>
          <p className="text-white/50 text-sm">
            Você Já Rezou o Terço Hoje?
          </p>
          <p className="text-white/30 text-xs mt-2">
            Feito com fé e amor • {new Date().getFullYear()}
          </p>
        </div>
      </footer>
    </main>
  );
}
