"use client";

import { useRouter } from "next/navigation";
import { PageHeader } from "@/components/page-header";
import { PageTransition } from "@/components/page-transition";
import { LessonCard } from "@/components/learning/lesson-card";
import { ProgressBar } from "@/components/learning/progress-bar";
import { BreadcrumbNav } from "@/components/learning/breadcrumb-nav";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";

export default function IniciantePage() {
  const router = useRouter();

  // Mock data
  const completedLessons: string[] = []; // Would come from localStorage
  const isLoggedIn = false;

  const lessons = [
    {
      id: "o-que-e-rosario",
      number: 1,
      title: "O que é o Rosário?",
      description: "Descubra a origem, estrutura e significado profundo desta oração milenar que une milhões de católicos.",
      duration: "15 min",
      isLocked: false
    },
    {
      id: "papel-de-maria",
      number: 2,
      title: "O Papel de Maria na Salvação",
      description: "Entenda por que a Igreja honra Maria e como ela nos conduz a Jesus através do Rosário.",
      duration: "20 min",
      isLocked: !isLoggedIn ? false : false
    },
    {
      id: "poder-oracao-repetitiva",
      number: 3,
      title: "O Poder da Oração Repetitiva",
      description: "Aprenda como a repetição contemplativa transforma o coração e aproxima de Deus.",
      duration: "15 min",
      isLocked: !isLoggedIn
    },
    {
      id: "habito-diario",
      number: 4,
      title: "Construindo um Hábito Diário",
      description: "Estratégias práticas para incorporar o Rosário na sua rotina diária.",
      duration: "12 min",
      isLocked: !isLoggedIn
    },
    {
      id: "vencendo-distracoes",
      number: 5,
      title: "Vencendo as Distrações na Oração",
      description: "Técnicas dos santos para manter o foco e aprofundar a meditação durante o Rosário.",
      duration: "18 min",
      isLocked: !isLoggedIn
    }
  ];

  const completedCount = lessons.filter(l => completedLessons.includes(l.id)).length;

  return (
    <PageTransition>
      <main className="min-h-screen bg-background">
        <PageHeader
          title="Caminho Iniciante"
          subtitle="Fundamentos da fé e oração"
          icon="✨"
        />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <BreadcrumbNav 
            items={[
              { label: "Formação", path: "/formacao" },
              { label: "Iniciante" }
            ]} 
          />

          {/* Intro */}
          <section className="mb-8">
            <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-emerald-500/10 to-emerald-600/5 border border-emerald-500/20">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center shadow-lg">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-cinzel font-bold text-foreground">Bem-vindo ao início</h2>
                  <p className="text-emerald-600 dark:text-emerald-400 text-sm font-medium">5 lições • ~80 minutos</p>
                </div>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                Este caminho foi criado para quem está começando ou deseja revisitar os fundamentos do Rosário. 
                Ao final, você terá uma compreensão sólida e uma prática de oração mais profunda.
              </p>
            </div>
          </section>

          {/* Progress */}
          <section className="mb-8">
            <div className="p-5 rounded-2xl glass sacred-border">
              <ProgressBar
                current={completedCount}
                total={lessons.length}
                label="Progresso do caminho"
              />
            </div>
          </section>

          {/* Lessons */}
          <section className="mb-12">
            <h2 className="text-xl font-cinzel font-bold text-foreground mb-6">Lições</h2>
            <div className="space-y-4">
              {lessons.map((lesson) => (
                <LessonCard
                  key={lesson.id}
                  title={lesson.title}
                  description={lesson.description}
                  duration={lesson.duration}
                  path={`/formacao/iniciante/${lesson.id}`}
                  lessonNumber={lesson.number}
                  isCompleted={completedLessons.includes(lesson.id)}
                  isLocked={lesson.isLocked}
                />
              ))}
            </div>
          </section>

          {/* Next Path CTA */}
          <section className="text-center">
            <div className="p-6 sm:p-8 rounded-3xl glass sacred-border">
              <h3 className="text-xl font-cinzel font-bold text-foreground mb-3">
                Próximo passo
              </h3>
              <p className="text-muted-foreground mb-6">
                Após completar o caminho iniciante, continue sua jornada no caminho intermediário.
              </p>
              <Button
                size="lg"
                onClick={() => router.push("/formacao/intermediario")}
                className="rounded-full px-8 py-6 text-base font-cinzel font-bold bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:shadow-lg transition-all"
                data-testid="next-path-btn"
              >
                Ver Caminho Intermediário
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </div>
          </section>
        </div>
      </main>
    </PageTransition>
  );
}
