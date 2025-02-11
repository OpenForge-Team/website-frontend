"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import {
  AudioWaveform,
  BookOpen,
  Bot,
  Command,
  Frame,
  GalleryVerticalEnd,
  Map,
  PieChart,
  Settings2,
  SquareTerminal,
  Workflow,
} from "lucide-react";

import { NavMain } from "@/components/nav-main";
import { NavManipulation } from "@/components/nav-manipulation";
import { NavUser } from "@/components/nav-user";
import { WorkspaceSwitcher } from "@/components/workspace-switcher";
import { getWorkspaces } from "@/utils/supabase/workspaces";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { User } from "@supabase/supabase-js";
import { getProfile, Profile } from "@/utils/supabase/profiles";
import { NavOutput } from "./nav-ouput";

// This is sample data except for workspaces which are fetched
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navInput: [
    {
      title: "Knowledge",
      url: "#",
      icon: SquareTerminal,
      isActive: true,
      items: [
        {
          title: "Arenas",
          url: "/dashboard/knowledge/arenas",
        },
        // {
        //   title: "Entities",
        //   url: "/dashboard/knowledge/entities",
        // },
        {
          title: "Notes",
          url: "/dashboard/knowledge/note",
        },
        {
          title: "Documents",
          url: "/dashboard/knowledge/documents",
        },
      ],
    },
    {
      title: "Editor",
      url: "/dashboard/editor",
      icon: BookOpen,
      items: [],
    },
    {
      title: "Chat",
      url: "/dashboard/chat",
      icon: Bot,
      items: [],
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const [workspaces, setWorkspaces] = useState<{ id: string; name: string }[]>(
    []
  );
  const [profile, setProfile] = useState<Profile | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const supabase = createClient();
  // Fetch user on mount
  useEffect(() => {
    const fetchUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user) {
        setUser(user);
      }
    };
    fetchUser();
  }, [supabase]);

  // Fetch workspaces when userId changes
  useEffect(() => {
    const fetchProfile = async () => {
      if (!user) return;
      try {
        const profileData = await getProfile(user.id);
        if (profileData) {
          setProfile(profileData);
        }
      } catch (error) {
        console.error("Failed to fetch profile:", error);
      }
    };
    const fetchWorkspaces = async () => {
      if (!user) return;
      try {
        const workspacesData = await getWorkspaces(user.id);
        setWorkspaces(workspacesData);
      } catch (error) {
        console.error("Failed to fetch workspaces:", error);
      }
    };
    fetchProfile();
    fetchWorkspaces();
  }, [user]);

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        {user && workspaces.length > 0 && (
          <WorkspaceSwitcher workspaces={workspaces} />
        )}
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navInput} />
      </SidebarContent>
      <SidebarFooter>
        {user && profile && <NavUser profile={profile} />}
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
