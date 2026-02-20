"use client";

import { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Lock, User, Eye, EyeOff, ArrowRight, Shield } from "lucide-react";

export interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode: "login" | "signup";
  onSwitchMode: () => void;
  onLogin: (username: string, password: string) => Promise<void>;
  onSignup: (username: string, password: string) => Promise<void>;
}

export function AuthModal({
  isOpen,
  onClose,
  mode,
  onSwitchMode,
  onLogin,
  onSignup,
}: AuthModalProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!formData.username.trim()) {
      setError("Informe seu nome de usuário.");
      return;
    }
    if (formData.password.length < 6) {
      setError("A senha deve ter pelo menos 6 caracteres.");
      return;
    }
    if (mode === "signup" && formData.password !== formData.confirmPassword) {
      setError("As senhas não coincidem.");
      return;
    }

    setIsSubmitting(true);
    try {
      if (mode === "signup") {
        await onSignup(formData.username.trim(), formData.password);
      } else {
        await onLogin(formData.username.trim(), formData.password);
      }
      setFormData({ username: "", password: "", confirmPassword: "" });
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : null;
      setError(msg ?? "Algo deu errado. Tente novamente.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInput = (field: keyof typeof formData, value: string) => {
    setError(null);
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const isLogin = mode === "login";

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="p-0 border-0 bg-transparent shadow-none max-w-sm w-full overflow-visible [&>button]:hidden">
        {/* ── Card ── */}
        <div className="relative rounded-2xl overflow-hidden bg-slate-900/95 backdrop-blur-2xl border border-yellow-500/20 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.8)]">

          {/* Gold top accent bar */}
          <div className="h-1 w-full bg-gradient-to-r from-yellow-700 via-yellow-400 to-yellow-700" />

          {/* Subtle background glow */}
          <div className="absolute inset-0 pointer-events-none" aria-hidden>
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-32 bg-yellow-500/5 rounded-full blur-3xl" />
          </div>

          <div className="relative px-8 pt-8 pb-7">

            {/* Close button */}
            <button
              onClick={onClose}
              aria-label="Fechar"
              className="absolute top-4 right-4 w-7 h-7 rounded-full text-slate-500 hover:text-slate-300 hover:bg-slate-800 flex items-center justify-center transition-colors text-lg leading-none"
            >
              ×
            </button>

            {/* Icon + Title */}
            <div className="flex flex-col items-center gap-3 mb-6">
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-yellow-500/20 to-yellow-600/10 border border-yellow-500/30 flex items-center justify-center shadow-[0_0_20px_rgba(212,175,55,0.2)]">
                <span className="text-2xl select-none">📿</span>
              </div>
              <div className="text-center">
                <h2 className="font-cinzel font-bold text-xl text-white tracking-wide">
                  {isLogin ? "Bem-vindo de volta" : "Criar conta"}
                </h2>
                <p className="text-slate-400 text-sm mt-1">
                  {isLogin
                    ? "Entre para continuar sua jornada"
                    : "Junte-se à nossa comunidade de oração"}
                </p>
              </div>
            </div>

            {/* Disclaimer */}
            <div className="flex items-start gap-2.5 px-3.5 py-2.5 rounded-xl bg-yellow-500/5 border border-yellow-500/15 mb-5">
              <Shield className="w-4 h-4 text-yellow-500/60 mt-0.5 flex-shrink-0" />
              <p className="text-xs text-slate-400 leading-relaxed">
                Conta local — dados salvos{" "}
                <span className="text-yellow-400/80 font-medium">apenas neste dispositivo</span>.
                Limpar o cache apaga a conta.
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">

              {/* Username */}
              <div className="space-y-1.5">
                <Label
                  htmlFor="auth-username"
                  className="text-sm font-medium text-slate-300"
                >
                  Nome de usuário
                </Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                  <Input
                    id="auth-username"
                    type="text"
                    autoComplete="username"
                    placeholder="peregrino123"
                    value={formData.username}
                    onChange={(e) => handleInput("username", e.target.value)}
                    data-testid="auth-username"
                    className="pl-9 bg-slate-800/60 border-slate-700/60 text-white placeholder:text-slate-600 focus-visible:border-yellow-500/50 focus-visible:ring-yellow-500/20 focus-visible:ring-2 rounded-xl h-11 transition-colors"
                    required
                  />
                </div>
              </div>

              {/* Password */}
              <div className="space-y-1.5">
                <Label
                  htmlFor="auth-password"
                  className="text-sm font-medium text-slate-300"
                >
                  Senha
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                  <Input
                    id="auth-password"
                    type={showPassword ? "text" : "password"}
                    autoComplete={isLogin ? "current-password" : "new-password"}
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={(e) => handleInput("password", e.target.value)}
                    data-testid="auth-password"
                    className="pl-9 pr-10 bg-slate-800/60 border-slate-700/60 text-white placeholder:text-slate-600 focus-visible:border-yellow-500/50 focus-visible:ring-yellow-500/20 focus-visible:ring-2 rounded-xl h-11 transition-colors"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors"
                    aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Confirm Password (signup only) */}
              {!isLogin && (
                <div className="space-y-1.5">
                  <Label
                    htmlFor="auth-confirm"
                    className="text-sm font-medium text-slate-300"
                  >
                    Confirmar senha
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                    <Input
                      id="auth-confirm"
                      type={showPassword ? "text" : "password"}
                      autoComplete="new-password"
                      placeholder="••••••••"
                      value={formData.confirmPassword}
                      onChange={(e) => handleInput("confirmPassword", e.target.value)}
                      data-testid="auth-confirm-password"
                      className="pl-9 bg-slate-800/60 border-slate-700/60 text-white placeholder:text-slate-600 focus-visible:border-yellow-500/50 focus-visible:ring-yellow-500/20 focus-visible:ring-2 rounded-xl h-11 transition-colors"
                      required
                    />
                  </div>
                </div>
              )}

              {/* Error */}
              {error && (
                <p className="text-sm text-red-400 font-medium text-center bg-red-500/10 border border-red-500/20 rounded-xl px-3 py-2">
                  {error}
                </p>
              )}

              {/* Submit */}
              <Button
                type="submit"
                disabled={isSubmitting}
                data-testid="auth-submit"
                className="w-full h-11 rounded-full bg-gradient-to-r from-yellow-600 to-yellow-500 text-slate-900 font-cinzel font-bold tracking-wide hover:shadow-[0_0_20px_rgba(212,175,55,0.4)] hover:from-yellow-500 hover:to-yellow-400 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed mt-1"
              >
                {isSubmitting ? "Aguarde…" : isLogin ? "Entrar" : "Criar conta"}
              </Button>

              {/* Switch mode */}
              <p className="text-center text-sm text-slate-500">
                {isLogin ? "Não tem uma conta? " : "Já tem uma conta? "}
                <button
                  type="button"
                  onClick={onSwitchMode}
                  className="text-yellow-500 hover:text-yellow-400 font-semibold transition-colors"
                  data-testid="auth-switch-mode"
                >
                  {isLogin ? "Cadastre-se" : "Entrar"}
                </button>
              </p>

              {/* Skip */}
              <div className="pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={onClose}
                  data-testid="auth-skip"
                  className="w-full flex items-center justify-center gap-1.5 text-sm text-slate-500 hover:text-slate-300 font-medium transition-colors group py-1"
                >
                  Explorar sem conta
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </button>
              </div>
            </form>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
