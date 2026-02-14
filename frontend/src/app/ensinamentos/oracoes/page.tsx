"use client";

import { useRouter } from "next/navigation";
import { PageHeader } from "@/components/page-header";
import { PageTransition } from "@/components/page-transition";
import { BreadcrumbNav } from "@/components/learning/breadcrumb-nav";
import { LockedContent } from "@/components/locked-content";
import { Heart, ArrowRight } from "lucide-react";

export default function OracoesPage() {
  const router = useRouter();
  const isLoggedIn = false;

  const methods = [
    {
      id: "rosario-basico",
      title: "Como Rezar o Rosário",
      description: "Guia passo a passo para rezar o Rosário completo. Para iniciantes e aprofundamento.",
      type: "Guia",
      isLocked: false,
    },
    {
      id: "contemplacao",
      title: "Oração Contemplativa",
      description: "Aprender a meditar nos mistérios. Técnicas de contemplação ensinadas pelos santos.",
      type: "Método",
      isLocked: !isLoggedIn,
    },
    {
      id: "novenas",
      title: "Novenas",
      description: "Orações estruturadas em 9 dias. Novenas a Jesus, Maria, santos e para intenções especiais.",
      type: "Prática",
      isLocked: !isLoggedIn,
    },
    {
      id: "litanias",
      title: "Ladainhas (Litanias)",
      description: "Litania de Loreto, do Sagrado Coração e outras. Oração comunitária tradicional.",
      type: "Oração",
      isLocked: !isLoggedIn,
    },
    {
      id: "oracoes-tradicionais",
      title: "Orações Tradicionais",
      description: "Ave-Maria, Pai-Nosso, Gloria, Salve Rainha e outras orações essenciais do católico.",
      type: "Oração",
      isLocked: !isLoggedIn,
    },
    {
      id: "meditacao",
      title: "Meditação e Lectio Divina",
      description: "Método tradicional de meditar a Palavra de Deus. Aproximar-se de Jesus através da Bíblia.",
      type: "Método",
      isLocked: !isLoggedIn,
    },
  ];

  return (
    <PageTransition>
      <main className="min-h-screen bg-background">
        <PageHeader
          title="Orações & Devoções"
          subtitle="Métodos tradicionais de se aproximar de Deus"
          icon="🙏"
        />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <BreadcrumbNav
            items={[
              { label: "Ensinamentos", path: "/ensinamentos" },
              { label: "Orações" },
            ]}
          />

          {/* Intro */}
          <section className="mb-12">
            <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-rose-500/10 to-rose-600/5 border border-rose-500/20">
              <p className="text-lg text-muted-foreground leading-relaxed">
                Explore diferentes métodos de oração e devoção. Da Rosário ao Lectio Divina, 
                técnicas ensinadas pelos santos para aprofundar a relação com Deus.
              </p>
            </div>
          </section>

          {/* Methods */}
          <section className="mb-12">
            <h2 className="text-2xl font-cinzel font-bold text-foreground mb-6">Práticas de Oração</h2>

            <div className="space-y-4">
              {methods.map((method) => (
                <div
                  key={method.id}
                  className={`group p-6 rounded-2xl transition-all duration-300 ${
                    method.isLocked
                      ? "glass opacity-70"
                      : "glass sacred-border hover:-translate-y-0.5 hover:shadow-lg cursor-pointer"
                  }`}
                  onClick={() => !method.isLocked && router.push(`/ensinamentos/oracoes/${method.id}`)}
                  data-testid={`method-${method.id}`}
                >
                  <div className="flex items-start gap-4">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br from-rose-500 to-rose-600 flex items-center justify-center shadow-lg flex-shrink-0 ${
                      method.isLocked ? "opacity-50" : ""
                    }`}>
                      <Heart className="w-6 h-6 text-white" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-600 dark:text-rose-400 font-semibold">
                          {method.type}
                        </span>
                        {method.isLocked && (
                          <span className="text-xs px-2 py-0.5 rounded-full bg-muted text-muted-foreground font-semibold">
                            Membros
                          </span>
                        )}
                      </div>

                      <h3 className={`font-cinzel font-bold text-lg ${
                        method.isLocked ? "text-muted-foreground" : "text-foreground group-hover:text-rose-600 dark:group-hover:text-rose-400"
                      } transition-colors`}>
                        {method.title}
                      </h3>

                      <p className="text-muted-foreground text-sm mt-2">{method.description}</p>
                    </div>

                    {!method.isLocked && (
                      <ArrowRight className="w-4 h-4 text-rose-500 flex-shrink-0 group-hover:translate-x-1 transition-transform" />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Member CTA */}
          {!isLoggedIn && (
            <LockedContent
              title="Acesse todos os métodos"
              description="Crie sua conta gratuita para aprender diferentes práticas de oração e devoção."
              featureList={[
                "Guias completos de oração",
                "Orações tradicionais em português",
                "Técnicas de meditação",
                "Novenas e litanias",
              ]}
            />
          )}
        </div>
      </main>
    </PageTransition>
  );
}
