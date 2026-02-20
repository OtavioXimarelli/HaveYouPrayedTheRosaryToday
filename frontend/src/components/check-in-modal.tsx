"use client";

import { useState } from "react";
import { Loader2, Sparkles } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Toggle } from "@/components/ui/toggle";
import { useSubmitCheckIn } from "@/hooks/use-rosary";
import { useToast } from "@/hooks/use-toast";
import {
  MysteryType,
  IntentionTag,
  MYSTERIES,
  INTENTION_TAGS,
  getTodaysMystery,
  getMysteryInfo,
} from "@/types";

interface CheckInModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
}

export function CheckInModal({ open, onOpenChange, onSuccess }: CheckInModalProps) {
  const todaysMystery = getTodaysMystery();
  
  const [mystery, setMystery] = useState<MysteryType>(todaysMystery);
  const [reflection, setReflection] = useState("");
  const [selectedIntentions, setSelectedIntentions] = useState<IntentionTag[]>([]);
  const [showSuccess, setShowSuccess] = useState(false);

  const submitMutation = useSubmitCheckIn();
  const { toast } = useToast();

  const handleIntentionToggle = (tag: IntentionTag) => {
    setSelectedIntentions((prev) =>
      prev.includes(tag)
        ? prev.filter((t) => t !== tag)
        : [...prev, tag]
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
        resetForm();
      }, 2000);

      toast({
        title: "Terço registrado! 🙏",
        description: "Sua oração foi adicionada à comunidade.",
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

  const resetForm = () => {
    setMystery(todaysMystery);
    setReflection("");
    setSelectedIntentions([]);
  };

  if (showSuccess) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-md bg-gradient-to-br from-slate-900 to-slate-800 border-yellow-500/30">
          <div className="flex flex-col items-center justify-center py-12 text-center animate-fade-in">
            <div className="w-20 h-20 bg-gold rounded-full flex items-center justify-center mb-6 animate-scale-in animate-pulse-gold">
              <Sparkles className="w-10 h-10 text-navy-dark" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-2 animate-slide-up animate-delay-200">
              Lindo! 🙏
            </h2>
            <p className="text-white/70 animate-slide-up animate-delay-300">
              Seu terço foi registrado. Que Deus te abençoe.
            </p>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg bg-slate-900/95 backdrop-blur-2xl border border-yellow-500/20 max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-cinzel text-white flex items-center gap-2">
            <span>📿</span> Registrar seu Terço
          </DialogTitle>
          <DialogDescription className="text-slate-400">
            Compartilhe sua experiência de oração com a comunidade.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Mystery Selection */}
          <div className="space-y-2 animate-slide-up">
            <Label htmlFor="mystery" className="text-white font-medium">
              Qual Mistério você rezou?
            </Label>
            <Select value={mystery} onValueChange={(v) => setMystery(v as MysteryType)}>
              <SelectTrigger id="mystery" className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {MYSTERIES.map((m) => (
                  <SelectItem key={m.type} value={m.type}>
                    <div className="flex flex-col items-start">
                      <span className="font-medium">{m.name}</span>
                      {m.type === todaysMystery && (
                        <span className="text-xs text-gold">
                          ✨ Mistério de Hoje
                        </span>
                      )}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <p className="text-xs text-muted-foreground">
              {getMysteryInfo(mystery).description}
            </p>
          </div>

          {/* Reflection */}
          <div className="space-y-2 animate-slide-up animate-delay-100">
            <Label htmlFor="reflection" className="text-white font-medium">
              O que tocou seu coração hoje?{" "}
              <span className="text-muted-foreground font-normal">(opcional)</span>
            </Label>
            <Textarea
              id="reflection"
              placeholder="Compartilhe um pensamento, sentimento ou a intenção da sua oração..."
              value={reflection}
              onChange={(e) => setReflection(e.target.value)}
              className="min-h-[100px]"
              maxLength={500}
            />
            <p className="text-xs text-muted-foreground text-right">
              {reflection.length}/500
            </p>
          </div>

          {/* Intentions */}
          <div className="space-y-3 animate-slide-up animate-delay-200">
            <Label className="text-white font-medium">
              Intenções da Oração
            </Label>
            <div className="flex flex-wrap gap-2">
              {INTENTION_TAGS.map((tag) => (
                <Toggle
                  key={tag.value}
                  variant="tag"
                  pressed={selectedIntentions.includes(tag.value)}
                  onPressedChange={() => handleIntentionToggle(tag.value)}
                  className="gap-1.5"
                >
                  <span>{tag.emoji}</span>
                  <span>{tag.label}</span>
                </Toggle>
              ))}
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex flex-col sm:flex-row gap-3 pt-4">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="sm:flex-1"
          >
            Cancelar
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={submitMutation.isPending}
            className="sm:flex-1 bg-gradient-to-r from-yellow-600 to-yellow-500 text-slate-900 font-cinzel font-bold hover:shadow-lg transition-all rounded-lg"
          >
            {submitMutation.isPending ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin mr-2" />
                Registrando...
              </>
            ) : (
              <>
                <span className="mr-2">Concluir Registro</span>
                <span>✨</span>
              </>
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
