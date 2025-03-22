import { useParams } from "react-router";
import Chat from "@/components/chat";
import type { UUID } from "@elizaos/core";
import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/lib/api";
import { FoomAvatarImage } from "@/components/foom-avatar-image";

export default function AgentRoute() {
    const { agentId } = useParams<{ agentId: UUID }>();

    const query = useQuery({
        queryKey: ["agent", agentId],
        queryFn: () => apiClient.getAgent(agentId ?? ""),
        refetchInterval: 5_000,
        enabled: Boolean(agentId),
    });

    if (!agentId) return <div>No data.</div>;

    const character = query?.data?.character;

    if (!character) return null;

    return (
        <div className="grid grid-cols-2">
            <div className="border-r border-border">
                <FoomAvatarImage
                    name={character.name}
                    className="w-full h-full object-cover"
                />
            </div>
            <Chat agentId={agentId} />
        </div>
    );
}
