import { HTMLAttributes, ReactNode } from "react";
import { FieldSet } from "../ui/field";

export function Form({
  children,
  fielsetClassName,
  ...props
}: {
  children: ReactNode;
  fielsetClassName?: string;
} & HTMLAttributes<HTMLFormElement>) {
  return (
    <form {...props}>
      <FieldSet className={fielsetClassName}>{children}</FieldSet>
    </form>
  );
}
