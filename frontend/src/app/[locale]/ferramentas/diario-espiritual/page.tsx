"use client";

import { useState, useEffect } from "react";
import { PageHeader } from "@/components/page-header";
import { PageTransition } from "@/components/page-transition";
import { BreadcrumbNav } from "@/components/learning/breadcrumb-nav";
import { Button } from "@/components/ui/button";
import { Save, Calendar as CalendarIcon, Download, Trash2 } from "lucide-react";

type JournalEntry = {
    id: string;
    date: string; // YYYY-MM-DD
    content: string;
    intentions: string;
    mystery: string;
};

export default function DiarioEspiritualPage() {
    const [entries, setEntries] = useState<JournalEntry[]>([]);
    const [currentContent, setCurrentContent] = useState("");
    const [currentIntentions, setCurrentIntentions] = useState("");
    const [currentMystery, setCurrentMystery] = useState("Mistérios Gozosos");

    const today = new Date().toISOString().split("T")[0];

    useEffect(() => {
        const saved = localStorage.getItem("rosary-journal-entries");
        if (saved) {
            try {
                const parsed = JSON.parse(saved);
                setEntries(parsed);
                const todayEntry = parsed.find((e: JournalEntry) => e.date === today);
                if (todayEntry) {
                    setCurrentContent(todayEntry.content);
                    setCurrentIntentions(todayEntry.intentions);
                    setCurrentMystery(todayEntry.mystery);
                }
            } catch (e) {
                console.error("Failed to parse journal entries", e);
            }
        }
    }, [today]);

    const handleSave = () => {
        const newEntry: JournalEntry = {
            id: today,
            date: today,
            content: currentContent,
            intentions: currentIntentions,
            mystery: currentMystery,
        };

        const updatedEntries = [...entries.filter((e) => e.date !== today), newEntry];
        setEntries(updatedEntries);
        localStorage.setItem("rosary-journal-entries", JSON.stringify(updatedEntries));
        alert("Diário salvo com sucesso!");
    };

    const handleClear = () => {
        if (confirm("Tem certeza que deseja apagar a reflexão de hoje?")) {
            setCurrentContent("");
            setCurrentIntentions("");

            const updatedEntries = entries.filter((e) => e.date !== today);
            setEntries(updatedEntries);
            localStorage.setItem("rosary-journal-entries", JSON.stringify(updatedEntries));
        }
    };

    const handleExport = () => {
        const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(entries, null, 2));
        const downloadAnchorNode = document.createElement("a");
        downloadAnchorNode.setAttribute("href", dataStr);
        downloadAnchorNode.setAttribute("download", "diario-espiritual-rosario-vivo.json");
        document.body.appendChild(downloadAnchorNode);
        downloadAnchorNode.click();
        downloadAnchorNode.remove();
    };

    return (
        <PageTransition>
            <main className="min-h-screen bg-background">
                <PageHeader
                    title="Diário Espiritual"
                    subtitle="Um espaço sagrado para suas reflexões diárias, intenções e anotações após a oração."
                    icon="❤️"
                />

                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
                    <BreadcrumbNav
                        items={[
                            { label: "Ferramentas", path: "/ferramentas" },
                            { label: "Diário" }
                        ]}
                    />

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Main Form Area */}
                        <div className="lg:col-span-2 space-y-6">
                            <div className="glass sacred-border p-6 rounded-[2rem]">
                                <div className="flex items-center justify-between mb-6">
                                    <h3 className="text-xl font-cinzel font-bold text-foreground flex items-center gap-2">
                                        <CalendarIcon className="w-5 h-5 text-rose-500" />
                                        Reflexão de Hoje
                                    </h3>
                                    <span className="text-sm font-medium text-muted-foreground bg-muted/50 px-3 py-1 rounded-full">
                                        {new Date().toLocaleDateString("pt-BR", { weekday: "long", day: "numeric", month: "long" })}
                                    </span>
                                </div>

                                <div className="space-y-5">
                                    <div>
                                        <label className="block text-sm font-medium text-muted-foreground mb-2">
                                            Mistério Contemplado
                                        </label>
                                        <select
                                            value={currentMystery}
                                            onChange={(e) => setCurrentMystery(e.target.value)}
                                            className="w-full bg-background border border-border/50 rounded-xl px-4 py-3 text-foreground focus:ring-2 focus:ring-rose-500/50 outline-none transition-all"
                                        >
                                            <option>Mistérios Gozosos</option>
                                            <option>Mistérios Luminosos</option>
                                            <option>Mistérios Dolorosos</option>
                                            <option>Mistérios Gloriosos</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-muted-foreground mb-2">
                                            Intenções Pessoais
                                        </label>
                                        <textarea
                                            value={currentIntentions}
                                            onChange={(e) => setCurrentIntentions(e.target.value)}
                                            placeholder="Por quem você ofereceu o Rosário hoje?"
                                            className="w-full bg-background border border-border/50 rounded-xl px-4 py-3 text-foreground focus:ring-2 focus:ring-rose-500/50 outline-none transition-all min-h-[100px] resize-y"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-muted-foreground mb-2">
                                            Reflexão / Inspiração
                                        </label>
                                        <textarea
                                            value={currentContent}
                                            onChange={(e) => setCurrentContent(e.target.value)}
                                            placeholder="O que Deus falou ao seu coração durante a meditação?"
                                            className="w-full bg-background border border-border/50 rounded-xl px-4 py-3 text-foreground focus:ring-2 focus:ring-rose-500/50 outline-none transition-all min-h-[200px] resize-y leading-relaxed"
                                        />
                                    </div>
                                </div>

                                <div className="mt-8 flex flex-wrap gap-3">
                                    <Button
                                        onClick={handleSave}
                                        className="rounded-full bg-gradient-to-r from-rose-500 to-rose-600 text-white font-bold hover:shadow-lg hover:shadow-rose-500/20 px-8"
                                    >
                                        <Save className="w-4 h-4 mr-2" />
                                        Salvar
                                    </Button>

                                    <Button
                                        variant="outline"
                                        onClick={handleClear}
                                        className="rounded-full text-muted-foreground hover:text-destructive hover:bg-destructive/10 border-border/50"
                                    >
                                        <Trash2 className="w-4 h-4 mr-2" />
                                        Limpar
                                    </Button>
                                </div>
                            </div>
                        </div>

                        {/* Sidebar Data */}
                        <div className="space-y-6">
                            <div className="glass sacred-border p-6 rounded-3xl">
                                <h3 className="font-cinzel font-bold text-foreground mb-4">Suas Anotações</h3>
                                <p className="text-sm text-muted-foreground mb-6">
                                    Seu diário fica salvo apenas no seu dispositivo de forma privada garantindo a confidencialidade das suas orações.
                                </p>

                                <div className="flex items-center justify-between py-3 border-t border-b border-border/50 mb-6">
                                    <span className="text-sm font-medium text-muted-foreground">Total de dias salvos:</span>
                                    <span className="font-bold text-rose-500">{entries.length}</span>
                                </div>

                                <Button
                                    variant="outline"
                                    onClick={handleExport}
                                    disabled={entries.length === 0}
                                    className="w-full rounded-xl sacred-border"
                                >
                                    <Download className="w-4 h-4 mr-2" />
                                    Exportar Backup (JSON)
                                </Button>
                            </div>

                            {entries.length > 0 && (
                                <div className="glass sacred-border p-6 rounded-3xl">
                                    <h3 className="font-cinzel font-bold text-sm text-muted-foreground uppercase tracking-widest mb-4">
                                        Dias Anteriores
                                    </h3>
                                    <div className="space-y-3 max-h-[300px] overflow-y-auto pr-2">
                                        {entries.slice().reverse().map((entry) => (
                                            <div key={entry.id} className="p-3 bg-background/50 rounded-xl border border-border/50 opacity-70 hover:opacity-100 transition-opacity">
                                                <div className="text-xs font-bold text-foreground mb-1">{entry.date}</div>
                                                <div className="text-xs text-rose-500/80 mb-2 truncate">{entry.mystery}</div>
                                                <div className="text-xs text-muted-foreground line-clamp-2">{entry.content || entry.intentions || "Sem texto..."}</div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </main>
        </PageTransition>
    );
}
