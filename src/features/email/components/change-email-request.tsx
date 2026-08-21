import { User } from "better-auth";
import { Tailwind, Html, Heading, Text, Button } from "react-email";

export function ChangeEmailRequest({
  user,
  newEmail,
  url,
}: {
  user: User;
  newEmail: string;
  url: string;
}) {
  return (
    <Tailwind>
      <Html className="bg-[#080817] text-[#f3f3fc]">
        <Heading className="text-2xl font-bold">Change email request</Heading>
        <Text>Hi {user.name},</Text>
        <Text>
          You have requested to change your email to {newEmail}. Please click
          the button below to confirm this change.
        </Text>
        <Button
          className="bg-[#f7514b] text-[#ffffff] rounded-lg font-bold px-4 py-3 text-center no-underline inline-block"
          href={url}
        >
          Confirm Email Change
        </Button>
      </Html>
    </Tailwind>
  );
}
