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
  params: {
    categoria: string;
    slug: string;
  };
}

// ── Static params ─────────────────────────────────────────────────────────────

export async function generateStaticParams() {
  return getAllArticleParams();
}

// ── Metadata ─────────────────────────────────────────────────────────────────

export async function generateMetadata({ params }: Props) {
  const article = getArticle(params.categoria, params.slug);
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

export default function ArticlePage({ params }: Props) {
  const article = getArticle(params.categoria, params.slug);
  if (!article) notFound();

  const related = getRelatedArticles(params.categoria, params.slug, 3);
  const categoriaLabel = CATEGORIA_LABELS[params.categoria] ?? params.categoria;

  return (
    <ArticleLayout
      meta={article}
      related={related}
      relatedBasePath={`/ensinamentos/${params.categoria}`}
      breadcrumbBase={[
        { label: "Ensinamentos", path: "/ensinamentos" },
        {
          label: categoriaLabel,
          path: `/ensinamentos?tema=${params.categoria}`,
        },
      ]}
    >
      <MDXRemote source={article.content} />
    </ArticleLayout>
  );
}
