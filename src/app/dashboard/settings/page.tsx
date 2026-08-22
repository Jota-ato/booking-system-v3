import { AccountDetailsSection } from "@/features/users/components/account-details-controls";
import { requireAuth } from "@/lib/auth-server";
import { ThemeToggle } from "@/shared/components/ui/theme-toggle";
import { redirect } from "next/navigation";

export default async function SettingsPage() {
  const { session, user } = await requireAuth();
  if (!session || !user) redirect("/auth/sign-in");

  return (
    <>
      <AccountDetailsSection user={user} />
      <ThemeToggle />
    </>
  );
}
