"use client";

import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/routing";
import {
  BookOpen,
  Compass,
  Globe,
  Home,
  LayoutDashboard,
  Play,
  Sparkles,
} from "lucide-react";

export function MobileNav() {
  const t = useTranslations("Navbar");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const [menuOpen, setMenuOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);

  const navigateTo = (path: string) => {
    router.push(path as any);
    setMenuOpen(false);
    setLangOpen(false);
  };

  const changeLanguage = (newLocale: string) => {
    router.replace(pathname as any, { locale: newLocale as any });
    setLangOpen(false);
  };

  const moreLinks = [
    { label: t("mysteries"), path: "/misterios-do-dia", icon: Sparkles },
    { label: t("prayers"), path: "/oracoes-tradicionais", icon: BookOpen },
    { label: t("resources"), path: "/recursos", icon: Compass },
    { label: t("about"), path: "/about", icon: Home },
  ];

  return (
    <>
      <nav className="safe-area-bottom fixed bottom-0 left-0 right-0 z-50 border-t border-white/[0.06] bg-sacred-blue/95 backdrop-blur-xl shadow-[0_-4px_20px_-5px_rgba(0,0,0,0.3)] dark:bg-slate-900/95 md:hidden">
        <div className="flex items-end justify-around px-2 pb-1.5 pt-1.5">
          <button
            onClick={() => navigateTo("/dashboard")}
            className={`flex w-14 flex-col items-center justify-center rounded-lg py-1 transition-colors ${
              pathname === "/dashboard" ? "text-gold-400" : "text-white/50"
            }`}
          >
            <LayoutDashboard className={`h-[22px] w-[22px] ${pathname === "/dashboard" ? "stroke-[2.5]" : "stroke-[1.5]"}`} />
            <span className="mt-0.5 text-[10px] font-medium leading-tight">{t("dashboard")}</span>
          </button>

          <button
            onClick={() => navigateTo("/como-rezar")}
            className={`flex w-14 flex-col items-center justify-center rounded-lg py-1 transition-colors ${
              pathname === "/como-rezar" ? "text-gold-400" : "text-white/50"
            }`}
          >
            <BookOpen className={`h-[22px] w-[22px] ${pathname === "/como-rezar" ? "stroke-[2.5]" : "stroke-[1.5]"}`} />
            <span className="mt-0.5 text-[10px] font-medium leading-tight">{t("howToPray")}</span>
          </button>

          <button onClick={() => navigateTo("/ferramentas/guia-interativo")} className="-mt-3 flex flex-col items-center justify-center group">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-gold-500 to-gold-600 shadow-gold-glow transition-transform active:scale-90">
              <Play className="ml-0.5 h-5 w-5 fill-current text-sacred-blue" />
            </div>
            <span className="mt-1 text-[10px] font-bold leading-tight text-gold-400">Rezar</span>
          </button>

          <button
            onClick={() => navigateTo("/ensinamentos")}
            className={`flex w-14 flex-col items-center justify-center rounded-lg py-1 transition-colors ${
              pathname.startsWith("/ensinamentos") ? "text-gold-400" : "text-white/50"
            }`}
          >
            <Sparkles className={`h-[22px] w-[22px] ${pathname.startsWith("/ensinamentos") ? "stroke-[2.5]" : "stroke-[1.5]"}`} />
            <span className="mt-0.5 text-[10px] font-medium leading-tight">{t("teachings")}</span>
          </button>

          <button
            onClick={() => {
              setMenuOpen((v) => !v);
              setLangOpen(false);
            }}
            className={`flex w-14 flex-col items-center justify-center rounded-lg py-1 transition-colors ${
              menuOpen ? "text-gold-400" : "text-white/50"
            }`}
          >
            <Compass className={`h-[22px] w-[22px] ${menuOpen ? "stroke-[2.5]" : "stroke-[1.5]"}`} />
            <span className="mt-0.5 text-[10px] font-medium leading-tight">{t("more")}</span>
          </button>
        </div>
      </nav>

      {menuOpen && (
        <div className="fixed inset-0 z-40 md:hidden" onClick={() => setMenuOpen(false)}>
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
          <div
            className="animate-in fade-in slide-in-from-bottom-4 absolute bottom-[72px] left-3 right-3 overflow-hidden rounded-2xl border border-white/10 bg-sacred-blue/95 p-3 shadow-2xl backdrop-blur-2xl duration-300 dark:bg-slate-900/95"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-4 mx-auto h-1 w-10 rounded-full bg-white/20" />
            <div className="space-y-1.5">
              {moreLinks.map((link) => (
                <button
                  key={link.path}
                  onClick={() => navigateTo(link.path)}
                  className={`flex w-full items-center gap-3 rounded-xl px-3 py-3 transition-colors active:bg-white/10 ${
                    pathname === link.path ? "bg-gold-500/15 text-gold-400" : "text-white hover:bg-white/5"
                  }`}
                >
                  <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${pathname === link.path ? "bg-gold-500/20" : "bg-white/5"}`}>
                    <link.icon className="h-5 w-5" />
                  </div>
                  <span className="text-left text-sm font-semibold">{link.label}</span>
                </button>
              ))}
            </div>

            <button
              onClick={() => {
                setLangOpen((v) => !v);
              }}
              className="mt-3 flex w-full items-center justify-between rounded-xl border border-white/10 bg-white/5 px-3 py-3 text-white"
            >
              <span className="inline-flex items-center gap-2 text-sm font-semibold">
                <Globe className="h-4 w-4" />
                Idioma / Language
              </span>
              <span className="text-xs font-bold uppercase">{locale}</span>
            </button>

            {langOpen && (
              <div className="mt-2 grid grid-cols-1 gap-2">
                <button
                  onClick={() => changeLanguage("pt")}
                  className={`flex items-center justify-between rounded-xl px-4 py-3 transition-all ${locale === "pt" ? "border border-gold-500/30 bg-gold-500/20 text-gold-400" : "bg-white/5 text-white"}`}
                >
                  <span className="font-semibold text-sm">🇧🇷 Português</span>
                  {locale === "pt" && <Sparkles className="h-4 w-4 fill-gold-400" />}
                </button>
                <button
                  onClick={() => changeLanguage("en")}
                  className={`flex items-center justify-between rounded-xl px-4 py-3 transition-all ${locale === "en" ? "border border-gold-500/30 bg-gold-500/20 text-gold-400" : "bg-white/5 text-white"}`}
                >
                  <span className="font-semibold text-sm">🇺🇸 English</span>
                  {locale === "en" && <Sparkles className="h-4 w-4 fill-gold-400" />}
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
