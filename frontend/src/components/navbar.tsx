"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter, usePathname } from "next/navigation";
import { Menu, X, BookOpen, History, Sparkles, ScrollText, ChevronDown, Play } from "lucide-react";
import { AuthModal } from "./auth-modal";
import { ComingSoonModal } from "./coming-soon-modal";
import { ThemeToggle } from "./theme-toggle";
import { Button } from "@/components/ui/button";

export function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [comingSoonModalOpen, setComingSoonModalOpen] = useState(false);
  const [comingSoonFeature, setComingSoonFeature] = useState("");
  const [authMode, setAuthMode] = useState<"login" | "signup">("login");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [explorarOpen, setExplorarOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const explorarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (explorarRef.current && !explorarRef.current.contains(event.target as Node)) {
        setExplorarOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const showComingSoon = (featureName: string) => {
    setComingSoonFeature(featureName);
    setComingSoonModalOpen(true);
    setMobileMenuOpen(false);
    setExplorarOpen(false);
  };

  const openLogin = () => {
    showComingSoon("Login");
  };

  const openSignup = () => {
    showComingSoon("Cadastro");
  };

  const switchMode = () => {
    setAuthMode(authMode === "login" ? "signup" : "login");
  };

  const navigateTo = (path: string) => {
    router.push(path);
    setMobileMenuOpen(false);
    setExplorarOpen(false);
  };

  const explorarLinks = [
    { label: "Como Rezar", description: "Aprenda passo a passo", icon: BookOpen, path: "/como-rezar" },
    { label: "História", description: "Origens e tradição", icon: History, path: "/historia" },
    { label: "Mistérios do Dia", description: "Meditações diárias", icon: Sparkles, path: "/misterios-do-dia" },
    { label: "Orações", description: "Textos tradicionais", icon: ScrollText, path: "/oracoes-tradicionais" },
  ];

  const isOnContentPage = explorarLinks.some(link => pathname === link.path);

  return (
    <>
      {/* Desktop Floating Navbar - Minimalist 3-item design */}
      <nav 
        className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-50 hidden md:flex items-center gap-2 px-3 py-2.5 rounded-full transition-all duration-500 ${
          scrolled 
            ? "bg-sacred-blue/95 dark:bg-slate-900/95 backdrop-blur-xl shadow-2xl border border-white/10" 
            : "bg-sacred-blue/90 dark:bg-slate-900/90 backdrop-blur-lg shadow-xl border border-white/5"
        }`}
        data-testid="navbar-desktop"
      >
        {/* 1. Home */}
        <button
          onClick={() => navigateTo("/")}
          className={`flex items-center gap-2.5 px-4 py-2 rounded-full transition-colors ${
            pathname === "/" ? "bg-white/10" : "hover:bg-white/10"
          }`}
          data-testid="navbar-home"
        >
          <span className="text-xl">📿</span>
          <span className="text-white font-medium text-sm">Início</span>
        </button>

        <div className="w-px h-6 bg-white/20" />

        {/* 2. Explorar Dropdown */}
        <div className="relative" ref={explorarRef}>
          <button
            onClick={() => setExplorarOpen(!explorarOpen)}
            className={`flex items-center gap-2 px-4 py-2 rounded-full transition-colors ${
              isOnContentPage || explorarOpen
                ? "bg-gold-500/20 text-gold-400" 
                : "text-white/80 hover:text-white hover:bg-white/10"
            }`}
            data-testid="navbar-explorar"
          >
            <BookOpen className="w-4 h-4" />
            <span className="text-sm font-medium">Explorar</span>
            <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${explorarOpen ? "rotate-180" : ""}`} />
          </button>

          {/* Dropdown Menu */}
          {explorarOpen && (
            <div 
              className="absolute bottom-full mb-3 left-1/2 -translate-x-1/2 w-72 bg-sacred-blue dark:bg-slate-900 rounded-2xl border border-white/10 shadow-2xl overflow-hidden"
              data-testid="explorar-dropdown"
            >
              <div className="p-2">
                {explorarLinks.map((link) => (
                  <button
                    key={link.path}
                    onClick={() => navigateTo(link.path)}
                    className={`flex items-start gap-3 w-full px-4 py-3 rounded-xl transition-colors text-left ${
                      pathname === link.path 
                        ? "bg-gold-500/20 text-gold-400" 
                        : "text-white hover:bg-white/10"
                    }`}
                    data-testid={`explorar-${link.path.replace("/", "")}`}
                  >
                    <link.icon className="w-5 h-5 mt-0.5 flex-shrink-0" />
                    <div>
                      <span className="font-medium block">{link.label}</span>
                      <span className="text-xs text-white/50">{link.description}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="w-px h-6 bg-white/20" />

        {/* Theme Toggle */}
        <ThemeToggle />

        <div className="w-px h-6 bg-white/20" />

        {/* 3. Começar CTA */}
        <button
          onClick={() => showComingSoon("Funcionalidade de Check-in / Comunidade")}
          className="relative flex items-center gap-2 px-5 py-2 rounded-full bg-gradient-to-r from-gold-500 to-gold-600 text-sacred-blue font-cinzel font-bold text-sm tracking-wide hover:shadow-[0_0_20px_-5px_rgba(212,175,55,0.5)] transition-all"
          data-testid="navbar-comecar"
        >
          <Play className="w-4 h-4" />
          <span>Começar</span>
          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-sacred-blue animate-pulse shadow-lg" title="Em desenvolvimento" />
        </button>
      </nav>

      {/* Mobile Header */}
      <header 
        className={`fixed top-0 left-0 right-0 z-50 md:hidden transition-all duration-300 ${
          scrolled 
            ? "bg-sacred-blue/95 dark:bg-slate-900/95 backdrop-blur-xl shadow-lg" 
            : "bg-transparent"
        }`}
        data-testid="navbar-mobile"
      >
        <div className="flex items-center justify-between px-4 py-3">
          <button
            onClick={() => navigateTo("/")}
            className="flex items-center gap-2"
            data-testid="mobile-home"
          >
            <span className="text-2xl">📿</span>
            <span className={`font-cinzel font-bold text-sm tracking-wide ${scrolled ? "text-white" : "text-sacred-blue dark:text-white"}`}>
              Terço Hoje
            </span>
          </button>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`w-10 h-10 rounded-full ${scrolled ? "text-white hover:bg-white/10" : "text-sacred-blue dark:text-white hover:bg-sacred-blue/10 dark:hover:bg-white/10"}`}
              data-testid="mobile-menu-toggle"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay - Simplified */}
      {mobileMenuOpen && (
        <div 
          className="fixed inset-0 z-40 md:hidden"
          onClick={() => setMobileMenuOpen(false)}
        >
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
          <div 
            className="absolute top-16 left-4 right-4 bg-sacred-blue dark:bg-slate-900 rounded-2xl border border-white/10 shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-4 space-y-3">
              {/* Explorar Section */}
              <p className="text-white/50 text-xs uppercase tracking-wider font-semibold px-3">Explorar o Rosário</p>
              
              <div className="space-y-1">
                {explorarLinks.map((link) => (
                  <button
                    key={link.path}
                    onClick={() => navigateTo(link.path)}
                    className={`flex items-center gap-3 w-full px-4 py-3 rounded-xl transition-colors ${
                      pathname === link.path 
                        ? "bg-gold-500/20 text-gold-400" 
                        : "text-white hover:bg-white/10"
                    }`}
                    data-testid={`mobile-nav-${link.path.replace("/", "")}`}
                  >
                    <link.icon className="w-5 h-5" />
                    <div className="text-left">
                      <span className="font-medium block">{link.label}</span>
                      <span className="text-xs text-white/50">{link.description}</span>
                    </div>
                  </button>
                ))}
              </div>

              {/* CTA Button */}
              <div className="border-t border-white/10 pt-4 mt-4">
                <button
                  onClick={() => showComingSoon("Funcionalidade de Check-in / Comunidade")}
                  className="relative flex items-center justify-center gap-2 w-full px-4 py-3.5 rounded-xl bg-gradient-to-r from-gold-500 to-gold-600 text-sacred-blue font-cinzel font-bold tracking-wide hover:shadow-gold-glow transition-all"
                  data-testid="mobile-nav-comecar"
                >
                  <Play className="w-5 h-5" />
                  <span>Começar a Rezar</span>
                  <span className="absolute top-2 right-2 w-2.5 h-2.5 rounded-full bg-sacred-blue animate-pulse" title="Em desenvolvimento" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        mode={authMode}
        onSwitchMode={switchMode}
      />
      
      <ComingSoonModal
        isOpen={comingSoonModalOpen}
        onClose={() => setComingSoonModalOpen(false)}
        featureName={comingSoonFeature}
      />
    </>
  );
}
