import { getSupabaseServerClient } from "@/lib/supabase-server";
import { FolderKanban, Sparkles, MessageSquareQuote, Mail } from "lucide-react";

export const dynamic = "force-dynamic";

async function getCounts() {
  const supabase = await getSupabaseServerClient();
  const [projects, skills, testimonials, contacts, unread] = await Promise.all([
    supabase.from("projects").select("id", { count: "exact", head: true }),
    supabase.from("skills").select("id", { count: "exact", head: true }),
    supabase.from("testimonials").select("id", { count: "exact", head: true }),
    supabase.from("contact_submissions").select("id", { count: "exact", head: true }),
    supabase
      .from("contact_submissions")
      .select("id", { count: "exact", head: true })
      .eq("is_read", false),
  ]);
  return {
    projects: projects.count ?? 0,
    skills: skills.count ?? 0,
    testimonials: testimonials.count ?? 0,
    contacts: contacts.count ?? 0,
    unread: unread.count ?? 0,
  };
}

export default async function AdminHomePage() {
  const counts = await getCounts();

  const cards = [
    { label: "Projects", value: counts.projects, icon: FolderKanban, href: "/admin/projects" },
    { label: "Skills", value: counts.skills, icon: Sparkles, href: "/admin/skills" },
    { label: "Testimonials", value: counts.testimonials, icon: MessageSquareQuote, href: "/admin/testimonials" },
    { label: "Contact Messages", value: counts.contacts, icon: Mail, href: "/admin/contact" },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {cards.map((c) => (
          <a key={c.label} href={c.href} className="admin-card p-5 block">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm" style={{ color: "var(--admin-text-muted)" }}>
                {c.label}
              </span>
              <c.icon size={18} style={{ color: "var(--admin-blue)" }} />
            </div>
            <div className="text-3xl font-bold">{c.value}</div>
          </a>
        ))}
      </div>

      {counts.unread > 0 && (
        <div className="admin-card p-5 mt-6">
          <p className="text-sm">
            You have{" "}
            <span className="font-semibold" style={{ color: "var(--admin-orange)" }}>
              {counts.unread} unread
            </span>{" "}
            contact submission{counts.unread === 1 ? "" : "s"}.{" "}
            <a href="/admin/contact" className="underline" style={{ color: "var(--admin-blue)" }}>
              View inbox
            </a>
          </p>
        </div>
      )}
    </div>
  );
}
