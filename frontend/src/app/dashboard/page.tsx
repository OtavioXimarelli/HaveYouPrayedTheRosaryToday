"use client";

import { useState } from "react";
import { Flame, Trophy, Calendar, Heart, Sparkles, ChevronRight, Clock } from "lucide-react";
import { StreakCounter } from "@/components/streak-counter";
import { CheckInModal } from "@/components/check-in-modal";
import { useTodayStatus, useUserStats } from "@/hooks/use-rosary";
import { getMysteryInfo, MysteryType } from "@/types";

export default function DashboardPage() {
  const [showCheckInModal, setShowCheckInModal] = useState(false);
  const { data: todayStatus } = useTodayStatus();
  const { data: stats, isLoading } = useUserStats();

  const mockRecentActivity = [
    {
      id: 1,
      user: "Você",
      mystery: "joyful" as MysteryType,
      time: "Hoje às 07:30",
      intentions: 2,
    },
    {
      id: 2,
      user: "Maria Silva",
      mystery: "sorrowful" as MysteryType,
      time: "Hoje às 18:45",
      intentions: 3,
    },
    {
      id: 3,
      user: "João Santos",
      mystery: "glorious" as MysteryType,
      time: "Ontem às 06:00",
      intentions: 1,
    },
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background dark:bg-navy-darker pt-24 pb-12">
        <div className="container mx-auto px-4">
          <div className="animate-pulse space-y-6">
            <div className="h-12 bg-muted rounded-xl w-1/3" />
            <div className="grid md:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-40 bg-muted rounded-2xl" />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background dark:bg-navy-darker pt-24 pb-20">
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        {/* Welcome Header */}
        <div className="mb-12 sm:mb-16 animate-fade-up">
          <h1 className="font-cinzel font-bold text-4xl sm:text-5xl md:text-6xl text-foreground dark:text-white mb-3 tracking-tight">
            Bem-vindo de volta
          </h1>
          <p className="font-manrope text-lg text-muted-foreground">
            Continue sua jornada espiritual com o Terço
          </p>
        </div>

        {/* Main CTA - Check In Button */}
        <div className="mb-12 sm:mb-16">
          <button
            onClick={() => setShowCheckInModal(true)}
            className="w-full md:w-auto glass rounded-3xl px-8 sm:px-12 py-6 sm:py-8 sacred-border hover:-translate-y-1 transition-transform duration-300 cursor-pointer group"
            data-testid="dashboard-checkin-button"
          >
            <div className="flex items-center justify-between gap-4">
              <div className="text-left">
                <div className="font-cinzel font-bold text-2xl sm:text-3xl text-foreground dark:text-white mb-1">
                  Registrar Oração
                </div>
                <p className="font-manrope text-sm text-muted-foreground">
                  {todayStatus?.hasPrayed
                    ? "Você já rezou hoje! Continue sua sequência."
                    : "Reze seu Terço de hoje"}
                </p>
              </div>
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br from-gold to-gold-dark flex items-center justify-center flex-shrink-0 shadow-lg group-hover:shadow-[0_0_30px_-5px_rgba(212,175,55,0.6)] transition-shadow">
                <Heart className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
              </div>
            </div>
          </button>
        </div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-3 gap-6 sm:gap-8 mb-12 sm:mb-16">
          {/* Streak Card */}
          <div className="glass rounded-2xl sacred-border p-6 sm:p-8 hover:-translate-y-1 transition-transform duration-300">
            <div className="flex items-start justify-between mb-6">
              <div>
                <p className="font-manrope text-sm text-muted-foreground mb-2">
                  SEQUÊNCIA ATUAL
                </p>
                <div className="font-cinzel font-bold text-5xl sm:text-6xl text-foreground dark:text-white">
                  {stats?.currentStreak || 0}
                </div>
                <p className="font-manrope text-sm text-muted-foreground mt-2">
                  dias seguidos
                </p>
              </div>
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center shadow-lg">
                <Flame className="w-7 h-7 text-white" />
              </div>
            </div>
            {(stats?.currentStreak || 0) >= 7 && (
              <div className="bg-orange-500/10 text-orange-600 dark:text-orange-400 px-3 py-2 rounded-lg text-xs font-semibold inline-block">
                Pegando fogo! 🔥
              </div>
            )}
          </div>

          {/* Best Streak Card */}
          <div className="glass rounded-2xl sacred-border p-6 sm:p-8 hover:-translate-y-1 transition-transform duration-300">
            <div className="flex items-start justify-between mb-6">
              <div>
                <p className="font-manrope text-sm text-muted-foreground mb-2">
                  MELHOR SEQUÊNCIA
                </p>
                <div className="font-cinzel font-bold text-5xl sm:text-6xl text-foreground dark:text-white">
                  {stats?.longestStreak || 0}
                </div>
                <p className="font-manrope text-sm text-muted-foreground mt-2">
                  dias consecutivos
                </p>
              </div>
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-gold to-gold-dark flex items-center justify-center shadow-lg shadow-gold/30">
                <Trophy className="w-7 h-7 text-white" />
              </div>
            </div>
          </div>

          {/* Total Prayers Card */}
          <div className="glass rounded-2xl sacred-border p-6 sm:p-8 hover:-translate-y-1 transition-transform duration-300">
            <div className="flex items-start justify-between mb-6">
              <div>
                <p className="font-manrope text-sm text-muted-foreground mb-2">
                  TOTAL DE TERÇOS
                </p>
                <div className="font-cinzel font-bold text-5xl sm:text-6xl text-foreground dark:text-white">
                  {stats?.totalCheckIns || 0}
                </div>
                <p className="font-manrope text-sm text-muted-foreground mt-2">
                  rezados com devoção
                </p>
              </div>
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-lg">
                <Calendar className="w-7 h-7 text-white" />
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activity & Today's Mystery */}
        <div className="grid md:grid-cols-2 gap-6 sm:gap-8">
          {/* Today's Mystery */}
          <div className="glass rounded-2xl sacred-border p-6 sm:p-8">
            <h2 className="font-cinzel font-bold text-2xl text-foreground dark:text-white mb-6">
              Mistério de Hoje
            </h2>
            <div className="space-y-4">
              <div>
                <p className="font-manrope text-sm text-muted-foreground mb-2">
                  TIPO
                </p>
                <p className="font-cinzel font-bold text-xl text-foreground dark:text-white">
                  {getMysteryInfo(todayStatus?.stats?.favoriteMysterys?.[0] || "joyful").name}
                </p>
              </div>
              <div>
                <p className="font-manrope text-sm text-muted-foreground mb-2">
                  DESCRIÇÃO
                </p>
                <p className="font-manrope text-foreground dark:text-white leading-relaxed">
                  {getMysteryInfo(todayStatus?.stats?.favoriteMysterys?.[0] || "joyful").description}
                </p>
              </div>
              <button
                onClick={() => setShowCheckInModal(true)}
                className="w-full mt-6 bg-gradient-to-r from-gold to-gold-dark text-navy-darker font-cinzel font-bold py-3 rounded-full hover:shadow-[0_0_30px_-5px_rgba(212,175,55,0.6)] transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
                data-testid="mystery-pray-button"
              >
                Rezar Este Mistério <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="glass rounded-2xl sacred-border p-6 sm:p-8">
            <h2 className="font-cinzel font-bold text-2xl text-foreground dark:text-white mb-6">
              Atividade Recente
            </h2>
            <div className="space-y-4">
              {mockRecentActivity.map((activity) => (
                <div
                  key={activity.id}
                  className="flex items-center gap-4 p-4 rounded-xl bg-foreground/5 dark:bg-white/5 hover:bg-foreground/10 dark:hover:bg-white/10 transition-colors"
                >
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gold to-gold-dark flex items-center justify-center flex-shrink-0">
                    <Heart className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-manrope font-semibold text-foreground dark:text-white truncate">
                      {activity.user}
                    </p>
                    <p className="font-manrope text-sm text-muted-foreground">
                      {getMysteryInfo(activity.mystery).name}
                    </p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="font-manrope text-xs text-muted-foreground flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {activity.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Motivational Message */}
        <div className="mt-12 sm:mt-16 glass rounded-2xl sacred-border p-8 sm:p-10 text-center">
          <Sparkles className="w-12 h-12 text-gold mx-auto mb-4" />
          <p className="font-cinzel font-bold text-2xl sm:text-3xl text-foreground dark:text-white mb-3">
            Sua devoção importa
          </p>
          <p className="font-manrope text-muted-foreground max-w-2xl mx-auto">
            Cada Terço rezado com o coração contribui para sua paz espiritual e para o mundo.
            Continue sua sequência e inspire outros fiéis.
          </p>
        </div>
      </main>

      {/* Check In Modal */}
      <CheckInModal
        open={showCheckInModal}
        onOpenChange={setShowCheckInModal}
      />
    </div>
  );
}
