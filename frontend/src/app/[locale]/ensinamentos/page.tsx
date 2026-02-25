import { PageHeader } from "@/components/page-header";
import { PageTransition } from "@/components/page-transition";
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
} from "lucide-react";
import { Link } from "@/i18n/routing";
import { getArticlesByTema } from "@/lib/content";
import { getTranslations } from "next-intl/server";

interface Props {
  params: Promise<{ locale: string }>;
}

export default async function EnsinamentosPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Teachings" });
  const commonT = await getTranslations({ locale, namespace: "Common" });
  
  const topics = [
    {
      id: "santos",
      title: t("topics.santos.title"),
      description: t("topics.santos.desc"),
      icon: Users,
      gradient: "from-emerald-500 to-emerald-600",
      bgGradient: "from-emerald-500/10 to-emerald-600/5",
      borderColor: "border-emerald-500/20",
      path: "/ensinamentos/santos",
      gridSpan: "sm:col-span-2 sm:row-span-2",
    },
    {
      id: "teologia",
      title: t("topics.teologia.title"),
      description: t("topics.teologia.desc"),
      icon: BookOpen,
      gradient: "from-blue-500 to-blue-600",
      bgGradient: "from-blue-500/10 to-blue-600/5",
      borderColor: "border-blue-500/20",
      path: "/ensinamentos/teologia",
      gridSpan: "sm:col-span-1",
    },
    {
      id: "historia",
      title: t("topics.historia.title"),
      description: t("topics.historia.desc"),
      icon: Scroll,
      gradient: "from-purple-500 to-purple-600",
      bgGradient: "from-purple-500/10 to-purple-600/5",
      borderColor: "border-purple-500/20",
      path: "/ensinamentos/historia",
      gridSpan: "sm:col-span-2",
    },
    {
      id: "oracoes",
      title: t("topics.oracoes.title"),
      description: t("topics.oracoes.desc"),
      icon: Heart,
      gradient: "from-rose-500 to-rose-600",
      bgGradient: "from-rose-500/10 to-rose-600/5",
      borderColor: "border-rose-500/20",
      path: "/ensinamentos/oracoes",
      gridSpan: "sm:col-span-1",
    },
    {
      id: "sacramentos",
      title: t("topics.sacramentos.title"),
      description: t("topics.sacramentos.desc"),
      icon: Zap,
      gradient: "from-amber-500 to-amber-600",
      bgGradient: "from-amber-500/10 to-amber-600/5",
      borderColor: "border-amber-500/20",
      path: "/ensinamentos/sacramentos",
      gridSpan: "sm:col-span-1",
    },
    {
      id: "maria",
      title: t("topics.maria.title"),
      description: t("topics.maria.desc"),
      icon: Crown,
      gradient: "from-gold-500 to-gold-600",
      bgGradient: "from-gold-500/10 to-gold-600/5",
      borderColor: "border-gold-500/20",
      path: "/ensinamentos/maria",
      gridSpan: "sm:col-span-1",
    },
    {
      id: "escritura",
      title: t("topics.escritura.title"),
      description: t("topics.escritura.desc"),
      icon: Book,
      gradient: "from-indigo-500 to-indigo-600",
      bgGradient: "from-indigo-500/10 to-indigo-600/5",
      borderColor: "border-indigo-500/20",
      path: "/ensinamentos/escritura",
      gridSpan: "sm:col-span-3",
    },
  ];

  const topicsWithCounts = topics.map(topic => ({
    ...topic,
    articles: getArticlesByTema(topic.id, locale).length
  }));

  return (
    <PageTransition>
      <main className="min-h-screen bg-background">
        <PageHeader
          title={t("title")}
          subtitle={t("subtitle")}
          icon="✨"
        />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <BreadcrumbNav items={[{ label: t("breadcrumb") }]} />

          {/* Hero Section */}
          <section className="mb-12">
            <div className="p-6 sm:p-8 rounded-3xl glass border-gold-500/20 bg-gradient-to-br from-gold-500/5 to-transparent">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-gold-500 to-gold-600 flex items-center justify-center shadow-lg">
                  <BookOpen className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h2 className="text-xl sm:text-2xl font-cinzel font-bold text-foreground">
                    {t("hero.title")}
                  </h2>
                  <p className="text-gold-600 dark:text-gold-400 font-medium uppercase tracking-wider text-sm">
                    {t("hero.label")}
                  </p>
                </div>
              </div>
              <p className="text-lg text-muted-foreground leading-relaxed">
                {t("hero.desc")}
              </p>
            </div>
          </section>

          {/* Bento Grid */}
          <section className="mb-12">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 auto-rows-max">
              {topicsWithCounts.map((topic) => (
                <Link
                  key={topic.id}
                  href={topic.path as any}
                  className={`group p-6 sm:p-8 rounded-3xl transition-all duration-300 ${topic.gridSpan} bg-gradient-to-br ${topic.bgGradient} border ${topic.borderColor} cursor-pointer hover:-translate-y-2 hover:shadow-xl hover:shadow-gold-500/10`}
                >
                  <div className="flex flex-col h-full">
                    <div className="flex items-start gap-4 mb-4">
                      <div
                        className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${topic.gradient} flex items-center justify-center shadow-lg flex-shrink-0 group-hover:scale-110 transition-transform`}
                      >
                        <topic.icon className="w-7 h-7 text-white" />
                      </div>
                      <div className="flex-1">
                        {topic.articles === 0 && (
                          <span className="text-[10px] px-2 py-0.5 rounded-full bg-gold-500/20 text-gold-600 dark:text-gold-400 font-bold uppercase tracking-widest inline-block mb-1">
                            {commonT("soon")}
                          </span>
                        )}
                        <h3
                          className="font-cinzel font-bold text-lg sm:text-xl leading-tight text-foreground group-hover:text-gold-600 dark:group-hover:text-gold-400 transition-colors"
                        >
                          {topic.title}
                        </h3>
                      </div>
                    </div>

                    <p className="text-muted-foreground text-sm leading-relaxed flex-grow mb-4">
                      {topic.description}
                    </p>

                    <div className="flex items-center justify-between pt-4 border-t border-gold-500/10">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-gold-600 dark:text-gold-400">
                        {topic.articles === 0
                          ? commonT("soon")
                          : `${topic.articles} ${topic.articles === 1 ? t("article") : t("articles")}`}
                      </span>
                      <span className="flex items-center gap-1 text-gold-600 dark:text-gold-400 text-sm font-bold uppercase tracking-widest group-hover:gap-2 transition-all">
                        {commonT("explore")}
                        <ArrowRight className="w-4 h-4" />
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        </div>
      </main>
    </PageTransition>
  );
}
