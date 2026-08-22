import { SettingsPagesSection } from "@/shared/components/dashboard/settings/settings-pages-section";
import StaffDetailsControls from "./staff-details-controls";
import { Staff } from "@/db/types/index.types";
import { User } from "@/db/types/index.types";

export function StaffControls({
  staff,
  user,
}: {
  staff: Staff | null;
  user: User;
}) {
  return (
    <SettingsPagesSection>
      <StaffDetailsControls staff={staff} user={user} />
    </SettingsPagesSection>
  );
}
