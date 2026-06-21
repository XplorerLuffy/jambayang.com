"use client";

import { useEffect, useState } from "react";
import { getSupabaseBrowserClient } from "@/lib/supabase-browser";
import { upsertSetting } from "@/lib/admin-queries";
import { HeroSetting } from "@/lib/types";

export default function AdminSettingsPage() {
  const [tagline, setTagline] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");
  const [badgesInput, setBadgesInput] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    (async () => {
      const sb = getSupabaseBrowserClient();
      const [hero, badges] = await Promise.all([
        sb.from("site_settings").select("value").eq("key", "hero").maybeSingle(),
        sb.from("site_settings").select("value").eq("key", "worked_with_badges").maybeSingle(),
      ]);
      const heroValue = hero.data?.value as HeroSetting | undefined;
      setTagline(heroValue?.tagline ?? "");
      setPhotoUrl(heroValue?.photo_url ?? "");
      const badgesValue = (badges.data?.value as string[]) ?? [];
      setBadgesInput(badgesValue.join(", "));
      setLoading(false);
    })();
  }, []);

  async function handleSave() {
    setSaving(true);
    await Promise.all([
      upsertSetting("hero", { tagline, photo_url: photoUrl || null }),
      upsertSetting(
        "worked_with_badges",
        badgesInput.split(",").map((b) => b.trim()).filter(Boolean)
      ),
    ]);
    setSaving(false);
  }

  if (loading) return <p className="text-sm">Loading…</p>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Site Settings</h1>
      <div className="admin-card p-6 space-y-5 max-w-2xl">
        <div>
          <label className="block text-sm mb-1.5" style={{ color: "var(--admin-text-muted)" }}>
            Hero Tagline
          </label>
          <textarea
            className="admin-input"
            rows={3}
            value={tagline}
            onChange={(e) => setTagline(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm mb-1.5" style={{ color: "var(--admin-text-muted)" }}>
            Hero Photo URL
          </label>
          <input
            className="admin-input"
            value={photoUrl}
            onChange={(e) => setPhotoUrl(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm mb-1.5" style={{ color: "var(--admin-text-muted)" }}>
            Worked-With Badges (comma separated)
          </label>
          <input
            className="admin-input"
            value={badgesInput}
            onChange={(e) => setBadgesInput(e.target.value)}
          />
        </div>
        <button onClick={handleSave} disabled={saving} className="admin-btn-primary disabled:opacity-60">
          {saving ? "Saving…" : "Save Settings"}
        </button>
      </div>
    </div>
  );
}
