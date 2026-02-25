import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import {
  getArticle,
  getAllArticleParams,
  getRelatedArticles,
} from "@/lib/content";
import { ArticleLayout } from "@/components/learning/article-layout";
import { getTranslations } from "next-intl/server";

interface Props {
  params: Promise<{
    locale: string;
    categoria: string;
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return getAllArticleParams();
}

export async function generateMetadata({ params }: Props) {
  const { categoria, slug, locale } = await params;
  const article = getArticle(categoria, slug, locale);
  if (!article) return {};
  const t = await getTranslations({ locale, namespace: "Teachings" });
  return {
    title: `${article.title} | ${t("title")}`,
    description: article.excerpt,
    openGraph: {
      title: article.title,
      description: article.excerpt,
    },
  };
}

export default async function ArticlePage({ params }: Props) {
  const { categoria, slug, locale } = await params;
  const t = await getTranslations({ locale, namespace: "Teachings" });
  const article = getArticle(categoria, slug, locale);
  if (!article) notFound();

  const related = getRelatedArticles(categoria, slug, locale, 3);
  const categoriaLabel = t(`topics.${categoria}.title` as any);

  return (
    <ArticleLayout
      meta={article}
      related={related}
      relatedBasePath={`/ensinamentos/${categoria}`}
      breadcrumbBase={[
        { label: t("breadcrumb"), path: "/ensinamentos" },
        {
          label: categoriaLabel,
          path: `/ensinamentos/${categoria}`,
        },
      ]}
    >
      <MDXRemote source={article.content} />
    </ArticleLayout>
  );
}
