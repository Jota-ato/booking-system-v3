"use client";
import { Button } from "@/shared/components/ui/button";
import { isActivePath } from "@/shared/utils/pathname";
import { Route } from "next";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavItem {
  label: string;
  href: Route;
  exactMatch?: boolean;
}

const navItems: NavItem[] = [
  {
    label: "Account",
    href: "/dashboard/settings",
    exactMatch: true,
  },
  {
    label: "Notifications",
    href: "/dashboard/settings/notifications",
  },
  {
    label: "Questions",
    href: "/dashboard/settings/questions",
  },
];

export function SettingsPagesNavigation() {
  const pathName = usePathname();

  return (
    <nav className="flex gap-4">
      {navItems.map((item) => (
        <Button
          key={item.href}
          variant={
            isActivePath(pathName, item.href, item.exactMatch)
              ? "default"
              : "ghost"
          }
          size="lg"
          nativeButton={false}
          render={<Link href={item.href} />}
        >
          {item.label}
        </Button>
      ))}
    </nav>
  );
}
