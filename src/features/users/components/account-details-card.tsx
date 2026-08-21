"use client";
import { User } from "@/db/types/index.types";
import { SettingsPagesSection } from "@/shared/components/dashboard/settings/settings-pages-section";
import { Badge } from "@/shared/components/ui/badge";
import { Button } from "@/shared/components/ui/button";
import { Card, CardContent } from "@/shared/components/ui/card";
import { PenSquare, Save } from "lucide-react";
import { AccountDetails } from "./account-details";
import { ProfileImageControls } from "./profile-image-controls";
import { useState } from "react";
import { AccountForm } from "./account-form";

export function AccountDetailsCard({ user }: { user: User }) {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <SettingsPagesSection>
      <h2>Profile</h2>
      <Card>
        <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/** Controls  */}
          <div className="flex flex-col items-start gap-2">
            <h3>User details</h3>
            <div className="flex-1 flex flex-col gap-2">
              <p>
                Role: <Badge className="ml-2">{user.role}</Badge>
              </p>
              <p className="text-muted-foreground">Set your account details</p>
            </div>
            <Button
              onClick={() => setIsEditing((prev) => !prev)}
              variant="outline"
              size="lg"
            >
              {isEditing ? (
                <>
                  <Save className="size-4" />
                  Save
                </>
              ) : (
                <>
                  <PenSquare className="size-4" />
                  Edit
                </>
              )}
            </Button>
          </div>
          {/** Profile data */}
          <div className="md:col-span-2 flex flex-col md:flex-row gap-6">
            {isEditing ? (
              <AccountForm user={user} />
            ) : (
              <AccountDetails userEmail={user.email} userName={user.name} />
            )}
            {/** Profile picture */}
            <ProfileImageControls userImage={user.image} userName={user.name} />
          </div>
        </CardContent>
      </Card>
    </SettingsPagesSection>
  );
}
