import { SignInForm } from "@/features/auth/components/sign-in-form";
import { Container } from "@/shared/components/layout/container";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
export default function SignInpage() {
  return (
    <Container>
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-center text-xl font-bold">
            Sign up
          </CardTitle>
          <CardDescription className="text-center">
            Create new account to access the booking system and manage your
            reservations.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <SignInForm />
        </CardContent>
      </Card>
    </Container>
  );
}
