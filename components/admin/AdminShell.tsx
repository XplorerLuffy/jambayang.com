"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  FolderKanban,
  Sparkles,
  ListChecks,
  MessageSquareQuote,
  Mail,
  Settings,
  ChevronsLeft,
  Sun,
  Moon,
  Search,
  LogOut,
} from "lucide-react";
import { getSupabaseBrowserClient } from "@/lib/supabase-browser";
import "../../app/admin/admin.css";

const NAV = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/projects", label: "Projects", icon: FolderKanban },
  { href: "/admin/skills", label: "Skills", icon: Sparkles },
  { href: "/admin/proof-points", label: "Proof Points", icon: ListChecks },
  { href: "/admin/testimonials", label: "Testimonials", icon: MessageSquareQuote },
  { href: "/admin/contact", label: "Contact", icon: Mail },
  { href: "/admin/settings", label: "Settings", icon: Settings },
];

export default function AdminShell({
  children,
  userEmail,
}: {
  children: React.ReactNode;
  userEmail: string;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [collapsed, setCollapsed] = useState(false);
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("admin-theme");
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (stored === "dark") setDark(true);
    document.body.classList.add("admin-active");
    return () => document.body.classList.remove("admin-active");
  }, []);

  function toggleTheme() {
    const next = !dark;
    setDark(next);
    localStorage.setItem("admin-theme", next ? "dark" : "light");
  }

  async function handleLogout() {
    await getSupabaseBrowserClient().auth.signOut();
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <div className={`admin-root flex ${dark ? "dark" : ""}`}>
      <aside
        className={`admin-card flex flex-col shrink-0 m-3 rounded-2xl transition-all ${
          collapsed ? "w-20" : "w-64"
        }`}
        style={{ minHeight: "calc(100vh - 1.5rem)" }}
      >
        <div className="flex items-center justify-between px-5 py-5">
          {!collapsed && (
            <span className="text-lg font-bold" style={{ color: "var(--admin-blue)" }}>
              🛍️ Shopzy
            </span>
          )}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="text-sm opacity-60 hover:opacity-100"
            aria-label="Toggle sidebar"
          >
            <ChevronsLeft
              size={18}
              className={collapsed ? "rotate-180" : ""}
            />
          </button>
        </div>
        <nav className="flex-1 px-3 space-y-1">
          {NAV.map((item) => {
            const active =
              item.href === "/admin"
                ? pathname === "/admin"
                : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`admin-nav-link ${active ? "active" : ""}`}
              >
                <item.icon size={18} />
                {!collapsed && <span>{item.label}</span>}
              </Link>
            );
          })}
        </nav>
        <div className="p-3">
          <button
            onClick={handleLogout}
            className="admin-nav-link w-full text-left"
          >
            <LogOut size={18} />
            {!collapsed && <span>Logout</span>}
          </button>
        </div>
      </aside>

      <div className="flex-1 min-w-0">
        <header className="flex items-center justify-between px-8 py-5">
          <div
            className="admin-card flex items-center gap-2 px-3 py-2 w-72"
            style={{ borderRadius: "0.75rem" }}
          >
            <Search size={16} style={{ color: "var(--admin-text-muted)" }} />
            <input
              placeholder="Search…"
              className="bg-transparent outline-none text-sm w-full"
            />
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={toggleTheme}
              className="admin-card w-9 h-9 flex items-center justify-center rounded-full"
              aria-label="Toggle theme"
            >
              {dark ? <Sun size={16} /> : <Moon size={16} />}
            </button>
            <div
              className="admin-card w-9 h-9 flex items-center justify-center rounded-full text-xs font-semibold"
              title={userEmail}
            >
              {userEmail.slice(0, 2).toUpperCase()}
            </div>
          </div>
        </header>
        <main className="px-8 pb-10">{children}</main>
      </div>
    </div>
  );
}
