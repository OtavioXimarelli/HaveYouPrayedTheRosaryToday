/**
 * Content helpers - reads MDX files from /content at build time using fs + gray-matter.
 * All functions are server-side only (Node.js fs). Do NOT import in client components.
 */

import fs from "fs";
import path from "path";
import matter from "gray-matter";

const CONTENT_ROOT = path.join(process.cwd(), "content");

// ─── Types ───────────────────────────────────────────────────────────────────

export interface ArticleFrontmatter {
  title: string;
  slug: string;
  tema: string;
  level?: string;
  readingTime: string;
  tags: string[];
  order?: number;
  excerpt: string;
  publishedAt: string;
}

export interface Article extends ArticleFrontmatter {
  content: string; // raw MDX string
}

export interface ArticleMeta extends ArticleFrontmatter {
  // no content — lightweight, used in listing pages
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

function readMdx(filePath: string): { data: ArticleFrontmatter; content: string } {
  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);
  return { data: data as ArticleFrontmatter, content };
}

function getMdxFiles(dir: string): string[] {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir).filter((f) => f.endsWith(".mdx"));
}

function getRootForLocale(locale: string): string {
  return path.join(CONTENT_ROOT, locale, "ensinamentos");
}

// ─── Ensinamentos (tema-based articles) ──────────────────────────────────────

/**
 * Get all articles for a given tema category and locale.
 */
export function getArticlesByTema(tema: string, locale: string = "pt"): ArticleMeta[] {
  const dir = path.join(getRootForLocale(locale), tema);
  return getMdxFiles(dir)
    .map((file) => {
      const { data } = readMdx(path.join(dir, file));
      return data;
    })
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
}

/**
 * Get a single article by tema + slug + locale.
 */
export function getArticle(tema: string, slug: string, locale: string = "pt"): Article | null {
  const filePath = path.join(getRootForLocale(locale), tema, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;
  const { data, content } = readMdx(filePath);
  return { ...data, content };
}

/**
 * Get all [locale, tema, slug] pairs for generateStaticParams.
 */
export function getAllArticleParams(): { locale: string; categoria: string; slug: string }[] {
  const locales = ["pt", "en"];
  
  return locales.flatMap(locale => {
    const root = getRootForLocale(locale);
    const temas = fs.existsSync(root)
      ? fs.readdirSync(root, { withFileTypes: true })
          .filter((d) => d.isDirectory() && d.name !== "caminhos")
          .map((d) => d.name)
      : [];

    return temas.flatMap((tema) =>
      getMdxFiles(path.join(root, tema)).map((file) => ({
        locale,
        categoria: tema,
        slug: file.replace(".mdx", ""),
      }))
    );
  });
}

// ─── Caminhos (guided path lessons) ─────────────────────────────────────────

/**
 * Get all lessons for a given caminho path and locale, sorted by `order`.
 */
export function getCaminhoLessons(caminho: string, locale: string = "pt"): ArticleMeta[] {
  const dir = path.join(getRootForLocale(locale), "caminhos", caminho);
  return getMdxFiles(dir)
    .map((file) => {
      const { data } = readMdx(path.join(dir, file));
      return data;
    })
    .sort((a, b) => (a.order ?? 99) - (b.order ?? 99));
}

/**
 * Get a single lesson by caminho + slug + locale.
 */
export function getCaminhoLesson(caminho: string, slug: string, locale: string = "pt"): Article | null {
  const filePath = path.join(getRootForLocale(locale), "caminhos", caminho, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;
  const { data, content } = readMdx(filePath);
  return { ...data, content };
}

/**
 * Get all [locale, path, slug] pairs for generateStaticParams.
 */
export function getAllCaminhoParams(): { locale: string; path: string; slug: string }[] {
  const locales = ["pt", "en"];
  const caminhos = ["iniciante", "intermediario", "avancado"];
  
  return locales.flatMap(locale => 
    caminhos.flatMap((caminho) =>
      getMdxFiles(path.join(getRootForLocale(locale), "caminhos", caminho)).map((file) => ({
        locale,
        path: caminho,
        slug: file.replace(".mdx", ""),
      }))
    )
  );
}

/**
 * Get related articles in the same tema (excluding current slug) for a locale.
 */
export function getRelatedArticles(tema: string, currentSlug: string, locale: string = "pt", limit = 3): ArticleMeta[] {
  return getArticlesByTema(tema, locale)
    .filter((a) => a.slug !== currentSlug)
    .slice(0, limit);
}
