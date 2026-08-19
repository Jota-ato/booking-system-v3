import { Check } from "lucide-react";
import Image from "next/image";

const stack = [
  { name: "next", status: "16.0.0" },
  { name: "typescript", status: "strict" },
  { name: "tailwindcss", status: "v4" },
  { name: "drizzle-orm", status: "1.0" },
  { name: "better-auth", status: "configurado" },
];

export function Welcome() {
  return (
    <div className="relative size-full overflow-hidden bg-background text-foreground">
      <div
        className="pointer-events-none absolute inset-0 opacity-60"
        style={{
          backgroundImage:
            "linear-gradient(to right, var(--border) 1px, transparent 1px), linear-gradient(to bottom, var(--border) 1px, transparent 1px)",
          backgroundSize: "42px 42px",
          maskImage:
            "radial-gradient(ellipse 55% 45% at 50% 42%, black 0%, transparent 75%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 55% 45% at 50% 42%, black 0%, transparent 75%)",
        }}
      />

      <section className="relative mx-auto flex h-screen w-9/10 max-w-xl flex-col items-center justify-center gap-8 text-center">
        <Image 
          src="/next.svg"
          alt="Next.js"
          width={100}
          height={100}
        />

        <div>
          <p className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
            Plantilla · Next.js 16
          </p>
          <h1 className="mb-3 text-3xl font-extrabold tracking-tight sm:text-4xl">
            Bienvenido a un nuevo proyecto
          </h1>
          <p className="text-lg text-muted-foreground">
            TypeScript, Tailwind CSS, Better Auth y Drizzle ORM, ya conectados.
            Solo falta lo que vas a construir.
          </p>
        </div>

        <div className="w-full rounded-(--radius) border border-border bg-card p-5 text-left font-mono text-sm text-card-foreground">
          <div className="mb-4 flex gap-1.5">
            <span className="size-2.5 rounded-full bg-muted-foreground/30" />
            <span className="size-2.5 rounded-full bg-muted-foreground/30" />
            <span className="size-2.5 rounded-full bg-muted-foreground/30" />
          </div>

          <p className="mb-3 text-muted-foreground">$ pnpm run dev</p>

          <ul className="space-y-1.5">
            {stack.map((item) => (
              <li key={item.name} className="flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <Check className="size-3.5 text-primary" strokeWidth={3} />
                  {item.name}
                </span>
                <span className="text-muted-foreground">{item.status}</span>
              </li>
            ))}
          </ul>

          <p className="mt-4">
            listo para construir
            <span className="ml-0.5 motion-safe:animate-pulse">_</span>
          </p>
        </div>

        <p className="text-sm text-muted-foreground">
          Empieza editando{" "}
          <code className="rounded-md border border-border bg-accent px-1.5 py-0.5 font-mono text-xs text-accent-foreground">
            app/page.tsx
          </code>
        </p>
      </section>
    </div>
  );
}
