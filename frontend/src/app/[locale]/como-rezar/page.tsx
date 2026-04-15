"use client";

import { useMemo } from "react";
import { ArrowRight, Check, Clock, Heart } from "lucide-react";
import { useTranslations } from "next-intl";
import { useRouter } from "@/i18n/routing";
import { PageTransition } from "@/components/page-transition";
import { PageHeader } from "@/components/page-header";
import { Button } from "@/components/ui/button";

export default function ComoRezarPage() {
  const router = useRouter();
  const t = useTranslations("HowToPray");

  const steps = useMemo(
    () => [
      { number: 1, title: t("steps.step1.title"), description: t("steps.step1.description"), prayer: t("steps.step1.prayer") },
      {
        number: 2,
        title: t("steps.step2.title"),
        description: t("steps.step2.description"),
        hasLink: true,
        linkText: t("steps.step2.linkText"),
        linkPath: "/oracoes-tradicionais",
      },
      { number: 3, title: t("steps.step3.title"), description: t("steps.step3.description") },
      {
        number: 4,
        title: t("steps.step4.title"),
        description: t("steps.step4.description"),
        list: [t("steps.step4.list.0"), t("steps.step4.list.1"), t("steps.step4.list.2")],
      },
      { number: 5, title: t("steps.step5.title"), description: t("steps.step5.description"), prayer: t("steps.step5.prayer") },
      {
        number: 6,
        title: t("steps.step6.title"),
        description: t("steps.step6.description"),
        hasLink: true,
        linkText: t("steps.step6.linkText"),
        linkPath: "/misterios-do-dia",
      },
      {
        number: 7,
        title: t("steps.step7.title"),
        description: t("steps.step7.description"),
        detailedList: [
          { count: "1x", text: t("steps.step7.list.0.text") },
          { count: "10x", text: t("steps.step7.list.1.text") },
          { count: "1x", text: t("steps.step7.list.2.text") },
          { count: "1x", text: t("steps.step7.list.3.text") },
        ],
      },
      { number: 8, title: t("steps.step8.title"), description: t("steps.step8.description") },
      { number: 9, title: t("steps.step9.title"), description: t("steps.step9.description"), prayer: t("steps.step9.prayer") },
      { number: 10, title: t("steps.step10.title"), description: t("steps.step10.description") },
    ],
    [t]
  );

  return (
    <PageTransition>
      <main className="min-h-screen bg-background">
        <PageHeader title={t("title")} subtitle={t("subtitle")} icon="📖" />

        <div className="mx-auto w-full max-w-4xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
          <article className="mb-10 rounded-3xl border border-gold-500/20 bg-gradient-to-br from-gold-500/10 to-transparent p-6 sm:p-8">
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-gold-600 dark:text-gold-400">
              Guia essencial
            </p>
            <h2 className="mb-3 text-2xl font-cinzel font-bold text-foreground sm:text-3xl">Como rezar o Rosário com clareza</h2>
            <p className="text-lg leading-relaxed text-muted-foreground">{t("intro")}</p>
            <div className="mt-5 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
              <span className="inline-flex items-center gap-1.5">
                <Clock className="h-4 w-4" />
                15-20 min
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Heart className="h-4 w-4" />
                Passo a passo completo
              </span>
            </div>
          </article>

          <section className="mb-12 rounded-3xl border border-border bg-card p-6 sm:p-8">
            <h3 className="mb-5 text-2xl font-cinzel font-bold text-foreground">{t("needs.title")}</h3>
            <div className="grid gap-3 sm:grid-cols-2">
              {[0, 1, 2, 3].map((i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-gold-500 to-gold-600">
                    <Check className="h-4 w-4 text-white" strokeWidth={3} />
                  </div>
                  <span className="text-foreground">{t(`needs.items.${i}`)}</span>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h3 className="mb-6 text-2xl font-cinzel font-bold text-foreground sm:text-3xl">{t("steps.title")}</h3>
            <div className="space-y-5">
              {steps.map((step) => (
                <article key={step.number} className="rounded-2xl border border-border bg-card p-6 transition-all hover:border-gold-500/30 hover:shadow-md sm:p-7" data-testid={`step-${step.number}`}>
                  <div className="flex items-start gap-4">
                    <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-gold-500 to-gold-600 font-cinzel text-lg font-bold text-white shadow-lg">
                      {step.number}
                    </div>
                    <div className="min-w-0 flex-1">
                      <h4 className="mb-2 text-xl font-cinzel font-bold text-foreground">{step.title}</h4>
                      <p className="mb-3 text-muted-foreground">{step.description}</p>

                      {step.prayer && (
                        <div className="rounded-xl border border-border bg-muted/30 p-4 italic text-foreground">{step.prayer}</div>
                      )}

                      {step.list && (
                        <ul className="mt-2 space-y-2">
                          {step.list.map((item, i) => (
                            <li key={i} className="flex items-center gap-2 text-foreground">
                              <div className="h-2 w-2 rounded-full bg-gold-500" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      )}

                      {step.detailedList && (
                        <ul className="mt-2 space-y-2">
                          {step.detailedList.map((item, i) => (
                            <li key={i} className="flex items-start gap-3 text-foreground">
                              <span className="min-w-[40px] font-bold text-gold-600 dark:text-gold-400">{item.count}</span>
                              <span>{item.text}</span>
                            </li>
                          ))}
                        </ul>
                      )}

                      {step.hasLink && (
                        <Button
                          variant="outline"
                          onClick={() => router.push(step.linkPath!)}
                          className="mt-4 rounded-full border-gold-500/30 text-gold-600 hover:bg-gold-500/10 dark:text-gold-400"
                        >
                          {step.linkText}
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section className="mt-12 rounded-3xl bg-gradient-to-br from-sacred-blue via-slate-800 to-slate-900 p-7 text-white sm:p-9">
            <h3 className="mb-5 text-2xl font-cinzel font-bold">{t("tips.title")}</h3>
            <ul className="space-y-4">
              {[0, 1, 2, 3, 4].map((i) => (
                <li key={i} className="flex items-start gap-3">
                  <div className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-gold-500/20">
                    <Check className="h-4 w-4 text-gold-400" strokeWidth={3} />
                  </div>
                  <span className="text-white/90">{t(`tips.items.${i}`)}</span>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </main>
    </PageTransition>
  );
}
