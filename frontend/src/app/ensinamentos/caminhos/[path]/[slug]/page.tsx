import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import {
  getCaminhoLesson,
  getAllCaminhoParams,
  getCaminhoLessons,
} from "@/lib/content";
import { ArticleLayout } from "@/components/learning/article-layout";

// ArticleLayout accepts meta with: title, slug, tema, level?, readingTime, tags[], excerpt, publishedAt

interface Props {
  params: Promise<{
    path: string;   // "iniciante" | "intermediario" | "avancado"
    slug: string;
  }>;
}

// ── Static params ─────────────────────────────────────────────────────────────

export async function generateStaticParams() {
  return getAllCaminhoParams();
}

// ── Metadata ─────────────────────────────────────────────────────────────────

export async function generateMetadata({ params }: Props) {
  const { path, slug } = await params;
  const lesson = getCaminhoLesson(path, slug);
  if (!lesson) return {};
  return {
    title: `${lesson.title} | Caminhos · ${capitalize(path)}`,
    description: lesson.excerpt,
    openGraph: {
      title: lesson.title,
      description: lesson.excerpt,
    },
  };
}

// ── Page ──────────────────────────────────────────────────────────────────────

const PATH_LABELS: Record<string, string> = {
  iniciante: "Iniciante",
  intermediario: "Intermediário",
  avancado: "Avançado",
};

function capitalize(s: string) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

export default async function CaminhoLessonPage({ params }: Props) {
  const { path, slug } = await params;
  const lesson = getCaminhoLesson(path, slug);
  if (!lesson) notFound();

  // Build sibling lessons for the sidebar (related = others in same path)
  const siblings = getCaminhoLessons(path).filter(
    (l) => l.slug !== slug
  );

  const pathLabel = PATH_LABELS[path] ?? capitalize(path);

  return (
    <ArticleLayout
      meta={lesson}
      related={siblings.slice(0, 3)}
      relatedBasePath={`/ensinamentos/caminhos/${path}`}
      breadcrumbBase={[
        { label: "Ensinamentos", path: "/ensinamentos" },
        {
          label: "Caminhos Sugeridos",
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
