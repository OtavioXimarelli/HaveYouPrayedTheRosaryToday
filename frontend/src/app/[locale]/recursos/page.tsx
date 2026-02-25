"use client";

import { PageHeader } from "@/components/page-header";
import { PageTransition } from "@/components/page-transition";
import { BreadcrumbNav } from "@/components/learning/breadcrumb-nav";
import { 
  Library, 
  FileText, 
  Download, 
  ExternalLink,
  BookOpen,
  ArrowRight,
  ShieldCheck,
  Globe
} from "lucide-react";
import { useState } from "react";
import { ComingSoonModal } from "@/components/coming-soon-modal";
import { useTranslations, useLocale } from "next-intl";

export default function RecursosPage() {
  const [comingSoonOpen, setComingSoonOpen] = useState(false);
  const [selectedFeature, setSelectedFeature] = useState("");
  const t = useTranslations("Teachings.resources");
  const locale = useLocale();

  const documents = [
    {
      title: "Rosarium Virginis Mariae",
      author: locale === 'pt' ? "Papa São João Paulo II" : "Pope Saint John Paul II",
      year: "2002",
      description: locale === 'pt' ? "Carta Apostólica sobre o Santo Rosário que introduziu os Mistérios Luminosos." : "Apostolic Letter on the Holy Rosary that introduced the Luminous Mysteries.",
      icon: FileText,
      gradient: "from-gold-500 to-gold-600",
      url: locale === 'pt' ? "https://www.vatican.va/content/john-paul-ii/pt/apost_letters/2002/documents/hf_jp-ii_apl_20021016_rosarium-virginis-mariae.html" : "https://www.vatican.va/content/john-paul-ii/en/apost_letters/2002/documents/hf_jp-ii_apl_20021016_rosarium-virginis-mariae.html",
    },
    {
      title: locale === 'pt' ? "Catecismo da Igreja Católica" : "Catechism of the Catholic Church",
      author: locale === 'pt' ? "Santa Sé" : "Holy See",
      year: "1992",
      description: locale === 'pt' ? "Exposição completa da doutrina da Igreja Católica." : "Complete exposition of the doctrine of the Catholic Church.",
      icon: ShieldCheck,
      gradient: "from-blue-500 to-blue-600",
      url: locale === 'pt' ? "https://www.vatican.va/archive/ccc_portuguese/index_pt.htm" : "https://www.vatican.va/archive/ENG0015/_INDEX.HTM",
    },
    {
      title: "Marialis Cultus",
      author: locale === 'pt' ? "Papa São Paulo VI" : "Pope Saint Paul VI",
      year: "1974",
      description: locale === 'pt' ? "Exortação Apostólica para a reta ordenação e desenvolvimento do culto à Bem-aventurada Virgem Maria." : "Apostolic Exhortation for the right ordering and development of devotion to the Blessed Virgin Mary.",
      icon: FileText,
      gradient: "from-purple-500 to-purple-600",
      url: locale === 'pt' ? "https://www.vatican.va/content/paul-vi/pt/apost_exhortations/documents/hf_p-vi_exh_19740202_marialis-cultus.html" : "https://www.vatican.va/content/paul-vi/en/apost_exhortations/documents/hf_p-vi_exh_19740202_marialis-cultus.html",
    }
  ];

  const downloads = [
    {
      title: locale === 'pt' ? "Guia de Orações (PDF)" : "Prayer Guide (PDF)",
      size: "2.4 MB",
      description: locale === 'pt' ? "Compilado com as orações do Rosário e as meditações dos mistérios." : "Compiled with Rosary prayers and meditations on the mysteries.",
    },
    {
      title: locale === 'pt' ? "Estampas para Impressão" : "Printable Holy Cards",
      size: "15 MB",
      description: locale === 'pt' ? "Imagens de alta qualidade de Nossa Senhora e Santos devotos do Rosário." : "High-quality images of Our Lady and Saints devoted to the Rosary.",
    },
    {
      title: locale === 'pt' ? "Planilha de Exame de Consciência" : "Examination of Conscience Guide",
      size: "0.5 MB",
      description: locale === 'pt' ? "Guia prático para preparação para o Sacramento da Reconciliação." : "Practical guide for preparation for the Sacrament of Reconciliation.",
    }
  ];

  const handleDownloadClick = (title: string) => {
    setSelectedFeature(title);
    setComingSoonOpen(true);
  };

  return (
    <PageTransition>
      <main className="min-h-screen bg-background">
        <PageHeader
          title={t("title")}
          subtitle={t("subtitle")}
          icon="📚"
        />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <BreadcrumbNav items={[{ label: t("breadcrumb") }]} />

          {/* Featured Documents Section */}
          <section className="mb-16">
            <div className="flex items-center gap-3 mb-8">
              <Globe className="w-8 h-8 text-gold-500" />
              <h2 className="text-2xl sm:text-3xl font-cinzel font-bold text-foreground">{t("churchDocs")}</h2>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {documents.map((doc, i) => (
                <a
                  key={i}
                  href={doc.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group p-6 rounded-3xl glass sacred-border hover:-translate-y-2 transition-all duration-300 flex flex-col h-full"
                >
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${doc.gradient} flex items-center justify-center shadow-lg mb-6 group-hover:scale-110 transition-transform`}>
                    <doc.icon className="w-6 h-6 text-white" />
                  </div>
                  
                  <h3 className="text-xl font-cinzel font-bold text-foreground mb-1 group-hover:text-gold-500 transition-colors">
                    {doc.title}
                  </h3>
                  <div className="flex items-center gap-2 text-xs font-bold text-gold-600 dark:text-gold-400 uppercase tracking-widest mb-4">
                    <span>{doc.author}</span>
                    <span className="w-1 h-1 rounded-full bg-border" />
                    <span>{doc.year}</span>
                  </div>
                  
                  <p className="text-sm text-muted-foreground leading-relaxed flex-grow">
                    {doc.description}
                  </p>
                  
                  <div className="mt-6 flex items-center gap-2 text-sm font-bold text-foreground/70 group-hover:text-gold-500 transition-colors">
                    <span>{t("readVatican")}</span>
                    <ExternalLink className="w-4 h-4" />
                  </div>
                </a>
              ))}
            </div>
          </section>

          {/* Downloads Section */}
          <section className="mb-16">
            <div className="p-8 sm:p-12 rounded-[2.5rem] bg-gradient-to-br from-blue-500/10 via-blue-500/5 to-transparent border border-blue-500/20">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-10">
                <div className="flex items-center gap-5">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-xl">
                    <Download className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="font-cinzel font-bold text-foreground text-2xl lg:text-3xl">{t("downloadMaterials")}</h3>
                    <p className="text-blue-600 dark:text-blue-400 font-bold uppercase tracking-widest text-sm mt-1">{t("downloadSubtitle")}</p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {downloads.map((item, i) => (
                  <div
                    key={i}
                    onClick={() => handleDownloadClick(item.title)}
                    className="group p-6 rounded-2xl bg-background/50 backdrop-blur-sm border border-border/50 hover:border-blue-500/40 hover:-translate-y-1 transition-all duration-300 cursor-pointer"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <FileText className="w-8 h-8 text-blue-500" />
                      <span className="text-[10px] font-bold text-muted-foreground uppercase">{item.size}</span>
                    </div>
                    <h4 className="font-bold text-foreground mb-2 group-hover:text-blue-500 transition-colors">
                      {item.title}
                    </h4>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {item.description}
                    </p>
                    <div className="mt-4 flex items-center gap-2 text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest">
                      {t("downloadNow")}
                      <Download className="w-3 h-3" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Additional Resources */}
          <section>
            <h3 className="text-xl font-cinzel font-bold text-foreground mb-6">{t("usefulLinks")}</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { label: "Vatican News", url: "https://www.vaticannews.va/pt.html" },
                { label: "CNBB", url: "https://www.cnbb.org.br/" },
                { label: "Liturgia das Horas", url: "https://www.liturgiadiaria.org.br/" },
                { label: "Apostolado da Oração", url: "https://www.popesprayer.va/pt-pt/" }
              ].map((link, i) => (
                <a
                  key={i}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-4 rounded-xl glass sacred-border hover:bg-white/5 transition-all group"
                >
                  <span className="font-medium text-muted-foreground group-hover:text-foreground transition-colors">{link.label}</span>
                  <ArrowRight className="w-4 h-4 text-gold-500 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                </a>
              ))}
            </div>
          </section>
        </div>

        <ComingSoonModal 
          isOpen={comingSoonOpen}
          onClose={() => setComingSoonOpen(false)}
          featureName={selectedFeature}
        />
      </main>
    </PageTransition>
  );
}
