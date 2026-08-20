import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { User } from "@/db/types/index.types";

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
    isStaff: session.user.role === "staff" || session.user.role === "admin",
    isAuth: session ? true : false,
  };
}
