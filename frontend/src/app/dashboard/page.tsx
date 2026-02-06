"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { 
  Flame, Trophy, Calendar, ArrowRight, Sparkles, Heart,
  BookOpen, Clock, CheckCircle2, Plus, History, Users,
  ChevronRight, TrendingUp, Star, Sun, Moon
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { 
  UserStats, CheckIn, MYSTERIES, getTodaysMystery, getMysteryInfo, MysteryType 
} from "@/types";
import { getUserStats, getFeed } from "@/services/api";

// Mystery color mapping for visual distinction
const mysteryColors: Record<MysteryType, { bg: string; text: string; gradient: string }> = {
  joyful: { 
    bg: "bg-amber-500/10 dark:bg-amber-500/20", 
    text: "text-amber-600 dark:text-amber-400",
    gradient: "from-amber-500 to-yellow-500"
  },
  sorrowful: { 
    bg: "bg-purple-500/10 dark:bg-purple-500/20", 
    text: "text-purple-600 dark:text-purple-400",
    gradient: "from-purple-500 to-violet-500"
  },
  glorious: { 
    bg: "bg-gold-500/10 dark:bg-gold-500/20", 
    text: "text-gold-600 dark:text-gold-400",
    gradient: "from-gold-500 to-gold-600"
  },
  luminous: { 
    bg: "bg-sky-500/10 dark:bg-sky-500/20", 
    text: "text-sky-600 dark:text-sky-400",
    gradient: "from-sky-500 to-blue-500"
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

  const todaysMystery = getTodaysMystery();
  const mysteryInfo = getMysteryInfo(todaysMystery);
  const mysteryStyle = mysteryColors[todaysMystery];

  useEffect(() => {
    async function loadData() {
      try {
        const [statsData, feedData] = await Promise.all([
          getUserStats(),
          getFeed()
        ]);
        setStats(statsData);
        setRecentActivity(feedData.checkIns.slice(0, 3));
      } catch (error) {
        console.error("Error loading dashboard data:", error);
      } finally {
        setLoading(false);
      }
    }
    loadData();

    // Update time every minute
    const interval = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(interval);
  }, []);

  const getGreeting = () => {
    const hour = currentTime.getHours();
    if (hour < 12) return "Bom dia";
    if (hour < 18) return "Boa tarde";
    return "Boa noite";
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('pt-BR', { 
      weekday: 'long', 
      day: 'numeric', 
      month: 'long' 
    }).format(date);
  };

  const hasCheckedInToday = stats?.lastCheckIn 
    ? new Date(stats.lastCheckIn).toDateString() === new Date().toDateString()
    : false;

  // Generate calendar days for current week
  const getWeekDays = () => {
    const today = new Date();
    const days = [];
    for (let i = 6; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(today.getDate() - i);
      days.push({
        date,
        dayName: new Intl.DateTimeFormat('pt-BR', { weekday: 'short' }).format(date).slice(0, 3),
        dayNum: date.getDate(),
        isToday: date.toDateString() === today.toDateString(),
        // Simulating check-ins for the week based on stats
        hasCheckIn: i === 0 ? hasCheckedInToday : (stats?.currentStreak ?? 0) > i
      });
    }
    return days;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-gold-500 to-gold-600 flex items-center justify-center animate-pulse">
            <span className="text-3xl">📿</span>
          </div>
          <p className="text-muted-foreground">Carregando seu progresso...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background" data-testid="dashboard-page">
      <Navbar />
      
      {/* Main Content */}
      <main className="pt-4 pb-32 md:pt-8 md:pb-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          
          {/* Header Section */}
          <header className="mb-8 md:mb-12">
            <div className="flex items-center gap-2 text-muted-foreground text-sm mb-2">
              {currentTime.getHours() < 18 ? (
                <Sun className="w-4 h-4 text-gold-500" />
              ) : (
                <Moon className="w-4 h-4 text-gold-500" />
              )}
              <span className="capitalize">{formatDate(currentTime)}</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-cinzel font-bold text-foreground mb-2">
              {getGreeting()}, <span className="text-gold-500">Peregrino</span>
            </h1>
            <p className="text-muted-foreground text-lg">
              {hasCheckedInToday 
                ? "Você já rezou o terço hoje. Que Deus abençoe sua devoção!" 
                : "Já rezou o terço hoje? Os mistérios do dia aguardam você."}
            </p>
          </header>

          {/* Stats Cards Row */}
          <section className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8" data-testid="stats-section">
            {/* Current Streak */}
            <div className="col-span-2 lg:col-span-1 p-6 rounded-3xl glass sacred-border group hover:-translate-y-1 transition-all duration-300 hover:shadow-gold-glow">
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
                  <Flame className="w-6 h-6 text-white" />
                </div>
                {(stats?.currentStreak ?? 0) >= 7 && (
                  <span className="text-xs bg-orange-500/20 text-orange-600 dark:text-orange-400 px-2 py-1 rounded-full font-semibold">
                    Fogo!
                  </span>
                )}
              </div>
              <p className="text-4xl font-cinzel font-bold text-foreground mb-1">
                {stats?.currentStreak ?? 0}
              </p>
              <p className="text-sm text-muted-foreground">Dias Seguidos</p>
            </div>

            {/* Best Streak */}
            <div className="p-6 rounded-3xl glass sacred-border group hover:-translate-y-1 transition-all duration-300 hover:shadow-gold-glow">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-gold-500 to-gold-600 flex items-center justify-center mb-4 shadow-lg group-hover:scale-105 transition-transform">
                <Trophy className="w-6 h-6 text-white" />
              </div>
              <p className="text-4xl font-cinzel font-bold text-foreground mb-1">
                {stats?.longestStreak ?? 0}
              </p>
              <p className="text-sm text-muted-foreground">Melhor Sequência</p>
            </div>

            {/* Total Prayers */}
            <div className="p-6 rounded-3xl glass sacred-border group hover:-translate-y-1 transition-all duration-300 hover:shadow-gold-glow">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-sacred-blue to-slate-700 dark:from-slate-700 dark:to-slate-800 flex items-center justify-center mb-4 shadow-lg group-hover:scale-105 transition-transform">
                <Heart className="w-6 h-6 text-gold-400" />
              </div>
              <p className="text-4xl font-cinzel font-bold text-foreground mb-1">
                {stats?.totalCheckIns ?? 0}
              </p>
              <p className="text-sm text-muted-foreground">Total de Orações</p>
            </div>

            {/* Week Progress */}
            <div className="p-6 rounded-3xl glass sacred-border group hover:-translate-y-1 transition-all duration-300 hover:shadow-gold-glow">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-green-600 flex items-center justify-center mb-4 shadow-lg group-hover:scale-105 transition-transform">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <p className="text-4xl font-cinzel font-bold text-foreground mb-1">
                {Math.min(stats?.currentStreak ?? 0, 7)}/7
              </p>
              <p className="text-sm text-muted-foreground">Esta Semana</p>
            </div>
          </section>

          {/* Main Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
            
            {/* Today's Mystery - Large Card */}
            <div className="lg:col-span-2" data-testid="todays-mystery-card">
              <div className={`relative p-8 md:p-10 rounded-3xl overflow-hidden ${
                hasCheckedInToday 
                  ? "bg-gradient-to-br from-emerald-600 to-green-700" 
                  : "bg-gradient-to-br from-sacred-blue to-slate-800 dark:from-slate-800 dark:to-slate-900"
              }`}>
                {/* Background decoration */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-gold-500/10 rounded-full -translate-y-1/2 translate-x-1/2" />
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-gold-500/5 rounded-full translate-y-1/2 -translate-x-1/2" />
                
                <div className="relative z-10">
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
                    <div className="flex-1">
                      <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full ${mysteryStyle.bg} mb-4`}>
                        <Sparkles className={`w-4 h-4 ${mysteryStyle.text}`} />
                        <span className={`text-sm font-semibold ${mysteryStyle.text}`}>
                          Mistérios {mysteryNames[todaysMystery]}
                        </span>
                      </div>
                      
                      <h2 className="text-2xl md:text-3xl font-cinzel font-bold text-white mb-3">
                        {hasCheckedInToday ? "Oração Completa!" : "Mistério de Hoje"}
                      </h2>
                      
                      <p className="text-white/80 text-lg leading-relaxed mb-6">
                        {hasCheckedInToday 
                          ? "Parabéns por manter sua devoção diária. Que Nossa Senhora interceda por você."
                          : mysteryInfo.description
                        }
                      </p>

                      {hasCheckedInToday ? (
                        <div className="flex items-center gap-3 text-white/90">
                          <CheckCircle2 className="w-6 h-6 text-emerald-300" />
                          <span className="font-semibold">Terço rezado hoje</span>
                        </div>
                      ) : (
                        <Button
                          size="lg"
                          onClick={() => router.push("/como-rezar")}
                          className="group px-8 py-6 text-lg font-cinzel font-bold tracking-wide rounded-full bg-gradient-to-r from-gold-500 to-gold-600 text-sacred-blue hover:shadow-gold-glow-lg transition-all duration-300 border-2 border-gold-400/50"
                          data-testid="start-prayer-btn"
                        >
                          <span>Rezar Agora</span>
                          <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                        </Button>
                      )}
                    </div>

                    {/* Mystery Icon */}
                    <div className="hidden md:flex items-center justify-center">
                      <div className={`w-28 h-28 rounded-2xl bg-gradient-to-br ${mysteryStyle.gradient} flex items-center justify-center shadow-2xl ${hasCheckedInToday ? '' : 'animate-pulse-gold'}`}>
                        <span className="text-5xl">📿</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Week Progress Calendar */}
            <div className="p-6 rounded-3xl glass sacred-border" data-testid="week-calendar">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-cinzel font-bold text-foreground text-lg">Esta Semana</h3>
                <Calendar className="w-5 h-5 text-muted-foreground" />
              </div>
              
              <div className="grid grid-cols-7 gap-2">
                {getWeekDays().map((day, index) => (
                  <div 
                    key={index}
                    className={`flex flex-col items-center p-2 rounded-xl transition-colors ${
                      day.isToday 
                        ? "bg-gold-500/20 border border-gold-500/30" 
                        : "hover:bg-muted/50"
                    }`}
                  >
                    <span className="text-xs text-muted-foreground uppercase mb-1">
                      {day.dayName}
                    </span>
                    <span className={`text-sm font-semibold mb-2 ${
                      day.isToday ? "text-gold-600 dark:text-gold-400" : "text-foreground"
                    }`}>
                      {day.dayNum}
                    </span>
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                      day.hasCheckIn 
                        ? "bg-gradient-to-br from-gold-500 to-gold-600" 
                        : "bg-muted"
                    }`}>
                      {day.hasCheckIn && (
                        <CheckCircle2 className="w-4 h-4 text-white" />
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-4 border-t border-border">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Progresso semanal</span>
                  <span className="font-semibold text-gold-600 dark:text-gold-400">
                    {Math.min(stats?.currentStreak ?? 0, 7)}/7 dias
                  </span>
                </div>
                <div className="mt-2 h-2 rounded-full bg-muted overflow-hidden">
                  <div 
                    className="h-full rounded-full bg-gradient-to-r from-gold-500 to-gold-600 transition-all duration-500"
                    style={{ width: `${Math.min((stats?.currentStreak ?? 0) / 7 * 100, 100)}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="lg:col-span-2 grid grid-cols-2 sm:grid-cols-4 gap-4" data-testid="quick-actions">
              {[
                { icon: BookOpen, label: "Como Rezar", path: "/como-rezar", gradient: "from-sacred-blue to-slate-700" },
                { icon: Sparkles, label: "Mistérios", path: "/misterios-do-dia", gradient: "from-gold-500 to-gold-600" },
                { icon: History, label: "História", path: "/historia", gradient: "from-sacred-blue to-slate-700" },
                { icon: Users, label: "Comunidade", path: "/#community", gradient: "from-gold-500 to-gold-600" },
              ].map((action) => (
                <button
                  key={action.path}
                  onClick={() => router.push(action.path)}
                  className="group p-5 rounded-2xl glass sacred-border hover:-translate-y-1 transition-all duration-300 hover:shadow-gold-glow text-left"
                  data-testid={`quick-action-${action.label.toLowerCase().replace(/\s/g, '-')}`}
                >
                  <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${action.gradient} dark:${action.gradient.includes('sacred') ? 'from-slate-700 to-slate-800' : action.gradient} flex items-center justify-center mb-3 group-hover:scale-105 transition-transform shadow-md`}>
                    <action.icon className="w-5 h-5 text-white" />
                  </div>
                  <p className="font-semibold text-foreground text-sm group-hover:text-gold-600 dark:group-hover:text-gold-400 transition-colors">
                    {action.label}
                  </p>
                </button>
              ))}
            </div>

            {/* Recent Activity */}
            <div className="p-6 rounded-3xl glass sacred-border" data-testid="recent-activity">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-cinzel font-bold text-foreground text-lg">Atividade Recente</h3>
                <button className="text-sm text-gold-600 dark:text-gold-400 font-semibold hover:underline flex items-center gap-1">
                  Ver tudo
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              {recentActivity.length > 0 ? (
                <div className="space-y-4">
                  {recentActivity.map((activity) => {
                    const activityMysteryStyle = mysteryColors[activity.mystery];
                    return (
                      <div 
                        key={activity.id}
                        className="flex items-start gap-4 p-4 rounded-xl bg-muted/50 hover:bg-muted transition-colors"
                      >
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 bg-gradient-to-br ${activityMysteryStyle.gradient}`}>
                          <span className="text-lg">📿</span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${activityMysteryStyle.bg} ${activityMysteryStyle.text}`}>
                              {mysteryNames[activity.mystery]}
                            </span>
                            <span className="text-xs text-muted-foreground">
                              {new Date(activity.createdAt).toLocaleDateString('pt-BR')}
                            </span>
                          </div>
                          {activity.reflection && (
                            <p className="text-sm text-muted-foreground line-clamp-2">
                              {activity.reflection}
                            </p>
                          )}
                          <div className="flex items-center gap-3 mt-2">
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
                <div className="text-center py-8">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-muted flex items-center justify-center">
                    <Clock className="w-8 h-8 text-muted-foreground" />
                  </div>
                  <p className="text-muted-foreground mb-4">
                    Nenhuma atividade recente
                  </p>
                  <Button
                    variant="outline"
                    onClick={() => router.push("/como-rezar")}
                    className="rounded-full"
                  >
                    Começar a rezar
                  </Button>
                </div>
              )}
            </div>
          </div>

          {/* Motivational Quote */}
          <section className="mt-8 md:mt-12 p-8 md:p-10 rounded-3xl bg-gradient-to-br from-sacred-blue to-slate-800 dark:from-slate-800 dark:to-slate-900 text-white relative overflow-hidden" data-testid="quote-section">
            {/* Background decoration */}
            <div className="absolute top-0 right-0 text-gold-500/10 text-[120px] font-serif select-none pointer-events-none leading-none">
              &ldquo;
            </div>
            
            <div className="relative z-10 max-w-3xl">
              <Star className="w-8 h-8 text-gold-400 mb-4" />
              <blockquote className="text-xl md:text-2xl font-cinzel leading-relaxed mb-4">
                &ldquo;Reze o Rosário todos os dias para obter a paz no mundo e o fim da guerra.&rdquo;
              </blockquote>
              <cite className="text-gold-400 font-semibold">
                — Nossa Senhora de Fátima
              </cite>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
