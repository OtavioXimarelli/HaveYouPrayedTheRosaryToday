"use client";

import { useRouter } from "next/navigation";
import { PageHeader } from "@/components/page-header";
import { PageTransition } from "@/components/page-transition";
import { BreadcrumbNav } from "@/components/learning/breadcrumb-nav";
import { Scroll, ArrowRight, Calendar } from "lucide-react";
import { AUTH_DISABLED } from "@/providers/auth-provider";

export default function HistoriaPage() {
  const router = useRouter();
  const LOCKED = AUTH_DISABLED ? false : true;

  const topics = [
    {
      id: "apostolicos",
      title: "Período Apostólico",
      description: "Os primeiros cristãos, discípulos de Cristo e fundação da Igreja.",
      period: "30-100 d.C.",
      isLocked: false,
    },
    {
      id: "perseguicoes",
      title: "Era das Perseguições",
      description: "Mártires cristãos que selaram sua fé com sangue. Testemunhos de coragem.",
      period: "100-313 d.C.",
      isLocked: LOCKED,
    },
    {
      id: "constantino",
      title: "Constantinismo e Cristandade",
      description: "A Igreja nos primeiros séculos de paz. Desenvolvimento da liturgia e tradição.",
      period: "313-1054 d.C.",
      isLocked: LOCKED,
    },
    {
      id: "idade-media",
      title: "Idade Média",
      description: "A fé no coração da sociedade medieval. Catedrais, mosteiros e grandes santos.",
      period: "1054-1517",
      isLocked: LOCKED,
    },
    {
      id: "reformas",
      title: "Reforma Católica",
      description: "Resposta da Igreja aos desafios. Renovação espiritual e Concílio de Trento.",
      period: "1517-1648",
      isLocked: LOCKED,
    },
    {
      id: "modernidade",
      title: "Igreja na Modernidade",
      description: "Séculos XIX e XX. Desafios modernos e intervenção de papas santos.",
      period: "1648 até hoje",
      isLocked: LOCKED,
    },
  ];

  return (
    <PageTransition>
      <main className="min-h-screen bg-background">
        <PageHeader
          title="História da Igreja"
          subtitle="Dois mil anos de fé e testemunho"
          icon="📜"
        />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <BreadcrumbNav
            items={[
              { label: "Ensinamentos", path: "/ensinamentos" },
              { label: "História" },
            ]}
          />

          {/* Intro */}
          <section className="mb-12">
            <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-purple-500/10 to-purple-600/5 border border-purple-500/20">
              <p className="text-lg text-muted-foreground leading-relaxed">
                A história da Igreja é a história da fé cristã no mundo. Conheça os grandes eventos, 
                papas, santos e mudanças que moldaram a Igreja até hoje.
              </p>
            </div>
          </section>

          {/* Timeline */}
          <section className="mb-12">
            <h2 className="text-2xl font-cinzel font-bold text-foreground mb-6">Períodos Históricos</h2>

            <div className="space-y-4">
              {topics.map((topic) => (
                <div
                  key={topic.id}
                  className={`group p-6 rounded-2xl transition-all duration-300 ${
                    topic.isLocked
                      ? "glass opacity-70"
                      : "glass sacred-border hover:-translate-y-0.5 hover:shadow-lg cursor-pointer"
                  }`}
                  onClick={() => !topic.isLocked && router.push(`/ensinamentos/historia/${topic.id}`)}
                  data-testid={`period-${topic.id}`}
                >
                  <div className="flex items-start gap-4">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center shadow-lg flex-shrink-0 ${
                      topic.isLocked ? "opacity-50" : ""
                    }`}>
                      <Scroll className="w-6 h-6 text-white" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <Calendar className="w-3 h-3 text-purple-600 dark:text-purple-400" />
                        <span className="text-xs font-semibold text-purple-600 dark:text-purple-400">{topic.period}</span>
                        {topic.isLocked && (
                          <span className="text-xs px-2 py-0.5 rounded-full bg-muted text-muted-foreground font-semibold">
                            Membros
                          </span>
                        )}
                      </div>

                      <h3 className={`font-cinzel font-bold text-lg ${
                        topic.isLocked ? "text-muted-foreground" : "text-foreground group-hover:text-purple-600 dark:group-hover:text-purple-400"
                      } transition-colors`}>
                        {topic.title}
                      </h3>

                      <p className="text-muted-foreground text-sm mt-2">{topic.description}</p>
                    </div>

                    {!topic.isLocked && (
                      <ArrowRight className="w-4 h-4 text-purple-500 flex-shrink-0 group-hover:translate-x-1 transition-transform" />
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
