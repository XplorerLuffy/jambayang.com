import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-[var(--border-gold)] mt-24">
      <div className="mx-auto max-w-7xl px-6 py-12 flex flex-col md:flex-row items-center justify-between gap-6">
        <p className="font-cormorant text-text-muted italic">
          Building AI-automated tools for Bhutanese businesses.
        </p>
        <div className="flex items-center gap-6 font-space-mono text-xs uppercase tracking-widest text-text-muted">
          <Link href="/contact" className="hover:text-gold transition-colors">
            Contact
          </Link>
          <span>© {new Date().getFullYear()} Jambayang Singye</span>
        </div>
      </div>
    </footer>
  );
}
