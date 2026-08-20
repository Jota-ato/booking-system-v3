"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  forgotPasswordSchema,
  ForgotPasswordInput,
} from "../schemes/auth-schemes";
import { FieldGroup } from "@/shared/components/ui/field";
import { Form } from "@/shared/components/form/form";
import { FieldInput } from "@/shared/components/form/field-input.types";
import { FieldWLabel } from "@/shared/components/form/field-w-label";
import { FormSubmit } from "@/shared/components/form/form-submit";
import { showResponse } from "@/shared/lib/client-actions";
import { forgotPasswordAction } from "../actions/auth-actions";
import { redirect } from "next/navigation";

const fields: FieldInput<ForgotPasswordInput>[] = [
  {
    name: "email",
    label: "Email",
    type: "email",
  },
];

export function ForgotPasswordForm() {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<ForgotPasswordInput>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const onSubmit = async (data: ForgotPasswordInput) => {
    showResponse(await forgotPasswordAction(data));
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FieldGroup>
        {fields.map((field) => (
          <FieldWLabel
            register={register}
            key={field.name}
            error={errors[field.name]?.message}
            {...field}
          />
        ))}
      </FieldGroup>
      <FormSubmit
        isSubmitting={isSubmitting}
        label="Send Reset Link"
        submittingLabel="Sending Reset Link..."
      />
    </Form>
  );
}
