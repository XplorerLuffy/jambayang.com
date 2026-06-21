"use client";

import { useEffect, useState } from "react";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { getSupabaseBrowserClient } from "@/lib/supabase-browser";
import { upsertProject, deleteProject } from "@/lib/admin-queries";
import { Project } from "@/lib/types";

const EMPTY: Partial<Project> = {
  title: "",
  slug: "",
  summary: "",
  problem: "",
  process: "",
  result: "",
  tech_tags: [],
  image_url: null,
  live_url: null,
  display_order: 0,
};

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Partial<Project> | null>(null);
  const [techTagsInput, setTechTagsInput] = useState("");

  async function load() {
    setLoading(true);
    const { data } = await getSupabaseBrowserClient()
      .from("projects")
      .select("*")
      .order("display_order");
    setProjects((data as Project[]) ?? []);
    setLoading(false);
  }

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    load();
  }, []);

  function startEdit(p: Partial<Project> | null) {
    setEditing(p ?? EMPTY);
    setTechTagsInput((p?.tech_tags ?? []).join(", "));
  }

  async function handleSave() {
    if (!editing) return;
    await upsertProject({
      ...editing,
      tech_tags: techTagsInput
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
    });
    setEditing(null);
    load();
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this project?")) return;
    await deleteProject(id);
    load();
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Projects</h1>
        <button onClick={() => startEdit(null)} className="admin-btn-primary flex items-center gap-2">
          <Plus size={16} /> New Project
        </button>
      </div>

      {editing && (
        <div className="admin-card p-6 mb-6 space-y-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <Field label="Title">
              <input
                className="admin-input"
                value={editing.title ?? ""}
                onChange={(e) => setEditing({ ...editing, title: e.target.value })}
              />
            </Field>
            <Field label="Slug">
              <input
                className="admin-input"
                value={editing.slug ?? ""}
                onChange={(e) => setEditing({ ...editing, slug: e.target.value })}
              />
            </Field>
          </div>
          <Field label="Summary">
            <input
              className="admin-input"
              value={editing.summary ?? ""}
              onChange={(e) => setEditing({ ...editing, summary: e.target.value })}
            />
          </Field>
          <div className="grid sm:grid-cols-3 gap-4">
            <Field label="Problem">
              <textarea
                className="admin-input"
                rows={3}
                value={editing.problem ?? ""}
                onChange={(e) => setEditing({ ...editing, problem: e.target.value })}
              />
            </Field>
            <Field label="Process">
              <textarea
                className="admin-input"
                rows={3}
                value={editing.process ?? ""}
                onChange={(e) => setEditing({ ...editing, process: e.target.value })}
              />
            </Field>
            <Field label="Result">
              <textarea
                className="admin-input"
                rows={3}
                value={editing.result ?? ""}
                onChange={(e) => setEditing({ ...editing, result: e.target.value })}
              />
            </Field>
          </div>
          <div className="grid sm:grid-cols-3 gap-4">
            <Field label="Tech Tags (comma separated)">
              <input
                className="admin-input"
                value={techTagsInput}
                onChange={(e) => setTechTagsInput(e.target.value)}
              />
            </Field>
            <Field label="Live URL">
              <input
                className="admin-input"
                value={editing.live_url ?? ""}
                onChange={(e) => setEditing({ ...editing, live_url: e.target.value })}
              />
            </Field>
            <Field label="Display Order">
              <input
                type="number"
                className="admin-input"
                value={editing.display_order ?? 0}
                onChange={(e) =>
                  setEditing({ ...editing, display_order: Number(e.target.value) })
                }
              />
            </Field>
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
                <th className="px-5 py-3">Title</th>
                <th className="px-5 py-3">Slug</th>
                <th className="px-5 py-3">Tags</th>
                <th className="px-5 py-3" />
              </tr>
            </thead>
            <tbody>
              {projects.map((p) => (
                <tr key={p.id} className="border-t" style={{ borderColor: "var(--admin-border)" }}>
                  <td className="px-5 py-3 font-medium">{p.title}</td>
                  <td className="px-5 py-3">{p.slug}</td>
                  <td className="px-5 py-3">{p.tech_tags.join(", ")}</td>
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-3 justify-end">
                      <button onClick={() => startEdit(p)} aria-label="Edit">
                        <Pencil size={16} />
                      </button>
                      <button onClick={() => handleDelete(p.id)} aria-label="Delete">
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

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-sm mb-1.5" style={{ color: "var(--admin-text-muted)" }}>
        {label}
      </label>
      {children}
    </div>
  );
}
