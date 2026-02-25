"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "@/i18n/routing";
import { BookOpen, History, Sparkles, ScrollText, Menu, X, Globe, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "@/providers/theme-provider";
import { useAuth, AUTH_DISABLED } from "@/providers/auth-provider";
import { useTranslations, useLocale } from "next-intl";
import { useRef } from "react";

export function PublicHeader() {
  const pathname = usePathname();
  const locale = useLocale();
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();
  const { openAuthModal } = useAuth();
  const t = useTranslations("PublicHeader");
  const navT = useTranslations("Navbar");
  const langRef = useRef<HTMLDivElement>(null);

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

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(event.target as Node)) {
        setLangOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const changeLanguage = (newLocale: string) => {
    router.replace(pathname as any, { locale: newLocale as any });
    setLangOpen(false);
  };

  const openSignup = () => {
    openAuthModal("signup");
    setMobileMenuOpen(false);
  };

  const openLogin = () => {
    openAuthModal("login");
    setMobileMenuOpen(false);
  };

  const navigateTo = (path: string) => {
    router.push(path as any);
    setMobileMenuOpen(false);
  };

  const navLinks = [
    { label: navT("howToPray"), icon: BookOpen, path: "/como-rezar" },
    { label: navT("history"), icon: History, path: "/historia" },
    { label: navT("mysteries"), icon: Sparkles, path: "/misterios-do-dia" },
    { label: navT("prayers"), icon: ScrollText, path: "/oracoes-tradicionais" },
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
              {/* Language Switcher */}
              <div className="relative" ref={langRef}>
                <button
                  onClick={() => setLangOpen(!langOpen)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border transition-all duration-300 ${
                    langOpen 
                      ? "bg-gold-500/10 border-gold-500/30 text-gold-600 dark:text-gold-400" 
                      : "border-transparent text-muted-foreground hover:text-foreground hover:bg-muted/50"
                  }`}
                  aria-label="Change language"
                >
                  <Globe className="w-4 h-4" />
                  <span className="text-xs font-bold uppercase">{locale}</span>
                  <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${langOpen ? "rotate-180" : ""}`} />
                </button>

                {langOpen && (
                  <div className="absolute top-full mt-2 right-0 w-40 bg-sacred-cream dark:bg-slate-900 rounded-xl border border-gold-500/10 shadow-xl overflow-hidden p-1 z-[60] animate-in fade-in slide-in-from-top-2">
                    <button
                      onClick={() => changeLanguage("pt")}
                      className={`flex items-center gap-2 w-full px-3 py-2.5 rounded-lg text-xs font-medium transition-colors ${locale === 'pt' ? "bg-gold-500/10 text-gold-600 dark:text-gold-400" : "text-muted-foreground hover:text-foreground hover:bg-muted/50"}`}
                    >
                      <span className="text-base">🇧🇷</span> Português
                    </button>
                    <button
                      onClick={() => changeLanguage("en")}
                      className={`flex items-center gap-2 w-full px-3 py-2.5 rounded-lg text-xs font-medium transition-colors ${locale === 'en' ? "bg-gold-500/10 text-gold-600 dark:text-gold-400" : "text-muted-foreground hover:text-foreground hover:bg-muted/50"}`}
                    >
                      <span className="text-base">🇺🇸</span> English
                    </button>
                  </div>
                )}
              </div>

              <button
                onClick={toggleTheme}
                className="w-9 h-9 rounded-full glass sacred-border flex items-center justify-center hover:shadow-gold-glow transition-all duration-300"
                aria-label={t("theme")}
                data-testid="theme-toggle"
              >
                <Sun className="h-4 w-4 rotate-0 scale-100 text-gold-600 transition-transform duration-300 dark:-rotate-90 dark:scale-0" />
                <Moon className="absolute h-4 w-4 rotate-90 scale-0 text-gold-400 transition-transform duration-300 dark:rotate-0 dark:scale-100" />
              </button>

              {AUTH_DISABLED ? (
                <Button
                  size="sm"
                  onClick={() => navigateTo("/dashboard")}
                  className="rounded-full bg-gradient-to-r from-gold-500 to-gold-600 text-sacred-blue hover:shadow-gold-glow font-cinzel font-semibold"
                  data-testid="header-dashboard"
                >
                  {t("accessNow")}
                </Button>
              ) : (
                <>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={openLogin}
                    className="rounded-full border-gold-500/20 hover:border-gold-500/40 hover:bg-gold-500/5"
                    data-testid="header-login"
                  >
                    {t("login")}
                  </Button>

                  <Button
                    size="sm"
                    onClick={openSignup}
                    className="rounded-full bg-gradient-to-r from-gold-500 to-gold-600 text-sacred-blue hover:shadow-gold-glow font-cinzel font-semibold"
                    data-testid="header-signup"
                  >
                    {t("start")}
                  </Button>
                </>
              )}
            </div>

            {/* Mobile Actions */}
            <div className="flex md:hidden items-center gap-2">
              <button
                onClick={toggleTheme}
                className="w-9 h-9 rounded-full glass sacred-border flex items-center justify-center"
                aria-label={t("theme")}
              >
                <Sun className="h-4 w-4 rotate-0 scale-100 text-gold-600 transition-transform duration-300 dark:-rotate-90 dark:scale-0" />
                <Moon className="absolute h-4 w-4 rotate-90 scale-0 text-gold-400 transition-transform duration-300 dark:rotate-0 dark:scale-100" />
              </button>
            </div>
          </div>
        </nav>
      </header>

      {/* Spacer to prevent content from going under fixed header */}
      <div className="h-16 sm:h-20" />

    </>
  );
}
