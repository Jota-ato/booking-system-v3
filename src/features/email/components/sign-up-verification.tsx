import { Html, Heading, Text, Tailwind, Link } from "react-email";

export function SignUpVerfication({
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
        <Link
          className="bg-[#171717] text-[#fafafa] rounded-lg font-bold h-8 py-2 gap-1.5 px-2.5"
          href={url}
        >
          Verify Email
        </Link>
      </Html>
    </Tailwind>
  );
}
