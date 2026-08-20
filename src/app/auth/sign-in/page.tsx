import { SignInForm } from "@/features/auth/components/sign-in-form";
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
export default function SignInpage() {
  return (
    <Container>
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-center text-xl font-bold">
            Sign in
          </CardTitle>
          <CardDescription className="text-center">
            Enter your email and password to sign in.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <SignInForm />
        </CardContent>
      </Card>
      <div className="flex flex-col sm:flex-row items-center justify-between max-w-2xl mx-auto mt-4">
        <Button
          nativeButton={false}
          variant="link"
          render={<Link href={"/auth/sign-up"} />}
        >
          Doesn't have an account? Sign up
        </Button>
        <Button
          nativeButton={false}
          variant="link"
          render={<Link href={"/auth/forgot-password"} />}
        >
          Forgot your password? Reset it
        </Button>
      </div>
    </Container>
  );
}
