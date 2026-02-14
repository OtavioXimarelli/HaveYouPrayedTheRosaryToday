"use client";

import { useRouter } from "next/navigation";
import { PageHeader } from "@/components/page-header";
import { PageTransition } from "@/components/page-transition";
import { LessonCard } from "@/components/learning/lesson-card";
import { ProgressBar } from "@/components/learning/progress-bar";
import { BreadcrumbNav } from "@/components/learning/breadcrumb-nav";
import { LockedContent } from "@/components/locked-content";
import { BookOpen } from "lucide-react";

export default function IntermediarioPage() {
  const router = useRouter();
  const isLoggedIn = false;

  const lessons = [
    {
      id: "oracao-contemplativa",
      number: 1,
      title: "Oração Contemplativa e o Rosário",
      description: "Aprenda a passar da oração vocal para a contemplação profunda dos mistérios.",
      duration: "25 min"
    },
    {
      id: "ano-liturgico",
      number: 2,
      title: "Ano Litúrgico e o Rosário",
      description: "Conecte sua prática do Rosário com os tempos e festas da Igreja.",
      duration: "20 min"
    },
    {
      id: "raizes-biblicas",
      number: 3,
      title: "Raízes Bíblicas dos Mistérios",
      description: "Explore as passagens bíblicas de cada mistério em profundidade.",
      duration: "30 min"
    },
    {
      id: "rosario-sacramentos",
      number: 4,
      title: "Rosário e os Sacramentos",
      description: "Descubra a relação entre o Rosário e a vida sacramental.",
      duration: "22 min"
    },
    {
      id: "maria-escrituras",
      number: 5,
      title: "Maria nas Sagradas Escrituras",
      description: "Estudo bíblico completo sobre a presença de Maria na Bíblia.",
      duration: "28 min"
    }
  ];

  if (!isLoggedIn) {
    return (
      <PageTransition>
        <main className="min-h-screen bg-background">
          <PageHeader
            title="Caminho Intermediário"
            subtitle="Aprofundando a contemplação"
            icon="📖"
          />

          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
            <BreadcrumbNav 
              items={[
                { label: "Formação", path: "/formacao" },
                { label: "Intermediário" }
              ]} 
            />

            {/* Preview of what's inside */}
            <section className="mb-8">
              <div className="p-6 rounded-2xl glass sacred-border">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-lg">
                    <BookOpen className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-xl font-cinzel font-bold text-foreground">Conteúdo do caminho</h2>
                    <p className="text-blue-600 dark:text-blue-400 text-sm font-medium">5 lições • ~125 minutos</p>
                  </div>
                </div>
                <ul className="space-y-2">
                  {lessons.map((lesson) => (
                    <li key={lesson.id} className="flex items-center gap-2 text-muted-foreground">
                      <span className="w-6 h-6 rounded-full bg-blue-500/20 flex items-center justify-center text-xs font-bold text-blue-600 dark:text-blue-400">
                        {lesson.number}
                      </span>
                      <span className="text-sm">{lesson.title}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            <LockedContent
              title="Caminho Intermediário"
              description="Este conteúdo é exclusivo para membros. Crie sua conta gratuita para acessar todas as lições e acompanhar seu progresso."
              featureList={[
                "5 lições aprofundadas",
                "Exercícios práticos de meditação",
                "Conteúdos extras exclusivos",
                "Progresso salvo automaticamente"
              ]}
            />
          </div>
        </main>
      </PageTransition>
    );
  }

  // Logged in view would show full lessons
  return (
    <PageTransition>
      <main className="min-h-screen bg-background">
        <PageHeader
          title="Caminho Intermediário"
          subtitle="Aprofundando a contemplação"
          icon="📖"
        />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <p className="text-muted-foreground">Conteúdo completo para usuários logados...</p>
        </div>
      </main>
    </PageTransition>
  );
}
