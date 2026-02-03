"use client";

import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function MisteriosPage() {
  const router = useRouter();

  const getDayOfWeek = () => {
    const days = ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado'];
    const today = new Date().getDay();
    return days[today];
  };

  const getMysteryOfDay = () => {
    const day = new Date().getDay();
    // 0 = Domingo, 1 = Segunda, 2 = Terça, 3 = Quarta, 4 = Quinta, 5 = Sexta, 6 = Sábado
    if (day === 0 || day === 3) return 'gloriosos'; // Domingo e Quarta
    if (day === 1 || day === 6) return 'gozosos'; // Segunda e Sábado
    if (day === 2 || day === 5) return 'dolorosos'; // Terça e Sexta
    if (day === 4) return 'luminosos'; // Quinta
    return 'gozosos';
  };

  const currentDay = getDayOfWeek();
  const currentMystery = getMysteryOfDay();

  const mysteries = {
    gozosos: {
      title: "Mistérios Gozosos",
      subtitle: "A Infância de Jesus",
      days: "Segunda-feira e Sábado",
      color: "from-blue-500 to-blue-600",
      borderColor: "border-blue-600",
      bgColor: "from-blue-50 to-white",
      emoji: "😊",
      mysteries: [
        {
          number: 1,
          title: "A Anunciação do Anjo Gabriel a Maria",
          meditation: "Reflita sobre a humildade de Maria ao aceitar ser a Mãe de Deus",
          fruit: "Humildade",
          scripture: "Lucas 1, 26-38"
        },
        {
          number: 2,
          title: "A Visitação de Maria a sua prima Isabel",
          meditation: "Medite sobre o amor fraterno e a caridade de Maria",
          fruit: "Amor ao próximo",
          scripture: "Lucas 1, 39-56"
        },
        {
          number: 3,
          title: "O Nascimento de Jesus em Belém",
          meditation: "Contemple a pobreza do presépio e o amor de Jesus por nós",
          fruit: "Pobreza de espírito",
          scripture: "Lucas 2, 1-20"
        },
        {
          number: 4,
          title: "A Apresentação de Jesus no Templo",
          meditation: "Reflita sobre a obediência de Maria e José à Lei de Deus",
          fruit: "Obediência",
          scripture: "Lucas 2, 22-38"
        },
        {
          number: 5,
          title: "A Perda e o Encontro de Jesus no Templo",
          meditation: "Medite sobre a dor de Maria e sua alegria ao encontrar Jesus",
          fruit: "Buscar Jesus em tudo",
          scripture: "Lucas 2, 41-52"
        }
      ]
    },
    luminosos: {
      title: "Mistérios Luminosos",
      subtitle: "A Vida Pública de Jesus",
      days: "Quinta-feira",
      color: "from-yellow-500 to-yellow-600",
      borderColor: "border-yellow-600",
      bgColor: "from-yellow-50 to-white",
      emoji: "✨",
      mysteries: [
        {
          number: 1,
          title: "O Batismo de Jesus no Rio Jordão",
          meditation: "Reflita sobre o início da missão pública de Jesus",
          fruit: "Fidelidade ao Batismo",
          scripture: "Mateus 3, 13-17"
        },
        {
          number: 2,
          title: "A Auto-revelação de Jesus nas Bodas de Caná",
          meditation: "Contemple o primeiro milagre de Jesus pela intercessão de Maria",
          fruit: "Confiança em Maria",
          scripture: "João 2, 1-12"
        },
        {
          number: 3,
          title: "O Anúncio do Reino de Deus",
          meditation: "Medite sobre o chamado à conversão e ao Evangelho",
          fruit: "Conversão",
          scripture: "Marcos 1, 14-15"
        },
        {
          number: 4,
          title: "A Transfiguração de Jesus",
          meditation: "Contemple a glória divina de Cristo revelada aos discípulos",
          fruit: "Desejo do Céu",
          scripture: "Lucas 9, 28-36"
        },
        {
          number: 5,
          title: "A Instituição da Eucaristia",
          meditation: "Reflita sobre o amor de Jesus presente na Eucaristia",
          fruit: "Amor à Eucaristia",
          scripture: "Lucas 22, 14-20"
        }
      ]
    },
    dolorosos: {
      title: "Mistérios Dolorosos",
      subtitle: "A Paixão de Jesus",
      days: "Terça-feira e Sexta-feira",
      color: "from-purple-700 to-purple-800",
      borderColor: "border-purple-700",
      bgColor: "from-purple-50 to-white",
      emoji: "😢",
      mysteries: [
        {
          number: 1,
          title: "A Agonia de Jesus no Horto das Oliveiras",
          meditation: "Reflita sobre o sofrimento de Jesus por nossos pecados",
          fruit: "Contrição dos pecados",
          scripture: "Lucas 22, 39-46"
        },
        {
          number: 2,
          title: "A Flagelação de Jesus",
          meditation: "Contemple as feridas de Jesus causadas por nossos pecados",
          fruit: "Pureza",
          scripture: "Marcos 15, 15"
        },
        {
          number: 3,
          title: "A Coroação de Espinhos",
          meditation: "Medite sobre a humilhação de Jesus e seu amor por nós",
          fruit: "Humildade",
          scripture: "Marcos 15, 16-20"
        },
        {
          number: 4,
          title: "Jesus carrega a Cruz até o Calvário",
          meditation: "Reflita sobre o peso de nossas culpas carregadas por Jesus",
          fruit: "Paciência nas tribulações",
          scripture: "Lucas 23, 26-32"
        },
        {
          number: 5,
          title: "A Crucifixão e Morte de Jesus",
          meditation: "Contemple o amor supremo de Jesus que deu sua vida por nós",
          fruit: "Perseverança final",
          scripture: "Lucas 23, 33-46"
        }
      ]
    },
    gloriosos: {
      title: "Mistérios Gloriosos",
      subtitle: "A Glória de Cristo e Maria",
      days: "Quarta-feira e Domingo",
      color: "from-gold to-gold-dark",
      borderColor: "border-gold",
      bgColor: "from-gold-light to-white",
      emoji: "👑",
      mysteries: [
        {
          number: 1,
          title: "A Ressurreição de Jesus",
          meditation: "Reflita sobre a vitória de Jesus sobre a morte e o pecado",
          fruit: "Fé",
          scripture: "João 20, 1-18"
        },
        {
          number: 2,
          title: "A Ascensão de Jesus ao Céu",
          meditation: "Contemple Jesus voltando ao Pai e nos preparando um lugar",
          fruit: "Esperança",
          scripture: "Atos 1, 6-11"
        },
        {
          number: 3,
          title: "A Descida do Espírito Santo sobre os Apóstolos",
          meditation: "Medite sobre o Espírito Santo fortalecendo a Igreja",
          fruit: "Sabedoria",
          scripture: "Atos 2, 1-13"
        },
        {
          number: 4,
          title: "A Assunção de Maria ao Céu",
          meditation: "Contemple Maria sendo elevada ao Céu de corpo e alma",
          fruit: "Graça de uma boa morte",
          scripture: "Apocalipse 12, 1"
        },
        {
          number: 5,
          title: "A Coroação de Maria como Rainha do Céu e da Terra",
          meditation: "Reflita sobre a glória de Maria e sua intercessão por nós",
          fruit: "Devoção a Maria",
          scripture: "Apocalipse 12, 1-17"
        }
      ]
    }
  };

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
            🌟 Mistérios do Rosário
          </h1>
          <p className="text-blue-100 text-lg">
            Meditações sobre a vida de Jesus Cristo e Maria Santíssima
          </p>
        </div>
      </header>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Today's Mystery */}
        <section className="mb-12">
          <div className="bg-gradient-to-br from-blue-600 to-blue-700 text-white p-6 sm:p-8 rounded-2xl shadow-xl">
            <div className="text-center mb-6">
              <p className="text-blue-100 text-lg mb-2">Hoje é {currentDay}</p>
              <h2 className="text-3xl font-bold mb-4">
                {mysteries[currentMystery].emoji} {mysteries[currentMystery].title}
              </h2>
              <p className="text-xl text-blue-100">
                {mysteries[currentMystery].subtitle}
              </p>
            </div>
            <Button
              size="lg"
              className="w-full bg-white text-blue-700 hover:bg-blue-50"
              onClick={() => document.getElementById(currentMystery)?.scrollIntoView({ behavior: 'smooth' })}
            >
              Ver mistérios de hoje
            </Button>
          </div>
        </section>

        {/* Introduction */}
        <section className="mb-12">
          <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg border-2 border-blue-200">
            <h2 className="text-2xl font-bold text-blue-900 mb-4">
              Os Quatro Grupos de Mistérios
            </h2>
            <p className="text-blue-700 leading-relaxed mb-4">
              O Rosário completo é composto por 20 mistérios divididos em quatro grupos. Cada grupo contempla um aspecto da vida de Jesus Cristo e de Maria, sua Mãe. Tradicionalmente, reza-se um terço (5 mistérios) por dia, seguindo o calendário abaixo:
            </p>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-600">
                <p className="font-semibold text-blue-900">😊 Gozosos</p>
                <p className="text-sm text-blue-700">Segunda e Sábado</p>
              </div>
              <div className="bg-yellow-50 p-4 rounded-lg border-l-4 border-yellow-600">
                <p className="font-semibold text-blue-900">✨ Luminosos</p>
                <p className="text-sm text-blue-700">Quinta-feira</p>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg border-l-4 border-purple-700">
                <p className="font-semibold text-blue-900">😢 Dolorosos</p>
                <p className="text-sm text-blue-700">Terça e Sexta-feira</p>
              </div>
              <div className="bg-gold-light p-4 rounded-lg border-l-4 border-gold">
                <p className="font-semibold text-blue-900">👑 Gloriosos</p>
                <p className="text-sm text-blue-700">Quarta e Domingo</p>
              </div>
            </div>
          </div>
        </section>

        {/* Mistérios Gozosos */}
        <section id="gozosos" className="mb-12">
          <div className={`bg-gradient-to-br ${mysteries.gozosos.bgColor} p-6 sm:p-8 rounded-2xl shadow-lg border-l-4 ${mysteries.gozosos.borderColor}`}>
            <div className="text-center mb-8">
              <div className={`inline-block w-16 h-16 rounded-full bg-gradient-to-br ${mysteries.gozosos.color} text-white flex items-center justify-center text-3xl mb-4`}>
                {mysteries.gozosos.emoji}
              </div>
              <h2 className="text-3xl font-bold text-blue-900 mb-2">
                {mysteries.gozosos.title}
              </h2>
              <p className="text-lg text-blue-700 mb-1">{mysteries.gozosos.subtitle}</p>
              <p className="text-sm text-blue-600 font-semibold">{mysteries.gozosos.days}</p>
            </div>
            
            <div className="space-y-6">
              {mysteries.gozosos.mysteries.map((mystery) => (
                <div key={mystery.number} className="bg-white p-5 rounded-xl shadow-md">
                  <div className="flex gap-4 items-start">
                    <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${mysteries.gozosos.color} text-white flex items-center justify-center font-bold flex-shrink-0`}>
                      {mystery.number}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-blue-900 mb-2">
                        {mystery.title}
                      </h3>
                      <p className="text-blue-700 text-sm mb-2 italic">
                        {mystery.meditation}
                      </p>
                      <div className="flex flex-wrap gap-2 text-xs">
                        <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full font-semibold">
                          🎁 Fruto: {mystery.fruit}
                        </span>
                        <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full">
                          📖 {mystery.scripture}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Mistérios Luminosos */}
        <section id="luminosos" className="mb-12">
          <div className={`bg-gradient-to-br ${mysteries.luminosos.bgColor} p-6 sm:p-8 rounded-2xl shadow-lg border-l-4 ${mysteries.luminosos.borderColor}`}>
            <div className="text-center mb-8">
              <div className={`inline-block w-16 h-16 rounded-full bg-gradient-to-br ${mysteries.luminosos.color} text-white flex items-center justify-center text-3xl mb-4`}>
                {mysteries.luminosos.emoji}
              </div>
              <h2 className="text-3xl font-bold text-blue-900 mb-2">
                {mysteries.luminosos.title}
              </h2>
              <p className="text-lg text-blue-700 mb-1">{mysteries.luminosos.subtitle}</p>
              <p className="text-sm text-blue-600 font-semibold">{mysteries.luminosos.days}</p>
            </div>
            
            <div className="space-y-6">
              {mysteries.luminosos.mysteries.map((mystery) => (
                <div key={mystery.number} className="bg-white p-5 rounded-xl shadow-md">
                  <div className="flex gap-4 items-start">
                    <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${mysteries.luminosos.color} text-white flex items-center justify-center font-bold flex-shrink-0`}>
                      {mystery.number}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-blue-900 mb-2">
                        {mystery.title}
                      </h3>
                      <p className="text-blue-700 text-sm mb-2 italic">
                        {mystery.meditation}
                      </p>
                      <div className="flex flex-wrap gap-2 text-xs">
                        <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full font-semibold">
                          🎁 Fruto: {mystery.fruit}
                        </span>
                        <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full">
                          📖 {mystery.scripture}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Mistérios Dolorosos */}
        <section id="dolorosos" className="mb-12">
          <div className={`bg-gradient-to-br ${mysteries.dolorosos.bgColor} p-6 sm:p-8 rounded-2xl shadow-lg border-l-4 ${mysteries.dolorosos.borderColor}`}>
            <div className="text-center mb-8">
              <div className={`inline-block w-16 h-16 rounded-full bg-gradient-to-br ${mysteries.dolorosos.color} text-white flex items-center justify-center text-3xl mb-4`}>
                {mysteries.dolorosos.emoji}
              </div>
              <h2 className="text-3xl font-bold text-blue-900 mb-2">
                {mysteries.dolorosos.title}
              </h2>
              <p className="text-lg text-blue-700 mb-1">{mysteries.dolorosos.subtitle}</p>
              <p className="text-sm text-blue-600 font-semibold">{mysteries.dolorosos.days}</p>
            </div>
            
            <div className="space-y-6">
              {mysteries.dolorosos.mysteries.map((mystery) => (
                <div key={mystery.number} className="bg-white p-5 rounded-xl shadow-md">
                  <div className="flex gap-4 items-start">
                    <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${mysteries.dolorosos.color} text-white flex items-center justify-center font-bold flex-shrink-0`}>
                      {mystery.number}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-blue-900 mb-2">
                        {mystery.title}
                      </h3>
                      <p className="text-blue-700 text-sm mb-2 italic">
                        {mystery.meditation}
                      </p>
                      <div className="flex flex-wrap gap-2 text-xs">
                        <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full font-semibold">
                          🎁 Fruto: {mystery.fruit}
                        </span>
                        <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full">
                          📖 {mystery.scripture}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Mistérios Gloriosos */}
        <section id="gloriosos" className="mb-12">
          <div className={`bg-gradient-to-br ${mysteries.gloriosos.bgColor} p-6 sm:p-8 rounded-2xl shadow-lg border-l-4 ${mysteries.gloriosos.borderColor}`}>
            <div className="text-center mb-8">
              <div className={`inline-block w-16 h-16 rounded-full bg-gradient-to-br ${mysteries.gloriosos.color} text-white flex items-center justify-center text-3xl mb-4`}>
                {mysteries.gloriosos.emoji}
              </div>
              <h2 className="text-3xl font-bold text-blue-900 mb-2">
                {mysteries.gloriosos.title}
              </h2>
              <p className="text-lg text-blue-700 mb-1">{mysteries.gloriosos.subtitle}</p>
              <p className="text-sm text-blue-600 font-semibold">{mysteries.gloriosos.days}</p>
            </div>
            
            <div className="space-y-6">
              {mysteries.gloriosos.mysteries.map((mystery) => (
                <div key={mystery.number} className="bg-white p-5 rounded-xl shadow-md">
                  <div className="flex gap-4 items-start">
                    <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${mysteries.gloriosos.color} text-white flex items-center justify-center font-bold flex-shrink-0`}>
                      {mystery.number}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-blue-900 mb-2">
                        {mystery.title}
                      </h3>
                      <p className="text-blue-700 text-sm mb-2 italic">
                        {mystery.meditation}
                      </p>
                      <div className="flex flex-wrap gap-2 text-xs">
                        <span className="bg-gold-light text-yellow-900 px-3 py-1 rounded-full font-semibold">
                          🎁 Fruto: {mystery.fruit}
                        </span>
                        <span className="bg-gold-light text-yellow-900 px-3 py-1 rounded-full">
                          📖 {mystery.scripture}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="text-center">
          <div className="bg-gradient-to-br from-blue-600 to-blue-700 text-white p-8 rounded-2xl shadow-xl">
            <h3 className="text-2xl font-bold mb-4">
              Comece a rezar hoje
            </h3>
            <p className="mb-6">
              Aprenda o passo a passo para rezar o Santo Rosário
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-white text-blue-700 hover:bg-blue-50"
                onClick={() => router.push("/como-rezar")}
              >
                Como rezar o Rosário
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white/20"
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
