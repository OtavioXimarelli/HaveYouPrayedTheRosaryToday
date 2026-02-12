"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { PageHeader } from "@/components/page-header";
import { PageTransition } from "@/components/page-transition";

export default function HistoriaPage() {
  const router = useRouter();

  const timeline = [
    {
      icon: "📿",
      title: "Origens Antigas",
      period: "Séculos III-XII",
      content: [
        "Desde os primeiros séculos do cristianismo, os monges do deserto já utilizavam pedras ou grãos para contar orações repetitivas. Os Pais do Deserto recitavam os 150 Salmos de Davi como forma de oração contínua.",
        "Para os fiéis que não sabiam ler ou memorizar os salmos, surgiu a prática de rezar 150 Ave Marias (ou Pai Nossos), usando cordas com nós ou pedras para manter a contagem. Esta prática ficou conhecida como \"Saltério de Maria\"."
      ],
      highlight: false
    },
    {
      icon: "✝",
      title: "São Domingos de Gusmão",
      period: "1208-1221",
      content: [
        "Segundo a tradição católica, a Virgem Maria apareceu a São Domingos de Gusmão em 1208, durante sua missão contra a heresia albigense no sul da França. Ela lhe entregou o Rosário como uma arma poderosa contra as heresias e o pecado.",
        "São Domingos começou a pregar o Rosário como forma de meditação dos mistérios da vida de Cristo, combinando a oração vocal com a contemplação. Ele organizou a oração em três grupos de cinco mistérios cada: Gozosos, Dolorosos e Gloriosos."
      ],
      quote: "\"Uma só Ave Maria bem rezada faz tremer todo o inferno.\" - São Domingos de Gusmão",
      highlight: true
    },
    {
      icon: "⚔",
      title: "Batalha de Lepanto",
      period: "7 de Outubro de 1571",
      content: [
        "A vitória da frota cristã sobre o Império Otomano na Batalha de Lepanto é atribuída à intercessão de Nossa Senhora do Rosário. O Papa Pio V havia pedido que todos os cristãos rezassem o Rosário antes da batalha.",
        "Contra todas as expectativas, a frota cristã obteve uma vitória decisiva. Em agradecimento, o Papa instituiu a festa de Nossa Senhora das Vitórias (depois chamada de Nossa Senhora do Rosário) em 7 de outubro."
      ],
      badge: "Dia de Nossa Senhora do Rosário: 7 de Outubro",
      highlight: false
    },
    {
      icon: "📖",
      title: "Renovação e Popularização",
      period: "Século XV",
      content: [
        "No século XV, o dominicano Alano de la Roche (Alan de La Roche) trabalhou intensamente para renovar a devoção ao Rosário, que havia diminuído. Ele fundou confraternidades do Rosário e escreveu extensivamente sobre seus benefícios espirituais.",
        "Através dos dominicanos, a devoção se espalhou rapidamente por toda a Europa, tornando-se uma das práticas mais populares entre os católicos de todas as classes sociais."
      ],
      highlight: true
    },
    {
      icon: "✨",
      title: "Mistérios Luminosos",
      period: "16 de Outubro de 2002",
      content: [
        "O Papa São João Paulo II, grande devoto do Rosário, acrescentou os Mistérios Luminosos (ou da Luz) na Carta Apostólica \"Rosarium Virginis Mariae\" em 2002. Estes novos mistérios meditam sobre a vida pública de Jesus.",
        "Com esta adição, o Rosário passou a ter 20 mistérios (antes eram 15), representando os 200 anos desde a instituição da festa de Nossa Senhora do Rosário."
      ],
      quote: "\"O Rosário é a minha oração preferida. É uma oração maravilhosa. Maravilhosa na sua simplicidade e na sua profundidade.\" - Papa São João Paulo II",
      highlight: false
    },
    {
      icon: "👼",
      title: "Aparições de Fátima",
      period: "1917",
      content: [
        "Durante as aparições de Fátima em Portugal, Nossa Senhora pediu insistentemente aos três pastorinhos que rezassem o Rosário todos os dias pela paz no mundo e pela conversão dos pecadores.",
        "A mensagem de Fátima renovou a devoção ao Rosário no século XX e continua inspirando milhões de católicos a rezarem diariamente."
      ],
      quote: "\"Rezem o terço todos os dias, para alcançarem a paz para o mundo e o fim da guerra.\" - Nossa Senhora de Fátima, 13 de maio de 1917",
      highlight: true
    },
    {
      icon: "🌍",
      title: "O Rosário Hoje",
      period: "Século XXI",
      content: [
        "Hoje, o Rosário continua sendo uma das devoções mais praticadas pelos católicos em todo o mundo. Milhões de fiéis rezam diariamente, seja em igrejas, em família, individualmente ou através de aplicativos e plataformas digitais.",
        "O Rosário transcendeu gerações e culturas, mantendo-se como uma oração simples, mas profundamente contemplativa, que une os católicos em oração pela paz mundial, pela conversão dos pecadores e pelas necessidades da Igreja."
      ],
      highlight: false
    }
  ];

  const popes = [
    { name: "Papa Leão XIII", description: "Escreveu 12 encíclicas sobre o Rosário e o chamou de \"a mais excelente forma de oração\"" },
    { name: "Papa Pio XI", description: "Chamou o Rosário de \"o compêndio de todo o Evangelho\"" },
    { name: "Papa Paulo VI", description: "Dedicou a exortação apostólica \"Marialis Cultus\" ao Rosário" },
    { name: "Papa Francisco", description: "Sempre carrega um terço no bolso e incentiva os fiéis a rezarem em família" }
  ];

  return (
    <PageTransition>
      <main className="min-h-screen bg-background">
        <PageHeader 
        title="História do Rosário"
        subtitle="A origem e evolução de uma das orações mais amadas"
        icon="📜"
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        {/* Intro Section - Rosário Vivo Approach */}
        <section className="mb-12">
          <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-gold-500/5 to-gold-600/5 border border-gold-500/20">
            <p className="text-lg text-muted-foreground leading-relaxed">
              Por mais de 800 anos, o Rosário tem sido a oração do povo de Deus — de reis e camponeses, de santos e pecadores. 
              Conhecer sua história nos ajuda a <span className="text-gold-600 dark:text-gold-400 font-semibold">viver esta tradição viva</span>, 
              compreendendo que fazemos parte de uma corrente ininterrupta de fé que atravessa os séculos.
            </p>
          </div>
        </section>

        {/* Timeline */}
        <section className="space-y-6">
          {timeline.map((item, index) => (
            <div 
              key={index}
              className={`p-6 sm:p-8 rounded-2xl transition-all duration-300 hover:-translate-y-0.5 ${
                item.highlight 
                  ? "bg-gradient-to-br from-gold-500/10 to-gold-600/5 dark:from-gold-500/15 dark:to-gold-600/10 border border-gold-500/20" 
                  : "glass sacred-border"
              }`}
              data-testid={`timeline-${index}`}
            >
              <div className="flex items-start gap-4 mb-4">
                <div className={`w-14 h-14 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center text-2xl sm:text-3xl flex-shrink-0 shadow-lg ${
                  item.highlight 
                    ? "bg-gradient-to-br from-gold-500 to-gold-600"
                    : "bg-gradient-to-br from-sacred-blue to-slate-700"
                }`}>
                  {item.icon}
                </div>
                <div>
                  <h2 className="text-xl sm:text-2xl font-cinzel font-bold text-foreground">
                    {item.title}
                  </h2>
                  <p className="text-gold-600 dark:text-gold-400 font-semibold text-sm mt-1">
                    {item.period}
                  </p>
                </div>
              </div>
              
              <div className="space-y-4">
                {item.content.map((paragraph, i) => (
                  <p key={i} className="text-muted-foreground leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>
              
              {item.quote && (
                <div className="mt-6 p-4 rounded-xl bg-card border-l-4 border-gold-500">
                  <p className="text-foreground italic">
                    {item.quote}
                  </p>
                </div>
              )}
              
              {item.badge && (
                <div className="mt-6 p-4 rounded-xl bg-gradient-to-r from-sacred-blue to-slate-700 text-white text-center font-semibold">
                  {item.badge}
                </div>
              )}
            </div>
          ))}
        </section>

        {/* Papal Endorsements */}
        <section className="mt-12">
          <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-sacred-blue via-slate-800 to-slate-900 text-white">
            <h2 className="text-2xl sm:text-3xl font-cinzel font-bold mb-8 text-center">
              Papas e o Santo <span className="text-gold-400">Rosário</span>
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {popes.map((pope, i) => (
                <div key={i} className="p-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
                  <p className="font-cinzel font-bold text-gold-400 mb-2">{pope.name}</p>
                  <p className="text-white/80 text-sm">{pope.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="mt-12 text-center">
          <div className="p-8 sm:p-10 rounded-3xl glass sacred-border">
            <h3 className="text-2xl font-cinzel font-bold text-foreground mb-4">
              Continue sua jornada de fé
            </h3>
            <p className="text-muted-foreground mb-6">
              Aprenda a rezar e junte-se à tradição milenar do Santo Rosário
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
                className="rounded-full px-8 py-6 text-lg font-semibold border-gold-500/30 text-foreground hover:bg-gold-500/10"
                data-testid="cta-home"
              >
                Voltar ao início
              </Button>
            </div>
          </div>
        </section>
      </div>
    </main>
    </PageTransition>
  );
}
