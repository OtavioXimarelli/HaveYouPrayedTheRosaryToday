"use client";

import { useRouter } from "next/navigation";
import { PageHeader } from "@/components/page-header";
import { PageTransition } from "@/components/page-transition";
import { BreadcrumbNav } from "@/components/learning/breadcrumb-nav";
import { BookOpen, ArrowRight } from "lucide-react";
import { AUTH_DISABLED } from "@/providers/auth-provider";

export default function EscrituraPage() {
  const router = useRouter();
  const LOCKED = AUTH_DISABLED ? false : true;

  const articles = [
    {
      id: "anunciacao",
      title: "A Anunciação - Lc 1:26-38",
      description: "O anjo Gabriel anuncia a Maria que será mãe de Jesus. Fundamento do Rosário.",
      mystery: "Mistério Luminoso",
      isLocked: false,
    },
    {
      id: "visitacao",
      title: "A Visitação - Lc 1:39-56",
      description: "Maria visita Isabel. A primeira pregação do evangelho a um bebê.",
      mystery: "Mistério Gozoso",
      isLocked: LOCKED,
    },
    {
      id: "encarnacao",
      title: "A Encarnação - Jo 1:1-14",
      description: "O Verbo se fez carne. Mistério central da fé cristã.",
      mystery: "Fundamento",
      isLocked: LOCKED,
    },
    {
      id: "matrimonio-caná",
      title: "Casamento de Caná - Jo 2:1-11",
      description: "Primeiro milagre de Jesus, realizado por intercessão de Maria.",
      mystery: "Mistério Luminoso",
      isLocked: LOCKED,
    },
    {
      id: "ressurreicao",
      title: "A Ressurreição de Cristo - 1Co 15:1-28",
      description: "Coração da fé cristã. Maria contempla a vitória do Filho.",
      mystery: "Mistério Glorioso",
      isLocked: LOCKED,
    },
    {
      id: "pentecostes",
      title: "Pentecostes - At 2:1-4",
      description: "Maria permanecia no Cenáculo orando com os apóstolos.",
      mystery: "Mistério Glorioso",
      isLocked: LOCKED,
    },
    {
      id: "assuncao",
      title: "A Assunção de Maria - Ap 12:1-17",
      description: "A mulher vestida de sol. Interpretação bíblica da Assunção.",
      mystery: "Mistério Glorioso",
      isLocked: LOCKED,
    },
    {
      id: "paixao",
      title: "A Paixão de Cristo - Mt 26-27",
      description: "Maria ao pé da cruz. Sua compaixão e maternidade espiritual.",
      mystery: "Mistério Doloroso",
      isLocked: LOCKED,
    },
  ];

  return (
    <PageTransition>
      <main className="min-h-screen bg-background">
        <PageHeader
          title="Sagrada Escritura e o Rosário"
          subtitle="Descubra a Bíblia através dos mistérios"
          icon="📖"
        />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <BreadcrumbNav
            items={[
              { label: "Ensinamentos", path: "/ensinamentos" },
              { label: "Sagrada Escritura" },
            ]}
          />

          {/* Intro */}
          <section className="mb-12">
            <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-indigo-500/10 to-indigo-600/5 border border-indigo-500/20">
              <p className="text-lg text-muted-foreground leading-relaxed">
                O Rosário é uma jornada pela Bíblia. Cada mistério corresponde a passagens das Sagradas Escrituras 
                que nos ajudam a contemplar a vida de Cristo e o papel de Maria em nossa salvação.
              </p>
            </div>
          </section>

          {/* Articles */}
          <section className="mb-12">
            <h2 className="text-2xl font-cinzel font-bold text-foreground mb-6">Artigos Bíblicos</h2>

            <div className="space-y-4">
              {articles.map((article) => (
                <div
                  key={article.id}
                  className={`group p-6 rounded-2xl transition-all duration-300 ${
                    article.isLocked
                      ? "glass opacity-70"
                      : "glass sacred-border hover:-translate-y-0.5 hover:shadow-lg cursor-pointer"
                  }`}
                  onClick={() => !article.isLocked && router.push(`/ensinamentos/escritura/${article.id}`)}
                  data-testid={`article-${article.id}`}
                >
                  <div className="flex items-start gap-4">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-indigo-600 flex items-center justify-center shadow-lg flex-shrink-0 ${
                      article.isLocked ? "opacity-50" : ""
                    }`}>
                      <BookOpen className="w-6 h-6 text-white" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-600 dark:text-indigo-400 font-semibold">
                          {article.mystery}
                        </span>
                        {article.isLocked && (
                          <span className="text-xs px-2 py-0.5 rounded-full bg-muted text-muted-foreground font-semibold">
                            Membros
                          </span>
                        )}
                      </div>

                      <h3 className={`font-cinzel font-bold text-lg ${
                        article.isLocked ? "text-muted-foreground" : "text-foreground group-hover:text-indigo-600 dark:group-hover:text-indigo-400"
                      } transition-colors`}>
                        {article.title}
                      </h3>

                      <p className="text-muted-foreground text-sm mt-2">{article.description}</p>
                    </div>

                    {!article.isLocked && (
                      <ArrowRight className="w-4 h-4 text-indigo-500 flex-shrink-0 group-hover:translate-x-1 transition-transform" />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Member CTA */}
        </div>
      </main>
    </PageTransition>
  );
}
