import type { ReactNode } from "react";
import { DesktopSidebar } from "./DesktopSidebar";
import { MobileBottomNav } from "./MobileBottomNav";
import { TopBar } from "./TopBar";
import { Workspace } from "./Workspace";

interface AppShellProps {
  children: ReactNode;
  workspaceTitle: string;
  workspaceSubtitle?: string;
}

export function AppShell({
  children,
  workspaceTitle,
  workspaceSubtitle,
}: AppShellProps) {
  return (
    <div className="min-h-screen bg-slate-950">
      <div className="flex min-h-screen">
        <DesktopSidebar />

        <div className="flex min-h-screen flex-1 flex-col pb-20 lg:pb-0">
          <TopBar
            workspaceTitle={workspaceTitle}
            workspaceSubtitle={workspaceSubtitle}
          />

          <Workspace>{children}</Workspace>
        </div>
      </div>

      <MobileBottomNav />
    </div>
  );
}
