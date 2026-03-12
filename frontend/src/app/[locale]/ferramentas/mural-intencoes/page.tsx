"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { PageTransition } from "@/components/page-transition";
import { PageHeader } from "@/components/page-header";
import { useIntentionsStore } from "@/store/use-intentions-store";
import { IntentionCategory } from "@/types/store";
import { Heart, Plus, Search, CheckCircle2 } from "lucide-react";
import { formatRelativeTime } from "@/lib/utils";
import confetti from "canvas-confetti";
import { Button } from "@/components/ui/button";

const CATEGORIES: { id: IntentionCategory | "all"; labelKey: string; color: string }[] = [
  { id: "all", labelKey: "filters.all", color: "bg-slate-500 text-white" },
  { id: "familia", labelKey: "filters.family", color: "bg-rose-500/20 text-rose-600 dark:text-rose-400 border-rose-500/30" },
  { id: "saude", labelKey: "filters.health", color: "bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border-emerald-500/30" },
  { id: "conversao", labelKey: "filters.conversion", color: "bg-blue-500/20 text-blue-600 dark:text-blue-400 border-blue-500/30" },
  { id: "almas", labelKey: "filters.souls", color: "bg-purple-500/20 text-purple-600 dark:text-purple-400 border-purple-500/30" },
  { id: "outros", labelKey: "filters.other", color: "bg-amber-500/20 text-amber-600 dark:text-amber-400 border-amber-500/30" }
];

export default function IntentionsWallPage() {
  const t = useTranslations("Mural");
  const intentions = useIntentionsStore((s) => s.intentions);
  const addIntention = useIntentionsStore((s) => s.addIntention);
  const incrementPrayedCount = useIntentionsStore((s) => s.incrementPrayedCount);
  const markAsAnswered = useIntentionsStore((s) => s.markAsAnswered);

  const [activeFilter, setActiveFilter] = useState<IntentionCategory | "all">("all");
  const [newTitle, setNewTitle] = useState("");
  const [newCategory, setNewCategory] = useState<IntentionCategory>("familia");
  const [isCreating, setIsCreating] = useState(false);
  const [search, setSearch] = useState("");

  const filteredIntentions = intentions.filter(i => {
    if (activeFilter !== "all" && i.category !== activeFilter) return false;
    if (search.trim() && !i.title.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const activeCount = intentions.filter(i => i.status === "active").length;
  const answeredCount = intentions.filter(i => i.status === "answered").length;

  const triggerConfetti = (e: React.MouseEvent) => {
    const rect = (e.target as HTMLElement).getBoundingClientRect();
    const x = (rect.left + rect.right) / 2 / window.innerWidth;
    const y = (rect.top + rect.bottom) / 2 / window.innerHeight;

    confetti({
      particleCount: 40,
      spread: 60,
      origin: { x, y },
      colors: ["#D4AF37", "#B8960C", "#FFF"]
    });
  };

  const handleIncrement = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    triggerConfetti(e);
    incrementPrayedCount(id);
  };

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;
    addIntention(newTitle.trim(), newCategory);
    setNewTitle("");
    setIsCreating(false);
  };

  return (
    <PageTransition>
      <div className="min-h-screen bg-background pb-24">
        <PageHeader title={t('title')} subtitle={t('subtitle')} icon="📌" />

        <main className="max-w-6xl mx-auto px-4 sm:px-6 mt-8 space-y-8">
          
          {/* Dashboard/Stats Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-6 rounded-2xl bg-card border border-border flex flex-col justify-center items-center text-center">
              <span className="text-3xl font-cinzel font-bold text-foreground">{activeCount}</span>
              <span className="text-xs uppercase tracking-wider text-muted-foreground font-bold mt-1">{t('activeIntentions')}</span>
            </div>
            <div className="p-6 rounded-2xl bg-card border border-border flex flex-col justify-center items-center text-center">
              <span className="text-3xl font-cinzel font-bold text-gold-600 dark:text-gold-400">{answeredCount}</span>
              <span className="text-xs uppercase tracking-wider text-muted-foreground font-bold mt-1">{t('answeredGraces')}</span>
            </div>
            <button 
              onClick={() => setIsCreating(true)}
              className="p-6 rounded-2xl bg-gradient-to-br from-gold-500 to-gold-600 flex flex-col justify-center items-center text-white hover:shadow-gold-glow-lg transition-all duration-300 hover:-translate-y-1"
            >
              <Plus className="w-8 h-8 mb-2" />
              <span className="font-cinzel font-bold tracking-widest text-sm uppercase">{t('newIntention')}</span>
            </button>
          </div>

          {/* Creation Form inline */}
          {isCreating && (
            <div className="p-6 rounded-2xl bg-card border border-gold-500/50 shadow-xl shadow-gold-500/10 animate-fade-in">
              <form onSubmit={handleCreate} className="space-y-4">
                <div className="flex flex-col mb-4">
                  <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2">{t('yourIntention')}</label>
                  <input 
                    autoFocus
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    placeholder={t('placeholder')}
                    className="w-full bg-background border border-border rounded-xl px-4 py-3 focus:outline-none focus:border-gold-500 transition-colors"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2 block">{t('category')}</label>
                  <div className="flex flex-wrap gap-2">
                    {CATEGORIES.filter(c => c.id !== "all").map(c => (
                      <button
                        type="button"
                        key={c.id}
                        onClick={() => setNewCategory(c.id as IntentionCategory)}
                        className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider border transition-all ${newCategory === c.id ? c.color : "bg-muted text-muted-foreground border-transparent hover:bg-muted/80"}`}
                      >
                         {c.id}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="flex justify-end gap-3 pt-4 border-t border-border">
                  <Button type="button" variant="ghost" onClick={() => setIsCreating(false)}>{t('cancel')}</Button>
                  <Button type="submit" disabled={!newTitle.trim()} className="bg-gold-600 hover:bg-gold-700 text-white rounded-full px-6">{t('publish')}</Button>
                </div>
              </form>
            </div>
          )}

          {/* Filters & Search */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="flex overflow-x-auto pb-2 sm:pb-0 w-full sm:w-auto scrollbar-hide gap-2">
              {CATEGORIES.map(c => (
                <button
                  key={c.id}
                  onClick={() => setActiveFilter(c.id as any)}
                  className={`px-4 py-2 flex-shrink-0 rounded-full text-xs font-bold uppercase tracking-wider border transition-all ${activeFilter === c.id ? c.color : "bg-muted text-muted-foreground border-transparent hover:bg-muted/80"}`}
                >
                  {c.id}
                </button>
              ))}
            </div>
            <div className="relative w-full sm:w-64">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input 
                placeholder={t('search')} 
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-card border border-border rounded-full pl-9 pr-4 py-2 text-sm focus:outline-none focus:border-gold-500 transition-colors"
              />
            </div>
          </div>

          {/* Masonry Grid */}
          {filteredIntentions.length === 0 ? (
            <div className="text-center py-20 px-4">
              <span className="text-5xl block mb-4">🕊️</span>
              <h3 className="text-xl font-cinzel font-bold text-foreground mb-2">{t('emptyTitle')}</h3>
              <p className="text-muted-foreground">{t('emptyDesc')}</p>
            </div>
          ) : (
            <div className="columns-1 md:columns-2 lg:columns-3 gap-6">
              {filteredIntentions.map((intention) => {
                const isAnswered = intention.status === "answered";
                const catInfo = CATEGORIES.find(c => c.id === intention.category);

                return (
                  <div key={intention.id} className={`break-inside-avoid mb-6 relative p-6 rounded-2xl border transition-all duration-300 hover:shadow-lg ${isAnswered ? "bg-gradient-to-br from-gold-500/10 to-amber-500/5 border-gold-500/30" : "bg-card border-border hover:border-gold-500/30"}`}>
                    <div className="flex items-start justify-between mb-3">
                      <span className={`text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full border ${catInfo?.color}`}>
                        {intention.category}
                      </span>
                      {isAnswered && (
                        <span className="flex items-center gap-1 text-xs font-bold text-gold-600 dark:text-gold-400">
                          <CheckCircle2 className="w-4 h-4" /> {t('answered')}
                        </span>
                      )}
                    </div>
                    
                    <p className={`text-foreground leading-relaxed font-manrope mb-4 ${isAnswered ? "italic" : ""}`}>
                      "{intention.title}"
                    </p>

                    <div className="flex items-center justify-between mt-auto pt-4 border-t border-border/50">
                      <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                        <Heart className={`w-4 h-4 ${intention.prayedCount > 0 ? "text-rose-500 fill-rose-500/20" : ""}`} />
                        <span className={intention.prayedCount > 0 ? "font-bold text-foreground" : ""}>
                          {t('prayedCount', { count: intention.prayedCount })}
                        </span>
                      </div>
                      
                      {!isAnswered ? (
                        <div className="flex gap-2">
                           <button 
                            onClick={() => markAsAnswered(intention.id)}
                            className="text-[10px] uppercase font-bold tracking-wider text-muted-foreground hover:text-gold-500 transition-colors px-2"
                            title="Marcar como graça alcançada"
                          >
                            {t('markAnswered')}
                          </button>
                          <button 
                            onClick={(e) => handleIncrement(intention.id, e)}
                            className="bg-gold-100 hover:bg-gold-200 dark:bg-gold-500/20 dark:hover:bg-gold-500/30 text-gold-700 dark:text-gold-400 text-xs font-bold px-3 py-1.5 rounded-full transition-colors flex items-center gap-1"
                          >
                            {t('addPrayer')}
                          </button>
                        </div>
                      ) : (
                        <span className="text-[10px] text-muted-foreground">
                           Alcançada em {new Date(intention.answeredAt || Date.now()).toLocaleDateString('pt-BR')}
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}

        </main>
      </div>
    </PageTransition>
  );
}
