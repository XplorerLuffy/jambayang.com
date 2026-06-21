"use client";

import { useEffect, useState } from "react";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { getSupabaseBrowserClient } from "@/lib/supabase-browser";
import { upsertSkill, deleteSkill } from "@/lib/admin-queries";
import { Skill } from "@/lib/types";

const EMPTY: Partial<Skill> = { category: "", name: "", display_order: 0 };

export default function AdminSkillsPage() {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Partial<Skill> | null>(null);

  async function load() {
    setLoading(true);
    const { data } = await getSupabaseBrowserClient()
      .from("skills")
      .select("*")
      .order("category")
      .order("display_order");
    setSkills((data as Skill[]) ?? []);
    setLoading(false);
  }

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    load();
  }, []);

  async function handleSave() {
    if (!editing) return;
    await upsertSkill(editing);
    setEditing(null);
    load();
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this skill?")) return;
    await deleteSkill(id);
    load();
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Skills</h1>
        <button onClick={() => setEditing(EMPTY)} className="admin-btn-primary flex items-center gap-2">
          <Plus size={16} /> New Skill
        </button>
      </div>

      {editing && (
        <div className="admin-card p-6 mb-6 space-y-4">
          <div className="grid sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm mb-1.5" style={{ color: "var(--admin-text-muted)" }}>
                Category
              </label>
              <input
                className="admin-input"
                value={editing.category ?? ""}
                onChange={(e) => setEditing({ ...editing, category: e.target.value })}
              />
            </div>
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
                Display Order
              </label>
              <input
                type="number"
                className="admin-input"
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
                <th className="px-5 py-3">Category</th>
                <th className="px-5 py-3">Name</th>
                <th className="px-5 py-3" />
              </tr>
            </thead>
            <tbody>
              {skills.map((s) => (
                <tr key={s.id} className="border-t" style={{ borderColor: "var(--admin-border)" }}>
                  <td className="px-5 py-3">{s.category}</td>
                  <td className="px-5 py-3 font-medium">{s.name}</td>
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-3 justify-end">
                      <button onClick={() => setEditing(s)} aria-label="Edit">
                        <Pencil size={16} />
                      </button>
                      <button onClick={() => handleDelete(s.id)} aria-label="Delete">
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
