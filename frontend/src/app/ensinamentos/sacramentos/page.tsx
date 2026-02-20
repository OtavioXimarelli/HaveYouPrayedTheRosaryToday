"use client";

import { useRouter } from "next/navigation";
import { PageHeader } from "@/components/page-header";
import { PageTransition } from "@/components/page-transition";
import { BreadcrumbNav } from "@/components/learning/breadcrumb-nav";
import { LockedContent } from "@/components/locked-content";
import { Zap, ArrowRight } from "lucide-react";
import { useAuth } from "@/providers/auth-provider";

export default function SacramentosPage() {
  const router = useRouter();
  const { isLoggedIn } = useAuth();

  const sacraments = [
    {
      id: "batismo",
      title: "Batismo",
      description: "A porta de entrada na Igreja. Renascimento espiritual e purificação do pecado original.",
      effect: "Graça santificante",
      isLocked: false,
    },
    {
      id: "confirmacao",
      title: "Confirmação",
      description: "Fortalecimento da fé recebida no Batismo. Efusão do Espírito Santo na vida adulta.",
      effect: "Força do Espírito Santo",
      isLocked: !isLoggedIn,
    },
    {
      id: "eucaristia",
      title: "Eucaristia",
      description: "O Corpo e Sangue de Cristo. Alimento espiritual e sacrifício renovado.",
      effect: "Comunhão com Cristo",
      isLocked: !isLoggedIn,
    },
    {
      id: "penitencia",
      title: "Penitência (Confissão)",
      description: "Reconciliação com Deus. Perdão dos pecados e restauração da graça.",
      effect: "Perdão e paz",
      isLocked: !isLoggedIn,
    },
    {
      id: "unccao-enfermos",
      title: "Unção dos Enfermos",
      description: "Conforto e graça para quem sofre. Preparação para o encontro com Deus.",
      effect: "Consolo e cura espiritual",
      isLocked: !isLoggedIn,
    },
    {
      id: "ordem",
      title: "Ordem (Ordenação)",
      description: "Consagração ao serviço de Deus. Ordenação de bispos, padres e diáconos.",
      effect: "Graça sacramental para ministério",
      isLocked: !isLoggedIn,
    },
    {
      id: "matrimonio",
      title: "Matrimônio",
      description: "Consagração do amor. União de homem e mulher sob a bênção de Deus.",
      effect: "Graça para santificação da família",
      isLocked: !isLoggedIn,
    },
  ];

  return (
    <PageTransition>
      <main className="min-h-screen bg-background">
        <PageHeader
          title="Os Sete Sacramentos"
          subtitle="Sinais sensíveis de graça invisível"
          icon="⚡"
        />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <BreadcrumbNav
            items={[
              { label: "Ensinamentos", path: "/ensinamentos" },
              { label: "Sacramentos" },
            ]}
          />

          {/* Intro */}
          <section className="mb-12">
            <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-amber-500/10 to-amber-600/5 border border-amber-500/20">
              <p className="text-lg text-muted-foreground leading-relaxed">
                Os sete sacramentos são sinais visíveis de graça invisível. Através deles, Deus age em nossas vidas, 
                santificando-nos e nos aproximando de Cristo.
              </p>
            </div>
          </section>

          {/* Sacraments */}
          <section className="mb-12">
            <h2 className="text-2xl font-cinzel font-bold text-foreground mb-6">Os Sete Sacramentos da Igreja</h2>

            <div className="space-y-4">
              {sacraments.map((sacrament) => (
                <div
                  key={sacrament.id}
                  className={`group p-6 rounded-2xl transition-all duration-300 ${
                    sacrament.isLocked
                      ? "glass opacity-70"
                      : "glass sacred-border hover:-translate-y-0.5 hover:shadow-lg cursor-pointer"
                  }`}
                  onClick={() => !sacrament.isLocked && router.push(`/ensinamentos/sacramentos/${sacrament.id}`)}
                  data-testid={`sacrament-${sacrament.id}`}
                >
                  <div className="flex items-start gap-4">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center shadow-lg flex-shrink-0 ${
                      sacrament.isLocked ? "opacity-50" : ""
                    }`}>
                      <Zap className="w-6 h-6 text-white" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        {sacrament.isLocked && (
                          <span className="text-xs px-2 py-0.5 rounded-full bg-muted text-muted-foreground font-semibold">
                            Membros
                          </span>
                        )}
                      </div>

                      <h3 className={`font-cinzel font-bold text-lg ${
                        sacrament.isLocked ? "text-muted-foreground" : "text-foreground group-hover:text-amber-600 dark:group-hover:text-amber-400"
                      } transition-colors`}>
                        {sacrament.title}
                      </h3>

                      <p className="text-muted-foreground text-sm mt-2">{sacrament.description}</p>
                      
                      <p className="text-amber-600 dark:text-amber-400 text-xs font-semibold mt-3">
                        ✨ {sacrament.effect}
                      </p>
                    </div>

                    {!sacrament.isLocked && (
                      <ArrowRight className="w-4 h-4 text-amber-500 flex-shrink-0 group-hover:translate-x-1 transition-transform" />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Member CTA */}
          {!isLoggedIn && (
            <LockedContent
              title="Aprofunde sua compreensão dos sacramentos"
              description="Crie sua conta gratuita para ler artigos detalhados sobre cada sacramento."
              featureList={[
                "Explicação teológica de cada sacramento",
                "Significado espiritual e efeitos",
                "Ensinamentos dos papas",
                "Como melhor participar dos sacramentos",
              ]}
            />
          )}
        </div>
      </main>
    </PageTransition>
  );
}
