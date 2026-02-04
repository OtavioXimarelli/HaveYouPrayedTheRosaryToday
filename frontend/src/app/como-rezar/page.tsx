"use client";

import { Button } from "@/components/ui/button";
import { Check, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { PageHeader } from "@/components/page-header";

export default function ComoRezarPage() {
  const router = useRouter();

  const steps = [
    {
      number: 1,
      title: "Comece pelo Sinal da Cruz",
      description: "Segure o crucifixo e faça o sinal da cruz enquanto reza:",
      prayer: "\"Pelo sinal da Santa Cruz, livrai-nos, Deus Nosso Senhor, dos nossos inimigos. Em nome do Pai, do Filho e do Espírito Santo. Amém.\"",
      highlight: false
    },
    {
      number: 2,
      title: "Reze o Credo",
      description: "Ainda no crucifixo, reze o Credo Apostólico completo.",
      hasLink: true,
      linkText: "Ver texto completo do Credo",
      linkPath: "/oracoes-tradicionais",
      highlight: true
    },
    {
      number: 3,
      title: "Pai Nosso (1x)",
      description: "Na primeira conta grande após o crucifixo, reze um Pai Nosso.",
      highlight: false
    },
    {
      number: 4,
      title: "Ave Maria (3x)",
      description: "Nas três contas seguintes, reze três Ave Marias:",
      list: ["Pela fé", "Pela esperança", "Pela caridade"],
      highlight: true
    },
    {
      number: 5,
      title: "Glória ao Pai",
      description: "Reze o Glória ao Pai:",
      prayer: "\"Glória ao Pai, ao Filho e ao Espírito Santo. Como era no princípio, agora e sempre. Amém.\"",
      highlight: false
    },
    {
      number: 6,
      title: "Anuncie o Primeiro Mistério",
      description: "Anuncie o primeiro mistério do dia e medite sobre ele enquanto reza.",
      hasLink: true,
      linkText: "Ver mistérios de cada dia",
      linkPath: "/misterios-do-dia",
      highlight: true
    },
    {
      number: 7,
      title: "Reze uma Dezena",
      description: "Para cada mistério, reze:",
      detailedList: [
        { count: "1x", text: "Pai Nosso (na conta grande)" },
        { count: "10x", text: "Ave Maria (nas 10 contas pequenas)" },
        { count: "1x", text: "Glória ao Pai" },
        { count: "1x", text: "Ó meu Jesus (oração de Fátima)" }
      ],
      highlight: false
    },
    {
      number: 8,
      title: "Repita para os 5 Mistérios",
      description: "Repita os passos 6 e 7 para cada um dos cinco mistérios do dia (total de 5 dezenas).",
      highlight: true
    },
    {
      number: 9,
      title: "Finalize com Salve Rainha",
      description: "Após os cinco mistérios, reze a Salve Rainha:",
      prayer: "\"Salve, Rainha, Mãe de misericórdia, vida, doçura e esperança nossa, salve!...\"",
      highlight: false
    },
    {
      number: 10,
      title: "Encerre com o Sinal da Cruz",
      description: "Faça o sinal da cruz para encerrar sua oração do terço.",
      highlight: true
    }
  ];

  return (
    <main className="min-h-screen bg-background">
      <PageHeader 
        title="Como Rezar o Terço"
        subtitle="Guia passo a passo para rezar o Santo Rosário"
        icon="📖"
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        {/* Introduction Card */}
        <section className="mb-12">
          <div className="p-6 sm:p-8 rounded-3xl glass sacred-border">
            <h2 className="text-2xl sm:text-3xl font-cinzel font-bold text-foreground mb-6">
              O que você precisa
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                "Um terço (rosário) ou os dedos para contar",
                "15-20 minutos de tempo tranquilo",
                "Um lugar calmo para meditar",
                "Coração aberto para a oração"
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-gradient-to-br from-gold-500 to-gold-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="w-4 h-4 text-white" strokeWidth={3} />
                  </div>
                  <span className="text-foreground">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Steps */}
        <section>
          <h2 className="text-2xl sm:text-3xl font-cinzel font-bold text-foreground mb-8">
            Passo a Passo
          </h2>

          <div className="space-y-6">
            {steps.map((step) => (
              <div 
                key={step.number}
                className={`p-6 sm:p-8 rounded-2xl transition-all duration-300 hover:-translate-y-0.5 ${
                  step.highlight 
                    ? "bg-gradient-to-br from-gold-500/10 to-gold-600/5 dark:from-gold-500/15 dark:to-gold-600/10 border border-gold-500/20" 
                    : "glass sacred-border"
                }`}
                data-testid={`step-${step.number}`}
              >
                <div className="flex gap-4 sm:gap-5 items-start">
                  <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-xl flex items-center justify-center font-cinzel font-bold text-xl flex-shrink-0 shadow-lg ${
                    step.highlight 
                      ? "bg-gradient-to-br from-gold-500 to-gold-600 text-white"
                      : "bg-gradient-to-br from-sacred-blue to-slate-700 text-gold-400"
                  }`}>
                    {step.number}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl sm:text-2xl font-cinzel font-bold text-foreground mb-2">
                      {step.title}
                    </h3>
                    <p className="text-muted-foreground mb-3">
                      {step.description}
                    </p>
                    
                    {step.prayer && (
                      <div className="p-4 rounded-xl bg-card border border-border italic text-foreground">
                        {step.prayer}
                      </div>
                    )}
                    
                    {step.list && (
                      <ul className="space-y-2 mt-3">
                        {step.list.map((item, i) => (
                          <li key={i} className="flex items-center gap-2 text-foreground">
                            <div className="w-2 h-2 rounded-full bg-gold-500" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                    
                    {step.detailedList && (
                      <ul className="space-y-2 mt-3">
                        {step.detailedList.map((item, i) => (
                          <li key={i} className="flex items-start gap-3 text-foreground">
                            <span className="text-gold-600 dark:text-gold-400 font-bold min-w-[40px]">{item.count}</span>
                            <span>{item.text}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                    
                    {step.hasLink && (
                      <Button
                        variant="outline"
                        onClick={() => router.push(step.linkPath!)}
                        className="mt-4 rounded-full border-gold-500/30 text-gold-600 dark:text-gold-400 hover:bg-gold-500/10"
                        data-testid={`step-${step.number}-link`}
                      >
                        {step.linkText}
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Tips Section */}
        <section className="mt-12">
          <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-sacred-blue via-slate-800 to-slate-900 text-white">
            <h2 className="text-2xl font-cinzel font-bold mb-6 flex items-center gap-3">
              <span className="w-10 h-10 rounded-xl bg-gold-500 flex items-center justify-center text-sacred-blue">
                <Check className="w-5 h-5" strokeWidth={3} />
              </span>
              Dicas para uma oração profunda
            </h2>
            <ul className="space-y-4">
              {[
                "Reze devagar, meditando sobre cada mistério",
                "Escolha um horário fixo do dia para criar o hábito",
                "Reze em família sempre que possível",
                "Ofereça suas intenções no início da oração",
                "Use uma imagem ou ícone religioso para ajudar na concentração"
              ].map((tip, i) => (
                <li key={i} className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-gold-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="w-4 h-4 text-gold-400" strokeWidth={3} />
                  </div>
                  <span className="text-white/90">{tip}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* CTA */}
        <section className="mt-12 text-center">
          <div className="p-8 sm:p-10 rounded-3xl glass sacred-border">
            <h3 className="text-2xl font-cinzel font-bold text-foreground mb-4">
              Pronto para começar?
            </h3>
            <p className="text-muted-foreground mb-6">
              Junte-se à nossa comunidade e registre suas orações diárias
            </p>
            <Button
              size="lg"
              onClick={() => router.push("/")}
              className="rounded-full px-8 py-6 text-lg font-cinzel font-bold bg-gradient-to-r from-gold-500 to-gold-600 text-sacred-blue hover:shadow-gold-glow transition-all"
              data-testid="cta-home"
            >
              Ir para a página inicial
            </Button>
          </div>
        </section>
      </div>
    </main>
  );
}
