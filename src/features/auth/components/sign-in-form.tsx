"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signInSchema, SignInInput } from "../schemes/auth-schemes";
import { FieldGroup } from "@/shared/components/ui/field";
import { Form } from "@/shared/components/form/form";
import { FieldInput } from "@/shared/components/form/field-input.types";
import { FieldWLabel } from "@/shared/components/form/field-w-label";
import { FormSubmit } from "@/shared/components/form/form-submit";
import { showResponse } from "@/shared/lib/client-actions";
import { signInAction } from "../actions/auth-actions";
import { redirect } from "next/navigation";

const fields: FieldInput<SignInInput>[] = [
  {
    name: "email",
    label: "Email",
    type: "email",
  },
  {
    name: "password",
    label: "Password",
    type: "password",
  },
];

export function SignInForm() {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<SignInInput>({
    resolver: zodResolver(signInSchema),
  });

  const onSubmit = async (data: SignInInput) => {
    const response = showResponse(await signInAction(data));

    if (response && response.data?.success) {
      redirect("/dashboard");
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
        label="Sign Up"
        submittingLabel="Signing Up..."
      />
    </Form>
  );
}
