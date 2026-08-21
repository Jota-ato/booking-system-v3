"use client";
import { Button } from "@/shared/components/ui/button";
import { NavItem } from "@/shared/types/navigation.types";
import { isActivePath } from "@/shared/utils/pathname";
import { Bell, FileQuestionMark, LucideIcon, User } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems: NavItem[] = [
  {
    label: "Account",
    href: "/dashboard/settings",
    exactMatch: true,
    icon: User,
  },
  {
    label: "Notifications",
    href: "/dashboard/settings/notifications",
    icon: Bell,
  },
  {
    label: "Questions",
    href: "/dashboard/settings/questions",
    icon: FileQuestionMark,
  },
];

export function SettingsPagesNavigation() {
  const pathName = usePathname();

  return (
    <nav className="flex flex-wrap gap-4">
      {navItems.map((item) => (
        <Button
          key={item.href}
          variant={
            isActivePath(pathName, item.href, item.exactMatch)
              ? "default"
              : "outline"
          }
          size="lg"
          nativeButton={false}
          render={<Link href={item.href} />}
        >
          {item.icon && <item.icon className="size-4" />}
          {item.label}
        </Button>
      ))}
    </nav>
  );
}
