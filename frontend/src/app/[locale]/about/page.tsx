"use client";

import { PageHeader } from "@/components/page-header";
import { PageTransition } from "@/components/page-transition";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/routing";
import { BookOpen, Heart, Shield, Sparkles, Users, Zap } from "lucide-react";
import { useTranslations } from "next-intl";

export default function AboutPage() {
  const t = useTranslations("About");

  const principles = [
    { icon: Heart, title: t("principles.p1.title"), description: t("principles.p1.desc") },
    { icon: Users, title: t("principles.p2.title"), description: t("principles.p2.desc") },
    { icon: BookOpen, title: t("principles.p3.title"), description: t("principles.p3.desc") },
    { icon: Sparkles, title: t("principles.p4.title"), description: t("principles.p4.desc") },
    { icon: Shield, title: t("principles.p5.title"), description: t("principles.p5.desc") },
    { icon: Zap, title: t("principles.p6.title"), description: t("principles.p6.desc") },
  ];

  const timeline = [
    { year: t("journey.j1.year"), title: t("journey.j1.title"), description: t("journey.j1.desc") },
    { year: t("journey.j2.year"), title: t("journey.j2.title"), description: t("journey.j2.desc") },
    { year: t("journey.j3.year"), title: t("journey.j3.title"), description: t("journey.j3.desc") },
  ];

  return (
    <PageTransition>
      <main className="min-h-screen bg-background">
        <PageHeader title={t("title")} subtitle={t("subtitle")} icon="ℹ️" />

        <div className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
          <section className="mb-12 rounded-3xl border border-gold-500/20 bg-gradient-to-br from-gold-500/10 to-transparent p-6 sm:p-8">
            <h2 className="mb-4 text-3xl font-cinzel font-bold text-foreground sm:text-4xl">{t("mission.title")}</h2>
            <p className="mb-4 text-muted-foreground">{t("mission.p1")}</p>
            <p className="mb-6 text-muted-foreground">{t("mission.p2")}</p>
            <div className="rounded-2xl border border-border bg-card p-5">
              <h3 className="mb-2 text-xl font-cinzel font-bold text-foreground">{t("mission.visionTitle")}</h3>
              <p className="text-muted-foreground">{t("mission.visionDesc")}</p>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="mb-2 text-center text-3xl font-cinzel font-bold text-foreground sm:text-4xl">{t("principles.title")}</h2>
            <p className="mx-auto mb-8 max-w-2xl text-center text-muted-foreground">{t("principles.subtitle")}</p>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              {principles.map((principle, idx) => (
                <article key={idx} className="rounded-2xl border border-border bg-card p-6 transition-all hover:border-gold-500/30 hover:shadow-md">
                  <principle.icon className="mb-4 h-9 w-9 text-gold-600 dark:text-gold-400" />
                  <h3 className="mb-2 text-xl font-cinzel font-bold text-foreground">{principle.title}</h3>
                  <p className="text-sm text-muted-foreground">{principle.description}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="mb-12">
            <h2 className="mb-6 text-center text-3xl font-cinzel font-bold text-foreground sm:text-4xl">{t("journey.title")}</h2>
            <div className="space-y-4">
              {timeline.map((item, idx) => (
                <article key={idx} className="rounded-2xl border border-border bg-card p-6">
                  <p className="mb-1 text-xs font-bold uppercase tracking-[0.2em] text-gold-600 dark:text-gold-400">{item.year}</p>
                  <h3 className="mb-2 text-xl font-cinzel font-bold text-foreground">{item.title}</h3>
                  <p className="text-muted-foreground">{item.description}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="mb-12">
            <h2 className="mb-6 text-center text-3xl font-cinzel font-bold text-foreground sm:text-4xl">{t("different.title")}</h2>
            <div className="space-y-4">
              {[1, 2, 3, 4].map((i) => (
                <article key={i} className="rounded-2xl border border-border bg-card p-5">
                  <h3 className="mb-2 text-lg font-cinzel font-bold text-foreground">{t(`different.d${i}.title`)}</h3>
                  <p className="text-muted-foreground">{t(`different.d${i}.desc`)}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="mb-12">
            <h2 className="mb-2 text-center text-3xl font-cinzel font-bold text-foreground sm:text-4xl">{t("faq.title")}</h2>
            <p className="mx-auto mb-8 max-w-2xl text-center text-muted-foreground">{t("faq.subtitle")}</p>
            <div className="space-y-4">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
                <article key={i} className="rounded-2xl border border-border bg-card p-6">
                  <h3 className="mb-2 text-lg font-cinzel font-bold text-foreground">{t(`faq.q${i}.q`)}</h3>
                  <p className="whitespace-pre-line text-muted-foreground">{t(`faq.q${i}.a`)}</p>
                  {i === 6 && (
                    <a
                      href="https://github.com/OtavioXimarelli/HaveYouPrayedTheRosaryToday"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-4 inline-flex rounded-lg border border-gold-500/30 bg-gold-500/10 px-4 py-2 text-sm font-semibold text-gold-700 transition-all hover:bg-gold-500/15 dark:text-gold-300"
                    >
                      {t("faq.q6.github")}
                    </a>
                  )}
                </article>
              ))}
            </div>
          </section>

          <section className="rounded-3xl bg-gradient-to-br from-sacred-blue via-slate-800 to-slate-900 p-8 text-center text-white sm:p-10">
            <h2 className="mb-4 text-3xl font-cinzel font-bold">{t("cta.title")}</h2>
            <p className="mx-auto mb-6 max-w-2xl text-white/80">{t("cta.desc")}</p>
            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <Button asChild size="lg" className="rounded-full bg-gradient-to-r from-gold-500 to-gold-600 font-cinzel font-bold text-sacred-blue">
                <Link href="/como-rezar">{t("cta.btn1")}</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="rounded-full border-white/30 bg-white/5 text-white hover:bg-white/10">
                <Link href="/ensinamentos">{t("cta.btn2")}</Link>
              </Button>
            </div>
          </section>
        </div>
      </main>
    </PageTransition>
  );
}
