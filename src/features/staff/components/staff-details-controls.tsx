"use client";
import { useState } from "react";
import { useId } from "react";
import { SettingsPagesSection } from "@/shared/components/dashboard/settings/settings-pages-section";
import { Badge } from "@/shared/components/ui/badge";
import { Button } from "@/shared/components/ui/button";
import { PenSquare, Save, X } from "lucide-react";
import { Spinner } from "@/shared/components/ui/spinner";
import { Staff } from "@/db/types/index.types";
import { User } from "@/db/types/index.types";
import { StaffPreview } from "./staff-preview";
import { StaffForm } from "./staff-form";
import { StaffImageControls } from "./staff-image-controls";

export default function StaffDetailsControls({
  staff,
  user,
}: {
  staff: Staff | null;
  user: User;
}) {
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
