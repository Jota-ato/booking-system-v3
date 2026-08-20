import { resend } from "@/lib/resend";
import { SignUpVerification } from "../components/sign-up-verification";
import type { ReactElement } from "react";

export class EmailService {
  static createVerificationEmail(
    name: string,
    email: string,
    url: string,
  ): ReactElement {
    return SignUpVerification({ name, email, url });
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
}
