"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight, Copy, Check } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { PageHeader } from "@/components/page-header";

export default function OracoesPage() {
  const router = useRouter();
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const copyToClipboard = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const prayers = [
    {
      icon: "✝",
      title: "Sinal da Cruz",
      subtitle: "Início e fim do Rosário",
      text: `Pelo sinal da Santa Cruz,
livrai-nos, Deus Nosso Senhor,
dos nossos inimigos.

Em nome do Pai,
do Filho
e do Espírito Santo.
Amém.`,
      highlight: false
    },
    {
      icon: "📖",
      title: "Credo Apostólico",
      subtitle: "Rezado no crucifixo",
      text: `Creio em Deus Pai todo-poderoso,
criador do céu e da terra.

E em Jesus Cristo, seu único Filho, Nosso Senhor,
que foi concebido pelo poder do Espírito Santo;
nasceu da Virgem Maria;
padeceu sob Pôncio Pilatos,
foi crucificado, morto e sepultado;
desceu à mansão dos mortos;
ressuscitou ao terceiro dia;
subiu aos céus;
está sentado à direita de Deus Pai todo-poderoso,
de onde há de vir a julgar os vivos e os mortos.

Creio no Espírito Santo;
na Santa Igreja Católica;
na comunhão dos santos;
na remissão dos pecados;
na ressurreição da carne;
na vida eterna.
Amém.`,
      highlight: true
    },
    {
      icon: "👨",
      title: "Pai Nosso",
      subtitle: "Antes de cada dezena",
      text: `Pai Nosso, que estais nos Céus,
santificado seja o Vosso Nome,
venha a nós o Vosso Reino,
seja feita a Vossa vontade
assim na terra como no Céu.

O pão nosso de cada dia nos dai hoje,
perdoai-nos as nossas ofensas
assim como nós perdoamos a quem nos tem ofendido,
e não nos deixeis cair em tentação,
mas livrai-nos do mal.
Amém.`,
      highlight: false
    },
    {
      icon: "👸",
      title: "Ave Maria",
      subtitle: "Dez vezes em cada dezena",
      text: `Ave Maria, cheia de graça,
o Senhor é convosco,
bendita sois vós entre as mulheres
e bendito é o fruto do vosso ventre, Jesus.

Santa Maria, Mãe de Deus,
rogai por nós pecadores,
agora e na hora da nossa morte.
Amém.`,
      highlight: true
    },
    {
      icon: "✨",
      title: "Glória ao Pai",
      subtitle: "Após cada dezena",
      text: `Glória ao Pai,
ao Filho
e ao Espírito Santo.

Como era no princípio,
agora e sempre.
Amém.`,
      highlight: false
    },
    {
      icon: "🔥",
      title: "Ó Meu Jesus",
      subtitle: "Oração de Fátima - após cada dezena",
      text: `Ó meu Jesus,
perdoai-nos,
livrai-nos do fogo do inferno,
levai as almas todas para o Céu,
principalmente as que mais precisarem
da Vossa misericórdia.`,
      note: "Esta oração foi ensinada por Nossa Senhora aos três pastorinhos em Fátima, em 1917.",
      highlight: true
    },
    {
      icon: "👑",
      title: "Salve Rainha",
      subtitle: "Ao final do Rosário",
      text: `Salve, Rainha, Mãe de misericórdia,
vida, doçura e esperança nossa, salve!

A vós bradamos,
os degredados filhos de Eva.

A vós suspiramos,
gemendo e chorando neste vale de lágrimas.

Eia, pois, advogada nossa,
esses vossos olhos misericordiosos a nós volvei.

E depois deste desterro
mostrai-nos Jesus,
bendito fruto do vosso ventre.

Ó clemente, ó piedosa,
ó doce sempre Virgem Maria.

V. Rogai por nós, Santa Mãe de Deus.
R. Para que sejamos dignos das promessas de Cristo.`,
      highlight: false
    },
    {
      icon: "🙏",
      title: "Oração Final",
      subtitle: "Opcional - após a Salve Rainha",
      text: `Oremos:

Ó Deus, cujo Filho Unigênito,
por sua vida, morte e ressurreição,
nos obteve o prêmio da salvação eterna,
concedei-nos, nós vos pedimos,
que meditando estes mistérios
do santíssimo Rosário da Bem-aventurada Virgem Maria,
imitemos o que eles contêm
e alcancemos o que eles prometem.

Por Cristo, Nosso Senhor.
Amém.`,
      highlight: true
    }
  ];

  return (
    <main className="min-h-screen bg-background">
      <PageHeader 
        title="Orações Tradicionais"
        subtitle="As orações essenciais para rezar o Santo Rosário"
        icon="🙏"
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        {/* Introduction */}
        <section className="mb-8">
          <div className="p-6 sm:p-8 rounded-3xl glass sacred-border">
            <p className="text-muted-foreground leading-relaxed">
              Estas são as orações tradicionais que compõem o Santo Rosário. Aprenda-as de cor para poder rezar com devoção e meditação profunda. Clique no botão de copiar para salvar cada oração.
            </p>
          </div>
        </section>

        {/* Prayers */}
        <section className="space-y-6">
          {prayers.map((prayer, index) => (
            <div 
              key={index}
              className={`p-6 sm:p-8 rounded-2xl transition-all duration-300 ${
                prayer.highlight 
                  ? "bg-gradient-to-br from-gold-500/10 to-gold-600/5 dark:from-gold-500/15 dark:to-gold-600/10 border border-gold-500/20" 
                  : "glass sacred-border"
              }`}
              data-testid={`prayer-${index}`}
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start gap-4">
                  <div className={`w-14 h-14 rounded-xl flex items-center justify-center text-2xl flex-shrink-0 shadow-lg ${
                    prayer.highlight 
                      ? "bg-gradient-to-br from-gold-500 to-gold-600"
                      : "bg-gradient-to-br from-sacred-blue to-slate-700"
                  }`}>
                    {prayer.icon}
                  </div>
                  <div>
                    <h2 className="text-xl sm:text-2xl font-cinzel font-bold text-foreground">
                      {prayer.title}
                    </h2>
                    <p className="text-sm text-gold-600 dark:text-gold-400 font-medium">
                      {prayer.subtitle}
                    </p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => copyToClipboard(prayer.text, index)}
                  className="rounded-full hover:bg-gold-500/10"
                  data-testid={`copy-prayer-${index}`}
                >
                  {copiedIndex === index ? (
                    <Check className="w-5 h-5 text-green-500" />
                  ) : (
                    <Copy className="w-5 h-5 text-muted-foreground" />
                  )}
                </Button>
              </div>

              {/* Prayer Text */}
              <div className="p-5 rounded-xl bg-card border border-border">
                <p className="text-foreground leading-relaxed whitespace-pre-line text-lg">
                  {prayer.text}
                </p>
              </div>

              {/* Note if exists */}
              {prayer.note && (
                <div className="mt-4 p-4 rounded-xl bg-muted/50 border border-border">
                  <p className="text-muted-foreground text-sm">
                    <strong className="text-foreground">Nota:</strong> {prayer.note}
                  </p>
                </div>
              )}
            </div>
          ))}
        </section>

        {/* Optional Prayers Section */}
        <section className="mt-12">
          <div className="p-6 sm:p-8 rounded-3xl glass sacred-border">
            <h2 className="text-2xl font-cinzel font-bold text-foreground mb-6 text-center">
              Orações Opcionais
            </h2>
            
            {/* Jaculatória */}
            <div className="mb-6">
              <h3 className="text-lg font-cinzel font-bold text-foreground mb-3 flex items-center gap-2">
                <span className="text-xl">💫</span>
                Jaculatórias (após anunciar o mistério)
              </h3>
              <div className="p-4 rounded-xl bg-muted/50 border border-border">
                <p className="text-foreground mb-2 font-semibold">
                  Para todos os mistérios:
                </p>
                <p className="text-muted-foreground italic">
                  "Por este mistério e pela Vossa Santa Intercessão, dai-nos, Senhor, [virtude correspondente ao mistério] e aumentai em nós os dons do Espírito Santo."
                </p>
              </div>
            </div>

            {/* Oferecimento */}
            <div>
              <h3 className="text-lg font-cinzel font-bold text-foreground mb-3 flex items-center gap-2">
                <span className="text-xl">🎁</span>
                Oferecimento do Rosário
              </h3>
              <div className="p-4 rounded-xl bg-muted/50 border border-border">
                <p className="text-muted-foreground italic">
                  "Divino Jesus, eu vos ofereço este Rosário que vou rezar, meditando nos mistérios da Vossa Redenção. Concedei-me, pela intercessão de Maria, Vossa Mãe Santíssima, a quem me dirijo, as graças necessárias para bem rezá-lo e alcançar a indulgência. Eu vo-lo ofereço especialmente por [suas intenções]. Glória ao Pai..."
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Tips Section */}
        <section className="mt-12">
          <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-sacred-blue via-slate-800 to-slate-900 text-white">
            <h2 className="text-2xl font-cinzel font-bold mb-6 flex items-center gap-3">
              <span className="w-10 h-10 rounded-xl bg-gold-500 flex items-center justify-center text-sacred-blue">
                <Check className="w-5 h-5" strokeWidth={3} />
              </span>
              Dicas para memorizar
            </h2>
            <ul className="space-y-3">
              {[
                "Reze devagar e com atenção, focando no significado das palavras",
                "Pratique uma oração de cada vez até decorá-la completamente",
                "Reze junto com áudios ou vídeos do Rosário até aprender",
                "Tenha esta página salva para consultar quando necessário",
                "Com o tempo, as orações se tornarão naturais e automáticas"
              ].map((tip, i) => (
                <li key={i} className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-gold-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <div className="w-2 h-2 rounded-full bg-gold-400" />
                  </div>
                  <span className="text-white/90">{tip}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* CTA */}
        <section className="mt-12 text-center">
          <div className="p-8 sm:p-10 rounded-3xl glass sacred-border">
            <h3 className="text-2xl font-cinzel font-bold text-foreground mb-4">
              Pronto para começar?
            </h3>
            <p className="text-muted-foreground mb-6">
              Aprenda o passo a passo completo para rezar o Santo Rosário
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
                onClick={() => router.push("/misterios-do-dia")}
                className="rounded-full px-8 py-6 text-lg font-semibold border-gold-500/30 text-foreground hover:bg-gold-500/10"
                data-testid="cta-misterios"
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
