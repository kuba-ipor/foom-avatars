import { useParams } from "react-router";
import Chat from "@/components/chat";
import type { UUID } from "@elizaos/core";

export default function AgentRoute() {
    const { agentId } = useParams<{ agentId: UUID }>();

    if (!agentId) return <div>No data.</div>;

    return (
        <div className="grid grid-cols-2">
            <div className="border-r border-border">
                <img 
                    src="/avatars/albert-einstein/albert-einstein-9-16.png" 
                    alt="Albert Einstein"
                    className="w-full h-full object-cover" 
                />
            </div>
            <Chat agentId={agentId} />
        </div>
    );
}
