"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { HeroSection } from "@/components/hero-section";
import { AuthModal } from "@/components/auth-modal";
import { PageTransition } from "@/components/page-transition";
import { 
  Heart, Users, Calendar, Sparkles, Check,
  BookOpen, History, ScrollText, ArrowRight,
  Timer, Edit3, Library, Cross, Globe, TrendingUp, Shield
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function HomePage() {
  const router = useRouter();
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<"login" | "signup">("signup");

  const openSignup = () => {
    setAuthMode("signup");
    setAuthModalOpen(true);
  };

  const switchMode = () => {
    setAuthMode(authMode === "login" ? "signup" : "login");
  };

  return (
    <PageTransition>
      <main className="min-h-screen bg-background">
        <HeroSection />
      
      {/* Rosário Vivo - Main Vision Section */}
      <section id="about" className="py-20 sm:py-28 lg:py-32 px-4 sm:px-6 lg:px-8 bg-background relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(212,175,55,0.05)_0%,transparent_70%)]" />
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16 sm:mb-20">
            <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-gold-500/10 dark:bg-gold-500/20 border border-gold-500/20 mb-6">
              <Cross className="w-4 h-4 text-gold-600 dark:text-gold-400" />
              <span className="text-gold-700 dark:text-gold-400 font-semibold text-sm uppercase tracking-wider">Rosário Vivo</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-cinzel font-bold text-foreground mb-6">
              Viva sua <span className="text-gold-500">fé católica</span> plenamente
            </h2>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Mais que um app de oração, somos sua companhia diária na jornada espiritual. 
              Acompanhe seu crescimento, explore conteúdos profundos, e conecte-se com uma comunidade global de fé.
            </p>
          </div>

          {/* Core Features - 3 Main Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-12">
            <div className="p-8 rounded-3xl glass sacred-border hover:-translate-y-1 transition-all duration-300 hover:shadow-gold-glow">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-gold-500 to-gold-600 flex items-center justify-center mb-6 shadow-lg">
                <Calendar className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-cinzel font-bold text-foreground mb-3">Acompanhe diariamente</h3>
              <p className="text-muted-foreground leading-relaxed">
                Registre suas orações, construa sequências, celebre conquistas. Transforme o rosário em um hábito vivo e consistente.
              </p>
            </div>

            <div className="p-8 rounded-3xl glass sacred-border hover:-translate-y-1 transition-all duration-300 hover:shadow-gold-glow">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-sacred-blue to-slate-700 flex items-center justify-center mb-6 shadow-lg">
                <BookOpen className="w-8 h-8 text-gold-400" />
              </div>
              <h3 className="text-2xl font-cinzel font-bold text-foreground mb-3">Explore e aprenda</h3>
              <p className="text-muted-foreground leading-relaxed">
                Métodos de meditação, história dos mistérios, ensinamentos dos santos. Aprofunde sua compreensão e vivência do rosário.
              </p>
            </div>

            <div className="p-8 rounded-3xl glass sacred-border hover:-translate-y-1 transition-all duration-300 hover:shadow-gold-glow">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-gold-500 to-gold-600 flex items-center justify-center mb-6 shadow-lg">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-cinzel font-bold text-foreground mb-3">Ore em comunidade</h3>
              <p className="text-muted-foreground leading-relaxed">
                Una-se a milhares de católicos ao redor do mundo. Compartilhe intenções, encoraje outros, cresça juntos na fé.
              </p>
            </div>
          </div>

          {/* Quick Access Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div 
              onClick={() => router.push("/como-rezar")}
              className="p-5 rounded-2xl glass sacred-border cursor-pointer hover:-translate-y-1 transition-all duration-300 group"
            >
              <BookOpen className="w-7 h-7 text-gold-500 mb-3 group-hover:scale-110 transition-transform" />
              <h4 className="font-cinzel font-bold text-foreground text-sm mb-1">Como Rezar</h4>
              <p className="text-xs text-muted-foreground">Guia passo a passo</p>
            </div>

            <div 
              onClick={() => router.push("/misterios-do-dia")}
              className="p-5 rounded-2xl glass sacred-border cursor-pointer hover:-translate-y-1 transition-all duration-300 group"
            >
              <Sparkles className="w-7 h-7 text-gold-500 mb-3 group-hover:scale-110 transition-transform" />
              <h4 className="font-cinzel font-bold text-foreground text-sm mb-1">Mistérios</h4>
              <p className="text-xs text-muted-foreground">Meditações diárias</p>
            </div>

            <div 
              onClick={() => router.push("/historia")}
              className="p-5 rounded-2xl glass sacred-border cursor-pointer hover:-translate-y-1 transition-all duration-300 group"
            >
              <History className="w-7 h-7 text-gold-500 mb-3 group-hover:scale-110 transition-transform" />
              <h4 className="font-cinzel font-bold text-foreground text-sm mb-1">História</h4>
              <p className="text-xs text-muted-foreground">Origem e tradição</p>
            </div>

            <div 
              onClick={() => router.push("/oracoes-tradicionais")}
              className="p-5 rounded-2xl glass sacred-border cursor-pointer hover:-translate-y-1 transition-all duration-300 group"
            >
              <ScrollText className="w-7 h-7 text-gold-500 mb-3 group-hover:scale-110 transition-transform" />
              <h4 className="font-cinzel font-bold text-foreground text-sm mb-1">Orações</h4>
              <p className="text-xs text-muted-foreground">Textos completos</p>
            </div>
          </div>
        </div>
      </section>

      {/* Coming Soon Features */}
      <section className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gold-500/5 via-background to-background">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-cinzel font-bold text-foreground mb-4">
              Em <span className="text-gold-500">breve</span>
            </h2>
            <p className="text-lg text-muted-foreground">
              Novas ferramentas para enriquecer sua experiência espiritual
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 rounded-2xl glass sacred-border">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-gold-500/20 to-gold-600/20 flex items-center justify-center mb-4">
                <Timer className="w-6 h-6 text-gold-500" />
              </div>
              <h3 className="font-cinzel font-bold text-foreground mb-2">Guia Interativo</h3>
              <p className="text-sm text-muted-foreground">Temporizador e guia passo a passo enquanto reza</p>
            </div>

            <div className="p-6 rounded-2xl glass sacred-border">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-gold-500/20 to-gold-600/20 flex items-center justify-center mb-4">
                <Edit3 className="w-6 h-6 text-gold-500" />
              </div>
              <h3 className="font-cinzel font-bold text-foreground mb-2">Diário Espiritual</h3>
              <p className="text-sm text-muted-foreground">Registre reflexões e intenções pessoais</p>
            </div>

            <div className="p-6 rounded-2xl glass sacred-border">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-gold-500/20 to-gold-600/20 flex items-center justify-center mb-4">
                <Library className="w-6 h-6 text-gold-500" />
              </div>
              <h3 className="font-cinzel font-bold text-foreground mb-2">Biblioteca</h3>
              <p className="text-sm text-muted-foreground">PDFs, documentos e materiais para download</p>
            </div>

            <div className="p-6 rounded-2xl glass sacred-border">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-gold-500/20 to-gold-600/20 flex items-center justify-center mb-4">
                <BookOpen className="w-6 h-6 text-gold-500" />
              </div>
              <h3 className="font-cinzel font-bold text-foreground mb-2">Artigos & Guias</h3>
              <p className="text-sm text-muted-foreground">Conteúdo profundo sobre santos e espiritualidade</p>
            </div>
          </div>
        </div>
      </section>

      {/* Community Section */}
      <section id="community" className="py-20 sm:py-28 lg:py-32 px-4 sm:px-6 lg:px-8 bg-muted/50 dark:bg-slate-900/50 relative overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0L30 60M0 30L60 30' stroke='%23D4AF37' stroke-width='1'/%3E%3C/svg%3E\")" }} />
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-cinzel font-bold text-foreground mb-6">
              Nossa <span className="text-gold-500">Comunidade</span>
            </h2>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
              Unidos em oração, crescendo juntos na fé
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Track Progress */}
            <div className="group p-8 rounded-3xl bg-card border border-border hover:border-gold-500/30 hover:-translate-y-1 transition-all duration-300 hover:shadow-gold-glow">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-gold-500 to-gold-600 flex items-center justify-center mb-6 group-hover:scale-105 transition-transform shadow-lg">
                <Calendar className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-cinzel font-bold text-foreground mb-3">
                Acompanhe sua Jornada
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Registre suas orações diárias e construa uma sequência de devoção. Veja seu crescimento espiritual ao longo do tempo.
              </p>
            </div>

            {/* Global Community */}
            <div className="group p-8 rounded-3xl bg-card border border-border hover:border-gold-500/30 hover:-translate-y-1 transition-all duration-300 hover:shadow-gold-glow">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-sacred-blue to-slate-700 dark:from-slate-700 dark:to-slate-800 flex items-center justify-center mb-6 group-hover:scale-105 transition-transform shadow-lg">
                <Globe className="w-8 h-8 text-gold-400" />
              </div>
              <h3 className="text-xl font-cinzel font-bold text-foreground mb-3">
                Comunidade Global
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Conecte-se com milhares de católicos ao redor do mundo, compartilhando intenções e encorajamento mútuo.
              </p>
            </div>

            {/* Deepen Faith */}
            <div className="group p-8 rounded-3xl bg-card border border-border hover:border-gold-500/30 hover:-translate-y-1 transition-all duration-300 hover:shadow-gold-glow">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-gold-500 to-gold-600 flex items-center justify-center mb-6 group-hover:scale-105 transition-transform shadow-lg">
                <Heart className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-cinzel font-bold text-foreground mb-3">
                Aprofunde sua Fé
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Fortaleça sua vida espiritual com o hábito diário da oração do terço e meditação dos mistérios.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 sm:py-28 lg:py-32 px-4 sm:px-6 lg:px-8 bg-background">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-cinzel font-bold text-foreground mb-6">
              Por que <span className="text-gold-500">participar</span>?
            </h2>
            <p className="text-lg sm:text-xl text-muted-foreground">
              Descubra os benefícios de fazer parte desta comunidade de oração
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-8">
            {[
              {
                icon: TrendingUp,
                title: "Acompanhe seu progresso espiritual",
                description: "Visualize suas sequências de oração, total de terços rezados e veja seu crescimento ao longo dos meses",
                gradient: "from-gold-500 to-gold-600"
              },
              {
                icon: Sparkles,
                title: "Compartilhe suas intenções",
                description: "Publique suas intenções de oração e una-se a outros fiéis orando pelas mesmas causas",
                gradient: "from-sacred-blue to-slate-700"
              },
              {
                icon: Shield,
                title: "Ambiente seguro e respeitoso",
                description: "Uma comunidade moderada onde o respeito e a fé são os pilares fundamentais",
                gradient: "from-gold-500 to-gold-600"
              },
              {
                icon: Heart,
                title: "Motivação diária",
                description: "Receba lembretes gentis e veja outras pessoas rezando para manter sua motivação em alta",
                gradient: "from-sacred-blue to-slate-700"
              }
            ].map((feature, i) => (
              <div 
                key={i}
                className="group flex gap-5 p-6 sm:p-8 rounded-2xl glass sacred-border hover:-translate-y-1 transition-all duration-300 hover:shadow-gold-glow"
              >
                <div className={`w-14 h-14 sm:w-16 sm:h-16 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform shadow-lg`}>
                  <feature.icon className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-cinzel font-bold text-foreground mb-2 group-hover:text-gold-500 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 sm:py-28 lg:py-32 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-sacred-blue via-slate-800 to-slate-900 relative overflow-hidden">
        {/* Background decorations */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(212,175,55,0.15)_0%,transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_rgba(212,175,55,0.1)_0%,transparent_50%)]" />
        
        {/* Cross decorations */}
        <div className="absolute top-10 left-10 text-gold-500/10 text-[100px] font-serif select-none pointer-events-none">✝</div>
        <div className="absolute bottom-10 right-10 text-gold-500/10 text-[80px] font-serif select-none pointer-events-none rotate-12">✝</div>
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="mb-8">
            <div className="w-24 h-24 sm:w-28 sm:h-28 mx-auto rounded-full bg-gradient-to-br from-gold-500 to-gold-600 flex items-center justify-center shadow-2xl border-4 border-gold-400/30 animate-pulse-gold">
              <span className="text-5xl sm:text-6xl">📿</span>
            </div>
          </div>
          
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-cinzel font-bold text-white mb-6">
            Comece sua jornada hoje
          </h2>
          
          <p className="text-lg sm:text-xl lg:text-2xl text-white/80 mb-10 sm:mb-12 max-w-2xl mx-auto leading-relaxed">
            Junte-se a milhares de católicos ao redor do mundo vivendo o Rosário Vivo. 
            Gratuito, open-source, e feito com fé.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              onClick={openSignup}
              data-testid="cta-signup"
              className="group px-8 sm:px-10 py-6 sm:py-7 text-lg font-cinzel font-bold tracking-wide rounded-full bg-gradient-to-r from-gold-500 to-gold-600 text-sacred-blue hover:shadow-gold-glow-lg transition-all duration-300 border-2 border-gold-400/50"
            >
              <span>Começar agora</span>
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
            
            <Button
              size="lg"
              variant="outline"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              data-testid="cta-learn-more"
              className="px-8 sm:px-10 py-6 sm:py-7 text-lg font-semibold rounded-full bg-white/5 hover:bg-white/10 text-white border-2 border-white/20 hover:border-white/40 transition-all"
            >
              Saiba mais
            </Button>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-slate-950 text-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-16 mb-12">
            {/* Brand */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="text-4xl">📿</span>
                <span className="font-cinzel font-bold text-xl">Rosário Vivo</span>
              </div>
              <p className="text-slate-400 leading-relaxed">
                Viva sua fé católica plenamente. Comunidade global de oração e crescimento espiritual.
              </p>
            </div>
            
            {/* About Links */}
            <div>
              <h4 className="font-cinzel font-bold mb-4 text-lg">Sobre o Rosário</h4>
              <ul className="space-y-3">
                {[
                  { icon: BookOpen, label: "Como rezar o terço", path: "/como-rezar" },
                  { icon: History, label: "História do Rosário", path: "/historia" },
                  { icon: Sparkles, label: "Mistérios do dia", path: "/misterios-do-dia" },
                  { icon: ScrollText, label: "Orações tradicionais", path: "/oracoes-tradicionais" },
                ].map((link) => (
                  <li key={link.path}>
                    <button 
                      onClick={() => router.push(link.path)}
                      className="flex items-center gap-2 text-slate-400 hover:text-gold-400 transition-colors"
                      data-testid={`footer-${link.path.replace("/", "")}`}
                    >
                      <link.icon className="w-4 h-4" />
                      <span>{link.label}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Community Links */}
            <div>
              <h4 className="font-cinzel font-bold mb-4 text-lg">Comunidade</h4>
              <ul className="space-y-3 text-slate-400">
                <li className="flex items-center gap-2 hover:text-gold-400 transition-colors cursor-pointer">
                  <Users className="w-4 h-4" />
                  <span>Nossos membros</span>
                </li>
                <li className="flex items-center gap-2 hover:text-gold-400 transition-colors cursor-pointer">
                  <Heart className="w-4 h-4" />
                  <span>Feed de orações</span>
                </li>
                <li className="flex items-center gap-2 hover:text-gold-400 transition-colors cursor-pointer">
                  <TrendingUp className="w-4 h-4" />
                  <span>Estatísticas</span>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="text-center pt-8 border-t border-slate-800">
            <p className="text-slate-500 text-sm mb-2">
              Feito com fé e amor • {new Date().getFullYear()} • Rosário Vivo
            </p>
            <p className="text-slate-600 text-sm italic">
              &ldquo;Reze o Rosário todos os dias para obter a paz no mundo&rdquo; - Nossa Senhora de Fátima
            </p>
          </div>
        </div>
      </footer>

      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        mode={authMode}
        onSwitchMode={switchMode}
      />
    </main>
    </PageTransition>
  );
}
