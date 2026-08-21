import {
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/shared/components/ui/dropdown-menu";
import { Settings } from "lucide-react";
import { SignOutButton } from "@/features/auth/components/sign-out-button";

export function FooterDropdownMenu({ isMobile }: { isMobile: boolean }) {
  return (
    <DropdownMenuContent
      side={isMobile ? "top" : "right"}
      className="min-w-56"
      align="end"
      sideOffset={4}
    >
      <DropdownMenuGroup>
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuItem>
          <Settings />
          Settings
        </DropdownMenuItem>
      </DropdownMenuGroup>
      <DropdownMenuSeparator />
      <DropdownMenuGroup>
        <SignOutButton className="w-full" />
      </DropdownMenuGroup>
    </DropdownMenuContent>
  );
}
