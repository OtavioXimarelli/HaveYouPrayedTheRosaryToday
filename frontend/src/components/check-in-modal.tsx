"use client";

import { useState } from "react";
import { Loader2, CheckCircle2, ChevronRight } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useSubmitCheckIn } from "@/hooks/use-rosary";
import { useToast } from "@/hooks/use-toast";
import {
  MysteryType,
  IntentionTag,
  MYSTERIES,
  INTENTION_TAGS,
  getTodaysMystery,
} from "@/types";

interface CheckInModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
}

const MYSTERY_META: Record<
  MysteryType,
  { emoji: string; gradient: string; ring: string; bg: string; label: string; days: string }
> = {
  joyful: {
    emoji: "☀️",
    gradient: "from-amber-500 to-yellow-500",
    ring: "ring-amber-400/60",
    bg: "bg-amber-500/10",
    label: "Gozosos",
    days: "Seg & Sáb",
  },
  sorrowful: {
    emoji: "✝️",
    gradient: "from-purple-500 to-violet-600",
    ring: "ring-purple-400/60",
    bg: "bg-purple-500/10",
    label: "Dolorosos",
    days: "Ter & Sex",
  },
  glorious: {
    emoji: "👑",
    gradient: "from-yellow-500 to-amber-600",
    ring: "ring-yellow-400/60",
    bg: "bg-yellow-500/10",
    label: "Gloriosos",
    days: "Dom & Qua",
  },
  luminous: {
    emoji: "💧",
    gradient: "from-sky-500 to-blue-600",
    ring: "ring-sky-400/60",
    bg: "bg-sky-500/10",
    label: "Luminosos",
    days: "Quinta-feira",
  },
};

export function CheckInModal({ open, onOpenChange, onSuccess }: CheckInModalProps) {
  const todaysMystery = getTodaysMystery();

  const [mystery, setMystery] = useState<MysteryType>(todaysMystery);
  const [reflection, setReflection] = useState("");
  const [selectedIntentions, setSelectedIntentions] = useState<IntentionTag[]>([]);
  const [showSuccess, setShowSuccess] = useState(false);

  const submitMutation = useSubmitCheckIn();
  const { toast } = useToast();

  const toggleIntention = (tag: IntentionTag) => {
    setSelectedIntentions((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const handleSubmit = async () => {
    try {
      await submitMutation.mutateAsync({
        mystery,
        reflection: reflection.trim() || undefined,
        intentions: selectedIntentions,
      });

      setShowSuccess(true);
      onSuccess?.();

      setTimeout(() => {
        setShowSuccess(false);
        onOpenChange(false);
        setMystery(todaysMystery);
        setReflection("");
        setSelectedIntentions([]);
      }, 2800);

      toast({
        title: "Terço registrado! 🙏",
        description: "Sua oração foi salva. Que Deus te abençoe.",
        variant: "success",
      });
    } catch (error) {
      toast({
        title: "Erro",
        description: error instanceof Error ? error.message : "Algo deu errado",
        variant: "destructive",
      });
    }
  };

  /* ── Success screen ── */
  if (showSuccess) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-sm bg-slate-900/98 backdrop-blur-2xl border border-yellow-500/20 rounded-2xl">
          <DialogTitle className="sr-only">Oração Registrada</DialogTitle>
          <DialogDescription className="sr-only">Seu terço foi registrado com sucesso.</DialogDescription>
          <div className="flex flex-col items-center justify-center py-10 text-center gap-5">
            <div className="relative">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-yellow-500 to-amber-600 flex items-center justify-center shadow-2xl shadow-yellow-500/30 animate-pulse">
                <span className="text-5xl">📿</span>
              </div>
              <div className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center border-2 border-slate-900">
                <CheckCircle2 className="w-4 h-4 text-white" />
              </div>
            </div>
            <div>
              <h2 className="text-2xl font-cinzel font-bold text-white mb-2">
                Ave Maria! 🙏
              </h2>
              <p className="text-slate-400 text-sm leading-relaxed">
                Seu terço foi registrado.<br />Que Nossa Senhora interceda por você.
              </p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  /* ── Main form ── */
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg bg-slate-900/98 backdrop-blur-2xl border border-yellow-500/20 rounded-2xl p-0 overflow-hidden max-h-[92dvh] flex flex-col">
        {/* Header */}
        <div className="px-6 pt-6 pb-4 border-b border-slate-800 flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-yellow-600 to-yellow-500 flex items-center justify-center shadow-lg">
              <span className="text-xl">📿</span>
            </div>
            <div>
              <DialogTitle className="text-lg font-cinzel font-bold text-white leading-tight">
                Registrar Terço
              </DialogTitle>
              <DialogDescription className="text-slate-400 text-xs mt-0.5">
                Registre sua oração de hoje
              </DialogDescription>
            </div>
          </div>
        </div>

        {/* Scrollable body */}
        <div className="flex-1 overflow-y-auto px-6 py-5 space-y-6">

          {/* Mystery Cards */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-3">
              Qual mistério você rezou?
            </p>
            <div className="grid grid-cols-2 gap-3">
              {MYSTERIES.map((m) => {
                const meta = MYSTERY_META[m.type];
                const isSelected = mystery === m.type;
                const isToday = m.type === todaysMystery;
                return (
                  <button
                    key={m.type}
                    onClick={() => setMystery(m.type)}
                    className={`relative flex flex-col items-start gap-2 p-4 rounded-xl border transition-all duration-200 text-left ${
                      isSelected
                        ? `${meta.bg} border-yellow-500/50 ring-2 ${meta.ring}`
                        : "bg-slate-800/50 border-slate-700/50 hover:border-slate-600"
                    }`}
                  >
                    {isToday && (
                      <span className="absolute top-2 right-2 text-[10px] px-1.5 py-0.5 rounded-full bg-yellow-500/20 text-yellow-400 font-bold uppercase tracking-wide">
                        Hoje
                      </span>
                    )}
                    <div
                      className={`w-10 h-10 rounded-lg bg-gradient-to-br ${meta.gradient} flex items-center justify-center text-xl shadow-md`}
                    >
                      {meta.emoji}
                    </div>
                    <div>
                      <p className={`text-sm font-cinzel font-bold leading-tight ${isSelected ? "text-white" : "text-slate-300"}`}>
                        {meta.label}
                      </p>
                      <p className="text-[11px] text-slate-500 mt-0.5">{meta.days}</p>
                    </div>
                    {isSelected && (
                      <div className="absolute bottom-2 right-2 w-4 h-4 rounded-full bg-yellow-500 flex items-center justify-center">
                        <CheckCircle2 className="w-3 h-3 text-slate-900" />
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Intentions */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-3">
              Intenções <span className="normal-case font-normal text-slate-600">(opcional)</span>
            </p>
            <div className="flex flex-wrap gap-2">
              {INTENTION_TAGS.map((tag) => {
                const active = selectedIntentions.includes(tag.value);
                return (
                  <button
                    key={tag.value}
                    onClick={() => toggleIntention(tag.value)}
                    className={`flex items-center gap-1.5 px-3 py-2 rounded-full text-sm font-medium transition-all duration-150 ${
                      active
                        ? "bg-gradient-to-r from-yellow-600 to-yellow-500 text-slate-900 shadow-md shadow-yellow-500/20"
                        : "bg-slate-800 text-slate-400 border border-slate-700 hover:border-slate-500 hover:text-slate-300"
                    }`}
                  >
                    <span>{tag.emoji}</span>
                    <span>{tag.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Reflection */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-3">
              Reflexão <span className="normal-case font-normal text-slate-600">(opcional)</span>
            </p>
            <Textarea
              placeholder="O que tocou seu coração durante a oração?"
              value={reflection}
              onChange={(e) => setReflection(e.target.value)}
              maxLength={500}
              className="min-h-[90px] bg-slate-800/60 border-slate-700 text-slate-200 placeholder:text-slate-600 focus:border-yellow-500/50 focus:ring-yellow-500/20 resize-none rounded-xl text-sm"
            />
            {reflection.length > 0 && (
              <p className="text-xs text-slate-600 text-right mt-1">
                {reflection.length}/500
              </p>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-slate-800 flex-shrink-0 flex items-center gap-3">
          <button
            onClick={() => onOpenChange(false)}
            className="text-slate-500 hover:text-slate-300 text-sm transition-colors flex-shrink-0"
          >
            Cancelar
          </button>
          <Button
            onClick={handleSubmit}
            disabled={submitMutation.isPending}
            className="flex-1 bg-gradient-to-r from-yellow-600 to-yellow-500 text-slate-900 font-cinzel font-bold rounded-xl py-5 hover:shadow-lg hover:shadow-yellow-500/25 transition-all duration-200 text-base"
          >
            {submitMutation.isPending ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin mr-2" />
                Registrando…
              </>
            ) : (
              <>
                Registrar Oração
                <ChevronRight className="w-4 h-4 ml-1" />
              </>
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
