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
      <div className="inline-flex items-center gap-3 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
        <div className="flex items-center gap-1.5">
          <Flame className="w-5 h-5 text-orange-400" />
          <span className="font-bold text-white">{currentStreak}</span>
          <span className="text-white/60 text-sm">dias seguidos</span>
        </div>
        {currentStreak >= 7 && (
          <span className="text-xs bg-gold/20 text-gold px-2 py-0.5 rounded-full">
            🔥 Pegando fogo!
          </span>
        )}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-3 gap-4 p-4 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10">
      <StatItem
        icon={<Flame className="w-6 h-6 text-orange-400" />}
        value={currentStreak}
        label="Sequência Atual"
        highlight={currentStreak >= 7}
      />
      <StatItem
        icon={<Trophy className="w-6 h-6 text-gold" />}
        value={longestStreak}
        label="Melhor Sequência"
      />
      <StatItem
        icon={<Calendar className="w-6 h-6 text-blue-400" />}
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
        className={`text-2xl font-bold ${
          highlight ? "text-orange-400" : "text-white"
        }`}
      >
        {value}
      </div>
      <div className="text-xs text-white/50">{label}</div>
    </div>
  );
}
