import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
} from "@/shared/components/ui/sidebar";
import { DashboardSideBarFooter } from "./sidebar/dashboard-sidebar-footer";

export function DashboardSidebar() {
  return (
    <Sidebar>
      <SidebarHeader>
        <span className="font-bold text-xl">Booking system</span>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup />
        <SidebarGroup />
      </SidebarContent>
      <DashboardSideBarFooter />
    </Sidebar>
  );
}
