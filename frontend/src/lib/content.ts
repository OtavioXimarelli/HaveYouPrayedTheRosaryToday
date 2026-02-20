/**
 * Content helpers - reads MDX files from /content at build time using fs + gray-matter.
 * All functions are server-side only (Node.js fs). Do NOT import in client components.
 *
 * Frontmatter schema:
 *   title:       string   - Article/lesson title
 *   slug:        string   - URL-safe identifier (matches filename without .mdx)
 *   tema:        string   - Category key (santos | teologia | historia | ...)
 *   level:       string   - "iniciante" | "intermediario" | "avancado" (optional)
 *   readingTime: string   - e.g. "10 min"
 *   tags:        string[] - Topic tags
 *   order:       number   - Sort order within a caminho (optional)
 *   excerpt:     string   - Short summary shown in cards
 *   publishedAt: string   - ISO date string
 */

import fs from "fs";
import path from "path";
import matter from "gray-matter";

const CONTENT_ROOT = path.join(process.cwd(), "content", "ensinamentos");

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

// ─── Ensinamentos (tema-based articles) ──────────────────────────────────────

/**
 * Get all articles for a given tema category.
 */
export function getArticlesByTema(tema: string): ArticleMeta[] {
  const dir = path.join(CONTENT_ROOT, tema);
  return getMdxFiles(dir)
    .map((file) => {
      const { data } = readMdx(path.join(dir, file));
      return data;
    })
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
}

/**
 * Get a single article by tema + slug.
 */
export function getArticle(tema: string, slug: string): Article | null {
  const filePath = path.join(CONTENT_ROOT, tema, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;
  const { data, content } = readMdx(filePath);
  return { ...data, content };
}

/**
 * Get all [tema, slug] pairs for generateStaticParams.
 */
export function getAllArticleParams(): { categoria: string; slug: string }[] {
  const temas = fs.existsSync(CONTENT_ROOT)
    ? fs.readdirSync(CONTENT_ROOT, { withFileTypes: true })
        .filter((d) => d.isDirectory() && d.name !== "caminhos")
        .map((d) => d.name)
    : [];

  return temas.flatMap((tema) =>
    getMdxFiles(path.join(CONTENT_ROOT, tema)).map((file) => ({
      categoria: tema,
      slug: file.replace(".mdx", ""),
    }))
  );
}

// ─── Caminhos (guided path lessons) ─────────────────────────────────────────

/**
 * Get all lessons for a given caminho path, sorted by `order`.
 */
export function getCaminhoLessons(caminho: string): ArticleMeta[] {
  const dir = path.join(CONTENT_ROOT, "caminhos", caminho);
  return getMdxFiles(dir)
    .map((file) => {
      const { data } = readMdx(path.join(dir, file));
      return data;
    })
    .sort((a, b) => (a.order ?? 99) - (b.order ?? 99));
}

/**
 * Get a single lesson by caminho + slug.
 */
export function getCaminhoLesson(caminho: string, slug: string): Article | null {
  const filePath = path.join(CONTENT_ROOT, "caminhos", caminho, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;
  const { data, content } = readMdx(filePath);
  return { ...data, content };
}

/**
 * Get all [path, slug] pairs for generateStaticParams.
 */
export function getAllCaminhoParams(): { path: string; slug: string }[] {
  const caminhos = ["iniciante", "intermediario", "avancado"];
  return caminhos.flatMap((caminho) =>
    getMdxFiles(path.join(CONTENT_ROOT, "caminhos", caminho)).map((file) => ({
      path: caminho,
      slug: file.replace(".mdx", ""),
    }))
  );
}

/**
 * Get related articles in the same tema (excluding current slug).
 */
export function getRelatedArticles(tema: string, currentSlug: string, limit = 3): ArticleMeta[] {
  return getArticlesByTema(tema)
    .filter((a) => a.slug !== currentSlug)
    .slice(0, limit);
}
