"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const NAV_LINKS = [
  { label: "Work", href: "/work" },
  { label: "Process", href: "/process" },
  { label: "Pricing", href: "/pricing" },
  { label: "About", href: "/about" },
  { label: "Blog", href: "/blog" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-colors duration-300 ${
        scrolled ? "bg-bg/80 backdrop-blur-md border-b border-[var(--border-gold)]" : ""
      }`}
    >
      <nav className="mx-auto max-w-7xl flex items-center justify-between px-6 py-5">
        <Link href="/" className="font-syne text-lg font-bold tracking-wide">
          JAMBAYANG<span className="gold-text">.</span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="font-space-mono text-xs uppercase tracking-widest text-text-muted hover:text-gold transition-colors"
            >
              {link.label}
            </Link>
          ))}
          <Link href="/contact" className="btn-gold">
            Contact
          </Link>
        </div>

        <button
          className="md:hidden text-text-primary"
          onClick={() => setOpen(true)}
          aria-label="Open menu"
        >
          <Menu />
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="md:hidden fixed inset-0 bg-bg z-50 flex flex-col"
          >
            <div className="flex justify-end p-6">
              <button onClick={() => setOpen(false)} aria-label="Close menu">
                <X />
              </button>
            </div>
            <div className="flex flex-col items-center justify-center flex-1 gap-8">
              {[...NAV_LINKS, { label: "Contact", href: "/contact" }].map(
                (link, i) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className="font-syne text-3xl font-bold"
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                )
              )}
            </div>
            <div className="text-center pb-10 font-space-mono text-xs text-text-muted tracking-widest">
              GELEPHU, BHUTAN 🇧🇹
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
