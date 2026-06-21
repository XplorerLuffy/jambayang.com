import AdminShell from "@/components/admin/AdminShell";
import { getSupabaseServerClient } from "@/lib/supabase-server";

export default async function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await getSupabaseServerClient();
  const { data } = await supabase.auth.getUser();

  return (
    <AdminShell userEmail={data.user?.email ?? "Admin"}>
      {children}
    </AdminShell>
  );
}
