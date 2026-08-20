import { ComponentProps } from "react";
import { Path } from "react-hook-form";
import { Input } from "@/shared/components/ui/input";
import { Textarea } from "@/shared/components/ui/textarea";

export type FieldInput<T> = {
  label: string;
  name: Path<T>;
  textarea?: boolean;
} & Omit<
  ComponentProps<typeof Input> & ComponentProps<typeof Textarea>,
  "name"
>;
