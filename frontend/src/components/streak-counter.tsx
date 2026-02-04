"use client";

import { Flame, Trophy, Calendar } from "lucide-react";
import { UserStats } from "@/types";

interface StreakCounterProps {
  stats: UserStats;
  variant?: "compact" | "full";
}

export function StreakCounter({ stats, variant = "compact" }: StreakCounterProps) {
  const { currentStreak, longestStreak, totalCheckIns } = stats;

  if (variant === "compact") {
    return (
      <div className="inline-flex items-center gap-3 px-5 py-2.5 glass rounded-full sacred-border" data-testid="streak-counter">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center">
            <Flame className="w-4 h-4 text-white" />
          </div>
          <span className="font-cinzel font-bold text-foreground text-lg">{currentStreak}</span>
          <span className="text-muted-foreground text-sm">dias seguidos</span>
        </div>
        {currentStreak >= 7 && (
          <span className="text-xs bg-gold-500/20 text-gold-600 dark:text-gold-400 px-3 py-1 rounded-full font-semibold">
            Pegando fogo!
          </span>
        )}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-3 gap-4 p-6 glass rounded-2xl sacred-border" data-testid="streak-counter-full">
      <StatItem
        icon={<Flame className="w-6 h-6 text-orange-500" />}
        value={currentStreak}
        label="Sequência Atual"
        highlight={currentStreak >= 7}
      />
      <StatItem
        icon={<Trophy className="w-6 h-6 text-gold-500" />}
        value={longestStreak}
        label="Melhor Sequência"
      />
      <StatItem
        icon={<Calendar className="w-6 h-6 text-blue-500" />}
        value={totalCheckIns}
        label="Total de Orações"
      />
    </div>
  );
}

function StatItem({
  icon,
  value,
  label,
  highlight = false,
}: {
  icon: React.ReactNode;
  value: number;
  label: string;
  highlight?: boolean;
}) {
  return (
    <div className="text-center">
      <div className="flex justify-center mb-2">{icon}</div>
      <div
        className={`text-2xl font-cinzel font-bold ${
          highlight ? "text-orange-500" : "text-foreground"
        }`}
      >
        {value}
      </div>
      <div className="text-xs text-muted-foreground">{label}</div>
    </div>
  );
}
