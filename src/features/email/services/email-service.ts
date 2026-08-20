import { resend } from "@/lib/resend";
import { SignUpVerification } from "../components/sign-up-verification";
import type { ReactElement } from "react";
import { ResetPasswordEmail } from "../components/reset-password-email";
import { User } from "better-auth";
import { BUSINESS_EMAIL_DOMAIN } from "@/lib/env";

/**
 * Handles generation and delivery of transactional emails for the authentication flow.
 * It creates branded React email templates and sends them via the configured Resend API client.
 */
export class EmailService {
  /**
   * Builds the verification email template shown to a newly created user.
   * @param name User display name.
   * @param email User email address.
   * @param url Verification URL for the account activation flow.
   * @returns React element rendered in the email.
   */
  static createVerificationEmail(
    name: string,
    email: string,
    url: string,
  ): ReactElement {
    return SignUpVerification({ name, email, url });
  }

  /**
   * Builds the password reset email template sent to a user who requested recovery.
   * @param user Account details used to personalize the reset email.
   * @param url Recovery URL where the user can define a new password.
   * @returns React element rendered in the email.
   */
  static createResetPasswordEmail(user: User, url: string): ReactElement {
    return ResetPasswordEmail({ user, url });
  }

  /**
   * Sends a verification email after a user signs up.
   * @param name User display name.
   * @param email User email address.
   * @param url Verification URL for the account activation flow.
   */
  static async sendVerificationEmail(
    name: string,
    email: string,
    url: string,
  ): Promise<void> {
    const react = this.createVerificationEmail(name, email, url);

    const { error } = await resend.emails.send({
      from: `Verification <no-reply@${BUSINESS_EMAIL_DOMAIN}>`,
      to: email,
      subject: "Verify your email",
      react,
    });

    if (error) throw new Error(`Resend verification error: ${error.message}`);
  }

  /**
   * Sends a password reset email to the target user.
   * @param user Account details used to identify and personalize the email.
   * @param url Recovery URL for the password reset flow.
   */
  static async sendResetPasswordEmail(user: User, url: string): Promise<void> {
    const react = this.createResetPasswordEmail(user, url);

    const { error, data } = await resend.emails.send({
      from: `Verification <no-reply@${BUSINESS_EMAIL_DOMAIN}>`,
      to: user.email,
      subject: "Reset your password",
      react,
    });

    console.log(data);

    if (error) throw new Error(`Resend verification error: ${error.message}`);
  }
}
