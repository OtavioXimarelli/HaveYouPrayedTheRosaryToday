"use client";

import { useRouter } from "@/i18n/routing";
import { PageHeader } from "@/components/page-header";
import { PageTransition } from "@/components/page-transition";
import { LessonCard } from "@/components/learning/lesson-card";
import { ProgressBar } from "@/components/learning/progress-bar";
import { BreadcrumbNav } from "@/components/learning/breadcrumb-nav";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import { AUTH_DISABLED } from "@/providers/auth-provider";

import { useTranslations } from "next-intl";

export default function PrimeirosPassosPage() {
  const router = useRouter();
  const t = useTranslations("Teachings");
  const LOCKED = AUTH_DISABLED ? false : true;

  // Mock data
  const completedLessons: string[] = []; // Would come from localStorage

  const lessons = [
    {
      id: "o-que-e-rosario",
      number: 1,
      title: t("pathPages.primeiros-passos.l1.title"),
      description: t("pathPages.primeiros-passos.l1.desc"),
      duration: "15 min",
      isLocked: false
    },
    {
      id: "papel-de-maria",
      number: 2,
      title: t("pathPages.primeiros-passos.l2.title"),
      description: t("pathPages.primeiros-passos.l2.desc"),
      duration: "20 min",
      isLocked: false
    },
    {
      id: "poder-oracao-repetitiva",
      number: 3,
      title: t("pathPages.primeiros-passos.l3.title"),
      description: t("pathPages.primeiros-passos.l3.desc"),
      duration: "15 min",
      isLocked: LOCKED
    },
    {
      id: "habito-diario",
      number: 4,
      title: t("pathPages.primeiros-passos.l4.title"),
      description: t("pathPages.primeiros-passos.l4.desc"),
      duration: "12 min",
      isLocked: LOCKED
    },
    {
      id: "vencendo-distracoes",
      number: 5,
      title: t("pathPages.primeiros-passos.l5.title"),
      description: t("pathPages.primeiros-passos.l5.desc"),
      duration: "18 min",
      isLocked: LOCKED
    }
  ];

  const completedCount = lessons.filter(l => completedLessons.includes(l.id)).length;

  return (
    <PageTransition>
      <main className="min-h-screen bg-background">
        <PageHeader
          title={t("pathPages.primeiros-passos.title")}
          subtitle={t("pathPages.primeiros-passos.subtitle")}
          icon="✨"
        />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <BreadcrumbNav 
            items={[
              { label: t("breadcrumb"), path: "/ensinamentos?tab=caminhos" },
              { label: t("pathLabels.primeiros-passos") }
            ]} 
          />

          {/* Intro */}
          <section className="mb-8">
            <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-emerald-500/10 to-emerald-600/5 border border-emerald-500/20">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center shadow-lg">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-cinzel font-bold text-foreground">{t("pathPages.welcome")}</h2>
                  <p className="text-emerald-600 dark:text-emerald-400 text-sm font-medium">{t("pathPages.primeiros-passos.meta")}</p>
                </div>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                {t("pathPages.primeiros-passos.desc")}
              </p>
            </div>
          </section>

          {/* Progress */}
          <section className="mb-8">
            <div className="p-5 rounded-2xl glass sacred-border">
              <ProgressBar
                current={completedCount}
                total={lessons.length}
                label={t("pathPages.progress")}
              />
            </div>
          </section>

          {/* Lessons */}
          <section className="mb-12">
            <h2 className="text-xl font-cinzel font-bold text-foreground mb-6">{t("pathPages.lessons")}</h2>
            <div className="space-y-4">
              {lessons.map((lesson) => (
                <LessonCard
                  key={lesson.id}
                  title={lesson.title}
                  description={lesson.description}
                  duration={lesson.duration}
                  path={`/ensinamentos/caminhos/primeiros-passos/${lesson.id}`}
                  lessonNumber={lesson.number}
                  isCompleted={completedLessons.includes(lesson.id)}
                  isLocked={lesson.isLocked}
                />
              ))}
            </div>
          </section>

          {/* Next Path CTA */}
          <section className="text-center">
            <div className="p-6 sm:p-8 rounded-3xl glass sacred-border">
              <h3 className="text-xl font-cinzel font-bold text-foreground mb-3">
                {t("pathPages.nextStep")}
              </h3>
              <p className="text-muted-foreground mb-6">
                {t("pathPages.nextStepDesc")}
              </p>
              <Button
                size="lg"
                onClick={() => router.push("/ensinamentos/caminhos/aprofundando")}
                className="rounded-full px-8 py-6 text-base font-cinzel font-bold bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:shadow-lg transition-all"
                data-testid="next-path-btn"
              >
                {t("pathPages.nextStepBtn")}
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </div>
          </section>
        </div>
      </main>
    </PageTransition>
  );
}
