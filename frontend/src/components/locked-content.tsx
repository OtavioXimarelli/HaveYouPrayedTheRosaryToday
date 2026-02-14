"use client";

import { Lock, Heart, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

interface LockedContentProps {
  title: string;
  description: string;
  featureList?: string[];
  variant?: "default" | "minimal" | "card";
}

export function LockedContent({ 
  title, 
  description, 
  featureList = [],
  variant = "default" 
}: LockedContentProps) {
  const router = useRouter();

  if (variant === "minimal") {
    return (
      <div className="relative p-6 rounded-2xl glass sacred-border text-center" data-testid="locked-content-minimal">
        <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-gradient-to-br from-gold-500/20 to-gold-600/20 flex items-center justify-center">
          <Lock className="w-5 h-5 text-gold-600 dark:text-gold-400" />
        </div>
        <p className="text-muted-foreground text-sm mb-4">{description}</p>
        <Button
          variant="outline"
          size="sm"
          onClick={() => router.push("/")}
          className="rounded-full border-gold-500/30 text-gold-600 dark:text-gold-400 hover:bg-gold-500/10"
          data-testid="locked-content-login-btn"
        >
          Entrar para desbloquear
        </Button>
      </div>
    );
  }

  if (variant === "card") {
    return (
      <div className="relative overflow-hidden rounded-2xl" data-testid="locked-content-card">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/80 to-background z-10 flex items-end justify-center pb-8">
          <Button
            onClick={() => router.push("/")}
            className="rounded-full px-6 py-5 text-sm font-cinzel font-bold bg-gradient-to-r from-gold-500 to-gold-600 text-sacred-blue hover:shadow-gold-glow transition-all"
            data-testid="locked-content-card-btn"
          >
            <Lock className="w-4 h-4 mr-2" />
            Entrar para ver conteúdo completo
          </Button>
        </div>
        <div className="blur-sm pointer-events-none select-none p-6 glass sacred-border rounded-2xl">
          <div className="h-32 bg-muted/50 rounded-xl mb-4" />
          <div className="h-4 bg-muted/50 rounded w-3/4 mb-2" />
          <div className="h-4 bg-muted/50 rounded w-1/2" />
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-sacred-blue via-slate-800 to-slate-900 text-white relative overflow-hidden" data-testid="locked-content-default">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(212,175,55,0.15)_0%,transparent_50%)]" />
      
      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-gold-500 to-gold-600 flex items-center justify-center shadow-lg">
            <Lock className="w-7 h-7 text-sacred-blue" />
          </div>
          <div>
            <h3 className="text-xl sm:text-2xl font-cinzel font-bold">{title}</h3>
            <p className="text-white/60 text-sm">Conteúdo para membros</p>
          </div>
        </div>

        <p className="text-white/80 text-lg mb-6 leading-relaxed">{description}</p>

        {featureList.length > 0 && (
          <ul className="space-y-2 mb-8">
            {featureList.map((feature, i) => (
              <li key={i} className="flex items-center gap-2 text-white/70">
                <Heart className="w-4 h-4 text-gold-400 flex-shrink-0" />
                <span className="text-sm">{feature}</span>
              </li>
            ))}
          </ul>
        )}

        <div className="flex flex-col sm:flex-row gap-3">
          <Button
            size="lg"
            onClick={() => router.push("/")}
            className="rounded-full px-8 py-6 text-base font-cinzel font-bold bg-gradient-to-r from-gold-500 to-gold-600 text-sacred-blue hover:shadow-gold-glow-lg transition-all"
            data-testid="locked-signup-btn"
          >
            Criar conta gratuita
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
          <Button
            size="lg"
            variant="outline"
            onClick={() => router.push("/")}
            className="rounded-full px-8 py-6 text-base font-semibold border-white/20 text-white hover:bg-white/10"
            data-testid="locked-login-btn"
          >
            Já tenho conta
          </Button>
        </div>

        <p className="text-white/40 text-xs mt-4 text-center sm:text-left">
          100% gratuito • Projeto open-source • Comunidade de fé
        </p>
      </div>
    </div>
  );
}
