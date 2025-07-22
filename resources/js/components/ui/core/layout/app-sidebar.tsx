"use client"

import * as React from "react"
import {
  AudioWaveform,
  BookOpen,
  Bot,
  Command,
  DoorOpen,
  Frame,
  GalleryVerticalEnd,
  LayoutDashboardIcon,
  LifeBuoy,
  Map,
  PhoneCall,
  PieChart,
  Send,
  Settings2,
  SquareTerminal,
  Store,
  UsersRound,
} from "lucide-react"


import { NavMain } from '@/components/ui/core/layout/nav-main';
import { NavUser } from '@/components/ui/core/layout/nav-user';
import { TeamSwitcher } from "@/components/ui/core/layout/team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/fragments/sidebar"
import { type SharedData } from '@/types';
import { NavSecondary } from "./NavSecondary";
import { useIsMobile } from "@/hooks/use-mobile";
import { usePage } from "@inertiajs/react";


 const data = {
    teams: [
    {
      name: "Acme Inc",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
    {
      name: "Acme Corp.",
      logo: AudioWaveform,
      plan: "Startup",
    },
    {
      name: "Evil Corp.",
      logo: Command,
      plan: "Free",
    },
  ],

    navMain: [
      {
        title: "Dashboard",
        url: "/dashboard",
        icon: LayoutDashboardIcon,
        isActive: false,
      },
      {
        title: "About",
        url: "/dashboard/about",
        icon: UsersRound,
        isActive: false,
      },
      {
        title: "Siswa",
        url: "/dashboard/siswa",
        icon: UsersRound,
        isActive: false,
      },
      {
        title: "Kelas",
        url: "/dashboard/kelas",
        icon: DoorOpen,
        isActive: false,
      },
      {
        title: "Contact",
        url: "/dashboard/contact",
        icon: PhoneCall,
        isActive: false,
      },

    ],
    // projects: [
    //   {
    //     name: "Inventory",
    //     url: "/dashboard/inventory",
    //     icon: Frame,
    //   },
    // ],
    navSecondary: [
      {
        title: "Support",
        url: "#",
        icon: LifeBuoy,
      },
      {
        title: "Feedback",
        url: "#",
        icon: Send,
      },
    ],
  }
export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {

  const { auth } = usePage<SharedData>().props;
  const isMob = useIsMobile()




  return (
<Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavSecondary
          isMobile={isMob}
          items={data.navSecondary}
          className="mt-auto"

        />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={auth} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
