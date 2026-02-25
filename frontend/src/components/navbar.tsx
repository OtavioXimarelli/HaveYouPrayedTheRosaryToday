"use client";

import { useState, useEffect, useRef } from "react";
import { usePathname, useRouter } from "@/i18n/routing";
import { 
  Home, 
  BookOpen, 
  History, 
  Sparkles, 
  ScrollText, 
  ChevronDown, 
  Play, 
  LayoutDashboard, 
  GraduationCap, 
  Compass, 
  Library
} from "lucide-react";
import { ComingSoonModal } from "./coming-soon-modal";
import { CheckInModal } from "./check-in-modal";
import { useAuth } from "@/providers/auth-provider";
import { useTranslations, useLocale } from "next-intl";

export function Navbar() {
  const t = useTranslations("Navbar");
  const commonT = useTranslations("Common");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const { isLoggedIn } = useAuth();
  
  const [checkInOpen, setCheckInOpen] = useState(false);
  const [comingSoonModalOpen, setComingSoonModalOpen] = useState(false);
  const [comingSoonFeature, setComingSoonFeature] = useState("");
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

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (explorarRef.current && !explorarRef.current.contains(event.target as Node)) {
        setExplorarOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const navigateTo = (path: string) => {
    router.push(path as any);
    setExplorarOpen(false);
  };

  const explorarLinks = [
    { label: t("howToPray"), description: t("description.howToPray"), icon: BookOpen, path: "/como-rezar", isPublic: true },
    { label: t("history"), description: t("description.history"), icon: History, path: "/historia", isPublic: true },
    { label: t("mysteries"), description: t("description.mysteries"), icon: Sparkles, path: "/misterios-do-dia", isPublic: true },
    { label: t("prayers"), description: t("description.prayers"), icon: ScrollText, path: "/oracoes-tradicionais", isPublic: true },
    { label: t("teachings"), description: t("description.teachings"), icon: GraduationCap, path: "/ensinamentos", isPublic: false },
    { label: t("tools"), description: t("description.tools"), icon: Compass, path: "/ferramentas", isPublic: false },
    { label: t("about"), description: t("description.about"), icon: BookOpen, path: "/about", isPublic: true },
    { label: t("resources"), description: t("description.resources"), icon: Library, path: "/recursos", isPublic: false },
  ];

  const isOnContentPage = explorarLinks.some(link => pathname === link.path);

  return (
    <>
      {/* Desktop Floating Navbar */}
      <nav 
        className={`fixed bottom-4 md:bottom-6 left-1/2 -translate-x-1/2 z-50 hidden md:flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-2 sm:py-2.5 rounded-full transition-all duration-500 max-w-[calc(100vw-1.5rem)] ${
          scrolled 
            ? "bg-sacred-blue/95 dark:bg-slate-900/95 backdrop-blur-xl shadow-2xl border border-white/10" 
            : "bg-sacred-blue/90 dark:bg-slate-900/90 backdrop-blur-lg shadow-xl border border-white/5"
        }`}
        data-testid="navbar-desktop"
      >
        {/* Home */}
        <button
          onClick={() => navigateTo("/")}
          className={`flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full transition-colors ${
            pathname === "/" ? "bg-white/10" : "hover:bg-white/10"
          }`}
        >
          <span className="text-lg">📿</span>
          <span className="text-white font-medium text-xs sm:text-sm">{t("home")}</span>
        </button>

        <div className="w-px h-6 bg-white/10" />

        {/* Explorar Dropdown */}
        <div className="relative" ref={explorarRef}>
          <button
            onClick={() => setExplorarOpen(!explorarOpen)}
            className={`flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full transition-colors ${
              isOnContentPage || explorarOpen
                ? "bg-gold-500/20 text-gold-400" 
                : "text-white/80 hover:text-white hover:bg-white/10"
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span className="text-xs sm:text-sm font-medium">{t("explore")}</span>
            <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${explorarOpen ? "rotate-180" : ""}`} />
          </button>

          {explorarOpen && (
            <div className="absolute bottom-full mb-3 left-1/2 -translate-x-1/2 w-72 bg-sacred-blue dark:bg-slate-900 rounded-2xl border border-white/10 shadow-2xl overflow-hidden p-2">
              <div className="max-h-[60vh] overflow-y-auto scrollbar-hide">
                {explorarLinks.map((link) => (
                  <button
                    key={link.path}
                    onClick={() => navigateTo(link.path)}
                    className={`flex items-start gap-3 w-full px-4 py-3 rounded-xl transition-colors text-left ${
                      pathname === link.path 
                        ? "bg-gold-500/20 text-gold-400" 
                        : "text-white hover:bg-white/10"
                    }`}
                  >
                    <link.icon className="w-5 h-5 mt-0.5 flex-shrink-0" />
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-medium block text-sm">{link.label}</span>
                        {!link.isPublic && (
                          <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-gold-500/20 text-gold-300 font-semibold">
                            {commonT("members")}
                          </span>
                        )}
                      </div>
                      <span className="text-[11px] text-white/50">{link.description}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="w-px h-6 bg-white/10" />

        {/* Dashboard */}
        <button
          onClick={() => navigateTo("/dashboard")}
          className={`flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full transition-colors ${
            pathname === "/dashboard" ? "bg-gold-500/20 text-gold-400" : "text-white/80 hover:text-white hover:bg-white/10"
          }`}
        >
          <LayoutDashboard className="w-4 h-4" />
          <span className="text-xs sm:text-sm font-medium">{t("dashboard")}</span>
        </button>

        <div className="w-px h-6 bg-white/10" />

        {/* Rezar CTA */}
        <button
          onClick={() => setCheckInOpen(true)}
          className="relative flex items-center gap-2 px-4 sm:px-5 py-1.5 sm:py-2 rounded-full bg-gradient-to-r from-gold-500 to-gold-600 text-sacred-blue font-cinzel font-bold text-xs sm:text-sm tracking-wide hover:shadow-[0_0_20px_-5px_rgba(212,175,55,0.5)] transition-all"
        >
          <Play className="w-4 h-4" />
          <span>{t("start")}</span>
        </button>
      </nav>

      <CheckInModal open={checkInOpen} onOpenChange={setCheckInOpen} />
      <ComingSoonModal isOpen={comingSoonModalOpen} onClose={() => setComingSoonModalOpen(false)} featureName={comingSoonFeature} />
    </>
  );
}
