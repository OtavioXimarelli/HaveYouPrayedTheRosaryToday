"use client";

import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { BookOpen, History, Sparkles, ScrollText, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AuthModal } from "./auth-modal";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "@/providers/theme-provider";

export function PublicHeader() {
  const router = useRouter();
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<"login" | "signup">("signup");
  const { resolvedTheme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const openSignup = () => {
    setAuthMode("signup");
    setAuthModalOpen(true);
    setMobileMenuOpen(false);
  };

  const openLogin = () => {
    setAuthMode("login");
    setAuthModalOpen(true);
    setMobileMenuOpen(false);
  };

  const switchMode = () => {
    setAuthMode(authMode === "login" ? "signup" : "login");
  };

  const navigateTo = (path: string) => {
    router.push(path);
    setMobileMenuOpen(false);
  };

  const navLinks = [
    { label: "Como Rezar", icon: BookOpen, path: "/como-rezar" },
    { label: "História", icon: History, path: "/historia" },
    { label: "Mistérios", icon: Sparkles, path: "/misterios-do-dia" },
    { label: "Orações", icon: ScrollText, path: "/oracoes-tradicionais" },
  ];

  return (
    <>
      <header 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled 
            ? "bg-sacred-cream/95 dark:bg-slate-950/95 backdrop-blur-xl shadow-lg border-b border-gold-500/10" 
            : "bg-sacred-cream/80 dark:bg-slate-950/80 backdrop-blur-md"
        }`}
      >
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            {/* Logo */}
            <button
              onClick={() => navigateTo("/")}
              className="flex items-center gap-2 sm:gap-3 group"
              data-testid="header-logo"
            >
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-gold-500 to-gold-600 flex items-center justify-center shadow-lg group-hover:shadow-gold-glow transition-all">
                <span className="text-xl sm:text-2xl">📿</span>
              </div>
              <div className="hidden sm:block">
                <h1 className="font-cinzel font-bold text-lg sm:text-xl text-foreground group-hover:text-gold-500 transition-colors">
                  Rosário Vivo
                </h1>
              </div>
            </button>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => {
                const Icon = link.icon;
                const isActive = pathname === link.path;
                return (
                  <button
                    key={link.path}
                    onClick={() => navigateTo(link.path)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-200 ${
                      isActive
                        ? "bg-gold-500/10 text-gold-600 dark:text-gold-400 font-medium"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                    }`}
                    data-testid={`nav-${link.path.replace("/", "")}`}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="text-sm">{link.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Desktop Actions */}
            <div className="hidden md:flex items-center gap-3">
              <button
                onClick={toggleTheme}
                className="w-9 h-9 rounded-full glass sacred-border flex items-center justify-center hover:shadow-gold-glow transition-all duration-300"
                aria-label="Alternar tema"
                data-testid="theme-toggle"
              >
                <Sun className="h-4 w-4 rotate-0 scale-100 text-gold-600 transition-transform duration-300 dark:-rotate-90 dark:scale-0" />
                <Moon className="absolute h-4 w-4 rotate-90 scale-0 text-gold-400 transition-transform duration-300 dark:rotate-0 dark:scale-100" />
              </button>

              <Button
                variant="outline"
                size="sm"
                onClick={openLogin}
                className="rounded-full border-gold-500/20 hover:border-gold-500/40 hover:bg-gold-500/5"
                data-testid="header-login"
              >
                Entrar
              </Button>

              <Button
                size="sm"
                onClick={openSignup}
                className="rounded-full bg-gradient-to-r from-gold-500 to-gold-600 text-sacred-blue hover:shadow-gold-glow font-cinzel font-semibold"
                data-testid="header-signup"
              >
                Começar
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex md:hidden items-center gap-2">
              <button
                onClick={toggleTheme}
                className="w-9 h-9 rounded-full glass sacred-border flex items-center justify-center"
                aria-label="Alternar tema"
              >
                <Sun className="h-4 w-4 rotate-0 scale-100 text-gold-600 transition-transform duration-300 dark:-rotate-90 dark:scale-0" />
                <Moon className="absolute h-4 w-4 rotate-90 scale-0 text-gold-400 transition-transform duration-300 dark:rotate-0 dark:scale-100" />
              </button>

              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="w-9 h-9 rounded-full glass sacred-border flex items-center justify-center"
                aria-label="Menu"
                data-testid="mobile-menu-button"
              >
                {mobileMenuOpen ? (
                  <X className="w-5 h-5 text-foreground" />
                ) : (
                  <Menu className="w-5 h-5 text-foreground" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden border-t border-gold-500/10 py-4 animate-fade-in">
              <div className="space-y-1 mb-4">
                {navLinks.map((link) => {
                  const Icon = link.icon;
                  const isActive = pathname === link.path;
                  return (
                    <button
                      key={link.path}
                      onClick={() => navigateTo(link.path)}
                      className={`flex items-center gap-3 w-full px-4 py-3 rounded-xl transition-all ${
                        isActive
                          ? "bg-gold-500/10 text-gold-600 dark:text-gold-400 font-medium"
                          : "text-muted-foreground hover:bg-muted/50"
                      }`}
                      data-testid={`mobile-nav-${link.path.replace("/", "")}`}
                    >
                      <Icon className="w-5 h-5" />
                      <span>{link.label}</span>
                    </button>
                  );
                })}
              </div>

              <div className="flex flex-col gap-2 pt-4 border-t border-gold-500/10">
                <Button
                  variant="outline"
                  onClick={openLogin}
                  className="w-full rounded-full border-gold-500/20"
                  data-testid="mobile-login"
                >
                  Entrar
                </Button>

                <Button
                  onClick={openSignup}
                  className="w-full rounded-full bg-gradient-to-r from-gold-500 to-gold-600 text-sacred-blue font-cinzel font-semibold"
                  data-testid="mobile-signup"
                >
                  Começar Agora
                </Button>
              </div>
            </div>
          )}
        </nav>
      </header>

      {/* Spacer to prevent content from going under fixed header */}
      <div className="h-16 sm:h-20" />

      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        mode={authMode}
        onSwitchMode={switchMode}
      />
    </>
  );
}
