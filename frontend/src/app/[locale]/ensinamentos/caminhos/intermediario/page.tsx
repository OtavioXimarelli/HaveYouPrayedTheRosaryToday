"use client";

import { useRouter } from "@/i18n/routing";
import { PageHeader } from "@/components/page-header";
import { PageTransition } from "@/components/page-transition";
import { LessonCard } from "@/components/learning/lesson-card";
import { ProgressBar } from "@/components/learning/progress-bar";
import { BreadcrumbNav } from "@/components/learning/breadcrumb-nav";
import { BookOpen } from "lucide-react";
import { AUTH_DISABLED } from "@/providers/auth-provider";

import { useTranslations } from "next-intl";

export default function IntermediarioPage() {
  const router = useRouter();
  const t = useTranslations("Teachings");
  const LOCKED = AUTH_DISABLED ? false : true;

  const lessons = [
    {
      id: "oracao-contemplativa",
      number: 1,
      title: t("pathPages.intermediario.l1.title"),
      description: t("pathPages.intermediario.l1.desc"),
      duration: "25 min",
      isLocked: LOCKED
    },
    {
      id: "ano-liturgico",
      number: 2,
      title: t("pathPages.intermediario.l2.title"),
      description: t("pathPages.intermediario.l2.desc"),
      duration: "20 min",
      isLocked: LOCKED
    },
    {
      id: "raizes-biblicas",
      number: 3,
      title: t("pathPages.intermediario.l3.title"),
      description: t("pathPages.intermediario.l3.desc"),
      duration: "30 min",
      isLocked: LOCKED
    },
    {
      id: "rosario-sacramentos",
      number: 4,
      title: t("pathPages.intermediario.l4.title"),
      description: t("pathPages.intermediario.l4.desc"),
      duration: "22 min",
      isLocked: LOCKED
    },
    {
      id: "maria-escrituras",
      number: 5,
      title: t("pathPages.intermediario.l5.title"),
      description: t("pathPages.intermediario.l5.desc"),
      duration: "28 min",
      isLocked: LOCKED
    }
  ];

  const completedLessons: string[] = []; // Would come from localStorage
  const completedCount = lessons.filter(l => completedLessons.includes(l.id)).length;

  return (
    <PageTransition>
      <main className="min-h-screen bg-background">
        <PageHeader
          title={t("pathPages.intermediario.title")}
          subtitle={t("pathPages.intermediario.subtitle")}
          icon="📖"
        />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <BreadcrumbNav
            items={[
              { label: t("breadcrumb"), path: "/ensinamentos?tab=caminhos" },
              { label: t("pathLabels.intermediario") }
            ]}
          />

          {/* Intro */}
          <section className="mb-8">
            <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-blue-500/10 to-blue-600/5 border border-blue-500/20">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-lg">
                  <BookOpen className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-cinzel font-bold text-foreground">{t("pathPages.intermediario.subtitle")}</h2>
                  <p className="text-blue-600 dark:text-blue-400 text-sm font-medium">{t("pathPages.intermediario.meta")}</p>
                </div>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                {t("pathPages.intermediario.desc")}
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
                  lessonNumber={lesson.number}
                  isCompleted={completedLessons.includes(lesson.id)}
                  isLocked={lesson.isLocked}
                  path={`/ensinamentos/caminhos/intermediario/${lesson.id}`}
                />
              ))}
            </div>
          </section>
        </div>
      </main>
    </PageTransition>
  );
}
