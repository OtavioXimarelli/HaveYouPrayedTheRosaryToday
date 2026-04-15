import { notFound } from "next/navigation";
import { PageHeader } from "@/components/page-header";
import { PageTransition } from "@/components/page-transition";
import { BreadcrumbNav } from "@/components/learning/breadcrumb-nav";
import { ArrowRight, BookOpen, Clock } from "lucide-react";
import { Link } from "@/i18n/routing";
import { getArticlesByTema } from "@/lib/content";
import { getTranslations } from "next-intl/server";

interface Props {
  params: Promise<{
    locale: string;
    categoria: string;
  }>;
}

export default async function CategoriaPage({ params }: Props) {
  const { categoria, locale } = await params;
  const t = await getTranslations({ locale, namespace: "Teachings" });

  const categoryLabels: Record<string, { title: string; desc: string; icon: string }> = {
    santos: { title: t("topics.santos.title"), desc: t("topics.santos.desc"), icon: "⭐" },
    teologia: { title: t("topics.teologia.title"), desc: t("topics.teologia.desc"), icon: "📚" },
    historia: { title: t("topics.historia.title"), desc: t("topics.historia.desc"), icon: "📜" },
    oracoes: { title: t("topics.oracoes.title"), desc: t("topics.oracoes.desc"), icon: "🙏" },
    sacramentos: { title: t("topics.sacramentos.title"), desc: t("topics.sacramentos.desc"), icon: "✨" },
    maria: { title: t("topics.maria.title"), desc: t("topics.maria.desc"), icon: "👑" },
    escritura: { title: t("topics.escritura.title"), desc: t("topics.escritura.desc"), icon: "📖" },
  };

  const category = categoryLabels[categoria];
  if (!category) notFound();

  const articles = getArticlesByTema(categoria, locale);

  return (
    <PageTransition>
      <main className="min-h-screen bg-background">
        <PageHeader title={category.title} subtitle={category.desc} icon={category.icon} />

        <div className="mx-auto w-full max-w-5xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
          <BreadcrumbNav
            items={[
              { label: t("breadcrumb"), path: "/ensinamentos" },
              { label: category.title },
            ]}
          />

          <section className="mb-10 rounded-3xl border border-gold-500/20 bg-gradient-to-br from-gold-500/10 to-transparent p-6 sm:p-8">
            <p className="text-muted-foreground">{t("exploreMore", { topic: category.title.toLowerCase() })}</p>
          </section>

          <section>
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-2xl font-cinzel font-bold text-foreground">{t("available")}</h2>
              <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                {articles.length} {articles.length === 1 ? t("article") : t("articles")}
              </span>
            </div>

            {articles.length > 0 ? (
              <div className="space-y-4">
                {articles.map((article) => (
                  <Link key={article.slug} href={`/ensinamentos/${categoria}/${article.slug}`}>
                    <article className="group rounded-2xl border border-border bg-card p-5 transition-all hover:-translate-y-0.5 hover:border-gold-500/30 hover:shadow-md">
                      <div className="mb-2 flex items-center gap-2">
                        <BookOpen className="h-4 w-4 text-gold-600 dark:text-gold-400" />
                        <span className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">{category.title}</span>
                        <span className="ml-auto inline-flex items-center gap-1 text-xs text-muted-foreground">
                          <Clock className="h-3.5 w-3.5" />
                          {article.readingTime}
                        </span>
                      </div>

                      <h3 className="mb-2 font-cinzel text-xl font-bold text-foreground group-hover:text-gold-600 dark:group-hover:text-gold-400">
                        {article.title}
                      </h3>
                      <p className="mb-3 line-clamp-2 text-sm text-muted-foreground">{article.excerpt}</p>

                      <span className="inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-wider text-gold-600 dark:text-gold-400">
                        {t("hub.readArticle")}
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </span>
                    </article>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="rounded-3xl border border-border bg-card py-16 text-center">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-muted">
                  <BookOpen className="h-7 w-7 text-muted-foreground" />
                </div>
                <h3 className="mb-2 text-xl font-cinzel font-bold text-foreground">{t("empty.title")}</h3>
                <p className="mx-auto max-w-md text-muted-foreground">{t("empty.desc")}</p>
              </div>
            )}
          </section>
        </div>
      </main>
    </PageTransition>
  );
}
