"use client";

import { Button } from "@/components/ui/button";
import { ArrowLeft, Check } from "lucide-react";
import { useRouter } from "next/navigation";

export default function ComoRezarPage() {
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
            📖 Como Rezar o Terço
          </h1>
          <p className="text-blue-100 text-lg">
            Guia passo a passo para rezar o Santo Rosário
          </p>
        </div>
      </header>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Introduction */}
        <section className="mb-12">
          <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg border-2 border-blue-200">
            <h2 className="text-2xl sm:text-3xl font-bold text-blue-900 mb-4">
              O que você precisa
            </h2>
            <ul className="space-y-3 text-blue-700">
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 mt-1 text-gold flex-shrink-0" />
                <span>Um terço (rosário) ou os dedos para contar</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 mt-1 text-gold flex-shrink-0" />
                <span>15-20 minutos de tempo tranquilo</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 mt-1 text-gold flex-shrink-0" />
                <span>Um lugar calmo para meditar</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 mt-1 text-gold flex-shrink-0" />
                <span>Coração aberto para a oração</span>
              </li>
            </ul>
          </div>
        </section>

        {/* Steps */}
        <section className="space-y-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-blue-900 mb-6">
            Passo a Passo
          </h2>

          <div className="bg-gradient-to-br from-blue-50 to-white p-6 sm:p-8 rounded-2xl border-2 border-blue-200">
            <div className="flex gap-4 items-start">
              <div className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-xl flex-shrink-0">
                1
              </div>
              <div>
                <h3 className="text-xl font-bold text-blue-900 mb-2">
                  Comece pelo Sinal da Cruz
                </h3>
                <p className="text-blue-700 mb-3">
                  Segure o crucifixo e faça o sinal da cruz enquanto reza:
                </p>
                <div className="bg-white p-4 rounded-lg border border-blue-200 italic">
                  "Pelo sinal da Santa Cruz, livrai-nos, Deus Nosso Senhor, dos nossos inimigos. Em nome do Pai, do Filho e do Espírito Santo. Amém."
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-gold-light to-white p-6 sm:p-8 rounded-2xl border-2 border-gold/30">
            <div className="flex gap-4 items-start">
              <div className="w-12 h-12 rounded-full bg-gold text-white flex items-center justify-center font-bold text-xl flex-shrink-0">
                2
              </div>
              <div>
                <h3 className="text-xl font-bold text-blue-900 mb-2">
                  Reze o Credo
                </h3>
                <p className="text-blue-700 mb-3">
                  Ainda no crucifixo, reze o Credo Apostólico completo.
                </p>
                <Button
                  variant="outline"
                  className="text-blue-600 border-blue-300"
                  onClick={() => router.push("/oracoes-tradicionais")}
                >
                  Ver texto completo do Credo
                </Button>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-blue-50 to-white p-6 sm:p-8 rounded-2xl border-2 border-blue-200">
            <div className="flex gap-4 items-start">
              <div className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-xl flex-shrink-0">
                3
              </div>
              <div>
                <h3 className="text-xl font-bold text-blue-900 mb-2">
                  Pai Nosso (1x)
                </h3>
                <p className="text-blue-700">
                  Na primeira conta grande após o crucifixo, reze um Pai Nosso.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-gold-light to-white p-6 sm:p-8 rounded-2xl border-2 border-gold/30">
            <div className="flex gap-4 items-start">
              <div className="w-12 h-12 rounded-full bg-gold text-white flex items-center justify-center font-bold text-xl flex-shrink-0">
                4
              </div>
              <div>
                <h3 className="text-xl font-bold text-blue-900 mb-2">
                  Ave Maria (3x)
                </h3>
                <p className="text-blue-700 mb-3">
                  Nas três contas seguintes, reze três Ave Marias:
                </p>
                <ul className="space-y-2 text-blue-700">
                  <li className="flex items-start gap-2">
                    <span className="text-gold">•</span>
                    <span>Pela fé</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-gold">•</span>
                    <span>Pela esperança</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-gold">•</span>
                    <span>Pela caridade</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-blue-50 to-white p-6 sm:p-8 rounded-2xl border-2 border-blue-200">
            <div className="flex gap-4 items-start">
              <div className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-xl flex-shrink-0">
                5
              </div>
              <div>
                <h3 className="text-xl font-bold text-blue-900 mb-2">
                  Glória ao Pai
                </h3>
                <p className="text-blue-700 mb-3">
                  Reze o Glória ao Pai:
                </p>
                <div className="bg-white p-4 rounded-lg border border-blue-200 italic">
                  "Glória ao Pai, ao Filho e ao Espírito Santo. Como era no princípio, agora e sempre. Amém."
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-gold-light to-white p-6 sm:p-8 rounded-2xl border-2 border-gold/30">
            <div className="flex gap-4 items-start">
              <div className="w-12 h-12 rounded-full bg-gold text-white flex items-center justify-center font-bold text-xl flex-shrink-0">
                6
              </div>
              <div>
                <h3 className="text-xl font-bold text-blue-900 mb-2">
                  Anuncie o Primeiro Mistério
                </h3>
                <p className="text-blue-700 mb-3">
                  Anuncie o primeiro mistério do dia e medite sobre ele enquanto reza.
                </p>
                <Button
                  variant="outline"
                  className="text-blue-600 border-blue-300"
                  onClick={() => router.push("/misterios-do-dia")}
                >
                  Ver mistérios de cada dia
                </Button>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-blue-50 to-white p-6 sm:p-8 rounded-2xl border-2 border-blue-200">
            <div className="flex gap-4 items-start">
              <div className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-xl flex-shrink-0">
                7
              </div>
              <div>
                <h3 className="text-xl font-bold text-blue-900 mb-2">
                  Reze uma Dezena
                </h3>
                <p className="text-blue-700 mb-3">
                  Para cada mistério, reze:
                </p>
                <ul className="space-y-2 text-blue-700">
                  <li className="flex items-start gap-2">
                    <span className="text-gold font-bold">1x</span>
                    <span>Pai Nosso (na conta grande)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-gold font-bold">10x</span>
                    <span>Ave Maria (nas 10 contas pequenas)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-gold font-bold">1x</span>
                    <span>Glória ao Pai</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-gold font-bold">1x</span>
                    <span>Ó meu Jesus (oração de Fátima)</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-gold-light to-white p-6 sm:p-8 rounded-2xl border-2 border-gold/30">
            <div className="flex gap-4 items-start">
              <div className="w-12 h-12 rounded-full bg-gold text-white flex items-center justify-center font-bold text-xl flex-shrink-0">
                8
              </div>
              <div>
                <h3 className="text-xl font-bold text-blue-900 mb-2">
                  Repita para os 5 Mistérios
                </h3>
                <p className="text-blue-700">
                  Repita os passos 6 e 7 para cada um dos cinco mistérios do dia (total de 5 dezenas).
                </p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-blue-50 to-white p-6 sm:p-8 rounded-2xl border-2 border-blue-200">
            <div className="flex gap-4 items-start">
              <div className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-xl flex-shrink-0">
                9
              </div>
              <div>
                <h3 className="text-xl font-bold text-blue-900 mb-2">
                  Finalize com Salve Rainha
                </h3>
                <p className="text-blue-700 mb-3">
                  Após os cinco mistérios, reze a Salve Rainha:
                </p>
                <div className="bg-white p-4 rounded-lg border border-blue-200 italic">
                  "Salve, Rainha, Mãe de misericórdia, vida, doçura e esperança nossa, salve!..."
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-gold-light to-white p-6 sm:p-8 rounded-2xl border-2 border-gold/30">
            <div className="flex gap-4 items-start">
              <div className="w-12 h-12 rounded-full bg-gold text-white flex items-center justify-center font-bold text-xl flex-shrink-0">
                10
              </div>
              <div>
                <h3 className="text-xl font-bold text-blue-900 mb-2">
                  Encerre com o Sinal da Cruz
                </h3>
                <p className="text-blue-700">
                  Faça o sinal da cruz para encerrar sua oração do terço.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Tips */}
        <section className="mt-12">
          <div className="bg-gradient-to-br from-blue-600 to-blue-700 text-white p-6 sm:p-8 rounded-2xl shadow-xl">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <span>💡</span>
              Dicas para uma oração profunda
            </h2>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 mt-1 flex-shrink-0" />
                <span>Reze devagar, meditando sobre cada mistério</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 mt-1 flex-shrink-0" />
                <span>Escolha um horário fixo do dia para criar o hábito</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 mt-1 flex-shrink-0" />
                <span>Reze em família sempre que possível</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 mt-1 flex-shrink-0" />
                <span>Ofereça suas intenções no início da oração</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 mt-1 flex-shrink-0" />
                <span>Use uma imagem ou ícone religioso para ajudar na concentração</span>
              </li>
            </ul>
          </div>
        </section>

        {/* CTA */}
        <section className="mt-12 text-center">
          <div className="bg-gradient-to-br from-gold-light to-white p-8 rounded-2xl border-2 border-gold">
            <h3 className="text-2xl font-bold text-blue-900 mb-4">
              Pronto para começar?
            </h3>
            <p className="text-blue-700 mb-6">
              Junte-se à nossa comunidade e registre suas orações diárias
            </p>
            <Button
              size="lg"
              className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white"
              onClick={() => router.push("/")}
            >
              Ir para a página inicial
            </Button>
          </div>
        </section>
      </div>
    </main>
  );
}
