"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { HeroSection } from "@/components/hero-section";
import { CommunityFeed } from "@/components/community-feed";
import { AuthModal } from "@/components/auth-modal";
import { Heart, Users, TrendingUp, Calendar, Sparkles, Shield, Check } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function HomePage() {
  const router = useRouter();
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<"login" | "signup">("signup");

  const openSignup = () => {
    setAuthMode("signup");
    setAuthModalOpen(true);
  };

  const switchMode = () => {
    setAuthMode(authMode === "login" ? "signup" : "login");
  };

  return (
    <main className="min-h-screen">{" "}
      <HeroSection />
      
      {/* What is the Rosary Section */}
      <section id="about" className="py-12 sm:py-16 md:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8 sm:mb-12 lg:mb-16">
            <div className="inline-block px-4 sm:px-6 py-2 bg-blue-100 rounded-full mb-3 sm:mb-4">
              <span className="text-blue-700 font-semibold text-xs sm:text-sm uppercase tracking-wide">O Santo Rosário</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-blue-900 mb-3 sm:mb-4 md:mb-6 px-2">
              O que é o Rosário?
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-blue-700 max-w-3xl mx-auto leading-relaxed px-2">
              Uma poderosa oração católica que medita os mistérios da vida de Jesus Cristo através de Maria
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-start mb-8 sm:mb-12 lg:mb-16">
            <div className="space-y-4 sm:space-y-6">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-5 sm:p-6 md:p-8 rounded-xl sm:rounded-2xl border border-blue-200">
                <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-blue-900 mb-3 sm:mb-4 flex items-center gap-2 sm:gap-3">
                  <span className="text-2xl sm:text-3xl">🙏</span>
                  História e Significado
                </h3>
                <p className="text-sm sm:text-base text-blue-700 leading-relaxed">
                  O Rosário surgiu no século XIII como uma forma de oração acessível a todos os fiéis. Através da repetição do Ave Maria e meditação dos mistérios, nos aproximamos de Cristo através do coração de Maria.
                </p>
              </div>
              
              <div className="bg-gradient-to-br from-gold-light to-gold/20 p-5 sm:p-6 md:p-8 rounded-xl sm:rounded-2xl border border-gold">
                <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-blue-900 mb-3 sm:mb-4 flex items-center gap-2 sm:gap-3">
                  <span className="text-2xl sm:text-3xl">📿</span>
                  Estrutura do Rosário
                </h3>
                <p className="text-sm sm:text-base text-blue-700 leading-relaxed mb-3 sm:mb-4">
                  O Rosário completo possui 20 mistérios divididos em quatro grupos:
                </p>
                <ul className="space-y-2 text-sm sm:text-base text-blue-700">
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

            <div className="space-y-4 sm:space-y-6">
              <div className="bg-gradient-to-br from-blue-600 to-blue-700 p-5 sm:p-6 md:p-8 rounded-xl sm:rounded-2xl text-white shadow-xl">
                <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-3 sm:mb-4 flex items-center gap-2 sm:gap-3">
                  <span className="text-2xl sm:text-3xl">✨</span>
                  Benefícios Espirituais
                </h3>
                <ul className="space-y-3 sm:space-y-4">
                  <li className="flex items-start gap-2 sm:gap-3">
                    <Check className="w-4 h-4 sm:w-5 sm:h-5 mt-1 flex-shrink-0" />
                    <span className="text-sm sm:text-base">Fortalece a fé e a confiança em Deus</span>
                  </li>
                  <li className="flex items-start gap-2 sm:gap-3">
                    <Check className="w-4 h-4 sm:w-5 sm:h-5 mt-1 flex-shrink-0" />
                    <span className="text-sm sm:text-base">Traz paz interior e serenidade</span>
                  </li>
                  <li className="flex items-start gap-2 sm:gap-3">
                    <Check className="w-4 h-4 sm:w-5 sm:h-5 mt-1 flex-shrink-0" />
                    <span className="text-sm sm:text-base">Protege contra as tentações</span>
                  </li>
                  <li className="flex items-start gap-2 sm:gap-3">
                    <Check className="w-4 h-4 sm:w-5 sm:h-5 mt-1 flex-shrink-0" />
                    <span className="text-sm sm:text-base">Aproxima-nos de Jesus através de Maria</span>
                  </li>
                  <li className="flex items-start gap-2 sm:gap-3">
                    <Check className="w-4 h-4 sm:w-5 sm:h-5 mt-1 flex-shrink-0" />
                    <span className="text-sm sm:text-base">Une famílias e comunidades em oração</span>
                  </li>
                </ul>
              </div>

              <div className="bg-gradient-to-br from-white to-blue-50 p-5 sm:p-6 md:p-8 rounded-xl sm:rounded-2xl border-2 border-blue-200">
                <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-blue-900 mb-3 sm:mb-4 flex items-center gap-2 sm:gap-3">
                  <span className="text-2xl sm:text-3xl">⏱️</span>
                  Apenas 15-20 minutos
                </h3>
                <p className="text-sm sm:text-base text-blue-700 leading-relaxed">
                  Um terço (5 mistérios) leva apenas 15-20 minutos do seu dia. Um pequeno investimento de tempo que traz imensos frutos espirituais para sua vida.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Project Section */}
      <section id="community" className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 to-blue-100">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8 sm:mb-12 lg:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-blue-900 mb-3 sm:mb-4 px-2">
              Nossa Comunidade
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-blue-700 max-w-2xl mx-auto px-2">
              Unidos em oração, crescendo juntos na fé
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mb-8 sm:mb-12">
            <div className="bg-white p-5 sm:p-6 md:p-8 rounded-xl sm:rounded-2xl shadow-lg hover:shadow-xl transition-all border-2 border-blue-100 hover:border-blue-300">
              <div className="w-16 h-16 sm:w-18 sm:h-18 md:w-20 md:h-20 mx-auto mb-4 sm:mb-5 md:mb-6 rounded-xl sm:rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-lg">
                <Calendar className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 text-white" />
              </div>
              <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-blue-900 mb-2 sm:mb-3 text-center">
                Acompanhe sua Jornada
              </h3>
              <p className="text-sm sm:text-base text-blue-700 text-center leading-relaxed">
                Registre suas orações diárias e construa uma sequência de devoção. Veja seu crescimento espiritual ao longo do tempo.
              </p>
            </div>

            <div className="bg-white p-5 sm:p-6 md:p-8 rounded-xl sm:rounded-2xl shadow-lg hover:shadow-xl transition-all border-2 border-gold/30 hover:border-gold">
              <div className="w-16 h-16 sm:w-18 sm:h-18 md:w-20 md:h-20 mx-auto mb-4 sm:mb-5 md:mb-6 rounded-xl sm:rounded-2xl bg-gradient-to-br from-gold to-gold-dark flex items-center justify-center shadow-lg">
                <Users className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 text-white" />
              </div>
              <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-blue-900 mb-2 sm:mb-3 text-center">
                Comunidade Global
              </h3>
              <p className="text-sm sm:text-base text-blue-700 text-center leading-relaxed">
                Conecte-se com milhares de católicos ao redor do mundo, compartilhando intenções e encorajamento mútuo.
              </p>
            </div>

            <div className="bg-white p-5 sm:p-6 md:p-8 rounded-xl sm:rounded-2xl shadow-lg hover:shadow-xl transition-all border-2 border-blue-100 hover:border-blue-300 sm:col-span-2 lg:col-span-1">
              <div className="w-16 h-16 sm:w-18 sm:h-18 md:w-20 md:h-20 mx-auto mb-4 sm:mb-5 md:mb-6 rounded-xl sm:rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-lg">
                <Heart className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 text-white" />
              </div>
              <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-blue-900 mb-2 sm:mb-3 text-center">
                Aprofunde sua Fé
              </h3>
              <p className="text-sm sm:text-base text-blue-700 text-center leading-relaxed">
                Fortaleça sua vida espiritual com o hábito diário da oração do terço e meditação dos mistérios.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8 sm:mb-12 lg:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-blue-900 mb-3 sm:mb-4 px-2">
              Por que participar?
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-blue-700 px-2">
              Descubra os benefícios de fazer parte desta comunidade de oração
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-4 sm:gap-5 md:gap-6">
            <div className="flex gap-3 sm:gap-4 md:gap-5 items-start p-5 sm:p-6 md:p-8 rounded-xl sm:rounded-2xl bg-gradient-to-br from-blue-50 to-white border-2 border-blue-200 hover:border-blue-400 hover:shadow-lg transition-all">
              <div className="w-12 h-12 sm:w-13 sm:h-13 md:w-14 md:h-14 rounded-lg sm:rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center flex-shrink-0 shadow-lg">
                <TrendingUp className="w-6 h-6 sm:w-6.5 sm:h-6.5 md:w-7 md:h-7 text-white" strokeWidth={2.5} />
              </div>
              <div>
                <h3 className="text-base sm:text-lg md:text-xl font-bold text-blue-900 mb-2 sm:mb-3">
                  Acompanhe seu progresso espiritual
                </h3>
                <p className="text-sm sm:text-base text-blue-700 leading-relaxed">
                  Visualize suas sequências de oração, total de terços rezados e veja seu crescimento ao longo dos meses
                </p>
              </div>
            </div>

            <div className="flex gap-3 sm:gap-4 md:gap-5 items-start p-5 sm:p-6 md:p-8 rounded-xl sm:rounded-2xl bg-gradient-to-br from-gold-light to-white border-2 border-gold/30 hover:border-gold hover:shadow-lg transition-all">
              <div className="w-12 h-12 sm:w-13 sm:h-13 md:w-14 md:h-14 rounded-lg sm:rounded-xl bg-gradient-to-br from-gold to-gold-dark flex items-center justify-center flex-shrink-0 shadow-lg">
                <Sparkles className="w-6 h-6 sm:w-6.5 sm:h-6.5 md:w-7 md:h-7 text-white" strokeWidth={2.5} />
              </div>
              <div>
                <h3 className="text-base sm:text-lg md:text-xl font-bold text-blue-900 mb-2 sm:mb-3">
                  Compartilhe suas intenções
                </h3>
                <p className="text-sm sm:text-base text-blue-700 leading-relaxed">
                  Publique suas intenções de oração e una-se a outros fiéis orando pelas mesmas causas e necessidades
                </p>
              </div>
            </div>

            <div className="flex gap-3 sm:gap-4 md:gap-5 items-start p-5 sm:p-6 md:p-8 rounded-xl sm:rounded-2xl bg-gradient-to-br from-blue-50 to-white border-2 border-blue-200 hover:border-blue-400 hover:shadow-lg transition-all">
              <div className="w-12 h-12 sm:w-13 sm:h-13 md:w-14 md:h-14 rounded-lg sm:rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center flex-shrink-0 shadow-lg">
                <Shield className="w-6 h-6 sm:w-6.5 sm:h-6.5 md:w-7 md:h-7 text-white" strokeWidth={2.5} />
              </div>
              <div>
                <h3 className="text-base sm:text-lg md:text-xl font-bold text-blue-900 mb-2 sm:mb-3">
                  Ambiente seguro e respeitoso
                </h3>
                <p className="text-sm sm:text-base text-blue-700 leading-relaxed">
                  Uma comunidade moderada onde o respeito e a fé são os pilares fundamentais de todas as interações
                </p>
              </div>
            </div>

            <div className="flex gap-3 sm:gap-4 md:gap-5 items-start p-5 sm:p-6 md:p-8 rounded-xl sm:rounded-2xl bg-gradient-to-br from-gold-light to-white border-2 border-gold/30 hover:border-gold hover:shadow-lg transition-all">
              <div className="w-12 h-12 sm:w-13 sm:h-13 md:w-14 md:h-14 rounded-lg sm:rounded-xl bg-gradient-to-br from-gold to-gold-dark flex items-center justify-center flex-shrink-0 shadow-lg">
                <Heart className="w-6 h-6 sm:w-6.5 sm:h-6.5 md:w-7 md:h-7 text-white" strokeWidth={2.5} />
              </div>
              <div>
                <h3 className="text-base sm:text-lg md:text-xl font-bold text-blue-900 mb-2 sm:mb-3">
                  Motivação diária
                </h3>
                <p className="text-sm sm:text-base text-blue-700 leading-relaxed">
                  Receba lembretes gentis e veja outras pessoas rezando para manter sua motivação em alta todos os dias
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* CTA Section */}
      <section className="py-16 sm:py-20 md:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 relative overflow-hidden">
        {/* Background decorations */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(255,215,0,0.1),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_rgba(255,255,255,0.05),transparent_50%)]" />
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="mb-6 sm:mb-8">
            <div className="w-20 h-20 sm:w-22 sm:h-22 md:w-24 md:h-24 mx-auto rounded-full bg-gradient-to-br from-gold to-gold-dark flex items-center justify-center shadow-2xl border-4 border-white/20">
              <span className="text-4xl sm:text-5xl md:text-6xl">📿</span>
            </div>
          </div>
          
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-4 sm:mb-6 px-2">
            Junte-se à nossa comunidade
          </h2>
          
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-blue-100 mb-8 sm:mb-10 md:mb-12 max-w-2xl mx-auto leading-relaxed px-2">
            Milhares de católicos ao redor do mundo já fazem parte. 
            Comece hoje sua jornada de fé e devoção ao Santo Rosário.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center px-2">
            <Button
              size="lg"
              className="group w-full sm:w-auto bg-gradient-to-r from-gold to-gold-dark hover:from-gold-dark hover:to-gold active:from-gold-dark active:to-gold text-white px-6 sm:px-8 md:px-10 py-4 sm:py-5 md:py-6 text-base sm:text-lg font-bold shadow-2xl hover:shadow-gold/50 transition-all border-2 border-white/20 touch-manipulation min-h-[3rem] sm:min-h-0"
              onClick={openSignup}
            >
              <span className="mr-2">Começar agora</span>
              <span className="group-hover:scale-125 transition-transform">🚀</span>
            </Button>
            
            <Button
              size="lg"
              className="w-full sm:w-auto bg-white/10 hover:bg-white/20 active:bg-white/30 text-white border-2 border-white/30 hover:border-white/50 px-6 sm:px-8 md:px-10 py-4 sm:py-5 md:py-6 text-base sm:text-lg font-semibold backdrop-blur-sm transition-all touch-manipulation min-h-[3rem] sm:min-h-0"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              Saiba mais
            </Button>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="py-10 sm:py-12 md:py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-950 to-blue-900">
        <div className="max-w-6xl mx-auto">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 md:gap-12 mb-8 sm:mb-10 md:mb-12">
            <div>
              <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                <span className="text-3xl sm:text-4xl">📿</span>
                <span className="text-white font-bold text-lg sm:text-xl">Terço Hoje</span>
              </div>
              <p className="text-blue-200 text-sm leading-relaxed">
                Uma comunidade global de católicos unidos em oração diária do Santo Rosário.
              </p>
            </div>
            
            <div>
              <h4 className="text-white font-bold mb-3 sm:mb-4 text-base sm:text-lg">Sobre o Rosário</h4>
              <ul className="space-y-2 sm:space-y-3 text-sm text-blue-200">
                <li className="hover:text-gold transition-colors cursor-pointer touch-manipulation" onClick={() => router.push("/como-rezar")}>📖 Como rezar o terço</li>
                <li className="hover:text-gold transition-colors cursor-pointer touch-manipulation" onClick={() => router.push("/historia")}>📜 História do Rosário</li>
                <li className="hover:text-gold transition-colors cursor-pointer touch-manipulation" onClick={() => router.push("/misterios-do-dia")}>🌟 Mistérios do dia</li>
                <li className="hover:text-gold transition-colors cursor-pointer touch-manipulation" onClick={() => router.push("/oracoes-tradicionais")}>🙏 Orações tradicionais</li>
              </ul>
            </div>
            
            <div className="sm:col-span-2 lg:col-span-1">
              <h4 className="text-white font-bold mb-3 sm:mb-4 text-base sm:text-lg">Comunidade</h4>
              <ul className="space-y-2 sm:space-y-3 text-sm text-blue-200">
                <li className="hover:text-gold transition-colors cursor-pointer touch-manipulation">👥 Nossos membros</li>
                <li className="hover:text-gold transition-colors cursor-pointer touch-manipulation">💬 Feed de orações</li>
                <li className="hover:text-gold transition-colors cursor-pointer touch-manipulation">📊 Estatísticas</li>
                <li className="hover:text-gold transition-colors cursor-pointer touch-manipulation">✉️ Contato</li>
              </ul>
            </div>
          </div>
          
          <div className="text-center pt-6 sm:pt-8 border-t border-blue-800">
            <p className="text-blue-300 text-xs sm:text-sm font-medium mb-2">
              Feito com fé e amor • {new Date().getFullYear()} • Você Já Rezou o Terço Hoje?
            </p>
            <p className="text-blue-400 text-xs italic px-2">
              "Reze o Rosário todos os dias para obter a paz no mundo" - Nossa Senhora de Fátima
            </p>
          </div>
        </div>
      </footer>

      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        mode={authMode}
        onSwitchMode={switchMode}
      />
    </main>
  );
}
