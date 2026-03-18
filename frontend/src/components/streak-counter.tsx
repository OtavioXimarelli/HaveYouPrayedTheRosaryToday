"use client";

import { Flame, Trophy, Calendar } from "lucide-react";
import { UserStats } from "@/types";
import { useTranslations } from "next-intl";

interface StreakCounterProps {
  stats: UserStats;
  variant?: "compact" | "full";
}

export function StreakCounter({ stats, variant = "compact" }: StreakCounterProps) {
  const { currentStreak, longestStreak, totalCheckIns } = stats;
  const t = useTranslations("Streak");

  if (variant === "compact") {
    return (
      <div className="inline-flex items-center gap-3 px-5 py-2.5 glass rounded-full sacred-border shadow-sm" data-testid="streak-counter">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center shadow-lg shadow-orange-500/20">
            <Flame className="w-4 h-4 text-white" />
          </div>
          <span className="font-cinzel font-bold text-foreground text-xl tracking-tight">{currentStreak}</span>
          <span className="text-slate-500 dark:text-slate-400 text-[11px] font-bold uppercase tracking-widest">{t("days")}</span>
        </div>
        {currentStreak >= 7 && (
          <span className="text-[10px] bg-gold-500/20 text-gold-600 dark:text-gold-400 px-3 py-1 rounded-full font-bold uppercase tracking-wider">
            {t("fire")}
          </span>
        )}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-3 gap-6 p-6 glass rounded-2xl sacred-border shadow-xl" data-testid="streak-counter-full">
      <StatItem
        icon={<Flame className="w-6 h-6 text-orange-500" />}
        value={currentStreak}
        label={t("current")}
        highlight={currentStreak >= 7}
      />
      <StatItem
        icon={<Trophy className="w-6 h-6 text-gold-500" />}
        value={longestStreak}
        label={t("longest")}
      />
      <StatItem
        icon={<Calendar className="w-6 h-6 text-blue-500" />}
        value={totalCheckIns}
        label={t("total")}
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
    <div className="text-center group">
      <div className="flex justify-center mb-3 transform transition-transform group-hover:scale-110 duration-300">{icon}</div>
      <div
        className={`text-3xl font-cinzel font-bold tracking-tight ${
          highlight ? "text-orange-500" : "text-foreground"
        }`}
      >
        {value}
      </div>
      <div className="text-[10px] font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400 mt-1">{label}</div>
    </div>
  );
}
