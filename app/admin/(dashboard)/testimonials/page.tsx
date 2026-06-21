"use client";

import { useEffect, useState } from "react";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { getSupabaseBrowserClient } from "@/lib/supabase-browser";
import { upsertTestimonial, deleteTestimonial } from "@/lib/admin-queries";
import { Testimonial } from "@/lib/types";

const EMPTY: Partial<Testimonial> = {
  name: "",
  role_company: "",
  quote: "",
  is_published: false,
  display_order: 0,
};

export default function AdminTestimonialsPage() {
  const [items, setItems] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Partial<Testimonial> | null>(null);

  async function load() {
    setLoading(true);
    const { data } = await getSupabaseBrowserClient()
      .from("testimonials")
      .select("*")
      .order("display_order");
    setItems((data as Testimonial[]) ?? []);
    setLoading(false);
  }

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    load();
  }, []);

  async function handleSave() {
    if (!editing) return;
    await upsertTestimonial(editing);
    setEditing(null);
    load();
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this testimonial?")) return;
    await deleteTestimonial(id);
    load();
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Testimonials</h1>
        <button onClick={() => setEditing(EMPTY)} className="admin-btn-primary flex items-center gap-2">
          <Plus size={16} /> New
        </button>
      </div>

      {editing && (
        <div className="admin-card p-6 mb-6 space-y-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm mb-1.5" style={{ color: "var(--admin-text-muted)" }}>
                Name
              </label>
              <input
                className="admin-input"
                value={editing.name ?? ""}
                onChange={(e) => setEditing({ ...editing, name: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm mb-1.5" style={{ color: "var(--admin-text-muted)" }}>
                Role / Company
              </label>
              <input
                className="admin-input"
                value={editing.role_company ?? ""}
                onChange={(e) => setEditing({ ...editing, role_company: e.target.value })}
              />
            </div>
          </div>
          <div>
            <label className="block text-sm mb-1.5" style={{ color: "var(--admin-text-muted)" }}>
              Quote
            </label>
            <textarea
              className="admin-input"
              rows={3}
              value={editing.quote ?? ""}
              onChange={(e) => setEditing({ ...editing, quote: e.target.value })}
            />
          </div>
          <div className="flex items-center gap-6">
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={editing.is_published ?? false}
                onChange={(e) => setEditing({ ...editing, is_published: e.target.checked })}
              />
              Published
            </label>
            <div className="flex items-center gap-2 text-sm">
              <span style={{ color: "var(--admin-text-muted)" }}>Display Order</span>
              <input
                type="number"
                className="admin-input w-24"
                value={editing.display_order ?? 0}
                onChange={(e) =>
                  setEditing({ ...editing, display_order: Number(e.target.value) })
                }
              />
            </div>
          </div>
          <div className="flex gap-3">
            <button onClick={handleSave} className="admin-btn-primary">
              Save
            </button>
            <button onClick={() => setEditing(null)} className="admin-btn-ghost">
              Cancel
            </button>
          </div>
        </div>
      )}

      <div className="admin-card overflow-hidden">
        {loading ? (
          <p className="p-6 text-sm">Loading…</p>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left" style={{ color: "var(--admin-text-muted)" }}>
                <th className="px-5 py-3">Name</th>
                <th className="px-5 py-3">Quote</th>
                <th className="px-5 py-3">Published</th>
                <th className="px-5 py-3" />
              </tr>
            </thead>
            <tbody>
              {items.map((t) => (
                <tr key={t.id} className="border-t" style={{ borderColor: "var(--admin-border)" }}>
                  <td className="px-5 py-3 font-medium">{t.name}</td>
                  <td className="px-5 py-3 max-w-md truncate">{t.quote}</td>
                  <td className="px-5 py-3">{t.is_published ? "Yes" : "No"}</td>
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-3 justify-end">
                      <button onClick={() => setEditing(t)} aria-label="Edit">
                        <Pencil size={16} />
                      </button>
                      <button onClick={() => handleDelete(t.id)} aria-label="Delete">
                        <Trash2 size={16} style={{ color: "#ef4444" }} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
