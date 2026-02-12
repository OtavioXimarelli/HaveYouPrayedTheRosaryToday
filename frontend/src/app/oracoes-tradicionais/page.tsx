"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight, Copy, Check } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { PageHeader } from "@/components/page-header";
import { PageTransition } from "@/components/page-transition";

/**
 * Official prayers sourced from the Vatican Holy See:
 * https://www.vatican.va/special/rosary/documents/misteri_en.html
 * Translated to Brazilian Portuguese following CNBB (Conferência Nacional dos Bispos do Brasil) standards
 */

export default function OracoesPage() {
  const router = useRouter();
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const copyToClipboard = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  // Official prayers from Vatican sources
  const prayers = [
    {
      icon: "✝",
      title: "Sinal da Cruz",
      subtitle: "Início e fim do Rosário",
      latinTitle: "Signum Crucis",
      latin: `In nomine Patris,
et Filii,
et Spiritus Sancti.
Amen.`,
      text: `Em nome do Pai,
e do Filho
e do Espírito Santo.
Amém.`,
      highlight: false
    },
    {
      icon: "📖",
      title: "Credo Apostólico",
      subtitle: "Rezado no crucifixo — Símbolo dos Apóstolos",
      latinTitle: "Symbolum Apostolorum",
      latin: `Credo in Deum Patrem omnipotentem,
Creatorem caeli et terrae,
et in Iesum Christum, Filium Eius unicum, Dominum nostrum,
qui conceptus est de Spiritu Sancto,
natus ex Maria Virgine,
passus sub Pontio Pilato,
crucifixus, mortuus, et sepultus,
descendit ad inferos,
tertia die resurrexit a mortuis,
ascendit ad caelos,
sedet ad dexteram Dei Patris omnipotentis,
inde venturus est iudicare vivos et mortuos.

Credo in Spiritum Sanctum,
sanctam Ecclesiam catholicam,
sanctorum communionem,
remissionem peccatorum,
carnis resurrectionem,
vitam aeternam.
Amen.`,
      text: `Creio em Deus Pai todo-poderoso,
Criador do céu e da terra.

E em Jesus Cristo, seu único Filho, nosso Senhor,
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
      subtitle: "Oração do Senhor — antes de cada dezena",
      latinTitle: "Pater Noster",
      latin: `Pater noster, qui es in caelis,
sanctificetur nomen tuum.
Adveniat regnum tuum.
Fiat voluntas tua,
sicut in caelo et in terra.

Panem nostrum quotidianum da nobis hodie,
et dimitte nobis debita nostra
sicut et nos dimittimus debitoribus nostris.
Et ne nos inducas in tentationem,
sed libera nos a malo.
Amen.`,
      text: `Pai nosso que estais nos céus,
santificado seja o vosso Nome,
venha a nós o vosso Reino,
seja feita a vossa vontade
assim na terra como no céu.

O pão nosso de cada dia nos dai hoje,
perdoai-nos as nossas ofensas
assim como nós perdoamos a quem nos tem ofendido,
e não nos deixeis cair em tentação,
mas livrai-nos do mal.
Amém.`,
      source: "Mt 6, 9-13 / Lc 11, 2-4",
      highlight: false
    },
    {
      icon: "👸",
      title: "Ave Maria",
      subtitle: "Saudação Angélica — dez vezes em cada dezena",
      latinTitle: "Ave Maria",
      latin: `Ave Maria, gratia plena,
Dominus tecum.
Benedicta tu in mulieribus,
et benedictus fructus ventris tui, Iesus.

Sancta Maria, Mater Dei,
ora pro nobis peccatoribus,
nunc et in hora mortis nostrae.
Amen.`,
      text: `Ave Maria, cheia de graça,
o Senhor é convosco,
bendita sois vós entre as mulheres
e bendito é o fruto do vosso ventre, Jesus.

Santa Maria, Mãe de Deus,
rogai por nós pecadores,
agora e na hora da nossa morte.
Amém.`,
      source: "Lc 1, 28.42",
      highlight: true
    },
    {
      icon: "✨",
      title: "Glória ao Pai",
      subtitle: "Doxologia Menor — após cada dezena",
      latinTitle: "Gloria Patri",
      latin: `Gloria Patri,
et Filio,
et Spiritui Sancto.

Sicut erat in principio,
et nunc et semper,
et in saecula saeculorum.
Amen.`,
      text: `Glória ao Pai,
e ao Filho
e ao Espírito Santo.

Como era no princípio,
agora e sempre.
Amém.`,
      highlight: false
    },
    {
      icon: "🔥",
      title: "Oração de Fátima",
      subtitle: "Jaculatória — após cada Glória",
      latinTitle: "Oratio Fatimae",
      text: `Ó meu Jesus,
perdoai-nos e livrai-nos do fogo do inferno;
levai as almas todas para o céu,
principalmente as que mais precisarem
da vossa misericórdia.`,
      note: "Esta oração foi ensinada por Nossa Senhora aos três pastorinhos de Fátima em 13 de julho de 1917, após a visão do inferno.",
      highlight: true
    },
    {
      icon: "👑",
      title: "Salve Rainha",
      subtitle: "Salve Regina — ao final do Rosário",
      latinTitle: "Salve Regina",
      latin: `Salve, Regina, Mater misericordiae,
vita, dulcedo, et spes nostra, salve.

Ad te clamamus exsules filii Hevae,
ad te suspiramus, gementes et flentes
in hac lacrimarum valle.

Eia, ergo, advocata nostra, illos tuos
misericordes oculos ad nos converte;

et Iesum, benedictum fructum ventris tui,
nobis post hoc exsilium ostende.

O clemens, O pia, O dulcis Virgo Maria.

V. Ora pro nobis, sancta Dei Genetrix.
R. Ut digni efficiamur promissionibus Christi.

Amen.`,
      text: `Salve, Rainha, Mãe de misericórdia,
vida, doçura e esperança nossa, salve!

A vós bradamos,
os degredados filhos de Eva.

A vós suspiramos,
gemendo e chorando neste vale de lágrimas.

Eia, pois, advogada nossa,
esses vossos olhos misericordiosos a nós volvei.

E depois deste desterro,
mostrai-nos Jesus,
bendito fruto do vosso ventre.

Ó clemente, ó piedosa,
ó doce sempre Virgem Maria.

V. Rogai por nós, Santa Mãe de Deus.
R. Para que sejamos dignos das promessas de Cristo.

Amém.`,
      highlight: false
    },
    {
      icon: "🙏",
      title: "Oração Final",
      subtitle: "Coleta — após a Salve Rainha",
      latinTitle: "Oratio conclusiva",
      latin: `Deus, cuius Unigenitus
per vitam, mortem et resurrectionem suam
nobis salutis aeternae praemia comparavit:
concede, quaesumus;
ut haec mysteria sacratissimo beatae Mariae Virginis Rosario recolentes,
et imitemur quod continent,
et quod promittunt assequamur.

Per Christum Dominum nostrum.
Amen.`,
      text: `Ó Deus, cujo Filho Unigênito,
por sua vida, morte e ressurreição,
nos obteve o prêmio da salvação eterna:
concedei-nos, nós vos suplicamos,
que meditando estes mistérios
do Santíssimo Rosário da Bem-aventurada Virgem Maria,
imitemos o que eles contêm
e alcancemos o que eles prometem.

Por Cristo, nosso Senhor.
Amém.`,
      highlight: true
    }
  ];

  return (
    <PageTransition>
      <main className="min-h-screen bg-background">
        <PageHeader 
        title="Orações Tradicionais"
        subtitle="As orações essenciais para rezar o Santo Rosário"
        icon="🙏"
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        {/* Intro Section - Rosário Vivo Approach */}
        <section className="mb-12">
          <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-gold-500/5 to-gold-600/5 border border-gold-500/20">
            <p className="text-lg text-muted-foreground leading-relaxed">
              Cada oração do Rosário carrega séculos de devoção e sabedoria espiritual. 
              Conhecer seu significado profundo nos permite <span className="text-gold-600 dark:text-gold-400 font-semibold">viver a oração</span> não como repetição mecânica, 
              mas como diálogo íntimo com Deus através de Maria.
            </p>
          </div>
        </section>

        {/* Source Attribution */}
        <div className="mb-8 p-4 rounded-xl bg-muted/50 border border-border">
          <p className="text-sm text-muted-foreground">
            <strong>Fonte oficial:</strong> Santa Sé do Vaticano — <a href="https://www.vatican.va/special/rosary/" target="_blank" rel="noopener noreferrer" className="text-gold-600 dark:text-gold-400 hover:underline">vatican.va/special/rosary</a>
            <br />
            <span className="text-xs">Tradução em português seguindo as diretrizes da CNBB (Conferência Nacional dos Bispos do Brasil)</span>
          </p>
        </div>

        {/* Introduction */}
        <section className="mb-8">
          <div className="p-6 sm:p-8 rounded-3xl glass sacred-border">
            <p className="text-muted-foreground leading-relaxed">
              Estas são as orações oficiais que compõem o Santo Rosário segundo a tradição da Igreja Católica. Aprenda-as de cor para poder rezar com devoção e meditação profunda. Clique no botão de copiar para salvar cada oração.
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
                    {prayer.latinTitle && (
                      <p className="text-xs text-muted-foreground mt-1 italic">
                        {prayer.latinTitle}
                      </p>
                    )}
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

              {/* Prayer Text - Side by Side Layout */}
              {prayer.latin ? (
                <div className="grid md:grid-cols-2 gap-4">
                  {/* Portuguese Version */}
                  <div className="p-5 rounded-xl bg-card border border-border">
                    <p className="text-gold-600 dark:text-gold-400 font-semibold mb-3 text-sm uppercase tracking-wide">
                      Português
                    </p>
                    <p className="text-foreground leading-relaxed whitespace-pre-line text-lg">
                      {prayer.text}
                    </p>
                  </div>
                  
                  {/* Latin Version */}
                  <div className="p-5 rounded-xl bg-gradient-to-br from-gold-light/50 to-gold-light/30 dark:from-gold-900/20 dark:to-gold-900/10 border border-gold-500/20">
                    <p className="text-gold-700 dark:text-gold-500 font-semibold mb-3 text-sm uppercase tracking-wide">
                      Latim
                    </p>
                    <p className="text-foreground leading-relaxed whitespace-pre-line text-lg italic">
                      {prayer.latin}
                    </p>
                  </div>
                </div>
              ) : (
                /* Portuguese Only (Fatima Prayer) */
                <div className="p-5 rounded-xl bg-card border border-border">
                  <p className="text-foreground leading-relaxed whitespace-pre-line text-lg">
                    {prayer.text}
                  </p>
                </div>
              )}

              {/* Scripture Source */}
              {prayer.source && (
                <div className="mt-3 text-sm text-muted-foreground">
                  <span className="font-semibold">Referência bíblica:</span> {prayer.source}
                </div>
              )}

              {/* Note if exists */}
              {prayer.note && (
                <div className="mt-4 p-4 rounded-xl bg-muted/50 border border-border">
                  <p className="text-muted-foreground text-sm">
                    <strong className="text-foreground">Nota histórica:</strong> {prayer.note}
                  </p>
                </div>
              )}
            </div>
          ))}
        </section>

        {/* How to Pray Structure */}
        <section className="mt-12">
          <div className="p-6 sm:p-8 rounded-3xl glass sacred-border">
            <h2 className="text-2xl font-cinzel font-bold text-foreground mb-6 text-center">
              Estrutura do Rosário
            </h2>
            
            <div className="p-4 rounded-xl bg-muted/50 border border-border mb-6">
              <p className="text-muted-foreground text-sm italic text-center">
                Segundo a Santa Sé: &ldquo;No início de cada dezena, anuncia-se o mistério a ser contemplado. Após uma breve pausa para reflexão, reza-se o Pai Nosso, dez Ave Marias e o Glória ao Pai.&rdquo;
              </p>
            </div>

            <div className="space-y-3">
              {[
                "1. Sinal da Cruz",
                "2. Credo Apostólico (no crucifixo)",
                "3. Pai Nosso (primeira conta grande)",
                "4. Três Ave Marias (três contas pequenas) — Pela fé, esperança e caridade",
                "5. Glória ao Pai",
                "6. Anunciar o 1º Mistério",
                "7. Pai Nosso (conta grande)",
                "8. Dez Ave Marias (dezena) — meditando no mistério",
                "9. Glória ao Pai + Oração de Fátima",
                "10. Repetir 6-9 para os demais mistérios (total: 5 dezenas)",
                "11. Salve Rainha + Oração Final",
                "12. Sinal da Cruz"
              ].map((step, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-gold-500 mt-2 flex-shrink-0" />
                  <span className="text-foreground text-sm">{step}</span>
                </div>
              ))}
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
              Dicas para uma oração profunda
            </h2>
            <ul className="space-y-3">
              {[
                "Reze devagar, meditando sobre cada mistério",
                "Escolha um horário fixo do dia para criar o hábito",
                "Reze em família sempre que possível",
                "Ofereça suas intenções no início da oração",
                "Contemple as passagens bíblicas de cada mistério"
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
              Veja os mistérios de cada dia da semana
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                onClick={() => router.push("/misterios-do-dia")}
                className="rounded-full px-8 py-6 text-lg font-cinzel font-bold bg-gradient-to-r from-gold-500 to-gold-600 text-sacred-blue hover:shadow-gold-glow transition-all"
                data-testid="cta-misterios"
              >
                Ver Mistérios
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => router.push("/como-rezar")}
                className="rounded-full px-8 py-6 text-lg font-semibold border-gold-500/30 text-foreground hover:bg-gold-500/10"
                data-testid="cta-como-rezar"
              >
                Guia passo a passo
              </Button>
            </div>
          </div>
        </section>
      </div>
    </main>
    </PageTransition>
  );
}
