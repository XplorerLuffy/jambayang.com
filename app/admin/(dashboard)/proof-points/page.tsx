"use client";

import { useEffect, useState } from "react";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { getSupabaseBrowserClient } from "@/lib/supabase-browser";
import { upsertProofPoint, deleteProofPoint } from "@/lib/admin-queries";
import { ProofPoint } from "@/lib/types";

const EMPTY: Partial<ProofPoint> = { text: "", display_order: 0 };

export default function AdminProofPointsPage() {
  const [points, setPoints] = useState<ProofPoint[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Partial<ProofPoint> | null>(null);

  async function load() {
    setLoading(true);
    const { data } = await getSupabaseBrowserClient()
      .from("proof_points")
      .select("*")
      .order("display_order");
    setPoints((data as ProofPoint[]) ?? []);
    setLoading(false);
  }

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    load();
  }, []);

  async function handleSave() {
    if (!editing) return;
    await upsertProofPoint(editing);
    setEditing(null);
    load();
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this proof point?")) return;
    await deleteProofPoint(id);
    load();
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Proof Points</h1>
        <button onClick={() => setEditing(EMPTY)} className="admin-btn-primary flex items-center gap-2">
          <Plus size={16} /> New
        </button>
      </div>

      {editing && (
        <div className="admin-card p-6 mb-6 space-y-4">
          <div className="grid sm:grid-cols-4 gap-4">
            <div className="sm:col-span-3">
              <label className="block text-sm mb-1.5" style={{ color: "var(--admin-text-muted)" }}>
                Text
              </label>
              <input
                className="admin-input"
                value={editing.text ?? ""}
                onChange={(e) => setEditing({ ...editing, text: e.target.value })}
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
            <tbody>
              {points.map((p) => (
                <tr key={p.id} className="border-t" style={{ borderColor: "var(--admin-border)" }}>
                  <td className="px-5 py-3">{p.text}</td>
                  <td className="px-5 py-3 w-20">
                    <div className="flex items-center gap-3 justify-end">
                      <button onClick={() => setEditing(p)} aria-label="Edit">
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
