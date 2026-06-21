import { notFound } from "next/navigation";
import { getProjectBySlug } from "@/lib/queries";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) return {};
  return {
    title: `${project.title} — Jambayang Singye`,
    description: project.summary,
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) notFound();

  const sections = [
    { label: "Problem", body: project.problem },
    { label: "Process", body: project.process },
    { label: "Result", body: project.result },
  ].filter((s) => s.body);

  return (
    <main className="mx-auto max-w-3xl px-6 pt-32 pb-24">
      <div className="flex flex-wrap gap-2 mb-6">
        {project.tech_tags.map((tag) => (
          <span
            key={tag}
            className="font-space-mono text-xs uppercase tracking-widest text-gold border border-[var(--border-gold)] px-2 py-1"
          >
            {tag}
          </span>
        ))}
      </div>
      <h1 className="font-syne text-4xl md:text-5xl font-bold mb-6">
        {project.title}
      </h1>
      <p className="font-cormorant text-xl text-text-muted mb-12">
        {project.summary}
      </p>

      <div className="space-y-10">
        {sections.map((section) => (
          <div key={section.label}>
            <h2 className="font-space-mono text-xs uppercase tracking-widest text-gold mb-3">
              {section.label}
            </h2>
            <p className="font-cormorant text-lg leading-relaxed">
              {section.body}
            </p>
          </div>
        ))}
      </div>

      {project.live_url && (
        <a
          href={project.live_url}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-gold inline-block mt-12"
        >
          Visit Live Site
        </a>
      )}
    </main>
  );
}
