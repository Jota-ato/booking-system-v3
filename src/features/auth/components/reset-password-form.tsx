"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  resetPasswordSchema,
  ResetPasswordInput,
} from "../schemes/auth-schemes";
import { FieldGroup } from "@/shared/components/ui/field";
import { Form } from "@/shared/components/form/form";
import { FieldInput } from "@/shared/components/form/field-input.types";
import { FieldWLabel } from "@/shared/components/form/field-w-label";
import { FormSubmit } from "@/shared/components/form/form-submit";
import { showResponse } from "@/shared/lib/client-actions";
import { resetPasswordAction } from "../actions/auth-actions";
import { redirect } from "next/navigation";

const fields: FieldInput<ResetPasswordInput>[] = [
  {
    name: "password",
    label: "Password",
    type: "password",
  },
  {
    name: "passwordConfirmation",
    label: "Confirm Password",
    type: "password",
  },
];

export function ResetPasswordForm({ token }: { token: string }) {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<ResetPasswordInput>({
    resolver: zodResolver(resetPasswordSchema),
  });

  const onSubmit = async (data: ResetPasswordInput) => {
    const response = showResponse(await resetPasswordAction(token, data));

    if (response && response.data.success) {
      redirect("/auth/sign-in");
    }
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
        label="Reset Password"
        submittingLabel="Resetting Password..."
      />
    </Form>
  );
}
