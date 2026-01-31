"use client";

import { Construction, Sparkles, Heart, Calendar, ArrowLeft } from "lucide-react";

export default function DashboardPage() {
  const handleBackClick = () => {
    window.location.href = "/";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 pt-24 pb-12">
      <main className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">
          {/* Main Content Card */}
          <div className="bg-white rounded-2xl shadow-2xl border-2 border-blue-200 p-6 sm:p-8 md:p-12">
            {/* Icon */}
            <div className="flex justify-center mb-6 sm:mb-8">
              <div className="relative">
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-br from-gold to-gold-dark flex items-center justify-center shadow-lg animate-pulse">
                  <Construction className="w-10 h-10 sm:w-12 sm:h-12 text-white" strokeWidth={2.5} />
                </div>
                <div className="absolute -top-2 -right-2">
                  <Sparkles className="w-6 h-6 sm:w-8 sm:h-8 text-gold animate-pulse" fill="#FFD700" />
                </div>
              </div>
            </div>

            {/* Title */}
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-blue-900 mb-4 sm:mb-6 text-center">
              Dashboard em Construção
            </h1>

            {/* Description */}
            <p className="text-base sm:text-lg md:text-xl text-blue-700 mb-6 sm:mb-8 leading-relaxed text-center">
              Estamos trabalhando arduamente para trazer uma experiência incrível de acompanhamento 
              da sua jornada espiritual. Em breve, você poderá:
            </p>

            {/* Feature List */}
            <div className="space-y-4 sm:space-y-5 text-left max-w-lg mx-auto mb-8 sm:mb-10">
              <div className="flex items-start gap-3 sm:gap-4 p-4 sm:p-5 rounded-xl bg-gradient-to-r from-blue-50 to-blue-100 border border-blue-200">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center flex-shrink-0 shadow-md">
                  <Calendar className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-blue-900 text-sm sm:text-base mb-1">
                    Registrar suas orações diárias
                  </h3>
                  <p className="text-xs sm:text-sm text-blue-600">
                    Acompanhe sua sequência de devoção
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 sm:gap-4 p-4 sm:p-5 rounded-xl bg-gradient-to-r from-gold-light to-gold/20 border border-gold">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-gradient-to-br from-gold to-gold-dark flex items-center justify-center flex-shrink-0 shadow-md">
                  <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-blue-900 text-sm sm:text-base mb-1">
                    Ver estatísticas e progresso
                  </h3>
                  <p className="text-xs sm:text-sm text-blue-600">
                    Visualize seu crescimento espiritual
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 sm:gap-4 p-4 sm:p-5 rounded-xl bg-gradient-to-r from-blue-50 to-blue-100 border border-blue-200">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center flex-shrink-0 shadow-md">
                  <Heart className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-blue-900 text-sm sm:text-base mb-1">
                    Compartilhar intenções de oração
                  </h3>
                  <p className="text-xs sm:text-sm text-blue-600">
                    Conecte-se com a comunidade
                  </p>
                </div>
              </div>
            </div>

            {/* Footer Message */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl p-4 sm:p-6 mb-6">
              <p className="text-sm sm:text-base font-semibold mb-2 text-center">
                🙏 Obrigado pela sua paciência!
              </p>
              <p className="text-xs sm:text-sm text-blue-100 text-center">
                Enquanto isso, continue rezando o terço diariamente.<br />
                Deus abençoe sua jornada de fé!
              </p>
            </div>

            {/* Back to Home Button */}
            <div className="text-center">
              <button
                type="button"
                onClick={handleBackClick}
                className="inline-flex items-center justify-center gap-2 bg-white text-blue-600 hover:text-blue-800 hover:bg-blue-50 font-semibold text-sm sm:text-base transition-all px-6 py-3 rounded-lg border-2 border-blue-300 hover:border-blue-500 shadow-md hover:shadow-lg cursor-pointer active:scale-95"
              >
                <ArrowLeft className="w-4 h-4" />
                Voltar para a página inicial
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
