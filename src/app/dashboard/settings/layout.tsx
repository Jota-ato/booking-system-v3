import { SettingsPagesHeader } from "@/shared/components/dashboard/settings/settings-pages-header";
import { SettingsPagesNavigation } from "@/shared/components/dashboard/settings/settings-pages-navigation";
import { ReactNode } from "react";

export default function SettingsLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <SettingsPagesHeader />
      <SettingsPagesNavigation />
      {children}
    </>
  );
}
