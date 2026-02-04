"use client";

import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

interface PageHeaderProps {
  title: string;
  subtitle: string;
  icon: string;
}

export function PageHeader({ title, subtitle, icon }: PageHeaderProps) {
  const router = useRouter();

  return (
    <header className="relative overflow-hidden">
      {/* Background - matches theme */}
      <div className="absolute inset-0 bg-gradient-to-br from-sacred-blue via-slate-800 to-slate-900">
        {/* Gold accent glow */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(212,175,55,0.15)_0%,transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_rgba(212,175,55,0.1)_0%,transparent_60%)]" />
        {/* Decorative cross */}
        <div className="absolute top-0 right-0 text-gold-500/5 text-[200px] font-serif select-none pointer-events-none translate-x-1/4 -translate-y-1/4">
          ✝
        </div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        <Button
          variant="ghost"
          onClick={() => router.push("/")}
          className="mb-6 text-white/80 hover:text-white hover:bg-white/10 rounded-full px-4"
          data-testid="back-button"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Voltar
        </Button>
        
        <div className="flex items-center gap-4 mb-4">
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br from-gold-500 to-gold-600 flex items-center justify-center shadow-lg shadow-gold-500/20">
            <span className="text-3xl sm:text-4xl">{icon}</span>
          </div>
          <div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-cinzel font-bold text-white">
              {title}
            </h1>
            <p className="text-gold-400/80 text-lg mt-1 font-medium">
              {subtitle}
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}
