import { AccountDetailsCard } from "@/features/users/components/account-details-card";
import { requireAuth } from "@/lib/auth-server";

import { redirect } from "next/navigation";

export default async function SettingsPage() {
  const { session, user } = await requireAuth();
  if (!session || !user) redirect("/auth/sign-in");

  return (
    <>
      <AccountDetailsCard user={user} />
    </>
  );
}
