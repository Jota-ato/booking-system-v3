import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { User } from "@/db/types/index.types";
import { StaffPolicies } from "@/features/staff/policies/staff-policies";

export async function getServerSession() {
  return await auth.api.getSession({
    headers: await headers(),
  });
}

export async function requireAuth() {
  const session = await getServerSession();

  if (!session) {
    return {
      session: null,
      user: null,
      isAdmin: false,
      isStaff: false,
      isAuth: false,
    };
  }

  return {
    session: session.session,
    user: session.user as User,
    isAdmin: session.user.role === "admin",
    isStaff: StaffPolicies.isStaff(session.user as User),
    isAuth: session ? true : false,
  };
}
