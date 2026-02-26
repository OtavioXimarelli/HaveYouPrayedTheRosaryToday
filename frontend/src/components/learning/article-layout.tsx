"use client";

import { Clock, Tag, ArrowLeft, BookOpen } from "lucide-react";
import { useRouter } from "@/i18n/routing";
import { BreadcrumbNav } from "./breadcrumb-nav";
import { useTranslations, useLocale } from "next-intl";

interface ArticleMeta {
  title: string;
  slug: string;
  tema: string;
  level?: string;
  readingTime: string;
  tags: string[];
  excerpt: string;
  publishedAt: string;
}

interface RelatedArticle {
  title: string;
  slug: string;
  excerpt: string;
  readingTime: string;
}

interface ArticleLayoutProps {
  /** Frontmatter from the MDX file */
  meta: ArticleMeta;
  /** Rendered MDX children */
  children: React.ReactNode;
  /** Optional related articles for the sidebar */
  related?: RelatedArticle[];
  /** Breadcrumb items — category + article title appended automatically */
  breadcrumbBase?: { label: string; path: string }[];
  /** Base URL for related article links, e.g. "/ensinamentos/santos" */
  relatedBasePath?: string;
}

export function ArticleLayout({
  meta,
  children,
  related = [],
  breadcrumbBase = [],
  relatedBasePath,
}: ArticleLayoutProps) {
  const router = useRouter();
  const t = useTranslations("Article");
  const teachingsT = useTranslations("Teachings");
  const locale = useLocale();

  const LEVEL_LABELS: Record<string, { label: string; color: string }> = {
    "primeiros-passos": {
      label: teachingsT("pathLabels.primeiros-passos"),
      color: "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/30",
    },
    aprofundando: {
      label: teachingsT("pathLabels.aprofundando"),
      color: "bg-gold-500/15 text-gold-700 dark:text-gold-400 border-gold-500/30",
    },
    "misterios-vivos": {
      label: teachingsT("pathLabels.misterios-vivos"),
      color: "bg-purple-500/15 text-purple-700 dark:text-purple-400 border-purple-500/30",
    },
  };

  const levelInfo = meta.level ? LEVEL_LABELS[meta.level] : null;
  const temaLabel = teachingsT(`topics.${meta.tema}.title` as any);

  const breadcrumbItems = [
    ...breadcrumbBase,
    { label: meta.title },
  ];

  const resolvedRelatedBasePath =
    relatedBasePath ?? `/ensinamentos/${meta.tema}`;

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Breadcrumb */}
        <BreadcrumbNav items={breadcrumbItems} />

        <div className="flex flex-col lg:flex-row gap-10 xl:gap-16">
          {/* ── Main Content ─────────────────────────────────────────── */}
          <article className="flex-1 min-w-0">
            {/* Header */}
            <header className="mb-8">
              {/* Topic + Level badges */}
              <div className="flex flex-wrap items-center gap-2 mb-4">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-sacred-blue/10 text-sacred-blue dark:text-sky-300 border border-sacred-blue/20">
                  <BookOpen className="w-3 h-3" />
                  {temaLabel}
                </span>
                {levelInfo && (
                  <span
                    className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border ${levelInfo.color}`}
                  >
                    {levelInfo.label}
                  </span>
                )}
              </div>

              {/* Title */}
              <h1 className="font-cinzel text-3xl sm:text-4xl font-bold text-foreground leading-tight mb-4">
                {meta.title}
              </h1>

              {/* Excerpt */}
              <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                {meta.excerpt}
              </p>

              {/* Meta row */}
              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground border-t border-b border-border/50 py-4">
                <span className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4" />
                  {meta.readingTime}
                </span>
                <span className="flex items-center gap-1.5">
                  <Tag className="w-4 h-4" />
                  {meta.tags.join(", ")}
                </span>
                <span className="ml-auto text-xs">
                  {new Date(meta.publishedAt).toLocaleDateString(locale === 'pt' ? "pt-BR" : "en-US", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </span>
              </div>
            </header>

            {/* Introductory Card */}
            <div className="mb-12 p-6 sm:p-8 rounded-2xl border border-gold-500/15 bg-gradient-to-br from-gold-500/[0.04] to-transparent">
              <p className="text-muted-foreground text-[1.1rem] leading-[1.9] italic">
                {meta.excerpt}
              </p>
            </div>

            {/* MDX Body */}
            <div className="
              prose prose-lg dark:prose-invert max-w-none
              
              prose-headings:font-cinzel prose-headings:text-foreground prose-headings:tracking-wide
              prose-h2:text-2xl prose-h2:mt-14 prose-h2:mb-5 prose-h2:pb-3 prose-h2:border-b prose-h2:border-gold-500/20
              prose-h3:text-xl prose-h3:mt-10 prose-h3:mb-4
              prose-h4:text-lg prose-h4:mt-8 prose-h4:mb-3

              prose-p:text-muted-foreground prose-p:leading-[1.85] prose-p:mb-6 prose-p:text-[1.05rem]
              prose-a:text-gold-600 dark:prose-a:text-gold-400 prose-a:no-underline hover:prose-a:underline prose-a:font-medium
              prose-strong:text-foreground prose-strong:font-semibold
              prose-em:text-foreground/80

              prose-blockquote:border-l-4 prose-blockquote:border-gold-500 prose-blockquote:bg-gold-500/5 prose-blockquote:rounded-r-xl prose-blockquote:py-4 prose-blockquote:px-6 prose-blockquote:my-8 prose-blockquote:not-italic
              prose-blockquote:text-foreground/80 prose-blockquote:text-[1rem] prose-blockquote:leading-relaxed
              [&_blockquote_p]:before:content-none [&_blockquote_p]:after:content-none

              prose-ul:text-muted-foreground prose-ul:my-6 prose-ul:space-y-2
              prose-ol:text-muted-foreground prose-ol:my-6 prose-ol:space-y-2
              prose-li:text-[1.05rem] prose-li:leading-relaxed
              [&_ul_li]:marker:text-gold-500 [&_ol_li]:marker:text-gold-500 [&_ol_li]:marker:font-semibold

              prose-hr:border-border/30 prose-hr:my-12

              prose-table:border prose-table:border-border/50 prose-table:rounded-xl prose-table:overflow-hidden
              prose-th:bg-muted/50 prose-th:font-cinzel prose-th:text-sm prose-th:uppercase prose-th:tracking-wider prose-th:text-foreground/70
              prose-td:text-muted-foreground prose-td:border-border/30

              prose-code:text-gold-700 dark:prose-code:text-gold-300 prose-code:font-normal prose-code:before:content-none prose-code:after:content-none
              prose-pre:bg-muted/50 prose-pre:border prose-pre:border-border/50 prose-pre:rounded-2xl

              prose-img:rounded-2xl prose-img:shadow-lg prose-img:my-8
            ">
              {children}
            </div>

            {/* Back button */}
            <div className="mt-12 pt-8 border-t border-border/50">
              <button
                onClick={() => router.back()}
                className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-gold-600 dark:hover:text-gold-400 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                {t("back")}
              </button>
            </div>
          </article>

          {/* ── Sidebar ──────────────────────────────────────────────── */}
          {related.length > 0 && (
            <aside className="lg:w-72 xl:w-80 flex-shrink-0">
              <div className="sticky top-24">
                <h3 className="font-cinzel text-sm font-bold uppercase tracking-widest text-muted-foreground mb-4">
                  {t("related")}
                </h3>
                <div className="flex flex-col gap-3">
                  {related.map((item) => (
                    <button
                      key={item.slug}
                      onClick={() =>
                        router.push(`${resolvedRelatedBasePath}/${item.slug}`)
                      }
                      className="group text-left glass sacred-border p-4 rounded-xl hover:shadow-gold-glow transition-all duration-300 hover:-translate-y-0.5"
                    >
                      <h4 className="font-cinzel text-sm font-semibold text-foreground group-hover:text-gold-600 dark:group-hover:text-gold-400 mb-1 transition-colors line-clamp-2">
                        {item.title}
                      </h4>
                      <p className="text-xs text-muted-foreground line-clamp-2 mb-2">
                        {item.excerpt}
                      </p>
                      <span className="flex items-center gap-1 text-xs text-muted-foreground/70">
                        <Clock className="w-3 h-3" />
                        {item.readingTime}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </aside>
          )}
        </div>
      </div>
    </div>
  );
}
