import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/routing";
import { PageHeader } from "@/components/page-header";
import { PageTransition } from "@/components/page-transition";
import { BreadcrumbNav } from "@/components/learning/breadcrumb-nav";
import { LessonCard } from "@/components/learning/lesson-card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Crown } from "lucide-react";
import { getCaminhoLessons } from "@/lib/content";

interface Props {
  params: {
    locale: string;
  };
}

export default async function MisteriosVivosPage({ params }: Props) {
  const { locale } = params;
  const t = await getTranslations({ locale, namespace: "Teachings" });

  const lessonsData = getCaminhoLessons("misterios-vivos", locale);
  const lessons = lessonsData.map((lesson) => ({
    id: lesson.slug,
    number: lesson.order ?? 99,
    title: lesson.title,
    description: lesson.excerpt,
    duration: lesson.readingTime,
    isLocked: false,
  }));

  return (
    <PageTransition>
      <main className="min-h-screen bg-background">
        <PageHeader
          title={t("pathPages.misterios-vivos.title")}
          subtitle={t("pathPages.misterios-vivos.subtitle")}
          icon="👑"
        />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <BreadcrumbNav
            items={[
              { label: t("breadcrumb"), path: "/ensinamentos" },
              { label: t("pathLabels.misterios-vivos") },
            ]}
          />

          <section className="mb-8">
            <div className="rounded-3xl border border-purple-500/20 bg-gradient-to-br from-purple-500/10 to-purple-600/5 p-6 sm:p-8">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 shadow-lg">
                  <Crown className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-cinzel font-bold text-foreground">{t("pathPages.content")}</h2>
                  <p className="text-sm font-medium text-purple-600 dark:text-purple-400">{t("pathPages.misterios-vivos.meta")}</p>
                </div>
              </div>
              <p className="text-muted-foreground">{t("pathPages.finalCtaDesc")}</p>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="mb-6 text-xl font-cinzel font-bold text-foreground">{t("pathPages.lessons")}</h2>

            {lessons.length > 0 ? (
              <div className="space-y-4">
                {lessons.map((lesson) => (
                  <LessonCard
                    key={lesson.id}
                    title={lesson.title}
                    description={lesson.description}
                    duration={lesson.duration}
                    path={`/ensinamentos/caminhos/misterios-vivos/${lesson.id}`}
                    lessonNumber={lesson.number}
                    isLocked={lesson.isLocked}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-10 glass rounded-3xl sacred-border">
                <p className="text-muted-foreground">{t("pathPages.comingSoon")}</p>
              </div>
            )}
          </section>

          <section className="text-center">
            <div className="rounded-3xl bg-gradient-to-br from-sacred-blue via-slate-800 to-slate-900 p-6 text-white sm:p-8">
              <h3 className="mb-3 text-xl font-cinzel font-bold">{t("pathPages.finalCtaTitle")}</h3>
              <p className="mb-6 text-white/80">{t("pathPages.finalCtaDesc")}</p>
              <div className="flex flex-col justify-center gap-4 sm:flex-row">
                <Button asChild size="lg" className="rounded-full bg-gradient-to-r from-gold-500 to-gold-600 px-8 py-6 text-base font-cinzel font-bold text-sacred-blue">
                  <Link href="/misterios-do-dia">
                    {t("pathPages.finalCtaPrimary")}
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="rounded-full border-white/20 bg-white/5 px-8 py-6 text-base font-semibold text-white hover:bg-white/10">
                  <Link href="/ensinamentos">{t("pathPages.finalCtaSecondary")}</Link>
                </Button>
              </div>
            </div>
          </section>
        </div>
      </main>
    </PageTransition>
  );
}
