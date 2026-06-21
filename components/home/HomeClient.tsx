"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { motion } from "framer-motion";
import ScrollSection from "@/components/ScrollSection";
import { Project, Skill, ProofPoint, HeroSetting } from "@/lib/types";

const Scene3D = dynamic(() => import("@/components/Scene3D"), { ssr: false });

type HomeClientProps = {
  hero: HeroSetting | null;
  badges: string[];
  projects: Project[];
  skills: Skill[];
  proofPoints: ProofPoint[];
};

export default function HomeClient({
  hero,
  badges,
  projects,
  skills,
  proofPoints,
}: HomeClientProps) {
  const skillsByCategory = skills.reduce<Record<string, Skill[]>>((acc, s) => {
    (acc[s.category] ??= []).push(s);
    return acc;
  }, {});

  return (
    <main>
      {/* Hero */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        <Scene3D />
        <div className="relative z-10 mx-auto max-w-5xl px-6 pt-32 pb-20 text-center">
          <div className="available-badge justify-center mb-6">
            <span className="available-dot" />
            Available for work
          </div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="font-syne text-4xl md:text-6xl font-bold leading-tight shimmer-text"
          >
            {hero?.tagline ??
              "I build AI-automated websites and tools for Bhutanese businesses."}
          </motion.h1>
          <div className="mt-10 flex items-center justify-center gap-4">
            <Link href="/work" className="btn-gold">
              See the Work
            </Link>
            <Link href="/contact" className="btn-ghost">
              Start a Project
            </Link>
          </div>
        </div>
      </section>

      {/* Worked with badges */}
      {badges.length > 0 && (
        <div className="border-y border-[var(--border-gold)] bg-bg-card/40">
          <div className="mx-auto max-w-7xl px-6 py-6 flex flex-wrap items-center justify-center gap-x-10 gap-y-3 font-space-mono text-xs uppercase tracking-widest text-text-muted">
            {badges.map((b) => (
              <span key={b}>{b}</span>
            ))}
          </div>
        </div>
      )}

      {/* Proof points / stats */}
      <ScrollSection className="mx-auto max-w-7xl px-6 py-20">
        <h2 className="font-space-mono text-xs uppercase tracking-widest text-gold mb-10">
          Track Record
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {proofPoints.map((p) => (
            <div key={p.id} className="card-glow p-6">
              <p className="font-cormorant text-lg text-text-primary">{p.text}</p>
            </div>
          ))}
        </div>
      </ScrollSection>

      {/* Selected work */}
      <ScrollSection id="work" className="mx-auto max-w-7xl px-6 py-20">
        <div className="flex items-end justify-between mb-10">
          <h2 className="font-syne text-3xl font-bold">
            Selected <span className="gold-text">Work</span>
          </h2>
          <Link
            href="/work"
            className="font-space-mono text-xs uppercase tracking-widest text-gold hover:text-gold-light"
          >
            View All →
          </Link>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          {projects.slice(0, 4).map((project) => (
            <Link
              key={project.id}
              href={`/work/${project.slug}`}
              className="card-glow p-8 block"
            >
              <p className="font-space-mono text-xs uppercase tracking-widest text-gold mb-3">
                {project.tech_tags[0] ?? "Project"}
              </p>
              <h3 className="font-syne text-2xl font-bold mb-3">
                {project.title}
              </h3>
              <p className="text-text-muted font-cormorant text-lg">
                {project.summary}
              </p>
            </Link>
          ))}
        </div>
      </ScrollSection>

      {/* Skills */}
      <ScrollSection className="mx-auto max-w-7xl px-6 py-20">
        <h2 className="font-syne text-3xl font-bold mb-10">
          Technical <span className="gold-text">Arsenal</span>
        </h2>
        <div className="grid md:grid-cols-2 gap-12">
          {Object.entries(skillsByCategory).map(([category, items]) => (
            <div key={category}>
              <h3 className="font-space-mono text-xs uppercase tracking-widest text-text-muted mb-5">
                {category}
              </h3>
              <div className="space-y-5">
                {items.map((skill) => (
                  <div key={skill.id}>
                    <div className="flex justify-between mb-2 font-dm-sans text-sm">
                      <span>{skill.name}</span>
                    </div>
                    <div className="skill-bar-track">
                      <div
                        className="skill-bar-fill"
                        style={{ width: "100%" }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </ScrollSection>

      {/* Final CTA */}
      <ScrollSection className="mx-auto max-w-4xl px-6 py-32 text-center">
        <h2 className="font-syne text-4xl md:text-5xl font-bold mb-6">
          Ready to <span className="gold-text">Build?</span>
        </h2>
        <p className="font-cormorant text-xl text-text-muted mb-10">
          Let&apos;s automate something that pays for itself.
        </p>
        <Link href="/contact" className="btn-gold">
          Start a Project
        </Link>
      </ScrollSection>
    </main>
  );
}
