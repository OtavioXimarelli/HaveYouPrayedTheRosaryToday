"use client";

import { useRouter } from "next/navigation";
import { PageHeader } from "@/components/page-header";
import { PageTransition } from "@/components/page-transition";
import { BreadcrumbNav } from "@/components/learning/breadcrumb-nav";
import { LockedContent } from "@/components/locked-content";
import { BookOpen, ArrowRight } from "lucide-react";

export default function TeologiaPage() {
  const router = useRouter();
  const isLoggedIn = false;

  const articles = [
    {
      id: "trindade",
      title: "A Santíssima Trindade",
      description: "Mistério central da fé cristã: Pai, Filho e Espírito Santo - uma só essência, três pessoas.",
      category: "Fundamentos",
      isLocked: false,
    },
    {
      id: "encarnacao",
      title: "A Encarnação do Verbo",
      description: "Jesus Cristo, verdadeiro Deus e verdadeiro Homem. O significado teológico da Encarnação.",
      category: "Cristologia",
      isLocked: !isLoggedIn,
    },
    {
      id: "salvacao",
      title: "Mistério da Salvação",
      description: "Redenção através de Cristo. Como compreendemos a salvação na fé católica.",
      category: "Soteriologia",
      isLocked: !isLoggedIn,
    },
    {
      id: "graça",
      title: "A Graça Divina",
      description: "O que é graça? Como a graça age em nossas vidas e nos transforma.",
      category: "Fundamentos",
      isLocked: !isLoggedIn,
    },
    {
      id: "maria-teologia",
      title: "Maria na Teologia Católica",
      description: "Dogmas marianos e o papel de Maria na história da salvação.",
      category: "Mariologia",
      isLocked: !isLoggedIn,
    },
  ];

  return (
    <PageTransition>
      <main className="min-h-screen bg-background">
        <PageHeader
          title="Teologia Católica"
          subtitle="Fundamentos da fé e doutrina da Igreja"
          icon="📚"
        />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <BreadcrumbNav
            items={[
              { label: "Ensinamentos", path: "/ensinamentos" },
              { label: "Teologia" },
            ]}
          />

          {/* Intro */}
          <section className="mb-12">
            <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-blue-500/10 to-blue-600/5 border border-blue-500/20">
              <p className="text-lg text-muted-foreground leading-relaxed">
                Explore os fundamentos da fé católica. Artigos que ajudam a entender melhor os mistérios, 
                dogmas e ensinamentos da Igreja Católica de forma acessível e profunda.
              </p>
            </div>
          </section>

          {/* Articles */}
          <section className="mb-12">
            <h2 className="text-2xl font-cinzel font-bold text-foreground mb-6">Artigos</h2>

            <div className="space-y-4">
              {articles.map((article) => (
                <div
                  key={article.id}
                  className={`group p-6 rounded-2xl transition-all duration-300 ${
                    article.isLocked
                      ? "glass opacity-70"
                      : "glass sacred-border hover:-translate-y-0.5 hover:shadow-lg cursor-pointer"
                  }`}
                  onClick={() => !article.isLocked && router.push(`/ensinamentos/teologia/${article.id}`)}
                  data-testid={`article-${article.id}`}
                >
                  <div className="flex items-start gap-4">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-lg flex-shrink-0 ${
                      article.isLocked ? "opacity-50" : ""
                    }`}>
                      <BookOpen className="w-6 h-6 text-white" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-600 dark:text-blue-400 font-semibold">
                          {article.category}
                        </span>
                        {article.isLocked && (
                          <span className="text-xs px-2 py-0.5 rounded-full bg-muted text-muted-foreground font-semibold">
                            Membros
                          </span>
                        )}
                      </div>

                      <h3 className={`font-cinzel font-bold text-lg ${
                        article.isLocked ? "text-muted-foreground" : "text-foreground group-hover:text-blue-600 dark:group-hover:text-blue-400"
                      } transition-colors`}>
                        {article.title}
                      </h3>

                      <p className="text-muted-foreground text-sm mt-2">{article.description}</p>
                    </div>

                    {!article.isLocked && (
                      <ArrowRight className="w-4 h-4 text-blue-500 flex-shrink-0 group-hover:translate-x-1 transition-transform" />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Member CTA */}
          {!isLoggedIn && (
            <LockedContent
              title="Acesse todos os artigos"
              description="Crie sua conta gratuita para ler artigos completos sobre teologia católica."
              featureList={[
                "Artigos detalhados sobre doutrina",
                "Explicações acessíveis de mistérios",
                "Referências em documentos da Igreja",
                "Reflexões para aprofundar a fé",
              ]}
            />
          )}
        </div>
      </main>
    </PageTransition>
  );
}
