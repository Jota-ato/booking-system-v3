import { ReactNode } from "react";
import { SidebarProvider } from "@/shared/components/ui/sidebar";
import { DashboardSidebar } from "@/shared/components/dashboard/dashboard-sidebar";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <SidebarProvider>
      <DashboardSidebar />
      <main className="flex-1">{children}</main>
    </SidebarProvider>
  );
}
