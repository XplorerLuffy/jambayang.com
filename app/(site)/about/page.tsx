import { getProofPoints, getPublishedTestimonials } from "@/lib/queries";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "About — Jambayang Singye",
  description:
    "Jambayang Singye builds AI-automated websites and tools for Bhutanese businesses, based in Gelephu, Bhutan.",
};

export default async function AboutPage() {
  const [proofPoints, testimonials] = await Promise.all([
    getProofPoints(),
    getPublishedTestimonials(),
  ]);

  return (
    <main className="mx-auto max-w-3xl px-6 pt-32 pb-24">
      <h1 className="font-syne text-4xl md:text-5xl font-bold mb-8">
        About <span className="gold-text">Me</span>
      </h1>
      <p className="font-cormorant text-xl leading-relaxed text-text-muted mb-4">
        I&apos;m Jambayang Singye, based in Gelephu, Bhutan. I build AI-automated
        websites and tools that help Bhutanese businesses run themselves —
        from POS systems to nightly profit reports.
      </p>
      <p className="font-cormorant text-xl leading-relaxed text-text-muted mb-16">
        Instead of just shipping a website and walking away, I build the
        automation underneath it: ordering systems, reporting pipelines, and
        AI agents that keep working after I&apos;m done.
      </p>

      <h2 className="font-space-mono text-xs uppercase tracking-widest text-gold mb-6">
        Track Record
      </h2>
      <ul className="space-y-4 mb-16">
        {proofPoints.map((p) => (
          <li key={p.id} className="font-cormorant text-lg flex gap-3">
            <span className="text-gold">—</span>
            {p.text}
          </li>
        ))}
      </ul>

      {testimonials.length > 0 && (
        <>
          <h2 className="font-space-mono text-xs uppercase tracking-widest text-gold mb-6">
            What People Say
          </h2>
          <div className="space-y-8">
            {testimonials.map((t) => (
              <div key={t.id} className="card-glow p-6">
                <p className="font-cormorant text-lg italic mb-4">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <p className="font-space-mono text-xs uppercase tracking-widest text-text-muted">
                  {t.name}
                  {t.role_company && ` — ${t.role_company}`}
                </p>
              </div>
            ))}
          </div>
        </>
      )}
    </main>
  );
}
