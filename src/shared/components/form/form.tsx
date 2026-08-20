import { HTMLAttributes, ReactNode } from "react";
import { FieldSet } from "../ui/field";

export function Form({
  children,
  ...props
}: {
  children: ReactNode;
} & HTMLAttributes<HTMLFormElement>) {
  return (
    <form {...props}>
      <FieldSet>{children}</FieldSet>
    </form>
  );
}
