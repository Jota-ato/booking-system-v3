"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { Form } from "@/shared/components/form/form";
import { FieldGroup } from "@/shared/components/ui/field";
import { FieldWLabel } from "@/shared/components/form/field-w-label";
import { Staff, User } from "@/db/types/index.types";
import { UpdateStaffInput, updateStaffSchema } from "../schemes/staff-schemes";
import { showResponse } from "@/shared/lib/client-actions";
import { updateStaffDataAction } from "../actions/staff-actions";
import { FieldInput } from "@/shared/components/form/field-input.types";

const inputs: FieldInput<UpdateStaffInput>[] = [
  { name: "name", label: "Name" },
  { name: "occupation", label: "Occupation" },
  { name: "about", label: "About", textarea: true },
];

export function StaffForm({
  id,
  staff,
  user,
  onSubmittingChange,
  onSaved,
}: {
  id: string;
  staff: Staff | null;
  user: User;
  onSubmittingChange: (v: boolean) => void;
  onSaved: () => void;
}) {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<UpdateStaffInput>({
    resolver: zodResolver(updateStaffSchema),
    defaultValues: {
      name: staff?.name || "",
      occupation: staff?.occupation || "",
      about: staff?.about || "",
      image: staff?.image || undefined,
    },
  });

  useEffect(() => {
    onSubmittingChange(isSubmitting);
  }, [isSubmitting, onSubmittingChange]);

  useEffect(() => {
    // reset when staff changes
    reset({
      name: staff?.name || "",
      occupation: staff?.occupation || "",
      about: staff?.about || "",
      image: staff?.image || undefined,
    });
  }, [staff, reset]);

  const onSubmit = async (data: UpdateStaffInput) => {
    if (!staff) return;
    const response = showResponse(
      await updateStaffDataAction({ staffId: staff.id, userId: user.id, data }),
    );
    if (response) {
      onSaved();
    }
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
            error={(errors as any)[input.name]?.message}
            {...input}
          />
        ))}
      </FieldGroup>
    </Form>
  );
}
