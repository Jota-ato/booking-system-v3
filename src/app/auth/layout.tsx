import { Container } from "@/shared/components/layout/container";
import { ThemeToggle } from "@/shared/components/ui/theme-toggle";
import { ReactNode } from "react";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <header className="py-4">
        <Container>
          <h1 className="text-2xl md:text-3xl text-center font-bold">
            Booking system auth page
          </h1>
        </Container>
      </header>
      <main>{children}</main>
    </>
  );
}
