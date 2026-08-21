import { requireAuth } from "@/lib/auth-server";
import { SettingsPagesSection } from "@/shared/components/dashboard/settings/settings-pages-section";
import { Badge } from "@/shared/components/ui/badge";
import { Button } from "@/shared/components/ui/button";
import { Card, CardContent } from "@/shared/components/ui/card";
import { PenSquare, Trash } from "lucide-react";
import Image from "next/image";
import { redirect } from "next/navigation";

export default async function SettingsPage() {
  const { session, user } = await requireAuth();
  if (!session || !user) redirect("/auth/sign-in");

  return (
    <>
      <SettingsPagesSection>
        <h2>Profile</h2>
        <div className="flex">
          <Card className="flex-1">
            <CardContent className="flex flex-row gap-6">
              {/** Controls  */}
              <div className="flex flex-1 flex-col items-start gap-2">
                <h3>User data</h3>
                <p>
                  Role: <Badge className="ml-2">{user.role}</Badge>
                </p>
                <p className="text-muted-foreground">
                  Set your account details
                </p>
                <Button variant="outline" size="lg">
                  <PenSquare className="size-4" />
                  Edit
                </Button>
              </div>
              {/** Profile data */}
              <div className="flex flex-col gap-2">
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
                <Image
                  src={user.image!}
                  alt="Profile picture"
                  width={100}
                  height={100}
                  loading="eager"
                  priority
                  className="rounded-full"
                />
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    Change picture
                  </Button>
                  <Button variant="outline" size="icon">
                    <Trash className="size-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </SettingsPagesSection>
    </>
  );
}
