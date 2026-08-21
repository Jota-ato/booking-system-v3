import { cn } from "@/shared/lib/utils";
import { HTMLAttributes, ReactNode } from "react";

export function SettingsPagesSection({
  children,
  className,
  ...props
}: {
  children: ReactNode;
} & HTMLAttributes<HTMLDivElement>) {
  return (
    <section className={cn("py-2 space-y-2", className)} {...props}>
      {children}
    </section>
  );
}
