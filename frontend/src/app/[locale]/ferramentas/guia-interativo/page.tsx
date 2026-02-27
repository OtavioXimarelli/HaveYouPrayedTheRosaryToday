"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { useRouter } from "@/i18n/routing";
import { PageHeader } from "@/components/page-header";
import { PageTransition } from "@/components/page-transition";
import { BreadcrumbNav } from "@/components/learning/breadcrumb-nav";
import { Button } from "@/components/ui/button";
import { ArrowRight, ArrowLeft, RefreshCw, CheckCircle2, Smartphone, Monitor, BookOpen, Heart, ChevronRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import { getTodaysMystery, MysteryType } from "@/types";
import { usePrayerStore } from "@/stores/prayer-store";
import { useIsMounted } from "@/hooks/use-hydrated";

type BeadType = "cross" | "intro" | "mystery_start" | "our_father" | "hail_mary" | "glory" | "fatima" | "closing";

type RosaryStep = {
    titleKey: string;
    prayerKey: string;
    type: BeadType;
    mysteryIndex?: number;
};

function buildRosarySequence(mysteryType: MysteryType): RosaryStep[] {
    const steps: RosaryStep[] = [
        { titleKey: "beads.signOfCross", prayerKey: "prayers.signOfCross", type: "cross" },
        { titleKey: "beads.creed", prayerKey: "prayers.creed", type: "intro" },
        { titleKey: "beads.ourFather", prayerKey: "prayers.ourFather", type: "our_father" },
        { titleKey: "beads.hailMaryFaith", prayerKey: "prayers.hailMary", type: "hail_mary" },
        { titleKey: "beads.hailMaryHope", prayerKey: "prayers.hailMary", type: "hail_mary" },
        { titleKey: "beads.hailMaryCharity", prayerKey: "prayers.hailMary", type: "hail_mary" },
        { titleKey: "beads.glory", prayerKey: "prayers.glory", type: "glory" },
    ];

    for (let decade = 1; decade <= 5; decade++) {
        steps.push({
            titleKey: `mysteries.${mysteryType}.m${decade}`,
            prayerKey: `mysteries.${mysteryType}.m${decade}`,
            type: "mystery_start",
            mysteryIndex: decade,
        });
        steps.push({ titleKey: "beads.ourFather", prayerKey: "prayers.ourFather", type: "our_father" });
        for (let hm = 1; hm <= 10; hm++) {
            steps.push({
                titleKey: "beads.hailMaryN",
                prayerKey: "prayers.hailMary",
                type: "hail_mary",
            });
        }
        steps.push({ titleKey: "beads.glory", prayerKey: "prayers.glory", type: "glory" });
        steps.push({ titleKey: "beads.fatimaPrayer", prayerKey: "prayers.fatimaPrayer", type: "fatima" });
    }

    steps.push({ titleKey: "beads.salveRegina", prayerKey: "prayers.salveRegina", type: "closing" });
    steps.push({ titleKey: "beads.signOfCross", prayerKey: "prayers.signOfCross", type: "cross" });

    return steps;
}

const BEAD_COLORS: Record<BeadType, string> = {
    cross: "bg-gold-500",
    intro: "bg-slate-400 dark:bg-slate-500",
    mystery_start: "bg-amber-500",
    our_father: "bg-sacred-blue dark:bg-slate-600",
    hail_mary: "bg-slate-300 dark:bg-slate-600",
    glory: "bg-purple-500",
    fatima: "bg-rose-500",
    closing: "bg-gold-500",
};

const BEAD_LABELS: Record<BeadType, string> = {
    cross: "✝️",
    intro: "",
    mystery_start: "⭐",
    our_father: "🔵",
    hail_mary: "",
    glory: "🟣",
    fatima: "🌹",
    closing: "✝️",
};

const SESSION_KEY = "rosary-guide-session";
const SESSION_MAX_AGE_MS = 12 * 60 * 60 * 1000;

interface SavedSession {
    step: number;
    mysteryType: MysteryType;
    savedAt: number;
}

type MeditationTab = "gospel" | "meditation" | "prayer";

// Improved Bead Visualizer — grouped by decade with labels
function BeadMap({ steps, currentStep, onBeadClick, mysteryType }: {
    steps: RosaryStep[];
    currentStep: number;
    onBeadClick: (index: number) => void;
    mysteryType: MysteryType;
}) {
    const containerRef = useRef<HTMLDivElement>(null);
    const activeRef = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        if (activeRef.current && containerRef.current) {
            activeRef.current.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
        }
    }, [currentStep]);

    // Group beads into sections: intro (0-6), 5 decades (7+), closing
    const introBeads = steps.slice(0, 7);
    const decades: RosaryStep[][] = [];
    let idx = 7;
    for (let d = 0; d < 5; d++) {
        decades.push(steps.slice(idx, idx + 14)); // mystery+OF+10HM+glory+fatima = 14
        idx += 14;
    }
    const closingBeads = steps.slice(idx);

    const renderBead = (step: RosaryStep, globalIndex: number) => {
        const isActive = globalIndex === currentStep;
        const isPast = globalIndex < currentStep;
        const beadColor = BEAD_COLORS[step.type];
        const isLarge = step.type === "mystery_start" || step.type === "cross" || step.type === "closing" || step.type === "our_father";
        const size = isLarge ? "w-5 h-5" : "w-3 h-3";

        return (
            <button
                key={globalIndex}
                ref={isActive ? activeRef : undefined}
                onClick={() => onBeadClick(globalIndex)}
                title={step.type === "mystery_start" ? `${step.mysteryIndex}º` : step.type.replace("_", " ")}
                className={`
                    rounded-full transition-all duration-300 flex-shrink-0 relative
                    ${size}
                    ${isPast ? `${beadColor} opacity-50` : isActive ? `${beadColor} scale-[1.8] ring-2 ring-amber-400 ring-offset-2 ring-offset-background shadow-lg shadow-amber-400/30` : `${beadColor} opacity-25 hover:opacity-50`}
                `}
                aria-label={`Bead ${globalIndex + 1}`}
            />
        );
    };

    let globalIdx = 0;

    return (
        <div ref={containerRef} className="py-3 px-2" data-testid="bead-map">
            {/* Intro beads */}
            <div className="flex items-center justify-center gap-1.5 mb-3">
                {introBeads.map((step) => renderBead(step, globalIdx++))}
            </div>
            {/* Decades */}
            <div className="space-y-2">
                {decades.map((decade, dIdx) => (
                    <div key={dIdx} className="flex items-center justify-center gap-1 relative">
                        <span className="absolute -left-1 sm:left-0 text-[9px] font-bold text-muted-foreground/50 w-4">{dIdx + 1}</span>
                        <div className="flex items-center gap-1 pl-5">
                            {decade.map((step) => renderBead(step, globalIdx++))}
                        </div>
                    </div>
                ))}
            </div>
            {/* Closing */}
            <div className="flex items-center justify-center gap-1.5 mt-3">
                {closingBeads.map((step) => renderBead(step, globalIdx++))}
            </div>
        </div>
    );
}

export default function GuiaInterativoPage() {
    const router = useRouter();
    const t = useTranslations("RosaryGuide");
    const isMounted = useIsMounted();
    const submitCheckIn = usePrayerStore((s) => s.submitCheckIn);

    const todaysMystery = getTodaysMystery();
    const [mysteryType] = useState<MysteryType>(todaysMystery);
    const rosarySteps = buildRosarySequence(mysteryType);

    const [currentStep, setCurrentStep] = useState(0);
    const [completed, setCompleted] = useState(false);
    const [showResumePrompt, setShowResumePrompt] = useState(false);
    const [hapticEnabled, setHapticEnabled] = useState(true);
    const [wakeLockActive, setWakeLockActive] = useState(false);
    const [autoCheckedIn, setAutoCheckedIn] = useState(false);
    const [activeTab, setActiveTab] = useState<MeditationTab>("gospel");
    const wakeLockRef = useRef<WakeLockSentinel | null>(null);

    // Session recovery
    useEffect(() => {
        if (!isMounted) return;
        try {
            const saved = localStorage.getItem(SESSION_KEY);
            if (saved) {
                const session: SavedSession = JSON.parse(saved);
                const age = Date.now() - session.savedAt;
                if (age < SESSION_MAX_AGE_MS && session.step > 0) {
                    setShowResumePrompt(true);
                } else {
                    localStorage.removeItem(SESSION_KEY);
                }
            }
        } catch {
            localStorage.removeItem(SESSION_KEY);
        }
    }, [isMounted]);

    // Screen WakeLock
    const requestWakeLock = useCallback(async () => {
        try {
            if ("wakeLock" in navigator) {
                wakeLockRef.current = await navigator.wakeLock.request("screen");
                setWakeLockActive(true);
                wakeLockRef.current.addEventListener("release", () => setWakeLockActive(false));
            }
        } catch {
            // WakeLock not supported or denied
        }
    }, []);

    useEffect(() => {
        if (!isMounted || completed) return;
        requestWakeLock();

        const handleVisibility = () => {
            if (document.visibilityState === "visible" && !completed) {
                requestWakeLock();
            }
        };
        document.addEventListener("visibilitychange", handleVisibility);

        return () => {
            document.removeEventListener("visibilitychange", handleVisibility);
            if (wakeLockRef.current) {
                wakeLockRef.current.release().catch(() => {});
                wakeLockRef.current = null;
            }
        };
    }, [isMounted, completed, requestWakeLock]);

    // Haptic feedback
    const triggerHaptic = useCallback(() => {
        if (hapticEnabled && "vibrate" in navigator) {
            navigator.vibrate(50);
        }
    }, [hapticEnabled]);

    // Save session to localStorage
    const saveSession = useCallback((step: number) => {
        const session: SavedSession = { step, mysteryType, savedAt: Date.now() };
        localStorage.setItem(SESSION_KEY, JSON.stringify(session));
    }, [mysteryType]);

    const handleNext = useCallback(() => {
        triggerHaptic();
        if (currentStep < rosarySteps.length - 1) {
            const next = currentStep + 1;
            setCurrentStep(next);
            saveSession(next);
            // Reset to gospel tab when entering a mystery step
            if (rosarySteps[next].type === "mystery_start") {
                setActiveTab("gospel");
            }
        } else {
            setCompleted(true);
            localStorage.removeItem(SESSION_KEY);
            if (!autoCheckedIn) {
                submitCheckIn(mysteryType, undefined, []);
                setAutoCheckedIn(true);
            }
            if (wakeLockRef.current) {
                wakeLockRef.current.release().catch(() => {});
            }
        }
    }, [currentStep, rosarySteps.length, triggerHaptic, saveSession, submitCheckIn, mysteryType, autoCheckedIn, rosarySteps]);

    const handlePrev = useCallback(() => {
        triggerHaptic();
        if (currentStep > 0) {
            const prev = currentStep - 1;
            setCurrentStep(prev);
            saveSession(prev);
        }
    }, [currentStep, triggerHaptic, saveSession]);

    const handleBeadClick = useCallback((index: number) => {
        triggerHaptic();
        setCurrentStep(index);
        saveSession(index);
    }, [triggerHaptic, saveSession]);

    const handleReset = useCallback(() => {
        setCurrentStep(0);
        setCompleted(false);
        setAutoCheckedIn(false);
        localStorage.removeItem(SESSION_KEY);
    }, []);

    const handleResume = useCallback(() => {
        try {
            const saved = localStorage.getItem(SESSION_KEY);
            if (saved) {
                const session: SavedSession = JSON.parse(saved);
                setCurrentStep(session.step);
            }
        } catch {}
        setShowResumePrompt(false);
    }, []);

    const handleStartFresh = useCallback(() => {
        localStorage.removeItem(SESSION_KEY);
        setCurrentStep(0);
        setShowResumePrompt(false);
    }, []);

    if (!isMounted) {
        return (
            <PageTransition>
                <main className="min-h-screen bg-background flex items-center justify-center">
                    <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-gold-500 to-gold-600 flex items-center justify-center animate-pulse-gold">
                        <span className="text-4xl">📿</span>
                    </div>
                </main>
            </PageTransition>
        );
    }

    const step = rosarySteps[currentStep];
    const progressPercent = ((currentStep + 1) / rosarySteps.length) * 100;

    // Resolve title — handle interpolation for hailMaryN
    const getStepTitle = (s: RosaryStep, index: number): string => {
        if (s.titleKey === "beads.hailMaryN") {
            // Calculate which Hail Mary within the current decade
            let hmCount = 0;
            for (let i = index; i >= 0; i--) {
                if (rosarySteps[i].type === "hail_mary") hmCount++;
                if (rosarySteps[i].type === "our_father" && i < index) break;
            }
            return t("beads.hailMaryN", { n: hmCount });
        }
        if (s.titleKey === "beads.mystery") {
            return t("beads.mystery", { n: s.mysteryIndex ?? 1 });
        }
        return t(s.titleKey);
    };

    // Resume prompt dialog
    if (showResumePrompt) {
        return (
            <PageTransition>
                <main className="min-h-screen bg-background flex flex-col items-center justify-center px-4">
                    <div className="max-w-md w-full glass sacred-border p-8 sm:p-12 rounded-3xl text-center">
                        <span className="text-5xl mb-6 block">📿</span>
                        <h2 className="text-2xl font-cinzel font-bold text-foreground mb-3">{t("resume.title")}</h2>
                        <p className="text-muted-foreground mb-8">{t("resume.desc")}</p>
                        <div className="flex flex-col sm:flex-row gap-3 justify-center">
                            <Button size="lg" onClick={handleResume} className="rounded-full px-8 bg-gradient-to-r from-gold-500 to-gold-600 text-white font-cinzel font-bold">
                                {t("resume.continue")}
                            </Button>
                            <Button size="lg" variant="outline" onClick={handleStartFresh} className="rounded-full px-8 sacred-border">
                                {t("resume.restart")}
                            </Button>
                        </div>
                    </div>
                </main>
            </PageTransition>
        );
    }

    return (
        <PageTransition>
            <main className="min-h-screen bg-background flex flex-col" data-testid="rosary-guide">
                <PageHeader title={t("title")} subtitle={t("subtitle")} icon="📿" />

                <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full flex-grow flex flex-col">
                    <BreadcrumbNav
                        items={[
                            { label: "Ferramentas", path: "/ferramentas" },
                            { label: t("breadcrumb") },
                        ]}
                    />

                    {/* Status indicators */}
                    <div className="flex items-center justify-center gap-4 mt-4 mb-2">
                        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                            <Monitor className={`w-3.5 h-3.5 ${wakeLockActive ? "text-emerald-500" : ""}`} />
                            <span>{wakeLockActive ? t("wakelock.active") : t("wakelock.inactive")}</span>
                        </div>
                        <button
                            onClick={() => setHapticEnabled(!hapticEnabled)}
                            className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
                            data-testid="haptic-toggle"
                        >
                            <Smartphone className={`w-3.5 h-3.5 ${hapticEnabled ? "text-emerald-500" : ""}`} />
                            <span>{hapticEnabled ? t("haptic.enabled") : t("haptic.disabled")}</span>
                        </button>
                    </div>

                    {!completed ? (
                        <div className="flex-grow flex flex-col justify-center py-4">
                            {/* Bead Visualizer Map */}
                            <BeadMap steps={rosarySteps} currentStep={currentStep} onBeadClick={handleBeadClick} mysteryType={mysteryType} />

                            {/* Progress Bar */}
                            <div className="mb-6 mt-2">
                                <div className="flex justify-between text-xs text-muted-foreground mb-2 font-medium">
                                    <span>{t("start")}</span>
                                    <span className="font-bold text-gold-600 dark:text-gold-400">{Math.round(progressPercent)}%</span>
                                </div>
                                <div className="w-full bg-muted/50 rounded-full h-2.5 border border-border/50 overflow-hidden">
                                    <div
                                        className="bg-gradient-to-r from-gold-400 to-gold-600 h-2.5 rounded-full transition-all duration-500 ease-out"
                                        style={{ width: `${progressPercent}%` }}
                                    />
                                </div>
                                <div className="text-center mt-2 text-xs text-muted-foreground">
                                    {t("step", { current: currentStep + 1, total: rosarySteps.length })}
                                </div>
                            </div>

                            {/* Prayer Card with animation */}
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={currentStep}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    transition={{ duration: 0.3 }}
                                    className="relative"
                                >
                                    {step.type === "mystery_start" && step.mysteryIndex ? (
                                        /* ── Mystery Step: Tabbed View (Gospel → Meditation → Prayer) ── */
                                        <div className="rounded-3xl overflow-hidden border border-border shadow-xl bg-card">
                                            {/* Mystery header */}
                                            <div className="bg-gradient-to-r from-amber-500/10 to-gold-500/10 border-b border-amber-500/20 px-6 py-5 text-center">
                                                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/15 border border-amber-500/25 mb-3">
                                                    <span className="text-xs font-bold uppercase tracking-widest text-amber-600 dark:text-amber-400">
                                                        {t("todaysMystery")} — {step.mysteryIndex}/5
                                                    </span>
                                                </div>
                                                <h2 className="text-xl sm:text-2xl font-cinzel font-bold text-foreground leading-tight">
                                                    {getStepTitle(step, currentStep)}
                                                </h2>
                                            </div>

                                            {/* Tabs */}
                                            <div className="flex border-b border-border">
                                                {(["gospel", "meditation", "prayer"] as MeditationTab[]).map((tab) => (
                                                    <button
                                                        key={tab}
                                                        onClick={() => setActiveTab(tab)}
                                                        className={`flex-1 px-3 py-3.5 text-center text-sm font-bold transition-all duration-200 relative
                                                            ${activeTab === tab
                                                                ? "text-gold-600 dark:text-gold-400"
                                                                : "text-muted-foreground hover:text-foreground"
                                                            }`}
                                                    >
                                                        <span>{t(`tabs.${tab}`)}</span>
                                                        {activeTab === tab && (
                                                            <motion.div
                                                                layoutId="activeTab"
                                                                className="absolute bottom-0 left-2 right-2 h-0.5 bg-gradient-to-r from-gold-500 to-gold-600 rounded-full"
                                                            />
                                                        )}
                                                    </button>
                                                ))}
                                            </div>

                                            {/* Tab Content */}
                                            <div className="p-6 sm:p-8 min-h-[280px] flex flex-col justify-between">
                                                <AnimatePresence mode="wait">
                                                    <motion.div
                                                        key={activeTab}
                                                        initial={{ opacity: 0, x: 10 }}
                                                        animate={{ opacity: 1, x: 0 }}
                                                        exit={{ opacity: 0, x: -10 }}
                                                        transition={{ duration: 0.2 }}
                                                        className="flex-1"
                                                    >
                                                        {activeTab === "gospel" && (
                                                            <div className="space-y-5">
                                                                <div className="flex items-center gap-2 text-sm font-bold text-amber-600 dark:text-amber-400 uppercase tracking-widest">
                                                                    <BookOpen className="w-4 h-4" />
                                                                    <span>{t("bibleLabel")}</span>
                                                                </div>
                                                                <blockquote className="text-lg sm:text-xl leading-relaxed text-foreground italic border-l-4 border-gold-500/40 pl-5 py-2">
                                                                    {t(`meditations.${mysteryType}.m${step.mysteryIndex}.bible`)}
                                                                </blockquote>
                                                                <p className="text-xs text-muted-foreground font-bold uppercase tracking-wider">
                                                                    📖 {t(`meditations.${mysteryType}.m${step.mysteryIndex}.bibleRef`)}
                                                                </p>
                                                                <button
                                                                    onClick={() => setActiveTab("meditation")}
                                                                    className="inline-flex items-center gap-2 text-sm font-bold text-gold-600 dark:text-gold-400 hover:text-gold-500 transition-colors mt-2"
                                                                >
                                                                    {t("tabs.meditation")} <ChevronRight className="w-4 h-4" />
                                                                </button>
                                                            </div>
                                                        )}

                                                        {activeTab === "meditation" && (
                                                            <div className="space-y-5">
                                                                <div className="flex items-center gap-2 text-sm font-bold text-purple-600 dark:text-purple-400 uppercase tracking-widest">
                                                                    <Heart className="w-4 h-4" />
                                                                    <span>{t("montfortLabel")}</span>
                                                                </div>
                                                                <p className="text-lg leading-relaxed text-foreground">
                                                                    {t(`meditations.${mysteryType}.m${step.mysteryIndex}.montfort`)}
                                                                </p>
                                                                <p className="text-[10px] text-muted-foreground/70 italic mt-4">
                                                                    {t("sourceLabel")}
                                                                </p>
                                                                <button
                                                                    onClick={() => setActiveTab("prayer")}
                                                                    className="inline-flex items-center gap-2 text-sm font-bold text-gold-600 dark:text-gold-400 hover:text-gold-500 transition-colors mt-2"
                                                                >
                                                                    {t("tabs.prayer")} <ChevronRight className="w-4 h-4" />
                                                                </button>
                                                            </div>
                                                        )}

                                                        {activeTab === "prayer" && (
                                                            <div className="space-y-5 text-center">
                                                                <p className="text-sm text-muted-foreground uppercase tracking-widest font-bold">
                                                                    {t("meditate")}
                                                                </p>
                                                                <p className="text-lg sm:text-xl leading-relaxed text-foreground italic">
                                                                    &ldquo;{t(step.prayerKey)}&rdquo;
                                                                </p>
                                                            </div>
                                                        )}
                                                    </motion.div>
                                                </AnimatePresence>
                                            </div>
                                        </div>
                                    ) : (
                                        /* ── Regular Prayer Step ── */
                                        <div className="glass sacred-border p-8 sm:p-12 rounded-3xl text-center relative overflow-hidden shadow-xl min-h-[250px] flex flex-col justify-center">
                                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gold-500/5 rounded-full blur-3xl" />

                                            <h2 className="text-2xl sm:text-3xl font-cinzel font-bold text-gold-600 dark:text-gold-400 mb-6 relative z-10">
                                                {getStepTitle(step, currentStep)}
                                            </h2>

                                            <p className="text-lg sm:text-xl leading-relaxed text-foreground italic relative z-10 font-manrope">
                                                &ldquo;{t(step.prayerKey)}&rdquo;
                                            </p>
                                        </div>
                                    )}
                                </motion.div>
                            </AnimatePresence>

                            {/* Controls */}
                            <div className="flex items-center justify-between mt-8 gap-3">
                                <Button
                                    variant="outline"
                                    size="lg"
                                    onClick={handlePrev}
                                    disabled={currentStep === 0}
                                    className="rounded-full px-5 py-6 sacred-border hover:bg-muted/30"
                                    data-testid="prev-btn"
                                >
                                    <ArrowLeft className="w-5 h-5 mr-1.5" />
                                    <span className="hidden sm:inline">{t("prev")}</span>
                                </Button>

                                <Button
                                    variant="outline"
                                    size="icon"
                                    onClick={handleReset}
                                    disabled={currentStep === 0}
                                    className="rounded-full w-12 h-12 sacred-border hover:bg-muted/30 text-muted-foreground"
                                    title={t("reset")}
                                    data-testid="reset-btn"
                                >
                                    <RefreshCw className="w-4 h-4" />
                                </Button>

                                <Button
                                    size="lg"
                                    onClick={handleNext}
                                    className="rounded-full px-6 py-6 text-base font-cinzel font-bold bg-gradient-to-r from-gold-500 to-gold-600 text-white hover:shadow-gold-glow transition-all"
                                    data-testid="next-btn"
                                >
                                    <span className="hidden sm:inline">{currentStep === rosarySteps.length - 1 ? t("finish") : t("next")}</span>
                                    <span className="sm:hidden">{currentStep === rosarySteps.length - 1 ? t("finish") : t("next")}</span>
                                    <ArrowRight className="w-5 h-5 ml-1.5" />
                                </Button>
                            </div>
                        </div>
                    ) : (
                        <div className="flex-grow flex flex-col items-center justify-center py-20 text-center">
                            <motion.div
                                initial={{ scale: 0.5, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ type: "spring", stiffness: 200, damping: 15 }}
                                className="w-24 h-24 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-full flex items-center justify-center shadow-lg shadow-emerald-500/20 mb-8 relative"
                            >
                                <div className="absolute inset-0 bg-emerald-500 rounded-full animate-ping opacity-20" />
                                <CheckCircle2 className="w-12 h-12 text-white" />
                            </motion.div>

                            <h2 className="text-3xl font-cinzel font-bold text-foreground mb-4">
                                {t("completion.title")}
                            </h2>

                            <p className="text-lg text-muted-foreground mb-4 max-w-md">
                                {t("completion.desc")}
                            </p>

                            {autoCheckedIn && (
                                <p className="text-sm text-emerald-600 dark:text-emerald-400 font-bold mb-8">
                                    {t("completion.checkedIn")}
                                </p>
                            )}

                            <div className="flex gap-4">
                                <Button
                                    variant="outline"
                                    size="lg"
                                    onClick={handleReset}
                                    className="rounded-full px-8 sacred-border"
                                    data-testid="pray-again-btn"
                                >
                                    <RefreshCw className="w-5 h-5 mr-2" />
                                    {t("completion.prayAgain")}
                                </Button>

                                <Button
                                    size="lg"
                                    onClick={() => router.push("/dashboard")}
                                    className="rounded-full px-8 bg-sacred-blue text-white hover:bg-sacred-blue-light"
                                    data-testid="go-dashboard-btn"
                                >
                                    {t("completion.goToDashboard")}
                                </Button>
                            </div>
                        </div>
                    )}
                </div>
            </main>
        </PageTransition>
    );
}
