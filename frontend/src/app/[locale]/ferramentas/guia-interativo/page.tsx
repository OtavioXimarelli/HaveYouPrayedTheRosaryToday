"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { useRouter } from "@/i18n/routing";
import { PageHeader } from "@/components/page-header";
import { PageTransition } from "@/components/page-transition";
import { BreadcrumbNav } from "@/components/learning/breadcrumb-nav";
import { Button } from "@/components/ui/button";
import { ArrowRight, ArrowLeft, RefreshCw, CheckCircle2, Smartphone, Monitor } from "lucide-react";
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
    mysteryIndex?: number; // 1-5 for mystery beads
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

    // 5 decades
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

const SESSION_KEY = "rosary-guide-session";
const SESSION_MAX_AGE_MS = 12 * 60 * 60 * 1000; // 12 hours

interface SavedSession {
    step: number;
    mysteryType: MysteryType;
    savedAt: number;
}

// Bead Visualizer Map
function BeadMap({ steps, currentStep, onBeadClick }: {
    steps: RosaryStep[];
    currentStep: number;
    onBeadClick: (index: number) => void;
}) {
    const containerRef = useRef<HTMLDivElement>(null);
    const activeRef = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        if (activeRef.current && containerRef.current) {
            activeRef.current.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
        }
    }, [currentStep]);

    return (
        <div ref={containerRef} className="flex flex-wrap gap-1 justify-center py-4 max-h-24 overflow-y-auto" data-testid="bead-map">
            {steps.map((step, i) => {
                const isActive = i === currentStep;
                const isPast = i < currentStep;
                const beadColor = BEAD_COLORS[step.type];
                const size = step.type === "mystery_start" || step.type === "cross" || step.type === "closing"
                    ? "w-4 h-4" : "w-2.5 h-2.5";

                return (
                    <button
                        key={i}
                        ref={isActive ? activeRef : undefined}
                        onClick={() => onBeadClick(i)}
                        className={`
                            rounded-full transition-all duration-300 flex-shrink-0
                            ${size}
                            ${isPast ? `${beadColor} opacity-40` : isActive ? `${beadColor} scale-150 ring-2 ring-amber-400 ring-offset-1 ring-offset-background` : `${beadColor} opacity-20`}
                        `}
                        aria-label={`Bead ${i + 1}`}
                        data-testid={`bead-${i}`}
                    />
                );
            })}
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
        } else {
            // Rosary completed — auto check-in
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
    }, [currentStep, rosarySteps.length, triggerHaptic, saveSession, submitCheckIn, mysteryType, autoCheckedIn]);

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
                        <div className="flex-grow flex flex-col justify-center py-6">
                            {/* Bead Visualizer Map */}
                            <BeadMap steps={rosarySteps} currentStep={currentStep} onBeadClick={handleBeadClick} />

                            {/* Progress Bar */}
                            <div className="mb-8 mt-4">
                                <div className="flex justify-between text-xs text-muted-foreground mb-2 font-medium">
                                    <span>{t("start")}</span>
                                    <span>{Math.round(progressPercent)}% {t("completed")}</span>
                                </div>
                                <div className="w-full bg-muted/50 rounded-full h-3 border border-border/50 overflow-hidden">
                                    <div
                                        className="bg-gradient-to-r from-gold-400 to-gold-600 h-3 rounded-full transition-all duration-500 ease-out"
                                        style={{ width: `${progressPercent}%` }}
                                    />
                                </div>
                                <div className="text-center mt-3 text-sm text-muted-foreground">
                                    {t("step", { current: currentStep + 1, total: rosarySteps.length })}
                                </div>
                            </div>

                            {/* Prayer Card with animation */}
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={currentStep}
                                    initial={{ opacity: 0, x: 30 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -30 }}
                                    transition={{ duration: 0.25 }}
                                    className="glass sacred-border p-8 sm:p-12 rounded-3xl text-center relative overflow-hidden shadow-xl min-h-[300px] flex flex-col justify-center"
                                >
                                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gold-500/5 rounded-full blur-3xl" />

                                    {step.type === "mystery_start" && step.mysteryIndex && (
                                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 mx-auto mb-4 relative z-10">
                                            <span className="text-xs font-bold uppercase tracking-widest text-amber-600 dark:text-amber-400">
                                                {t("todaysMystery")}
                                            </span>
                                        </div>
                                    )}

                                    <h2 className="text-2xl sm:text-3xl font-cinzel font-bold text-gold-600 dark:text-gold-400 mb-6 relative z-10">
                                        {getStepTitle(step, currentStep)}
                                    </h2>

                                    <p className="text-lg sm:text-xl leading-relaxed text-foreground italic relative z-10 font-manrope">
                                        &ldquo;{t(step.prayerKey)}&rdquo;
                                    </p>

                                    {step.type === "mystery_start" && (
                                        <p className="mt-4 text-sm text-muted-foreground uppercase tracking-widest relative z-10">
                                            {t("meditate")}
                                        </p>
                                    )}
                                </motion.div>
                            </AnimatePresence>

                            {/* Controls */}
                            <div className="flex items-center justify-between mt-10 gap-4 flex-wrap">
                                <Button
                                    variant="outline"
                                    size="lg"
                                    onClick={handlePrev}
                                    disabled={currentStep === 0}
                                    className="rounded-full px-6 py-6 sacred-border hover:bg-muted/30"
                                    data-testid="prev-btn"
                                >
                                    <ArrowLeft className="w-5 h-5 mr-2" />
                                    {t("prev")}
                                </Button>

                                <Button
                                    variant="outline"
                                    size="icon"
                                    onClick={handleReset}
                                    disabled={currentStep === 0}
                                    className="rounded-full w-14 h-14 sacred-border hover:bg-muted/30 text-muted-foreground"
                                    title={t("reset")}
                                    data-testid="reset-btn"
                                >
                                    <RefreshCw className="w-5 h-5" />
                                </Button>

                                <Button
                                    size="lg"
                                    onClick={handleNext}
                                    className="rounded-full px-8 py-6 text-base font-cinzel font-bold bg-gradient-to-r from-gold-500 to-gold-600 text-white hover:shadow-gold-glow transition-all"
                                    data-testid="next-btn"
                                >
                                    {currentStep === rosarySteps.length - 1 ? t("finish") : t("next")}
                                    <ArrowRight className="w-5 h-5 ml-2" />
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
