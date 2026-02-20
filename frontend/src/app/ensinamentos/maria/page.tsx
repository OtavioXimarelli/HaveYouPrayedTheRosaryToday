"use client";

import { useRouter } from "next/navigation";
import { PageHeader } from "@/components/page-header";
import { PageTransition } from "@/components/page-transition";
import { BreadcrumbNav } from "@/components/learning/breadcrumb-nav";
import { LockedContent } from "@/components/locked-content";
import { Crown, ArrowRight } from "lucide-react";
import { useAuth } from "@/providers/auth-provider";

export default function MariaPage() {
  const router = useRouter();
  const { isLoggedIn } = useAuth();

  const topics = [
    {
      id: "maria-na-biblia",
      title: "Maria nas Sagradas Escrituras",
      description: "Estudo bíblico sobre Maria desde o Antigo Testamento até o Novo.",
      articles: 5,
      isLocked: false,
    },
    {
      id: "maternidade-espiritual",
      title: "A Maternidade Espiritual de Maria",
      description: "Maria, mãe de todos os cristãos. Sua intercessão e cuidado por nós.",
      articles: 4,
      isLocked: !isLoggedIn,
    },
    {
      id: "dogmas-marianos",
      title: "Os Dogmas Marianos",
      description: "Imaculada Conceição, Assunção, Maternidade Divina e Virgindade Perpétua.",
      articles: 5,
      isLocked: !isLoggedIn,
    },
    {
      id: "aparicoes",
      title: "Aparições de Nossa Senhora",
      description: "Fatima, Lourdes, Guadalupe e outras aparições aprovadas pela Igreja.",
      articles: 8,
      isLocked: !isLoggedIn,
    },
    {
      id: "devoção-pratica",
      title: "Práticas Devocionais",
      description: "Como venerar Maria: Rosário, escapulário, consagração e outras formas de devoção.",
      articles: 6,
      isLocked: !isLoggedIn,
    },
    {
      id: "consagracao",
      title: "Consagração Total a Maria",
      description: "A jornada espiritual de se consagrar completamente a Maria e a Jesus.",
      articles: 7,
      isLocked: !isLoggedIn,
    },
  ];

  return (
    <PageTransition>
      <main className="min-h-screen bg-background">
        <PageHeader
          title="Devoção Mariana"
          subtitle="Maria, Mãe de Deus e Mãe Nossa"
          icon="👑"
        />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <BreadcrumbNav
            items={[
              { label: "Ensinamentos", path: "/ensinamentos" },
              { label: "Devoção Mariana" },
            ]}
          />

          {/* Intro */}
          <section className="mb-12">
            <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-gold-500/10 to-gold-600/5 border border-gold-500/20">
              <p className="text-lg text-muted-foreground leading-relaxed">
                Maria ocupa um lugar especial na fé católica. Mãe de Jesus e nossa mãe espiritual, 
                ela nos conduz a Cristo. Aprofunde sua compreensão e devoção a Maria.
              </p>
            </div>
          </section>

          {/* Topics */}
          <section className="mb-12">
            <h2 className="text-2xl font-cinzel font-bold text-foreground mb-6">Temas Marianos</h2>

            <div className="space-y-4">
              {topics.map((topic) => (
                <div
                  key={topic.id}
                  className={`group p-6 rounded-2xl transition-all duration-300 ${
                    topic.isLocked
                      ? "glass opacity-70"
                      : "glass sacred-border hover:-translate-y-0.5 hover:shadow-lg cursor-pointer"
                  }`}
                  onClick={() => !topic.isLocked && router.push(`/ensinamentos/maria/${topic.id}`)}
                  data-testid={`topic-${topic.id}`}
                >
                  <div className="flex items-start gap-4">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br from-gold-500 to-gold-600 flex items-center justify-center shadow-lg flex-shrink-0 ${
                      topic.isLocked ? "opacity-50" : ""
                    }`}>
                      <Crown className="w-6 h-6 text-white" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        {topic.isLocked && (
                          <span className="text-xs px-2 py-0.5 rounded-full bg-muted text-muted-foreground font-semibold">
                            Membros
                          </span>
                        )}
                      </div>

                      <h3 className={`font-cinzel font-bold text-lg ${
                        topic.isLocked ? "text-muted-foreground" : "text-foreground group-hover:text-gold-600 dark:group-hover:text-gold-400"
                      } transition-colors`}>
                        {topic.title}
                      </h3>

                      <p className="text-muted-foreground text-sm mt-2">{topic.description}</p>
                      
                      <p className="text-gold-600 dark:text-gold-400 text-xs font-semibold mt-3">
                        {topic.articles} artigos
                      </p>
                    </div>

                    {!topic.isLocked && (
                      <ArrowRight className="w-4 h-4 text-gold-500 flex-shrink-0 group-hover:translate-x-1 transition-transform" />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Member CTA */}
          {!isLoggedIn && (
            <LockedContent
              title="Aprofunde sua devoção mariana"
              description="Crie sua conta gratuita para acessar conteúdo completo sobre Maria na fé católica."
              featureList={[
                "Estudo bíblico sobre Maria",
                "Os dogmas marianos explicados",
                "História das aparições",
                "Guias de consagração a Maria",
              ]}
            />
          )}
        </div>
      </main>
    </PageTransition>
  );
}
