"use client";

import { useRouter } from "next/navigation";
import { PageHeader } from "@/components/page-header";
import { PageTransition } from "@/components/page-transition";
import { BreadcrumbNav } from "@/components/learning/breadcrumb-nav";
import { LockedContent } from "@/components/locked-content";
import { Button } from "@/components/ui/button";
import { 
  Download, Book, Link2, FileText, ExternalLink,
  ArrowRight, ChevronRight, BookOpen, ScrollText, FileDown
} from "lucide-react";

export default function RecursosPage() {
  const router = useRouter();
  const isLoggedIn = false;

  const categories = [
    {
      id: "downloads",
      title: "Downloads",
      description: "Cartões de oração, novenas e guias para imprimir",
      icon: Download,
      gradient: "from-emerald-500 to-emerald-600",
      count: "12 arquivos",
      path: "/recursos/downloads",
      isLocked: !isLoggedIn
    },
    {
      id: "biblioteca",
      title: "Biblioteca",
      description: "Documentos papais, escritos de santos e catecismo",
      icon: Book,
      gradient: "from-blue-500 to-blue-600",
      count: "8 documentos",
      path: "/recursos/biblioteca",
      isLocked: !isLoggedIn
    },
    {
      id: "links",
      title: "Links Úteis",
      description: "Recursos católicos externos selecionados",
      icon: Link2,
      gradient: "from-purple-500 to-purple-600",
      count: "20+ links",
      path: "/recursos/links",
      isLocked: false
    }
  ];

  const featuredResources = [
    {
      title: "Rosarium Virginis Mariae",
      author: "Papa São João Paulo II",
      type: "Carta Apostólica",
      year: "2002",
      description: "O documento que introduziu os Mistérios Luminosos",
      isLocked: !isLoggedIn
    },
    {
      title: "O Segredo do Rosário",
      author: "São Luís de Montfort",
      type: "Livro",
      year: "1710",
      description: "Clássico sobre os frutos e métodos do Rosário",
      isLocked: !isLoggedIn
    },
    {
      title: "Catecismo - Seção Mariana",
      author: "Igreja Católica",
      type: "Catecismo",
      year: "1992",
      description: "O que a Igreja ensina sobre Maria",
      isLocked: !isLoggedIn
    }
  ];

  const externalLinks = [
    { name: "Vatican - Rosário", url: "https://www.vatican.va/special/rosary/", description: "Página oficial do Vaticano" },
    { name: "CNBB", url: "https://www.cnbb.org.br/", description: "Conferência Nacional dos Bispos" },
    { name: "Cancion Nova", url: "https://www.cancaonova.com/", description: "Conteúdo católico em português" }
  ];

  return (
    <PageTransition>
      <main className="min-h-screen bg-background">
        <PageHeader
          title="Biblioteca de Recursos"
          subtitle="Materiais para aprofundar sua devoção"
          icon="📚"
        />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <BreadcrumbNav items={[{ label: "Recursos" }]} />

          {/* Hero Section */}
          <section className="mb-12">
            <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-gold-500/5 to-gold-600/5 border border-gold-500/20">
              <p className="text-lg text-muted-foreground leading-relaxed">
                Uma coleção curada de <span className="text-gold-600 dark:text-gold-400 font-semibold">documentos oficiais, escritos de santos e recursos práticos</span> para 
                enriquecer sua compreensão e prática do Rosário. Tudo gratuito e de fontes confiáveis.
              </p>
            </div>
          </section>

          {/* Categories */}
          <section className="mb-12">
            <h2 className="text-2xl font-cinzel font-bold text-foreground mb-6">Categorias</h2>
            
            <div className="grid sm:grid-cols-3 gap-6">
              {categories.map((cat) => (
                <div
                  key={cat.id}
                  onClick={() => !cat.isLocked && router.push(cat.path)}
                  className={`group p-6 rounded-2xl transition-all duration-300 text-center ${
                    cat.isLocked
                      ? "glass opacity-70 cursor-not-allowed"
                      : "glass sacred-border cursor-pointer hover:-translate-y-1 hover:shadow-gold-glow"
                  }`}
                  data-testid={`category-${cat.id}`}
                >
                  <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br ${cat.gradient} flex items-center justify-center shadow-lg ${
                    cat.isLocked ? "opacity-50" : "group-hover:scale-105 transition-transform"
                  }`}>
                    <cat.icon className="w-8 h-8 text-white" />
                  </div>
                  
                  {cat.isLocked && (
                    <span className="text-xs px-2 py-0.5 rounded-full bg-muted text-muted-foreground font-semibold mb-2 inline-block">
                      Requer login
                    </span>
                  )}
                  
                  <h3 className={`font-cinzel font-bold text-lg mb-1 ${
                    cat.isLocked ? "text-muted-foreground" : "text-foreground group-hover:text-gold-600 dark:group-hover:text-gold-400"
                  } transition-colors`}>
                    {cat.title}
                  </h3>
                  
                  <p className="text-muted-foreground text-sm mb-2">{cat.description}</p>
                  <p className="text-gold-600 dark:text-gold-400 text-xs font-semibold">{cat.count}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Featured Documents */}
          <section className="mb-12">
            <h2 className="text-2xl font-cinzel font-bold text-foreground mb-6">Documentos em Destaque</h2>
            
            <div className="space-y-4">
              {featuredResources.map((resource, i) => (
                <div
                  key={i}
                  className={`p-5 rounded-2xl transition-all duration-300 ${
                    resource.isLocked
                      ? "glass opacity-70"
                      : "glass sacred-border hover:-translate-y-0.5 hover:shadow-lg cursor-pointer"
                  }`}
                  data-testid={`resource-${i}`}
                >
                  <div className="flex items-start gap-4">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br from-gold-500 to-gold-600 flex items-center justify-center shadow-lg flex-shrink-0 ${
                      resource.isLocked ? "opacity-50" : ""
                    }`}>
                      <FileText className="w-6 h-6 text-white" />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs px-2 py-0.5 rounded-full bg-gold-500/20 text-gold-600 dark:text-gold-400 font-semibold">
                          {resource.type}
                        </span>
                        <span className="text-xs text-muted-foreground">{resource.year}</span>
                        {resource.isLocked && (
                          <span className="text-xs px-2 py-0.5 rounded-full bg-muted text-muted-foreground font-semibold">
                            Requer login
                          </span>
                        )}
                      </div>
                      
                      <h3 className={`font-cinzel font-bold text-lg ${
                        resource.isLocked ? "text-muted-foreground" : "text-foreground"
                      }`}>
                        {resource.title}
                      </h3>
                      <p className="text-gold-600 dark:text-gold-400 text-sm font-medium">{resource.author}</p>
                      <p className="text-muted-foreground text-sm mt-1">{resource.description}</p>
                    </div>

                    {!resource.isLocked && (
                      <Button variant="ghost" size="icon" className="rounded-full">
                        <ChevronRight className="w-5 h-5 text-gold-500" />
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* External Links (Free for all) */}
          <section className="mb-12">
            <h2 className="text-2xl font-cinzel font-bold text-foreground mb-6">Links Úteis</h2>
            
            <div className="p-6 rounded-2xl glass sacred-border">
              <p className="text-muted-foreground mb-4 text-sm">
                Recursos católicos externos de confiança:
              </p>
              <div className="space-y-3">
                {externalLinks.map((link, i) => (
                  <a
                    key={i}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-3 rounded-xl bg-muted/50 hover:bg-muted transition-colors group"
                    data-testid={`external-link-${i}`}
                  >
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-gold-500/20 to-gold-600/20 flex items-center justify-center">
                      <ExternalLink className="w-5 h-5 text-gold-600 dark:text-gold-400" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-foreground group-hover:text-gold-600 dark:group-hover:text-gold-400 transition-colors">
                        {link.name}
                      </p>
                      <p className="text-xs text-muted-foreground">{link.description}</p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-gold-500 group-hover:translate-x-1 transition-all" />
                  </a>
                ))}
              </div>
            </div>
          </section>

          {/* CTA for non-logged users */}
          {!isLoggedIn && (
            <LockedContent
              title="Acesse a biblioteca completa"
              description="Crie sua conta gratuita para baixar todos os recursos, salvar favoritos e receber atualizações."
              featureList={[
                "Downloads de cartões e novenas",
                "Documentos papais completos",
                "Escritos de santos em PDF",
                "Atualizações de novos recursos"
              ]}
            />
          )}
        </div>
      </main>
    </PageTransition>
  );
}
