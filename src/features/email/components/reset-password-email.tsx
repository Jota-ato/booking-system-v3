import { User } from "better-auth";
import { Html, Heading, Text, Tailwind, Button } from "react-email";

export function ResetPasswordEmail({ user, url }: { user: User; url: string }) {
  return (
    <Tailwind>
      <Html>
        <Heading className="text-2xl font-bold">Hello {user.name}</Heading>
        <Text>We received a request to reset your password.</Text>
        <Text>
          If you did not make this request, you can ignore this email.
        </Text>
        <Button
          className="bg-[#171717] text-[#fafafa] rounded-lg font-bold px-4 py-3 text-center no-underline inline-block"
          href={url}
        >
          Reset Password
        </Button>
      </Html>
    </Tailwind>
  );
}
