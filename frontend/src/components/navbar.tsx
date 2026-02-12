"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter, usePathname } from "next/navigation";
import { Home, BookOpen, History, Sparkles, ScrollText, ChevronDown, Play, LayoutDashboard } from "lucide-react";
import { AuthModal } from "./auth-modal";
import { ComingSoonModal } from "./coming-soon-modal";
import { ThemeToggle } from "./theme-toggle";
import { Button } from "@/components/ui/button";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "@/providers/theme-provider";

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
  const { resolvedTheme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  };

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
        className={`fixed bottom-4 md:bottom-6 left-1/2 -translate-x-1/2 z-50 hidden md:flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-2 sm:py-2.5 rounded-full transition-all duration-500 max-w-[calc(100vw-1.5rem)] ${
          scrolled 
            ? "bg-sacred-blue/95 dark:bg-slate-900/95 backdrop-blur-xl shadow-2xl border border-white/10" 
            : "bg-sacred-blue/90 dark:bg-slate-900/90 backdrop-blur-lg shadow-xl border border-white/5"
        }`}
        data-testid="navbar-desktop"
      >
        {/* 1. Home */}
        <button
          onClick={() => navigateTo("/")}
          className={`flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full transition-colors ${
            pathname === "/" ? "bg-white/10" : "hover:bg-white/10"
          }`}
          data-testid="navbar-home"
        >
          <span className="text-lg sm:text-xl">📿</span>
          <span className="text-white font-medium text-xs sm:text-sm">Início</span>
        </button>

        <div className="w-px h-6 bg-white/20" />

        {/* 2. Explorar Dropdown */}
        <div className="relative" ref={explorarRef}>
          <button
            onClick={() => setExplorarOpen(!explorarOpen)}
            className={`flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full transition-colors ${
              isOnContentPage || explorarOpen
                ? "bg-gold-500/20 text-gold-400" 
                : "text-white/80 hover:text-white hover:bg-white/10"
            }`}
            data-testid="navbar-explorar"
          >
            <BookOpen className="w-4 h-4" />
            <span className="text-xs sm:text-sm font-medium">Explorar</span>
            <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${explorarOpen ? "rotate-180" : ""}`} />
          </button>

          {/* Dropdown Menu */}
          {explorarOpen && (
            <div 
              className="absolute bottom-full mb-3 left-1/2 -translate-x-1/2 w-[min(18rem,calc(100vw-2rem))] sm:w-72 bg-sacred-blue dark:bg-slate-900 rounded-2xl border border-white/10 shadow-2xl overflow-hidden"
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

        {/* 3. Dashboard */}
        <button
          onClick={() => navigateTo("/dashboard")}
          className={`flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full transition-colors ${
            pathname === "/dashboard" ? "bg-gold-500/20 text-gold-400" : "text-white/80 hover:text-white hover:bg-white/10"
          }`}
          data-testid="navbar-dashboard"
        >
          <LayoutDashboard className="w-4 h-4" />
          <span className="text-xs sm:text-sm font-medium">Dashboard</span>
        </button>

        <div className="w-px h-6 bg-white/20" />

        {/* Começar CTA */}
        <button
          onClick={() => showComingSoon("Funcionalidade de Check-in / Comunidade")}
          className="relative flex items-center gap-2 px-4 sm:px-5 py-1.5 sm:py-2 rounded-full bg-gradient-to-r from-gold-500 to-gold-600 text-sacred-blue font-cinzel font-bold text-xs sm:text-sm tracking-wide hover:shadow-[0_0_20px_-5px_rgba(212,175,55,0.5)] transition-all"
          data-testid="navbar-comecar"
        >
          <Play className="w-4 h-4" />
          <span>Começar</span>
          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-sacred-blue animate-pulse shadow-lg" title="Em desenvolvimento" />
        </button>
      </nav>

      {/* ═══════════════════════════════════════════
           MOBILE — Native-style bottom tab bar
           No top header needed; just a compact tab bar
           ═══════════════════════════════════════════ */}
      <nav
          className="fixed bottom-0 left-0 right-0 z-50 md:hidden safe-area-bottom"
          data-testid="mobile-tab-bar"
        >
          {/* Frosted glass background */}
          <div className="bg-sacred-blue/95 dark:bg-slate-900/95 backdrop-blur-xl border-t border-white/[0.06]">
            <div className="flex items-end justify-around px-2 pt-1.5 pb-1.5">
              {/* Home */}
              <button
                onClick={() => navigateTo("/")}
                className={`flex flex-col items-center justify-center w-14 py-1 rounded-lg transition-colors ${
                  pathname === "/" ? "text-gold-400" : "text-white/50 active:text-white/80"
                }`}
                data-testid="mobile-tab-home"
              >
                <Home className={`w-[22px] h-[22px] ${pathname === "/" ? "stroke-[2.5]" : "stroke-[1.5]"}`} />
                <span className="text-[10px] mt-0.5 leading-tight">{pathname === "/" ? "Início" : "Início"}</span>
                {pathname === "/" && <div className="w-1 h-1 rounded-full bg-gold-400 mt-0.5" />}
              </button>

              {/* Explorar */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className={`flex flex-col items-center justify-center w-14 py-1 rounded-lg transition-colors ${
                  isOnContentPage || mobileMenuOpen ? "text-gold-400" : "text-white/50 active:text-white/80"
                }`}
                data-testid="mobile-tab-explorar"
              >
                <BookOpen className={`w-[22px] h-[22px] ${isOnContentPage ? "stroke-[2.5]" : "stroke-[1.5]"}`} />
                <span className="text-[10px] mt-0.5 leading-tight">Explorar</span>
                {isOnContentPage && <div className="w-1 h-1 rounded-full bg-gold-400 mt-0.5" />}
              </button>

              {/* Central CTA — elevated gold pill */}
              <button
                onClick={() => showComingSoon("Funcionalidade de Check-in / Comunidade")}
                className="flex flex-col items-center justify-center -mt-3 group"
                data-testid="mobile-tab-comecar"
              >
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gold-500 to-gold-600 flex items-center justify-center shadow-gold-glow group-active:scale-95 transition-transform">
                  <Play className="w-5 h-5 text-sacred-blue ml-0.5" />
                </div>
                <span className="text-[10px] text-gold-400 mt-0.5 leading-tight">Rezar</span>
              </button>

              {/* Dashboard */}
              <button
                onClick={() => navigateTo("/dashboard")}
                className={`flex flex-col items-center justify-center w-14 py-1 rounded-lg transition-colors ${
                  pathname === "/dashboard" ? "text-gold-400" : "text-white/50 active:text-white/80"
                }`}
                data-testid="mobile-tab-dashboard"
              >
                <LayoutDashboard className={`w-[22px] h-[22px] ${pathname === "/dashboard" ? "stroke-[2.5]" : "stroke-[1.5]"}`} />
                <span className="text-[10px] mt-0.5 leading-tight">Painel</span>
                {pathname === "/dashboard" && <div className="w-1 h-1 rounded-full bg-gold-400 mt-0.5" />}
              </button>

              {/* More / Mais */}
              <button
                onClick={() => showComingSoon("Perfil e Configurações")}
                className="flex flex-col items-center justify-center w-14 py-1 rounded-lg text-white/50 active:text-white/80 transition-colors"
                data-testid="mobile-tab-more"
              >
                <div className="flex gap-[3px] items-center justify-center w-[22px] h-[22px]">
                  <div className="w-[4px] h-[4px] rounded-full bg-current" />
                  <div className="w-[4px] h-[4px] rounded-full bg-current" />
                  <div className="w-[4px] h-[4px] rounded-full bg-current" />
                </div>
                <span className="text-[10px] mt-0.5 leading-tight">Mais</span>
              </button>
            </div>
          </div>
        </nav>

      {/* ═══ Mobile Explorar Sheet (slides up from bottom) ═══ */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-40 md:hidden"
          onClick={() => setMobileMenuOpen(false)}
        >
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
          <div
            className="absolute bottom-[68px] left-3 right-3 bg-sacred-blue dark:bg-slate-900 rounded-2xl border border-white/10 shadow-2xl overflow-hidden animate-fade-in safe-area-bottom"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-3">
              <div className="w-10 h-1 rounded-full bg-white/20 mx-auto mb-3" />

              {explorarLinks.map((link) => (
                <button
                  key={link.path}
                  onClick={() => navigateTo(link.path)}
                  className={`flex items-center gap-3 w-full px-3 py-3 rounded-xl transition-colors min-h-[48px] ${
                    pathname === link.path
                      ? "bg-gold-500/15 text-gold-400"
                      : "text-white hover:bg-white/5 active:bg-white/10"
                  }`}
                  data-testid={`mobile-nav-${link.path.replace("/", "")}`}
                >
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ${
                    pathname === link.path ? "bg-gold-500/20" : "bg-white/5"
                  }`}>
                    <link.icon className="w-[18px] h-[18px]" />
                  </div>
                  <div className="text-left min-w-0">
                    <span className="font-medium block text-sm">{link.label}</span>
                    <span className="text-[11px] text-white/40">{link.description}</span>
                  </div>
                </button>
              ))}
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
