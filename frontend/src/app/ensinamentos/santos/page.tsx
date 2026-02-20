"use client";

import { useRouter } from "next/navigation";
import { PageHeader } from "@/components/page-header";
import { PageTransition } from "@/components/page-transition";
import { BreadcrumbNav } from "@/components/learning/breadcrumb-nav";
import { LockedContent } from "@/components/locked-content";
import { Users, Calendar, ArrowRight } from "lucide-react";
import { useAuth } from "@/providers/auth-provider";

export default function SantosPage() {
  const router = useRouter();
  const { isLoggedIn } = useAuth();

  const saints = [
    {
      id: "sao-domingos",
      name: "São Domingos de Gusmão",
      title: "Fundador da Ordem Dominicana",
      period: "1170-1221",
      description: "Recebeu o Rosário diretamente de Nossa Senhora e dedicou sua vida à pregação da fé.",
      topics: ["Rosário", "Oração", "Missionário"],
      isLocked: false,
    },
    {
      id: "sao-luis-montfort",
      name: "São Luís de Montfort",
      title: "Apóstolo de Maria",
      period: "1673-1716",
      description: "Autor do famoso 'Segredo do Rosário' e 'Tratado da Verdadeira Devoção'. Grande missionário mariano.",
      topics: ["Devoção Mariana", "Rosário", "Espiritualidade"],
      isLocked: !isLoggedIn,
    },
    {
      id: "padre-pio",
      name: "São Padre Pio",
      title: "Frade Capuchinho com Estigmas",
      period: "1887-1968",
      description: "Rezava até 40 terços por dia. Conhecido por milagres, confissão e vida de oração profunda.",
      topics: ["Oração", "Milagres", "Espiritualidade"],
      isLocked: !isLoggedIn,
    },
    {
      id: "joao-paulo-ii",
      name: "Santo Papa João Paulo II",
      title: "Papa do Rosário",
      period: "1920-2005",
      description: "Introduziu os Mistérios Luminosos em 2002. Devotíssimo de Maria e grande apóstolo do Rosário.",
      topics: ["Papa", "Rosário", "Devoção Mariana"],
      isLocked: !isLoggedIn,
    },
    {
      id: "santa-teresinha",
      name: "Santa Teresinha do Menino Jesus",
      title: "Doutora da Igreja",
      period: "1873-1897",
      description: "O Pequeno Caminho de confiança e amor. Carmelita que dedicou sua vida à oração pelo mundo.",
      topics: ["Contemplação", "Santidade", "Oração"],
      isLocked: !isLoggedIn,
    },
  ];

  return (
    <PageTransition>
      <main className="min-h-screen bg-background">
        <PageHeader
          title="Santos & Padres da Igreja"
          subtitle="Vidas inspiradoras de devoção a Maria"
          icon="⭐"
        />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <BreadcrumbNav
            items={[
              { label: "Ensinamentos", path: "/ensinamentos" },
              { label: "Santos" },
            ]}
          />

          {/* Intro */}
          <section className="mb-12">
            <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-emerald-500/10 to-emerald-600/5 border border-emerald-500/20">
              <p className="text-lg text-muted-foreground leading-relaxed">
                Ao longo dos séculos, santos de todas as épocas encontraram no Rosário e na devoção a Maria uma fonte inesgotável de graça. 
                Conheça suas histórias inspiradoras e aprenda com suas vidas dedicadas à fé.
              </p>
            </div>
          </section>

          {/* Saints Grid */}
          <section className="mb-12">
            <h2 className="text-2xl font-cinzel font-bold text-foreground mb-6">Grandes Devotos de Maria</h2>

            <div className="space-y-4">
              {saints.map((saint) => (
                <div
                  key={saint.id}
                  className={`group p-6 rounded-2xl transition-all duration-300 ${
                    saint.isLocked
                      ? "glass opacity-70"
                      : "glass sacred-border hover:-translate-y-0.5 hover:shadow-lg cursor-pointer"
                  }`}
                  onClick={() => !saint.isLocked && router.push(`/ensinamentos/santos/${saint.id}`)}
                  data-testid={`saint-${saint.id}`}
                >
                  <div className="flex items-start gap-4">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center shadow-lg flex-shrink-0 ${
                      saint.isLocked ? "opacity-50" : ""
                    }`}>
                      <Users className="w-6 h-6 text-white" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        {saint.isLocked && (
                          <span className="text-xs px-2 py-0.5 rounded-full bg-muted text-muted-foreground font-semibold">
                            Membros
                          </span>
                        )}
                      </div>

                      <h3 className={`font-cinzel font-bold text-lg ${
                        saint.isLocked ? "text-muted-foreground" : "text-foreground"
                      }`}>
                        {saint.name}
                      </h3>

                      <p className="text-gold-600 dark:text-gold-400 text-sm font-medium mb-1">{saint.title}</p>

                      <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
                        <Calendar className="w-3 h-3" />
                        <span>{saint.period}</span>
                      </div>

                      <p className="text-muted-foreground text-sm mb-3">{saint.description}</p>

                      <div className="flex flex-wrap gap-2">
                        {saint.topics.map((topic, i) => (
                          <span
                            key={i}
                            className="text-xs px-2 py-1 rounded-full bg-gold-500/10 text-gold-600 dark:text-gold-400 font-medium"
                          >
                            {topic}
                          </span>
                        ))}
                      </div>
                    </div>

                    {!saint.isLocked && (
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
              title="Leia as histórias completas"
              description="Crie sua conta gratuita para acessar biografias completas, ensinamentos e reflexões sobre a vida destes grandes santos."
              featureList={[
                "Biografias detalhadas de cada santo",
                "Seus ensinamentos sobre o Rosário",
                "Milagres e graças",
                "Aplicação prática em nossas vidas",
              ]}
            />
          )}
        </div>
      </main>
    </PageTransition>
  );
}
