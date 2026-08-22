import { Staff } from "@/db/types/index.types";

export function StaffPreview({ staff }: { staff: Staff | null }) {
  if (!staff) {
    return (
      <div className="flex-1 md:border-l border-border md:pl-6">
        No staff profile found.
      </div>
    );
  }

  return (
    <div className="flex-1 md:border-l border-border md:pl-6">
      <h3 className="text-lg font-medium">{staff.name}</h3>
      <p className="text-muted-foreground">{staff.occupation}</p>
      <div className="mt-3 whitespace-pre-wrap">{staff.about}</div>
    </div>
  );
}
