import { HTMLAttributes } from "react";
import { Button } from "../ui/button";
import { Spinner } from "../ui/spinner";

export function FormSubmit({
  isSubmitting,
  label,
  submittingLabel,
}: {
  isSubmitting: boolean;
  label: string;
  submittingLabel: string;
} & HTMLAttributes<HTMLButtonElement>) {
  return (
    <Button type="submit" disabled={isSubmitting}>
      {isSubmitting ? (
        <span className="flex gap-2">
          <Spinner />
          {submittingLabel}
        </span>
      ) : (
        <span>{label}</span>
      )}
    </Button>
  );
}
