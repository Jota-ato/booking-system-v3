import { LucideIcon } from "lucide-react";
import { Route } from "next";


export interface NavItem {
  label: string;
  href: Route;
  exactMatch?: boolean;
  icon?: LucideIcon;
}
