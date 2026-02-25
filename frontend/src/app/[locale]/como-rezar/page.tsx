"use client";

import { Button } from "@/components/ui/button";
import { Check, ArrowRight } from "lucide-react";
import { useRouter } from "@/i18n/routing";
import { PageHeader } from "@/components/page-header";
import { PageTransition } from "@/components/page-transition";
import { useTranslations } from "next-intl";

export default function ComoRezarPage() {
  const router = useRouter();
  const t = useTranslations("HowToPray");

  const steps = [
    {
      number: 1,
      title: t("steps.step1.title"),
      description: t("steps.step1.description"),
      prayer: t("steps.step1.prayer"),
      highlight: false
    },
    {
      number: 2,
      title: t("steps.step2.title"),
      description: t("steps.step2.description"),
      hasLink: true,
      linkText: t("steps.step2.linkText"),
      linkPath: "/oracoes-tradicionais",
      highlight: true
    },
    {
      number: 3,
      title: t("steps.step3.title"),
      description: t("steps.step3.description"),
      highlight: false
    },
    {
      number: 4,
      title: t("steps.step4.title"),
      description: t("steps.step4.description"),
      list: [t("steps.step4.list.0"), t("steps.step4.list.1"), t("steps.step4.list.2")],
      highlight: true
    },
    {
      number: 5,
      title: t("steps.step5.title"),
      description: t("steps.step5.description"),
      prayer: t("steps.step5.prayer"),
      highlight: false
    },
    {
      number: 6,
      title: t("steps.step6.title"),
      description: t("steps.step6.description"),
      hasLink: true,
      linkText: t("steps.step6.linkText"),
      linkPath: "/misterios-do-dia",
      highlight: true
    },
    {
      number: 7,
      title: t("steps.step7.title"),
      description: t("steps.step7.description"),
      detailedList: [
        { count: "1x", text: t("steps.step7.list.0.text") },
        { count: "10x", text: t("steps.step7.list.1.text") },
        { count: "1x", text: t("steps.step7.list.2.text") },
        { count: "1x", text: t("steps.step7.list.3.text") }
      ],
      highlight: false
    },
    {
      number: 8,
      title: t("steps.step8.title"),
      description: t("steps.step8.description"),
      highlight: true
    },
    {
      number: 9,
      title: t("steps.step9.title"),
      description: t("steps.step9.description"),
      prayer: t("steps.step9.prayer"),
      highlight: false
    },
    {
      number: 10,
      title: t("steps.step10.title"),
      description: t("steps.step10.description"),
      highlight: true
    }
  ];

  return (
    <PageTransition>
      <main className="min-h-screen bg-background">
        <PageHeader 
        title={t("title")}
        subtitle={t("subtitle")}
        icon="📖"
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        {/* Intro Section - Rosário Vivo Approach */}
        <section className="mb-12">
          <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-gold-500/5 to-gold-600/5 border border-gold-500/20">
            <p className="text-lg text-muted-foreground leading-relaxed">
              {t("intro")}
            </p>
          </div>
        </section>

        {/* Introduction Card */}
        <section className="mb-12">
          <div className="p-6 sm:p-8 rounded-3xl glass sacred-border">
            <h2 className="text-2xl sm:text-3xl font-cinzel font-bold text-foreground mb-6">
              {t("needs.title")}
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {[0, 1, 2, 3].map((i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-gradient-to-br from-gold-500 to-gold-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="w-4 h-4 text-white" strokeWidth={3} />
                  </div>
                  <span className="text-foreground">{t(`needs.items.${i}`)}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Steps */}
        <section>
          <h2 className="text-2xl sm:text-3xl font-cinzel font-bold text-foreground mb-8">
            {t("steps.title")}
          </h2>

          <div className="space-y-6">
            {steps.map((step) => (
              <div 
                key={step.number}
                className={`p-6 sm:p-8 rounded-2xl transition-all duration-300 hover:-translate-y-0.5 ${
                  step.highlight 
                    ? "bg-gradient-to-br from-gold-500/10 to-gold-600/5 dark:from-gold-500/15 dark:to-gold-600/10 border border-gold-500/20" 
                    : "glass sacred-border"
                }`}
                data-testid={`step-${step.number}`}
              >
                <div className="flex gap-4 sm:gap-5 items-start">
                  <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-xl flex items-center justify-center font-cinzel font-bold text-xl flex-shrink-0 shadow-lg ${
                    step.highlight 
                      ? "bg-gradient-to-br from-gold-500 to-gold-600 text-white"
                      : "bg-gradient-to-br from-sacred-blue to-slate-700 text-gold-400"
                  }`}>
                    {step.number}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl sm:text-2xl font-cinzel font-bold text-foreground mb-2">
                      {step.title}
                    </h3>
                    <p className="text-muted-foreground mb-3">
                      {step.description}
                    </p>
                    
                    {step.prayer && (
                      <div className="p-4 rounded-xl bg-card border border-border italic text-foreground">
                        {step.prayer}
                      </div>
                    )}
                    
                    {step.list && (
                      <ul className="space-y-2 mt-3">
                        {step.list.map((item, i) => (
                          <li key={i} className="flex items-center gap-2 text-foreground">
                            <div className="w-2 h-2 rounded-full bg-gold-500" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                    
                    {step.detailedList && (
                      <ul className="space-y-2 mt-3">
                        {step.detailedList.map((item, i) => (
                          <li key={i} className="flex items-start gap-3 text-foreground">
                            <span className="text-gold-600 dark:text-gold-400 font-bold min-w-[40px]">{item.count}</span>
                            <span>{item.text}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                    
                    {step.hasLink && (
                      <Button
                        variant="outline"
                        onClick={() => router.push(step.linkPath!)}
                        className="mt-4 rounded-full border-gold-500/30 text-gold-600 dark:text-gold-400 hover:bg-gold-500/10"
                        data-testid={`step-${step.number}-link`}
                      >
                        {step.linkText}
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Tips Section */}
        <section className="mt-12">
          <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-sacred-blue via-slate-800 to-slate-900 text-white">
            <h2 className="text-2xl font-cinzel font-bold mb-6 flex items-center gap-3">
              <span className="w-10 h-10 rounded-xl bg-gold-500 flex items-center justify-center text-sacred-blue">
                <Check className="w-5 h-5" strokeWidth={3} />
              </span>
              {t("tips.title")}
            </h2>
            <ul className="space-y-4">
              {[0, 1, 2, 3, 4].map((i) => (
                <li key={i} className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-gold-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="w-4 h-4 text-gold-400" strokeWidth={3} />
                  </div>
                  <span className="text-white/90">{t(`tips.items.${i}`)}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* St. Louis de Montfort Method Section - Summary */}
        <section className="mt-12">
          <div className="p-6 sm:p-8 rounded-3xl glass sacred-border relative overflow-hidden">
            {/* Premium Badge */}
            <div className="absolute top-6 right-6 px-3 py-1 rounded-full bg-gold-500/20 border border-gold-500/30 backdrop-blur-sm">
              <span className="text-gold-600 dark:text-gold-400 text-xs font-semibold">{t("montfort.badge")}</span>
            </div>

            <div className="flex items-start gap-4 mb-6">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-gold-500 to-gold-600 flex items-center justify-center text-3xl flex-shrink-0 shadow-lg">
                ⛪
              </div>
              <div>
                <h2 className="text-2xl sm:text-3xl font-cinzel font-bold text-foreground mb-2">
                  {t("montfort.title")}
                </h2>
                <p className="text-gold-600 dark:text-gold-400 font-semibold">
                  {t("montfort.subtitle")}
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <p className="text-muted-foreground leading-relaxed">
                {t("montfort.description")}
              </p>

              <div className="p-5 rounded-xl bg-muted/50 border border-border">
                <h3 className="font-cinzel font-bold text-lg text-foreground mb-4">
                  {t("steps.title")}:
                </h3>
                
                <div className="space-y-3">
                  {[0, 1, 2].map((i) => (
                    <div key={i} className="flex gap-3 items-start">
                      <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-gold-500 to-gold-600 text-white flex items-center justify-center font-bold flex-shrink-0 text-sm">
                        {i + 1}
                      </div>
                      <div>
                        <h4 className="font-semibold text-foreground">
                          {t(`montfort.items.${i}.title`)}
                        </h4>
                        <p className="text-muted-foreground text-sm">
                          {t(`montfort.items.${i}.description`)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Locked Content Teaser */}
              <div className="relative mt-6">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/80 to-background z-10 flex items-end justify-center pb-6">
                  <Button
                    size="lg"
                    onClick={() => router.push("/")}
                    className="rounded-full px-8 py-6 text-base font-cinzel font-bold bg-gradient-to-r from-gold-500 to-gold-600 text-sacred-blue hover:shadow-gold-glow transition-all"
                  >
                    {t("montfort.cta")}
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </div>

                <div className="blur-sm pointer-events-none select-none">
                  <div className="p-5 rounded-xl bg-gold-500/10 border border-gold-500/20 mb-4">
                    <h3 className="font-cinzel font-bold text-foreground mb-2">
                      📖 Exemplo prático detalhado
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      Aprenda passo a passo como aplicar este método em cada mistério, com exemplos práticos de como meditar a Anunciação, o Nascimento de Jesus e mais...
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-card border border-border mb-4">
                    <p className="text-muted-foreground text-sm">
                      + Guia completo de meditação para cada um dos 20 mistérios
                    </p>
                    <p className="text-muted-foreground text-sm mt-2">
                      + Técnicas avançadas de contemplação
                    </p>
                    <p className="text-muted-foreground text-sm mt-2">
                      + Citações completas dos escritos de São Luís de Montfort
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Padre Pio Method Section - Summary */}
        <section className="mt-12">
          <div className="p-6 sm:p-8 rounded-3xl glass sacred-border relative overflow-hidden">
            {/* Premium Badge */}
            <div className="absolute top-6 right-6 px-3 py-1 rounded-full bg-gold-500/20 border border-gold-500/30 backdrop-blur-sm">
              <span className="text-gold-600 dark:text-gold-400 text-xs font-semibold">{t("montfort.badge")}</span>
            </div>

            <div className="flex items-start gap-4 mb-6">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-sacred-blue to-slate-700 flex items-center justify-center text-3xl flex-shrink-0 shadow-lg">
                🙏
              </div>
              <div>
                <h2 className="text-2xl sm:text-3xl font-cinzel font-bold text-foreground mb-2">
                  {t("padrePio.title")}
                </h2>
                <p className="text-gold-600 dark:text-gold-400 font-semibold">
                  {t("padrePio.subtitle")}
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <p className="text-muted-foreground leading-relaxed">
                {t("padrePio.description")}
              </p>

              <div className="p-5 rounded-xl bg-muted/50 border border-border">
                <h3 className="font-cinzel font-bold text-lg text-foreground mb-4">
                  Princípios essenciais:
                </h3>
                
                <div className="space-y-3">
                  {[
                    { emoji: "❤️", title: t("padrePio.items.0") },
                    { emoji: "⚔️", title: t("padrePio.items.1") },
                    { emoji: "🕊️", title: t("padrePio.items.2") },
                    { emoji: "👩", title: t("padrePio.items.3") },
                    { emoji: "🔥", title: t("padrePio.items.4") }
                  ].map((item, i) => (
                    <div key={i} className="flex gap-3 items-center">
                      <span className="text-2xl">{item.emoji}</span>
                      <p className="text-foreground font-medium text-sm">{item.title}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Locked Content Teaser */}
              <div className="relative mt-6">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/80 to-background z-10 flex items-end justify-center pb-6">
                  <Button
                    size="lg"
                    onClick={() => router.push("/")}
                    className="rounded-full px-8 py-6 text-base font-cinzel font-bold bg-gradient-to-r from-gold-500 to-gold-600 text-sacred-blue hover:shadow-gold-glow transition-all"
                  >
                    {t("padrePio.cta")}
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </div>

                <div className="blur-sm pointer-events-none select-none">
                  <div className="p-5 rounded-xl bg-sacred-blue/10 border border-sacred-blue/20 mb-4">
                    <h3 className="font-cinzel font-bold text-foreground mb-2">
                      ✨ Como Padre Pio rezava exatamente
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      Descubra os gestos, pausas e visualizações específicas que Padre Pio usava durante cada parte do Rosário...
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-card border border-border mb-4">
                    <p className="text-muted-foreground text-sm">
                      + Suas práticas devocionais secretas
                    </p>
                    <p className="text-muted-foreground text-sm mt-2">
                      + Testemunhos de conversão através do Rosário
                    </p>
                    <p className="text-muted-foreground text-sm mt-2">
                      + Citações completas e ensinamentos pessoais
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section - Join Community */}
        <section className="mt-12">
          <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-br from-sacred-blue via-slate-800 to-slate-900 text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(212,175,55,0.15)_0%,transparent_50%)]" />
            
            <div className="relative z-10 text-center">
              <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-br from-gold-500 to-gold-600 flex items-center justify-center shadow-lg">
                <span className="text-3xl">📿</span>
              </div>
              
              <h3 className="text-2xl sm:text-3xl font-cinzel font-bold mb-4">
                {t("cta.title")}
              </h3>
              
              <p className="text-white/80 text-lg mb-6 max-w-2xl mx-auto leading-relaxed">
                {t("cta.description")}
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
                {[0, 1, 2].map((i) => (
                  <div key={i} className="flex items-center gap-2 text-white/70">
                    <Check className="w-5 h-5 text-gold-400" />
                    <span className="text-sm">{t(`cta.items.${i}`)}</span>
                  </div>
                ))}
              </div>

              <Button
                size="lg"
                onClick={() => router.push("/")}
                className="rounded-full px-10 py-6 text-lg font-cinzel font-bold bg-gradient-to-r from-gold-500 to-gold-600 text-sacred-blue hover:shadow-gold-glow-lg transition-all"
              >
                {t("cta.btn")}
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>

              <p className="text-white/50 text-sm mt-4">
                {t("cta.footer")}
              </p>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="mt-12 text-center">
          <div className="p-8 sm:p-10 rounded-3xl glass sacred-border">
            <h3 className="text-2xl font-cinzel font-bold text-foreground mb-4">
              {t("cta.ready")}
            </h3>
            <p className="text-muted-foreground mb-6">
              {t("cta.readyDesc")}
            </p>
            <Button
              size="lg"
              onClick={() => router.push("/")}
              className="rounded-full px-8 py-6 text-lg font-cinzel font-bold bg-gradient-to-r from-gold-500 to-gold-600 text-sacred-blue hover:shadow-gold-glow transition-all"
              data-testid="cta-home"
            >
              {t("cta.readyBtn")}
            </Button>
          </div>
        </section>
      </div>
    </main>
    </PageTransition>
  );
}
