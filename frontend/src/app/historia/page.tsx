"use client";

import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function HistoriaPage() {
  const router = useRouter();

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-600 to-blue-700 text-white py-6 sm:py-8 px-4 sm:px-6 lg:px-8 shadow-lg">
        <div className="max-w-4xl mx-auto">
          <Button
            variant="ghost"
            className="text-white hover:bg-white/20 mb-4"
            onClick={() => router.push("/")}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar
          </Button>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-2">
            📜 História do Rosário
          </h1>
          <p className="text-blue-100 text-lg">
            A origem e evolução de uma das orações mais amadas da Igreja Católica
          </p>
        </div>
      </header>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Timeline */}
        <section className="space-y-8">
          {/* Ancient Origins */}
          <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg border-l-4 border-blue-600">
            <div className="flex items-start gap-4 mb-4">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-600 to-blue-700 text-white flex items-center justify-center font-bold flex-shrink-0">
                📿
              </div>
              <div>
                <h2 className="text-2xl font-bold text-blue-900 mb-2">
                  Origens Antigas
                </h2>
                <p className="text-blue-600 font-semibold">Séculos III-XII</p>
              </div>
            </div>
            <p className="text-blue-700 leading-relaxed mb-4">
              Desde os primeiros séculos do cristianismo, os monges do deserto já utilizavam pedras ou grãos para contar orações repetitivas. Os Pais do Deserto recitavam os 150 Salmos de Davi como forma de oração contínua.
            </p>
            <p className="text-blue-700 leading-relaxed">
              Para os fiéis que não sabiam ler ou memorizar os salmos, surgiu a prática de rezar 150 Ave Marias (ou Pai Nossos), usando cordas com nós ou pedras para manter a contagem. Esta prática ficou conhecida como "Saltério de Maria".
            </p>
          </div>

          {/* São Domingos */}
          <div className="bg-gradient-to-br from-gold-light to-white p-6 sm:p-8 rounded-2xl shadow-lg border-l-4 border-gold">
            <div className="flex items-start gap-4 mb-4">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-gold to-gold-dark text-white flex items-center justify-center font-bold flex-shrink-0">
                ✝️
              </div>
              <div>
                <h2 className="text-2xl font-bold text-blue-900 mb-2">
                  São Domingos de Gusmão
                </h2>
                <p className="text-blue-600 font-semibold">1208-1221</p>
              </div>
            </div>
            <p className="text-blue-700 leading-relaxed mb-4">
              Segundo a tradição católica, a Virgem Maria apareceu a São Domingos de Gusmão em 1208, durante sua missão contra a heresia albigense no sul da França. Ela lhe entregou o Rosário como uma arma poderosa contra as heresias e o pecado.
            </p>
            <p className="text-blue-700 leading-relaxed mb-4">
              São Domingos começou a pregar o Rosário como forma de meditação dos mistérios da vida de Cristo, combinando a oração vocal com a contemplação. Ele organizou a oração em três grupos de cinco mistérios cada: Gozosos, Dolorosos e Gloriosos.
            </p>
            <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-600">
              <p className="text-blue-800 italic">
                "Uma só Ave Maria bem rezada faz tremer todo o inferno." - São Domingos de Gusmão
              </p>
            </div>
          </div>

          {/* Batalha de Lepanto */}
          <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg border-l-4 border-blue-600">
            <div className="flex items-start gap-4 mb-4">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-600 to-blue-700 text-white flex items-center justify-center font-bold flex-shrink-0">
                ⚔️
              </div>
              <div>
                <h2 className="text-2xl font-bold text-blue-900 mb-2">
                  Batalha de Lepanto
                </h2>
                <p className="text-blue-600 font-semibold">7 de Outubro de 1571</p>
              </div>
            </div>
            <p className="text-blue-700 leading-relaxed mb-4">
              A vitória da frota cristã sobre o Império Otomano na Batalha de Lepanto é atribuída à intercessão de Nossa Senhora do Rosário. O Papa Pio V havia pedido que todos os cristãos rezassem o Rosário antes da batalha.
            </p>
            <p className="text-blue-700 leading-relaxed mb-4">
              Contra todas as expectativas, a frota cristã obteve uma vitória decisiva. Em agradecimento, o Papa instituiu a festa de Nossa Senhora das Vitórias (depois chamada de Nossa Senhora do Rosário) em 7 de outubro.
            </p>
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-4 rounded-lg">
              <p className="font-semibold text-center">
                🎊 Dia de Nossa Senhora do Rosário: 7 de Outubro
              </p>
            </div>
          </div>

          {/* Santo Alan de La Roche */}
          <div className="bg-gradient-to-br from-gold-light to-white p-6 sm:p-8 rounded-2xl shadow-lg border-l-4 border-gold">
            <div className="flex items-start gap-4 mb-4">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-gold to-gold-dark text-white flex items-center justify-center font-bold flex-shrink-0">
                📖
              </div>
              <div>
                <h2 className="text-2xl font-bold text-blue-900 mb-2">
                  Renovação e Popularização
                </h2>
                <p className="text-blue-600 font-semibold">Século XV</p>
              </div>
            </div>
            <p className="text-blue-700 leading-relaxed mb-4">
              No século XV, o dominicano Alano de la Roche (Alan de La Roche) trabalhou intensamente para renovar a devoção ao Rosário, que havia diminuído. Ele fundou confraternidades do Rosário e escreveu extensivamente sobre seus benefícios espirituais.
            </p>
            <p className="text-blue-700 leading-relaxed">
              Através dos dominicanos, a devoção se espalhou rapidamente por toda a Europa, tornando-se uma das práticas mais populares entre os católicos de todas as classes sociais.
            </p>
          </div>

          {/* Papa João Paulo II */}
          <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg border-l-4 border-blue-600">
            <div className="flex items-start gap-4 mb-4">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-600 to-blue-700 text-white flex items-center justify-center font-bold flex-shrink-0">
                🌟
              </div>
              <div>
                <h2 className="text-2xl font-bold text-blue-900 mb-2">
                  Mistérios Luminosos
                </h2>
                <p className="text-blue-600 font-semibold">16 de Outubro de 2002</p>
              </div>
            </div>
            <p className="text-blue-700 leading-relaxed mb-4">
              O Papa São João Paulo II, grande devoto do Rosário, acrescentou os Mistérios Luminosos (ou da Luz) na Carta Apostólica "Rosarium Virginis Mariae" em 2002. Estes novos mistérios meditam sobre a vida pública de Jesus.
            </p>
            <p className="text-blue-700 leading-relaxed mb-4">
              Com esta adição, o Rosário passou a ter 20 mistérios (antes eram 15), representando os 200 anos desde a instituição da festa de Nossa Senhora do Rosário.
            </p>
            <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-600">
              <p className="text-blue-800 italic">
                "O Rosário é a minha oração preferida. É uma oração maravilhosa. Maravilhosa na sua simplicidade e na sua profundidade." - Papa São João Paulo II
              </p>
            </div>
          </div>

          {/* Fátima */}
          <div className="bg-gradient-to-br from-gold-light to-white p-6 sm:p-8 rounded-2xl shadow-lg border-l-4 border-gold">
            <div className="flex items-start gap-4 mb-4">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-gold to-gold-dark text-white flex items-center justify-center font-bold flex-shrink-0">
                👼
              </div>
              <div>
                <h2 className="text-2xl font-bold text-blue-900 mb-2">
                  Aparições de Fátima
                </h2>
                <p className="text-blue-600 font-semibold">1917</p>
              </div>
            </div>
            <p className="text-blue-700 leading-relaxed mb-4">
              Durante as aparições de Fátima em Portugal, Nossa Senhora pediu insistentemente aos três pastorinhos que rezassem o Rosário todos os dias pela paz no mundo e pela conversão dos pecadores.
            </p>
            <p className="text-blue-700 leading-relaxed mb-4">
              A mensagem de Fátima renovou a devoção ao Rosário no século XX e continua inspirando milhões de católicos a rezarem diariamente.
            </p>
            <div className="bg-gradient-to-r from-gold to-gold-dark text-white p-4 rounded-lg">
              <p className="italic text-center">
                "Rezem o terço todos os dias, para alcançarem a paz para o mundo e o fim da guerra."
              </p>
              <p className="text-center text-sm mt-2 font-semibold">
                - Nossa Senhora de Fátima, 13 de maio de 1917
              </p>
            </div>
          </div>

          {/* Modern Day */}
          <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg border-l-4 border-blue-600">
            <div className="flex items-start gap-4 mb-4">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-600 to-blue-700 text-white flex items-center justify-center font-bold flex-shrink-0">
                🌍
              </div>
              <div>
                <h2 className="text-2xl font-bold text-blue-900 mb-2">
                  O Rosário Hoje
                </h2>
                <p className="text-blue-600 font-semibold">Século XXI</p>
              </div>
            </div>
            <p className="text-blue-700 leading-relaxed mb-4">
              Hoje, o Rosário continua sendo uma das devoções mais praticadas pelos católicos em todo o mundo. Milhões de fiéis rezam diariamente, seja em igrejas, em família, individualmente ou através de aplicativos e plataformas digitais.
            </p>
            <p className="text-blue-700 leading-relaxed">
              O Rosário transcendeu gerações e culturas, mantendo-se como uma oração simples, mas profundamente contemplativa, que une os católicos em oração pela paz mundial, pela conversão dos pecadores e pelas necessidades da Igreja.
            </p>
          </div>
        </section>

        {/* Papal Endorsements */}
        <section className="mt-12">
          <div className="bg-gradient-to-br from-blue-600 to-blue-700 text-white p-6 sm:p-8 rounded-2xl shadow-xl">
            <h2 className="text-2xl font-bold mb-6 text-center">
              Papas e o Santo Rosário
            </h2>
            <div className="space-y-4">
              <div className="bg-white/10 p-4 rounded-lg backdrop-blur-sm">
                <p className="font-semibold mb-2">Papa Leão XIII</p>
                <p className="text-sm">Escreveu 12 encíclicas sobre o Rosário e o chamou de "a mais excelente forma de oração"</p>
              </div>
              <div className="bg-white/10 p-4 rounded-lg backdrop-blur-sm">
                <p className="font-semibold mb-2">Papa Pio XI</p>
                <p className="text-sm">Chamou o Rosário de "o compêndio de todo o Evangelho"</p>
              </div>
              <div className="bg-white/10 p-4 rounded-lg backdrop-blur-sm">
                <p className="font-semibold mb-2">Papa Paulo VI</p>
                <p className="text-sm">Dedicou a exortação apostólica "Marialis Cultus" ao Rosário</p>
              </div>
              <div className="bg-white/10 p-4 rounded-lg backdrop-blur-sm">
                <p className="font-semibold mb-2">Papa Francisco</p>
                <p className="text-sm">Sempre carrega um terço no bolso e incentiva os fiéis a rezarem em família</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="mt-12 text-center">
          <div className="bg-gradient-to-br from-gold-light to-white p-8 rounded-2xl border-2 border-gold">
            <h3 className="text-2xl font-bold text-blue-900 mb-4">
              Continue sua jornada de fé
            </h3>
            <p className="text-blue-700 mb-6">
              Aprenda a rezar e junte-se à tradição milenar do Santo Rosário
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white"
                onClick={() => router.push("/como-rezar")}
              >
                Como rezar o Rosário
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-blue-600 text-blue-600 hover:bg-blue-50"
                onClick={() => router.push("/")}
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
