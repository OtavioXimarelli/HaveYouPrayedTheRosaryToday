"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useRouter } from "@/i18n/routing";
import { PageHeader } from "@/components/page-header";
import { PageTransition } from "@/components/page-transition";
import { useTranslations } from "next-intl";

export default function HistoriaPage() {
  const router = useRouter();
  const t = useTranslations("History");

  const timeline = [
    {
      icon: "📿",
      title: t("timeline.0.title"),
      period: t("timeline.0.period"),
      content: [
        t("timeline.0.content.0"),
        t("timeline.0.content.1")
      ],
      highlight: false
    },
    {
      icon: "✝",
      title: t("timeline.1.title"),
      period: t("timeline.1.period"),
      content: [
        t("timeline.1.content.0"),
        t("timeline.1.content.1")
      ],
      quote: t("timeline.1.quote"),
      highlight: true
    },
    {
      icon: "⚔",
      title: t("timeline.2.title"),
      period: t("timeline.2.period"),
      content: [
        t("timeline.2.content.0"),
        t("timeline.2.content.1")
      ],
      badge: t("timeline.2.badge"),
      highlight: false
    },
    {
      icon: "📖",
      title: t("timeline.3.title"),
      period: t("timeline.3.period"),
      content: [
        t("timeline.3.content.0"),
        t("timeline.3.content.1")
      ],
      highlight: true
    },
    {
      icon: "✨",
      title: t("timeline.4.title"),
      period: t("timeline.4.period"),
      content: [
        t("timeline.4.content.0"),
        t("timeline.4.content.1")
      ],
      quote: t("timeline.4.quote"),
      highlight: false
    },
    {
      icon: "👼",
      title: t("timeline.5.title"),
      period: t("timeline.5.period"),
      content: [
        t("timeline.5.content.0"),
        t("timeline.5.content.1")
      ],
      quote: t("timeline.5.quote"),
      highlight: true
    },
    {
      icon: "🌍",
      title: t("timeline.6.title"),
      period: t("timeline.6.period"),
      content: [
        t("timeline.6.content.0"),
        t("timeline.6.content.1")
      ],
      highlight: false
    }
  ];

  const popes = [
    { name: t("popes.leo.name"), description: t("popes.leo.description") },
    { name: t("popes.pius.name"), description: t("popes.pius.description") },
    { name: t("popes.paul.name"), description: t("popes.paul.description") },
    { name: t("popes.francis.name"), description: t("popes.francis.description") }
  ];

  return (
    <PageTransition>
      <main className="min-h-screen bg-background">
        <PageHeader 
        title={t("title")}
        subtitle={t("subtitle")}
        icon="📜"
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

        {/* Timeline */}
        <section className="space-y-6">
          {timeline.map((item, index) => (
            <div 
              key={index}
              className={`p-6 sm:p-8 rounded-2xl transition-all duration-300 hover:-translate-y-0.5 ${
                item.highlight 
                  ? "bg-gradient-to-br from-gold-500/10 to-gold-600/5 dark:from-gold-500/15 dark:to-gold-600/10 border border-gold-500/20" 
                  : "glass sacred-border"
              }`}
              data-testid={`timeline-${index}`}
            >
              <div className="flex items-start gap-4 mb-4">
                <div className={`w-14 h-14 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center text-2xl sm:text-3xl flex-shrink-0 shadow-lg ${
                  item.highlight 
                    ? "bg-gradient-to-br from-gold-500 to-gold-600"
                    : "bg-gradient-to-br from-sacred-blue to-slate-700"
                }`}>
                  {item.icon}
                </div>
                <div>
                  <h2 className="text-xl sm:text-2xl font-cinzel font-bold text-foreground">
                    {item.title}
                  </h2>
                  <p className="text-gold-600 dark:text-gold-400 font-semibold text-sm mt-1">
                    {item.period}
                  </p>
                </div>
              </div>
              
              <div className="space-y-4">
                {item.content.map((paragraph, i) => (
                  <p key={i} className="text-muted-foreground leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>
              
              {item.quote && (
                <div className="mt-6 p-4 rounded-xl bg-card border-l-4 border-gold-500">
                  <p className="text-foreground italic">
                    {item.quote}
                  </p>
                </div>
              )}
              
              {item.badge && (
                <div className="mt-6 p-4 rounded-xl bg-gradient-to-r from-sacred-blue to-slate-700 text-white text-center font-semibold">
                  {item.badge}
                </div>
              )}
            </div>
          ))}
        </section>

        {/* Papal Endorsements */}
        <section className="mt-12">
          <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-sacred-blue via-slate-800 to-slate-900 text-white">
            <h2 className="text-2xl sm:text-3xl font-cinzel font-bold mb-8 text-center">
              {t("popes.title")}
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {popes.map((pope, i) => (
                <div key={i} className="p-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
                  <p className="font-cinzel font-bold text-gold-400 mb-2">{pope.name}</p>
                  <p className="text-white/80 text-sm">{pope.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="mt-12 text-center">
          <div className="p-8 sm:p-10 rounded-3xl glass sacred-border">
            <h3 className="text-2xl font-cinzel font-bold text-foreground mb-4">
              {t("cta.title")}
            </h3>
            <p className="text-muted-foreground mb-6">
              {t("cta.description")}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                onClick={() => router.push("/como-rezar")}
                className="rounded-full px-8 py-6 text-lg font-cinzel font-bold bg-gradient-to-r from-gold-500 to-gold-600 text-sacred-blue hover:shadow-gold-glow transition-all"
                data-testid="cta-como-rezar"
              >
                {t("cta.btn")}
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => router.push("/")}
                className="rounded-full px-8 py-6 text-lg font-semibold border-gold-500/30 text-foreground hover:bg-gold-500/10"
                data-testid="cta-home"
              >
                {t("cta.back")}
              </Button>
            </div>
          </div>
        </section>
      </div>
    </main>
    </PageTransition>
  );
}
