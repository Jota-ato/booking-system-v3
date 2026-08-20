import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { admin as adminPlugin } from "better-auth/plugins";
import { ac, admin, staff, pending } from "./permissions";
import { db } from "@/db";
import * as schema from "@/db/schemes";
import { nextCookies } from "better-auth/next-js";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
    usePlural: true,
    schema,
  }),
  plugins: [
    adminPlugin({
      ac,
      roles: { admin, staff, pending },
      defaultRole: "pending",
    }),
    nextCookies(),
  ],
});
