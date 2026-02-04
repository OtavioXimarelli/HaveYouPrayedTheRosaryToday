"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { PageHeader } from "@/components/page-header";

export default function MisteriosPage() {
  const router = useRouter();

  const getDayOfWeek = () => {
    const days = ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado'];
    const today = new Date().getDay();
    return days[today];
  };

  const getMysteryOfDay = () => {
    const day = new Date().getDay();
    if (day === 0 || day === 3) return 'gloriosos';
    if (day === 1 || day === 6) return 'gozosos';
    if (day === 2 || day === 5) return 'dolorosos';
    if (day === 4) return 'luminosos';
    return 'gozosos';
  };

  const currentDay = getDayOfWeek();
  const currentMystery = getMysteryOfDay();

  const mysteries = {
    gozosos: {
      title: "Mistérios Gozosos",
      subtitle: "A Infância de Jesus",
      days: "Segunda-feira e Sábado",
      gradient: "from-blue-500 to-blue-600",
      bgGradient: "from-blue-500/10 to-blue-600/5 dark:from-blue-500/20 dark:to-blue-600/10",
      borderColor: "border-blue-500/30",
      badgeColor: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
      mysteries: [
        { number: 1, title: "A Anunciação do Anjo Gabriel a Maria", meditation: "Reflita sobre a humildade de Maria ao aceitar ser a Mãe de Deus", fruit: "Humildade", scripture: "Lucas 1, 26-38" },
        { number: 2, title: "A Visitação de Maria a sua prima Isabel", meditation: "Medite sobre o amor fraterno e a caridade de Maria", fruit: "Amor ao próximo", scripture: "Lucas 1, 39-56" },
        { number: 3, title: "O Nascimento de Jesus em Belém", meditation: "Contemple a pobreza do presépio e o amor de Jesus por nós", fruit: "Pobreza de espírito", scripture: "Lucas 2, 1-20" },
        { number: 4, title: "A Apresentação de Jesus no Templo", meditation: "Reflita sobre a obediência de Maria e José à Lei de Deus", fruit: "Obediência", scripture: "Lucas 2, 22-38" },
        { number: 5, title: "A Perda e o Encontro de Jesus no Templo", meditation: "Medite sobre a dor de Maria e sua alegria ao encontrar Jesus", fruit: "Buscar Jesus em tudo", scripture: "Lucas 2, 41-52" }
      ]
    },
    luminosos: {
      title: "Mistérios Luminosos",
      subtitle: "A Vida Pública de Jesus",
      days: "Quinta-feira",
      gradient: "from-yellow-500 to-yellow-600",
      bgGradient: "from-yellow-500/10 to-yellow-600/5 dark:from-yellow-500/20 dark:to-yellow-600/10",
      borderColor: "border-yellow-500/30",
      badgeColor: "bg-yellow-500/10 text-yellow-700 dark:text-yellow-400",
      mysteries: [
        { number: 1, title: "O Batismo de Jesus no Rio Jordão", meditation: "Reflita sobre o início da missão pública de Jesus", fruit: "Fidelidade ao Batismo", scripture: "Mateus 3, 13-17" },
        { number: 2, title: "A Auto-revelação de Jesus nas Bodas de Caná", meditation: "Contemple o primeiro milagre de Jesus pela intercessão de Maria", fruit: "Confiança em Maria", scripture: "João 2, 1-12" },
        { number: 3, title: "O Anúncio do Reino de Deus", meditation: "Medite sobre o chamado à conversão e ao Evangelho", fruit: "Conversão", scripture: "Marcos 1, 14-15" },
        { number: 4, title: "A Transfiguração de Jesus", meditation: "Contemple a glória divina de Cristo revelada aos discípulos", fruit: "Desejo do Céu", scripture: "Lucas 9, 28-36" },
        { number: 5, title: "A Instituição da Eucaristia", meditation: "Reflita sobre o amor de Jesus presente na Eucaristia", fruit: "Amor à Eucaristia", scripture: "Lucas 22, 14-20" }
      ]
    },
    dolorosos: {
      title: "Mistérios Dolorosos",
      subtitle: "A Paixão de Jesus",
      days: "Terça-feira e Sexta-feira",
      gradient: "from-purple-600 to-purple-700",
      bgGradient: "from-purple-600/10 to-purple-700/5 dark:from-purple-600/20 dark:to-purple-700/10",
      borderColor: "border-purple-600/30",
      badgeColor: "bg-purple-600/10 text-purple-700 dark:text-purple-400",
      mysteries: [
        { number: 1, title: "A Agonia de Jesus no Horto das Oliveiras", meditation: "Reflita sobre o sofrimento de Jesus por nossos pecados", fruit: "Contrição dos pecados", scripture: "Lucas 22, 39-46" },
        { number: 2, title: "A Flagelação de Jesus", meditation: "Contemple as feridas de Jesus causadas por nossos pecados", fruit: "Pureza", scripture: "Marcos 15, 15" },
        { number: 3, title: "A Coroação de Espinhos", meditation: "Medite sobre a humilhação de Jesus e seu amor por nós", fruit: "Humildade", scripture: "Marcos 15, 16-20" },
        { number: 4, title: "Jesus carrega a Cruz até o Calvário", meditation: "Reflita sobre o peso de nossas culpas carregadas por Jesus", fruit: "Paciência nas tribulações", scripture: "Lucas 23, 26-32" },
        { number: 5, title: "A Crucifixão e Morte de Jesus", meditation: "Contemple o amor supremo de Jesus que deu sua vida por nós", fruit: "Perseverança final", scripture: "Lucas 23, 33-46" }
      ]
    },
    gloriosos: {
      title: "Mistérios Gloriosos",
      subtitle: "A Glória de Cristo e Maria",
      days: "Quarta-feira e Domingo",
      gradient: "from-gold-500 to-gold-600",
      bgGradient: "from-gold-500/10 to-gold-600/5 dark:from-gold-500/20 dark:to-gold-600/10",
      borderColor: "border-gold-500/30",
      badgeColor: "bg-gold-500/10 text-gold-700 dark:text-gold-400",
      mysteries: [
        { number: 1, title: "A Ressurreição de Jesus", meditation: "Reflita sobre a vitória de Jesus sobre a morte e o pecado", fruit: "Fé", scripture: "João 20, 1-18" },
        { number: 2, title: "A Ascensão de Jesus ao Céu", meditation: "Contemple Jesus voltando ao Pai e nos preparando um lugar", fruit: "Esperança", scripture: "Atos 1, 6-11" },
        { number: 3, title: "A Descida do Espírito Santo sobre os Apóstolos", meditation: "Medite sobre o Espírito Santo fortalecendo a Igreja", fruit: "Sabedoria", scripture: "Atos 2, 1-13" },
        { number: 4, title: "A Assunção de Maria ao Céu", meditation: "Contemple Maria sendo elevada ao Céu de corpo e alma", fruit: "Graça de uma boa morte", scripture: "Apocalipse 12, 1" },
        { number: 5, title: "A Coroação de Maria como Rainha do Céu e da Terra", meditation: "Reflita sobre a glória de Maria e sua intercessão por nós", fruit: "Devoção a Maria", scripture: "Apocalipse 12, 1-17" }
      ]
    }
  };

  const mysteryOrder = ['gozosos', 'luminosos', 'dolorosos', 'gloriosos'] as const;

  return (
    <main className="min-h-screen bg-background">
      <PageHeader 
        title="Mistérios do Rosário"
        subtitle="Meditações sobre a vida de Jesus Cristo e Maria"
        icon="✨"
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        {/* Today's Mystery Highlight */}
        <section className="mb-12">
          <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-sacred-blue via-slate-800 to-slate-900 text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(212,175,55,0.2)_0%,transparent_50%)]" />
            <div className="relative z-10 text-center">
              <p className="text-white/70 text-lg mb-2">Hoje é {currentDay}</p>
              <h2 className="text-3xl sm:text-4xl font-cinzel font-bold mb-2">
                <span className="text-gold-400">{mysteries[currentMystery].title}</span>
              </h2>
              <p className="text-xl text-white/80 mb-6">
                {mysteries[currentMystery].subtitle}
              </p>
              <Button
                size="lg"
                onClick={() => document.getElementById(currentMystery)?.scrollIntoView({ behavior: 'smooth' })}
                className="rounded-full px-8 py-6 text-lg font-cinzel font-bold bg-gradient-to-r from-gold-500 to-gold-600 text-sacred-blue hover:shadow-gold-glow transition-all"
                data-testid="btn-today-mystery"
              >
                Ver mistérios de hoje
              </Button>
            </div>
          </div>
        </section>

        {/* Quick Reference */}
        <section className="mb-12">
          <div className="p-6 sm:p-8 rounded-3xl glass sacred-border">
            <h2 className="text-2xl font-cinzel font-bold text-foreground mb-6">
              Os Quatro Grupos de Mistérios
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              O Rosário completo é composto por 20 mistérios divididos em quatro grupos. Cada grupo contempla um aspecto da vida de Jesus Cristo e de Maria.
            </p>
            <div className="grid sm:grid-cols-2 gap-4">
              {mysteryOrder.map((key) => {
                const m = mysteries[key];
                return (
                  <button
                    key={key}
                    onClick={() => document.getElementById(key)?.scrollIntoView({ behavior: 'smooth' })}
                    className={`p-4 rounded-xl text-left border ${m.borderColor} bg-gradient-to-br ${m.bgGradient} hover:-translate-y-0.5 transition-all`}
                    data-testid={`quick-nav-${key}`}
                  >
                    <p className="font-cinzel font-bold text-foreground">{m.title}</p>
                    <p className="text-sm text-muted-foreground">{m.days}</p>
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        {/* All Mysteries */}
        {mysteryOrder.map((key) => {
          const m = mysteries[key];
          return (
            <section key={key} id={key} className="mb-12 scroll-mt-8">
              <div className={`p-6 sm:p-8 rounded-3xl bg-gradient-to-br ${m.bgGradient} border ${m.borderColor}`}>
                {/* Header */}
                <div className="text-center mb-8">
                  <div className={`inline-flex w-16 h-16 rounded-2xl bg-gradient-to-br ${m.gradient} items-center justify-center text-3xl text-white shadow-lg mb-4`}>
                    {key === 'gozosos' && '😊'}
                    {key === 'luminosos' && '✨'}
                    {key === 'dolorosos' && '😢'}
                    {key === 'gloriosos' && '👑'}
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-cinzel font-bold text-foreground mb-2">
                    {m.title}
                  </h2>
                  <p className="text-lg text-muted-foreground mb-1">{m.subtitle}</p>
                  <p className={`text-sm font-semibold ${m.badgeColor} inline-block px-3 py-1 rounded-full`}>
                    {m.days}
                  </p>
                </div>

                {/* Mysteries List */}
                <div className="space-y-4">
                  {m.mysteries.map((mystery) => (
                    <div 
                      key={mystery.number}
                      className="p-5 rounded-xl bg-card border border-border hover:-translate-y-0.5 transition-all"
                      data-testid={`mystery-${key}-${mystery.number}`}
                    >
                      <div className="flex gap-4 items-start">
                        <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${m.gradient} text-white flex items-center justify-center font-cinzel font-bold flex-shrink-0`}>
                          {mystery.number}
                        </div>
                        <div className="flex-1">
                          <h3 className="text-lg font-cinzel font-bold text-foreground mb-2">
                            {mystery.title}
                          </h3>
                          <p className="text-muted-foreground text-sm mb-3 italic">
                            {mystery.meditation}
                          </p>
                          <div className="flex flex-wrap gap-2 text-xs">
                            <span className={`${m.badgeColor} px-3 py-1 rounded-full font-semibold`}>
                              Fruto: {mystery.fruit}
                            </span>
                            <span className={`${m.badgeColor} px-3 py-1 rounded-full`}>
                              {mystery.scripture}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          );
        })}

        {/* CTA */}
        <section className="text-center">
          <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-sacred-blue via-slate-800 to-slate-900 text-white">
            <h3 className="text-2xl font-cinzel font-bold mb-4">
              Comece a rezar hoje
            </h3>
            <p className="text-white/80 mb-6">
              Aprenda o passo a passo para rezar o Santo Rosário
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                onClick={() => router.push("/como-rezar")}
                className="rounded-full px-8 py-6 text-lg font-cinzel font-bold bg-gradient-to-r from-gold-500 to-gold-600 text-sacred-blue hover:shadow-gold-glow transition-all"
                data-testid="cta-como-rezar"
              >
                Como rezar o Rosário
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => router.push("/")}
                className="rounded-full px-8 py-6 text-lg font-semibold border-white/20 text-white hover:bg-white/10"
                data-testid="cta-home"
              >
                Voltar ao início
              </Button>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
