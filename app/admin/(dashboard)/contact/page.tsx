"use client";

import { useEffect, useState } from "react";
import { getSupabaseBrowserClient } from "@/lib/supabase-browser";
import { markContactRead } from "@/lib/admin-queries";
import { ContactSubmission } from "@/lib/types";

export default function AdminContactPage() {
  const [items, setItems] = useState<ContactSubmission[]>([]);
  const [loading, setLoading] = useState(true);

  async function load() {
    setLoading(true);
    const { data } = await getSupabaseBrowserClient()
      .from("contact_submissions")
      .select("*")
      .order("created_at", { ascending: false });
    setItems((data as ContactSubmission[]) ?? []);
    setLoading(false);
  }

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    load();
  }, []);

  async function toggleRead(item: ContactSubmission) {
    await markContactRead(item.id, !item.is_read);
    load();
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Contact Messages</h1>
      <div className="admin-card overflow-hidden">
        {loading ? (
          <p className="p-6 text-sm">Loading…</p>
        ) : items.length === 0 ? (
          <p className="p-6 text-sm" style={{ color: "var(--admin-text-muted)" }}>
            No messages yet.
          </p>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left" style={{ color: "var(--admin-text-muted)" }}>
                <th className="px-5 py-3">From</th>
                <th className="px-5 py-3">Message</th>
                <th className="px-5 py-3">Received</th>
                <th className="px-5 py-3" />
              </tr>
            </thead>
            <tbody>
              {items.map((c) => (
                <tr
                  key={c.id}
                  className="border-t"
                  style={{
                    borderColor: "var(--admin-border)",
                    fontWeight: c.is_read ? 400 : 600,
                  }}
                >
                  <td className="px-5 py-3">
                    {c.name}
                    <div className="text-xs" style={{ color: "var(--admin-text-muted)" }}>
                      {c.email}
                    </div>
                  </td>
                  <td className="px-5 py-3 max-w-md">{c.message}</td>
                  <td className="px-5 py-3">
                    {new Date(c.created_at).toLocaleString()}
                  </td>
                  <td className="px-5 py-3">
                    <button onClick={() => toggleRead(c)} className="admin-btn-ghost">
                      Mark {c.is_read ? "Unread" : "Read"}
                    </button>
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
