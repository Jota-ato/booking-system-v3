"use client";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  useSidebar,
} from "@/shared/components/ui/sidebar";
import { DashboardSideBarFooter } from "./sidebar/dashboard-sidebar-footer";
import { User } from "@/db/types/index.types";

export function DashboardSidebar({ user }: { user: User }) {
  const { isMobile, open, toggleSidebar } = useSidebar();

  return (
    <Sidebar variant="floating">
      <SidebarHeader>
        <span className="font-bold text-xl">Booking system</span>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup />
        <SidebarGroup />
      </SidebarContent>
      <DashboardSideBarFooter
        userEmail={user.email}
        userName={user.name}
        userImageUrl={user.image}
        isMobile={isMobile}
      />
    </Sidebar>
  );
}
