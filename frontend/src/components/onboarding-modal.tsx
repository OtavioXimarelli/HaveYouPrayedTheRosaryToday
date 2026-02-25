"use client";

import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { 
  Sparkles, 
  ArrowRight, 
  CheckCircle2,
  Heart
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";

export function OnboardingModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState(1);
  const t = useTranslations("Onboarding");

  useEffect(() => {
    const hasSeenOnboarding = localStorage.getItem("rosario-onboarding-seen");
    if (!hasSeenOnboarding) {
      // Small delay for better UX
      const timer = setTimeout(() => setIsOpen(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    localStorage.setItem("rosario-onboarding-seen", "true");
    setIsOpen(false);
  };

  const nextStep = () => {
    if (step < 3) setStep(step + 1);
    else handleClose();
  };

  const steps = [
    {
      id: 1,
      title: t("step1.title"),
      description: t("step1.desc"),
      icon: Heart,
      color: "from-rose-500 to-rose-600",
      features: [t("step1.f1"), t("step1.f2"), t("step1.f3")]
    },
    {
      id: 2,
      title: t("step2.title"),
      description: t("step2.desc"),
      icon: Sparkles,
      color: "from-gold-500 to-gold-600",
      features: [t("step2.f1"), t("step2.f2"), t("step2.f3")]
    },
    {
      id: 3,
      title: t("step3.title"),
      description: t("step3.desc"),
      icon: CheckCircle2,
      color: "from-emerald-500 to-emerald-600",
      features: [t("step3.f1"), t("step3.f2"), t("step3.f3")]
    }
  ];

  const current = steps[step - 1];

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md p-0 overflow-hidden glass border-gold-500/20 rounded-[2rem]">
        <DialogTitle className="sr-only">{t("title")}</DialogTitle>
        <DialogDescription className="sr-only">{t("description")}</DialogDescription>
        
        <div className="relative p-8 text-center flex flex-col items-center">
          {/* Progress dots */}
          <div className="flex gap-2 mb-8">
            {steps.map((s) => (
              <div 
                key={s.id}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  s.id === step ? "w-8 bg-gold-500" : "w-2 bg-muted"
                }`}
              />
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col items-center"
            >
              <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${current.color} flex items-center justify-center shadow-xl mb-6`}>
                <current.icon className="w-10 h-10 text-white" />
              </div>

              <h2 className="text-2xl sm:text-3xl font-cinzel font-bold text-foreground mb-4">
                {current.title}
              </h2>

              <p className="text-muted-foreground leading-relaxed mb-8 max-w-xs">
                {current.description}
              </p>

              <div className="space-y-3 w-full max-w-[240px] mb-8">
                {current.features.map((f, i) => (
                  <div key={i} className="flex items-center gap-3 text-sm font-medium text-foreground text-left">
                    <div className="w-5 h-5 rounded-full bg-gold-500/10 flex items-center justify-center flex-shrink-0">
                      <CheckCircle2 className="w-3 h-3 text-gold-500" />
                    </div>
                    {f}
                  </div>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>

          <Button
            onClick={nextStep}
            className="w-full rounded-full py-7 text-lg font-cinzel font-bold bg-gradient-to-r from-gold-500 to-gold-600 text-sacred-blue hover:shadow-gold-glow transition-all"
          >
            {step === 3 ? t("start") : t("next")}
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>

          {step < 3 && (
            <button 
              onClick={handleClose}
              className="mt-4 text-xs font-bold uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors"
            >
              {t("skip")}
            </button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
