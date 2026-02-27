"use client";

import { useState, useEffect, useCallback, useRef, useMemo } from "react";
import { useRouter } from "@/i18n/routing";
import { PageHeader } from "@/components/page-header";
import { PageTransition } from "@/components/page-transition";
import { BreadcrumbNav } from "@/components/learning/breadcrumb-nav";
import { Button } from "@/components/ui/button";
import {
    ArrowRight, ArrowLeft, RefreshCw, CheckCircle2, Smartphone, Monitor,
    BookOpen, Heart, ChevronRight, Globe, PlayCircle, Sparkles
} from "lucide-react";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import { getTodaysMystery, MysteryType } from "@/types";
import { usePrayerStore } from "@/stores/prayer-store";
import { useIsMounted } from "@/hooks/use-hydrated";

// ── Types ──

type BeadType =
    | "cross" | "intro" | "montfort_intro" | "montfort_salutation"
    | "decade_offering" | "mystery_start" | "our_father" | "hail_mary"
    | "glory" | "fatima" | "montfort_closing" | "sub_tuum" | "closing";

type RosaryStep = {
    titleKey: string;
    prayerKey: string;
    latinKey?: string;
    type: BeadType;
    mysteryIndex?: number;
    mysteryType?: MysteryType;
};

type RosaryMode = "daily" | "full";
type MeditationTab = "gospel" | "meditation" | "prayer";

const ALL_MYSTERIES: MysteryType[] = ["joyful", "sorrowful", "glorious", "luminous"];

// ── Build Rosary Sequence ──

function buildRosarySequence(mysteryTypes: MysteryType[]): RosaryStep[] {
    const steps: RosaryStep[] = [];

    // Opening
    steps.push({ titleKey: "beads.signOfCross", prayerKey: "prayers.signOfCross", latinKey: "latin.signOfCross", type: "cross" });
    steps.push({ titleKey: "beads.montfortIntro", prayerKey: "prayers.montfortIntro", type: "montfort_intro" });
    steps.push({ titleKey: "beads.creed", prayerKey: "prayers.creed", latinKey: "latin.creed", type: "intro" });
    steps.push({ titleKey: "beads.ourFather", prayerKey: "prayers.ourFather", latinKey: "latin.ourFather", type: "our_father" });
    steps.push({ titleKey: "beads.hailMaryFaith", prayerKey: "prayers.hailMary", latinKey: "latin.hailMary", type: "hail_mary" });
    steps.push({ titleKey: "beads.hailMaryHope", prayerKey: "prayers.hailMary", latinKey: "latin.hailMary", type: "hail_mary" });
    steps.push({ titleKey: "beads.hailMaryCharity", prayerKey: "prayers.hailMary", latinKey: "latin.hailMary", type: "hail_mary" });
    steps.push({ titleKey: "beads.glory", prayerKey: "prayers.glory", latinKey: "latin.glory", type: "glory" });

    // Decades
    for (const mType of mysteryTypes) {
        for (let decade = 1; decade <= 5; decade++) {
            // Mystery announcement
            steps.push({
                titleKey: `mysteries.${mType}.m${decade}`,
                prayerKey: `mysteries.${mType}.m${decade}`,
                type: "mystery_start",
                mysteryIndex: decade,
                mysteryType: mType,
            });
            // Decade offering (Montfort)
            steps.push({
                titleKey: "beads.decadeOffering",
                prayerKey: `offerings.${mType}.d${decade}`,
                type: "decade_offering",
                mysteryIndex: decade,
                mysteryType: mType,
            });
            // Montfortian Salutation
            steps.push({
                titleKey: "beads.montfortSalutation",
                prayerKey: "prayers.montfortSalutation",
                type: "montfort_salutation",
            });
            // Our Father
            steps.push({ titleKey: "beads.ourFather", prayerKey: "prayers.ourFather", latinKey: "latin.ourFather", type: "our_father" });
            // 10 Hail Marys
            for (let hm = 1; hm <= 10; hm++) {
                steps.push({
                    titleKey: "beads.hailMaryN",
                    prayerKey: "prayers.hailMary",
                    latinKey: "latin.hailMary",
                    type: "hail_mary",
                });
            }
            // Glory Be
            steps.push({ titleKey: "beads.glory", prayerKey: "prayers.glory", latinKey: "latin.glory", type: "glory" });
            // Fatima Prayer
            steps.push({ titleKey: "beads.fatimaPrayer", prayerKey: "prayers.fatimaPrayer", latinKey: "latin.fatimaPrayer", type: "fatima" });
        }
    }

    // Closing
    steps.push({ titleKey: "beads.salveRegina", prayerKey: "prayers.salveRegina", latinKey: "latin.salveRegina", type: "closing" });
    steps.push({ titleKey: "beads.montfortClosing", prayerKey: "prayers.montfortClosing", type: "montfort_closing" });
    steps.push({ titleKey: "beads.subTuum", prayerKey: "prayers.subTuum", latinKey: "latin.subTuum", type: "sub_tuum" });
    steps.push({ titleKey: "beads.signOfCross", prayerKey: "prayers.signOfCross", latinKey: "latin.signOfCross", type: "cross" });

    return steps;
}

// ── Constants ──

const BEAD_COLORS: Record<BeadType, string> = {
    cross: "bg-gold-500",
    intro: "bg-slate-400 dark:bg-slate-500",
    montfort_intro: "bg-amber-600",
    montfort_salutation: "bg-rose-400 dark:bg-rose-500",
    decade_offering: "bg-amber-400 dark:bg-amber-500",
    mystery_start: "bg-amber-500",
    our_father: "bg-sacred-blue dark:bg-slate-600",
    hail_mary: "bg-slate-300 dark:bg-slate-600",
    glory: "bg-purple-500",
    fatima: "bg-rose-500",
    montfort_closing: "bg-amber-600",
    sub_tuum: "bg-emerald-500",
    closing: "bg-gold-500",
};

const SESSION_KEY = "rosary-guide-session";
const SESSION_MAX_AGE_MS = 12 * 60 * 60 * 1000;

interface SavedSession {
    step: number;
    mode: RosaryMode;
    savedAt: number;
}

// ── Bead Visualizer ──

function BeadMap({ steps, currentStep, onBeadClick }: {
    steps: RosaryStep[];
    currentStep: number;
    onBeadClick: (index: number) => void;
}) {
    const containerRef = useRef<HTMLDivElement>(null);
    const activeRef = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        if (activeRef.current) {
            activeRef.current.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
        }
    }, [currentStep]);

    // Find decade boundaries
    const decadeGroups: { label: string; startIdx: number; endIdx: number }[] = [];
    let introEnd = 0;
    for (let i = 0; i < steps.length; i++) {
        if (steps[i].type === "mystery_start") {
            if (introEnd === 0) introEnd = i;
            const endIdx = Math.min(i + 16, steps.length); // mystery+offering+salut+OF+10HM+glory+fatima = 16
            decadeGroups.push({ label: `${steps[i].mysteryIndex}`, startIdx: i, endIdx });
        }
    }

    const renderBead = (step: RosaryStep, globalIndex: number) => {
        const isActive = globalIndex === currentStep;
        const isPast = globalIndex < currentStep;
        const beadColor = BEAD_COLORS[step.type];
        const isLarge = ["mystery_start", "cross", "closing", "our_father", "montfort_intro", "montfort_closing", "sub_tuum", "decade_offering", "montfort_salutation"].includes(step.type);
        const size = isLarge ? "w-4 h-4" : "w-2.5 h-2.5";

        return (
            <button
                key={globalIndex}
                ref={isActive ? activeRef : undefined}
                onClick={() => onBeadClick(globalIndex)}
                className={`
                    rounded-full transition-all duration-300 flex-shrink-0
                    ${size}
                    ${isPast ? `${beadColor} opacity-50` : isActive ? `${beadColor} scale-[1.8] ring-2 ring-amber-400 ring-offset-2 ring-offset-background shadow-lg shadow-amber-400/30` : `${beadColor} opacity-25 hover:opacity-50`}
                `}
                aria-label={`Bead ${globalIndex + 1}`}
            />
        );
    };

    return (
        <div ref={containerRef} className="py-2 px-2 max-h-32 overflow-y-auto" data-testid="bead-map">
            {/* Intro beads */}
            <div className="flex items-center justify-center gap-1 mb-2 flex-wrap">
                {steps.slice(0, introEnd || 8).map((step, i) => renderBead(step, i))}
            </div>
            {/* Decades */}
            <div className="space-y-1.5">
                {decadeGroups.map((group, dIdx) => (
                    <div key={dIdx} className="flex items-center justify-center gap-0.5 relative">
                        <span className="text-[8px] font-bold text-muted-foreground/40 w-3 flex-shrink-0">{group.label}</span>
                        <div className="flex items-center gap-0.5 flex-wrap justify-center">
                            {steps.slice(group.startIdx, group.endIdx).map((step, i) => renderBead(step, group.startIdx + i))}
                        </div>
                    </div>
                ))}
            </div>
            {/* Closing beads */}
            {decadeGroups.length > 0 && (
                <div className="flex items-center justify-center gap-1 mt-2 flex-wrap">
                    {steps.slice(decadeGroups[decadeGroups.length - 1].endIdx).map((step, i) => renderBead(step, decadeGroups[decadeGroups.length - 1].endIdx + i))}
                </div>
            )}
        </div>
    );
}

// ── Mode Selection Screen ──

function ModeSelection({ onSelect, t, checkInT, todaysMystery }: {
    onSelect: (mode: RosaryMode) => void;
    t: ReturnType<typeof useTranslations>;
    checkInT: ReturnType<typeof useTranslations>;
    todaysMystery: MysteryType;
}) {
    const [selected, setSelected] = useState<RosaryMode>("daily");
    const mysteryLabel = checkInT(`mysteries.${todaysMystery}.label`);

    return (
        <PageTransition>
            <main className="min-h-screen bg-background flex flex-col items-center justify-center px-4">
                <div className="max-w-lg w-full space-y-8 text-center">
                    <div>
                        <span className="text-6xl mb-4 block">📿</span>
                        <h1 className="text-3xl font-cinzel font-bold text-foreground mb-2">{t("modeSelect.title")}</h1>
                        <p className="text-muted-foreground">{t("modeSelect.subtitle")}</p>
                    </div>

                    <div className="space-y-4">
                        <button
                            onClick={() => setSelected("daily")}
                            className={`w-full text-left p-6 rounded-2xl border-2 transition-all duration-200 ${
                                selected === "daily"
                                    ? "border-gold-500 bg-gold-500/5 shadow-lg shadow-gold-500/10"
                                    : "border-border bg-card hover:border-gold-500/30"
                            }`}
                        >
                            <div className="flex items-center gap-4">
                                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${selected === "daily" ? "bg-gradient-to-br from-gold-500 to-gold-600" : "bg-muted"}`}>
                                    <Sparkles className={`w-6 h-6 ${selected === "daily" ? "text-white" : "text-muted-foreground"}`} />
                                </div>
                                <div className="flex-1">
                                    <h3 className="font-cinzel font-bold text-foreground text-lg">{t("modeSelect.daily")}</h3>
                                    <p className="text-sm text-muted-foreground mt-1">{t("modeSelect.dailyDesc")}</p>
                                    <p className="text-xs text-gold-600 dark:text-gold-400 font-bold mt-2">{t("modeSelect.todayMystery", { name: mysteryLabel })}</p>
                                </div>
                                {selected === "daily" && <CheckCircle2 className="w-6 h-6 text-gold-500 flex-shrink-0" />}
                            </div>
                        </button>

                        <button
                            onClick={() => setSelected("full")}
                            className={`w-full text-left p-6 rounded-2xl border-2 transition-all duration-200 ${
                                selected === "full"
                                    ? "border-gold-500 bg-gold-500/5 shadow-lg shadow-gold-500/10"
                                    : "border-border bg-card hover:border-gold-500/30"
                            }`}
                        >
                            <div className="flex items-center gap-4">
                                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${selected === "full" ? "bg-gradient-to-br from-gold-500 to-gold-600" : "bg-muted"}`}>
                                    <PlayCircle className={`w-6 h-6 ${selected === "full" ? "text-white" : "text-muted-foreground"}`} />
                                </div>
                                <div className="flex-1">
                                    <h3 className="font-cinzel font-bold text-foreground text-lg">{t("modeSelect.full")}</h3>
                                    <p className="text-sm text-muted-foreground mt-1">{t("modeSelect.fullDesc")}</p>
                                </div>
                                {selected === "full" && <CheckCircle2 className="w-6 h-6 text-gold-500 flex-shrink-0" />}
                            </div>
                        </button>
                    </div>

                    <Button
                        size="lg"
                        onClick={() => onSelect(selected)}
                        className="rounded-full px-12 py-7 text-lg font-cinzel font-bold bg-gradient-to-r from-gold-500 to-gold-600 text-white hover:shadow-gold-glow transition-all w-full sm:w-auto"
                    >
                        {t("modeSelect.start")}
                        <ArrowRight className="w-5 h-5 ml-2" />
                    </Button>
                </div>
            </main>
        </PageTransition>
    );
}

// ── Main Component ──

export default function GuiaInterativoPage() {
    const router = useRouter();
    const t = useTranslations("RosaryGuide");
    const checkInT = useTranslations("CheckIn");
    const isMounted = useIsMounted();
    const submitCheckIn = usePrayerStore((s) => s.submitCheckIn);

    const todaysMystery = getTodaysMystery();

    const [mode, setMode] = useState<RosaryMode | null>(null);
    const [currentStep, setCurrentStep] = useState(0);
    const [completed, setCompleted] = useState(false);
    const [showResumePrompt, setShowResumePrompt] = useState(false);
    const [hapticEnabled, setHapticEnabled] = useState(true);
    const [wakeLockActive, setWakeLockActive] = useState(false);
    const [autoCheckedIn, setAutoCheckedIn] = useState(false);
    const [activeTab, setActiveTab] = useState<MeditationTab>("gospel");
    const [showLatin, setShowLatin] = useState(false);
    const wakeLockRef = useRef<WakeLockSentinel | null>(null);

    const mysteryTypes = useMemo(() => {
        if (mode === "full") return ALL_MYSTERIES;
        return [todaysMystery];
    }, [mode, todaysMystery]);

    const rosarySteps = useMemo(() => buildRosarySequence(mysteryTypes), [mysteryTypes]);

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
        } catch { /* not supported */ }
    }, []);

    useEffect(() => {
        if (!isMounted || completed || !mode) return;
        requestWakeLock();
        const handleVisibility = () => {
            if (document.visibilityState === "visible" && !completed) requestWakeLock();
        };
        document.addEventListener("visibilitychange", handleVisibility);
        return () => {
            document.removeEventListener("visibilitychange", handleVisibility);
            if (wakeLockRef.current) {
                wakeLockRef.current.release().catch(() => {});
                wakeLockRef.current = null;
            }
        };
    }, [isMounted, completed, requestWakeLock, mode]);

    const triggerHaptic = useCallback(() => {
        if (hapticEnabled && "vibrate" in navigator) navigator.vibrate(50);
    }, [hapticEnabled]);

    const saveSession = useCallback((step: number) => {
        if (!mode) return;
        const session: SavedSession = { step, mode, savedAt: Date.now() };
        localStorage.setItem(SESSION_KEY, JSON.stringify(session));
    }, [mode]);

    const handleNext = useCallback(() => {
        triggerHaptic();
        if (currentStep < rosarySteps.length - 1) {
            const next = currentStep + 1;
            setCurrentStep(next);
            saveSession(next);
            if (rosarySteps[next].type === "mystery_start") setActiveTab("gospel");
        } else {
            setCompleted(true);
            localStorage.removeItem(SESSION_KEY);
            if (!autoCheckedIn) {
                submitCheckIn(todaysMystery, undefined, []);
                setAutoCheckedIn(true);
            }
            if (wakeLockRef.current) wakeLockRef.current.release().catch(() => {});
        }
    }, [currentStep, rosarySteps, triggerHaptic, saveSession, submitCheckIn, todaysMystery, autoCheckedIn]);

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
        if (rosarySteps[index].type === "mystery_start") setActiveTab("gospel");
    }, [triggerHaptic, saveSession, rosarySteps]);

    const handleReset = useCallback(() => {
        setCurrentStep(0);
        setCompleted(false);
        setAutoCheckedIn(false);
        setMode(null);
        localStorage.removeItem(SESSION_KEY);
    }, []);

    const handleResume = useCallback(() => {
        try {
            const saved = localStorage.getItem(SESSION_KEY);
            if (saved) {
                const session: SavedSession = JSON.parse(saved);
                setMode(session.mode);
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

    const handleModeSelect = useCallback((selectedMode: RosaryMode) => {
        setMode(selectedMode);
        setCurrentStep(0);
    }, []);

    // ── SSR Loading ──
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

    // ── Resume Prompt ──
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

    // ── Mode Selection ──
    if (!mode) {
        return <ModeSelection onSelect={handleModeSelect} t={t} checkInT={checkInT} todaysMystery={todaysMystery} />;
    }

    // ── Active Prayer ──
    const step = rosarySteps[currentStep];
    const progressPercent = ((currentStep + 1) / rosarySteps.length) * 100;

    const getStepTitle = (s: RosaryStep, index: number): string => {
        if (s.titleKey === "beads.hailMaryN") {
            let hmCount = 0;
            for (let i = index; i >= 0; i--) {
                if (rosarySteps[i].type === "hail_mary") hmCount++;
                if (rosarySteps[i].type === "our_father" && i < index) break;
            }
            return t("beads.hailMaryN", { n: hmCount });
        }
        if (s.titleKey === "beads.decadeOffering") {
            return t("beads.decadeOffering", { n: s.mysteryIndex ?? 1 });
        }
        return t(s.titleKey);
    };

    // Get the prayer text, with optional Latin
    const getPrayerText = (s: RosaryStep): string => {
        if (showLatin && s.latinKey) return t(s.latinKey);
        return t(s.prayerKey);
    };

    // Determine current mystery type for this step (for meditations lookup)
    const getCurrentMysteryType = (): MysteryType | null => {
        for (let i = currentStep; i >= 0; i--) {
            if (rosarySteps[i].type === "mystery_start" && rosarySteps[i].mysteryType) {
                return rosarySteps[i].mysteryType!;
            }
        }
        return mysteryTypes[0];
    };

    const getCurrentMysteryIndex = (): number => {
        for (let i = currentStep; i >= 0; i--) {
            if (rosarySteps[i].type === "mystery_start" && rosarySteps[i].mysteryIndex) {
                return rosarySteps[i].mysteryIndex!;
            }
        }
        return 1;
    };

    // Is this a step with a long prayer text? (for font sizing)
    const isLongPrayer = ["intro", "montfort_intro", "montfort_salutation", "montfort_closing", "closing", "decade_offering"].includes(step.type);

    return (
        <PageTransition>
            <main className="min-h-screen bg-background flex flex-col" data-testid="rosary-guide">
                <PageHeader title={t("title")} subtitle={t("subtitle")} icon="📿" />

                <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-6 w-full flex-grow flex flex-col">
                    <BreadcrumbNav
                        items={[
                            { label: "Ferramentas", path: "/ferramentas" },
                            { label: t("breadcrumb") },
                        ]}
                    />

                    {/* Status bar */}
                    <div className="flex items-center justify-center gap-3 mt-3 mb-1 flex-wrap">
                        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                            <Monitor className={`w-3.5 h-3.5 ${wakeLockActive ? "text-emerald-500" : ""}`} />
                            <span>{wakeLockActive ? t("wakelock.active") : t("wakelock.inactive")}</span>
                        </div>
                        <button
                            onClick={() => setHapticEnabled(!hapticEnabled)}
                            className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
                        >
                            <Smartphone className={`w-3.5 h-3.5 ${hapticEnabled ? "text-emerald-500" : ""}`} />
                            <span>{hapticEnabled ? t("haptic.enabled") : t("haptic.disabled")}</span>
                        </button>
                        <button
                            onClick={() => setShowLatin(!showLatin)}
                            className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
                        >
                            <Globe className={`w-3.5 h-3.5 ${showLatin ? "text-amber-500" : ""}`} />
                            <span>{showLatin ? t("latin.toggle") : t("latin.showLatin")}</span>
                        </button>
                    </div>

                    {!completed ? (
                        <div className="flex-grow flex flex-col justify-center py-3">
                            {/* Bead Map */}
                            <BeadMap steps={rosarySteps} currentStep={currentStep} onBeadClick={handleBeadClick} />

                            {/* Progress */}
                            <div className="mb-5 mt-1">
                                <div className="flex justify-between text-xs text-muted-foreground mb-1.5 font-medium">
                                    <span>{t("start")}</span>
                                    <span className="font-bold text-gold-600 dark:text-gold-400">{Math.round(progressPercent)}%</span>
                                </div>
                                <div className="w-full bg-muted/50 rounded-full h-2 border border-border/50 overflow-hidden">
                                    <div
                                        className="bg-gradient-to-r from-gold-400 to-gold-600 h-2 rounded-full transition-all duration-500 ease-out"
                                        style={{ width: `${progressPercent}%` }}
                                    />
                                </div>
                                <div className="text-center mt-1.5 text-[11px] text-muted-foreground">
                                    {t("step", { current: currentStep + 1, total: rosarySteps.length })}
                                </div>
                            </div>

                            {/* Prayer Card */}
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={currentStep}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    transition={{ duration: 0.3 }}
                                    className="relative"
                                >
                                    {step.type === "mystery_start" && step.mysteryIndex && step.mysteryType ? (
                                        /* ── Mystery Step: Tabbed View ── */
                                        <div className="rounded-3xl overflow-hidden border border-border shadow-xl bg-card">
                                            {/* Header */}
                                            <div className="bg-gradient-to-r from-amber-500/10 to-gold-500/10 border-b border-amber-500/20 px-5 py-4 text-center">
                                                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/25 mb-2">
                                                    <span className="text-[10px] font-bold uppercase tracking-widest text-amber-600 dark:text-amber-400">
                                                        {checkInT(`mysteries.${step.mysteryType}.label`)} — {step.mysteryIndex}/5
                                                    </span>
                                                </div>
                                                <h2 className="text-lg sm:text-xl font-cinzel font-bold text-foreground leading-tight">
                                                    {getStepTitle(step, currentStep)}
                                                </h2>
                                            </div>

                                            {/* Tabs */}
                                            <div className="flex border-b border-border">
                                                {(["gospel", "meditation", "prayer"] as MeditationTab[]).map((tab) => (
                                                    <button
                                                        key={tab}
                                                        onClick={() => setActiveTab(tab)}
                                                        className={`flex-1 px-2 py-3 text-center text-xs sm:text-sm font-bold transition-all duration-200 relative
                                                            ${activeTab === tab ? "text-gold-600 dark:text-gold-400" : "text-muted-foreground hover:text-foreground"}`}
                                                    >
                                                        <span>{t(`tabs.${tab}`)}</span>
                                                        {activeTab === tab && (
                                                            <motion.div layoutId="activeTab" className="absolute bottom-0 left-2 right-2 h-0.5 bg-gradient-to-r from-gold-500 to-gold-600 rounded-full" />
                                                        )}
                                                    </button>
                                                ))}
                                            </div>

                                            {/* Tab Content */}
                                            <div className="p-5 sm:p-7 min-h-[260px] flex flex-col justify-between">
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
                                                            <div className="space-y-4">
                                                                <div className="flex items-center gap-2 text-sm font-bold text-amber-600 dark:text-amber-400 uppercase tracking-widest">
                                                                    <BookOpen className="w-4 h-4" />
                                                                    <span>{t("bibleLabel")}</span>
                                                                </div>
                                                                <blockquote className="text-base sm:text-lg leading-relaxed text-foreground italic border-l-4 border-gold-500/40 pl-4 py-1">
                                                                    {t(`meditations.${step.mysteryType}.m${step.mysteryIndex}.bible`)}
                                                                </blockquote>
                                                                <p className="text-xs text-muted-foreground font-bold uppercase tracking-wider">
                                                                    📖 {t(`meditations.${step.mysteryType}.m${step.mysteryIndex}.bibleRef`)}
                                                                </p>
                                                                <button
                                                                    onClick={() => setActiveTab("meditation")}
                                                                    className="inline-flex items-center gap-2 text-sm font-bold text-gold-600 dark:text-gold-400 hover:text-gold-500 transition-colors mt-1"
                                                                >
                                                                    {t("tabs.meditation")} <ChevronRight className="w-4 h-4" />
                                                                </button>
                                                            </div>
                                                        )}

                                                        {activeTab === "meditation" && (
                                                            <div className="space-y-4">
                                                                <div className="flex items-center gap-2 text-sm font-bold text-purple-600 dark:text-purple-400 uppercase tracking-widest">
                                                                    <Heart className="w-4 h-4" />
                                                                    <span>{t("montfortLabel")}</span>
                                                                </div>
                                                                <p className="text-base leading-relaxed text-foreground">
                                                                    {t(`meditations.${step.mysteryType}.m${step.mysteryIndex}.montfort`)}
                                                                </p>
                                                                <p className="text-[10px] text-muted-foreground/70 italic">
                                                                    {t("sourceLabel")}
                                                                </p>
                                                                <button
                                                                    onClick={() => setActiveTab("prayer")}
                                                                    className="inline-flex items-center gap-2 text-sm font-bold text-gold-600 dark:text-gold-400 hover:text-gold-500 transition-colors mt-1"
                                                                >
                                                                    {t("tabs.prayer")} <ChevronRight className="w-4 h-4" />
                                                                </button>
                                                            </div>
                                                        )}

                                                        {activeTab === "prayer" && (
                                                            <div className="space-y-4 text-center">
                                                                <p className="text-sm text-muted-foreground uppercase tracking-widest font-bold">
                                                                    {t("meditate")}
                                                                </p>
                                                                <p className="text-base sm:text-lg leading-relaxed text-foreground italic">
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
                                        <div className="glass sacred-border p-6 sm:p-10 rounded-3xl text-center relative overflow-hidden shadow-xl min-h-[220px] flex flex-col justify-center">
                                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gold-500/5 rounded-full blur-3xl" />

                                            {/* Step type badge */}
                                            {(step.type === "montfort_intro" || step.type === "montfort_salutation" || step.type === "montfort_closing" || step.type === "decade_offering") && (
                                                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 mx-auto mb-3 relative z-10">
                                                    <span className="text-[10px] font-bold uppercase tracking-widest text-amber-600 dark:text-amber-400">
                                                        {t("montfortLabel")}
                                                    </span>
                                                </div>
                                            )}

                                            <h2 className={`font-cinzel font-bold text-gold-600 dark:text-gold-400 mb-4 relative z-10 ${isLongPrayer ? "text-xl sm:text-2xl" : "text-2xl sm:text-3xl"}`}>
                                                {getStepTitle(step, currentStep)}
                                            </h2>

                                            <p className={`leading-relaxed text-foreground italic relative z-10 font-manrope ${isLongPrayer ? "text-sm sm:text-base" : "text-lg sm:text-xl"}`}>
                                                &ldquo;{getPrayerText(step)}&rdquo;
                                            </p>

                                            {/* Show Latin toggle hint for prayers that have Latin */}
                                            {step.latinKey && !showLatin && (
                                                <button
                                                    onClick={() => setShowLatin(true)}
                                                    className="mt-3 text-[10px] text-muted-foreground/60 hover:text-muted-foreground transition-colors relative z-10 uppercase tracking-widest"
                                                >
                                                    {t("latin.showLatin")}
                                                </button>
                                            )}
                                            {step.latinKey && showLatin && (
                                                <button
                                                    onClick={() => setShowLatin(false)}
                                                    className="mt-3 text-[10px] text-amber-500/70 hover:text-amber-500 transition-colors relative z-10 uppercase tracking-widest"
                                                >
                                                    {t("latin.showVernacular")}
                                                </button>
                                            )}
                                        </div>
                                    )}
                                </motion.div>
                            </AnimatePresence>

                            {/* Controls */}
                            <div className="flex items-center justify-between mt-6 gap-3">
                                <Button
                                    variant="outline"
                                    size="lg"
                                    onClick={handlePrev}
                                    disabled={currentStep === 0}
                                    className="rounded-full px-5 py-6 sacred-border hover:bg-muted/30"
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
                                >
                                    <RefreshCw className="w-4 h-4" />
                                </Button>

                                <Button
                                    size="lg"
                                    onClick={handleNext}
                                    className="rounded-full px-6 py-6 text-base font-cinzel font-bold bg-gradient-to-r from-gold-500 to-gold-600 text-white hover:shadow-gold-glow transition-all"
                                >
                                    {currentStep === rosarySteps.length - 1 ? t("finish") : t("next")}
                                    <ArrowRight className="w-5 h-5 ml-1.5" />
                                </Button>
                            </div>
                        </div>
                    ) : (
                        /* ── Completion Screen ── */
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
                                <Button variant="outline" size="lg" onClick={handleReset} className="rounded-full px-8 sacred-border">
                                    <RefreshCw className="w-5 h-5 mr-2" />
                                    {t("completion.prayAgain")}
                                </Button>
                                <Button size="lg" onClick={() => router.push("/dashboard")} className="rounded-full px-8 bg-sacred-blue text-white hover:bg-sacred-blue-light">
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
