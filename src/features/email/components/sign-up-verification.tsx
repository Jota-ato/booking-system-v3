import { Html, Heading, Text, Tailwind, Button } from "react-email";

export function SignUpVerification({
  email,
  name,
  url,
}: {
  email: string;
  name: string;
  url: string;
}) {
  return (
    <Tailwind>
      <Html>
        <Heading className="text-2xl font-bold">Welcome {name}</Heading>
        <Text>Please verify your email: {email}</Text>
        <Button
          className="bg-[#171717] text-[#fafafa] rounded-lg font-bold px-4 py-3 text-center no-underline inline-block"
          href={url}
        >
          Verify Email
        </Button>
      </Html>
    </Tailwind>
  );
}
