"use client";

import { useRouter } from "next/navigation";
import { PageHeader } from "@/components/page-header";
import { PageTransition } from "@/components/page-transition";
import { BreadcrumbNav } from "@/components/learning/breadcrumb-nav";
import { LockedContent } from "@/components/locked-content";
import { Button } from "@/components/ui/button";
import { 
  Timer, Edit3, Compass, Heart, Play, ArrowRight,
  Pause, Volume2, Moon, Sun, ChevronRight
} from "lucide-react";
import { useAuth } from "@/providers/auth-provider";

export default function FerramentasPage() {
  const router = useRouter();
  const { isLoggedIn } = useAuth();

  const tools = [
    {
      id: "guia-interativo",
      title: "Guia Interativo do Rosário",
      description: "Reze acompanhado passo a passo com temporizador, contador de contas e texto das orações.",
      icon: Play,
      gradient: "from-gold-500 to-gold-600",
      bgGradient: "from-gold-500/10 to-gold-600/5",
      borderColor: "border-gold-500/20",
      features: ["Temporizador por mistério", "Contador visual de contas", "Texto das orações"],
      path: "/ferramentas/guia-interativo",
      isLocked: false,
      status: "Em breve"
    },
    {
      id: "diario",
      title: "Diário Espiritual",
      description: "Registre suas reflexões, intenções e graças recebidas durante a oração.",
      icon: Edit3,
      gradient: "from-blue-500 to-blue-600",
      bgGradient: "from-blue-500/10 to-blue-600/5",
      borderColor: "border-blue-500/20",
      features: ["Entradas diárias", "Calendário de reflexões", "Exportar para PDF"],
      path: "/ferramentas/diario",
      isLocked: !isLoggedIn,
      status: "Em breve"
    },
    {
      id: "temporizador",
      title: "Temporizador de Meditação",
      description: "Configure tempos personalizados para cada mistério e mantenha um ritmo contemplativo.",
      icon: Timer,
      gradient: "from-purple-500 to-purple-600",
      bgGradient: "from-purple-500/10 to-purple-600/5",
      borderColor: "border-purple-500/20",
      features: ["Tempos customizáveis", "Alertas suaves", "Modo silencioso"],
      path: "/ferramentas/temporizador",
      isLocked: !isLoggedIn,
      status: "Em breve"
    },
    {
      id: "intencoes",
      title: "Mural de Intenções",
      description: "Compartilhe e reze pelas intenções da comunidade. Unão em oração.",
      icon: Heart,
      gradient: "from-rose-500 to-rose-600",
      bgGradient: "from-rose-500/10 to-rose-600/5",
      borderColor: "border-rose-500/20",
      features: ["Compartilhar intenções", "Rezar pelos outros", "Categorias"],
      path: "/ferramentas/intencoes",
      isLocked: !isLoggedIn,
      status: "Em breve"
    }
  ];

  return (
    <PageTransition>
      <main className="min-h-screen bg-background">
        <PageHeader
          title="Ferramentas de Oração"
          subtitle="Recursos interativos para sua vida espiritual"
          icon="🛠️"
        />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <BreadcrumbNav items={[{ label: "Ferramentas" }]} />

          {/* Hero Section */}
          <section className="mb-12">
            <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-gold-500/5 to-gold-600/5 border border-gold-500/20">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-gold-500 to-gold-600 flex items-center justify-center shadow-lg">
                  <Compass className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h2 className="text-xl sm:text-2xl font-cinzel font-bold text-foreground">Ferramentas para Orar Melhor</h2>
                  <p className="text-gold-600 dark:text-gold-400 font-medium">Tecnologia a serviço da fé</p>
                </div>
              </div>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Utilizamos a tecnologia não para substituir a oração, mas para <span className="text-gold-600 dark:text-gold-400 font-semibold">facilitar e aprofundar</span> sua 
                experiência com o Rosário. Cada ferramenta foi pensada para ajudá-lo a manter o foco e a regularidade.
              </p>
            </div>
          </section>

          {/* Tools Grid */}
          <section className="mb-12">
            <h2 className="text-2xl font-cinzel font-bold text-foreground mb-6">Ferramentas Disponíveis</h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              {tools.map((tool) => (
                <div
                  key={tool.id}
                  className={`group p-6 rounded-2xl transition-all duration-300 ${
                    tool.isLocked
                      ? "glass opacity-70 cursor-not-allowed"
                      : `bg-gradient-to-br ${tool.bgGradient} border ${tool.borderColor} cursor-pointer hover:-translate-y-1 hover:shadow-lg`
                  }`}
                  data-testid={`tool-${tool.id}`}
                >
                  <div className="flex items-start gap-4 mb-4">
                    <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${tool.gradient} flex items-center justify-center shadow-lg flex-shrink-0 ${
                      tool.isLocked ? "opacity-50" : "group-hover:scale-105 transition-transform"
                    }`}>
                      <tool.icon className="w-7 h-7 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        {tool.status && (
                          <span className="text-xs px-2 py-0.5 rounded-full bg-gold-500/20 text-gold-600 dark:text-gold-400 font-semibold">
                            {tool.status}
                          </span>
                        )}
                        {tool.isLocked && (
                          <span className="text-xs px-2 py-0.5 rounded-full bg-muted text-muted-foreground font-semibold">
                            Requer login
                          </span>
                        )}
                      </div>
                      <h3 className={`font-cinzel font-bold text-lg ${
                        tool.isLocked ? "text-muted-foreground" : "text-foreground"
                      }`}>
                        {tool.title}
                      </h3>
                    </div>
                  </div>

                  <p className="text-muted-foreground mb-4 leading-relaxed">
                    {tool.description}
                  </p>

                  <ul className="space-y-2">
                    {tool.features.map((feature, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <div className="w-1.5 h-1.5 rounded-full bg-gold-500" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {!tool.isLocked && (
                    <div className="mt-4 pt-4 border-t border-border/50">
                      <span className="flex items-center gap-1 text-gold-600 dark:text-gold-400 text-sm font-medium">
                        Em desenvolvimento
                        <ChevronRight className="w-4 h-4" />
                      </span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* Coming Soon Notice */}
          <section className="mb-12">
            <div className="p-6 rounded-2xl glass sacred-border text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-gold-500/20 to-gold-600/20 flex items-center justify-center">
                <Timer className="w-8 h-8 text-gold-600 dark:text-gold-400" />
              </div>
              <h3 className="text-xl font-cinzel font-bold text-foreground mb-2">Em Desenvolvimento</h3>
              <p className="text-muted-foreground max-w-md mx-auto">
                Estamos trabalhando nestas ferramentas com carinho. 
                Crie sua conta para ser notificado quando estiverem disponíveis!
              </p>
            </div>
          </section>

          {/* CTA for non-logged users */}
          {!isLoggedIn && (
            <LockedContent
              title="Acesse todas as ferramentas"
              description="Crie sua conta gratuita para usar todas as ferramentas de oração e salvar seu progresso."
              featureList={[
                "Guia interativo completo",
                "Diário espiritual ilimitado",
                "Temporizador personalizado",
                "Participar do mural de intenções"
              ]}
            />
          )}
        </div>
      </main>
    </PageTransition>
  );
}
