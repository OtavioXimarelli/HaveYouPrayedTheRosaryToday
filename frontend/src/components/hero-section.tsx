"use client";

import { useState } from "react";
import { Sparkles, Check, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTodayStatus } from "@/hooks/use-rosary";
import { CheckInModal } from "./check-in-modal";
import { ComingSoonModal } from "./coming-soon-modal";
import { StreakCounter } from "./streak-counter";

export function HeroSection() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [comingSoonModalOpen, setComingSoonModalOpen] = useState(false);
  const { data: status, isLoading } = useTodayStatus();

  const hasPrayed = status?.hasPrayed ?? false;

  const handlePrayClick = () => {
    setComingSoonModalOpen(true);
  };

  return (
    <section className="relative min-h-[100dvh] flex flex-col items-center justify-center overflow-hidden">
      {/* Background - Light Mode */}
      <div className="absolute inset-0 bg-sacred-cream dark:hidden">
        {/* Radial gold glow */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(212,175,55,0.15)_0%,transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_rgba(212,175,55,0.1)_0%,transparent_40%)]" />
        {/* Noise texture */}
        <div className="absolute inset-0 opacity-30 noise-overlay" />
      </div>

      {/* Background - Dark Mode */}
      <div className="absolute inset-0 hidden dark:block bg-gradient-to-b from-slate-950 via-sacred-blue to-slate-950">
        {/* Radial gold glow from top */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(212,175,55,0.12)_0%,transparent_50%)]" />
        {/* Stars effect */}
        <div className="absolute inset-0">
          <div className="absolute top-20 right-[20%] w-1 h-1 bg-gold-400 rounded-full animate-pulse" />
          <div className="absolute top-32 right-[35%] w-1.5 h-1.5 bg-gold-300 rounded-full animate-pulse" style={{ animationDelay: "0.5s" }} />
          <div className="absolute top-16 left-[25%] w-1 h-1 bg-gold-400 rounded-full animate-pulse" style={{ animationDelay: "1s" }} />
          <div className="absolute top-40 left-[15%] w-0.5 h-0.5 bg-gold-300 rounded-full animate-pulse" style={{ animationDelay: "0.3s" }} />
          <div className="absolute bottom-40 right-[10%] w-1 h-1 bg-gold-400/60 rounded-full animate-pulse" style={{ animationDelay: "0.7s" }} />
          <div className="absolute bottom-60 left-[30%] w-0.5 h-0.5 bg-gold-300/60 rounded-full animate-pulse" style={{ animationDelay: "1.2s" }} />
        </div>
      </div>

      {/* Decorative cross pattern - subtle */}
      <div className="absolute top-10 left-10 text-gold-500/10 dark:text-gold-400/5 text-[200px] font-serif select-none pointer-events-none">
        ✝
      </div>
      <div className="absolute bottom-10 right-10 text-gold-500/10 dark:text-gold-400/5 text-[150px] font-serif select-none pointer-events-none rotate-12">
        ✝
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Stats display if available */}
        {status?.stats && status.stats.totalCheckIns > 0 && (
          <div className="mb-8 animate-fade-up opacity-0" style={{ animationDelay: "100ms" }}>
            <StreakCounter stats={status.stats} />
          </div>
        )}

        {/* Rosary icon with glow effect */}
        <div className="mb-8 sm:mb-10 relative inline-block animate-fade-up opacity-0" style={{ animationDelay: "200ms" }}>
          <div 
            className={`w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-full flex items-center justify-center shadow-2xl border-2 border-gold-500/30 dark:border-gold-400/40 transition-all duration-500 ${
              hasPrayed 
                ? "bg-gradient-to-br from-gold-500 to-gold-600 animate-pulse-gold" 
                : "bg-gradient-to-br from-sacred-blue to-slate-800 dark:from-slate-800 dark:to-slate-900"
            }`}
          >
            {hasPrayed ? (
              <Check className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 text-white" strokeWidth={2.5} />
            ) : (
              <span className="text-5xl sm:text-6xl md:text-7xl">📿</span>

            )}
          </div>
          {hasPrayed && (
            <Sparkles className="absolute -top-2 -right-2 sm:-top-3 sm:-right-3 w-8 h-8 sm:w-10 sm:h-10 text-gold-500 animate-pulse" />
          )}
          {/* Glow ring */}
          <div className={`absolute inset-0 rounded-full ${hasPrayed ? "ring-4 ring-gold-400/30 animate-ping" : ""}`} style={{ animationDuration: "2s" }} />
        </div>

        {/* Main heading */}
        <h1 className="animate-fade-up opacity-0" style={{ animationDelay: "300ms" }}>
          <span className="block text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-cinzel font-bold bg-gradient-to-r from-gold-500 via-gold-400 to-gold-600 bg-clip-text text-transparent mb-4">
            Rosário Vivo
          </span>
          <span className="block text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-cinzel font-semibold text-sacred-blue dark:text-white">
            Viva sua fé, cada dia
          </span>
        </h1>

        {/* Subtitle */}
        <p className="mt-6 sm:mt-8 text-lg sm:text-xl md:text-2xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed font-manrope animate-fade-up opacity-0" style={{ animationDelay: "400ms" }}>
          {hasPrayed
            ? "Parabéns! Você já rezou hoje. Sua fidelidade é uma bênção!"
            : "Acompanhe sua jornada espiritual, explore conteúdos profundos e conecte-se com uma comunidade global de fé."}
        </p>

        {/* CTA Button */}
        <div className="mt-10 sm:mt-12 animate-fade-up opacity-0" style={{ animationDelay: "500ms" }}>
          {!hasPrayed ? (
            <Button
              size="lg"
              onClick={handlePrayClick}
              disabled={isLoading}
              data-testid="hero-pray-button"
              className="group relative px-8 sm:px-10 py-6 sm:py-7 text-lg sm:text-xl font-cinzel font-bold tracking-wide rounded-full bg-gradient-to-r from-gold-500 to-gold-600 text-sacred-blue hover:shadow-gold-glow-lg transition-all duration-300 border-2 border-gold-400/50"
            >
              <span className="relative z-10 flex items-center gap-3">
                <span>Vamos Rezar</span>
                <span className="text-2xl group-hover:rotate-12 transition-transform duration-300">✝</span>
              </span>
              {/* Coming soon indicator */}
              <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-sacred-blue animate-pulse shadow-lg" title="Em desenvolvimento" />
              {/* Shimmer effect */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
            </Button>
          ) : (
            <div className="space-y-4">
              <div className="inline-flex items-center gap-3 px-8 py-4 glass rounded-full border border-green-500/30 dark:border-green-400/30">
                <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center">
                  <Check className="w-5 h-5 text-white" strokeWidth={3} />
                </div>
                <span className="font-cinzel font-bold text-green-700 dark:text-green-400 text-lg">
                  Terço concluído por hoje
                </span>
              </div>
              <p className="text-slate-500 dark:text-slate-400 font-medium">
                Volte amanhã para continuar sua jornada de fé
              </p>
            </div>
          )}
        </div>

        {/* Scroll indicator */}
        <div className="mt-16 sm:mt-20 animate-bounce">
          <button 
            onClick={() => {
              const element = document.getElementById("about");
              if (element) element.scrollIntoView({ behavior: "smooth" });
            }}
            className="inline-flex flex-col items-center gap-2 text-slate-400 dark:text-slate-500 hover:text-gold-500 dark:hover:text-gold-400 transition-colors"
            data-testid="scroll-indicator"
          >
            <span className="text-sm font-medium tracking-wide uppercase">Descubra mais</span>
            <ChevronDown className="w-6 h-6" />
          </button>
        </div>
      </div>

      <CheckInModal open={isModalOpen} onOpenChange={setIsModalOpen} />
      
      <ComingSoonModal
        isOpen={comingSoonModalOpen}
        onClose={() => setComingSoonModalOpen(false)}
        featureName="Funcionalidade de Check-in / Comunidade"
      />
    </section>
  );
}
