"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { HeroSection } from "@/components/hero-section";
import { AuthModal } from "@/components/auth-modal";
import { 
  Heart, Users, TrendingUp, Calendar, Sparkles, Shield, Check,
  BookOpen, History, ScrollText, ArrowRight, Clock, Globe
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
    <main className="min-h-screen bg-background">
      <HeroSection />
      
      {/* What is the Rosary Section - Bento Grid */}
      <section id="about" className="py-20 sm:py-28 lg:py-32 px-4 sm:px-6 lg:px-8 bg-background relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(212,175,55,0.05)_0%,transparent_70%)]" />
        
        <div className="max-w-7xl mx-auto relative z-10">
          {/* Section Header */}
          <div className="text-center mb-16 sm:mb-20">
            <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-gold-500/10 dark:bg-gold-500/20 border border-gold-500/20 mb-6">
              <span className="text-lg">📿</span>
              <span className="text-gold-700 dark:text-gold-400 font-semibold text-sm uppercase tracking-wider">O Santo Rosário</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-cinzel font-bold text-foreground mb-6">
              O que é o <span className="text-gold-500">Rosário</span>?
            </h2>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Uma poderosa oração católica que medita os mistérios da vida de Jesus Cristo através de Maria
            </p>
          </div>

          {/* Bento Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {/* Large Card - History */}
            <div 
              onClick={() => router.push("/historia")}
              className="group md:col-span-2 lg:col-span-2 p-8 sm:p-10 rounded-3xl glass cursor-pointer hover:-translate-y-1 transition-all duration-300 hover:shadow-gold-glow sacred-border"
              data-testid="card-historia"
            >
              <div className="flex flex-col sm:flex-row gap-6 items-start">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br from-gold-500 to-gold-600 flex items-center justify-center flex-shrink-0 shadow-lg group-hover:scale-105 transition-transform">
                  <History className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl sm:text-3xl font-cinzel font-bold text-foreground mb-3 group-hover:text-gold-500 transition-colors">
                    História e Significado
                  </h3>
                  <p className="text-muted-foreground text-lg leading-relaxed mb-4">
                    O Rosário surgiu no século XIII como uma forma de oração acessível a todos os fiéis. Através da repetição do Ave Maria e meditação dos mistérios, nos aproximamos de Cristo através do coração de Maria.
                  </p>
                  <div className="flex items-center gap-2 text-gold-600 dark:text-gold-400 font-semibold">
                    <span>Conhecer a história</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            </div>

            {/* Time Card */}
            <div className="p-8 rounded-3xl bg-gradient-to-br from-sacred-blue to-slate-800 dark:from-slate-800 dark:to-slate-900 text-white relative overflow-hidden group hover:-translate-y-1 transition-all duration-300">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gold-500/10 rounded-full -translate-y-1/2 translate-x-1/2" />
              <div className="relative z-10">
                <Clock className="w-10 h-10 text-gold-400 mb-4" />
                <h3 className="text-4xl sm:text-5xl font-cinzel font-bold mb-2">15-20</h3>
                <p className="text-xl font-semibold text-white/90 mb-2">minutos</p>
                <p className="text-white/70 text-sm">
                  Um pequeno investimento de tempo que traz imensos frutos espirituais
                </p>
              </div>
            </div>

            {/* Structure Card */}
            <div 
              onClick={() => router.push("/misterios-do-dia")}
              className="p-8 rounded-3xl glass sacred-border cursor-pointer group hover:-translate-y-1 transition-all duration-300 hover:shadow-gold-glow"
              data-testid="card-misterios"
            >
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-gold-500 to-gold-600 flex items-center justify-center mb-5 group-hover:scale-105 transition-transform">
                <Sparkles className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-cinzel font-bold text-foreground mb-3 group-hover:text-gold-500 transition-colors">
                Estrutura do Rosário
              </h3>
              <p className="text-muted-foreground mb-4">
                20 mistérios em quatro grupos: Gozosos, Luminosos, Dolorosos e Gloriosos.
              </p>
              <div className="space-y-2">
                {["Segunda e Sábado", "Quinta-feira", "Terça e Sexta", "Quarta e Domingo"].map((day, i) => (
                  <div key={day} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <div className="w-2 h-2 rounded-full bg-gold-500" />
                    <span>{["Gozosos", "Luminosos", "Dolorosos", "Gloriosos"][i]}</span>
                    <span className="text-gold-600 dark:text-gold-400 ml-auto text-xs">{day}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* How to Pray Card */}
            <div 
              onClick={() => router.push("/como-rezar")}
              className="p-8 rounded-3xl glass sacred-border cursor-pointer group hover:-translate-y-1 transition-all duration-300 hover:shadow-gold-glow"
              data-testid="card-como-rezar"
            >
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-sacred-blue to-slate-700 dark:from-slate-700 dark:to-slate-800 flex items-center justify-center mb-5 group-hover:scale-105 transition-transform">
                <BookOpen className="w-7 h-7 text-gold-400" />
              </div>
              <h3 className="text-xl font-cinzel font-bold text-foreground mb-3 group-hover:text-gold-500 transition-colors">
                Como Rezar
              </h3>
              <p className="text-muted-foreground mb-4">
                Guia passo a passo para rezar o Santo Rosário com devoção e meditação.
              </p>
              <div className="flex items-center gap-2 text-gold-600 dark:text-gold-400 font-semibold text-sm">
                <span>Ver guia completo</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

            {/* Prayers Card */}
            <div 
              onClick={() => router.push("/oracoes-tradicionais")}
              className="p-8 rounded-3xl glass sacred-border cursor-pointer group hover:-translate-y-1 transition-all duration-300 hover:shadow-gold-glow"
              data-testid="card-oracoes"
            >
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-sacred-blue to-slate-700 dark:from-slate-700 dark:to-slate-800 flex items-center justify-center mb-5 group-hover:scale-105 transition-transform">
                <ScrollText className="w-7 h-7 text-gold-400" />
              </div>
              <h3 className="text-xl font-cinzel font-bold text-foreground mb-3 group-hover:text-gold-500 transition-colors">
                Orações Tradicionais
              </h3>
              <p className="text-muted-foreground mb-4">
                Pai Nosso, Ave Maria, Credo, Salve Rainha e outras orações essenciais.
              </p>
              <div className="flex items-center gap-2 text-gold-600 dark:text-gold-400 font-semibold text-sm">
                <span>Ver orações</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </div>

          {/* Benefits Section */}
          <div className="mt-16 p-8 sm:p-10 rounded-3xl bg-gradient-to-br from-sacred-blue to-slate-800 dark:from-slate-800 dark:to-slate-900 text-white">
            <h3 className="text-2xl sm:text-3xl font-cinzel font-bold mb-8 text-center">
              Benefícios <span className="text-gold-400">Espirituais</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                "Fortalece a fé e a confiança em Deus",
                "Traz paz interior e serenidade",
                "Protege contra as tentações",
                "Aproxima-nos de Jesus através de Maria",
                "Une famílias e comunidades em oração",
                "Obtém graças e bênçãos especiais"
              ].map((benefit, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-gold-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="w-4 h-4 text-sacred-blue" strokeWidth={3} />
                  </div>
                  <span className="text-white/90">{benefit}</span>
                </div>
              ))}
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
            Junte-se à nossa comunidade
          </h2>
          
          <p className="text-lg sm:text-xl lg:text-2xl text-white/80 mb-10 sm:mb-12 max-w-2xl mx-auto leading-relaxed">
            Milhares de católicos ao redor do mundo já fazem parte. 
            Comece hoje sua jornada de fé e devoção ao Santo Rosário.
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
                <span className="font-cinzel font-bold text-xl">Terço Hoje</span>
              </div>
              <p className="text-slate-400 leading-relaxed">
                Uma comunidade global de católicos unidos em oração diária do Santo Rosário.
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
              Feito com fé e amor • {new Date().getFullYear()} • Você Já Rezou o Terço Hoje?
            </p>
            <p className="text-slate-600 text-sm italic">
              "Reze o Rosário todos os dias para obter a paz no mundo" - Nossa Senhora de Fátima
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
  );
}
