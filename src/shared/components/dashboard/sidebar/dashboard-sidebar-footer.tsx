import {
  SidebarFooter,
  SidebarMenuButton,
} from "@/shared/components/ui/sidebar";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/shared/components/ui/avatar";
import { ChevronsUpDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
} from "@/shared/components/ui/dropdown-menu";
import { FooterDropdownMenu } from "./footer-dropdown-menu";

export function DashboardSideBarFooter({
  userName,
  userImageUrl,
  userEmail,
  open,
  isMobile,
}: {
  userName: string;
  userImageUrl: string | null;
  userEmail: string;
  open: boolean;
  isMobile: boolean;
}) {
  const userInitials = userName
    .split(" ")
    .map((name) => name[0].toUpperCase())
    .join("");

  return (
    <SidebarFooter>
      <DropdownMenu>
        <DropdownMenuTrigger
          render={
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground hover:bg-muted transition-colors duration-300"
            />
          }
        >
          <Avatar>
            <AvatarImage src={userImageUrl!} alt={userName} />
            <AvatarFallback>
              {userInitials}
            </AvatarFallback>
          </Avatar>
          <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="truncate font-medium">{userName}</span>
            <span className="truncate text-xs">{userEmail}</span>
          </div>
          <ChevronsUpDown className="ml-auto size-4" />
        </DropdownMenuTrigger>
        <FooterDropdownMenu isMobile={isMobile} />
      </DropdownMenu>
    </SidebarFooter>
  );
}
