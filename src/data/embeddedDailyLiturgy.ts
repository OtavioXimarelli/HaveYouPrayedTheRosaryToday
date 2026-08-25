import type {DailyLiturgyDto, LiturgyGroupDto, ReadingKind} from '@/services/liturgyService';

const source: DailyLiturgyDto['source'] = {
  provider: 'Referências: calendário litúrgico da Igreja no Brasil · texto bíblico: Bíblia Sagrada, Pe. António Pereira de Figueiredo (Vulgata, edição católica em domínio público)',
  fetchedAt: '2026-08-25T10:06:47-03:00',
  freshness: 'EMBEDDED',
};

function group(kind: ReadingKind, title: string, reference: string, text: string): LiturgyGroupDto {
  return {kind, items: [{title, reference, text}]};
}

const embeddedDailyLiturgy: Record<string, DailyLiturgyDto> = {
  '2026-08-25': {
    date: '2026-08-25',
    title: 'Terça-feira da 21ª Semana do Tempo Comum',
    color: 'GREEN',
    prayers: {},
    groups: [
      group('FIRST_READING', 'Primeira leitura', '2Ts 2,1-3a.14-17', 'Ora nós vos rogamos, irmãos, pela vinda de nosso Senhor Jesus Cristo e pela nossa reunião com ele. Que não vos movais facilmente da vossa inteligência, nem vos perturbeis, nem por qualquer espírito, nem por discurso, nem por carta como enviada de nós, como se o dia do Senhor estivesse já perto. Ninguém de modo algum vos engane. Na qual vos chamou também pelo nosso Evangelho, para alcançar a glória de nosso Senhor Jesus Cristo. E assim, irmãos, estai firmes e conservai as tradições que aprendestes, ou de palavra, ou por carta nossa. E o mesmo nosso Senhor Jesus Cristo, e Deus e Pai nosso, o qual nos amou e nos deu uma consolação eterna e uma boa esperança em sua graça, console os vossos corações e os confirme em toda a boa obra e palavra.'),
      group('PSALM', 'Salmo', 'Sl 95(96),10.11-12a.12b-13', 'Dizei entre as gentes que o Senhor reinou. Porque firmou a redondeza da terra, que não será comovida; julgará os povos com equidade. Alegrem-se os céus e regozije-se a terra; comova-se o mar e o que ele contém. Alegrem-se os campos e todas as coisas que neles há. Então se regozijarão todas as árvores das selvas ante a face do Senhor, porque veio, porque veio a julgar a terra. Julgará a redondeza da terra com equidade e os povos segundo a sua verdade.'),
      group('GOSPEL', 'Evangelho', 'Mt 23,23-26', 'Ai de vós, escribas e fariseus hipócritas, que pagais o dízimo da hortelã, do endro e do cominho, e haveis deixado as coisas que são mais importantes da Lei: a justiça, a misericórdia e a fé; estas coisas eram as que vós devíeis praticar, sem que entretanto omitísseis aquelas outras. Condutores cegos, que coais um mosquito e engolis um camelo. Ai de vós, escribas e fariseus hipócritas, porque limpais o que está por fora do copo e do prato, e por dentro estais cheios de rapinas e imundícies. Fariseu cego, purifica primeiro o interior do copo e do prato, para que também o exterior fique limpo.'),
    ],
    source,
  },
  '2026-08-26': {
    date: '2026-08-26',
    title: 'Quarta-feira da 21ª Semana do Tempo Comum',
    color: 'GREEN',
    prayers: {},
    groups: [
      group('FIRST_READING', 'Primeira leitura', '2Ts 3,6-10.16-18', 'Mas nós vos intimamos, em nome de nosso Senhor Jesus Cristo, que vos aparteis de todo o irmão que andar desordenadamente e não segundo a tradição que ele e os mais receberam de nós outros. Porque vós mesmos sabeis como deveis imitar-nos, pois que não vivemos desregrados entre vós, nem comemos de graça o pão de algum; antes, com trabalho e fadiga, trabalhando de dia e de noite, por não sermos pesados a nenhum de vós. Não porque não tivéssemos poder para isso, mas para vos oferecer em nós mesmos um modelo que imitásseis. Porque ainda quando estávamos convosco, vos denunciávamos isto: que, se algum não quer trabalhar, não coma. E o mesmo Senhor da paz vos dê a paz sem fim em todo o lugar. O Senhor seja com todos vós. Eu, Paulo, vos saúdo aqui de minha própria mão, que é o sinal em todas as cartas; assim é que escrevo. A graça de Nosso Senhor Jesus Cristo seja com todos vós. Amém.'),
      group('PSALM', 'Salmo', 'Sl 127(128),1-2.4-5', 'Bem-aventurados todos os que temem ao Senhor, os que andam nos seus caminhos. Porque comerás dos trabalhos das tuas mãos; bem-aventurado és, e te irá bem. Eis aqui como será abençoado o homem que teme ao Senhor. Abençoe-te o Senhor desde Sião, e vejas os bens de Jerusalém todos os dias da tua vida.'),
      group('GOSPEL', 'Evangelho', 'Mt 23,27-32', 'Ai de vós, escribas e fariseus hipócritas, porque sois semelhantes aos sepulcros branqueados, que parecem por fora formosos aos homens, e por dentro estão cheios de ossos de mortos e de toda a imundície! Assim também vós, por fora, vos mostrais na verdade justos aos homens; mas por dentro estais cheios de hipocrisia e iniquidade. Ai de vós, escribas e fariseus hipócritas, que edificais os sepulcros dos profetas e adornais os monumentos dos justos, e dizeis: “Se nós houvéramos vivido nos dias de nossos pais, não teríamos sido seus companheiros no sangue dos profetas”. E assim dais testemunho contra vós mesmos de que sois filhos daqueles que mataram os profetas. Acabai vós, pois, de encher a medida de vossos pais.'),
    ],
    source,
  },
  '2026-08-27': {
    date: '2026-08-27',
    title: 'Santa Mônica, memória',
    color: 'WHITE',
    prayers: {},
    groups: [
      group('FIRST_READING', 'Primeira leitura', '1Cor 1,1-9', 'Paulo, chamado Apóstolo de Jesus Cristo por vontade de Deus, e Sóstenes, nosso irmão, à igreja de Deus, que está em Corinto, aos santificados em Jesus Cristo, chamados santos, com todos os que invocam o nome de nosso Senhor Jesus Cristo, em qualquer lugar deles e nosso. Graça vos seja aumentada, e paz da parte de Deus, nosso Pai, e da do Senhor Jesus Cristo. Graças dou incessantemente ao meu Deus por vós, por causa da graça de Deus que vos foi dada em Jesus Cristo, porque em todas as coisas sois enriquecidos nele, em toda a palavra e em toda a ciência, assim como tem sido confirmado em vós o testemunho de Cristo; de maneira que nada vos falta em graça alguma, esperando vós a manifestação de nosso Senhor Jesus Cristo, o qual também vos confirmará até ao fim sem crime, no dia da vinda de nosso Senhor Jesus Cristo. Fiel é Deus, pelo qual fostes chamados à companhia de seu Filho Jesus Cristo nosso Senhor.'),
      group('PSALM', 'Salmo', 'Sl 144(145),2-7', 'Cada dia te bendirei e louvarei o teu nome pelo século e pelo século do século. Grande é o Senhor e muito digno de louvor, e a sua grandeza não tem limites. A geração e geração louvarão as tuas obras e publicarão o teu poder. Falarão da magnificência da glória da tua santidade e contarão as tuas maravilhas. E dirão as virtudes das tuas coisas terríveis e contarão a tua grandeza. Farão larguíssima memória da abundância da tua suavidade e exultarão com a tua justiça.'),
      group('GOSPEL', 'Evangelho', 'Mt 24,42-51', 'Vigiai, pois, porque não sabeis a que hora há de vir o vosso Senhor. Mas sabei que, se o pai de família soubesse a que hora havia de vir o ladrão, vigiaria sem dúvida e não deixaria arrombar a sua casa. Por isso, estai vós também preparados, porque em hora que não sabeis virá o Filho do homem. Quem crês tu que é o servo fiel e prudente, a quem seu senhor pôs sobre a sua família, para que lhes dê de comer a tempo? Bem-aventurado aquele servo a quem seu senhor, quando vier, achar assim ocupado. Em verdade vos digo, ele o constituirá sobre todos os seus bens. Mas se aquele servo, sendo mau, disser no seu coração: “Meu senhor tarda em vir”, e começar a maltratar os seus companheiros e a comer e beber com os que se embriagam, virá o senhor daquele servo no dia em que ele o não espera e na hora em que ele não sabe; e separá-lo-á e porá a sua parte com os hipócritas; ali haverá choro e ranger de dentes.'),
    ],
    source,
  },
  '2026-08-28': {
    date: '2026-08-28',
    title: 'Santo Agostinho, bispo e doutor da Igreja, memória',
    color: 'WHITE',
    prayers: {},
    groups: [
      group('FIRST_READING', 'Primeira leitura', '1Cor 1,17-25', 'Porque não me enviou Cristo a batizar, mas a pregar o Evangelho; não em sabedoria de palavras, para que não seja feita vã a cruz de Cristo. Porque a palavra da cruz é na verdade uma estultícia para os que se perdem; mas para os que se salvam, que somos nós, é ela a virtude de Deus. Porque escrito está: “Destruirei a sabedoria dos sábios e reprovarei a prudência dos prudentes”. Onde está o sábio? Onde o doutor da lei? Onde o esquadrinhador deste século? Porventura não tem Deus convencido de estultícia a sabedoria deste mundo? Porque, como na sabedoria de Deus não conheceu o mundo a Deus pela sabedoria, quis Deus fazer salvos aos que cressem nele pela estultícia da pregação. Porquanto os judeus pedem milagres, como os gregos buscam sabedoria; mas nós pregamos a Cristo crucificado, que é um escândalo de fato para os judeus e uma estultícia para os gentios. Mas para os que têm sido chamados, assim judeus como gregos, pregamos a Cristo, virtude de Deus e sabedoria de Deus. Pois o que parece em Deus uma estultícia é mais sábio que os homens, e o que parece em Deus uma fraqueza é mais forte que os homens.'),
      group('PSALM', 'Salmo', 'Sl 32(33),1-2.4-5.10-11', 'Exultai, ó justos, no Senhor; aos retos convém que o louvem. Louvai ao Senhor com a cítara; cantai-lhe hinos com o saltério de dez cordas. Porque a palavra do Senhor é reta, e a sua fidelidade resplandece em todas as suas obras. Ele ama a misericórdia e a justiça; da misericórdia do Senhor está cheia toda a terra. O Senhor dissipa os projetos das nações, reprova os intentos dos povos e arruína os conselhos dos príncipes. Mas o conselho do Senhor permanece eternamente; os pensamentos do seu coração, de geração em geração.'),
      group('GOSPEL', 'Evangelho', 'Mt 25,1-13', 'Então será semelhante o reino dos céus a dez virgens que, tomando as suas lâmpadas, saíram a receber o esposo e a esposa. Mas cinco delas eram loucas, e cinco prudentes. As cinco, porém, que eram loucas, tomando as suas lâmpadas, não levaram azeite consigo; mas as prudentes levaram azeite nas suas vasilhas juntamente com as lâmpadas. E, tardando o esposo, começaram todas a cochilar e adormeceram. À meia-noite, porém, ouviu-se um clamor: “Eis aí vem o esposo, saí a recebê-lo”. Então se levantaram todas aquelas virgens e prepararam as suas lâmpadas. E disseram as loucas às prudentes: “Dai-nos do vosso azeite, porque as nossas lâmpadas se apagam”. Responderam as prudentes, dizendo: “Para que não suceda talvez faltar-nos a nós e a vós, ide antes aos que o vendem e comprai o que precisais”. E enquanto elas foram comprá-lo, veio o esposo, e as que estavam preparadas entraram com ele a celebrar as bodas, e fechou-se a porta. E por fim vieram também as outras virgens, dizendo: “Senhor, Senhor, abre-nos!” Mas ele, respondendo, lhes disse: “Em verdade vos digo, não vos conheço”. Vigiai, pois, porque não sabeis o dia nem a hora.'),
    ],
    source,
  },
  '2026-08-29': {
    date: '2026-08-29',
    title: 'Martírio de São João Batista, memória',
    color: 'RED',
    prayers: {},
    groups: [
      group('FIRST_READING', 'Primeira leitura', 'Jr 1,17-19', 'Tu, pois, cinge os teus rins, levanta-te e dize-lhes tudo o que eu te mando. Não temas diante deles, porque eu farei que tu não temas a sua presença. Porquanto eu te pus hoje como uma cidade fortificada, como uma coluna de ferro e como um muro de bronze sobre toda a terra, a respeito dos reis de Judá, dos seus príncipes e sacerdotes, e do seu povo. E pelejarão contra ti, mas não prevalecerão, porque eu sou contigo para te livrar, diz o Senhor.'),
      group('PSALM', 'Salmo', 'Sl 70(71),1-6.15.17', 'Em ti, Senhor, tenho esperado; não seja eu jamais confundido. Na tua justiça livra-me e põe-me a salvo. Inclina para mim o teu ouvido e salva-me. Sê para mim um Deus protetor e um asilo seguro para me fazer salvo. Deus meu, livra-me da mão do pecador e da mão do que procede contra a lei e do iníquo. Porque tu, Senhor, és a minha paciência; Senhor, tu és a minha esperança desde a minha mocidade. Em ti tenho sido confirmado desde antes de nascer; desde o ventre de minha mãe tu és o meu protetor. Tu foste sempre o assunto dos meus cânticos. A minha boca anunciará a tua salvação, porque não conheci a ciência vã. Ensinaste-me, ó Deus, desde a minha mocidade, e eu publicarei as tuas maravilhas que tenho experimentado até agora.'),
      group('GOSPEL', 'Evangelho', 'Mc 6,17-29', 'Porque é de saber que o mesmo Herodes, como tinha casado com Herodíades, sendo esta mulher de seu irmão Filipe, mandou prender e meter em ferros a João por causa desta mulher. Porque dizia João a Herodes: “Não te é lícito ter a mulher de teu irmão”. E Herodíades lhe andava espreitando alguma ocasião e o queria fazer morrer, porém não podia. Porque Herodes temia a João, sabendo que ele era varão justo e santo, e o protegia, e pelo seu conselho fazia muitas coisas e o ouvia de boa vontade. Até que ultimamente chegou um dia favorável, em que Herodes celebrava o dia do seu nascimento, dando um banquete aos grandes da sua corte, aos tribunos e aos principais da Galileia. E, havendo entrado no festim a filha da mesma Herodíades, e dançado, e dado gosto a Herodes e aos que com ele estavam à mesa, disse o rei à moça: “Pede-me o que quiseres, que eu te darei”. E lhe jurou: “Tudo o que me pedires te darei, ainda que seja metade do meu reino”. Tendo ela saído, disse a sua mãe: “Que hei de eu pedir?” E ela respondeu: “A cabeça de João Batista”. E, tornando logo a entrar apressadamente onde estava o rei, pediu, dizendo: “Quero que sem mais demora me dês num prato a cabeça de João Batista”. E o rei se entristeceu, mas, por causa do juramento e pelos que com ele estavam ali à mesa, não quis desgostá-la. Mas, enviando um dos da sua guarda, lhe mandou trazer a cabeça de João num prato; e ele, indo, o degolou no cárcere. E trouxe a sua cabeça num prato e a deu à moça, e a moça a deu a sua mãe. O que ouvindo seus discípulos, vieram e levaram o seu corpo e o puseram no sepulcro.'),
    ],
    source,
  },
  '2026-08-30': {
    date: '2026-08-30',
    title: '22º Domingo do Tempo Comum',
    color: 'GREEN',
    prayers: {},
    groups: [
      group('FIRST_READING', 'Primeira leitura', 'Jr 20,7-9', 'Tu me seduziste, Senhor, e eu fui seduzido. Foste mais forte do que eu e pudeste mais. Fiquei sendo um objeto de escárnio todo o dia; todos me insultam. Porque há já muito tempo que falo, gritando contra a iniquidade e anunciando com repetidos clamores a ruína; e tornou-se-me a palavra do Senhor em opróbrio e em ludíbrio todo o dia. E disse eu: “Não me lembrarei dele, nem falarei mais em seu nome”. E se ateou no meu coração um como fogo abrasador e reconcentrado nos meus ossos; e desfaleci, não o podendo suportar.'),
      group('PSALM', 'Salmo', 'Sl 62(63),2-6.8-9', 'Ó Deus, ó meu Deus, em ti estou vigilante desde o raiar da luz. De ti tem sede a minha alma; a minha carne por ti suspira nesta terra deserta, sem caminho e sem água. Porque em teu santuário te contemplei, vi o teu poder e a tua glória. Porque a tua misericórdia é melhor que a mesma vida; os meus lábios te louvarão. Assim te bendirei em minha vida e, invocando o teu nome, levantarei as minhas mãos. Como de banha e de gordura será farta a minha alma, e com lábios de júbilo te louvará a minha boca. Porque foste meu defensor, e à sombra das tuas asas exultei. A minha alma vai unida após de ti; a tua destra me fortalece.'),
      group('SECOND_READING', 'Segunda leitura', 'Rm 12,1-2', 'Assim que, pela misericórdia de Deus, vos rogo, irmãos, que ofereçais os vossos corpos como uma hóstia viva, santa, agradável a Deus, que é o culto racional que lhe deveis. E não vos conformeis com este século, mas reformai-vos pela regeneração de vosso espírito, para que experimenteis como a vontade de Deus é boa, agradável e perfeita.'),
      group('GOSPEL', 'Evangelho', 'Mt 16,21-27', 'Desde então começou Jesus a declarar a seus discípulos que convinha ir ele a Jerusalém e padecer muitas coisas dos anciãos, dos escribas e dos príncipes dos sacerdotes, e ser morto e ressuscitar ao terceiro dia. E, tomando-o Pedro à parte, começou a increpá-lo, dizendo: “Deus tal não permita, Senhor; não sucederá isto contigo”. Ele, voltando-se para Pedro, lhe disse: “Tira-te de diante de mim, Satanás, que me serves de escândalo, porque não tens gosto das coisas que são de Deus, mas das que são dos homens”. Então disse Jesus aos seus discípulos: “Se algum quer vir após de mim, negue-se a si mesmo, tome a sua cruz e siga-me. Porque o que quiser salvar a sua alma perdê-la-á, e o que perder a sua alma por amor de mim achá-la-á. Porque de que aproveita ao homem ganhar todo o mundo, se vier a perder a sua alma? Ou que troca fará o homem para recobrar a sua alma? Porque o Filho do homem há de vir na glória de seu Pai com os seus anjos, e então dará a cada um a recompensa segundo as suas obras”.'),
    ],
    source,
  },
  '2026-08-31': {
    date: '2026-08-31',
    title: 'Segunda-feira da 22ª Semana do Tempo Comum',
    color: 'GREEN',
    prayers: {},
    groups: [
      group('FIRST_READING', 'Primeira leitura', '1Cor 2,1-5', 'E eu, quando fui ter convosco, irmãos, fui não com sublimidade de estilo ou de sabedoria a anunciar-vos o testemunho de Cristo. Porque julguei não saber coisa alguma entre vós, senão a Jesus Cristo, e este crucificado. E eu estive entre vós em fraqueza, temor e grande tremor. Tanto a minha conversação como a minha pregação não consistiu em palavras persuasivas de humana sabedoria, mas em demonstração de espírito e de virtude, para que a vossa fé não se funde em sabedoria de homens, mas na virtude de Deus.'),
      group('PSALM', 'Salmo', 'Sl 118(119),97-102', 'De que modo tenho eu, Senhor, amado a tua lei? Ela é a minha meditação todo o dia. Mais que os meus inimigos me fizeste prudente no teu mandamento, porque o tenho perpetuamente diante de meus olhos. Mais que todos os que me ensinavam tenho entendido, porque os teus testemunhos são a minha meditação. Mais que os anciãos entendi, porque busquei os teus mandamentos. De todo o mau caminho retirei os meus pés, para guardar as tuas palavras. De teus juízos não me tenho apartado, porque tu me prescreveste uma lei.'),
      group('GOSPEL', 'Evangelho', 'Lc 4,16-30', 'E veio a Nazaré, onde se havia criado, e entrou na sinagoga, segundo o seu costume, em dia de sábado, e levantou-se para ler. E foi-lhe dado o livro do profeta Isaías. E, ao desenrolar o livro, achou o lugar onde estava escrito: “O Espírito do Senhor está sobre mim, pelo que me ungiu e me enviou a anunciar a boa-nova aos pobres, a sarar os contritos de coração, a anunciar aos cativos a remissão e aos cegos a vista, a pôr em liberdade os oprimidos, a proclamar o ano favorável do Senhor”. E, enrolando o livro, o devolveu ao ministro e assentou-se. E todos quantos havia na sinagoga tinham os olhos fixos nele. E começou ele a dizer-lhes: “Hoje se cumpriu esta Escritura nos vossos ouvidos”. E todos lhe davam testemunho e se admiravam das palavras de graça que saíam da sua boca, e diziam: “Não é este o filho de José?” Então lhes disse: “Sem dúvida me aplicareis este provérbio: ‘Médico, cura-te a ti mesmo; todas aquelas grandes coisas que ouvimos terem sido feitas em Cafarnaum, faze-as também aqui, na tua pátria’”. E prosseguiu: “Em verdade vos digo que nenhum profeta é bem aceito na sua pátria. Em verdade vos digo que muitas viúvas havia em Israel nos dias de Elias, quando foi fechado o Céu por três anos e seis meses, e houve grande fome por toda a terra; e a nenhuma delas foi enviado Elias, senão a uma mulher viúva de Sarepta de Sidônia. E muitos leprosos havia em Israel no tempo do profeta Eliseu, mas nenhum deles foi limpo senão Naamã, o sírio”. E todos os que estavam na sinagoga, ouvindo isto, se encheram de ira. E levantaram-se, lançaram-no fora da cidade e o conduziram até o cume do monte sobre o qual estava edificada a sua cidade, para o precipitarem. Mas ele, passando pelo meio deles, seguiu seu caminho.'),
    ],
    source,
  },
  '2026-09-01': {
    date: '2026-09-01',
    title: 'Terça-feira da 22ª Semana do Tempo Comum',
    color: 'GREEN',
    prayers: {},
    groups: [
      group('FIRST_READING', 'Primeira leitura', '1Cor 2,10b-16', 'Porque o Espírito tudo penetra, ainda o que há de mais oculto na profundidade de Deus. Porque qual dos homens conhece as coisas que são do homem, senão o espírito do homem, que nele mesmo reside? Assim também as que são de Deus ninguém as conhece, senão o Espírito de Deus. Ora, nós não recebemos o espírito deste mundo, mas sim o Espírito que vem de Deus, para sabermos as coisas que por Deus nos foram dadas; o que também anunciamos, não com doutas palavras de humana sabedoria, mas com a doutrina do Espírito, acomodando o espiritual ao espiritual. Mas o homem animal não percebe aquelas coisas que são do Espírito de Deus, porque lhe parecem uma estultícia e não as pode entender, porque elas se ponderam espiritualmente. Mas o espiritual julga todas as coisas, e ele não é julgado de ninguém. Porquanto quem conheceu o conselho do Senhor, para que o possa instruir? Porém nós sabemos a mente de Cristo.'),
      group('PSALM', 'Salmo', 'Sl 144(145),8-14', 'Clemente e misericordioso é o Senhor, sofrido e muito misericordioso. Suave é o Senhor para com todos, e as suas misericórdias são sobre todas as suas obras. Deem-te glória a ti, Senhor, todas as tuas obras, e os teus santos te bendigam. A glória do teu reino publicarão e o teu poder celebrarão, para fazerem conhecer aos filhos dos homens o teu poder e a glória da magnificência do teu reino. O teu reino se estende a todos os séculos, e o teu império a toda geração e geração. Fiel é o Senhor em todas as suas palavras e santo em todas as suas obras. O Senhor sustém a todos os que estão para cair e levanta a todos os oprimidos.'),
      group('GOSPEL', 'Evangelho', 'Lc 4,31-37', 'E desceu a Cafarnaum, cidade da Galileia, e ali os ensinava nos sábados. E eles se espantavam da sua doutrina, porque a sua palavra era com autoridade. E estava na sinagoga um homem possesso de um espírito imundo, e exclamou em alta voz, dizendo: “Deixa-nos! Que temos nós contigo, Jesus Nazareno? Vieste para nos perder? Sei quem és: o Santo de Deus”. Mas Jesus o repreendeu, dizendo: “Cala-te e sai dele”. E o demônio, depois de o ter lançado por terra no meio de todos, saiu dele sem lhe fazer mal algum. E todos ficaram cheios de pavor e falavam uns com os outros, dizendo: “Que palavra é esta, que com poder e autoridade manda aos espíritos imundos, e eles saem?” E a fama dele corria por todos os lugares daquela região.'),
    ],
    source,
  },
};

export const EMBEDDED_LITURGY_START_DATE = '2026-08-25';
export const EMBEDDED_LITURGY_END_DATE = '2026-09-01';

export function getEmbeddedDailyLiturgy(date: string): DailyLiturgyDto | null {
  return embeddedDailyLiturgy[date] ?? null;
}
