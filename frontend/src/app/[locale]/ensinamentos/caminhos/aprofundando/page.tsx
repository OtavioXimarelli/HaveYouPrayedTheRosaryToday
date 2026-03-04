import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/routing";
import { PageHeader } from "@/components/page-header";
import { PageTransition } from "@/components/page-transition";
import { LessonCard } from "@/components/learning/lesson-card";
import { ProgressBar } from "@/components/learning/progress-bar";
import { BreadcrumbNav } from "@/components/learning/breadcrumb-nav";
import { BookOpen, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AUTH_DISABLED } from "@/providers/auth-provider";
import { getCaminhoLessons } from "@/lib/content";

interface Props {
  params: Promise<{
    locale: string;
  }>;
}

export default async function AprofundandoPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Teachings" });
  const LOCKED = AUTH_DISABLED ? false : true;

  const lessonsData = getCaminhoLessons("aprofundando", locale);

  const lessons = lessonsData.map((lesson) => ({
    id: lesson.slug,
    number: lesson.order ?? 99,
    title: lesson.title,
    description: lesson.excerpt,
    duration: lesson.readingTime,
    isLocked: LOCKED
  }));

  const completedLessons: string[] = []; // Would come from localStorage
  const completedCount = lessons.filter(l => completedLessons.includes(l.id)).length;

  return (
    <PageTransition>
      <main className="min-h-screen bg-background">
        <PageHeader
          title={t("pathPages.aprofundando.title")}
          subtitle={t("pathPages.aprofundando.subtitle")}
          icon="📖"
        />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <BreadcrumbNav
            items={[
              { label: t("breadcrumb"), path: "/ensinamentos?tab=caminhos" },
              { label: t("pathLabels.aprofundando") }
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
                  <h2 className="text-xl font-cinzel font-bold text-foreground">{t("pathPages.aprofundando.subtitle")}</h2>
                  <p className="text-blue-600 dark:text-blue-400 text-sm font-medium">{t("pathPages.aprofundando.meta")}</p>
                </div>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                {t("pathPages.aprofundando.desc")}
              </p>
            </div>
          </section>

          {/* Progress */}
          <section className="mb-8">
            <div className="p-5 rounded-2xl glass sacred-border">
              <ProgressBar
                current={completedCount}
                total={lessons.length > 0 ? lessons.length : 1}
                label={t("pathPages.progress")}
              />
            </div>
          </section>

          {/* Lessons */}
          <section className="mb-12">
            <h2 className="text-xl font-cinzel font-bold text-foreground mb-6">{t("pathPages.lessons")}</h2>

            {lessons.length > 0 ? (
              <div className="space-y-4">
                {lessons.map((lesson) => (
                  <LessonCard
                    key={lesson.id}
                    title={lesson.title}
                    description={lesson.description}
                    duration={lesson.duration}
                    path={`/ensinamentos/caminhos/aprofundando/${lesson.id}`}
                    lessonNumber={lesson.number}
                    isCompleted={completedLessons.includes(lesson.id)}
                    isLocked={lesson.isLocked}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-10 glass rounded-3xl sacred-border">
                <p className="text-muted-foreground">Novas lições em breve.</p>
              </div>
            )}
          </section>

          {/* Next Path CTA */}
          <section className="text-center">
            <div className="p-6 sm:p-8 rounded-3xl glass sacred-border">
              <h3 className="text-xl font-cinzel font-bold text-foreground mb-3">
                Continuar para Mistérios Vivos
              </h3>
              <p className="text-muted-foreground mb-6">
                Avance para o último caminho e aprofunde ainda mais os ensinamentos.
              </p>
              <Button
                asChild
                size="lg"
                className="rounded-full px-8 py-6 text-base font-cinzel font-bold bg-gradient-to-r from-purple-500 to-purple-600 text-white hover:shadow-lg transition-all"
                data-testid="next-path-btn"
              >
                <Link href="/ensinamentos/caminhos/misterios-vivos">
                  {t("pathPages.nextStepBtn")}
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </Button>
            </div>
          </section>
        </div>
      </main>
    </PageTransition>
  );
}
