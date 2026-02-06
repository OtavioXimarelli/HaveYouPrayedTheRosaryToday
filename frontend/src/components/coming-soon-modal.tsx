"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Construction, Sparkles } from "lucide-react";

interface ComingSoonModalProps {
  isOpen: boolean;
  onClose: () => void;
  featureName: string;
}

export function ComingSoonModal({ isOpen, onClose, featureName }: ComingSoonModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md glass border-gold-500/20">
        <DialogHeader>
          <div className="flex items-center justify-center mb-4">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-gold-500 to-gold-600 flex items-center justify-center shadow-gold-glow animate-pulse-gold">
              <Construction className="w-8 h-8 text-sacred-blue" strokeWidth={2.5} />
            </div>
          </div>
          <DialogTitle className="text-center font-cinzel text-2xl">
            Em Desenvolvimento
          </DialogTitle>
          {/* Use a visually-hidden description for accessibility, render visible content outside */}
          <DialogDescription className="sr-only">
            A funcionalidade {featureName} ainda está sendo desenvolvida.
          </DialogDescription>
        </DialogHeader>

        {/* Visible modal body — rendered as divs to avoid <p> nesting issues */}
        <div className="text-center space-y-4 pt-2">
          <p className="text-base text-muted-foreground">
            A funcionalidade{" "}
            <strong className="text-gold-600 dark:text-gold-400">{featureName}</strong>{" "}
            ainda está sendo desenvolvida.
          </p>

          <div className="p-4 rounded-xl bg-gradient-to-br from-gold-500/10 to-gold-600/5 border border-gold-500/20">
            <div className="flex items-start gap-3">
              <Sparkles className="w-5 h-5 text-gold-600 dark:text-gold-400 flex-shrink-0 mt-0.5" />
              <div className="text-sm text-left text-muted-foreground">
                <p className="mb-2">Enquanto isso, você pode explorar:</p>
                <ul className="space-y-1.5 text-xs">
                  <li className="flex items-center gap-2">📖 Como rezar o Rosário</li>
                  <li className="flex items-center gap-2">📜 História do Santo Rosário</li>
                  <li className="flex items-center gap-2">🌟 Mistérios do dia</li>
                  <li className="flex items-center gap-2">🙏 Orações tradicionais</li>
                </ul>
              </div>
            </div>
          </div>

          <p className="text-sm text-muted-foreground italic">
            Em breve teremos novidades! 🙏
          </p>
        </div>

        <div className="flex justify-center mt-4">
          <Button
            onClick={onClose}
            className="rounded-full px-8 py-3 bg-gradient-to-r from-gold-500 to-gold-600 text-sacred-blue font-cinzel font-bold hover:shadow-gold-glow transition-all min-h-[44px]"
            data-testid="coming-soon-close"
          >
            Entendi
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
