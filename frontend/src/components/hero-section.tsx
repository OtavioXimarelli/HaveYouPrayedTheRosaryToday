"use client";

import { useState } from "react";
import { Sparkles, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTodayStatus } from "@/hooks/use-rosary";
import { CheckInModal } from "./check-in-modal";
import { StreakCounter } from "./streak-counter";

export function HeroSection() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data: status, isLoading } = useTodayStatus();

  const hasPrayed = status?.hasPrayed ?? false;

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-4 py-16 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-blue-100" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(59,130,246,0.1),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_rgba(255,215,0,0.1),transparent_50%)]" />
      
      {/* Decorative elements */}
      <div className="absolute top-20 right-20 w-2 h-2 bg-gold rounded-full animate-pulse" />
      <div className="absolute bottom-40 left-20 w-3 h-3 bg-blue-400 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }} />
      <div className="absolute top-1/3 left-1/4 w-1.5 h-1.5 bg-gold/60 rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
      
      <div className="relative z-10 max-w-2xl mx-auto">
        {/* Stats display if available */}
        {status?.stats && status.stats.totalCheckIns > 0 && (
          <div className="mb-8 animate-fade-in">
            <StreakCounter stats={status.stats} />
          </div>
        )}

        {/* Rosary icon */}
        <div className="mb-8 relative">
          <div className={`w-28 h-28 mx-auto rounded-full bg-gradient-to-br from-gold to-gold-dark flex items-center justify-center shadow-2xl border-4 border-white ${hasPrayed ? 'animate-glow' : ''}`}>
            {hasPrayed ? (
              <Check className="w-14 h-14 text-white" strokeWidth={3} />
            ) : (
              <span className="text-6xl">📿</span>
            )}
          </div>
          {hasPrayed && (
            <Sparkles className="absolute -top-2 -right-2 w-10 h-10 text-blue-600 animate-pulse-gentle" />
          )}
        </div>

        {/* Main heading */}
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-blue-900 mb-6 tracking-tight">
          Você já rezou o
          <span className="block bg-gradient-to-r from-gold to-gold-dark bg-clip-text text-transparent mt-2">Terço hoje?</span>
        </h1>

        <p className="text-xl md:text-2xl text-blue-700 mb-10 max-w-2xl mx-auto leading-relaxed">
          {hasPrayed
            ? "Parabéns! Você já rezou hoje. Sua fidelidade é uma bênção! 🙏"
            : "Una-se a milhares de católicos em oração. O Rosário é uma poderosa ferramenta de fé e esperança."}
        </p>

        {/* CTA Button */}
        {!hasPrayed ? (
          <Button
            size="lg"
            onClick={() => setIsModalOpen(true)}
            disabled={isLoading}
            className="group bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-8 py-6 text-lg font-semibold shadow-xl hover:shadow-2xl transition-all"
          >
            <span className="mr-2">✅ Sim, eu rezei hoje</span>
            <span className="group-hover:scale-125 transition-transform">🙏</span>
          </Button>
        ) : (
          <div className="space-y-4">
            <div className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-green-50 to-emerald-50 text-green-700 rounded-full border-2 border-green-300 shadow-lg">
              <Check className="w-6 h-6" strokeWidth={3} />
              <span className="font-bold text-lg">Terço concluído por hoje</span>
            </div>
            <p className="text-blue-600 text-base font-medium">
              Volte amanhã para continuar sua jornada de fé! ✨
            </p>
          </div>
        )}

        {/* Scroll indicator */}
        <div className="mt-20 animate-bounce">
          <div className="w-8 h-12 mx-auto border-2 border-blue-300 rounded-full flex items-start justify-center pt-2">
            <div className="w-1.5 h-3 bg-blue-400 rounded-full" />
          </div>
          <p className="text-blue-500 text-sm mt-3 font-medium">Descubra mais sobre o Rosário</p>
        </div>
      </div>

      <CheckInModal open={isModalOpen} onOpenChange={setIsModalOpen} />
    </section>
  );
}
