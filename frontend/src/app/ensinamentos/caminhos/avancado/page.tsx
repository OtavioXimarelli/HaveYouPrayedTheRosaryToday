"use client";

import { useRouter } from "next/navigation";
import { PageHeader } from "@/components/page-header";
import { PageTransition } from "@/components/page-transition";
import { BreadcrumbNav } from "@/components/learning/breadcrumb-nav";
import { Crown } from "lucide-react";
import { AUTH_DISABLED } from "@/providers/auth-provider";

export default function AvancadoPage() {
  const router = useRouter();
  const LOCKED = AUTH_DISABLED ? false : true;

  const lessons = [
    { id: "teologia-mariana", number: 1, title: "Teologia Mariana Essencial", duration: "35 min" },
    { id: "consagracao-total", number: 2, title: "Consagração Total a Maria", duration: "40 min" },
    { id: "aspectos-misticos", number: 3, title: "Aspectos Místicos do Rosário", duration: "30 min" },
    { id: "doutrina-social", number: 4, title: "Rosário e Doutrina Social", duration: "25 min" },
    { id: "lideranca-oracao", number: 5, title: "Liderando Rosário em Comunidade", duration: "28 min" }
  ];

  return (
    <PageTransition>
      <main className="min-h-screen bg-background">
        <PageHeader
          title="Caminho Avançado"
          subtitle="Mistérios profundos de Maria"
          icon="👑"
        />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <BreadcrumbNav 
            items={[
              { label: "Ensinamentos", path: "/ensinamentos?tab=caminhos" },
              { label: "Avançado" }
            ]} 
          />

          {/* Preview */}
          <section className="mb-8">
            <div className="p-6 rounded-2xl glass sacred-border">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center shadow-lg">
                  <Crown className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-cinzel font-bold text-foreground">Conteúdo do caminho</h2>
                  <p className="text-purple-600 dark:text-purple-400 text-sm font-medium">5 lições • ~158 minutos</p>
                </div>
              </div>
              <ul className="space-y-2">
                {lessons.map((lesson) => (
                  <li key={lesson.id} className="flex items-center gap-2 text-muted-foreground">
                    <span className="w-6 h-6 rounded-full bg-purple-500/20 flex items-center justify-center text-xs font-bold text-purple-600 dark:text-purple-400">
                      {lesson.number}
                    </span>
                    <span className="text-sm">{lesson.title}</span>
                    <span className="text-xs text-muted-foreground/60 ml-auto">{lesson.duration}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        </div>
      </main>
    </PageTransition>
  );
}
