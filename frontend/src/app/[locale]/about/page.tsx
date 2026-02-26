"use client";

import { PageHeader } from "@/components/page-header";
import { PageTransition } from "@/components/page-transition";
import { Heart, Users, BookOpen, Sparkles, Shield, Zap } from "lucide-react";
import { useTranslations } from "next-intl";

export default function AboutPage() {
  const t = useTranslations("About");

  const principles = [
    {
      icon: Heart,
      title: t("principles.p1.title"),
      description: t("principles.p1.desc"),
      color: "rose"
    },
    {
      icon: Users,
      title: t("principles.p2.title"),
      description: t("principles.p2.desc"),
      color: "blue"
    },
    {
      icon: BookOpen,
      title: t("principles.p3.title"),
      description: t("principles.p3.desc"),
      color: "amber"
    },
    {
      icon: Sparkles,
      title: t("principles.p4.title"),
      description: t("principles.p4.desc"),
      color: "yellow"
    },
    {
      icon: Shield,
      title: t("principles.p5.title"),
      description: t("principles.p5.desc"),
      color: "indigo"
    },
    {
      icon: Zap,
      title: t("principles.p6.title"),
      description: t("principles.p6.desc"),
      color: "purple"
    }
  ];

  const timeline = [
    {
      year: t("journey.j1.year"),
      title: t("journey.j1.title"),
      description: t("journey.j1.desc")
    },
    {
      year: t("journey.j2.year"),
      title: t("journey.j2.title"),
      description: t("journey.j2.desc")
    },
    {
      year: t("journey.j3.year"),
      title: t("journey.j3.title"),
      description: t("journey.j3.desc")
    }
  ];

  return (
    <PageTransition>
      <PageHeader
        title={t("title")}
        subtitle={t("subtitle")}
        icon="ℹ️"
      />

      <main className="min-h-screen bg-sacred-cream dark:bg-gradient-to-b dark:from-slate-950 dark:via-sacred-blue dark:to-slate-950">
        {/* Mission Section */}
        <section className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="mb-12">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-cinzel font-bold text-gold-500 dark:text-gold-400 mb-6">
                {t("mission.title")}
              </h2>
              <p className="text-lg sm:text-xl text-slate-700 dark:text-slate-300 leading-relaxed mb-6 font-manrope">
                {t("mission.p1")}
              </p>
              <p className="text-lg sm:text-xl text-slate-700 dark:text-slate-300 leading-relaxed font-manrope">
                {t("mission.p2")}
              </p>
            </div>

            {/* Vision */}
            <div className="glass rounded-xl p-8 sm:p-10 border border-gold-500/30 dark:border-gold-400/20 bg-gradient-to-br from-gold-50 dark:from-gold-500/5 to-transparent">
              <h3 className="text-2xl font-cinzel font-bold text-sacred-blue dark:text-white mb-4">{t("mission.visionTitle")}</h3>
              <p className="text-slate-700 dark:text-slate-300 text-lg leading-relaxed font-manrope">
                {t("mission.visionDesc")}
              </p>
            </div>
          </div>
        </section>

        {/* Principles Grid */}
        <section className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-transparent via-gold-500/5 dark:via-gold-500/10 to-transparent">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-cinzel font-bold text-gold-500 dark:text-gold-400 mb-4 text-center">
              {t("principles.title")}
            </h2>
            <p className="text-center text-slate-600 dark:text-slate-400 mb-12 font-manrope max-w-2xl mx-auto">
              {t("principles.subtitle")}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {principles.map((principle, idx) => {
                const Icon = principle.icon;
                const colorClasses: Record<string, string> = {
                  rose: "from-rose-500/10 dark:from-rose-500/20 border-rose-500/30 dark:border-rose-400/20",
                  blue: "from-blue-500/10 dark:from-blue-500/20 border-blue-500/30 dark:border-blue-400/20",
                  amber: "from-amber-500/10 dark:from-amber-500/20 border-amber-500/30 dark:border-amber-400/20",
                  yellow: "from-yellow-500/10 dark:from-yellow-500/20 border-yellow-500/30 dark:border-yellow-400/20",
                  indigo: "from-indigo-500/10 dark:from-indigo-500/20 border-indigo-500/30 dark:border-indigo-400/20",
                  purple: "from-purple-500/10 dark:from-purple-500/20 border-purple-500/30 dark:border-purple-400/20"
                };

                return (
                  <div
                    key={idx}
                    className={`glass rounded-lg p-6 sm:p-8 border bg-gradient-to-br ${colorClasses[principle.color]} hover:shadow-lg transition-all duration-300`}
                  >
                    <Icon className="w-10 h-10 sm:w-12 sm:h-12 text-gold-500 dark:text-gold-400 mb-4" />
                    <h3 className="text-xl font-cinzel font-bold text-sacred-blue dark:text-white mb-3">
                      {principle.title}
                    </h3>
                    <p className="text-slate-600 dark:text-slate-300 leading-relaxed font-manrope">
                      {principle.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* What We Offer */}
        <section className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-cinzel font-bold text-gold-500 dark:text-gold-400 mb-12 text-center">
              {t("offer.title")}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Rastrear */}
              <div className="glass rounded-lg p-8 border border-gold-500/30 dark:border-gold-400/20">
                <div className="text-4xl mb-4">📿</div>
                <h3 className="text-2xl font-cinzel font-bold text-sacred-blue dark:text-white mb-3">{t("offer.track.title")}</h3>
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed font-manrope">
                  {t("offer.track.desc")}
                </p>
              </div>

              {/* Aprender */}
              <div className="glass rounded-lg p-8 border border-gold-500/30 dark:border-gold-400/20">
                <div className="text-4xl mb-4">📚</div>
                <h3 className="text-2xl font-cinzel font-bold text-sacred-blue dark:text-white mb-3">{t("offer.explore.title")}</h3>
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed font-manrope">
                  {t("offer.explore.desc")}
                </p>
              </div>

              {/* Rezar */}
              <div className="glass rounded-lg p-8 border border-gold-500/30 dark:border-gold-400/20">
                <div className="text-4xl mb-4">✝️</div>
                <h3 className="text-2xl font-cinzel font-bold text-sacred-blue dark:text-white mb-3">{t("offer.pray.title")}</h3>
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed font-manrope">
                  {t("offer.pray.desc")}
                </p>
              </div>

              {/* Conectar */}
              <div className="glass rounded-lg p-8 border border-gold-500/30 dark:border-gold-400/20">
                <div className="text-4xl mb-4">🌍</div>
                <h3 className="text-2xl font-cinzel font-bold text-sacred-blue dark:text-white mb-3">{t("offer.connect.title")}</h3>
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed font-manrope">
                  {t("offer.connect.desc")}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Journey Timeline */}
        <section className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-transparent via-sacred-blue/5 dark:via-sacred-blue/20 to-transparent">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-cinzel font-bold text-gold-500 dark:text-gold-400 mb-12 text-center">
              {t("journey.title")}
            </h2>

            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-gold-500 via-gold-400 to-gold-300 dark:from-gold-400 dark:via-gold-300 dark:to-gold-500 rounded-full" />

              <div className="space-y-12">
                {timeline.map((item, idx) => (
                  <div key={idx} className={`flex ${idx % 2 === 0 ? "flex-row" : "flex-row-reverse"}`}>
                    {/* Content */}
                    <div className={`w-1/2 ${idx % 2 === 0 ? "pr-12" : "pl-12"}`}>
                      <div className="glass rounded-lg p-6 border border-gold-500/30 dark:border-gold-400/20 bg-gradient-to-br from-gold-50 dark:from-gold-500/5 to-transparent">
                        <div className="text-lg font-cinzel font-bold text-gold-500 dark:text-gold-400 mb-2">
                          {item.year}
                        </div>
                        <h3 className="text-xl font-cinzel font-bold text-sacred-blue dark:text-white mb-2">
                          {item.title}
                        </h3>
                        <p className="text-slate-700 dark:text-slate-300 leading-relaxed font-manrope">
                          {item.description}
                        </p>
                      </div>
                    </div>

                    {/* Timeline dot */}
                    <div className="w-0 flex justify-center">
                      <div className="w-6 h-6 rounded-full bg-gold-500 dark:bg-gold-400 border-4 border-sacred-cream dark:border-slate-950 shadow-lg" />
                    </div>

                    {/* Empty space */}
                    <div className="w-1/2" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Core Values */}
        <section className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-cinzel font-bold text-gold-500 dark:text-gold-400 mb-12 text-center">
              {t("different.title")}
            </h2>

            <div className="space-y-6">
              <div className="flex gap-4 sm:gap-6">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-full bg-gold-500/20 dark:bg-gold-400/20 flex items-center justify-center">
                    <span className="text-2xl">✝</span>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-cinzel font-bold text-sacred-blue dark:text-white mb-2">
                    {t("different.d1.title")}
                  </h3>
                  <p className="text-slate-700 dark:text-slate-300 font-manrope">
                    {t("different.d1.desc")}
                  </p>
                </div>
              </div>

              <div className="flex gap-4 sm:gap-6">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-full bg-gold-500/20 dark:bg-gold-400/20 flex items-center justify-center">
                    <span className="text-2xl">🌱</span>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-cinzel font-bold text-sacred-blue dark:text-white mb-2">
                    {t("different.d2.title")}
                  </h3>
                  <p className="text-slate-700 dark:text-slate-300 font-manrope">
                    {t("different.d2.desc")}
                  </p>
                </div>
              </div>

              <div className="flex gap-4 sm:gap-6">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-full bg-gold-500/20 dark:bg-gold-400/20 flex items-center justify-center">
                    <span className="text-2xl">💝</span>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-cinzel font-bold text-sacred-blue dark:text-white mb-2">
                    {t("different.d3.title")}
                  </h3>
                  <p className="text-slate-700 dark:text-slate-300 font-manrope">
                    {t("different.d3.desc")}
                  </p>
                </div>
              </div>

              <div className="flex gap-4 sm:gap-6">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-full bg-gold-500/20 dark:bg-gold-400/20 flex items-center justify-center">
                    <span className="text-2xl">🔐</span>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-cinzel font-bold text-sacred-blue dark:text-white mb-2">
                    {t("different.d4.title")}
                  </h3>
                  <p className="text-slate-700 dark:text-slate-300 font-manrope">
                    {t("different.d4.desc")}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-cinzel font-bold text-gold-500 dark:text-gold-400 mb-4 text-center">
              {t("faq.title")}
            </h2>
            <p className="text-center text-slate-600 dark:text-slate-400 mb-12 font-manrope max-w-2xl mx-auto">
              {t("faq.subtitle")}
            </p>

            <div className="space-y-6">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
                <div key={i} className="glass rounded-lg p-6 sm:p-8 border border-gold-500/30 dark:border-gold-400/20">
                  <h3 className="text-lg sm:text-xl font-cinzel font-bold text-sacred-blue dark:text-white mb-3 flex items-start gap-3">
                    <span className="text-gold-500 dark:text-gold-400 flex-shrink-0">❓</span>
                    {t(`faq.q${i}.q`)}
                  </h3>
                  <p className="text-slate-700 dark:text-slate-300 leading-relaxed font-manrope whitespace-pre-line">
                    {t(`faq.q${i}.a`)}
                  </p>
                  {i === 6 && (
                    <a
                      href="https://github.com/OtavioXimarelli/HaveYouPrayedTheRosaryToday"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-6 py-3 mt-4 bg-gradient-to-r from-gold-500/20 to-gold-600/20 border border-gold-500/40 dark:border-gold-400/30 text-gold-700 dark:text-gold-300 font-cinzel font-bold rounded-lg hover:shadow-lg hover:shadow-gold-500/20 transition-all duration-300"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                      </svg>
                      <span>{t("faq.q6.github")}</span>
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-gold-500/10 via-sacred-blue/10 dark:from-gold-500/20 dark:via-sacred-blue/20 to-transparent">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-cinzel font-bold text-sacred-blue dark:text-white mb-6">
              {t("cta.title")}
            </h2>
            <p className="text-lg sm:text-xl text-slate-700 dark:text-slate-300 mb-8 font-manrope max-w-2xl mx-auto">
              {t("cta.desc")}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/como-rezar"
                className="px-8 py-4 bg-gradient-to-r from-gold-500 to-gold-600 text-sacred-blue font-cinzel font-bold rounded-full hover:shadow-lg hover:shadow-gold-500/30 transition-all duration-300 border-2 border-gold-400/50"
              >
                {t("cta.btn1")}
              </a>
              <a
                href="/ensinamentos"
                className="px-8 py-4 glass border border-gold-500/50 dark:border-gold-400/30 text-sacred-blue dark:text-white font-cinzel font-bold rounded-full hover:shadow-lg transition-all duration-300"
              >
                {t("cta.btn2")}
              </a>
            </div>
          </div>
        </section>
      </main>
    </PageTransition>
  );
}
