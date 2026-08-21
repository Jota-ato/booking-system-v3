"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { userSchema, UserInput } from "@/features/users/schemes/user-schemes";
import { User } from "@/db/types/index.types";
import { Form } from "@/shared/components/form/form";
import { FieldGroup } from "@/shared/components/ui/field";
import { FieldInput } from "@/shared/components/form/field-input.types";
import { FieldWLabel } from "@/shared/components/form/field-w-label";
import { useAccountStore } from "../stores/account.store";

const inputs: FieldInput<UserInput>[] = [
  { name: "name", label: "Name" },
  { name: "email", label: "Email", type: "email" },
];

export function AccountForm({ user, id }: { user: User; id: string }) {
  const setIsSubmitting = useAccountStore((s) => s.setIsSubmitting);

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<UserInput>({
    resolver: zodResolver(userSchema),
    defaultValues: { name: user.name, email: user.email },
  });

  useEffect(() => {
    setIsSubmitting(isSubmitting);
  }, [isSubmitting, setIsSubmitting]);

  const onSubmit = async (data: UserInput) => {
    console.log("Form submitted:", data);
  };

  return (
    <Form
      id={id}
      onSubmit={handleSubmit(onSubmit)}
      className="flex-1 flex flex-col md:border-l border-border md:pl-6"
    >
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
    </Form>
  );
}
