import { getTranslations } from "next-intl/server";
import { PageHeader } from "@/components/page-header";
import { PageTransition } from "@/components/page-transition";
import { BreadcrumbNav } from "@/components/learning/breadcrumb-nav";
import { Crown } from "lucide-react";
import { AUTH_DISABLED } from "@/providers/auth-provider";
import { getCaminhoLessons } from "@/lib/content";

interface Props {
  params: {
    locale: string;
  };
}

export default async function MisteriosVivosPage({ params }: Props) {
  const { locale } = params;
  const t = await getTranslations({ locale, namespace: "Teachings" });
  const LOCKED = AUTH_DISABLED ? false : true;

  const lessonsData = getCaminhoLessons("misterios-vivos", locale);

  const lessons = lessonsData.map((lesson) => ({
    id: lesson.slug,
    number: lesson.order ?? 99,
    title: lesson.title,
    duration: lesson.readingTime,
    isLocked: LOCKED
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
              { label: t("breadcrumb"), path: "/ensinamentos?tab=caminhos" },
              { label: t("pathLabels.misterios-vivos") }
            ]}
          />

          {/* Preview */}
          <section className="mb-8">
            <div className="p-6 rounded-2xl glass sacred-border">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center shadow-lg">
                  <Crown className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-cinzel font-bold text-foreground">{t("pathPages.content")}</h2>
                  <p className="text-purple-600 dark:text-purple-400 text-sm font-medium">{t("pathPages.misterios-vivos.meta")}</p>
                </div>
              </div>
              <ul className="space-y-2">
                {lessons.length > 0 ? (
                  lessons.map((lesson) => (
                    <li key={lesson.id} className="flex items-center gap-2 text-muted-foreground">
                      <span className="w-6 h-6 rounded-full bg-purple-500/20 flex items-center justify-center text-xs font-bold text-purple-600 dark:text-purple-400">
                        {lesson.number}
                      </span>
                      <span className="text-sm">{lesson.title}</span>
                      <span className="text-xs text-muted-foreground/60 ml-auto">{lesson.duration}</span>
                    </li>
                  ))
                ) : (
                  <p className="text-muted-foreground text-sm">Novas lições em breve.</p>
                )}
              </ul>
            </div>
          </section>
        </div>
      </main>
    </PageTransition>
  );
}
