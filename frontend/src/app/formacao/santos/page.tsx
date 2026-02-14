"use client";

import { useRouter } from "next/navigation";
import { PageHeader } from "@/components/page-header";
import { PageTransition } from "@/components/page-transition";
import { BreadcrumbNav } from "@/components/learning/breadcrumb-nav";
import { LockedContent } from "@/components/locked-content";
import { Button } from "@/components/ui/button";
import { Star, ArrowRight, Calendar, Book } from "lucide-react";

export default function SantosPage() {
  const router = useRouter();
  const isLoggedIn = false;

  const saints = [
    {
      id: "sao-domingos",
      name: "São Domingos de Gusmão",
      title: "Fundador do Rosário",
      period: "1170-1221",
      image: "✝️",
      description: "Recebeu o Rosário diretamente de Nossa Senhora",
      isLocked: false
    },
    {
      id: "sao-luis-montfort",
      name: "São Luís de Montfort",
      title: "Apóstolo de Maria",
      period: "1673-1716",
      image: "⛪",
      description: "Autor do 'Segredo do Rosário' e 'Tratado da Verdadeira Devoção'",
      isLocked: !isLoggedIn
    },
    {
      id: "padre-pio",
      name: "São Padre Pio",
      title: "Frade dos Estigmas",
      period: "1887-1968",
      image: "🙏",
      description: "Rezava até 40 terços por dia",
      isLocked: !isLoggedIn
    },
    {
      id: "joao-paulo-ii",
      name: "São João Paulo II",
      title: "Papa do Rosário",
      period: "1920-2005",
      image: "👑",
      description: "Introduziu os Mistérios Luminosos em 2002",
      isLocked: !isLoggedIn
    },
    {
      id: "santa-teresinha",
      name: "Santa Teresinha",
      title: "Doutora do Amor",
      period: "1873-1897",
      image: "🌹",
      description: "O Pequeno Caminho e a devoção a Maria",
      isLocked: !isLoggedIn
    }
  ];

  return (
    <PageTransition>
      <main className="min-h-screen bg-background">
        <PageHeader
          title="Santos do Rosário"
          subtitle="Vidas que inspiram nossa devoção"
          icon="⭐"
        />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <BreadcrumbNav 
            items={[
              { label: "Formação", path: "/formacao" },
              { label: "Santos" }
            ]} 
          />

          {/* Intro */}
          <section className="mb-12">
            <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-gold-500/10 to-gold-600/5 border border-gold-500/20">
              <p className="text-lg text-muted-foreground leading-relaxed">
                Ao longo dos séculos, santos de todas as épocas encontraram no Rosário uma fonte inesgotável de graça. 
                Conheça suas histórias e aprenda com seus <span className="text-gold-600 dark:text-gold-400 font-semibold">métodos de oração</span>.
              </p>
            </div>
          </section>

          {/* Saints Grid */}
          <section className="mb-12">
            <h2 className="text-2xl font-cinzel font-bold text-foreground mb-6">Grandes Devotos de Maria</h2>
            
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {saints.map((saint) => (
                <div
                  key={saint.id}
                  onClick={() => !saint.isLocked && router.push(`/formacao/santos/${saint.id}`)}
                  className={`group p-6 rounded-2xl transition-all duration-300 ${
                    saint.isLocked
                      ? "glass opacity-60 cursor-not-allowed"
                      : "glass sacred-border cursor-pointer hover:-translate-y-1 hover:shadow-gold-glow"
                  }`}
                  data-testid={`saint-${saint.id}`}
                >
                  <div className="text-center mb-4">
                    <div className={`w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br from-gold-500 to-gold-600 flex items-center justify-center text-4xl shadow-lg mb-4 ${
                      saint.isLocked ? "opacity-50" : "group-hover:scale-105 transition-transform"
                    }`}>
                      {saint.image}
                    </div>
                    
                    {saint.isLocked && (
                      <span className="text-xs px-2 py-0.5 rounded-full bg-muted text-muted-foreground font-semibold">
                        Requer login
                      </span>
                    )}
                  </div>

                  <h3 className={`font-cinzel font-bold text-lg text-center mb-1 ${
                    saint.isLocked ? "text-muted-foreground" : "text-foreground group-hover:text-gold-600 dark:group-hover:text-gold-400"
                  } transition-colors`}>
                    {saint.name}
                  </h3>
                  
                  <p className="text-gold-600 dark:text-gold-400 text-sm text-center font-medium mb-2">
                    {saint.title}
                  </p>
                  
                  <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground mb-3">
                    <Calendar className="w-3 h-3" />
                    <span>{saint.period}</span>
                  </div>
                  
                  <p className="text-muted-foreground text-sm text-center">
                    {saint.description}
                  </p>

                  {!saint.isLocked && (
                    <div className="mt-4 flex items-center justify-center gap-1 text-gold-600 dark:text-gold-400 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                      <span>Ler biografia</span>
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* CTA for locked content */}
          {!isLoggedIn && (
            <LockedContent
              title="Acesse todas as biografias"
              description="Crie sua conta gratuita para ler as histórias completas dos santos e aprender seus métodos de oração."
              featureList={[
                "Biografias completas ilustradas",
                "Métodos de oração de cada santo",
                "Citações e ensinamentos",
                "Orações compostas pelos santos"
              ]}
            />
          )}
        </div>
      </main>
    </PageTransition>
  );
}
