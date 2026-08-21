import { cn } from "@/shared/lib/utils";
import { HTMLAttributes, ReactNode } from "react";

export function Container({
  children,
  className,
  ...rest
}: {
  children: ReactNode;
} & HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("max-w-7xl w-9/10 p-2", className)} {...rest}>
      {children}
    </div>
  );
}
