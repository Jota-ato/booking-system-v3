import { AccountDetailsControls } from "@/features/users/components/account-details-controls";
import { PreferencesControls } from "@/features/users/components/preferences-controls";
import { StaffControls } from "@/features/staff/components/staff-controls";
import { requireAuth } from "@/lib/auth-server";
import { Separator } from "@/shared/components/ui/separator";
import { redirect } from "next/navigation";

export default async function SettingsPage() {
  const { session, user } = await requireAuth();
  if (!session || !user) redirect("/auth/sign-in");

  return (
    <>
      <AccountDetailsControls user={user} />
      <Separator />
      <StaffControls />
      <Separator />
      <PreferencesControls />
    </>
  );
}
