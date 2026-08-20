import { ForgotPasswordForm } from "@/features/auth/components/forgot-password-form";
import { Container } from "@/shared/components/layout/container";
import { Button } from "@/shared/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
import Link from "next/link";

export default function ForgotPasswordPage() {
  return (
    <Container>
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-center text-xl font-bold">
            Forgot your password?
          </CardTitle>
          <CardDescription className="text-center">
            Enter your email address and we'll send you a link to reset your password.
          </CardDescription>
        </CardHeader>
        <CardContent>
            <ForgotPasswordForm/>
        </CardContent>
      </Card>
      <div className="flex flex-col sm:flex-row items-center justify-between max-w-2xl mx-auto mt-4">
        <Button
          nativeButton={false}
          variant="link"
          render={<Link href={"/auth/sign-in"} />}
        >
          Already have an account? Sign in
        </Button>
        <Button
          nativeButton={false}
          variant="link"
          render={<Link href={"/auth/sign-up"} />}
        >
          Don't have an account? Sign up
        </Button>
      </div>
    </Container>
  );
}
