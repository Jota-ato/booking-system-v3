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
    <div className={cn("mx-auto max-w-5xl w-9/10", className)} {...rest}>
      {children}
    </div>
  );
}
