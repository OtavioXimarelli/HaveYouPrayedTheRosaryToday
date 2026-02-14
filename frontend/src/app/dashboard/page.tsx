"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Flame, Trophy, Calendar, ArrowRight, Sparkles, Heart,
  BookOpen, Clock, CheckCircle2, History, Users,
  ChevronRight, TrendingUp, Star, Sun, Moon,
  GraduationCap, Compass, Library, Lock
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  UserStats, CheckIn, getTodaysMystery, getMysteryInfo, MysteryType
} from "@/types";
import { getUserStats, getFeed } from "@/services/api";
import { ComingSoonModal } from "@/components/coming-soon-modal";
import { PageTransition } from "@/components/page-transition";

/* ─── Mystery visual mapping ─── */
const mysteryColors: Record<MysteryType, { bg: string; text: string; gradient: string; icon: string }> = {
  joyful: {
    bg: "bg-amber-500/10 dark:bg-amber-500/20",
    text: "text-amber-600 dark:text-amber-400",
    gradient: "from-amber-500 to-yellow-500",
    icon: "☀️",
  },
  sorrowful: {
    bg: "bg-purple-500/10 dark:bg-purple-500/20",
    text: "text-purple-600 dark:text-purple-400",
    gradient: "from-purple-500 to-violet-500",
    icon: "✝️",
  },
  glorious: {
    bg: "bg-gold-500/10 dark:bg-gold-500/20",
    text: "text-gold-600 dark:text-gold-400",
    gradient: "from-gold-500 to-gold-600",
    icon: "👑",
  },
  luminous: {
    bg: "bg-sky-500/10 dark:bg-sky-500/20",
    text: "text-sky-600 dark:text-sky-400",
    gradient: "from-sky-500 to-blue-500",
    icon: "💧",
  },
};

const mysteryNames: Record<MysteryType, string> = {
  joyful: "Gozosos",
  sorrowful: "Dolorosos",
  glorious: "Gloriosos",
  luminous: "Luminosos",
};

export default function DashboardPage() {
  const router = useRouter();
  const [stats, setStats] = useState<UserStats | null>(null);
  const [recentActivity, setRecentActivity] = useState<CheckIn[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [comingSoonOpen, setComingSoonOpen] = useState(false);

  const todaysMystery = getTodaysMystery();
  const mysteryInfo = getMysteryInfo(todaysMystery);
  const mysteryStyle = mysteryColors[todaysMystery];

  useEffect(() => {
    async function loadData() {
      try {
        const [statsData, feedData] = await Promise.all([
          getUserStats(),
          getFeed(),
        ]);
        setStats(statsData);
        setRecentActivity(feedData.checkIns.slice(0, 5));
      } catch (error) {
        console.error("Error loading dashboard data:", error);
      } finally {
        setLoading(false);
        setComingSoonOpen(true);
      }
    }
    loadData();

    const interval = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(interval);
  }, []);

  /* ─── Helpers ─── */
  const getGreeting = () => {
    const hour = currentTime.getHours();
    if (hour < 12) return "Bom dia";
    if (hour < 18) return "Boa tarde";
    return "Boa noite";
  };

  const formatDate = (date: Date) =>
    new Intl.DateTimeFormat("pt-BR", {
      weekday: "long",
      day: "numeric",
      month: "long",
    }).format(date);

  const hasCheckedInToday = stats?.lastCheckIn
    ? new Date(stats.lastCheckIn).toDateString() === new Date().toDateString()
    : false;

  const getWeekDays = () => {
    const today = new Date();
    const days = [];
    for (let i = 6; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(today.getDate() - i);
      days.push({
        date,
        dayName: new Intl.DateTimeFormat("pt-BR", { weekday: "short" })
          .format(date)
          .slice(0, 3),
        dayNum: date.getDate(),
        isToday: date.toDateString() === today.toDateString(),
        hasCheckIn:
          i === 0
            ? hasCheckedInToday
            : (stats?.currentStreak ?? 0) > i,
      });
    }
    return days;
  };

  const weeklyProgress = Math.min(stats?.currentStreak ?? 0, 7);

  /* ─── Loading state ─── */
  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4 animate-fade-in">
          <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-br from-gold-500 to-gold-600 flex items-center justify-center animate-pulse-gold">
            <span className="text-3xl">📿</span>
          </div>
          <p className="text-muted-foreground text-base">
            Carregando seu progresso…
          </p>
        </div>
      </div>
    );
  }

  /* ─── Render ─── */
  return (
    <PageTransition>
      <div
        className="min-h-screen bg-background relative noise-overlay"
        data-testid="dashboard-page"
      >
      {/* Subtle radial glow behind content */}
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-radial-gold opacity-40 dark:opacity-20"
        aria-hidden
      />

      {/* ── Main wrapper ──
          • pt-6 on mobile (no fixed top header, just breathing room)
          • pb-24 on mobile clears the bottom tab bar (64 px + breathing room)
          • md:pt-10 on desktop (no fixed top header)
          • md:pb-32 on desktop clears the floating bottom pill nav
      */}
      <main className="relative z-10 pt-6 pb-24 md:pt-10 md:pb-32 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto w-full max-w-6xl space-y-6 md:space-y-10">

          {/* ═══════════ HEADER ═══════════ */}
          <header className="animate-fade-up">
            {/* Stylized date badge */}
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full glass sacred-border mb-4 sm:mb-5">
              <div className="flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-gradient-to-br from-gold-500 to-gold-600 shadow-md">
                {currentTime.getHours() < 18 ? (
                  <Sun className="w-4 h-4 sm:w-[18px] sm:h-[18px] text-sacred-blue" />
                ) : (
                  <Moon className="w-4 h-4 sm:w-[18px] sm:h-[18px] text-sacred-blue" />
                )}
              </div>
              <div className="flex flex-col leading-none">
                <span className="text-[10px] sm:text-xs uppercase tracking-widest text-muted-foreground font-semibold">
                  {new Intl.DateTimeFormat("pt-BR", { weekday: "long" }).format(currentTime)}
                </span>
                <span className="text-sm sm:text-base font-cinzel font-bold text-foreground capitalize">
                  {new Intl.DateTimeFormat("pt-BR", { day: "numeric", month: "long", year: "numeric" }).format(currentTime)}
                </span>
              </div>
              <div className="hidden sm:block w-px h-6 bg-border" />
              <span className="hidden sm:inline-flex items-center gap-1.5 text-xs text-muted-foreground">
                <Calendar className="w-3.5 h-3.5 text-gold-500" />
                <span className="font-medium">Mistérios {mysteryNames[todaysMystery]}</span>
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-5xl font-cinzel font-bold text-foreground leading-tight">
              {getGreeting()},{" "}
              <span className="bg-gradient-to-r from-gold-500 to-gold-600 bg-clip-text text-transparent">
                Peregrino
              </span>
            </h1>

            <p className="mt-2 text-base sm:text-lg text-muted-foreground max-w-xl leading-relaxed">
              {hasCheckedInToday
                ? "Você já rezou o terço hoje. Que Deus abençoe sua devoção!"
                : "Já rezou o terço hoje? Os mistérios do dia aguardam você."}
            </p>
          </header>

          {/* ═══════════ STATS ROW ═══════════
              Mobile: horizontal scroll strip so all 4 fit without shrinking.
              md+: standard 4-col grid.
          */}
          <section
            className="animate-fade-up animate-delay-100"
            data-testid="stats-section"
          >
            {/* Desktop grid */}
            <div className="hidden md:grid md:grid-cols-4 gap-5">
              {[
                {
                  icon: Flame,
                  value: stats?.currentStreak ?? 0,
                  label: "Dias Seguidos",
                  gradient: "from-orange-500 to-red-500",
                  badge:
                    (stats?.currentStreak ?? 0) >= 7
                      ? "Fogo!"
                      : null,
                  badgeColor:
                    "bg-orange-500/20 text-orange-600 dark:text-orange-400",
                },
                {
                  icon: Trophy,
                  value: stats?.longestStreak ?? 0,
                  label: "Melhor Sequência",
                  gradient: "from-gold-500 to-gold-600",
                },
                {
                  icon: Heart,
                  value: stats?.totalCheckIns ?? 0,
                  label: "Total de Orações",
                  gradient: "from-sacred-blue to-slate-700 dark:from-slate-700 dark:to-slate-800",
                  iconClass: "text-gold-400",
                },
                {
                  icon: TrendingUp,
                  value: `${weeklyProgress}/7`,
                  label: "Esta Semana",
                  gradient: "from-emerald-500 to-green-600",
                },
              ].map((stat, i) => (
                <div
                  key={stat.label}
                  className="group p-6 rounded-3xl glass sacred-border hover:-translate-y-1 transition-all duration-300 hover:shadow-gold-glow"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div
                      className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.gradient} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}
                    >
                      <stat.icon
                        className={`w-6 h-6 ${stat.iconClass ?? "text-white"}`}
                      />
                    </div>
                    {stat.badge && (
                      <span
                        className={`text-xs px-2.5 py-1 rounded-full font-semibold ${stat.badgeColor}`}
                      >
                        {stat.badge}
                      </span>
                    )}
                  </div>
                  <p className="text-3xl lg:text-4xl font-cinzel font-bold text-foreground mb-1">
                    {stat.value}
                  </p>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </div>
              ))}
            </div>

            {/* Mobile horizontal scroll */}
            <div className="md:hidden -mx-4 px-4">
              <div className="flex gap-3 overflow-x-auto pb-2 snap-x snap-mandatory scrollbar-hide">
                {[
                  {
                    icon: Flame,
                    value: stats?.currentStreak ?? 0,
                    label: "Dias Seguidos",
                    gradient: "from-orange-500 to-red-500",
                    badge:
                      (stats?.currentStreak ?? 0) >= 7
                        ? "Fogo!"
                        : null,
                    badgeColor:
                      "bg-orange-500/20 text-orange-600 dark:text-orange-400",
                  },
                  {
                    icon: Trophy,
                    value: stats?.longestStreak ?? 0,
                    label: "Melhor Sequência",
                    gradient: "from-gold-500 to-gold-600",
                  },
                  {
                    icon: Heart,
                    value: stats?.totalCheckIns ?? 0,
                    label: "Total de Orações",
                    gradient: "from-sacred-blue to-slate-700 dark:from-slate-700 dark:to-slate-800",
                    iconClass: "text-gold-400",
                  },
                  {
                    icon: TrendingUp,
                    value: `${weeklyProgress}/7`,
                    label: "Esta Semana",
                    gradient: "from-emerald-500 to-green-600",
                  },
                ].map((stat) => (
                  <div
                    key={stat.label}
                    className="min-w-[160px] flex-shrink-0 snap-start p-4 rounded-2xl glass sacred-border"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div
                        className={`w-10 h-10 rounded-lg bg-gradient-to-br ${stat.gradient} flex items-center justify-center shadow-md`}
                      >
                        <stat.icon
                          className={`w-5 h-5 ${stat.iconClass ?? "text-white"}`}
                        />
                      </div>
                      {stat.badge && (
                        <span
                          className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${stat.badgeColor}`}
                        >
                          {stat.badge}
                        </span>
                      )}
                    </div>
                    <p className="text-2xl font-cinzel font-bold text-foreground">
                      {stat.value}
                    </p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ═══════════ TODAY'S MYSTERY HERO CARD ═══════════ */}
          <section
            className="animate-fade-up animate-delay-200"
            data-testid="todays-mystery-card"
          >
            <div
              className={`relative rounded-3xl overflow-hidden ${
                hasCheckedInToday
                  ? "bg-gradient-to-br from-emerald-600 to-green-700"
                  : "bg-gradient-to-br from-sacred-blue to-slate-800 dark:from-slate-800 dark:to-slate-900"
              }`}
            >
              {/* Decorative circles — sized for viewport */}
              <div className="absolute -top-16 -right-16 w-48 h-48 sm:w-64 sm:h-64 bg-gold-500/10 rounded-full" />
              <div className="absolute -bottom-12 -left-12 w-36 h-36 sm:w-48 sm:h-48 bg-gold-500/5 rounded-full" />

              <div className="relative z-10 p-6 sm:p-8 md:p-10">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-5">
                  {/* Text content */}
                  <div className="flex-1 min-w-0">
                    <div
                      className={`inline-flex items-center gap-2 px-3 py-1 rounded-full ${mysteryStyle.bg} mb-3`}
                    >
                      <Sparkles className={`w-4 h-4 ${mysteryStyle.text}`} />
                      <span
                        className={`text-xs sm:text-sm font-semibold ${mysteryStyle.text}`}
                      >
                        Mistérios {mysteryNames[todaysMystery]}
                      </span>
                    </div>

                    <h2 className="text-xl sm:text-2xl md:text-3xl font-cinzel font-bold text-white mb-2 sm:mb-3">
                      {hasCheckedInToday
                        ? "Oração Completa!"
                        : "Mistério de Hoje"}
                    </h2>

                    <p className="text-white/80 text-sm sm:text-base md:text-lg leading-relaxed mb-5 sm:mb-6 max-w-lg">
                      {hasCheckedInToday
                        ? "Parabéns por manter sua devoção diária. Que Nossa Senhora interceda por você."
                        : mysteryInfo.description}
                    </p>

                    {hasCheckedInToday ? (
                      <div className="flex items-center gap-3 text-white/90">
                        <CheckCircle2 className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-300" />
                        <span className="font-semibold text-sm sm:text-base">
                          Terço rezado hoje
                        </span>
                      </div>
                    ) : (
                      <Button
                        size="lg"
                        onClick={() => router.push("/como-rezar")}
                        className="group w-full sm:w-auto px-6 sm:px-8 py-5 sm:py-6 text-base sm:text-lg font-cinzel font-bold tracking-wide rounded-full bg-gradient-to-r from-gold-500 to-gold-600 text-sacred-blue hover:shadow-gold-glow-lg transition-shadow duration-300 border-2 border-gold-400/50"
                        data-testid="start-prayer-btn"
                      >
                        <span>Rezar Agora</span>
                        <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    )}
                  </div>

                  {/* Mystery icon — hidden on very small screens */}
                  <div className="hidden sm:flex items-center justify-center flex-shrink-0">
                    <div
                      className={`w-20 h-20 md:w-28 md:h-28 rounded-2xl bg-gradient-to-br ${mysteryStyle.gradient} flex items-center justify-center shadow-2xl ${
                        hasCheckedInToday ? "" : "animate-pulse-gold"
                      }`}
                    >
                      <span className="text-3xl md:text-5xl">
                        {mysteryStyle.icon}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ═══════════ MIDDLE GRID: Calendar + Quick Actions ═══════════ */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 lg:gap-8 animate-fade-up animate-delay-300">
            {/* ── Week Calendar ── */}
            <div
              className="lg:col-span-2 p-5 sm:p-6 rounded-3xl glass sacred-border"
              data-testid="week-calendar"
            >
              <div className="flex items-center justify-between mb-5">
                <h3 className="font-cinzel font-bold text-foreground text-base sm:text-lg">
                  Esta Semana
                </h3>
                <Calendar className="w-5 h-5 text-muted-foreground" />
              </div>

              {/* Day pills — flex-wrap on tiny screens, even grid on sm+ */}
              <div className="grid grid-cols-7 gap-1.5 sm:gap-2">
                {getWeekDays().map((day, index) => (
                  <div
                    key={index}
                    className={`flex flex-col items-center py-2 sm:p-2.5 rounded-xl transition-colors ${
                      day.isToday
                        ? "bg-gold-500/20 border border-gold-500/30"
                        : "hover:bg-muted/50"
                    }`}
                  >
                    <span className="text-[10px] sm:text-xs text-muted-foreground uppercase font-medium">
                      {day.dayName}
                    </span>
                    <span
                      className={`text-xs sm:text-sm font-semibold my-1 ${
                        day.isToday
                          ? "text-gold-600 dark:text-gold-400"
                          : "text-foreground"
                      }`}
                    >
                      {day.dayNum}
                    </span>
                    <div
                      className={`w-5 h-5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center ${
                        day.hasCheckIn
                          ? "bg-gradient-to-br from-gold-500 to-gold-600"
                          : "bg-muted"
                      }`}
                    >
                      {day.hasCheckIn && (
                        <CheckCircle2 className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Progress bar */}
              <div className="mt-5 pt-4 border-t border-border">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">
                    Progresso semanal
                  </span>
                  <span className="font-semibold text-gold-600 dark:text-gold-400">
                    {weeklyProgress}/7 dias
                  </span>
                </div>
                <div className="mt-2 h-2 rounded-full bg-muted overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-gold-500 to-gold-600 transition-all duration-700"
                    style={{
                      width: `${Math.min((weeklyProgress / 7) * 100, 100)}%`,
                    }}
                  />
                </div>
              </div>
            </div>

            {/* ── Quick Actions ── */}
            <div
              className="grid grid-cols-2 gap-3 sm:gap-4 auto-rows-min"
              data-testid="quick-actions"
            >
              {[
                {
                  icon: BookOpen,
                  label: "Como Rezar",
                  path: "/como-rezar",
                  gradient: "from-sacred-blue to-slate-700 dark:from-slate-700 dark:to-slate-800",
                },
                {
                  icon: Sparkles,
                  label: "Mistérios",
                  path: "/misterios-do-dia",
                  gradient: "from-gold-500 to-gold-600",
                },
                {
                  icon: History,
                  label: "História",
                  path: "/historia",
                  gradient: "from-sacred-blue to-slate-700 dark:from-slate-700 dark:to-slate-800",
                },
                {
                  icon: Users,
                  label: "Comunidade",
                  path: "/#community",
                  gradient: "from-gold-500 to-gold-600",
                },
              ].map((action) => (
                <button
                  key={action.path}
                  onClick={() => router.push(action.path)}
                  className="group flex flex-col items-start p-4 sm:p-5 rounded-2xl glass sacred-border hover:-translate-y-1 transition-all duration-300 hover:shadow-gold-glow min-h-[100px]"
                  data-testid={`quick-action-${action.label.toLowerCase().replace(/\s/g, "-")}`}
                >
                  <div
                    className={`w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-br ${action.gradient} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300 shadow-md`}
                  >
                    <action.icon className="w-5 h-5 text-white" />
                  </div>
                  <p className="font-semibold text-foreground text-sm group-hover:text-gold-600 dark:group-hover:text-gold-400 transition-colors">
                    {action.label}
                  </p>
                </button>
              ))}
            </div>
          </div>

          {/* ═══════════ RECENT ACTIVITY ═══════════ */}
          <section
            className="animate-fade-up animate-delay-400"
            data-testid="recent-activity"
          >
            <div className="p-5 sm:p-6 rounded-3xl glass sacred-border">
              <div className="flex items-center justify-between mb-5">
                <h3 className="font-cinzel font-bold text-foreground text-base sm:text-lg">
                  Atividade Recente
                </h3>
                <button
                  className="text-sm text-gold-600 dark:text-gold-400 font-semibold hover:underline flex items-center gap-1 min-h-[44px] min-w-[44px] justify-end"
                  data-testid="activity-view-all"
                >
                  Ver tudo
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              {recentActivity.length > 0 ? (
                <div className="space-y-3">
                  {recentActivity.map((activity) => {
                    const style = mysteryColors[activity.mystery];
                    return (
                      <div
                        key={activity.id}
                        className="flex items-start gap-3 sm:gap-4 p-3 sm:p-4 rounded-xl bg-muted/50 hover:bg-muted transition-colors"
                      >
                        <div
                          className={`w-9 h-9 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center flex-shrink-0 bg-gradient-to-br ${style.gradient}`}
                        >
                          <span className="text-base sm:text-lg">📿</span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex flex-wrap items-center gap-2 mb-1">
                            <span
                              className={`text-[11px] sm:text-xs font-semibold px-2 py-0.5 rounded-full ${style.bg} ${style.text}`}
                            >
                              {mysteryNames[activity.mystery]}
                            </span>
                            <span className="text-[11px] sm:text-xs text-muted-foreground">
                              {new Date(activity.createdAt).toLocaleDateString(
                                "pt-BR"
                              )}
                            </span>
                          </div>
                          {activity.reflection && (
                            <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
                              {activity.reflection}
                            </p>
                          )}
                          <div className="flex items-center gap-3 mt-1.5">
                            <span className="text-xs text-muted-foreground flex items-center gap-1">
                              <Heart className="w-3 h-3" /> {activity.amens}
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center py-10">
                  <div className="w-14 h-14 sm:w-16 sm:h-16 mx-auto mb-4 rounded-full bg-muted flex items-center justify-center">
                    <Clock className="w-7 h-7 sm:w-8 sm:h-8 text-muted-foreground" />
                  </div>
                  <p className="text-muted-foreground text-sm sm:text-base mb-4">
                    Nenhuma atividade recente
                  </p>
                  <Button
                    variant="outline"
                    onClick={() => router.push("/como-rezar")}
                    className="rounded-full px-6 py-3 min-h-[44px]"
                    data-testid="activity-start-praying"
                  >
                    Começar a rezar
                  </Button>
                </div>
              )}
            </div>
          </section>

          {/* ═══════════ MOTIVATIONAL QUOTE ═══════════ */}
          <section
            className="animate-fade-up animate-delay-500"
            data-testid="quote-section"
          >
            <div className="p-6 sm:p-8 md:p-10 rounded-3xl bg-gradient-to-br from-sacred-blue to-slate-800 dark:from-slate-800 dark:to-slate-900 text-white relative overflow-hidden">
              {/* Decorative quote mark */}
              <div
                className="absolute top-0 right-0 text-gold-500/10 text-[80px] sm:text-[120px] font-serif select-none pointer-events-none leading-none"
                aria-hidden
              >
                &ldquo;
              </div>

              <div className="relative z-10 max-w-2xl">
                <Star className="w-6 h-6 sm:w-8 sm:h-8 text-gold-400 mb-3 sm:mb-4" />
                <blockquote className="text-base sm:text-xl md:text-2xl font-cinzel leading-relaxed mb-3 sm:mb-4">
                  &ldquo;Reze o Rosário todos os dias para obter a paz no mundo
                  e o fim da guerra.&rdquo;
                </blockquote>
                <cite className="text-gold-400 font-semibold text-sm sm:text-base not-italic">
                  — Nossa Senhora de Fátima
                </cite>
              </div>
            </div>
          </section>
        </div>
      </main>

      <ComingSoonModal
        isOpen={comingSoonOpen}
        onClose={() => setComingSoonOpen(false)}
        featureName="Dashboard"
      />
    </div>
    </PageTransition>
  );
}
