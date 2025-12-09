

import { projects } from "@/lib/data";
import { Gamepad2, GanttChart, Globe, KanbanSquare, ListOrdered, Map, Settings, Users } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupLabel, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarMenuSub, SidebarMenuSubButton, SidebarMenuSubItem } from "../ui/sidebar";

const DashboardSidebar = () => {
    return (
        <Sidebar collapsible="icon">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton asChild>
                            <Link href={'/'}>
                                <Image src={'/globe.svg'} alt='logo' width={20} height={20} />
                                <span>Back to website</span>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>Projects</SidebarGroupLabel>
                    <SidebarContent>
                        {/* Sidebar Projects  */}
                        <SidebarMenu>
                            {projects && projects.map(items =>
                                <SidebarMenuItem key={items.name}>
                                    <SidebarMenuButton asChild>
                                        <Link href={`${items.nameUrl}`}>
                                            <Gamepad2 /> {items.name}
                                        </Link>
                                    </SidebarMenuButton>
                                    <SidebarMenuSub>
                                        <SidebarMenu>
                                            <SidebarGroupLabel>Game Information</SidebarGroupLabel>
                                            <SidebarMenuSub>
                                                <SidebarMenuSubItem>
                                                    <SidebarMenuSubButton asChild>
                                                        <Link href={`${items.leaderboardUrl}`}>
                                                            <ListOrdered />
                                                            Leaderboard
                                                        </Link>
                                                    </SidebarMenuSubButton>
                                                </SidebarMenuSubItem>
                                                <SidebarMenuSubItem>
                                                    <SidebarMenuSubButton asChild>
                                                        <Link href={`${items.playersUrl}`}>
                                                            <Users />
                                                            Players
                                                        </Link>
                                                    </SidebarMenuSubButton>
                                                </SidebarMenuSubItem>
                                                <SidebarMenuSubItem>
                                                    <SidebarMenuSubButton asChild>
                                                        <Link href={`${items.settingsUrl}`}>
                                                            <Settings />
                                                            Settings        
                                                        </Link>
                                                    </SidebarMenuSubButton>
                                                </SidebarMenuSubItem>
                                                <SidebarMenuSubItem>
                                                    <SidebarMenuSubButton asChild>
                                                        <Link href={`${items.levelsUrl}`}>
                                                            <Map />
                                                            Levels
                                                        </Link>
                                                    </SidebarMenuSubButton>
                                                </SidebarMenuSubItem>
                                            </SidebarMenuSub>
                                        </SidebarMenu>
                                        {/* Development  */}
                                        <SidebarGroupLabel>Development</SidebarGroupLabel>
                                        <SidebarMenuSub>
                                            <SidebarMenuSubItem>
                                                <SidebarMenuSubButton asChild>
                                                    <Link href={`${items.kanbanUrl}`}>
                                                        <KanbanSquare />
                                                        Kanban
                                                    </Link>
                                                </SidebarMenuSubButton>
                                            </SidebarMenuSubItem>
                                        </SidebarMenuSub>
                                    </SidebarMenuSub>
                                </SidebarMenuItem>
                            )}
                            <SidebarMenuItem>
                                <SidebarMenuButton asChild>
                                    <Link href={`/dashboard/website`}>
                                        <Globe /> Website
                                    </Link>
                                </SidebarMenuButton>
                                <SidebarMenuSub>
                                    <SidebarMenuSubItem>    
                                        <SidebarMenuButton asChild>
                                            <Link href={'/dashboard/website/kanban'}>
                                                <KanbanSquare /> Kanban
                                            </Link>
                                        </SidebarMenuButton>
                                    </SidebarMenuSubItem>                    
                                </SidebarMenuSub>
                            </SidebarMenuItem>
                        </SidebarMenu>
                    </SidebarContent>
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
    )
}

export default DashboardSidebar;