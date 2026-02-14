"use client";

import { PageHeader } from "@/components/page-header";
import { Heart, Users, BookOpen, Sparkles, Shield, Zap } from "lucide-react";

export default function AboutPage() {
  const principles = [
    {
      icon: Heart,
      title: "Fé Autêntica",
      description: "Conectamos as pessoas à tradição viva da Igreja Católica, radicada na oração do Rosário como caminho de transformação espiritual.",
      color: "rose"
    },
    {
      icon: Users,
      title: "Comunidade Global",
      description: "Criamos um espaço onde católicos de todas as partes do mundo rezam juntos, compartilham intenções e crescem espiritualmente conectados.",
      color: "blue"
    },
    {
      icon: BookOpen,
      title: "Ensinamentos Acessíveis",
      description: "Sintetizamos documentos da Santa Sé, escritos de santos e teologia católica em conteúdo claro—sem cursos, apenas sabedoria da Igreja ao alcance.",
      color: "amber"
    },
    {
      icon: Sparkles,
      title: "Simplicidade Sagrada",
      description: "Transformamos a tecnologia em ferramenta de oração, mantendo o foco na essência: contato pessoal com Deus e Maria.",
      color: "yellow"
    },
    {
      icon: Shield,
      title: "Segurança da Fé",
      description: "Todo conteúdo é fundamentado na Doutrina da Igreja Católica, validado e orientado por princípios pastorais sólidos.",
      color: "indigo"
    },
    {
      icon: Zap,
      title: "Acessibilidade",
      description: "Gratuito, aberto a todos, sem anúncios intrusivos. A fé não deve ter barreiras econômicas ou digitais.",
      color: "purple"
    }
  ];

  const timeline = [
    {
      year: "2024",
      title: "Nascimento de uma Visão",
      description: "Rosário Vivo começou como uma simples ideia: um rastreador de terços que conectasse pessoas à sua fé diária."
    },
    {
      year: "2025",
      title: "Do Rastreador ao Hub",
      description: "Reconhecemos que os católicos queriam mais. Não apenas rastrear—aprender, crescer e comungar em fé."
    },
    {
      year: "2026",
      title: "Síntese da Tradição",
      description: "Rosário Vivo torna-se um compêndio acessível da Igreja: sintetizamos documentos da Santa Sé, ensinamentos de santos e teologia em conteúdo prático."
    }
  ];

  return (
    <>
      <PageHeader
        title="Sobre Rosário Vivo"
        subtitle="Uma plataforma para viver a fé, cada dia"
        icon="ℹ️"
      />

      <main className="min-h-screen bg-sacred-cream dark:bg-gradient-to-b dark:from-slate-950 dark:via-sacred-blue dark:to-slate-950">
        {/* Mission Section */}
        <section className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="mb-12">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-cinzel font-bold text-gold-500 dark:text-gold-400 mb-6">
                Nossa Missão
              </h2>
              <p className="text-lg sm:text-xl text-slate-700 dark:text-slate-300 leading-relaxed mb-6 font-manrope">
                Rosário Vivo torna os ensinamentos da Igreja Católica acessíveis e práticos para católicos modernos. Sintetizamos documentos oficiais da Santa Sé, escritos de santos e teologia católica em conteúdo claro que nutre sua vida de oração.
              </p>
              <p className="text-lg sm:text-xl text-slate-700 dark:text-slate-300 leading-relaxed font-manrope">
                Não oferecemos cursos formais—oferecemos <strong>um companheiro digital para sua jornada de fé</strong>: acompanhe sua oração diária, explore ensinamentos da Igreja quando desejar, e descubra a riqueza da tradição católica ao seu próprio ritmo.
              </p>
            </div>

            {/* Vision */}
            <div className="glass rounded-xl p-8 sm:p-10 border border-gold-500/30 dark:border-gold-400/20 bg-gradient-to-br from-gold-50 dark:from-gold-500/5 to-transparent">
              <h3 className="text-2xl font-cinzel font-bold text-sacred-blue dark:text-white mb-4">Nossa Visão</h3>
              <p className="text-slate-700 dark:text-slate-300 text-lg leading-relaxed font-manrope">
                Tornar os ensinamentos da Santa Sé e da tradição católica tão acessíveis quanto um aplicativo no seu telefone—sem perder profundidade, sem distorcer doutrina, apenas verdade católica em linguagem clara.
              </p>
            </div>
          </div>
        </section>

        {/* Principles Grid */}
        <section className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-transparent via-gold-500/5 dark:via-gold-500/10 to-transparent">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-cinzel font-bold text-gold-500 dark:text-gold-400 mb-4 text-center">
              Nossos Princípios
            </h2>
            <p className="text-center text-slate-600 dark:text-slate-400 mb-12 font-manrope max-w-2xl mx-auto">
              Seis pilares que guiam cada decisão, cada funcionalidade, cada palavra em Rosário Vivo
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {principles.map((principle, idx) => {
                const Icon = principle.icon;
                const colorClasses = {
                  rose: "from-rose-500/10 dark:from-rose-500/20 border-rose-500/30 dark:border-rose-400/20",
                  blue: "from-blue-500/10 dark:from-blue-500/20 border-blue-500/30 dark:border-blue-400/20",
                  amber: "from-amber-500/10 dark:from-amber-500/20 border-amber-500/30 dark:border-amber-400/20",
                  yellow: "from-yellow-500/10 dark:from-yellow-500/20 border-yellow-500/30 dark:border-yellow-400/20",
                  indigo: "from-indigo-500/10 dark:from-indigo-500/20 border-indigo-500/30 dark:border-indigo-400/20",
                  purple: "from-purple-500/10 dark:from-purple-500/20 border-purple-500/30 dark:border-purple-400/20"
                };

                return (
                  <div
                    key={idx}
                    className={`glass rounded-lg p-6 sm:p-8 border bg-gradient-to-br ${colorClasses[principle.color as keyof typeof colorClasses]} hover:shadow-lg transition-all duration-300`}
                  >
                    <Icon className="w-10 h-10 sm:w-12 sm:h-12 text-gold-500 dark:text-gold-400 mb-4" />
                    <h3 className="text-xl font-cinzel font-bold text-sacred-blue dark:text-white mb-3">
                      {principle.title}
                    </h3>
                    <p className="text-slate-600 dark:text-slate-300 leading-relaxed font-manrope">
                      {principle.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* What We Offer */}
        <section className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-cinzel font-bold text-gold-500 dark:text-gold-400 mb-12 text-center">
              O Que Oferecemos
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Rastrear */}
              <div className="glass rounded-lg p-8 border border-gold-500/30 dark:border-gold-400/20">
                <div className="text-4xl mb-4">📿</div>
                <h3 className="text-2xl font-cinzel font-bold text-sacred-blue dark:text-white mb-3">Rastrear</h3>
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed font-manrope">
                  Registre seu terço diário, acompanhe suas sequências de fidelidade, veja seu crescimento espiritual refletido em números que importam.
                </p>
              </div>

              {/* Aprender */}
              <div className="glass rounded-lg p-8 border border-gold-500/30 dark:border-gold-400/20">
                <div className="text-4xl mb-4">📚</div>
                <h3 className="text-2xl font-cinzel font-bold text-sacred-blue dark:text-white mb-3">Explorar</h3>
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed font-manrope">
                  Navegue por ensinamentos católicos sintetizados: teologia, história da Igreja, vidas de santos, sacramentos—tudo baseado em fontes oficiais da Santa Sé.
                </p>
              </div>

              {/* Rezar */}
              <div className="glass rounded-lg p-8 border border-gold-500/30 dark:border-gold-400/20">
                <div className="text-4xl mb-4">✝️</div>
                <h3 className="text-2xl font-cinzel font-bold text-sacred-blue dark:text-white mb-3">Rezar Bem</h3>
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed font-manrope">
                  Acesse guias de oração, explore diferentes métodos do Rosário, e descubra ferramentas que ajudam você a rezar com maior devoção e consciência.
                </p>
              </div>

              {/* Conectar */}
              <div className="glass rounded-lg p-8 border border-gold-500/30 dark:border-gold-400/20">
                <div className="text-4xl mb-4">🌍</div>
                <h3 className="text-2xl font-cinzel font-bold text-sacred-blue dark:text-white mb-3">Conectar</h3>
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed font-manrope">
                  Participe de uma comunidade global de católicos, compartilhe intenções de oração e saiba que você reza nunca sozinho, mas com uma família de fé.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Journey Timeline */}
        <section className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-transparent via-sacred-blue/5 dark:via-sacred-blue/20 to-transparent">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-cinzel font-bold text-gold-500 dark:text-gold-400 mb-12 text-center">
              Nossa Jornada
            </h2>

            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-gold-500 via-gold-400 to-gold-300 dark:from-gold-400 dark:via-gold-300 dark:to-gold-500 rounded-full" />

              <div className="space-y-12">
                {timeline.map((item, idx) => (
                  <div key={idx} className={`flex ${idx % 2 === 0 ? "flex-row" : "flex-row-reverse"}`}>
                    {/* Content */}
                    <div className={`w-1/2 ${idx % 2 === 0 ? "pr-12" : "pl-12"}`}>
                      <div className="glass rounded-lg p-6 border border-gold-500/30 dark:border-gold-400/20 bg-gradient-to-br from-gold-50 dark:from-gold-500/5 to-transparent">
                        <div className="text-lg font-cinzel font-bold text-gold-500 dark:text-gold-400 mb-2">
                          {item.year}
                        </div>
                        <h3 className="text-xl font-cinzel font-bold text-sacred-blue dark:text-white mb-2">
                          {item.title}
                        </h3>
                        <p className="text-slate-700 dark:text-slate-300 leading-relaxed font-manrope">
                          {item.description}
                        </p>
                      </div>
                    </div>

                    {/* Timeline dot */}
                    <div className="w-0 flex justify-center">
                      <div className="w-6 h-6 rounded-full bg-gold-500 dark:bg-gold-400 border-4 border-sacred-cream dark:border-slate-950 shadow-lg" />
                    </div>

                    {/* Empty space */}
                    <div className="w-1/2" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Core Values */}
        <section className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-cinzel font-bold text-gold-500 dark:text-gold-400 mb-12 text-center">
              Por Que Somos Diferentes
            </h2>

            <div className="space-y-6">
              <div className="flex gap-4 sm:gap-6">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-full bg-gold-500/20 dark:bg-gold-400/20 flex items-center justify-center">
                    <span className="text-2xl">✝</span>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-cinzel font-bold text-sacred-blue dark:text-white mb-2">
                    Baseado em Fontes Oficiais
                  </h3>
                  <p className="text-slate-700 dark:text-slate-300 font-manrope">
                    Todo conteúdo provém de documentos da Santa Sé, Catecismo, escritos de santos reconhecidos e teologia aprovada pela Igreja. Não inventamos—sintetizamos o que a Igreja já ensina.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 sm:gap-6">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-full bg-gold-500/20 dark:bg-gold-400/20 flex items-center justify-center">
                    <span className="text-2xl">🌱</span>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-cinzel font-bold text-sacred-blue dark:text-white mb-2">
                    Navegação Livre
                  </h3>
                  <p className="text-slate-700 dark:text-slate-300 font-manrope">
                    Sem trilhas obrigatórias ou lições sequenciais. Explore os ensinamentos que você deseja, quando desejar—como folhear um compêndio digital da fé católica.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 sm:gap-6">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-full bg-gold-500/20 dark:bg-gold-400/20 flex items-center justify-center">
                    <span className="text-2xl">💝</span>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-cinzel font-bold text-sacred-blue dark:text-white mb-2">
                    Sempre Gratuito e Aberto
                  </h3>
                  <p className="text-slate-700 dark:text-slate-300 font-manrope">
                    Rosário Vivo é um projeto de código aberto impulsionado por fé, não por lucro. Os ensinamentos da Igreja pertencem a todos—não cobramos para acessá-los.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 sm:gap-6">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-full bg-gold-500/20 dark:bg-gold-400/20 flex items-center justify-center">
                    <span className="text-2xl">🔐</span>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-cinzel font-bold text-sacred-blue dark:text-white mb-2">
                    Sem Anúncios, Sem Rastreamento Invasivo
                  </h3>
                  <p className="text-slate-700 dark:text-slate-300 font-manrope">
                    Sua oração é sagrada. Nós não a monetizamos com anúncios direcionados, vendemos seus dados ou criamos perfis de consumo.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-cinzel font-bold text-gold-500 dark:text-gold-400 mb-4 text-center">
              Perguntas Frequentes
            </h2>
            <p className="text-center text-slate-600 dark:text-slate-400 mb-12 font-manrope max-w-2xl mx-auto">
              Respostas rápidas sobre Rosário Vivo
            </p>

            <div className="space-y-6">
              {/* Question 1 - Why account */}
              <div className="glass rounded-lg p-6 sm:p-8 border border-gold-500/30 dark:border-gold-400/20">
                <h3 className="text-lg sm:text-xl font-cinzel font-bold text-sacred-blue dark:text-white mb-3 flex items-start gap-3">
                  <span className="text-gold-500 dark:text-gold-400 flex-shrink-0">❓</span>
                  Por que preciso criar uma conta se o serviço é gratuito?
                </h3>
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed font-manrope">
                  Ótima pergunta! Pedimos uma conta simples (apenas email e senha) por duas razões: <strong>proteger a comunidade de spam</strong> e <strong>oferecer recursos personalizados</strong>. Com uma conta, você pode rastrear sua sequência de orações, salvar conteúdos favoritos e acessar recursos exclusivos para membros. Isso também nos ajuda a entender quais ensinamentos são mais úteis, melhorando o serviço para todos. Prometemos nunca vender seus dados ou enviar spam—sua conta é apenas sua porta de entrada para uma experiência mais rica.
                </p>
              </div>

              {/* Question 2 - Free vs Member */}
              <div className="glass rounded-lg p-6 sm:p-8 border border-gold-500/30 dark:border-gold-400/20">
                <h3 className="text-lg sm:text-xl font-cinzel font-bold text-sacred-blue dark:text-white mb-3 flex items-start gap-3">
                  <span className="text-gold-500 dark:text-gold-400 flex-shrink-0">🔓</span>
                  O que posso acessar sem conta? O que precisa de cadastro?
                </h3>
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed font-manrope mb-3">
                  <strong>Sem conta (público):</strong> Como Rezar, História do Rosário, Mistérios do Dia e Orações Tradicionais estão totalmente abertos.
                </p>
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed font-manrope">
                  <strong>Com conta gratuita:</strong> Rastreamento de sequências, Ensinamentos completos (santos, teologia, sacramentos), Ferramentas de oração, Dashboard personalizado e acesso à comunidade. Criar conta é rápido e permanece gratuito para sempre.
                </p>
              </div>

              {/* Question 3 - Content authenticity */}
              <div className="glass rounded-lg p-6 sm:p-8 border border-gold-500/30 dark:border-gold-400/20">
                <h3 className="text-lg sm:text-xl font-cinzel font-bold text-sacred-blue dark:text-white mb-3 flex items-start gap-3">
                  <span className="text-gold-500 dark:text-gold-400 flex-shrink-0">✝️</span>
                  O conteúdo é realmente da Igreja Católica?
                </h3>
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed font-manrope">
                  Sim, absolutamente. Todo nosso conteúdo é baseado em fontes oficiais: Catecismo da Igreja Católica, documentos papais (encíclicas, exortações), escritos de santos doutores reconhecidos e teologia aprovada pela Santa Sé. Não criamos doutrinas—apenas sintetizamos o que a Igreja já ensina há séculos, tornando-o acessível em formato digital.
                </p>
              </div>

              {/* Question 4 - Data privacy */}
              <div className="glass rounded-lg p-6 sm:p-8 border border-gold-500/30 dark:border-gold-400/20">
                <h3 className="text-lg sm:text-xl font-cinzel font-bold text-sacred-blue dark:text-white mb-3 flex items-start gap-3">
                  <span className="text-gold-500 dark:text-gold-400 flex-shrink-0">🔐</span>
                  Meus dados estão seguros? Vocês vendem informações?
                </h3>
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed font-manrope">
                  <strong>Nunca vendemos dados.</strong> Coletamos apenas o essencial: email para login, estatísticas de uso agregadas (anônimas) para melhorar o serviço, e suas preferências pessoais (sequências, favoritos) armazenadas com segurança. Não há anúncios direcionados, rastreamento de terceiros ou perfis de consumo. Sua vida de oração é privada e sagrada.
                </p>
              </div>

              {/* Question 5 - Offline */}
              <div className="glass rounded-lg p-6 sm:p-8 border border-gold-500/30 dark:border-gold-400/20">
                <h3 className="text-lg sm:text-xl font-cinzel font-bold text-sacred-blue dark:text-white mb-3 flex items-start gap-3">
                  <span className="text-gold-500 dark:text-gold-400 flex-shrink-0">📱</span>
                  Posso usar offline ou preciso de internet?
                </h3>
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed font-manrope">
                  Atualmente, Rosário Vivo requer conexão com internet para carregar conteúdos e sincronizar seu progresso. Estamos trabalhando em funcionalidades offline (cache de orações, conteúdos baixados) para versões futuras. Por enquanto, uma conexão estável garante a melhor experiência.
                </p>
              </div>

              {/* Question 6 - Open source */}
              <div className="glass rounded-lg p-6 sm:p-8 border border-gold-500/30 dark:border-gold-400/20">
                <h3 className="text-lg sm:text-xl font-cinzel font-bold text-sacred-blue dark:text-white mb-3 flex items-start gap-3">
                  <span className="text-gold-500 dark:text-gold-400 flex-shrink-0">💻</span>
                  Por que é open source? Posso contribuir?
                </h3>
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed font-manrope mb-4">
                  Rosário Vivo é open source porque acreditamos que ferramentas de fé devem ser transparentes e colaborativas. O código está disponível no GitHub para qualquer pessoa revisar, aprender ou contribuir. Se você é desenvolvedor, designer ou especialista em teologia católica, sua ajuda é bem-vinda! Aceitamos contribuições de código, sugestões de conteúdo e melhorias.
                </p>
                <a
                  href="https://github.com/OtavioXimarelli/HaveYouPrayedTheRosaryToday"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-gold-500/20 to-gold-600/20 border border-gold-500/40 dark:border-gold-400/30 text-gold-700 dark:text-gold-300 font-cinzel font-bold rounded-lg hover:shadow-lg hover:shadow-gold-500/20 transition-all duration-300"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                  <span>Ver no GitHub</span>
                </a>
              </div>

              {/* Question 7 - Languages */}
              <div className="glass rounded-lg p-6 sm:p-8 border border-gold-500/30 dark:border-gold-400/20">
                <h3 className="text-lg sm:text-xl font-cinzel font-bold text-sacred-blue dark:text-white mb-3 flex items-start gap-3">
                  <span className="text-gold-500 dark:text-gold-400 flex-shrink-0">🌍</span>
                  Está disponível em outros idiomas?
                </h3>
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed font-manrope">
                  Atualmente, Rosário Vivo está em Português. Planejamos expandir para Espanhol, Inglês e outros idiomas no futuro. A infraestrutura está preparada para internacionalização—é apenas uma questão de traduzir os conteúdos mantendo fidelidade teológica.
                </p>
              </div>

              {/* Question 8 - Mobile app */}
              <div className="glass rounded-lg p-6 sm:p-8 border border-gold-500/30 dark:border-gold-400/20">
                <h3 className="text-lg sm:text-xl font-cinzel font-bold text-sacred-blue dark:text-white mb-3 flex items-start gap-3">
                  <span className="text-gold-500 dark:text-gold-400 flex-shrink-0">📲</span>
                  Existe aplicativo para celular?
                </h3>
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed font-manrope">
                  Por enquanto, Rosário Vivo funciona como um aplicativo web (PWA - Progressive Web App), acessível via navegador no celular. Você pode adicioná-lo à tela inicial do seu dispositivo para uma experiência similar a um app nativo. Apps nativos para iOS e Android estão em nosso roadmap de longo prazo.
                </p>
              </div>

              {/* Question 9 - Cost */}
              <div className="glass rounded-lg p-6 sm:p-8 border border-gold-500/30 dark:border-gold-400/20">
                <h3 className="text-lg sm:text-xl font-cinzel font-bold text-sacred-blue dark:text-white mb-3 flex items-start gap-3">
                  <span className="text-gold-500 dark:text-gold-400 flex-shrink-0">💝</span>
                  Será sempre gratuito ou virará pago no futuro?
                </h3>
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed font-manrope">
                  <strong>Rosário Vivo será sempre gratuito.</strong> Nosso compromisso é manter todos os recursos essenciais acessíveis a todos, sem custo. No futuro, podemos introduzir recursos opcionais premium (como aulas ao vivo, consultorias espirituais, conteúdo exclusivo), mas o núcleo da plataforma—oração, ensinamentos e comunidade—permanecerá livre.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-gold-500/10 via-sacred-blue/10 dark:from-gold-500/20 dark:via-sacred-blue/20 to-transparent">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-cinzel font-bold text-sacred-blue dark:text-white mb-6">
              Pronto para Começar?
            </h2>
            <p className="text-lg sm:text-xl text-slate-700 dark:text-slate-300 mb-8 font-manrope max-w-2xl mx-auto">
              Junte-se a nossa comunidade global de católicos rezando o Rosário com devoção, aprendendo sua fé e crescendo juntos.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/como-rezar"
                className="px-8 py-4 bg-gradient-to-r from-gold-500 to-gold-600 text-sacred-blue font-cinzel font-bold rounded-full hover:shadow-lg hover:shadow-gold-500/30 transition-all duration-300 border-2 border-gold-400/50"
              >
                Aprender a Rezar
              </a>
              <a
                href="/ensinamentos"
                className="px-8 py-4 glass border border-gold-500/50 dark:border-gold-400/30 text-sacred-blue dark:text-white font-cinzel font-bold rounded-full hover:shadow-lg transition-all duration-300"
              >
                Explorar Ensinamentos
              </a>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
