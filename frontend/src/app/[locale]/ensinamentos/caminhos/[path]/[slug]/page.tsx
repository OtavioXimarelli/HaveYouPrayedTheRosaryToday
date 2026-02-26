import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import {
  getCaminhoLesson,
  getAllCaminhoParams,
  getCaminhoLessons,
} from "@/lib/content";
import { ArticleLayout } from "@/components/learning/article-layout";
import { getTranslations } from "next-intl/server";

// ArticleLayout accepts meta with: title, slug, tema, level?, readingTime, tags[], excerpt, publishedAt

interface Props {
  params: Promise<{
    locale: string;
    path: string;   // "primeiros-passos" | "aprofundando" | "misterios-vivos"
    slug: string;
  }>;
}

// ── Static params ─────────────────────────────────────────────────────────────

export async function generateStaticParams() {
  return getAllCaminhoParams();
}

// ── Metadata ─────────────────────────────────────────────────────────────────

export async function generateMetadata({ params }: Props) {
  const { path, slug, locale } = await params;
  const lesson = getCaminhoLesson(path, slug, locale);
  if (!lesson) return {};
  return {
    title: `${lesson.title} | ${locale === 'en' ? 'Paths' : 'Caminhos'} · ${capitalize(path)}`,
    description: lesson.excerpt,
    openGraph: {
      title: lesson.title,
      description: lesson.excerpt,
    },
  };
}

// ── Page ──────────────────────────────────────────────────────────────────────

function capitalize(s: string) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

export default async function CaminhoLessonPage({ params }: Props) {
  const { path, slug, locale } = await params;
  const t = await getTranslations({ locale, namespace: "Teachings" });
  const lesson = getCaminhoLesson(path, slug, locale);
  if (!lesson) notFound();

  // Build sibling lessons for the sidebar (related = others in same path)
  const siblings = getCaminhoLessons(path, locale).filter(
    (l) => l.slug !== slug
  );

  const pathLabel = t(`pathLabels.${path}` as any);

  return (
    <ArticleLayout
      meta={lesson}
      related={siblings.slice(0, 3)}
      relatedBasePath={`/ensinamentos/caminhos/${path}`}
      breadcrumbBase={[
        { label: t("breadcrumb"), path: "/ensinamentos" },
        {
          label: t("pathLabels.sugeridos"),
          path: "/ensinamentos?tab=caminhos",
        },
        {
          label: pathLabel,
          path: `/ensinamentos/caminhos/${path}`,
        },
      ]}
    >
      <MDXRemote source={lesson.content} />
    </ArticleLayout>
  );
}
