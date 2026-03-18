"use client";

import { useState } from "react";
import { usePathname, useRouter } from "@/i18n/routing";
import { 
  Home, 
  BookOpen, 
  Sparkles, 
  Play, 
  LayoutDashboard, 
  Globe,
  History,
  ScrollText,
  GraduationCap,
  Compass,
  Library
} from "lucide-react";
import { useTranslations, useLocale } from "next-intl";
import { useAuth } from "@/providers/auth-provider";
import { CheckInModal } from "./check-in-modal";

export function MobileNav() {
  const t = useTranslations("Navbar");
  const commonT = useTranslations("Common");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const { isLoggedIn } = useAuth();
  
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [checkInOpen, setCheckInOpen] = useState(false);

  const navigateTo = (path: string) => {
    router.push(path as any);
    setMobileMenuOpen(false);
    setLangOpen(false);
  };

  const changeLanguage = (newLocale: string) => {
    router.replace(pathname as any, { locale: newLocale as any });
    setLangOpen(false);
  };

  const linkGroups = [
    {
      title: t("categories.prayer"),
      links: [
        { label: t("howToPray"), icon: BookOpen, path: "/como-rezar", isPublic: true },
        { label: t("mysteries"), icon: Sparkles, path: "/misterios-do-dia", isPublic: true },
        { label: t("prayers"), icon: ScrollText, path: "/oracoes-tradicionais", isPublic: true },
      ]
    },
    {
      title: t("categories.formation"),
      links: [
        { label: t("teachings"), icon: GraduationCap, path: "/ensinamentos", isPublic: false },
        { label: t("history"), icon: History, path: "/historia", isPublic: true },
        { label: t("resources"), icon: Library, path: "/recursos", isPublic: false },
      ]
    },
    {
      title: t("categories.more"),
      links: [
        { label: t("tools"), icon: Compass, path: "/ferramentas", isPublic: false },
        { label: t("about"), icon: BookOpen, path: "/about", isPublic: true },
      ]
    }
  ];

  const explorarLinks = linkGroups.flatMap(g => g.links);
  const isOnContentPage = explorarLinks.some(link => pathname === link.path);

  return (
    <>
      {/* Mobile Bottom Tab Bar */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 md:hidden safe-area-bottom">
        <div className="bg-sacred-blue/95 dark:bg-slate-900/95 backdrop-blur-xl border-t border-white/[0.06] shadow-[0_-4px_20px_-5px_rgba(0,0,0,0.3)]">
          <div className="flex items-end justify-around px-2 pt-1.5 pb-1.5">
            <button
              onClick={() => navigateTo("/")}
              aria-label={t("home")}
              className={`flex flex-col items-center justify-center w-14 py-1 rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500/50 ${
                pathname === "/" ? "text-gold-400" : "text-white/50"
              }`}
            >
              <Home className={`w-[22px] h-[22px] ${pathname === "/" ? "stroke-[2.5]" : "stroke-[1.5]"}`} />
              <span className="text-[10px] mt-0.5 leading-tight font-medium">{t("home")}</span>
            </button>

            <button
              onClick={() => {
                setMobileMenuOpen(!mobileMenuOpen);
                setLangOpen(false);
              }}
              aria-label={t("explore")}
              aria-expanded={mobileMenuOpen}
              className={`flex flex-col items-center justify-center w-14 py-1 rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500/50 ${
                isOnContentPage || mobileMenuOpen ? "text-gold-400" : "text-white/50"
              }`}
            >
              <BookOpen className={`w-[22px] h-[22px] ${isOnContentPage || mobileMenuOpen ? "stroke-[2.5]" : "stroke-[1.5]"}`} />
              <span className="text-[10px] mt-0.5 leading-tight font-medium">{t("explore")}</span>
            </button>

            <button
              onClick={() => navigateTo("/ferramentas/guia-interativo")}
              aria-label={commonT("praying")}
              className="flex flex-col items-center justify-center -mt-3 group focus-visible:outline-none"
            >
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gold-500 to-gold-600 flex items-center justify-center shadow-gold-glow active:scale-90 transition-transform group-focus-visible:ring-2 group-focus-visible:ring-gold-500 group-focus-visible:ring-offset-2 group-focus-visible:ring-offset-sacred-blue">
                <Play className="w-5 h-5 text-sacred-blue ml-0.5 fill-current" />
              </div>
              <span className="text-[10px] text-gold-400 mt-1 leading-tight font-bold">{commonT("praying")}</span>
            </button>

            <button
              onClick={() => navigateTo("/dashboard")}
              aria-label={commonT("dashboard")}
              className={`flex flex-col items-center justify-center w-14 py-1 rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500/50 ${
                pathname === "/dashboard" ? "text-gold-400" : "text-white/50"
              }`}
            >
              <LayoutDashboard className={`w-[22px] h-[22px] ${pathname === "/dashboard" ? "stroke-[2.5]" : "stroke-[1.5]"}`} />
              <span className="text-[10px] mt-0.5 leading-tight font-medium">{commonT("dashboard")}</span>
            </button>

            <button
              onClick={() => {
                setLangOpen(!langOpen);
                setMobileMenuOpen(false);
              }}
              aria-label={locale === "pt" ? "Alterar idioma" : "Change language"}
              aria-expanded={langOpen}
              className={`flex flex-col items-center justify-center w-14 py-1 rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500/50 ${langOpen ? "text-gold-400" : "text-white/50"}`}
            >
              <Globe className={`w-[22px] h-[22px] ${langOpen ? "stroke-[2.5]" : "stroke-[1.5]"}`} />
              <span className="text-[10px] mt-0.5 leading-tight uppercase font-bold">{locale}</span>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Explorar Sheet */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 md:hidden" onClick={() => setMobileMenuOpen(false)}>
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
          <div 
            className="absolute bottom-[72px] left-3 right-3 bg-sacred-blue/95 dark:bg-slate-900/95 backdrop-blur-2xl rounded-2xl border border-white/10 shadow-2xl overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-300 p-4" 
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-10 h-1 rounded-full bg-white/20 mx-auto mb-6" />
            
            <div className="max-h-[65vh] overflow-y-auto scrollbar-hide space-y-6 pb-2">
              {linkGroups.map((group, groupIdx) => (
                <div key={groupIdx} className="space-y-3">
                  <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-gold-500/60 px-1">
                    {group.title}
                  </h4>
                  <div className="grid grid-cols-2 gap-2">
                    {group.links.map((link) => (
                      <button
                        key={link.path}
                        onClick={() => navigateTo(link.path)}
                        className={`flex flex-col items-start gap-2.5 p-3 rounded-xl transition-all active:scale-[0.97] ${
                          pathname === link.path 
                            ? "bg-gold-500/15 text-gold-400 border border-gold-500/20" 
                            : "bg-white/5 text-white border border-transparent"
                        }`}
                      >
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                          pathname === link.path ? "bg-gold-500/20" : "bg-white/10"
                        }`}>
                          <link.icon className="w-4 h-4" />
                        </div>
                        <div className="text-left w-full">
                          <div className="flex items-center gap-1.5 flex-wrap">
                            <span className="font-bold text-[13px] leading-tight">{link.label}</span>
                            {!link.isPublic && (
                              <div className="w-1.5 h-1.5 rounded-full bg-gold-500 shadow-[0_0_8px_rgba(212,175,55,0.6)]" title={commonT("members")} />
                            )}
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Mobile Language Sheet */}
      {langOpen && (
        <div className="fixed inset-0 z-40 md:hidden" onClick={() => setLangOpen(false)}>
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
          <div 
            className="absolute bottom-[72px] left-3 right-3 bg-sacred-blue/95 dark:bg-slate-900/95 backdrop-blur-2xl rounded-2xl border border-white/10 shadow-2xl overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-300 p-5" 
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-white font-cinzel font-bold mb-5 text-center text-lg">Idioma / Language</h3>
            <div className="grid grid-cols-1 gap-3">
              <button
                onClick={() => changeLanguage("pt")}
                className={`flex items-center justify-between px-5 py-4 rounded-xl transition-all active:scale-[0.98] ${locale === 'pt' ? "bg-gold-500/20 text-gold-400 border border-gold-500/30" : "bg-white/5 text-white"}`}
              >
                <div className="flex items-center gap-4">
                  <span className="text-3xl">🇧🇷</span>
                  <div className="flex flex-col items-start text-left">
                    <span className="font-bold text-sm">Português</span>
                    <span className="text-[10px] opacity-50 uppercase tracking-widest">Brasil</span>
                  </div>
                </div>
                {locale === 'pt' && <Sparkles className="w-5 h-5 fill-gold-400" />}
              </button>
              <button
                onClick={() => changeLanguage("en")}
                className={`flex items-center justify-between px-5 py-4 rounded-xl transition-all active:scale-[0.98] ${locale === 'en' ? "bg-gold-500/20 text-gold-400 border border-gold-500/30" : "bg-white/5 text-white"}`}
              >
                <div className="flex items-center gap-4">
                  <span className="text-3xl">🇺🇸</span>
                  <div className="flex flex-col items-start text-left">
                    <span className="font-bold text-sm">English</span>
                    <span className="text-[10px] opacity-50 uppercase tracking-widest">United States</span>
                  </div>
                </div>
                {locale === 'en' && <Sparkles className="w-5 h-5 fill-gold-400" />}
              </button>
            </div>
          </div>
        </div>
      )}

      <CheckInModal open={checkInOpen} onOpenChange={setCheckInOpen} />
    </>
  );
}
