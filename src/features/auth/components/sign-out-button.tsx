"use client";
import { signOut } from "@/lib/auth-client";
import { Button } from "@/shared/components/ui/button";
import { Spinner } from "@/shared/components/ui/spinner";
import { cn } from "@/shared/lib/utils";
import { LogOut } from "lucide-react";
import { redirect } from "next/navigation";
import { HTMLAttributes, useState } from "react";
import { toast } from "sonner";

export function SignOutButton({
  className,
  ...props
}: Omit<HTMLAttributes<HTMLButtonElement>, "onClick">) {
  const [isLoading, setIsLoading] = useState(false);

  const handleSignOut = async () => {
    setIsLoading(true);
    await signOut({
      fetchOptions: {
        onSuccess: () => {
          toast.success("Signed out successfully.");
          redirect("/auth/sign-in");
        },
        onError: () => {
          toast.error("Error signing out. Please try again.");
        },
      },
    });
    setIsLoading(false);
  };

  return (
    <Button
      variant="destructive"
      className={cn("flex flex-row justify-start items-center", className)}
      onClick={handleSignOut}
      disabled={isLoading}
      {...props}
    >
      {isLoading ? <Spinner /> : <LogOut className="size-4" />}
      Sign out
    </Button>
  );
}
