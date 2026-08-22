import { SettingsPagesSection } from "@/shared/components/dashboard/settings/settings-pages-section";
import { ThemeToggle } from "@/shared/components/ui/theme-toggle";

export function PreferencesControls() {
  return (
    <SettingsPagesSection>
      <h2>Preferences</h2>
      <ThemeToggle />
    </SettingsPagesSection>
  );
}
