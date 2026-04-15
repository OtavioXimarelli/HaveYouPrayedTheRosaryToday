"use client";

import { useRouter } from "@/i18n/routing";
import { HeroSection } from "@/components/hero-section";
import { PageTransition } from "@/components/page-transition";
import {
  ArrowRight,
  BookOpen,
  Calendar,
  Compass,
  Heart,
  History,
  ScrollText,
  Shield,
  Sparkles,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/providers/auth-provider";
import { useTranslations } from "next-intl";

export default function HomePage() {
  const router = useRouter();
  const { openAuthModal } = useAuth();
  const t = useTranslations("Landing");

  const openSignup = () => openAuthModal("signup");

  return (
    <PageTransition>
      <main className="min-h-screen bg-background">
        <HeroSection />

        <section className="px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <div className="mx-auto max-w-5xl rounded-3xl border border-gold-500/20 bg-gradient-to-br from-gold-500/10 to-transparent p-8 sm:p-10">
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-gold-600 dark:text-gold-400">
              {t("mission.badge")}
            </p>
            <h2 className="mb-4 text-3xl font-cinzel font-bold text-foreground sm:text-4xl">
              {t("mission.title")}
            </h2>
            <p className="text-base leading-relaxed text-muted-foreground sm:text-lg">
              {t("mission.description")}
            </p>
          </div>
        </section>

        <section className="border-y border-gold-500/10 bg-gradient-to-br from-gold-500/5 via-background to-background px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <div className="mx-auto max-w-7xl">
            <div className="mb-12 text-center">
              <h2 className="mb-4 text-3xl font-cinzel font-bold text-foreground sm:text-4xl md:text-5xl">
                {t("start.title")}
              </h2>
              <p className="text-lg text-muted-foreground">{t("start.subtitle")}</p>
            </div>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              <button
                type="button"
                className="group rounded-3xl border border-gold-500/20 bg-card p-8 text-left transition-all duration-300 hover:-translate-y-1 hover:shadow-gold-glow"
                onClick={() => router.push("/como-rezar")}
                aria-label={t("start.path1.btn")}
                data-testid="start-pray-now"
              >
                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-gold-500 to-gold-600 shadow-lg">
                  <Calendar className="h-8 w-8 text-white" />
                </div>
                <h3 className="mb-2 text-2xl font-cinzel font-bold text-foreground">{t("start.path1.title")}</h3>
                <p className="mb-4 text-sm leading-relaxed text-muted-foreground">{t("start.path1.desc")}</p>
                <span className="inline-flex items-center gap-2 text-sm font-semibold text-gold-600 transition-all group-hover:gap-3 dark:text-gold-400">
                  {t("start.path1.btn")}
                  <ArrowRight className="h-4 w-4" />
                </span>
              </button>

              <button
                type="button"
                className="group rounded-3xl border border-gold-500/20 bg-card p-8 text-left transition-all duration-300 hover:-translate-y-1 hover:shadow-gold-glow"
                onClick={() => router.push("/ensinamentos")}
                aria-label={t("start.path2.btn")}
                data-testid="start-learn-path"
              >
                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 to-emerald-600 shadow-lg">
                  <BookOpen className="h-8 w-8 text-white" />
                </div>
                <h3 className="mb-2 text-2xl font-cinzel font-bold text-foreground">{t("start.path2.title")}</h3>
                <p className="mb-4 text-sm leading-relaxed text-muted-foreground">{t("start.path2.desc")}</p>
                <span className="inline-flex items-center gap-2 text-sm font-semibold text-gold-600 transition-all group-hover:gap-3 dark:text-gold-400">
                  {t("start.path2.btn")}
                  <ArrowRight className="h-4 w-4" />
                </span>
              </button>

              <button
                type="button"
                className="group relative rounded-3xl border border-gold-500/30 bg-gradient-to-br from-gold-500/10 to-gold-600/5 p-8 text-left transition-all duration-300 hover:-translate-y-1"
                onClick={openSignup}
                aria-label={t("start.path3.btn")}
                data-testid="start-track-path"
              >
                <div className="absolute -right-3 -top-3 inline-flex items-center gap-1 rounded-full bg-gold-500 px-3 py-1 text-xs font-cinzel font-bold text-sacred-blue">
                  ⭐ {t("start.path3.badge")}
                </div>
                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-gold-500 to-gold-600 shadow-lg">
                  <Heart className="h-8 w-8 text-white" />
                </div>
                <h3 className="mb-2 text-2xl font-cinzel font-bold text-foreground">{t("start.path3.title")}</h3>
                <p className="mb-5 text-sm leading-relaxed text-muted-foreground">{t("start.path3.desc")}</p>
                <span className="inline-flex items-center rounded-full bg-gradient-to-r from-gold-500 to-gold-600 px-6 py-2 text-sm font-cinzel font-bold text-sacred-blue transition-all">
                  {t("start.path3.btn")}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </span>
              </button>
            </div>
          </div>
        </section>

        <section className="px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <div className="mx-auto max-w-7xl">
            <div className="mb-12 text-center">
              <h2 className="mb-4 text-3xl font-cinzel font-bold text-foreground sm:text-4xl md:text-5xl">
                {t("soul.title")}
              </h2>
              <p className="mx-auto max-w-3xl text-lg text-muted-foreground">{t("soul.subtitle")}</p>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {[
                { icon: Shield, title: t("soul.items.0.title"), desc: t("soul.items.0.desc") },
                { icon: Users, title: t("soul.items.1.title"), desc: t("soul.items.1.desc") },
                { icon: Sparkles, title: t("soul.items.2.title"), desc: t("soul.items.2.desc") },
              ].map((item, index) => (
                <article
                  key={index}
                  className="rounded-2xl border border-gold-500/15 bg-card p-6 transition-colors hover:border-gold-500/30"
                >
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-gold-500/20 to-gold-600/20">
                    <item.icon className="h-6 w-6 text-gold-600 dark:text-gold-400" />
                  </div>
                  <h3 className="mb-2 text-xl font-cinzel font-bold text-foreground">{item.title}</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">{item.desc}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-muted/40 px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <div className="mx-auto max-w-7xl">
            <div className="mb-10 text-center">
              <h2 className="mb-4 text-3xl font-cinzel font-bold text-foreground sm:text-4xl">
                {t("rhythm.title")}
              </h2>
              <p className="text-lg text-muted-foreground">{t("rhythm.subtitle")}</p>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {[
                { icon: BookOpen, label: t("rhythm.steps.0.title"), desc: t("rhythm.steps.0.desc"), path: "/como-rezar" },
                { icon: Compass, label: t("rhythm.steps.1.title"), desc: t("rhythm.steps.1.desc"), path: "/ferramentas/guia-interativo" },
                { icon: History, label: t("rhythm.steps.2.title"), desc: t("rhythm.steps.2.desc"), path: "/dashboard" },
              ].map((step, index) => (
                <button
                  key={index}
                  onClick={() => router.push(step.path as any)}
                  className="group rounded-2xl border border-border bg-background p-6 text-left transition-all hover:-translate-y-1 hover:border-gold-500/30"
                >
                  <step.icon className="mb-4 h-8 w-8 text-gold-600 dark:text-gold-400" />
                  <h3 className="mb-2 text-xl font-cinzel font-bold text-foreground">{step.label}</h3>
                  <p className="mb-4 text-sm text-muted-foreground">{step.desc}</p>
                  <span className="inline-flex items-center gap-2 text-sm font-semibold text-gold-600 dark:text-gold-400">
                    {t("rhythm.action")}
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </button>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-gradient-to-br from-sacred-blue via-slate-800 to-slate-900 px-4 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <div className="mb-6 text-5xl">📿</div>
            <h2 className="mb-4 text-3xl font-cinzel font-bold text-white sm:text-4xl md:text-5xl">{t("cta.title")}</h2>
            <p className="mx-auto mb-10 max-w-2xl text-lg text-white/80">{t("cta.desc")}</p>
            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <Button
                size="lg"
                onClick={() => router.push("/como-rezar")}
                data-testid="cta-pray-now"
                className="rounded-full border-2 border-gold-400/50 bg-gradient-to-r from-gold-500 to-gold-600 px-10 py-7 font-cinzel text-lg font-bold tracking-wide text-sacred-blue transition-all duration-300 hover:shadow-gold-glow-lg"
              >
                {t("cta.primaryBtn")}
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => router.push("/dashboard")}
                data-testid="cta-dashboard"
                className="rounded-full border-2 border-white/20 bg-white/5 px-10 py-7 text-lg font-semibold text-white transition-all hover:border-white/40 hover:bg-white/10"
              >
                {t("cta.secondaryBtn")}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
        </section>

        <footer className="relative overflow-hidden border-t border-gold-500/15 bg-slate-950 px-4 py-16 text-white sm:px-6 lg:px-8">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(212,175,55,0.12)_0%,transparent_55%)]" />
          <div className="relative mx-auto flex max-w-3xl flex-col items-center text-center">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-gold-500 to-gold-600 shadow-lg shadow-gold-500/20">
              <span className="text-3xl">📿</span>
            </div>
            <h3 className="mb-3 text-2xl font-cinzel font-bold text-white">Rosário Vivo</h3>
            <p className="mb-8 max-w-2xl leading-relaxed text-slate-300">{t("footer.desc")}</p>

            <div className="w-full border-t border-slate-800/90 pt-6">
              <p className="mb-2 text-sm text-slate-400">{t("footer.credits", { year: new Date().getFullYear() })}</p>
              <p className="text-sm italic text-slate-500">{t("footer.quote")}</p>
            </div>
          </div>
        </footer>
      </main>
    </PageTransition>
  );
}
