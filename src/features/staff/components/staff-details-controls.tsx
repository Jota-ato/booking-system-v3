"use client";

import { useEffect, useRef, useState } from "react";
import { useId } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { SettingsPagesSection } from "@/shared/components/dashboard/settings/settings-pages-section";
import { Badge } from "@/shared/components/ui/badge";
import { Button } from "@/shared/components/ui/button";
import { PenSquare, Save, X, Trash } from "lucide-react";
import { Form } from "@/shared/components/form/form";
import { FieldGroup } from "@/shared/components/ui/field";
import { FieldWLabel } from "@/shared/components/form/field-w-label";
import { FieldInput } from "@/shared/components/form/field-input.types";
import { Spinner } from "@/shared/components/ui/spinner";
import {
  Avatar,
  AvatarImage,
  AvatarFallback,
} from "@/shared/components/ui/avatar";
import { getUserInitials } from "@/shared/utils/names";

import {
  updateStaffSchema,
  UpdateStaffInput,
} from "@/features/staff/schemes/staff-schemes";
import { Staff } from "@/db/types/index.types";
import { User } from "@/db/types/index.types";
import { showResponse } from "@/shared/lib/client-actions";
import { updateStaffDataAction } from "@/features/staff/actions/staff-actions";
import { useUploader } from "@/shared/hooks/use-uploader";
import { deleteUPloadedImage } from "@/features/images/actions/images-actions";
import { extractFileKeyFromUrl } from "@/shared/utils/uploadthing";

interface Props {
  staff: Staff | null;
  user: User;
}

const inputs: FieldInput<UpdateStaffInput>[] = [
  { name: "name", label: "Name" },
  { name: "occupation", label: "Occupation" },
  { name: "about", label: "About", textarea: true },
];

export default function StaffDetailsControls({ staff, user }: Props) {
  const [isEditing, setIsEditing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const formId = useId();

  return (
    <SettingsPagesSection>
      <h2>Staff</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="flex flex-col items-start gap-2">
          <div className="flex-1 flex flex-col gap-2">
            <p>
              Profile: <Badge className="ml-2">Staff</Badge>
            </p>
            <p className="text-muted-foreground">
              Manage your public staff profile
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Button
              type={isEditing ? "submit" : "button"}
              form={isEditing ? formId : undefined}
              onClick={
                !isEditing
                  ? (e) => {
                      e.preventDefault();
                      setIsEditing(true);
                    }
                  : undefined
              }
              variant={isEditing ? "default" : "outline"}
              size="lg"
              disabled={isEditing && isSubmitting}
            >
              {isEditing ? (
                <>
                  {isSubmitting ? (
                    <>
                      <Spinner />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="size-4" />
                      Save
                    </>
                  )}
                </>
              ) : (
                <>
                  <PenSquare className="size-4" />
                  Edit
                </>
              )}
            </Button>

            {isEditing && (
              <Button
                variant="destructive"
                size="lg"
                onClick={() => setIsEditing(false)}
                disabled={isSubmitting}
              >
                <X className="size-4" />
                Cancel
              </Button>
            )}
          </div>
        </div>

        <div className="md:col-span-2 flex flex-col md:flex-row gap-6">
          {isEditing ? (
            <StaffForm
              id={formId}
              staff={staff}
              user={user}
              onSubmittingChange={setIsSubmitting}
              onSaved={() => setIsEditing(false)}
            />
          ) : (
            <StaffPreview staff={staff} />
          )}

          <StaffImageControls staff={staff} user={user} />
        </div>
      </div>
    </SettingsPagesSection>
  );
}

function StaffPreview({ staff }: { staff: Staff | null }) {
  if (!staff) {
    return (
      <div className="flex-1 md:border-l border-border md:pl-6">
        No staff profile found.
      </div>
    );
  }

  return (
    <div className="flex-1 md:border-l border-border md:pl-6">
      <h3 className="text-lg font-medium">{staff.name}</h3>
      <p className="text-muted-foreground">{staff.occupation}</p>
      <div className="mt-3 whitespace-pre-wrap">{staff.about}</div>
    </div>
  );
}

function StaffForm({
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
    resolver: zodResolver(updateStaffSchema as any),
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

function StaffImageControls({
  staff,
  user,
}: {
  staff: Staff | null;
  user: User;
}) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [currentImage, setCurrentImage] = useState<string | null>(
    staff?.image ?? null,
  );
  const { uploadFile, isLoading } = useUploader();

  const handleButtonClick = () => fileInputRef.current?.click();

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !staff) return;

    try {
      const result = await uploadFile(file);
      setCurrentImage(result.url);
      const response = showResponse(
        await updateStaffDataAction({
          staffId: staff.id,
          userId: user.id,
          data: { image: result.url },
        }),
      );
      if (response && response.changedImage) {
        await deleteUPloadedImage(extractFileKeyFromUrl(currentImage || ""));
      }
    } catch (error) {
      console.error("Error uploading image:", error);
    } finally {
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const handleDelete = async () => {
    if (!staff) return;
    const response = showResponse(
      await updateStaffDataAction({
        staffId: staff.id,
        userId: user.id,
        data: { image: null },
      }),
    );
    if (response && response.changedImage) {
      await deleteUPloadedImage(extractFileKeyFromUrl(currentImage || ""));
    }
    setCurrentImage(null);
  };

  return (
    <div className="flex flex-col items-center gap-2">
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/png, image/jpeg, image/webp"
        className="hidden"
      />

      <Avatar className="size-25 relative">
        {currentImage && (
          <AvatarImage src={currentImage} alt={staff?.name || "staff"} />
        )}
        <AvatarFallback className="text-3xl">
          {getUserInitials(staff?.name || "")}
        </AvatarFallback>

        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/40 rounded-full">
            <Spinner className="size-6 text-foreground" />
          </div>
        )}
      </Avatar>

      <div className="flex items-center gap-2">
        <Button
          type="button"
          onClick={handleButtonClick}
          disabled={isLoading || !staff}
          aria-label="Change picture"
          variant="outline"
          size="sm"
        >
          Change picture
        </Button>

        <Button
          type="button"
          onClick={handleDelete}
          disabled={isLoading || !currentImage || !staff}
          aria-label="Delete picture"
          variant="outline"
          size="icon-sm"
        >
          <Trash className="size-4" />
        </Button>
      </div>
    </div>
  );
}
