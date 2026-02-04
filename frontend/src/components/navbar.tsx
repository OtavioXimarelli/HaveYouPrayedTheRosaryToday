"use client";

import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { Home, Info, Users, LogIn, UserPlus, Menu, X, BookOpen, History, Sparkles, ScrollText } from "lucide-react";
import { AuthModal } from "./auth-modal";
import { ThemeToggle } from "./theme-toggle";
import { Button } from "@/components/ui/button";

export function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<"login" | "signup">("login");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const openLogin = () => {
    setAuthMode("login");
    setAuthModalOpen(true);
    setMobileMenuOpen(false);
  };

  const openSignup = () => {
    setAuthMode("signup");
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

  const scrollToSection = (sectionId: string) => {
    setMobileMenuOpen(false);
    if (pathname !== "/") {
      router.push(`/#${sectionId}`);
    } else {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  };

  const aboutLinks = [
    { label: "Como Rezar", icon: BookOpen, path: "/como-rezar" },
    { label: "História", icon: History, path: "/historia" },
    { label: "Mistérios", icon: Sparkles, path: "/misterios-do-dia" },
    { label: "Orações", icon: ScrollText, path: "/oracoes-tradicionais" },
  ];

  return (
    <>
      {/* Desktop Floating Navbar */}
      <nav 
        className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-50 hidden md:flex items-center gap-1 px-2 py-2 rounded-full transition-all duration-500 ${
          scrolled 
            ? "bg-sacred-blue/95 dark:bg-slate-900/95 backdrop-blur-xl shadow-2xl border border-white/10" 
            : "bg-sacred-blue/80 dark:bg-slate-900/80 backdrop-blur-lg shadow-xl border border-white/5"
        }`}
        data-testid="navbar-desktop"
      >
        {/* Logo */}
        <button
          onClick={() => navigateTo("/")}
          className="flex items-center gap-2 px-4 py-2 rounded-full hover:bg-white/10 transition-colors"
          data-testid="navbar-logo"
        >
          <span className="text-2xl">📿</span>
          <span className="text-white font-cinzel font-bold text-sm tracking-wide">Rosário</span>
        </button>

        <div className="w-px h-6 bg-white/20 mx-1" />

        {/* Nav Links */}
        <button
          onClick={() => navigateTo("/")}
          className={`flex items-center gap-2 px-4 py-2 rounded-full transition-colors ${
            pathname === "/" ? "bg-gold-500/20 text-gold-400" : "text-white/80 hover:text-white hover:bg-white/10"
          }`}
          data-testid="nav-home"
        >
          <Home className="w-4 h-4" />
          <span className="text-sm font-medium">Início</span>
        </button>

        <button
          onClick={() => scrollToSection("about")}
          className="flex items-center gap-2 px-4 py-2 rounded-full text-white/80 hover:text-white hover:bg-white/10 transition-colors"
          data-testid="nav-about"
        >
          <Info className="w-4 h-4" />
          <span className="text-sm font-medium">Sobre</span>
        </button>

        <button
          onClick={() => scrollToSection("community")}
          className="flex items-center gap-2 px-4 py-2 rounded-full text-white/80 hover:text-white hover:bg-white/10 transition-colors"
          data-testid="nav-community"
        >
          <Users className="w-4 h-4" />
          <span className="text-sm font-medium">Comunidade</span>
        </button>

        <div className="w-px h-6 bg-white/20 mx-1" />

        {/* Auth Buttons */}
        <button
          onClick={openLogin}
          className="flex items-center gap-2 px-4 py-2 rounded-full text-white/80 hover:text-white hover:bg-white/10 transition-colors"
          data-testid="nav-login"
        >
          <LogIn className="w-4 h-4" />
          <span className="text-sm font-medium">Entrar</span>
        </button>

        <button
          onClick={openSignup}
          className="flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-gold-500 to-gold-600 text-sacred-blue font-semibold hover:shadow-gold-glow transition-all"
          data-testid="nav-signup"
        >
          <UserPlus className="w-4 h-4" />
          <span className="text-sm">Cadastrar</span>
        </button>

        <div className="w-px h-6 bg-white/20 mx-1" />

        {/* Theme Toggle */}
        <ThemeToggle />
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
            data-testid="mobile-logo"
          >
            <span className="text-2xl">📿</span>
            <span className={`font-cinzel font-bold text-sm tracking-wide ${scrolled ? "text-white" : "text-sacred-blue dark:text-white"}`}>
              Rosário
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

      {/* Mobile Menu Overlay */}
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
            <div className="p-4 space-y-2">
              {/* Main Navigation */}
              <p className="text-white/50 text-xs uppercase tracking-wider font-semibold px-3 pt-2">Navegação</p>
              
              <button
                onClick={() => navigateTo("/")}
                className={`flex items-center gap-3 w-full px-4 py-3 rounded-xl transition-colors ${
                  pathname === "/" ? "bg-gold-500/20 text-gold-400" : "text-white hover:bg-white/10"
                }`}
                data-testid="mobile-nav-home"
              >
                <Home className="w-5 h-5" />
                <span className="font-medium">Início</span>
              </button>

              <button
                onClick={() => scrollToSection("about")}
                className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-white hover:bg-white/10 transition-colors"
                data-testid="mobile-nav-about"
              >
                <Info className="w-5 h-5" />
                <span className="font-medium">Sobre o Rosário</span>
              </button>

              <button
                onClick={() => scrollToSection("community")}
                className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-white hover:bg-white/10 transition-colors"
                data-testid="mobile-nav-community"
              >
                <Users className="w-5 h-5" />
                <span className="font-medium">Comunidade</span>
              </button>

              {/* About Links */}
              <div className="border-t border-white/10 mt-4 pt-4">
                <p className="text-white/50 text-xs uppercase tracking-wider font-semibold px-3 mb-2">Aprenda</p>
                <div className="grid grid-cols-2 gap-2">
                  {aboutLinks.map((link) => (
                    <button
                      key={link.path}
                      onClick={() => navigateTo(link.path)}
                      className={`flex items-center gap-2 px-3 py-2.5 rounded-xl transition-colors ${
                        pathname === link.path ? "bg-gold-500/20 text-gold-400" : "text-white/80 hover:bg-white/10 hover:text-white"
                      }`}
                      data-testid={`mobile-nav-${link.path.replace("/", "")}`}
                    >
                      <link.icon className="w-4 h-4" />
                      <span className="text-sm font-medium">{link.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Auth Buttons */}
              <div className="border-t border-white/10 mt-4 pt-4 flex gap-2">
                <button
                  onClick={openLogin}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl border border-white/20 text-white hover:bg-white/10 transition-colors"
                  data-testid="mobile-nav-login"
                >
                  <LogIn className="w-4 h-4" />
                  <span className="font-medium">Entrar</span>
                </button>

                <button
                  onClick={openSignup}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-gradient-to-r from-gold-500 to-gold-600 text-sacred-blue font-semibold hover:shadow-gold-glow transition-all"
                  data-testid="mobile-nav-signup"
                >
                  <UserPlus className="w-4 h-4" />
                  <span>Cadastrar</span>
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
    </>
  );
}
