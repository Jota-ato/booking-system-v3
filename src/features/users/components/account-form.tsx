"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { userSchema, UserInput } from "@/features/users/schemes/user-schemes";
import { User } from "@/db/types/index.types";
import { Form } from "@/shared/components/form/form";
import { FieldGroup } from "@/shared/components/ui/field";
import { FieldInput } from "@/shared/components/form/field-input.types";
import { FieldWLabel } from "@/shared/components/form/field-w-label";
import { FormSubmit } from "@/shared/components/form/form-submit";

const inputs: FieldInput<UserInput>[] = [
  {
    name: "name",
    label: "Name",
  },
  {
    name: "email",
    label: "Email",
    type: "email",
  },
];

export function AccountForm({ user }: { user: User }) {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<UserInput>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      name: user.name,
      email: user.email,
    },
  });

  const onSubmit = (data: UserInput) => {
    console.log("Form submitted:", data);
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FieldGroup>
        {inputs.map((input) => (
          <FieldWLabel
            key={input.name}
            register={register}
            error={errors[input.name]?.message}
            {...input}
          />
        ))}
      </FieldGroup>
      <FormSubmit
        isSubmitting={isSubmitting}
        label="Save"
        submittingLabel="Saving..."
      />
    </Form>
  );
}
