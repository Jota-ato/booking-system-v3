import { resend } from "@/lib/resend";
import { SignUpVerification } from "../components/sign-up-verification";
import type { ReactElement } from "react";
import { ResetPasswordEmail } from "../components/reset-password-email";
import { User } from "better-auth";
import { BUSINESS_EMAIL_DOMAIN } from "@/lib/env";
import { ChangeEmailRequest } from "../components/change-email-request";

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
   * Builds the change-email confirmation template sent to the user's CURRENT
   * (pre-change) email address, as the first step of the two-step email
   * change flow. This is a deliberate security control: notifying the
   * existing inbox before the new one is contacted gives the legitimate
   * account owner a chance to notice and block an unauthorized change made
   * from a hijacked session. Do not repurpose this template for delivery to
   * `newEmail` — that would silently skip the confirmation step and defeat
   * its purpose (see `sendChangeEmailRequest`).
   * @param user Account details for the user requesting the change (used to resolve the current email address).
   * @param newEmail The email address the user is requesting to change to. Shown in the message body only; not used as a send target for this template.
   * @param url Confirmation URL that marks the change as owner-approved. Better Auth sends a separate verification email to `newEmail` only after this step is confirmed.
   * @returns React element rendered in the email.
   */
  static createChangeEmailRequestEmail(
    user: User,
    newEmail: string,
    url: string,
  ): ReactElement {
    return ChangeEmailRequest({ user, newEmail, url });
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

    const { error } = await resend.emails.send({
      from: `Verification <no-reply@${BUSINESS_EMAIL_DOMAIN}>`,
      to: user.email,
      subject: "Reset your password",
      react,
    });

    if (error) throw new Error(`Resend verification error: ${error.message}`);
  }

  /**
   * Sends the change-email confirmation to the user's CURRENT email address.
   * This is step 1 of Better Auth's two-step change-email flow: only after
   * the current owner confirms via this email does Better Auth send a
   * second, separate verification email to `newEmail` (handled by
   * `sendVerificationEmail` in auth.ts). The email is only updated once that
   * second step is completed.
   *
   * SECURITY-CRITICAL: `to` must remain `user.email`, not `newEmail`. Sending
   * this to the new address instead would let whoever controls that inbox
   * both request and confirm the change themselves, silently bypassing the
   * current-owner confirmation this step exists to provide (e.g. in a
   * hijacked-session scenario).
   * @param user Account details for the user requesting the change; `user.email` is the confirmation send target.
   * @param newEmail The email address the user is requesting to change to. Included in the message body so the current owner can recognize/reject an unexpected request.
   * @param url Confirmation URL that marks the change as owner-approved.
   * @throws {Error} If the Resend API returns an error while sending.
   */
  static async sendChangeEmailRequest(
    user: User,
    newEmail: string,
    url: string,
  ): Promise<void> {
    const react = this.createChangeEmailRequestEmail(user, newEmail, url);

    const { error } = await resend.emails.send({
      from: `Verification <no-reply@${BUSINESS_EMAIL_DOMAIN}>`,
      to: user.email,
      subject: "Confirm your email change",
      react,
    });

    if (error) throw new Error(`Resend verification error: ${error.message}`);
  }
}
