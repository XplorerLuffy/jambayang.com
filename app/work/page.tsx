import Link from "next/link";
import { getProjects } from "@/lib/queries";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Work — Jambayang Singye",
  description: "Case studies of AI-automated tools and websites I've built for Bhutanese businesses.",
};

export default async function WorkPage() {
  const projects = await getProjects();

  return (
    <main className="mx-auto max-w-7xl px-6 pt-32 pb-24">
      <h1 className="font-syne text-4xl md:text-5xl font-bold mb-4">
        Selected <span className="gold-text">Work</span>
      </h1>
      <p className="font-cormorant text-xl text-text-muted mb-16 max-w-2xl">
        Real tools, shipped and running for real businesses across Bhutan.
      </p>
      <div className="grid md:grid-cols-2 gap-6">
        {projects.map((project) => (
          <Link
            key={project.id}
            href={`/work/${project.slug}`}
            className="card-glow p-8 block"
          >
            <div className="flex flex-wrap gap-2 mb-4">
              {project.tech_tags.map((tag) => (
                <span
                  key={tag}
                  className="font-space-mono text-xs uppercase tracking-widest text-gold border border-[var(--border-gold)] px-2 py-1"
                >
                  {tag}
                </span>
              ))}
            </div>
            <h2 className="font-syne text-2xl font-bold mb-3">
              {project.title}
            </h2>
            <p className="text-text-muted font-cormorant text-lg">
              {project.summary}
            </p>
          </Link>
        ))}
      </div>
    </main>
  );
}
