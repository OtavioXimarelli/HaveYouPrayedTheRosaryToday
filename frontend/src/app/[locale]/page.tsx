"use client";

import { useRouter } from "@/i18n/routing";
import { HeroSection } from "@/components/hero-section";
import { PageTransition } from "@/components/page-transition";
import { 
  Heart, Users, Calendar, Sparkles, Check,
  BookOpen, History, ScrollText, ArrowRight,
  Timer, Edit3, Library, Cross, Globe, TrendingUp, Shield
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/providers/auth-provider";
import { useTranslations } from "next-intl";

export default function HomePage() {
  const router = useRouter();
  const { openAuthModal } = useAuth();
  const t = useTranslations("Landing");

  const openSignup = () => openAuthModal("signup");

  return (
    <PageTransition>
      <main className="min-h-screen bg-background">
        <HeroSection />
      
      {/* What You Get Section - Public vs Member */}
      <section className="py-20 sm:py-28 lg:py-32 px-4 sm:px-6 lg:px-8 bg-background relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(212,175,55,0.05)_0%,transparent_70%)]" />
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16 sm:mb-20">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-cinzel font-bold text-foreground mb-6">
              {t("whatYouGet.title")}
            </h2>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              {t("whatYouGet.subtitle")}
            </p>
          </div>

          {/* Public vs Member Comparison */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-12">
            {/* Public Features */}
            <div className="p-8 sm:p-10 rounded-3xl glass sacred-border">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-slate-400 to-slate-500 flex items-center justify-center">
                  <Globe className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-cinzel font-bold text-foreground">{t("whatYouGet.public.title")}</h3>
              </div>
              <p className="text-muted-foreground text-sm mb-6">{t("whatYouGet.public.description")}</p>
              <ul className="space-y-3">
                {[0, 1, 2, 3, 4].map((i) => (
                  <li key={i} className="flex items-center gap-3 text-foreground">
                    <Check className="w-5 h-5 text-gold-500 flex-shrink-0" />
                    <span>{t(`whatYouGet.public.items.${i}`)}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Member Features */}
            <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-br from-gold-500/10 to-gold-600/5 border border-gold-500/30 relative">
              <div className="absolute -top-4 right-6 inline-flex items-center gap-2 px-4 py-1 rounded-full bg-gold-500 text-sacred-blue font-cinzel font-bold text-sm">
                ⭐ {t("whatYouGet.member.badge")}
              </div>
              <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-gold-500 to-gold-600 flex items-center justify-center">
                  <Heart className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-cinzel font-bold text-foreground">{t("whatYouGet.member.title")}</h3>
              </div>
              <p className="text-muted-foreground text-sm mb-6">{t("whatYouGet.member.description")}</p>
              <ul className="space-y-3">
                {[0, 1, 2, 3, 4, 5].map((i) => (
                  <li key={i} className="flex items-center gap-3 text-foreground font-medium">
                    <Check className="w-5 h-5 text-gold-500 flex-shrink-0" />
                    <span>{t(`whatYouGet.member.items.${i}`)}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Quick Access Grid */}
          <div className="mt-16">
            <h3 className="text-xl font-cinzel font-bold text-foreground mb-6 text-center">{t("whatYouGet.explore")}</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div 
                onClick={() => router.push("/como-rezar")}
                className="p-5 rounded-2xl glass sacred-border cursor-pointer hover:-translate-y-1 transition-all duration-300 group"
              >
                <BookOpen className="w-7 h-7 text-gold-500 mb-3 group-hover:scale-110 transition-transform" />
                <h4 className="font-cinzel font-bold text-foreground text-sm mb-1">{t("whatYouGet.cards.howToPray.title")}</h4>
                <p className="text-xs text-muted-foreground">{t("whatYouGet.cards.howToPray.desc")}</p>
              </div>

              <div 
                onClick={() => router.push("/misterios-do-dia")}
                className="p-5 rounded-2xl glass sacred-border cursor-pointer hover:-translate-y-1 transition-all duration-300 group"
              >
                <Sparkles className="w-7 h-7 text-gold-500 mb-3 group-hover:scale-110 transition-transform" />
                <h4 className="font-cinzel font-bold text-foreground text-sm mb-1">{t("whatYouGet.cards.mysteries.title")}</h4>
                <p className="text-xs text-muted-foreground">{t("whatYouGet.cards.mysteries.desc")}</p>
              </div>

              <div 
                onClick={() => router.push("/historia")}
                className="p-5 rounded-2xl glass sacred-border cursor-pointer hover:-translate-y-1 transition-all duration-300 group"
              >
                <History className="w-7 h-7 text-gold-500 mb-3 group-hover:scale-110 transition-transform" />
                <h4 className="font-cinzel font-bold text-foreground text-sm mb-1">{t("whatYouGet.cards.history.title")}</h4>
                <p className="text-xs text-muted-foreground">{t("whatYouGet.cards.history.desc")}</p>
              </div>

              <div 
                onClick={() => router.push("/oracoes-tradicionais")}
                className="p-5 rounded-2xl glass sacred-border cursor-pointer hover:-translate-y-1 transition-all duration-300 group"
              >
                <ScrollText className="w-7 h-7 text-gold-500 mb-3 group-hover:scale-110 transition-transform" />
                <h4 className="font-cinzel font-bold text-foreground text-sm mb-1">{t("whatYouGet.cards.prayers.title")}</h4>
                <p className="text-xs text-muted-foreground">{t("whatYouGet.cards.prayers.desc")}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Start Flows - 3 User Journeys */}
      <section className="py-20 sm:py-28 lg:py-32 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gold-500/5 via-background to-background">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-cinzel font-bold text-foreground mb-4">
              {t("start.title")}
            </h2>
            <p className="text-lg text-muted-foreground">{t("start.subtitle")}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Path 1: Prayer Now */}
            <div className="group p-8 rounded-3xl glass sacred-border hover:-translate-y-2 transition-all duration-300 hover:shadow-gold-glow cursor-pointer"
              onClick={() => router.push("/como-rezar")}
            >
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-gold-500 to-gold-600 flex items-center justify-center mb-6 shadow-lg group-hover:scale-105 transition-transform">
                <Calendar className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-cinzel font-bold text-foreground mb-2">{t("start.path1.title")}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                {t("start.path1.desc")}
              </p>
              <div className="flex items-center gap-2 text-gold-600 dark:text-gold-400 font-semibold text-sm group-hover:gap-3 transition-all">
                {t("start.path1.btn")}
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>

            {/* Path 2: Learn Faith */}
            <div className="group p-8 rounded-3xl glass sacred-border hover:-translate-y-2 transition-all duration-300 hover:shadow-gold-glow cursor-pointer"
              onClick={() => router.push("/ensinamentos")}
            >
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center mb-6 shadow-lg group-hover:scale-105 transition-transform">
                <BookOpen className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-cinzel font-bold text-foreground mb-2">{t("start.path2.title")}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                {t("start.path2.desc")}
              </p>
              <div className="flex items-center gap-2">
                <span className="text-xs px-2 py-1 rounded-full bg-muted text-muted-foreground font-semibold">{t("start.path2.badge")}</span>
                <span className="text-gold-600 dark:text-gold-400 font-semibold text-sm group-hover:translate-x-1 transition-transform ml-auto">{t("start.path2.btn")} <ArrowRight className="w-4 h-4 inline" /></span>
              </div>
            </div>

            {/* Path 3: Track & Community */}
            <div className="group p-8 rounded-3xl bg-gradient-to-br from-gold-500/10 to-gold-600/5 border border-gold-500/30 hover:-translate-y-2 transition-all duration-300 cursor-pointer relative"
              onClick={() => openAuthModal("signup")}
            >
              <div className="absolute -top-3 -right-3 inline-flex items-center gap-1 px-3 py-1 rounded-full bg-gold-500 text-sacred-blue font-cinzel font-bold text-xs">
                ⭐ {t("start.path3.badge")}
              </div>
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-gold-500 to-gold-600 flex items-center justify-center mb-6 shadow-lg group-hover:scale-105 transition-transform">
                <Heart className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-cinzel font-bold text-foreground mb-2">{t("start.path3.title")}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                {t("start.path3.desc")}
              </p>
              <Button
                onClick={(e) => {
                  e.stopPropagation();
                  openAuthModal("signup");
                }}
                className="rounded-full px-6 py-2 text-sm font-cinzel font-bold bg-gradient-to-r from-gold-500 to-gold-600 text-sacred-blue hover:shadow-gold-glow transition-all"
              >
                {t("start.path3.btn")}
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Community & Benefits Section */}
      <section id="community" className="py-20 sm:py-28 lg:py-32 px-4 sm:px-6 lg:px-8 bg-muted/50 dark:bg-slate-900/50 relative overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-cinzel font-bold text-foreground mb-6">
              {t("why.title")}
            </h2>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
              {t("why.subtitle")}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {[
              {
                icon: TrendingUp,
                title: t("why.items.0.title"),
                description: t("why.items.0.desc"),
                gradient: "from-gold-500 to-gold-600"
              },
              {
                icon: BookOpen,
                title: t("why.items.1.title"),
                description: t("why.items.1.desc"),
                gradient: "from-emerald-500 to-emerald-600"
              },
              {
                icon: Heart,
                title: t("why.items.2.title"),
                description: t("why.items.2.desc"),
                gradient: "from-rose-500 to-rose-600"
              },
              {
                icon: Shield,
                title: t("why.items.3.title"),
                description: t("why.items.3.desc"),
                gradient: "from-blue-500 to-blue-600"
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
            {t("cta.title")}
          </h2>
          
          <p className="text-lg sm:text-xl lg:text-2xl text-white/80 mb-10 sm:mb-12 max-w-2xl mx-auto leading-relaxed">
            {t("cta.desc")}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              onClick={openSignup}
              data-testid="cta-signup"
              className="group px-8 sm:px-10 py-6 sm:py-7 text-lg font-cinzel font-bold tracking-wide rounded-full bg-gradient-to-r from-gold-500 to-gold-600 text-sacred-blue hover:shadow-gold-glow-lg transition-all duration-300 border-2 border-gold-400/50"
            >
              <span>{t("cta.btn")}</span>
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
            
            <Button
              size="lg"
              variant="outline"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              data-testid="cta-learn-more"
              className="px-8 sm:px-10 py-6 sm:py-7 text-lg font-semibold rounded-full bg-white/5 hover:bg-white/10 text-white border-2 border-white/20 hover:border-white/40 transition-all"
            >
              {t("cta.learnMore")}
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
                {t("footer.desc")}
              </p>
            </div>
            
            {/* About Links */}
            <div>
              <h4 className="font-cinzel font-bold mb-4 text-lg">{t("footer.about")}</h4>
              <ul className="space-y-3">
                {[
                  { icon: BookOpen, label: t("footer.aboutLinks.0"), path: "/como-rezar" },
                  { icon: History, label: t("footer.aboutLinks.1"), path: "/historia" },
                  { icon: Sparkles, label: t("footer.aboutLinks.2"), path: "/misterios-do-dia" },
                  { icon: ScrollText, label: t("footer.aboutLinks.3"), path: "/oracoes-tradicionais" },
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
              <h4 className="font-cinzel font-bold mb-4 text-lg">{t("footer.community")}</h4>
              <ul className="space-y-3 text-slate-400">
                {[
                  { label: t("footer.communityLinks.0"), path: "/about", icon: BookOpen },
                  { label: t("footer.communityLinks.1"), path: "/about", icon: Users },
                  { label: t("footer.communityLinks.2"), path: "/dashboard", icon: Heart },
                  { label: t("footer.communityLinks.3"), path: "/dashboard", icon: TrendingUp },
                ].map((link, i) => (
                  <li key={i}>
                    <button 
                      onClick={() => router.push(link.path as any)}
                      className="flex items-center gap-2 hover:text-gold-400 transition-colors cursor-pointer"
                    >
                      <link.icon className="w-4 h-4" />
                      <span>{link.label}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          <div className="text-center pt-8 border-t border-slate-800">
            <p className="text-slate-500 text-sm mb-2">
              {t("footer.credits", { year: new Date().getFullYear() })}
            </p>
            <p className="text-slate-600 text-sm italic">
              {t("footer.quote")}
            </p>
          </div>
        </div>
      </footer>

    </main>
    </PageTransition>
  );
}
