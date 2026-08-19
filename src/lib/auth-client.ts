import { createAuthClient } from "better-auth/client";

export const authClient = createAuthClient({});

export const { signOut } = authClient;
