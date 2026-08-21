import { User } from "@/db/types/index.types";
import { SettingsPagesSection } from "@/shared/components/dashboard/settings/settings-pages-section";
import {
  Avatar,
  AvatarImage,
  AvatarFallback,
} from "@/shared/components/ui/avatar";
import { Badge } from "@/shared/components/ui/badge";
import { Button } from "@/shared/components/ui/button";
import { Card, CardContent } from "@/shared/components/ui/card";
import { getUserInitials } from "@/shared/utils/names";
import { PenSquare, Trash } from "lucide-react";

export function AccountDetailsCard({ user }: { user: User }) {
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
            <Button variant="outline" size="lg">
              <PenSquare className="size-4" />
              Edit
            </Button>
          </div>
          {/** Profile data */}
          <div className="md:col-span-2 flex flex-col md:flex-row gap-6">
            <div className="flex-1 flex flex-col gap-2 md:border-l border-border md:pl-6">
              <div className="flex flex-col items-start gap-2">
                <span>Name</span>
                <span className="w-full px-4 py-2 border border-border rounded-md">
                  {user.name}
                </span>
              </div>
              <div className="flex flex-col items-start gap-2">
                <span>Email</span>
                <span className="w-full px-4 py-2 border border-border rounded-md">
                  {user.email}
                </span>
              </div>
            </div>
            {/** Profile picture */}
            <div className="flex flex-col items-center gap-2">
              <Avatar className="size-25">
                <AvatarImage src={user.image!} />
                <AvatarFallback className="text-3xl">
                  {getUserInitials(user.name)}
                </AvatarFallback>
              </Avatar>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">
                  Change picture
                </Button>
                <Button
                  aria-label="Delete profile picture"
                  variant="outline"
                  size="icon-sm"
                >
                  <Trash className="size-4" />
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </SettingsPagesSection>
  );
}
