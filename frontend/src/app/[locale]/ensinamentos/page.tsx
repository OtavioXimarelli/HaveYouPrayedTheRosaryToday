import { PageHeader } from "@/components/page-header";
import { PageTransition } from "@/components/page-transition";
import { BreadcrumbNav } from "@/components/learning/breadcrumb-nav";
import { ArrowRight, BookOpen, Clock, Tag } from "lucide-react";
import { Link } from "@/i18n/routing";
import { getAllTeachingsArticles, getArticlesByTema } from "@/lib/content";
import { getTranslations } from "next-intl/server";

interface Props {
  params: Promise<{ locale: string }>;
}

export default async function EnsinamentosPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Teachings" });

  const topics = [
    { id: "santos", title: t("topics.santos.title"), description: t("topics.santos.desc"), path: "/ensinamentos/santos" },
    { id: "teologia", title: t("topics.teologia.title"), description: t("topics.teologia.desc"), path: "/ensinamentos/teologia" },
    { id: "historia", title: t("topics.historia.title"), description: t("topics.historia.desc"), path: "/ensinamentos/historia" },
    { id: "oracoes", title: t("topics.oracoes.title"), description: t("topics.oracoes.desc"), path: "/ensinamentos/oracoes" },
    { id: "sacramentos", title: t("topics.sacramentos.title"), description: t("topics.sacramentos.desc"), path: "/ensinamentos/sacramentos" },
    { id: "maria", title: t("topics.maria.title"), description: t("topics.maria.desc"), path: "/ensinamentos/maria" },
    { id: "escritura", title: t("topics.escritura.title"), description: t("topics.escritura.desc"), path: "/ensinamentos/escritura" },
  ];

  const allArticles = getAllTeachingsArticles(locale);
  const featured = allArticles[0];
  const latest = allArticles.slice(1, 7);

  return (
    <PageTransition>
      <main className="min-h-screen bg-background">
        <PageHeader title={t("title")} subtitle={t("subtitle")} icon="📰" />

        <div className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
          <BreadcrumbNav items={[{ label: t("breadcrumb") }]} />

          <section className="mb-10 rounded-3xl border border-gold-500/20 bg-gradient-to-br from-gold-500/10 to-transparent p-6 sm:p-8">
            <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-gold-600 dark:text-gold-400">
              {t("hub.featured")}
            </p>
            <h2 className="mb-3 text-2xl font-cinzel font-bold text-foreground sm:text-3xl">{t("hero.title")}</h2>
            <p className="text-muted-foreground">{t("hero.desc")}</p>
          </section>

          {featured && (
            <section className="mb-12">
              <Link href={`/ensinamentos/${featured.categoria}/${featured.slug}`}>
                <article className="group rounded-3xl border border-border bg-card p-6 transition-all hover:-translate-y-0.5 hover:border-gold-500/30 hover:shadow-lg sm:p-8">
                  <div className="mb-4 flex items-center gap-2">
                    <span className="rounded-full border border-gold-500/30 bg-gold-500/10 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-gold-600 dark:text-gold-400">
                      {t("hub.featured")}
                    </span>
                    <span className="rounded-full bg-muted px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                      {t(`topics.${featured.categoria}.title` as any)}
                    </span>
                  </div>
                  <h3 className="mb-3 text-2xl font-cinzel font-bold text-foreground group-hover:text-gold-600 dark:group-hover:text-gold-400">
                    {featured.title}
                  </h3>
                  <p className="mb-4 text-muted-foreground">{featured.excerpt}</p>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span className="inline-flex items-center gap-1">
                      <Clock className="h-3.5 w-3.5" />
                      {featured.readingTime}
                    </span>
                    {featured.tags[0] && (
                      <span className="inline-flex items-center gap-1">
                        <Tag className="h-3.5 w-3.5" />
                        {featured.tags[0]}
                      </span>
                    )}
                    <span className="ml-auto inline-flex items-center gap-1 font-semibold text-gold-600 dark:text-gold-400">
                      {t("hub.readArticle")}
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </span>
                  </div>
                </article>
              </Link>
            </section>
          )}

          <section className="mb-12">
            <div className="mb-5 flex items-center justify-between">
              <h3 className="text-xl font-cinzel font-bold text-foreground sm:text-2xl">{t("hub.latest")}</h3>
              <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                {allArticles.length} {allArticles.length === 1 ? t("article") : t("articles")}
              </span>
            </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {latest.map((article) => (
                <Link key={`${article.categoria}-${article.slug}`} href={`/ensinamentos/${article.categoria}/${article.slug}`}>
                  <article className="group rounded-2xl border border-border bg-card p-5 transition-all hover:border-gold-500/30 hover:shadow-md">
                    <div className="mb-2 flex items-center gap-2">
                      <BookOpen className="h-4 w-4 text-gold-600 dark:text-gold-400" />
                      <span className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                        {t(`topics.${article.categoria}.title` as any)}
                      </span>
                    </div>
                    <h4 className="mb-2 font-cinzel text-lg font-bold text-foreground group-hover:text-gold-600 dark:group-hover:text-gold-400">
                      {article.title}
                    </h4>
                    <p className="mb-3 text-sm text-muted-foreground line-clamp-2">{article.excerpt}</p>
                    <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                      <Clock className="h-3.5 w-3.5" />
                      {article.readingTime}
                    </span>
                  </article>
                </Link>
              ))}
            </div>
          </section>

          <section>
            <h3 className="mb-5 text-xl font-cinzel font-bold text-foreground sm:text-2xl">{t("hub.categories")}</h3>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {topics.map((topic) => {
                const count = getArticlesByTema(topic.id, locale).length;
                return (
                  <Link key={topic.id} href={topic.path as any}>
                    <article className="group rounded-2xl border border-border bg-card p-5 transition-all hover:border-gold-500/30 hover:shadow-md">
                      <h4 className="mb-1 font-cinzel text-lg font-bold text-foreground group-hover:text-gold-600 dark:group-hover:text-gold-400">
                        {topic.title}
                      </h4>
                      <p className="mb-3 text-sm text-muted-foreground line-clamp-2">{topic.description}</p>
                      <span className="inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-wider text-gold-600 dark:text-gold-400">
                        {count} {count === 1 ? t("article") : t("articles")}
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </span>
                    </article>
                  </Link>
                );
              })}
            </div>
          </section>
        </div>
      </main>
    </PageTransition>
  );
}
