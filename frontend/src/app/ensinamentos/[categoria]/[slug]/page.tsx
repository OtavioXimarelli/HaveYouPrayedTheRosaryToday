import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import {
  getArticle,
  getAllArticleParams,
  getRelatedArticles,
} from "@/lib/content";
import { ArticleLayout } from "@/components/learning/article-layout";

// ArticleLayout accepts meta with: title, slug, tema, level?, readingTime, tags[], excerpt, publishedAt

interface Props {
  params: Promise<{
    categoria: string;
    slug: string;
  }>;
}

// ── Static params ─────────────────────────────────────────────────────────────

export async function generateStaticParams() {
  return getAllArticleParams();
}

// ── Metadata ─────────────────────────────────────────────────────────────────

export async function generateMetadata({ params }: Props) {
  const { categoria, slug } = await params;
  const article = getArticle(categoria, slug);
  if (!article) return {};
  return {
    title: `${article.title} | Ensinamentos`,
    description: article.excerpt,
    openGraph: {
      title: article.title,
      description: article.excerpt,
    },
  };
}

// ── Page ──────────────────────────────────────────────────────────────────────

const CATEGORIA_LABELS: Record<string, string> = {
  santos: "Santos",
  teologia: "Teologia",
  historia: "História",
  oracoes: "Orações",
  sacramentos: "Sacramentos",
  maria: "Maria",
  escritura: "Escritura",
};

export default async function ArticlePage({ params }: Props) {
  const { categoria, slug } = await params;
  const article = getArticle(categoria, slug);
  if (!article) notFound();

  const related = getRelatedArticles(categoria, slug, 3);
  const categoriaLabel = CATEGORIA_LABELS[categoria] ?? categoria;

  return (
    <ArticleLayout
      meta={article}
      related={related}
      relatedBasePath={`/ensinamentos/${categoria}`}
      breadcrumbBase={[
        { label: "Ensinamentos", path: "/ensinamentos" },
        {
          label: categoriaLabel,
          path: `/ensinamentos?tema=${categoria}`,
        },
      ]}
    >
      <MDXRemote source={article.content} />
    </ArticleLayout>
  );
}
