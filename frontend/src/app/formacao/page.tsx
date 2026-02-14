"use client";

import { useRouter } from "next/navigation";
import { PageHeader } from "@/components/page-header";
import { PageTransition } from "@/components/page-transition";
import { LockedContent } from "@/components/locked-content";
import { ProgressBar } from "@/components/learning/progress-bar";
import { BreadcrumbNav } from "@/components/learning/breadcrumb-nav";
import { Button } from "@/components/ui/button";
import { 
  GraduationCap, Users, BookOpen, Star, ArrowRight, 
  Crown, Sparkles, Heart, ChevronRight
} from "lucide-react";

export default function FormacaoPage() {
  const router = useRouter();

  // Mock data - would come from localStorage or API
  const userProgress = {
    iniciante: { completed: 0, total: 5 },
    intermediario: { completed: 0, total: 5 },
    avancado: { completed: 0, total: 5 },
    santos: { completed: 0, total: 5 }
  };

  const isLoggedIn = false; // Would come from auth context

  const paths = [
    {
      id: "iniciante",
      title: "Caminho Iniciante",
      subtitle: "Fundamentos da fé e oração",
      description: "Descubra a profundidade do Rosário e construa uma base sólida para sua vida de oração.",
      icon: Sparkles,
      gradient: "from-emerald-500 to-emerald-600",
      bgGradient: "from-emerald-500/10 to-emerald-600/5",
      borderColor: "border-emerald-500/20",
      lessons: 5,
      duration: "2-3 horas",
      path: "/formacao/iniciante",
      isLocked: false
    },
    {
      id: "intermediario",
      title: "Caminho Intermediário",
      subtitle: "Aprofundando a contemplação",
      description: "Aprenda técnicas de meditação e conecte o Rosário ao ano litúrgico.",
      icon: BookOpen,
      gradient: "from-blue-500 to-blue-600",
      bgGradient: "from-blue-500/10 to-blue-600/5",
      borderColor: "border-blue-500/20",
      lessons: 5,
      duration: "3-4 horas",
      path: "/formacao/intermediario",
      isLocked: !isLoggedIn
    },
    {
      id: "avancado",
      title: "Caminho Avançado",
      subtitle: "Mistérios profundos de Maria",
      description: "Explore teologia mariana, consagração total e aspectos místicos do Rosário.",
      icon: Crown,
      gradient: "from-purple-500 to-purple-600",
      bgGradient: "from-purple-500/10 to-purple-600/5",
      borderColor: "border-purple-500/20",
      lessons: 5,
      duration: "4-5 horas",
      path: "/formacao/avancado",
      isLocked: !isLoggedIn
    },
    {
      id: "santos",
      title: "Santos do Rosário",
      subtitle: "Vidas que inspiram",
      description: "Conheça os grandes santos devotos de Maria e aprenda com seus exemplos.",
      icon: Star,
      gradient: "from-gold-500 to-gold-600",
      bgGradient: "from-gold-500/10 to-gold-600/5",
      borderColor: "border-gold-500/20",
      lessons: 5,
      duration: "3-4 horas",
      path: "/formacao/santos",
      isLocked: !isLoggedIn
    }
  ];

  return (
    <PageTransition>
      <main className="min-h-screen bg-background">
        <PageHeader
          title="Centro de Formação"
          subtitle="Aprofunde sua fé com conteúdos estruturados"
          icon="🏛️"
        />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <BreadcrumbNav items={[{ label: "Formação" }]} />

          {/* Hero Section */}
          <section className="mb-12">
            <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-gold-500/5 to-gold-600/5 border border-gold-500/20">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-gold-500 to-gold-600 flex items-center justify-center shadow-lg">
                  <GraduationCap className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h2 className="text-xl sm:text-2xl font-cinzel font-bold text-foreground">Bem-vindo ao Centro de Formação</h2>
                  <p className="text-gold-600 dark:text-gold-400 font-medium">Sua jornada de crescimento espiritual</p>
                </div>
              </div>
              <p className="text-lg text-muted-foreground leading-relaxed">
                O Rosário é muito mais que uma oralização repetitiva — é uma escola de contemplação. 
                Aqui você encontrará <span className="text-gold-600 dark:text-gold-400 font-semibold">conteúdos profundos e estruturados</span> para 
                transformar sua prática de oração em verdadeira formação espiritual.
              </p>
            </div>
          </section>

          {/* Progress Overview (for logged users) */}
          {isLoggedIn && (
            <section className="mb-12">
              <div className="p-6 rounded-2xl glass sacred-border">
                <h3 className="font-cinzel font-bold text-lg text-foreground mb-4">Seu Progresso</h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  {paths.map((p) => (
                    <div key={p.id} className="p-4 rounded-xl bg-muted/50">
                      <div className="flex items-center gap-2 mb-2">
                        <p.icon className="w-4 h-4 text-gold-500" />
                        <span className="font-medium text-sm text-foreground">{p.title}</span>
                      </div>
                      <ProgressBar
                        current={userProgress[p.id as keyof typeof userProgress].completed}
                        total={userProgress[p.id as keyof typeof userProgress].total}
                        size="sm"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* Learning Paths */}
          <section className="mb-12">
            <h2 className="text-2xl font-cinzel font-bold text-foreground mb-6">Caminhos de Formação</h2>
            
            <div className="grid gap-6">
              {paths.map((path) => (
                <div
                  key={path.id}
                  onClick={() => !path.isLocked && router.push(path.path)}
                  className={`group p-6 sm:p-8 rounded-3xl transition-all duration-300 ${
                    path.isLocked
                      ? "glass opacity-70 cursor-not-allowed"
                      : `bg-gradient-to-br ${path.bgGradient} border ${path.borderColor} cursor-pointer hover:-translate-y-1 hover:shadow-lg`
                  }`}
                  data-testid={`path-${path.id}`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-start gap-5">
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${path.gradient} flex items-center justify-center shadow-lg flex-shrink-0 ${
                      path.isLocked ? "opacity-50" : "group-hover:scale-105 transition-transform"
                    }`}>
                      <path.icon className="w-8 h-8 text-white" />
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        {path.isLocked && (
                          <span className="text-xs px-2 py-0.5 rounded-full bg-muted text-muted-foreground font-semibold">
                            Requer login
                          </span>
                        )}
                      </div>
                      
                      <h3 className={`text-xl sm:text-2xl font-cinzel font-bold mb-1 ${
                        path.isLocked ? "text-muted-foreground" : "text-foreground group-hover:text-gold-600 dark:group-hover:text-gold-400"
                      } transition-colors`}>
                        {path.title}
                      </h3>
                      <p className="text-gold-600 dark:text-gold-400 font-medium text-sm mb-2">{path.subtitle}</p>
                      <p className="text-muted-foreground leading-relaxed mb-4">{path.description}</p>
                      
                      <div className="flex flex-wrap items-center gap-4 text-sm">
                        <span className="flex items-center gap-1.5 text-muted-foreground">
                          <BookOpen className="w-4 h-4" />
                          {path.lessons} lições
                        </span>
                        <span className="flex items-center gap-1.5 text-muted-foreground">
                          <Heart className="w-4 h-4" />
                          {path.duration}
                        </span>
                        {!path.isLocked && (
                          <span className="flex items-center gap-1 text-gold-600 dark:text-gold-400 font-medium ml-auto">
                            Acessar caminho
                            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* CTA for non-logged users */}
          {!isLoggedIn && (
            <LockedContent
              title="Desbloqueie todo o conteúdo"
              description="Crie sua conta gratuita para acessar todos os caminhos de formação, salvar seu progresso e participar da comunidade."
              featureList={[
                "Acesso a todos os caminhos de formação",
                "Progresso salvo automaticamente",
                "Certificado de conclusão",
                "Conteúdos exclusivos de santos",
                "Comunidade de apoio"
              ]}
            />
          )}
        </div>
      </main>
    </PageTransition>
  );
}
