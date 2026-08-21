import { ReactNode } from "react";
import { SidebarProvider } from "@/shared/components/ui/sidebar";
import { DashboardSidebar } from "@/shared/components/dashboard/dashboard-sidebar";
import { requireAuth } from "@/lib/auth-server";
import { redirect } from "next/navigation";

export default async function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  const { session, user } = await requireAuth();
  if (!session || !user) redirect("/auth/sign-in");

  return (
    <SidebarProvider>
      <DashboardSidebar user={user} />
      <main className="flex-1">{children}</main>
    </SidebarProvider>
  );
}
