import { createAuthClient } from "better-auth/client";
import { adminClient } from "better-auth/client/plugins";
import { ac, admin, staff, pending } from "./permissions";

export const authClient = createAuthClient({
  plugins: [adminClient({ ac, roles: { admin, staff, pending } })],
});

export const { signOut } = authClient;
