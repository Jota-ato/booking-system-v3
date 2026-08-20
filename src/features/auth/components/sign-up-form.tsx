"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signUpSchema, SignUpInput } from "../schemes/auth-schemes";
import { FieldGroup, FieldSet } from "@/shared/components/ui/field";
import { Form } from "@/shared/components/form/form";
import { FieldInput } from "@/shared/components/form/field-input.types";
import { FieldWLabel } from "@/shared/components/form/field-w-label";
import { FormSubmit } from "@/shared/components/form/form-submit";

const fields: FieldInput<SignUpInput>[] = [
  {
    name: "name",
    label: "Name",
  },
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
  {
    name: "passwordConfirmation",
    label: "Confirm Password",
    type: "password",
  },
];

export function SignUpForm() {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<SignUpInput>({
    resolver: zodResolver(signUpSchema),
  });

  const onSubmit = async (data: SignUpInput) => {
    console.log(data)
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
