import { AccountDetailsControls } from "@/features/users/components/account-details-controls";
import { PreferencesControls } from "@/features/users/components/preferences-controls";
import { StaffControls } from "@/features/users/components/staff-controls";
import { requireAuth } from "@/lib/auth-server";
import { redirect } from "next/navigation";

export default async function SettingsPage() {
  const { session, user } = await requireAuth();
  if (!session || !user) redirect("/auth/sign-in");

  return (
    <>
      <AccountDetailsControls user={user} />
      <StaffControls />
      <PreferencesControls />
    </>
  );
}
