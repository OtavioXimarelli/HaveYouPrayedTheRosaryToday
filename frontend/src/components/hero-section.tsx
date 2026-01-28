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
    <section className="relative min-h-[70vh] flex flex-col items-center justify-center text-center px-4 py-16 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-b from-navy-darker via-navy to-navy-light opacity-95" />
      <div className="absolute inset-0 bg-[url('/rosary-pattern.svg')] opacity-5" />
      
      {/* Glowing orb effect */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gold/5 rounded-full blur-3xl" />
      
      <div className="relative z-10 max-w-2xl mx-auto">
        {/* Stats display if available */}
        {status?.stats && status.stats.totalCheckIns > 0 && (
          <div className="mb-8 animate-fade-in">
            <StreakCounter stats={status.stats} />
          </div>
        )}

        {/* Rosary icon */}
        <div className="mb-8 relative">
          <div className={`w-24 h-24 mx-auto rounded-full bg-gradient-to-br from-gold-light to-gold flex items-center justify-center shadow-2xl ${hasPrayed ? 'animate-glow' : ''}`}>
            {hasPrayed ? (
              <Check className="w-12 h-12 text-navy-dark" strokeWidth={3} />
            ) : (
              <span className="text-5xl">📿</span>
            )}
          </div>
          {hasPrayed && (
            <Sparkles className="absolute -top-2 -right-2 w-8 h-8 text-gold animate-pulse-gentle" />
          )}
        </div>

        {/* Main heading */}
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 tracking-tight">
          Você já rezou o
          <span className="block text-gold mt-2">Terço hoje?</span>
        </h1>

        <p className="text-lg md:text-xl text-white/70 mb-10 max-w-lg mx-auto">
          {hasPrayed
            ? "Você já rezou hoje. Sua fidelidade é linda! 🙏"
            : "Reserve um momento para se conectar com Deus através do Santo Rosário. Sua oração faz a diferença."}
        </p>

        {/* CTA Button */}
        {!hasPrayed ? (
          <Button
            variant="gold"
            size="xl"
            onClick={() => setIsModalOpen(true)}
            disabled={isLoading}
            className="group"
          >
            <span className="mr-2">Sim, eu rezei hoje</span>
            <span className="group-hover:scale-125 transition-transform">✨</span>
          </Button>
        ) : (
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-6 py-3 bg-green-500/20 text-green-300 rounded-full border border-green-500/30">
              <Check className="w-5 h-5" />
              <span className="font-medium">Terço concluído por hoje</span>
            </div>
            <p className="text-white/50 text-sm">
              Volte amanhã para continuar sua sequência!
            </p>
          </div>
        )}

        {/* Scroll indicator */}
        <div className="mt-16 animate-bounce">
          <div className="w-8 h-12 mx-auto border-2 border-white/30 rounded-full flex items-start justify-center pt-2">
            <div className="w-1.5 h-3 bg-white/50 rounded-full" />
          </div>
          <p className="text-white/40 text-sm mt-2">Ver orações da comunidade</p>
        </div>
      </div>

      <CheckInModal open={isModalOpen} onOpenChange={setIsModalOpen} />
    </section>
  );
}
