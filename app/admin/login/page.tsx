"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getSupabaseBrowserClient } from "@/lib/supabase-browser";
import "../admin.css";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    document.body.classList.add("admin-active");
    return () => document.body.classList.remove("admin-active");
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const { error } = await getSupabaseBrowserClient().auth.signInWithPassword({
      email,
      password,
    });
    setLoading(false);
    if (error) {
      setError(error.message);
      return;
    }
    router.push("/admin");
    router.refresh();
  }

  return (
    <div className="admin-root flex items-center justify-center px-4">
      <form
        onSubmit={handleSubmit}
        className="admin-card w-full max-w-sm p-8 shadow-sm"
      >
        <h1 className="text-2xl font-bold mb-1">Shopzy Admin</h1>
        <p className="text-sm mb-6" style={{ color: "var(--admin-text-muted)" }}>
          Sign in to manage jambayang.com
        </p>
        <div className="space-y-4">
          <div>
            <label className="block text-sm mb-1.5">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="admin-input"
              autoFocus
            />
          </div>
          <div>
            <label className="block text-sm mb-1.5">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="admin-input"
            />
          </div>
        </div>
        {error && (
          <p className="text-sm text-red-500 mt-4">{error}</p>
        )}
        <button
          type="submit"
          disabled={loading}
          className="admin-btn-primary w-full mt-6 disabled:opacity-60"
        >
          {loading ? "Signing in…" : "Sign In"}
        </button>
      </form>
    </div>
  );
}
