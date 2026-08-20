import { ResetPasswordForm } from "@/features/auth/components/reset-password-form";
import { Container } from "@/shared/components/layout/container";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";

export default async function ResetPasswordPage({
  searchParams,
}: {
  searchParams: Promise<{ token?: string }>;
}) {
  const { token } = await searchParams;
  if (!token) {
    return null;
  }

  return (
    <Container>
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-center text-xl font-bold">
            Reset your pasword
          </CardTitle>
          <CardDescription className="text-center">
            Enter your new password to reset your account password.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ResetPasswordForm token={token} />
        </CardContent>
      </Card>
    </Container>
  );
}
