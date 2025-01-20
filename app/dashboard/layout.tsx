import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { WorkspaceProvider } from "@/providers/workspace-provider";
import ClientLayout from "./client-layout";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <WorkspaceProvider>
        <ClientLayout>{children}</ClientLayout>
      </WorkspaceProvider>
    </SidebarProvider>
  );
}
