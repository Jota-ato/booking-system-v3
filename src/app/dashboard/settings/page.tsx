import { AccountDetailsControls } from "@/features/users/components/account-details-controls";
import { PreferencesControls } from "@/features/users/components/preferences-controls";
import { StaffControls } from "@/features/staff/components/staff-controls";
import { requireAuth } from "@/lib/auth-server";
import { Separator } from "@/shared/components/ui/separator";
import { redirect } from "next/navigation";
import { staffService } from "@/features/staff/services/staff-service";

export default async function SettingsPage() {
  const { session, user } = await requireAuth();
  if (!session || !user) redirect("/auth/sign-in");

  const staff = await staffService.getStaffByUserId(user.id);
  if (!staff) redirect("/waiting-approval");

  return (
    <>
      <AccountDetailsControls user={user} />
      <Separator />
      <StaffControls staff={staff} user={user} />
      <Separator />
      <PreferencesControls />
    </>
  );
}
