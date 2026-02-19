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
  params: {
    path: string;   // "iniciante" | "intermediario" | "avancado"
    slug: string;
  };
}

// ── Static params ─────────────────────────────────────────────────────────────

export async function generateStaticParams() {
  return getAllCaminhoParams();
}

// ── Metadata ─────────────────────────────────────────────────────────────────

export async function generateMetadata({ params }: Props) {
  const lesson = getCaminhoLesson(params.path, params.slug);
  if (!lesson) return {};
  return {
    title: `${lesson.title} | Caminhos · ${capitalize(params.path)}`,
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

export default function CaminhoLessonPage({ params }: Props) {
  const lesson = getCaminhoLesson(params.path, params.slug);
  if (!lesson) notFound();

  // Build sibling lessons for the sidebar (related = others in same path)
  const siblings = getCaminhoLessons(params.path).filter(
    (l) => l.slug !== params.slug
  );

  const pathLabel = PATH_LABELS[params.path] ?? capitalize(params.path);

  return (
    <ArticleLayout
      meta={lesson}
      related={siblings.slice(0, 3)}
      relatedBasePath={`/ensinamentos/caminhos/${params.path}`}
      breadcrumbBase={[
        { label: "Ensinamentos", path: "/ensinamentos" },
        {
          label: "Caminhos Sugeridos",
          path: "/ensinamentos?tab=caminhos",
        },
        {
          label: pathLabel,
          path: `/ensinamentos/caminhos/${params.path}`,
        },
      ]}
    >
      <MDXRemote source={lesson.content} />
    </ArticleLayout>
  );
}
