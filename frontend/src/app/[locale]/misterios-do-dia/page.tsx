"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useRouter } from "@/i18n/routing";
import { PageHeader } from "@/components/page-header";
import { PageTransition } from "@/components/page-transition";
import { useTranslations } from "next-intl";

/**
 * Content sourced from the Official Vatican Holy See:
 * https://www.vatican.va/special/rosary/documents/misteri_en.html
 * Based on: Rosarium Virginis Mariae - Pope Saint John Paul II (October 16, 2002)
 */

export default function MisteriosPage() {
  const router = useRouter();
  const t = useTranslations("Mysteries");

  const getDayOfWeek = () => {
    const today = new Date().getDay();
    return t(`days.${today}`);
  };

  const getMysteryOfDay = () => {
    const day = new Date().getDay();
    // According to Vatican: Joyful (Mon, Sat), Luminous (Thu), Sorrowful (Tue, Fri), Glorious (Wed, Sun)
    if (day === 0 || day === 3) return 'gloriosos';
    if (day === 1 || day === 6) return 'gozosos';
    if (day === 2 || day === 5) return 'dolorosos';
    if (day === 4) return 'luminosos';
    return 'gozosos';
  };

  const currentDay = getDayOfWeek();
  const currentMystery = getMysteryOfDay();

  // Official Vatican Mysteries with Scripture References
  const mysteries = {
    gozosos: {
      title: t("groups.gozosos.title"),
      subtitle: t("groups.gozosos.subtitle"),
      days: t("groups.gozosos.days"),
      gradient: "from-blue-500 to-blue-600",
      bgGradient: "from-blue-500/10 to-blue-600/5 dark:from-blue-500/20 dark:to-blue-600/10",
      borderColor: "border-blue-500/30",
      badgeColor: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
      note: undefined as string | undefined,
      mysteries: [0, 1, 2, 3, 4].map(i => ({
        number: i + 1,
        title: t(`groups.gozosos.items.${i}.title`),
        scripture: t(`groups.gozosos.items.${i}.scripture`),
        quote: t(`groups.gozosos.items.${i}.quote`),
      }))
    },
    luminosos: {
      title: t("groups.luminosos.title"),
      subtitle: t("groups.luminosos.subtitle"),
      days: t("groups.luminosos.days"),
      gradient: "from-yellow-500 to-yellow-600",
      bgGradient: "from-yellow-500/10 to-yellow-600/5 dark:from-yellow-500/20 dark:to-yellow-600/10",
      borderColor: "border-yellow-500/30",
      badgeColor: "bg-yellow-500/10 text-yellow-700 dark:text-yellow-400",
      note: t("groups.luminosos.note"),
      mysteries: [0, 1, 2, 3, 4].map(i => ({
        number: i + 1,
        title: t(`groups.luminosos.items.${i}.title`),
        scripture: t(`groups.luminosos.items.${i}.scripture`),
        quote: t(`groups.luminosos.items.${i}.quote`),
      }))
    },
    dolorosos: {
      title: t("groups.dolorosos.title"),
      subtitle: t("groups.dolorosos.subtitle"),
      days: t("groups.dolorosos.days"),
      gradient: "from-purple-600 to-purple-700",
      bgGradient: "from-purple-600/10 to-purple-700/5 dark:from-purple-600/20 dark:to-purple-700/10",
      borderColor: "border-purple-600/30",
      badgeColor: "bg-purple-600/10 text-purple-700 dark:text-purple-400",
      note: undefined as string | undefined,
      mysteries: [0, 1, 2, 3, 4].map(i => ({
        number: i + 1,
        title: t(`groups.dolorosos.items.${i}.title`),
        scripture: t(`groups.dolorosos.items.${i}.scripture`),
        quote: t(`groups.dolorosos.items.${i}.quote`),
      }))
    },
    gloriosos: {
      title: t("groups.gloriosos.title"),
      subtitle: t("groups.gloriosos.subtitle"),
      days: t("groups.gloriosos.days"),
      gradient: "from-gold-500 to-gold-600",
      bgGradient: "from-gold-500/10 to-gold-600/5 dark:from-gold-500/20 dark:to-gold-600/10",
      borderColor: "border-gold-500/30",
      badgeColor: "bg-gold-500/10 text-gold-700 dark:text-gold-400",
      note: undefined as string | undefined,
      mysteries: [0, 1, 2, 3, 4].map(i => ({
        number: i + 1,
        title: t(`groups.gloriosos.items.${i}.title`),
        scripture: t(`groups.gloriosos.items.${i}.scripture`),
        quote: t(`groups.gloriosos.items.${i}.quote`),
      }))
    }
  };

  const mysteryOrder = ['gozosos', 'luminosos', 'dolorosos', 'gloriosos'] as const;

  return (
    <PageTransition>
      <main className="min-h-screen bg-background">
        <PageHeader 
        title={t("title")}
        subtitle={t("subtitle")}
        icon="✨"
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

        {/* Source Attribution */}
        <div className="mb-8 p-4 rounded-xl bg-muted/50 border border-border">
          <p className="text-sm text-muted-foreground">
            <strong>{t("source.label")}</strong> {t("source.vatican")} — <a href="https://www.vatican.va/special/rosary/documents/misteri_en.html" target="_blank" rel="noopener noreferrer" className="text-gold-600 dark:text-gold-400 hover:underline">vatican.va/special/rosary</a>
            <br />
            <span className="text-xs">{t("source.base")}</span>
          </p>
        </div>

        {/* Today's Mystery Highlight */}
        <section className="mb-12">
          <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-sacred-blue via-slate-800 to-slate-900 text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(212,175,55,0.2)_0%,transparent_50%)]" />
            <div className="relative z-10 text-center">
              <p className="text-white/70 text-lg mb-2">{t("today.prefix")} {currentDay}</p>
              <h2 className="text-3xl sm:text-4xl font-cinzel font-bold mb-2">
                <span className="text-gold-400">{mysteries[currentMystery].title}</span>
              </h2>
              <p className="text-xl text-white/80 mb-6">
                {mysteries[currentMystery].subtitle}
              </p>
              <Button
                size="lg"
                onClick={() => document.getElementById(currentMystery)?.scrollIntoView({ behavior: 'smooth' })}
                className="rounded-full px-8 py-6 text-lg font-cinzel font-bold bg-gradient-to-r from-gold-500 to-gold-600 text-sacred-blue hover:shadow-gold-glow transition-all"
                data-testid="btn-today-mystery"
              >
                {t("today.btn")}
              </Button>
            </div>
          </div>
        </section>

        {/* Quick Reference */}
        <section className="mb-12">
          <div className="p-6 sm:p-8 rounded-3xl glass sacred-border">
            <h2 className="text-2xl font-cinzel font-bold text-foreground mb-6">
              {t("groups.title")}
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              {t("groups.description")}
            </p>
            <div className="grid sm:grid-cols-2 gap-4">
              {mysteryOrder.map((key) => {
                const m = mysteries[key];
                return (
                  <button
                    key={key}
                    onClick={() => document.getElementById(key)?.scrollIntoView({ behavior: 'smooth' })}
                    className={`p-4 rounded-xl text-left border ${m.borderColor} bg-gradient-to-br ${m.bgGradient} hover:-translate-y-0.5 transition-all`}
                    data-testid={`quick-nav-${key}`}
                  >
                    <p className="font-cinzel font-bold text-foreground">{m.title}</p>
                    <p className="text-sm text-muted-foreground">{m.days}</p>
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        {/* All Mysteries */}
        {mysteryOrder.map((key) => {
          const m = mysteries[key];
          return (
            <section key={key} id={key} className="mb-12 scroll-mt-8">
              <div className={`p-6 sm:p-8 rounded-3xl bg-gradient-to-br ${m.bgGradient} border ${m.borderColor}`}>
                {/* Header */}
                <div className="text-center mb-8">
                  <div className={`inline-flex w-16 h-16 rounded-2xl bg-gradient-to-br ${m.gradient} items-center justify-center text-3xl text-white shadow-lg mb-4`}>
                    {key === 'gozosos' && '😊'}
                    {key === 'luminosos' && '✨'}
                    {key === 'dolorosos' && '😢'}
                    {key === 'gloriosos' && '👑'}
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-cinzel font-bold text-foreground mb-2">
                    {m.title}
                  </h2>
                  <p className="text-lg text-muted-foreground mb-1">{m.subtitle}</p>
                  <p className={`text-sm font-semibold ${m.badgeColor} inline-block px-3 py-1 rounded-full`}>
                    {m.days}
                  </p>
                  {m.note && (
                    <p className="text-xs text-muted-foreground mt-2 italic">{m.note}</p>
                  )}
                </div>

                {/* Mysteries List */}
                <div className="space-y-4">
                  {m.mysteries.map((mystery) => (
                    <div 
                      key={mystery.number}
                      className="p-5 rounded-xl bg-card border border-border hover:-translate-y-0.5 transition-all"
                      data-testid={`mystery-${key}-${mystery.number}`}
                    >
                      <div className="flex gap-4 items-start">
                        <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${m.gradient} text-white flex items-center justify-center font-cinzel font-bold flex-shrink-0`}>
                          {mystery.number}
                        </div>
                        <div className="flex-1">
                          <h3 className="text-lg font-cinzel font-bold text-foreground mb-2">
                            {mystery.title}
                          </h3>
                          <p className="text-muted-foreground text-sm mb-3 italic border-l-2 border-gold-500/30 pl-3">
                            &ldquo;{mystery.quote}&rdquo;
                          </p>
                          <span className={`${m.badgeColor} px-3 py-1 rounded-full text-xs font-semibold`}>
                            {mystery.scripture}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          );
        })}

        {/* CTA */}
        <section className="text-center">
          <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-sacred-blue via-slate-800 to-slate-900 text-white">
            <h3 className="text-2xl font-cinzel font-bold mb-4">
              {t("cta.title")}
            </h3>
            <p className="text-white/80 mb-6">
              {t("cta.subtitle")}
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
                className="rounded-full px-8 py-6 text-lg font-semibold border-white/20 text-white hover:bg-white/10"
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
