export function SignUpVerfication({
  email,
  name,
  actionUrl,
}: {
  email: string;
  name: string;
  actionUrl: string;
}) {
  return (
    <div>
      <h1>welcome {name}</h1>
      <p>please verify your email: {email}</p>
      <a href={actionUrl}>Verify Email</a>
    </div>
  );
}
