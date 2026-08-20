import { requireAuth } from "@/lib/auth-server";
import { Container } from "@/shared/components/layout/container";
import { redirect } from "next/navigation";

export default async function HomePage() {
  const { session, user } = await requireAuth();
  if (!session) redirect("/auth/sign-in");

  return (
    <Container>
      <h1>Home page</h1>
      <p>
        welcome: <strong>{user.name}</strong>
      </p>
      <p>
        role: <strong>{user.role}</strong>
      </p>
    </Container>
  );
}
