"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { PageHeader } from "@/components/page-header";

/**
 * Content sourced from the Official Vatican Holy See:
 * https://www.vatican.va/special/rosary/documents/misteri_en.html
 * Based on: Rosarium Virginis Mariae - Pope Saint John Paul II (October 16, 2002)
 */

export default function MisteriosPage() {
  const router = useRouter();

  const getDayOfWeek = () => {
    const days = ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado'];
    const today = new Date().getDay();
    return days[today];
  };

  const getMysteryOfDay = () => {
    const day = new Date().getDay();
    // According to Vatican: Joyful (Mon, Sat), Luminous (Thu), Sorrowful (Tue, Fri), Glorious (Wed, Sun)
    if (day === 0 || day === 3) return 'gloriosos';
    if (day === 1 || day === 6) return 'gozosos';
    if (day === 2 || day === 5) return 'dolorosos';
    if (day === 4) return 'luminosos';
    return 'gozosos';
  };

  const currentDay = getDayOfWeek();
  const currentMystery = getMysteryOfDay();

  // Official Vatican Mysteries with Scripture References
  const mysteries = {
    gozosos: {
      title: "Mistérios Gozosos",
      subtitle: "A Infância de Jesus",
      days: "Segunda-feira e Sábado",
      gradient: "from-blue-500 to-blue-600",
      bgGradient: "from-blue-500/10 to-blue-600/5 dark:from-blue-500/20 dark:to-blue-600/10",
      borderColor: "border-blue-500/30",
      badgeColor: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
      note: undefined as string | undefined,
      mysteries: [
        { 
          number: 1, 
          title: "A Anunciação do Anjo a Maria", 
          scripture: "Lc 1, 26-27",
          quote: "No sexto mês, o anjo Gabriel foi enviado por Deus a uma cidade da Galileia chamada Nazaré, a uma virgem desposada com um homem chamado José, da casa de Davi; e o nome da virgem era Maria."
        },
        { 
          number: 2, 
          title: "A Visitação de Maria a Isabel", 
          scripture: "Lc 1, 39-42",
          quote: "Naqueles dias, Maria partiu para a região montanhosa, dirigindo-se apressadamente a uma cidade de Judá. Entrou na casa de Zacarias e saudou Isabel."
        },
        { 
          number: 3, 
          title: "O Nascimento de Jesus em Belém", 
          scripture: "Lc 2, 1-7",
          quote: "E enquanto estavam em Belém, completaram-se os dias para o parto, e ela deu à luz o seu filho primogênito, envolveu-o em faixas e deitou-o numa manjedoura."
        },
        { 
          number: 4, 
          title: "A Apresentação de Jesus no Templo", 
          scripture: "Lc 2, 21-24",
          quote: "Quando se completaram os dias da purificação, segundo a Lei de Moisés, levaram-no a Jerusalém para o apresentar ao Senhor."
        },
        { 
          number: 5, 
          title: "O Encontro de Jesus no Templo", 
          scripture: "Lc 2, 41-47",
          quote: "Depois de três dias, encontraram-no no Templo, sentado no meio dos doutores, ouvindo-os e interrogando-os."
        }
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
      note: "Introduzidos por São João Paulo II em 2002 (Rosarium Virginis Mariae)",
      mysteries: [
        { 
          number: 1, 
          title: "O Batismo de Jesus no Jordão", 
          scripture: "Mt 3, 16-17",
          quote: "Batizado Jesus, saiu logo da água. E eis que os céus se abriram e viu o Espírito de Deus descendo como pomba e vindo sobre ele."
        },
        { 
          number: 2, 
          title: "As Bodas de Caná", 
          scripture: "Jo 2, 1-5",
          quote: "A mãe de Jesus disse aos serventes: 'Fazei tudo o que ele vos disser.'"
        },
        { 
          number: 3, 
          title: "O Anúncio do Reino de Deus", 
          scripture: "Mc 1, 15",
          quote: "O tempo está cumprido e o Reino de Deus está próximo. Arrependei-vos e crede no Evangelho."
        },
        { 
          number: 4, 
          title: "A Transfiguração de Jesus", 
          scripture: "Mt 17, 1-2",
          quote: "Jesus foi transfigurado diante deles; o seu rosto brilhou como o sol e as suas vestes tornaram-se brancas como a luz."
        },
        { 
          number: 5, 
          title: "A Instituição da Eucaristia", 
          scripture: "Mt 26, 26",
          quote: "Enquanto comiam, Jesus tomou o pão, abençoou-o, partiu-o e deu-o aos discípulos, dizendo: 'Tomai, comei; isto é o meu corpo.'"
        }
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
      note: undefined as string | undefined,
      mysteries: [
        { 
          number: 1, 
          title: "A Agonia de Jesus no Horto das Oliveiras", 
          scripture: "Mt 26, 36-39",
          quote: "Meu Pai, se é possível, afaste-se de mim este cálice! Todavia, não seja como eu quero, mas como tu queres."
        },
        { 
          number: 2, 
          title: "A Flagelação de Jesus", 
          scripture: "Mt 27, 26",
          quote: "Então Pilatos libertou Barrabás; e, depois de mandar açoitar Jesus, entregou-o para ser crucificado."
        },
        { 
          number: 3, 
          title: "A Coroação de Espinhos", 
          scripture: "Mt 27, 27-29",
          quote: "Tecendo uma coroa de espinhos, puseram-na em sua cabeça e uma cana em sua mão direita. Ajoelhando-se diante dele, zombavam: 'Salve, rei dos judeus!'"
        },
        { 
          number: 4, 
          title: "Jesus carrega a Cruz", 
          scripture: "Mc 15, 21-22",
          quote: "Requisitaram um passante, Simão de Cirene, que voltava do campo, para carregar a cruz de Jesus. E conduziram-no ao lugar chamado Gólgota."
        },
        { 
          number: 5, 
          title: "A Crucificação e Morte de Jesus", 
          scripture: "Lc 23, 33-46",
          quote: "Pai, nas tuas mãos entrego o meu espírito. E, dizendo isto, expirou."
        }
      ]
    },
    gloriosos: {
      title: "Mistérios Gloriosos",
      subtitle: "A Glória de Cristo e de Maria",
      days: "Quarta-feira e Domingo",
      gradient: "from-gold-500 to-gold-600",
      bgGradient: "from-gold-500/10 to-gold-600/5 dark:from-gold-500/20 dark:to-gold-600/10",
      borderColor: "border-gold-500/30",
      badgeColor: "bg-gold-500/10 text-gold-700 dark:text-gold-400",
      note: undefined as string | undefined,
      mysteries: [
        { 
          number: 1, 
          title: "A Ressurreição de Jesus", 
          scripture: "Lc 24, 1-5",
          quote: "Por que buscais entre os mortos aquele que está vivo? Ele não está aqui, ressuscitou!"
        },
        { 
          number: 2, 
          title: "A Ascensão de Jesus ao Céu", 
          scripture: "Mc 16, 19",
          quote: "Depois de falar com eles, o Senhor Jesus foi elevado ao céu e sentou-se à direita de Deus."
        },
        { 
          number: 3, 
          title: "A Descida do Espírito Santo", 
          scripture: "At 2, 1-4",
          quote: "Apareceram-lhes línguas como de fogo, que se repartiram e pousaram sobre cada um deles. Todos ficaram cheios do Espírito Santo."
        },
        { 
          number: 4, 
          title: "A Assunção de Maria ao Céu", 
          scripture: "Lc 1, 48-49",
          quote: "Todas as gerações me chamarão bem-aventurada, porque o Todo-Poderoso fez grandes coisas em meu favor."
        },
        { 
          number: 5, 
          title: "A Coroação de Maria como Rainha do Céu e da Terra", 
          scripture: "Ap 12, 1",
          quote: "Apareceu no céu um grande sinal: uma Mulher vestida de sol, tendo a lua debaixo dos pés e sobre a cabeça uma coroa de doze estrelas."
        }
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
        {/* Source Attribution */}
        <div className="mb-8 p-4 rounded-xl bg-muted/50 border border-border">
          <p className="text-sm text-muted-foreground">
            <strong>Fonte oficial:</strong> Santa Sé do Vaticano — <a href="https://www.vatican.va/special/rosary/documents/misteri_en.html" target="_blank" rel="noopener noreferrer" className="text-gold-600 dark:text-gold-400 hover:underline">vatican.va/special/rosary</a>
            <br />
            <span className="text-xs">Baseado na Carta Apostólica <em>Rosarium Virginis Mariae</em> do Papa São João Paulo II (2002)</span>
          </p>
        </div>

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
              O Rosário completo é composto por 20 mistérios divididos em quatro grupos. A indicação dos dias não é obrigatória, podendo ser adaptada conforme as necessidades espirituais e pastorais (<em>Rosarium Virginis Mariae</em>, 38).
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
                  {m.note && (
                    <p className="text-xs text-muted-foreground mt-2 italic">{m.note}</p>
                  )}
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
                          <p className="text-muted-foreground text-sm mb-3 italic border-l-2 border-gold-500/30 pl-3">
                            &ldquo;{mystery.quote}&rdquo;
                          </p>
                          <span className={`${m.badgeColor} px-3 py-1 rounded-full text-xs font-semibold`}>
                            {mystery.scripture}
                          </span>
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
