"use client";

import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function OracoesPage() {
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
            🙏 Orações Tradicionais
          </h1>
          <p className="text-blue-100 text-lg">
            As orações essenciais para rezar o Santo Rosário
          </p>
        </div>
      </header>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Introduction */}
        <section className="mb-8">
          <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg border-2 border-blue-200">
            <p className="text-blue-700 leading-relaxed">
              Estas são as orações tradicionais que compõem o Santo Rosário. Aprenda-as de cor para poder rezar com devoção e meditação profunda.
            </p>
          </div>
        </section>

        {/* Sinal da Cruz */}
        <section className="mb-8">
          <div className="bg-gradient-to-br from-blue-50 to-white p-6 sm:p-8 rounded-2xl shadow-lg border-l-4 border-blue-600">
            <div className="flex items-start gap-4 mb-4">
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-600 to-blue-700 text-white flex items-center justify-center text-2xl flex-shrink-0">
                ✝️
              </div>
              <div>
                <h2 className="text-2xl font-bold text-blue-900 mb-1">
                  Sinal da Cruz
                </h2>
                <p className="text-sm text-blue-600">Início e fim do Rosário</p>
              </div>
            </div>
            <div className="bg-white p-5 rounded-xl border border-blue-200">
              <p className="text-blue-800 leading-relaxed text-lg">
                Pelo sinal da Santa Cruz,<br />
                livrai-nos, Deus Nosso Senhor,<br />
                dos nossos inimigos.<br />
                <br />
                Em nome do Pai,<br />
                do Filho<br />
                e do Espírito Santo.<br />
                <strong>Amém.</strong>
              </p>
            </div>
          </div>
        </section>

        {/* Credo */}
        <section className="mb-8">
          <div className="bg-gradient-to-br from-gold-light to-white p-6 sm:p-8 rounded-2xl shadow-lg border-l-4 border-gold">
            <div className="flex items-start gap-4 mb-4">
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-gold to-gold-dark text-white flex items-center justify-center text-2xl flex-shrink-0">
                📖
              </div>
              <div>
                <h2 className="text-2xl font-bold text-blue-900 mb-1">
                  Credo Apostólico
                </h2>
                <p className="text-sm text-blue-600">Rezado no crucifixo</p>
              </div>
            </div>
            <div className="bg-white p-5 rounded-xl border border-gold/30">
              <p className="text-blue-800 leading-relaxed text-lg">
                Creio em Deus Pai todo-poderoso,<br />
                criador do céu e da terra.<br />
                <br />
                E em Jesus Cristo, seu único Filho, Nosso Senhor,<br />
                que foi concebido pelo poder do Espírito Santo;<br />
                nasceu da Virgem Maria;<br />
                padeceu sob Pôncio Pilatos,<br />
                foi crucificado, morto e sepultado;<br />
                desceu à mansão dos mortos;<br />
                ressuscitou ao terceiro dia;<br />
                subiu aos céus;<br />
                está sentado à direita de Deus Pai todo-poderoso,<br />
                de onde há de vir a julgar os vivos e os mortos.<br />
                <br />
                Creio no Espírito Santo;<br />
                na Santa Igreja Católica;<br />
                na comunhão dos santos;<br />
                na remissão dos pecados;<br />
                na ressurreição da carne;<br />
                na vida eterna.<br />
                <strong>Amém.</strong>
              </p>
            </div>
          </div>
        </section>

        {/* Pai Nosso */}
        <section className="mb-8">
          <div className="bg-gradient-to-br from-blue-50 to-white p-6 sm:p-8 rounded-2xl shadow-lg border-l-4 border-blue-600">
            <div className="flex items-start gap-4 mb-4">
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-600 to-blue-700 text-white flex items-center justify-center text-2xl flex-shrink-0">
                👨
              </div>
              <div>
                <h2 className="text-2xl font-bold text-blue-900 mb-1">
                  Pai Nosso
                </h2>
                <p className="text-sm text-blue-600">Antes de cada dezena</p>
              </div>
            </div>
            <div className="bg-white p-5 rounded-xl border border-blue-200">
              <p className="text-blue-800 leading-relaxed text-lg">
                Pai Nosso, que estais nos Céus,<br />
                santificado seja o Vosso Nome,<br />
                venha a nós o Vosso Reino,<br />
                seja feita a Vossa vontade<br />
                assim na terra como no Céu.<br />
                <br />
                O pão nosso de cada dia nos dai hoje,<br />
                perdoai-nos as nossas ofensas<br />
                assim como nós perdoamos a quem nos tem ofendido,<br />
                e não nos deixeis cair em tentação,<br />
                mas livrai-nos do mal.<br />
                <strong>Amém.</strong>
              </p>
            </div>
          </div>
        </section>

        {/* Ave Maria */}
        <section className="mb-8">
          <div className="bg-gradient-to-br from-gold-light to-white p-6 sm:p-8 rounded-2xl shadow-lg border-l-4 border-gold">
            <div className="flex items-start gap-4 mb-4">
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-gold to-gold-dark text-white flex items-center justify-center text-2xl flex-shrink-0">
                👸
              </div>
              <div>
                <h2 className="text-2xl font-bold text-blue-900 mb-1">
                  Ave Maria
                </h2>
                <p className="text-sm text-blue-600">Dez vezes em cada dezena</p>
              </div>
            </div>
            <div className="bg-white p-5 rounded-xl border border-gold/30">
              <p className="text-blue-800 leading-relaxed text-lg">
                Ave Maria, cheia de graça,<br />
                o Senhor é convosco,<br />
                bendita sois vós entre as mulheres<br />
                e bendito é o fruto do vosso ventre, Jesus.<br />
                <br />
                Santa Maria, Mãe de Deus,<br />
                rogai por nós pecadores,<br />
                agora e na hora da nossa morte.<br />
                <strong>Amém.</strong>
              </p>
            </div>
          </div>
        </section>

        {/* Glória ao Pai */}
        <section className="mb-8">
          <div className="bg-gradient-to-br from-blue-50 to-white p-6 sm:p-8 rounded-2xl shadow-lg border-l-4 border-blue-600">
            <div className="flex items-start gap-4 mb-4">
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-600 to-blue-700 text-white flex items-center justify-center text-2xl flex-shrink-0">
                ✨
              </div>
              <div>
                <h2 className="text-2xl font-bold text-blue-900 mb-1">
                  Glória ao Pai
                </h2>
                <p className="text-sm text-blue-600">Após cada dezena</p>
              </div>
            </div>
            <div className="bg-white p-5 rounded-xl border border-blue-200">
              <p className="text-blue-800 leading-relaxed text-lg">
                Glória ao Pai,<br />
                ao Filho<br />
                e ao Espírito Santo.<br />
                <br />
                Como era no princípio,<br />
                agora e sempre.<br />
                <strong>Amém.</strong>
              </p>
            </div>
          </div>
        </section>

        {/* Ó Meu Jesus (Oração de Fátima) */}
        <section className="mb-8">
          <div className="bg-gradient-to-br from-gold-light to-white p-6 sm:p-8 rounded-2xl shadow-lg border-l-4 border-gold">
            <div className="flex items-start gap-4 mb-4">
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-gold to-gold-dark text-white flex items-center justify-center text-2xl flex-shrink-0">
                🔥
              </div>
              <div>
                <h2 className="text-2xl font-bold text-blue-900 mb-1">
                  Ó Meu Jesus
                </h2>
                <p className="text-sm text-blue-600">Oração de Fátima - após cada dezena</p>
              </div>
            </div>
            <div className="bg-white p-5 rounded-xl border border-gold/30">
              <p className="text-blue-800 leading-relaxed text-lg">
                Ó meu Jesus,<br />
                perdoai-nos,<br />
                livrai-nos do fogo do inferno,<br />
                levai as almas todas para o Céu,<br />
                principalmente as que mais precisarem<br />
                da Vossa misericórdia.
              </p>
            </div>
            <div className="mt-4 bg-blue-50 p-4 rounded-lg">
              <p className="text-blue-700 text-sm">
                <strong>💡 Nota:</strong> Esta oração foi ensinada por Nossa Senhora aos três pastorinhos em Fátima, em 1917.
              </p>
            </div>
          </div>
        </section>

        {/* Salve Rainha */}
        <section className="mb-8">
          <div className="bg-gradient-to-br from-blue-50 to-white p-6 sm:p-8 rounded-2xl shadow-lg border-l-4 border-blue-600">
            <div className="flex items-start gap-4 mb-4">
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-600 to-blue-700 text-white flex items-center justify-center text-2xl flex-shrink-0">
                👑
              </div>
              <div>
                <h2 className="text-2xl font-bold text-blue-900 mb-1">
                  Salve Rainha
                </h2>
                <p className="text-sm text-blue-600">Ao final do Rosário</p>
              </div>
            </div>
            <div className="bg-white p-5 rounded-xl border border-blue-200">
              <p className="text-blue-800 leading-relaxed text-lg">
                Salve, Rainha, Mãe de misericórdia,<br />
                vida, doçura e esperança nossa, salve!<br />
                <br />
                A vós bradamos,<br />
                os degredados filhos de Eva.<br />
                <br />
                A vós suspiramos,<br />
                gemendo e chorando neste vale de lágrimas.<br />
                <br />
                Eia, pois, advogada nossa,<br />
                esses vossos olhos misericordiosos a nós volvei.<br />
                <br />
                E depois deste desterro<br />
                mostrai-nos Jesus,<br />
                bendito fruto do vosso ventre.<br />
                <br />
                Ó clemente, ó piedosa,<br />
                ó doce sempre Virgem Maria.<br />
                <br />
                <strong>V.</strong> Rogai por nós, Santa Mãe de Deus.<br />
                <strong>R.</strong> Para que sejamos dignos das promessas de Cristo.
              </p>
            </div>
          </div>
        </section>

        {/* Oração Final */}
        <section className="mb-8">
          <div className="bg-gradient-to-br from-gold-light to-white p-6 sm:p-8 rounded-2xl shadow-lg border-l-4 border-gold">
            <div className="flex items-start gap-4 mb-4">
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-gold to-gold-dark text-white flex items-center justify-center text-2xl flex-shrink-0">
                🙏
              </div>
              <div>
                <h2 className="text-2xl font-bold text-blue-900 mb-1">
                  Oração Final
                </h2>
                <p className="text-sm text-blue-600">Opcional - após a Salve Rainha</p>
              </div>
            </div>
            <div className="bg-white p-5 rounded-xl border border-gold/30">
              <p className="text-blue-800 leading-relaxed text-lg">
                <strong>Oremos:</strong><br />
                <br />
                Ó Deus, cujo Filho Unigênito,<br />
                por sua vida, morte e ressurreição,<br />
                nos obteve o prêmio da salvação eterna,<br />
                concedei-nos, nós vos pedimos,<br />
                que meditando estes mistérios<br />
                do santíssimo Rosário da Bem-aventurada Virgem Maria,<br />
                imitemos o que eles contêm<br />
                e alcancemos o que eles prometem.<br />
                <br />
                Por Cristo, Nosso Senhor.<br />
                <strong>Amém.</strong>
              </p>
            </div>
          </div>
        </section>

        {/* Outras Orações Opcionais */}
        <section className="mb-8">
          <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg border-2 border-blue-200">
            <h2 className="text-2xl font-bold text-blue-900 mb-6 text-center">
              Orações Opcionais
            </h2>
            
            {/* Jaculatória */}
            <div className="mb-6">
              <h3 className="text-lg font-bold text-blue-900 mb-3 flex items-center gap-2">
                <span className="text-xl">💫</span>
                Jaculatórias (após anunciar o mistério)
              </h3>
              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="text-blue-800 mb-2">
                  <strong>Para todos os mistérios:</strong>
                </p>
                <p className="text-blue-700 italic">
                  "Por este mistério e pela Vossa Santa Intercessão, dai-nos, Senhor, [virtude correspondente ao mistério] e aumentai em nós os dons do Espírito Santo."
                </p>
              </div>
            </div>

            {/* Oferecimento */}
            <div>
              <h3 className="text-lg font-bold text-blue-900 mb-3 flex items-center gap-2">
                <span className="text-xl">🎁</span>
                Oferecimento do Rosário
              </h3>
              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="text-blue-700 italic">
                  "Divino Jesus, eu vos ofereço este Rosário que vou rezar, meditando nos mistérios da Vossa Redenção. Concedei-me, pela intercessão de Maria, Vossa Mãe Santíssima, a quem me dirijo, as graças necessárias para bem rezá-lo e alcançar a indulgência. Eu vo-lo ofereço especialmente por [suas intenções]. Glória ao Pai..."
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Tips Section */}
        <section className="mb-8">
          <div className="bg-gradient-to-br from-blue-600 to-blue-700 text-white p-6 sm:p-8 rounded-2xl shadow-xl">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <span>💡</span>
              Dicas para memorizar
            </h2>
            <ul className="space-y-3 text-blue-50">
              <li className="flex items-start gap-3">
                <span className="text-gold text-xl flex-shrink-0">•</span>
                <span>Reze devagar e com atenção, focando no significado das palavras</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-gold text-xl flex-shrink-0">•</span>
                <span>Pratique uma oração de cada vez até decorá-la completamente</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-gold text-xl flex-shrink-0">•</span>
                <span>Reze junto com áudios ou vídeos do Rosário até aprender</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-gold text-xl flex-shrink-0">•</span>
                <span>Tenha esta página salva para consultar quando necessário</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-gold text-xl flex-shrink-0">•</span>
                <span>Com o tempo, as orações se tornarão naturais e automáticas</span>
              </li>
            </ul>
          </div>
        </section>

        {/* CTA */}
        <section className="text-center">
          <div className="bg-gradient-to-br from-gold-light to-white p-8 rounded-2xl border-2 border-gold shadow-xl">
            <h3 className="text-2xl font-bold text-blue-900 mb-4">
              Pronto para começar?
            </h3>
            <p className="text-blue-700 mb-6">
              Aprenda o passo a passo completo para rezar o Santo Rosário
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
                onClick={() => router.push("/misterios-do-dia")}
              >
                Ver Mistérios
              </Button>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
