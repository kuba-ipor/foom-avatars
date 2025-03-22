import { useQuery } from "@tanstack/react-query";
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar";
import { apiClient } from "@/lib/api";
import { NavLink, useLocation } from "react-router";
import type { UUID } from "@elizaos/core";
import { Book, Cog, HexagonIcon, PlayIcon, User } from "lucide-react";
import ConnectionStatus from "./connection-status";

export function AppSidebar() {
    const location = useLocation();
    const query = useQuery({
        queryKey: ["agents"],
        queryFn: () => apiClient.getAgents(),
        refetchInterval: 5_000,
    });

    const agents = query?.data?.agents;

    return (
        <Sidebar>
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <NavLink to="/">
                                <HexagonIcon className="size-7" />

                                <div className="flex flex-col gap-0.5 leading-none">
                                    <span className="font-semibold">
                                        Foom Avatars
                                    </span>
                                </div>
                            </NavLink>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>Avatars</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            <div>
                                {agents?.map(
                                    (agent: { id: UUID; name: string }) => (
                                        <SidebarMenuItem key={agent.id}>
                                            <NavLink
                                                to={`/chat/${agent.id}`}
                                            >
                                                <SidebarMenuButton
                                                    isActive={location.pathname.includes(
                                                        agent.id
                                                    )}
                                                >
                                                    <User />
                                                    <span>
                                                        {agent.name.charAt(0).toUpperCase() + agent.name.slice(1)}
                                                    </span>
                                                </SidebarMenuButton>
                                            </NavLink>
                                        </SidebarMenuItem>
                                    )
                                )}
                            </div>
                        </SidebarMenu>
                    </SidebarGroupContent>

                    <SidebarGroupLabel>Avatars</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            <SidebarMenuItem>
                                <NavLink to='videos'>
                                    <SidebarMenuButton>
                                        <PlayIcon />
                                        Videos
                                    </SidebarMenuButton>
                                </NavLink>
                            </SidebarMenuItem>
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <NavLink
                            to="https://elizaos.github.io/eliza/docs/intro/"
                            target="_blank"
                        >
                            <SidebarMenuButton>
                                <Book /> Documentation
                            </SidebarMenuButton>
                        </NavLink>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                        <SidebarMenuButton disabled>
                            <Cog /> Settings
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                    <ConnectionStatus />
                </SidebarMenu>
            </SidebarFooter>
        </Sidebar>
    );
}
