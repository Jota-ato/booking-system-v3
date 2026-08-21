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
    <div className={cn("w-full mx-auto p-2", className)} {...rest}>
      {children}
    </div>
  );
}
