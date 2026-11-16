import { ArrowLeft, Bot, Trash2 } from "lucide-react";
import type { AgentType } from "../../features/dashboard/types";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";
import { useDeleteAgentMutation } from "../../features/dashboard/tanstack";

interface AgentCardProps {
    agent: AgentType;
    className: string
}
const AgentCard = ({ agent, className }: AgentCardProps) => {
    const deleteAgentMutation = useDeleteAgentMutation();
    const handleDeleteAgent = () => {
        deleteAgentMutation.mutate(agent._id);
    }
    return (
        <div className={`group flex min-h-56 flex-col rounded-2xl p-5 transition hover:border-white/25 hover:bg-white/6 ${className}`}>
            <div className="flex items-start justify-between gap-3">
                <div className="grid size-11 place-items-center rounded-xl bg-white text-zinc-900 shadow-[0_8px_24px_rgba(255,255,255,0.1)]">
                    <Bot size={22} />
                </div>
                <button className="rounded-lg p-2 text-zinc-500 transition hover:bg-red-500/10 hover:text-red-400 disabled:opacity-50" onClick={handleDeleteAgent}>
                    <Trash2 size={17} />
                </button>
            </div>
            <h2 className="mt-5 truncate text-base font-medium text-white">{agent.name || "Untitled Agent"}</h2>
            <p className="mt-2 line-clamp-3 flex-1 text-sm leading-6 text-zinc-500">{agent.instructions || "No instructions provided."}</p>

            <div className="mt-5 flex items-center justify-between border-t border-white/8 pt-4">
                <span className="text-xs text-zinc-600">My Agents</span>
                <Button variant={"ghost"} size={"sm"} className={"h-8 gap-1.5 rounded-lg text-zinc-300 hover:bg-white/10 hover:text-white"}>
                    <Link to={"/dashboard"} className="inline-flex items-center gap-1.5">
                        <span>Use agent</span>
                        <ArrowLeft size={15} className="rotate-180 shrink-0" />
                    </Link>
                </Button>
            </div>

        </div>
    )
}

export default AgentCard