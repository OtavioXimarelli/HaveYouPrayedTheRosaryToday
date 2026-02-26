"use client";

import { useState, useEffect } from "react";
import { useRouter } from "@/i18n/routing";
import {
  Flame, Trophy, Calendar, ArrowRight, Sparkles, Heart,
  BookOpen, Clock, CheckCircle2,
  Sun, Moon,
  GraduationCap, Compass, Library, Star
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  UserStats, CheckIn, getTodaysMystery, getMysteryInfo, MysteryType
} from "@/types";
import { getUserStats } from "@/services/api";
import { getStoredCheckIns } from "@/services/mockData";
import { ComingSoonModal } from "@/components/coming-soon-modal";
import { CheckInModal } from "@/components/check-in-modal";
import { PageTransition } from "@/components/page-transition";
import { useAuth } from "@/providers/auth-provider";
import { useTranslations, useLocale } from "next-intl";

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


export default function DashboardPage() {
  const t = useTranslations("Dashboard");
  const commonT = useTranslations("Common");
  const checkInT = useTranslations("CheckIn");
  const locale = useLocale();
  const router = useRouter();
  const { user } = useAuth();
  const [stats, setStats] = useState<UserStats | null>(null);
  const [userCheckIns, setUserCheckIns] = useState<CheckIn[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [comingSoonOpen, setComingSoonOpen] = useState(false);
  const [storageBannerDismissed, setStorageBannerDismissed] = useState(false);
  const [mvpAdviceDismissed, setMvpAdviceDismissed] = useState(false);
  const [checkInModalOpen, setCheckInModalOpen] = useState(false);

  const todaysMystery = getTodaysMystery();
  const mysteryInfo = getMysteryInfo(todaysMystery);
  const mysteryStyle = mysteryColors[todaysMystery];
  const currentMysteryName = checkInT(`mysteries.${todaysMystery}.label`);

  useEffect(() => {
    async function loadData() {
      try {
        const statsData = await getUserStats();
        setStats(statsData);
        setUserCheckIns(getStoredCheckIns());
      } catch (error) {
        console.error("Error loading dashboard data:", error);
      } finally {
        setLoading(false);
      }
    }
    loadData();

    const dismissed = localStorage.getItem("rosario-banner-dismissed");
    if (dismissed) setStorageBannerDismissed(true);

    const mvpDismissed = localStorage.getItem("rosario-mvp-advice-dismissed");
    if (mvpDismissed) setMvpAdviceDismissed(true);

    const interval = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(interval);
  }, []);

  const refreshData = async () => {
    const statsData = await getUserStats();
    setStats(statsData);
    setUserCheckIns(getStoredCheckIns());
  };

  const getGreeting = () => {
    const hour = currentTime.getHours();
    if (hour < 12) return t("goodMorning");
    if (hour < 18) return t("goodAfternoon");
    return t("goodNight");
  };

  const hasCheckedInToday = stats?.lastCheckIn
    ? new Date(stats.lastCheckIn).toDateString() === new Date().toDateString()
    : false;

  const checkInDateSet = new Set(
    userCheckIns.map((c) => new Date(c.createdAt).toDateString())
  );

  const getWeekDays = () => {
    const today = new Date();
    const days = [];
    for (let i = 6; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(today.getDate() - i);
      days.push({
        date,
        dayName: new Intl.DateTimeFormat(locale === 'pt' ? "pt-BR" : "en-US", { weekday: "short" })
          .format(date)
          .slice(0, 3),
        dayNum: date.getDate(),
        isToday: date.toDateString() === today.toDateString(),
        hasCheckIn: checkInDateSet.has(date.toDateString()),
      });
    }
    return days;
  };

  const weeklyProgress = (() => {
    const today = new Date();
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - 6);
    startOfWeek.setHours(0, 0, 0, 0);
    return userCheckIns.filter((c) => new Date(c.createdAt) >= startOfWeek).length;
  })();

  if (loading) {
    return (
      <div className="min-h-screen bg-background relative noise-overlay flex items-center justify-center">
        <div className="pointer-events-none absolute inset-0" aria-hidden>
          <div className="absolute inset-0 bg-gradient-radial-gold opacity-20 dark:opacity-10" />
        </div>
        <div className="relative z-10 text-center space-y-6 animate-fade-in">
          <div className="w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br from-gold-500 to-gold-600 flex items-center justify-center animate-pulse-gold shadow-gold-glow">
            <span className="text-4xl">📿</span>
          </div>
          <div className="space-y-2">
            <p className="text-foreground font-cinzel font-bold text-lg">{commonT("loading")}</p>
            <div className="w-32 h-1 mx-auto rounded-full bg-muted overflow-hidden">
              <div className="h-full w-1/2 rounded-full bg-gradient-to-r from-gold-500 to-gold-600 animate-shimmer" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <PageTransition>
      <div className="min-h-screen bg-background relative noise-overlay" data-testid="dashboard-page">
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute inset-0 bg-gradient-radial-gold opacity-30 dark:opacity-15" />
        <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-gold-500/5 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-sacred-blue/10 dark:bg-gold-500/5 rounded-full blur-[100px] translate-x-1/3 translate-y-1/3" />
      </div>

      <main className="relative z-10 pt-8 pb-24 md:pt-16 md:pb-32 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto w-full max-w-6xl space-y-8 md:space-y-16">

          <div className="flex flex-col gap-4">
            {!storageBannerDismissed && (
              <div className="flex items-start gap-3 px-4 py-4 rounded-3xl bg-amber-500/10 border border-amber-500/20 text-amber-700 dark:text-amber-400 animate-fade-up">
                <span className="text-lg flex-shrink-0">⚠️</span>
                <p className="text-sm leading-relaxed flex-1">
                  {t("storageDisclaimer")}
                </p>
                <button
                  onClick={() => {
                    localStorage.setItem("rosario-banner-dismissed", "1");
                    setStorageBannerDismissed(true);
                  }}
                  className="text-amber-500 hover:text-amber-700 dark:hover:text-amber-200 font-bold text-xl leading-none flex-shrink-0 transition-colors h-8 w-8 flex items-center justify-center"
                >×</button>
              </div>
            )}

            {!mvpAdviceDismissed && (
              <div className="flex items-start gap-3 px-4 py-4 rounded-3xl bg-gold-500/10 border border-gold-500/20 text-sacred-blue dark:text-gold-400 animate-fade-up">
                <span className="text-lg flex-shrink-0">✨</span>
                <p className="text-sm leading-relaxed flex-1 italic">
                  {t("mvpAdvice")}
                </p>
                <button
                  onClick={() => {
                    localStorage.setItem("rosario-mvp-advice-dismissed", "1");
                    setMvpAdviceDismissed(true);
                  }}
                  className="text-gold-500 hover:text-gold-700 dark:hover:text-gold-200 font-bold text-xl leading-none flex-shrink-0 transition-colors h-8 w-8 flex items-center justify-center"
                >×</button>
              </div>
            )}
          </div>

          <header className="animate-fade-up">
            <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full glass sacred-border mb-6 sm:mb-8">
              <div className="flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-gold-500 to-gold-600 shadow-md">
                {currentTime.getHours() < 18 ? <Sun className="w-4 h-4 sm:w-5 sm:h-5 text-sacred-blue" /> : <Moon className="w-4 h-4 sm:w-5 sm:h-5 text-sacred-blue" />}
              </div>
              <div className="flex flex-col leading-none">
                <span className="text-[10px] sm:text-xs uppercase tracking-widest text-muted-foreground font-bold mb-0.5">
                  {new Intl.DateTimeFormat(locale === 'pt' ? "pt-BR" : "en-US", { weekday: "long" }).format(currentTime)}
                </span>
                <span className="text-sm sm:text-base font-cinzel font-bold text-foreground capitalize">
                  {new Intl.DateTimeFormat(locale === 'pt' ? "pt-BR" : "en-US", { day: "numeric", month: "long", year: "numeric" }).format(currentTime)}
                </span>
              </div>
              <div className="hidden sm:block w-px h-8 bg-border/50 mx-1" />
              <span className="hidden sm:inline-flex items-center gap-2 text-xs text-muted-foreground font-medium">
                <Sparkles className="w-3.5 h-3.5 text-gold-500" />
                <span>{t("mystery.label", { name: currentMysteryName })}</span>
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-6xl font-cinzel font-bold text-foreground leading-tight tracking-tight">
              {getGreeting()},{" "}
              <span className="bg-gradient-to-r from-gold-500 to-gold-600 bg-clip-text text-transparent">
                {user?.name ?? t("greeting")}
              </span>
            </h1>

            <p className="mt-4 text-lg sm:text-xl text-muted-foreground max-w-2xl leading-relaxed">
              {hasCheckedInToday ? t("hasCheckedIn") : t("notCheckedIn")}
            </p>
          </header>

          <section className="animate-fade-up animate-delay-100">
            <div className="hidden md:grid md:grid-cols-4 gap-6 lg:gap-8">
              {[
                { icon: Flame, value: stats?.currentStreak ?? 0, label: t("stats.currentStreak"), gradient: "from-orange-500 to-red-500", badge: (stats?.currentStreak ?? 0) >= 7 ? t("fire") : null, badgeColor: "bg-orange-500/20 text-orange-600 dark:text-orange-400" },
                { icon: Trophy, value: stats?.longestStreak ?? 0, label: t("stats.longestStreak"), gradient: "from-gold-500 to-gold-600" },
                { icon: Heart, value: stats?.totalCheckIns ?? 0, label: t("stats.totalPrayers"), gradient: "from-sacred-blue to-slate-700 dark:from-slate-700 dark:to-slate-800", iconClass: "text-gold-400" },
                { icon: Star, value: `${weeklyProgress}/7`, label: t("stats.thisWeek"), gradient: "from-emerald-500 to-green-600" },
              ].map((stat, i) => (
                <div key={stat.label} className="group p-8 rounded-3xl glass sacred-border hover:-translate-y-2 transition-all duration-300 hover:shadow-gold-glow">
                  <div className="flex items-start justify-between mb-6">
                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${stat.gradient} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      <stat.icon className={`w-7 h-7 ${stat.iconClass ?? "text-white"}`} />
                    </div>
                    {stat.badge && <span className={`text-xs px-3 py-1 rounded-full font-bold ${stat.badgeColor}`}>{stat.badge}</span>}
                  </div>
                  <p className="text-4xl lg:text-5xl font-cinzel font-bold text-foreground mb-1">{stat.value}</p>
                  <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider">{stat.label}</p>
                </div>
              ))}
            </div>

            <div className="md:hidden -mx-4 px-4">
              <div className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide">
                {[
                  { icon: Flame, value: stats?.currentStreak ?? 0, label: t("stats.currentStreak"), gradient: "from-orange-500 to-red-500", badge: (stats?.currentStreak ?? 0) >= 7 ? t("fire") : null, badgeColor: "bg-orange-500/20 text-orange-600 dark:text-orange-400" },
                  { icon: Trophy, value: stats?.longestStreak ?? 0, label: t("stats.longestStreak"), gradient: "from-gold-500 to-gold-600" },
                  { icon: Heart, value: stats?.totalCheckIns ?? 0, label: t("stats.totalPrayers"), gradient: "from-sacred-blue to-slate-700 dark:from-slate-700 dark:to-slate-800", iconClass: "text-gold-400" },
                  { icon: Star, value: `${weeklyProgress}/7`, label: t("stats.thisWeek"), gradient: "from-emerald-500 to-green-600" },
                ].map((stat) => (
                  <div key={stat.label} className="min-w-[180px] flex-shrink-0 snap-start p-6 rounded-2xl glass sacred-border">
                    <div className="flex items-center justify-between mb-4">
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.gradient} flex items-center justify-center shadow-md`}><stat.icon className={`w-6 h-6 ${stat.iconClass ?? "text-white"}`} /></div>
                      {stat.badge && <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${stat.badgeColor}`}>{stat.badge}</span>}
                    </div>
                    <p className="text-3xl font-cinzel font-bold text-foreground">{stat.value}</p>
                    <p className="text-xs font-semibold text-muted-foreground mt-1 uppercase tracking-wide">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="animate-fade-up animate-delay-200">
            <div className={`relative rounded-[2rem] overflow-hidden ${hasCheckedInToday ? "bg-gradient-to-br from-emerald-600 to-green-800 shadow-2xl shadow-emerald-500/20" : "bg-gradient-to-br from-sacred-blue to-slate-900 dark:from-slate-900 dark:to-slate-950 shadow-2xl shadow-slate-900/40"}`}>
              <div className="absolute top-0 right-0 w-96 h-96 bg-gold-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
              <div className="relative z-10 p-8 sm:p-12 md:p-16">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-10">
                  <div className="flex-1 min-w-0 max-w-2xl">
                    <div className={`inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full ${mysteryStyle.bg} border border-gold-500/20 mb-6`}>
                      <Sparkles className={`w-4 h-4 ${mysteryStyle.text} animate-pulse`} />
                      <span className={`text-sm font-bold uppercase tracking-widest ${mysteryStyle.text}`}>{t("mystery.label", { name: currentMysteryName })}</span>
                    </div>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-cinzel font-bold text-white mb-6 leading-tight">{hasCheckedInToday ? t("mystery.completed") : t("mystery.today")}</h2>
                    <p className="text-white/80 text-lg sm:text-xl leading-relaxed mb-10 max-w-xl">{hasCheckedInToday ? t("mystery.completedDesc") : (locale === 'en' ? mysteryInfo.descriptionEn || mysteryInfo.description : mysteryInfo.description)}</p>
                    {hasCheckedInToday ? (
                      <div className="flex items-center gap-4 text-emerald-100 bg-white/10 px-6 py-4 rounded-2xl border border-white/10 w-fit">
                        <div className="w-10 h-10 rounded-full bg-emerald-500 flex items-center justify-center"><CheckCircle2 className="w-6 h-6 text-white" /></div>
                        <span className="font-cinzel font-bold text-lg">{t("mystery.prayedToday")}</span>
                      </div>
                    ) : (
                      <div className="flex flex-col sm:flex-row gap-4">
                        <Button size="lg" onClick={() => setCheckInModalOpen(true)} className="group w-full sm:w-auto px-10 py-8 text-xl font-cinzel font-bold tracking-wide rounded-full bg-gradient-to-r from-gold-500 to-gold-600 text-sacred-blue hover:shadow-gold-glow-lg transition-all duration-300 border-2 border-gold-400/50">
                          <CheckCircle2 className="w-6 h-6 mr-3" /><span>{t("mystery.startBtn")}</span>
                        </Button>
                        <Button size="lg" variant="outline" onClick={() => router.push("/como-rezar")} className="group w-full sm:w-auto px-10 py-8 text-xl font-semibold rounded-full border-white/30 text-white hover:bg-white/10 transition-all border-2">
                          <BookOpen className="w-5 h-5 mr-3" /><span>{t("mystery.guideBtn")}</span>
                        </Button>
                      </div>
                    )}
                  </div>
                  <div className="hidden lg:flex items-center justify-center flex-shrink-0">
                    <div className={`w-48 h-48 xl:w-64 xl:h-64 rounded-[3rem] bg-gradient-to-br ${mysteryStyle.gradient} flex items-center justify-center shadow-2xl relative ${hasCheckedInToday ? "" : "animate-pulse-gold"}`}>
                      <span className="text-7xl xl:text-9xl relative z-10">{mysteryStyle.icon}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12 animate-fade-up animate-delay-300">
            <div className="lg:col-span-2 p-8 sm:p-10 rounded-[2rem] glass sacred-border">
              <div className="flex items-center justify-between mb-8">
                <div><h3 className="font-cinzel font-bold text-foreground text-xl mb-1">{t("weeklyJourney")}</h3><p className="text-sm text-muted-foreground">{t("weeklySubtitle")}</p></div>
                <div className="w-12 h-12 rounded-xl bg-gold-500/10 flex items-center justify-center"><Calendar className="w-6 h-6 text-gold-600 dark:text-gold-400" /></div>
              </div>
              <div className="grid grid-cols-7 gap-3 sm:gap-4 mb-8">
                {getWeekDays().map((day, index) => (
                  <div key={index} className={`flex flex-col items-center py-4 rounded-2xl transition-all duration-300 ${day.isToday ? "bg-gold-500/10 border-2 border-gold-500/40 shadow-gold-glow" : "hover:bg-muted/50 border border-transparent"}`}>
                    <span className="text-[10px] sm:text-xs text-muted-foreground uppercase font-bold tracking-wider mb-2">{day.dayName}</span>
                    <span className={`text-lg sm:text-xl font-cinzel font-bold mb-3 ${day.isToday ? "text-gold-600 dark:text-gold-400" : "text-foreground"}`}>{day.dayNum}</span>
                    <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center transition-all ${day.hasCheckIn ? "bg-gradient-to-br from-gold-500 to-gold-600 shadow-md scale-110" : "bg-muted/50"}`}>{day.hasCheckIn && <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-sacred-blue" />}</div>
                  </div>
                ))}
              </div>
              <div className="pt-8 border-t border-border/50">
                <div className="flex items-center justify-between text-sm mb-3"><span className="text-muted-foreground font-medium uppercase tracking-wider">{t("weeklyGoal")}</span><span className="font-bold text-lg text-gold-600 dark:text-gold-400">{weeklyProgress} / 7 {t("days")}</span></div>
                <div className="h-3 rounded-full bg-muted overflow-hidden p-0.5"><div className="h-full rounded-full bg-gradient-to-r from-gold-500 to-gold-600 transition-all duration-1000" style={{ width: `${Math.min((weeklyProgress / 7) * 100, 100)}%` }} /></div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 auto-rows-min">
              {[
                { icon: BookOpen, label: t("actions.howToPray"), path: "/como-rezar", gradient: "from-sacred-blue to-slate-800" },
                { icon: Sparkles, label: t("actions.mysteries"), path: "/misterios-do-dia", gradient: "from-gold-500 to-gold-600" },
                { icon: GraduationCap, label: t("actions.teachings"), path: "/ensinamentos", gradient: "from-emerald-600 to-emerald-700" },
                { icon: Library, label: t("actions.resources"), path: "/recursos", gradient: "from-blue-600 to-blue-700" },
              ].map((action) => (
                <button key={action.path} onClick={() => router.push(action.path as any)} className="group flex flex-col items-center justify-center p-6 rounded-[2rem] glass sacred-border hover:-translate-y-2 transition-all duration-300 min-h-[140px]">
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${action.gradient} flex items-center justify-center mb-4 shadow-lg`}><action.icon className="w-7 h-7 text-white" /></div>
                  <p className="font-cinzel font-bold text-foreground text-[10px] group-hover:text-gold-600 text-center uppercase tracking-widest leading-tight">{action.label}</p>
                </button>
              ))}
            </div>
          </div>

          <section className="animate-fade-up animate-delay-500">
            <div className="p-10 sm:p-16 md:p-20 rounded-[3rem] relative overflow-hidden shadow-sacred">
              <div className="absolute inset-0 bg-gradient-to-br from-sacred-blue via-slate-900 to-sacred-blue-dark" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,_rgba(212,175,55,0.08)_0%,transparent_50%)]" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,_rgba(212,175,55,0.06)_0%,transparent_50%)]" />
              <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold-500/30 to-transparent" />
              <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold-500/20 to-transparent" />
              <div className="relative z-10 max-w-3xl mx-auto text-center">
                <div className="w-20 h-1 bg-gold-500 mx-auto mb-10 rounded-full" />
                <blockquote className="text-2xl sm:text-3xl md:text-4xl font-cinzel leading-relaxed mb-8 italic text-white">
                  {t("quote.text")}
                </blockquote>
                <cite className="text-gold-400 font-bold uppercase tracking-[0.2em] text-sm sm:text-base not-italic">{t("quote.author")}</cite>
              </div>
            </div>
          </section>
        </div>
      </main>

      <CheckInModal open={checkInModalOpen} onOpenChange={setCheckInModalOpen} onSuccess={refreshData} />
      <ComingSoonModal isOpen={comingSoonOpen} onClose={() => setComingSoonOpen(false)} featureName={t("actions.history")} />
    </div>
    </PageTransition>
  );
}
