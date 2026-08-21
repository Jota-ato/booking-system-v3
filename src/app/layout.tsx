import type { Metadata } from "next";
import "./globals.css";
import { Inter } from "next/font/google";
import { cn } from "@/shared/lib/utils";
import { Toaster } from "sonner";
import { ThemeProvider } from "@/shared/components/layout/theme-provider";
import { TooltipProvider } from "@/shared/components/ui/tooltip";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "Booking System v3",
  description: "A booking system for managing appointments and reservations.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn("h-full antialiased", "font-sans", inter.variable)}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <TooltipProvider>
            {children}
            <Toaster position="top-center" richColors />
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
