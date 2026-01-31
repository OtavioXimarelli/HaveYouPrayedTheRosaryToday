"use client";

import { HeroSection } from "@/components/hero-section";
import { CommunityFeed } from "@/components/community-feed";
import { Heart, Users, TrendingUp, Calendar, Sparkles, Shield, Check } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <HeroSection />
      
      {/* What is the Rosary Section */}
      <section className="py-24 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-block px-6 py-2 bg-blue-100 rounded-full mb-4">
              <span className="text-blue-700 font-semibold text-sm uppercase tracking-wide">O Santo Rosário</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-blue-900 mb-6">
              O que é o Rosário?
            </h2>
            <p className="text-xl text-blue-700 max-w-3xl mx-auto leading-relaxed">
              Uma poderosa oração católica que medita os mistérios da vida de Jesus Cristo através de Maria
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
            <div className="space-y-6">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-8 rounded-2xl border border-blue-200">
                <h3 className="text-2xl font-bold text-blue-900 mb-4 flex items-center gap-3">
                  <span className="text-3xl">🙏</span>
                  História e Significado
                </h3>
                <p className="text-blue-700 leading-relaxed">
                  O Rosário surgiu no século XIII como uma forma de oração acessível a todos os fiéis. Através da repetição do Ave Maria e meditação dos mistérios, nos aproximamos de Cristo através do coração de Maria.
                </p>
              </div>
              
              <div className="bg-gradient-to-br from-gold-light to-gold/20 p-8 rounded-2xl border border-gold">
                <h3 className="text-2xl font-bold text-blue-900 mb-4 flex items-center gap-3">
                  <span className="text-3xl">📿</span>
                  Estrutura do Rosário
                </h3>
                <p className="text-blue-700 leading-relaxed mb-4">
                  O Rosário completo possui 20 mistérios divididos em quatro grupos:
                </p>
                <ul className="space-y-2 text-blue-700">
                  <li className="flex items-start gap-2">
                    <span className="text-gold font-bold mt-1">•</span>
                    <span><strong>Mistérios Gozosos</strong> (Segunda e Sábado)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-gold font-bold mt-1">•</span>
                    <span><strong>Mistérios Luminosos</strong> (Quinta-feira)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-gold font-bold mt-1">•</span>
                    <span><strong>Mistérios Dolorosos</strong> (Terça e Sexta)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-gold font-bold mt-1">•</span>
                    <span><strong>Mistérios Gloriosos</strong> (Quarta e Domingo)</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-gradient-to-br from-blue-600 to-blue-700 p-8 rounded-2xl text-white shadow-xl">
                <h3 className="text-2xl font-bold mb-4 flex items-center gap-3">
                  <span className="text-3xl">✨</span>
                  Benefícios Espirituais
                </h3>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 mt-1 flex-shrink-0" />
                    <span>Fortalece a fé e a confiança em Deus</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 mt-1 flex-shrink-0" />
                    <span>Traz paz interior e serenidade</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 mt-1 flex-shrink-0" />
                    <span>Protege contra as tentações</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 mt-1 flex-shrink-0" />
                    <span>Aproxima-nos de Jesus através de Maria</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 mt-1 flex-shrink-0" />
                    <span>Une famílias e comunidades em oração</span>
                  </li>
                </ul>
              </div>

              <div className="bg-gradient-to-br from-white to-blue-50 p-8 rounded-2xl border-2 border-blue-200">
                <h3 className="text-2xl font-bold text-blue-900 mb-4 flex items-center gap-3">
                  <span className="text-3xl">⏱️</span>
                  Apenas 15-20 minutos
                </h3>
                <p className="text-blue-700 leading-relaxed">
                  Um terço (5 mistérios) leva apenas 15-20 minutos do seu dia. Um pequeno investimento de tempo que traz imensos frutos espirituais para sua vida.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Project Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-blue-50 to-blue-100">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-blue-900 mb-4">
              Nossa Comunidade
            </h2>
            <p className="text-xl text-blue-700 max-w-2xl mx-auto">
              Unidos em oração, crescendo juntos na fé
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all border-2 border-blue-100 hover:border-blue-300">
              <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-lg">
                <Calendar className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-blue-900 mb-3 text-center">
                Acompanhe sua Jornada
              </h3>
              <p className="text-blue-700 text-center leading-relaxed">
                Registre suas orações diárias e construa uma sequência de devoção. Veja seu crescimento espiritual ao longo do tempo.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all border-2 border-gold/30 hover:border-gold">
              <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-gold to-gold-dark flex items-center justify-center shadow-lg">
                <Users className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-blue-900 mb-3 text-center">
                Comunidade Global
              </h3>
              <p className="text-blue-700 text-center leading-relaxed">
                Conecte-se com milhares de católicos ao redor do mundo, compartilhando intenções e encorajamento mútuo.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all border-2 border-blue-100 hover:border-blue-300">
              <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-lg">
                <Heart className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-blue-900 mb-3 text-center">
                Aprofunde sua Fé
              </h3>
              <p className="text-blue-700 text-center leading-relaxed">
                Fortaleça sua vida espiritual com o hábito diário da oração do terço e meditação dos mistérios.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-blue-900 mb-4">
              Por que participar?
            </h2>
            <p className="text-xl text-blue-700">
              Descubra os benefícios de fazer parte desta comunidade de oração
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="flex gap-5 items-start p-8 rounded-2xl bg-gradient-to-br from-blue-50 to-white border-2 border-blue-200 hover:border-blue-400 hover:shadow-lg transition-all">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center flex-shrink-0 shadow-lg">
                <TrendingUp className="w-7 h-7 text-white" strokeWidth={2.5} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-blue-900 mb-3">
                  Acompanhe seu progresso espiritual
                </h3>
                <p className="text-blue-700 leading-relaxed">
                  Visualize suas sequências de oração, total de terços rezados e veja seu crescimento ao longo dos meses
                </p>
              </div>
            </div>

            <div className="flex gap-5 items-start p-8 rounded-2xl bg-gradient-to-br from-gold-light to-white border-2 border-gold/30 hover:border-gold hover:shadow-lg transition-all">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-gold to-gold-dark flex items-center justify-center flex-shrink-0 shadow-lg">
                <Sparkles className="w-7 h-7 text-white" strokeWidth={2.5} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-blue-900 mb-3">
                  Compartilhe suas intenções
                </h3>
                <p className="text-blue-700 leading-relaxed">
                  Publique suas intenções de oração e una-se a outros fiéis orando pelas mesmas causas e necessidades
                </p>
              </div>
            </div>

            <div className="flex gap-5 items-start p-8 rounded-2xl bg-gradient-to-br from-blue-50 to-white border-2 border-blue-200 hover:border-blue-400 hover:shadow-lg transition-all">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center flex-shrink-0 shadow-lg">
                <Shield className="w-7 h-7 text-white" strokeWidth={2.5} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-blue-900 mb-3">
                  Ambiente seguro e respeitoso
                </h3>
                <p className="text-blue-700 leading-relaxed">
                  Uma comunidade moderada onde o respeito e a fé são os pilares fundamentais de todas as interações
                </p>
              </div>
            </div>

            <div className="flex gap-5 items-start p-8 rounded-2xl bg-gradient-to-br from-gold-light to-white border-2 border-gold/30 hover:border-gold hover:shadow-lg transition-all">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-gold to-gold-dark flex items-center justify-center flex-shrink-0 shadow-lg">
                <Heart className="w-7 h-7 text-white" strokeWidth={2.5} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-blue-900 mb-3">
                  Motivação diária
                </h3>
                <p className="text-blue-700 leading-relaxed">
                  Receba lembretes gentis e veja outras pessoas rezando para manter sua motivação em alta todos os dias
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* CTA Section */}
      <section className="py-24 px-4 bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 relative overflow-hidden">
        {/* Background decorations */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(255,215,0,0.1),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_rgba(255,255,255,0.05),transparent_50%)]" />
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="mb-8">
            <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-br from-gold to-gold-dark flex items-center justify-center shadow-2xl border-4 border-white/20">
              <span className="text-6xl">📿</span>
            </div>
          </div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            Junte-se à nossa comunidade
          </h2>
          
          <p className="text-xl md:text-2xl text-blue-100 mb-12 max-w-2xl mx-auto leading-relaxed">
            Milhares de católicos ao redor do mundo já fazem parte. 
            Comece hoje sua jornada de fé e devoção ao Santo Rosário.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              size="lg"
              className="group w-full sm:w-auto bg-gradient-to-r from-gold to-gold-dark hover:from-gold-dark hover:to-gold text-white px-10 py-6 text-lg font-bold shadow-2xl hover:shadow-gold/50 transition-all border-2 border-white/20"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              <span className="mr-2">Começar agora</span>
              <span className="group-hover:scale-125 transition-transform">🚀</span>
            </Button>
            
            <Button
              size="lg"
              className="w-full sm:w-auto bg-white/10 hover:bg-white/20 text-white border-2 border-white/30 hover:border-white/50 px-10 py-6 text-lg font-semibold backdrop-blur-sm transition-all"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              Saiba mais
            </Button>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="py-16 px-4 bg-gradient-to-br from-blue-950 to-blue-900">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-12 mb-12">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="text-4xl">📿</span>
                <span className="text-white font-bold text-xl">Terço Hoje</span>
              </div>
              <p className="text-blue-200 text-sm leading-relaxed">
                Uma comunidade global de católicos unidos em oração diária do Santo Rosário.
              </p>
            </div>
            
            <div>
              <h4 className="text-white font-bold mb-4 text-lg">Sobre o Rosário</h4>
              <ul className="space-y-3 text-sm text-blue-200">
                <li className="hover:text-gold transition-colors cursor-pointer">📖 Como rezar o terço</li>
                <li className="hover:text-gold transition-colors cursor-pointer">📜 História do Rosário</li>
                <li className="hover:text-gold transition-colors cursor-pointer">🌟 Mistérios do dia</li>
                <li className="hover:text-gold transition-colors cursor-pointer">🙏 Orações tradicionais</li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-white font-bold mb-4 text-lg">Comunidade</h4>
              <ul className="space-y-3 text-sm text-blue-200">
                <li className="hover:text-gold transition-colors cursor-pointer">👥 Nossos membros</li>
                <li className="hover:text-gold transition-colors cursor-pointer">💬 Feed de orações</li>
                <li className="hover:text-gold transition-colors cursor-pointer">📊 Estatísticas</li>
                <li className="hover:text-gold transition-colors cursor-pointer">✉️ Contato</li>
              </ul>
            </div>
          </div>
          
          <div className="text-center pt-8 border-t border-blue-800">
            <p className="text-blue-300 text-sm font-medium mb-2">
              Feito com fé e amor • {new Date().getFullYear()} • Você Já Rezou o Terço Hoje?
            </p>
            <p className="text-blue-400 text-xs italic">
              "Reze o Rosário todos os dias para obter a paz no mundo" - Nossa Senhora de Fátima
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}
