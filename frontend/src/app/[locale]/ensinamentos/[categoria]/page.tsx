import { notFound } from "next/navigation";
import { PageHeader } from "@/components/page-header";
import { BreadcrumbNav } from "@/components/learning/breadcrumb-nav";
import { 
  Users, 
  BookOpen, 
  Scroll, 
  Heart, 
  Zap, 
  Crown, 
  Book, 
  ArrowRight,
  Clock
} from "lucide-react";
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
  const commonT = await getTranslations({ locale, namespace: "Common" });

  const CATEGORIA_CONFIG: Record<string, {
    title: string;
    subtitle: string;
    icon: string;
    lucideIcon: any;
    gradient: string;
    bgGradient: string;
    borderColor: string;
    accentColor: string;
  }> = {
    santos: {
      title: t("topics.santos.title"),
      subtitle: t("topics.santos.desc"),
      icon: "⭐",
      lucideIcon: Users,
      gradient: "from-emerald-500 to-emerald-600",
      bgGradient: "from-emerald-500/10 to-emerald-600/5",
      borderColor: "border-emerald-500/20",
      accentColor: "text-emerald-600 dark:text-emerald-400",
    },
    teologia: {
      title: t("topics.teologia.title"),
      subtitle: t("topics.teologia.desc"),
      icon: "📚",
      lucideIcon: BookOpen,
      gradient: "from-blue-500 to-blue-600",
      bgGradient: "from-blue-500/10 to-blue-600/5",
      borderColor: "border-blue-500/20",
      accentColor: "text-blue-600 dark:text-blue-400",
    },
    historia: {
      title: t("topics.historia.title"),
      subtitle: t("topics.historia.desc"),
      icon: "📜",
      lucideIcon: Scroll,
      gradient: "from-purple-500 to-purple-600",
      bgGradient: "from-purple-500/10 to-purple-600/5",
      borderColor: "border-purple-500/20",
      accentColor: "text-purple-600 dark:text-purple-400",
    },
    oracoes: {
      title: t("topics.oracoes.title"),
      subtitle: t("topics.oracoes.desc"),
      icon: "🙏",
      lucideIcon: Heart,
      gradient: "from-rose-500 to-rose-600",
      bgGradient: "from-rose-500/10 to-rose-600/5",
      borderColor: "border-rose-500/20",
      accentColor: "text-rose-600 dark:text-rose-400",
    },
    sacramentos: {
      title: t("topics.sacramentos.title"),
      subtitle: t("topics.sacramentos.desc"),
      icon: "✨",
      lucideIcon: Zap,
      gradient: "from-amber-500 to-amber-600",
      bgGradient: "from-amber-500/10 to-amber-600/5",
      borderColor: "border-amber-500/20",
      accentColor: "text-amber-600 dark:text-amber-400",
    },
    maria: {
      title: t("topics.maria.title"),
      subtitle: t("topics.maria.desc"),
      icon: "👑",
      lucideIcon: Crown,
      gradient: "from-gold-500 to-gold-600",
      bgGradient: "from-gold-500/10 to-gold-600/5",
      borderColor: "border-gold-500/20",
      accentColor: "text-gold-600 dark:text-gold-400",
    },
    escritura: {
      title: t("topics.escritura.title"),
      subtitle: t("topics.escritura.desc"),
      icon: "📖",
      lucideIcon: Book,
      gradient: "from-indigo-500 to-indigo-600",
      bgGradient: "from-indigo-500/10 to-indigo-600/5",
      borderColor: "border-indigo-500/20",
      accentColor: "text-indigo-600 dark:text-indigo-400",
    },
  };

  const config = CATEGORIA_CONFIG[categoria];

  if (!config) {
    notFound();
  }

  const articles = getArticlesByTema(categoria, locale);
  const Icon = config.lucideIcon;

  return (
    <main className="min-h-screen bg-background">
      <PageHeader
        title={config.title}
        subtitle={config.subtitle}
        icon={config.icon}
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <BreadcrumbNav
          items={[
            { label: t("breadcrumb"), path: "/ensinamentos" },
            { label: config.title.split(" ")[0] }, 
          ]}
        />

        <section className="mb-12">
          <div className={`p-6 sm:p-8 rounded-3xl bg-gradient-to-br ${config.bgGradient} border ${config.borderColor}`}>
            <p className="text-lg text-muted-foreground leading-relaxed">
              {t("exploreMore", { topic: config.title.toLowerCase() })}
            </p>
          </div>
        </section>

        <section className="mb-12">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-cinzel font-bold text-foreground">{t("available")}</h2>
            <span className="text-sm font-medium text-muted-foreground">
              {articles.length} {articles.length === 1 ? t("article") : t("articles")}
            </span>
          </div>

          {articles.length > 0 ? (
            <div className="space-y-4">
              {articles.map((article) => (
                <Link
                  key={article.slug}
                  href={`/ensinamentos/${categoria}/${article.slug}`}
                  className="block group"
                >
                  <div className="p-6 rounded-2xl glass sacred-border group-hover:-translate-y-0.5 group-hover:shadow-lg transition-all duration-300">
                    <div className="flex items-start gap-4">
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${config.gradient} flex items-center justify-center shadow-lg flex-shrink-0 group-hover:scale-110 transition-transform`}>
                        <Icon className="w-6 h-6 text-white" />
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3 mb-2">
                          {article.tags.length > 0 && (
                            <span className={`text-[10px] uppercase tracking-wider font-bold px-2 py-0.5 rounded-full bg-background/50 border ${config.borderColor} ${config.accentColor}`}>
                              {article.tags[0]}
                            </span>
                          )}
                          <div className="flex items-center gap-1 text-[11px] text-muted-foreground">
                            <Clock className="w-3 h-3" />
                            <span>{article.readingTime}</span>
                          </div>
                        </div>

                        <h3 className="font-cinzel font-bold text-lg text-foreground group-hover:text-gold-600 dark:group-hover:text-gold-400 transition-colors">
                          {article.title}
                        </h3>

                        <p className="text-muted-foreground text-sm mt-2 line-clamp-2">
                          {article.excerpt}
                        </p>
                      </div>

                      <ArrowRight className="w-5 h-5 text-gold-500 self-center opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 glass rounded-3xl sacred-border">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-muted flex items-center justify-center">
                <BookOpen className="w-8 h-8 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-cinzel font-bold text-foreground mb-2">{t("empty.title")}</h3>
              <p className="text-muted-foreground max-w-md mx-auto">
                {t("empty.desc")}
              </p>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
