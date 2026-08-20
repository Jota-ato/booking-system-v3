import { resend } from "@/lib/resend";
import { SignUpVerification } from "../components/sign-up-verification";
import type { ReactElement } from "react";
import { ResetPasswordEmail } from "../components/reset-password-email";
import { User } from "better-auth";

export class EmailService {
  static createVerificationEmail(
    name: string,
    email: string,
    url: string,
  ): ReactElement {
    return SignUpVerification({ name, email, url });
  }

  static createResetPasswordEmail(user: User, url: string): ReactElement {
    return ResetPasswordEmail({ user, url });
  }

  static async sendVerificationEmail(
    name: string,
    email: string,
    url: string,
  ): Promise<void> {
    const react = this.createVerificationEmail(name, email, url);

    const { error } = await resend.emails.send({
      from: "Verification <no-reply@mail.julio-zavala.me>",
      to: email,
      subject: "Verify your email",
      react,
    });

    if (error) throw new Error(`Resend verification error: ${error.message}`);
  }

  static async sendResetPasswordEmail(user: User, url: string): Promise<void> {
    const react = this.createResetPasswordEmail(user, url);


    const { error, data } = await resend.emails.send({
      from: "Verification <no-reply@mail.julio-zavala.me>",
      to: user.email,
      subject: "Reset your password",
      react,
    });

    console.log(data)

    if (error) throw new Error(`Resend verification error: ${error.message}`);
  }
}
