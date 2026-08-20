import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { admin as adminPlugin } from "better-auth/plugins";
import { ac, admin, staff, pending } from "./permissions";
import { db } from "@/db";
import * as schema from "@/db/schemes";
import { nextCookies } from "better-auth/next-js";
import { EmailService } from "@/features/email/services/email-service";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
    usePlural: true,
    schema,
  }),
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,
    sendResetPassword: async ({ user, url }) => {
      await EmailService.sendResetPasswordEmail(user, url);
    },
  },
  emailVerification: {
    sendOnSignUp: true,
    expiresIn: 1000 * 60 * 60 * 24,
    sendVerificationEmail: async ({ user, url }) =>
      await EmailService.sendVerificationEmail(user.name, user.email, url),
  },
  plugins: [
    adminPlugin({
      ac,
      roles: { admin, staff, pending },
      defaultRole: "pending",
    }),
    nextCookies(),
  ],
});
