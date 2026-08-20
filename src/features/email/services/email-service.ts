import { resend } from "@/lib/resend";
import { SignUpVerfication } from "../components/sign-up-verification";
import type { ReactElement } from "react";

export class EmailService {
  static createVerificationEmail(
    name: string,
    email: string,
    actionUrl: string,
  ): ReactElement {
    return SignUpVerfication({ name, email, actionUrl });
  }

  static async sendVerificationEmail(
    name: string,
    email: string,
    actionUrl: string,
  ): Promise<void> {
    const react = this.createVerificationEmail(name, email, actionUrl);

    const { error } = await resend.emails.send({
      from: "Verification <no-reply@julio-zavala.me>",
      to: email,
      subject: "Verify your email",
      react,
    });

    if (error) throw new Error(`Resend verification error: ${error.message}`);
  }
}
