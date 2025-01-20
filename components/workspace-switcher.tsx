"use client";

import * as React from "react";
import { useWorkspace } from "@/providers/workspace-provider";
import { ChevronsUpDown, Plus } from "lucide-react";
import { createClient } from "@/utils/supabase/client";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { addWorkspace } from "@/utils/supabase/workspaces";
import { useToast } from "./hooks/use-toast";

export function WorkspaceSwitcher({
  workspaces,
}: {
  workspaces: {
    id: string;
    // logo: React.ElementType;
    name: string;
  }[];
}) {
  const { toast } = useToast();
  const { isMobile } = useSidebar();
  const { activeWorkspace, setActiveWorkspace } = useWorkspace();

  // Set initial workspace
  React.useEffect(() => {
    if (!activeWorkspace && workspaces.length > 0) {
      setActiveWorkspace(workspaces[0]);
    }
  }, [workspaces, activeWorkspace, setActiveWorkspace]);
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                {/* <activeTeam.logo className="size-4" /> */}
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">
                  {activeWorkspace ? activeWorkspace.name : null}
                </span>
                <span className="truncate text-xs">
                  {activeWorkspace ? activeWorkspace.name : null}
                </span>
              </div>
              <ChevronsUpDown className="ml-auto" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
            align="start"
            side={isMobile ? "bottom" : "right"}
            sideOffset={4}
          >
            <DropdownMenuLabel className="text-xs text-muted-foreground">
              Workspaces
            </DropdownMenuLabel>
            {workspaces.map(
              (
                workspace: {
                  id: string;
                  name: string;
                },
                index
              ) => (
                <DropdownMenuItem
                  key={workspace.name}
                  onClick={() => setActiveWorkspace(workspace)}
                  className="gap-2 p-2"
                >
                  <div className="flex size-6 items-center justify-center rounded-sm border">
                    {/* <workspace.logo className="size-4 shrink-0" /> */}
                  </div>
                  {workspace.name}
                </DropdownMenuItem>
              )
            )}
            <DropdownMenuSeparator />
            <Dialog>
              <DialogTrigger asChild>
                <DropdownMenuItem
                  className="gap-2 p-2"
                  onSelect={(e) => e.preventDefault()}
                >
                  <div className="flex size-6 items-center justify-center rounded-md border bg-background">
                    <Plus className="size-4" />
                  </div>
                  <div className="font-medium text-muted-foreground">
                    Add workspace
                  </div>
                </DropdownMenuItem>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Create workspace</DialogTitle>
                  <DialogDescription>
                    Add a new workspace to organize your content.
                  </DialogDescription>
                </DialogHeader>
                <form
                  onSubmit={async (e) => {
                    e.preventDefault();
                    const formData = new FormData(e.currentTarget);
                    const name = formData.get("name") as string;

                    try {
                      const supabase = await createClient();
                      const {
                        data: { user },
                      } = await supabase.auth.getUser();
                      if (!user) throw new Error("No user found");

                      const newWorkspace = await addWorkspace({
                        user_id: user.id,
                        name: name,
                      });

                      // Add the new workspace to the list
                      workspaces.push(newWorkspace);
                      setActiveWorkspace(newWorkspace);
                    } catch (error: any) {
                      toast({
                        variant: "destructive",
                        title: "Uh oh! Something went wrong.",
                        description: error.message,
                      });
                    }
                  }}
                  className="space-y-4"
                >
                  <div>
                    <Input
                      id="name"
                      name="name"
                      placeholder="Workspace name"
                      required
                    />
                  </div>
                  <DialogClose asChild>
                    <Button type="submit" className="w-full">
                      Create workspace
                    </Button>
                  </DialogClose>
                </form>
              </DialogContent>
            </Dialog>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
