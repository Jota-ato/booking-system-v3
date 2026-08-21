"use client";

import { ComponentProps } from "react";
import { Field, FieldLabel, FieldError } from "@/shared/components/ui/field";
import { Input } from "@/shared/components/ui/input";
import { Textarea } from "@/shared/components/ui/textarea";
import { FieldValues, Path, UseFormRegister } from "react-hook-form";

type FieldWLabelProps<TFieldValues extends FieldValues> = {
  label: string;
  name: Path<TFieldValues>;
  register: UseFormRegister<TFieldValues>;
  error?: string | null;
  orientation?: ComponentProps<typeof Field>["orientation"];
  textarea?: boolean;
} & Omit<
  ComponentProps<typeof Input> & ComponentProps<typeof Textarea>,
  "name"
>;

export function FieldWLabel<TFieldValues extends FieldValues>({
  label,
  name,
  register,
  error,
  orientation,
  textarea = false,
  fieldClassNames,
  inputClassNames,
  ...rest
}: {
  fieldClassNames?: string;
  inputClassNames?: string;
} & FieldWLabelProps<TFieldValues>) {
  return (
    <Field
      className={fieldClassNames}
      orientation={orientation}
      data-invalid={!!error}
    >
      <FieldLabel htmlFor={name}>{label}</FieldLabel>
      {textarea ? (
        <Textarea
          id={name}
          aria-invalid={!!error}
          className={inputClassNames}
          {...register(name)}
          {...(rest as ComponentProps<typeof Textarea>)}
        />
      ) : (
        <Input
          id={name}
          aria-invalid={!!error}
          className={inputClassNames}
          {...register(name, { valueAsNumber: rest.type === "number" })}
          {...(rest as ComponentProps<typeof Input>)}
        />
      )}
      {error && <FieldError>{error}</FieldError>}
    </Field>
  );
}
