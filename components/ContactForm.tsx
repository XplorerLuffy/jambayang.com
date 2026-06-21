"use client";

import { useState, FormEvent } from "react";
import { Check } from "lucide-react";
import { submitContactMessage } from "@/lib/queries";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!name.trim() || !message.trim()) {
      setError("Name and message are required.");
      return;
    }
    if (!EMAIL_RE.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    setError(null);
    setSubmitting(true);
    try {
      await submitContactMessage({ name, email, message });
      setSent(true);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  if (sent) {
    return (
      <div className="text-center py-16">
        <div className="mx-auto mb-6 w-14 h-14 rounded-full border border-gold flex items-center justify-center">
          <Check className="text-gold" />
        </div>
        <h2 className="font-syne text-2xl font-bold mb-2">Message Sent!</h2>
        <p className="font-cormorant text-lg text-text-muted">
          I&apos;ll be in touch within 24 hours.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div>
        <label className="block font-space-mono text-xs uppercase tracking-widest text-text-muted mb-2">
          Name
        </label>
        <input
          className="form-input"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your name"
        />
      </div>
      <div>
        <label className="block font-space-mono text-xs uppercase tracking-widest text-text-muted mb-2">
          Email
        </label>
        <input
          type="email"
          className="form-input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
        />
      </div>
      <div>
        <label className="block font-space-mono text-xs uppercase tracking-widest text-text-muted mb-2">
          Message
        </label>
        <textarea
          className="form-input"
          rows={5}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Tell me about your project"
        />
      </div>

      {error && (
        <p className="font-space-mono text-sm text-red-400">{error}</p>
      )}

      <button type="submit" disabled={submitting} className="btn-gold">
        {submitting ? "Sending..." : "Send Message"}
      </button>
    </form>
  );
}
