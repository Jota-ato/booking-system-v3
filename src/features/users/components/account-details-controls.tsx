"use client";
import { User } from "@/db/types/index.types";
import { SettingsPagesSection } from "@/shared/components/dashboard/settings/settings-pages-section";
import { Badge } from "@/shared/components/ui/badge";
import { Button } from "@/shared/components/ui/button";
import { PenSquare, Save, X } from "lucide-react";
import { AccountDetails } from "./account-details";
import { ProfileImageControls } from "./profile-image-controls";
import { useId, useState } from "react";
import { AccountForm } from "./account-form";
import { useAccountStore } from "../stores/account.store";
import { Spinner } from "@/shared/components/ui/spinner";

export function AccountDetailsControls({ user }: { user: User }) {
  const [isEditting, setIsEditting] = useState(false);
  const isSubmitting = useAccountStore((s) => s.isSubmitting);
  const formId = useId();

  return (
    <SettingsPagesSection>
      <h2>Account</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/** Controls  */}
        <div className="flex flex-col items-start gap-2">
          <div className="flex-1 flex flex-col gap-2">
            <p>
              Role: <Badge className="ml-2">{user.role}</Badge>
            </p>
            <p className="text-muted-foreground">Set your account details</p>
          </div>
          <div className="flex items-center gap-2">
            <Button
              type={isEditting ? "submit" : "button"}
              form={isEditting ? formId : undefined}
              onClick={
                !isEditting
                  ? (e) => {
                      e.preventDefault();
                      setIsEditting(true);
                    }
                  : undefined
              }
              variant={isEditting ? "default" : "outline"}
              size="lg"
              disabled={isEditting && isSubmitting}
            >
              {isEditting ? (
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
            {isEditting && (
              <Button
                variant="destructive"
                size="lg"
                onClick={() => setIsEditting(false)}
                disabled={isSubmitting}
              >
                <X className="size-4" />
                Cancel
              </Button>
            )}
          </div>
        </div>
        {/** Profile data */}
        <div className="md:col-span-2 flex flex-col md:flex-row gap-6">
          {isEditting ? (
            <AccountForm user={user} id={formId} />
          ) : (
            <AccountDetails userEmail={user.email} userName={user.name} />
          )}
          {/** Profile picture */}
          <ProfileImageControls user={user} />
        </div>
      </div>
    </SettingsPagesSection>
  );
}
