"use client";

import { useRouter } from "next/navigation";
import { PageHeader } from "@/components/page-header";
import { PageTransition } from "@/components/page-transition";
import { BreadcrumbNav } from "@/components/learning/breadcrumb-nav";
import { LockedContent } from "@/components/locked-content";
import {
  Users,
  BookOpen,
  Scroll,
  Heart,
  Zap,
  Crown,
  Book,
  ArrowRight,
  Lock,
} from "lucide-react";
import { useAuth } from "@/providers/auth-provider";

export default function EnsinamentosPage() {
  const router = useRouter();
  const { isLoggedIn } = useAuth();

  const topics = [
    {
      id: "santos",
      title: "Santos & Padres da Igreja",
      description: "Vidas inspiradoras de santos que devotos de Maria. Aprendam seus ensinamentos e métodos de oração.",
      icon: Users,
      gradient: "from-emerald-500 to-emerald-600",
      bgGradient: "from-emerald-500/10 to-emerald-600/5",
      borderColor: "border-emerald-500/20",
      articles: 5,
      isSoon: false,
      isLocked: false,
      path: "/ensinamentos/santos",
      gridSpan: "sm:col-span-2 sm:row-span-2",
    },
    {
      id: "teologia",
      title: "Teologia Católica",
      description: "Fundamentos da fé: Trindade, encarnação, salvação e doutrina da Igreja.",
      icon: BookOpen,
      gradient: "from-blue-500 to-blue-600",
      bgGradient: "from-blue-500/10 to-blue-600/5",
      borderColor: "border-blue-500/20",
      articles: 0,
      isSoon: true,
      isLocked: !isLoggedIn,
      path: "/ensinamentos/teologia",
      gridSpan: "sm:col-span-1",
    },
    {
      id: "historia",
      title: "História da Igreja",
      description: "Dois mil anos de fé: dos apóstolos até hoje. Aparições, milagres e história da Igreja.",
      icon: Scroll,
      gradient: "from-purple-500 to-purple-600",
      bgGradient: "from-purple-500/10 to-purple-600/5",
      borderColor: "border-purple-500/20",
      articles: 0,
      isSoon: true,
      isLocked: !isLoggedIn,
      path: "/ensinamentos/historia",
      gridSpan: "sm:col-span-2",
    },
    {
      id: "oracoes",
      title: "Orações & Devoções",
      description: "Métodos tradicionais de oração: rosário, novenas, meditação contemplativa e mais.",
      icon: Heart,
      gradient: "from-rose-500 to-rose-600",
      bgGradient: "from-rose-500/10 to-rose-600/5",
      borderColor: "border-rose-500/20",
      articles: 0,
      isSoon: true,
      isLocked: !isLoggedIn,
      path: "/ensinamentos/oracoes",
      gridSpan: "sm:col-span-1",
    },
    {
      id: "sacramentos",
      title: "Os Sacramentos",
      description: "Entenda os 7 sacramentos: Batismo, Eucaristia, Penitência, Unção dos Enfermos e mais.",
      icon: Zap,
      gradient: "from-amber-500 to-amber-600",
      bgGradient: "from-amber-500/10 to-amber-600/5",
      borderColor: "border-amber-500/20",
      articles: 0,
      isSoon: true,
      isLocked: !isLoggedIn,
      path: "/ensinamentos/sacramentos",
      gridSpan: "sm:col-span-1",
    },
    {
      id: "maria",
      title: "Devoção Mariana",
      description: "O papel de Maria na salvação. Dogmas marianos e devoção à Mãe de Deus.",
      icon: Crown,
      gradient: "from-gold-500 to-gold-600",
      bgGradient: "from-gold-500/10 to-gold-600/5",
      borderColor: "border-gold-500/20",
      articles: 0,
      isSoon: true,
      isLocked: !isLoggedIn,
      path: "/ensinamentos/maria",
      gridSpan: "sm:col-span-1",
    },
    {
      id: "escritura",
      title: "Sagrada Escritura e o Rosário",
      description: "Descobrir a Bíblia através dos mistérios do Rosário. Conexões entre Testamentos e os mistérios.",
      icon: Book,
      gradient: "from-indigo-500 to-indigo-600",
      bgGradient: "from-indigo-500/10 to-indigo-600/5",
      borderColor: "border-indigo-500/20",
      articles: 0,
      isSoon: true,
      isLocked: !isLoggedIn,
      path: "/ensinamentos/escritura",
      gridSpan: "sm:col-span-3",
    },
  ];

  return (
    <PageTransition>
      <main className="min-h-screen bg-background">
        <PageHeader
          title="Ensinamentos da Santa Igreja"
          subtitle="Aprenda mais sobre a fé católica e os ensinamentos da Igreja"
          icon="✨"
        />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <BreadcrumbNav items={[{ label: "Ensinamentos" }]} />

          {/* Hero Section */}
          <section className="mb-12">
            <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-gold-500/5 to-gold-600/5 border border-gold-500/20">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-gold-500 to-gold-600 flex items-center justify-center shadow-lg">
                  <BookOpen className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h2 className="text-xl sm:text-2xl font-cinzel font-bold text-foreground">
                    Aprofunde Sua Fé
                  </h2>
                  <p className="text-gold-600 dark:text-gold-400 font-medium">
                    Conteúdos para membros
                  </p>
                </div>
              </div>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Explore artigos, ensinamentos e reflexões sobre a doutrina católica, história da Igreja, 
                vidas de santos e muito mais. Tudo pensado para aprofundar seu conhecimento e fé.
              </p>
            </div>
          </section>

          {/* Bento Grid */}
          <section className="mb-12">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 auto-rows-max">
              {topics.map((topic) => (
                <div
                  key={topic.id}
                  onClick={() => !topic.isLocked && router.push(topic.path)}
                  className={`group p-6 sm:p-8 rounded-3xl transition-all duration-300 ${topic.gridSpan} ${
                    topic.isLocked
                      ? "glass opacity-70 cursor-not-allowed"
                      : `bg-gradient-to-br ${topic.bgGradient} border ${topic.borderColor} cursor-pointer hover:-translate-y-2 hover:shadow-xl hover:shadow-gold-500/10`
                  }`}
                  data-testid={`topic-${topic.id}`}
                >
                  <div className="flex flex-col h-full">
                    <div className="flex items-start gap-4 mb-4">
                      <div
                        className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${topic.gradient} flex items-center justify-center shadow-lg flex-shrink-0 ${
                          topic.isLocked ? "opacity-50" : "group-hover:scale-110 transition-transform"
                        }`}
                      >
                        <topic.icon className="w-7 h-7 text-white" />
                      </div>
                      <div className="flex-1">
                        {topic.isLocked && (
                          <div className="flex items-center gap-1 mb-1">
                            <Lock className="w-3 h-3 text-muted-foreground" />
                            <span className="text-xs px-2 py-0.5 rounded-full bg-muted text-muted-foreground font-semibold">
                              Membros
                            </span>
                          </div>
                        )}
                        <h3
                          className={`font-cinzel font-bold text-lg sm:text-xl leading-tight ${
                            topic.isLocked ? "text-muted-foreground" : "text-foreground group-hover:text-gold-600 dark:group-hover:text-gold-400"
                          } transition-colors`}
                        >
                          {topic.title}
                        </h3>
                      </div>
                    </div>

                    <p className="text-muted-foreground text-sm leading-relaxed flex-grow mb-4">
                      {topic.description}
                    </p>

                    <div className="flex items-center justify-between pt-4 border-t border-gold-500/10">
                      <span className="text-xs font-semibold text-gold-600 dark:text-gold-400">
                        {topic.isSoon
                          ? "Em breve"
                          : `${topic.articles} ${topic.articles === 1 ? "artigo" : "artigos"}`}
                      </span>
                      {!topic.isLocked && !topic.isSoon && (
                        <span className="flex items-center gap-1 text-gold-600 dark:text-gold-400 text-sm font-medium group-hover:gap-2 transition-all">
                          Explorar
                          <ArrowRight className="w-4 h-4" />
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Member CTA */}
          {!isLoggedIn && (
            <LockedContent
              title="Acesse todos os ensinamentos"
              description="Crie sua conta gratuita para explorar artigos completos sobre doutrina católica, vidas de santos, história da Igreja e muito mais."
              featureList={[
                "Artigos detalhados sobre teologia católica",
                "Biografias de santos e padres da Igreja",
                "Ensinos sobre os sacramentos",
                "Conexões entre a Bíblia e o Rosário",
                "Devoções e práticas espirituais",
              ]}
            />
          )}
        </div>
      </main>
    </PageTransition>
  );
}
