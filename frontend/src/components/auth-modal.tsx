"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Mail, Lock, User, Eye, EyeOff, ArrowRight, Info } from "lucide-react";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode: "login" | "signup";
  onSwitchMode: () => void;
  onLogin: (email: string, password: string) => Promise<void>;
  onSignup: (name: string, email: string, password: string) => Promise<void>;
}

export function AuthModal({
  isOpen,
  onClose,
  mode,
  onSwitchMode,
  onLogin,
  onSignup,
}: AuthModalProps) {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (mode === "signup" && formData.password !== formData.confirmPassword) {
      setError("As senhas não coincidem.");
      return;
    }
    if (formData.password.length < 6) {
      setError("A senha deve ter pelo menos 6 caracteres.");
      return;
    }

    setIsSubmitting(true);
    try {
      if (mode === "signup") {
        await onSignup(formData.name, formData.email, formData.password);
      } else {
        await onLogin(formData.email, formData.password);
      }
      // reset form on success
      setFormData({ name: "", email: "", password: "", confirmPassword: "" });
    } catch (err) {
      setError("Algo deu errado. Tente novamente.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setError(null);
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSkip = () => {
    onClose();
    router.push("/dashboard");
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-white border-2 border-blue-200">
        <DialogHeader>
          <div className="flex justify-center mb-4 animate-scale-in">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-lg animate-pulse-gold">
              <span className="text-3xl">📿</span>
            </div>
          </div>
          <DialogTitle className="text-2xl font-bold text-center text-blue-900">
            {mode === "login" ? "Bem-vindo de volta!" : "Junte-se a nós"}
          </DialogTitle>
          <DialogDescription className="text-center text-blue-700">
            {mode === "login"
              ? "Entre para continuar sua jornada de oração"
              : "Crie sua conta e comece a rezar conosco"}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          {/* localStorage disclaimer */}
          <div className="flex items-start gap-2 px-3 py-2.5 rounded-xl bg-blue-50 border border-blue-100 text-xs text-blue-700">
            <Info className="w-4 h-4 mt-0.5 flex-shrink-0 text-blue-400" />
            <span>
              Seus dados são salvos <strong>apenas neste dispositivo</strong>.
              Limpar o cache do navegador apagará sua conta local.
            </span>
          </div>

          {mode === "signup" && (
            <div className="space-y-2 animate-slide-up">
              <Label htmlFor="name" className="text-blue-900 font-semibold">
                Nome completo
              </Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-blue-400" />
                <Input
                  id="name"
                  type="text"
                  placeholder="Seu nome"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  className="pl-10 border-blue-200 focus:border-blue-400 focus:ring-blue-400"
                  required
                />
              </div>
            </div>
          )}

          <div className="space-y-2 animate-slide-up animate-delay-100">
            <Label htmlFor="email" className="text-blue-900 font-semibold">
              Email
            </Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-blue-400" />
              <Input
                id="email"
                type="email"
                placeholder="seu@email.com"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                className="pl-10 border-blue-200 focus:border-blue-400 focus:ring-blue-400"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="password" className="text-blue-900 font-semibold">
              Senha
            </Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-blue-400" />
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) => handleInputChange("password", e.target.value)}
                className="pl-10 pr-10 border-blue-200 focus:border-blue-400 focus:ring-blue-400"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-blue-400 hover:text-blue-600 transition-colors"
              >
                {showPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>

          {mode === "signup" && (
            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="text-blue-900 font-semibold">
                Confirmar senha
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-blue-400" />
                <Input
                  id="confirmPassword"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={formData.confirmPassword}
                  onChange={(e) =>
                    handleInputChange("confirmPassword", e.target.value)
                  }
                  className="pl-10 border-blue-200 focus:border-blue-400 focus:ring-blue-400"
                  required
                />
              </div>
            </div>
          )}

          {mode === "login" && (
            <div className="flex justify-end">
              {/* TODO: Implement password recovery when backend is connected */}
              <span className="text-sm text-blue-400 font-medium cursor-not-allowed select-none">
                Esqueceu a senha?
              </span>
            </div>
          )}

          {error && (
            <p className="text-sm text-red-600 font-medium text-center">{error}</p>
          )}

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold py-6 shadow-lg hover:shadow-xl transition-all disabled:opacity-60"
          >
            {isSubmitting
              ? "Aguarde…"
              : mode === "login"
              ? "Entrar"
              : "Criar conta"}
          </Button>

          {/* Social login — coming soon
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-blue-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-blue-600 font-medium">
                ou continue com
              </span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            Google button — TODO
            Facebook button — TODO
          </div>
          */}

          <div className="text-center text-sm text-blue-700 mt-4">
            {mode === "login" ? (
              <>
                Ainda não tem uma conta?{" "}
                <button
                  type="button"
                  onClick={onSwitchMode}
                  className="text-blue-600 hover:text-blue-800 font-bold transition-colors"
                >
                  Cadastre-se
                </button>
              </>
            ) : (
              <>
                Já tem uma conta?{" "}
                <button
                  type="button"
                  onClick={onSwitchMode}
                  className="text-blue-600 hover:text-blue-800 font-bold transition-colors"
                >
                  Entrar
                </button>
              </>
            )}
          </div>

          {/* Skip Button */}
          <div className="pt-4 border-t border-blue-200">
            <Button
              type="button"
              variant="ghost"
              onClick={handleSkip}
              className="w-full text-blue-600 hover:text-blue-800 hover:bg-blue-50 font-semibold transition-all group"
            >
              Pular por enquanto e explorar
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
