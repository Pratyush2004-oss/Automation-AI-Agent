import { ArrowLeft, Bot, Plus, RefreshCcw, Search, Workflow } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AgentCard from "../../../components/Agents/AgentCard";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { setAgents } from "../store/agent.slice";
import { useAgentDispatch } from "../store/hooks";
import { useGetAllAgentsQuery } from "../tanstack";
import type { AgentType } from "../types";

const darkPanel = "border border-white/10 bg-white/4 shadow-[0_20px_60px_rgba(0,0,0,0.35),inset_0_1px_0_rgba(255,255,255,0.15)] backdrop-blur-xl";
const whiteBtn = "rounded-xl border-0 bg-white text-zinc-900 hover:bg-zinc-200 hover:text-zinc-900";

const AgentsPage = () => {
  const [search, setSearch] = useState("");
  const dispatch = useAgentDispatch();
  const [{ data: agents, isLoading, isError }] = [useGetAllAgentsQuery()];

  useEffect(() => {
    if (!isLoading && !isError && agents) {
      dispatch(setAgents(agents));
    }
  }, [agents, dispatch]);

  const filteredAgents: AgentType[] | undefined = agents?.filter((agent) => {
    const query = search.toLowerCase();
    return (
      agent.name.toLowerCase().includes(query) ||
      agent.instructions.toLowerCase().includes(query) ||
      agent.knowledgeBase.toLowerCase().includes(query)
    )
  })
  return (
    <div className="relative flex min-h-screen flex-col bg-[radial-gradient(ellipse_80%_60%_at_50%_0%,#2b2f3a_0%,#191b21_55%,#121317_100%)] px-4 py-12 text-white">
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(0,0,0,0.35)_100%)]" />
      <div className="pointer-events-none absolute left-1/2 top-1/2 size-105 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/5 blur-[140px]" />

      <header className="z-30 flex h-16 shrink-0 items-center justify-between px-4 sm:px-6">
        <Link to={"/dashboard"} className="flex items-center gap-2.5">
          <span className="grid size-8 place-items-center rounded-lg bg-white text-zinc-900"><Workflow size={17} /></span>
          <span className="text-sm font-medium tracking-tight">Automate AI</span>
        </Link>
        <Link to={"/dashboard/agents"} className='flex items-center rounded-xl gap-2 border border-white/10 bg-white/5 px-3 py-2 text-xs text-zinc-300 transition hover:bg-white/10 hover:text-white'>
          <ArrowLeft size={17} />
          <span>Back to chat</span>
        </Link>
      </header>
      <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
        <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
          <div>
            <div className="mb-3 flex items-center gap-2 text-xs font-medium uppercase tracking-[0.18em] text-violet-300/80"><Bot /> Agent Workspace</div>
            <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">My Agents</h1>
            <p className="mt-2 text-sm text-zinc-50">Manage your AI agents and choose one to get started.</p>
          </div>

          <Button className={`h-10 items-center gap-2 ${whiteBtn}`}>
            <Link className="inline-flex items-center gap-2" to="/dashboard/agents/create"><span className="shrink-0">Create Agent</span><Plus size={17} /></Link>
          </Button>
        </div>

        {/* search bar */}
        <div className="mt-9 flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div className="relative w-full sm:max-w-sm">
            <Search size={17} className="absolute left-4 top-1/2 -translate-1/2 text-zinc-400 z-10" />
            <Input value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search for agents..."
              className={`h-10 rounded-xl border-white/10 bg-white/4 pl-9 text-white backdrop-blur-xl placeholder:text-zinc-500 focus-visible:border-white/25 focus-visible:ring-white/10`}
            />
          </div>
          <p className="mt-5 text-xs text-zinc-400">{agents?.length} {agents?.length === 1 ? "agent" : "agents"}</p>
        </div>

        {/* mapping agents */}
        {isLoading ? (
          <div className="flex min-h-64 flex-col items-center justify-center gap-3 text-zinc-500">
            <RefreshCcw className="animate-spin text-zinc-500" />
            <p className="text-sm">Loading your agents</p>
          </div>
        ) : filteredAgents && filteredAgents.length ? (
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filteredAgents?.map((agent) => {
              const agentId = agent._id;
              return (
                <AgentCard key={agentId} agent={agent} className={darkPanel} />
              )
            })}
          </div>
        ) : (
          <div className="mt-6 flex min-h-72 flex-col items-center justify-center rounded-2xl border border-dashed border-white/15 bg-white/2 px-5 text-center">
            <div className="grid size-12 place-items-center rounded-xl bg-white text-zinc-900">
              <Bot size={23} />
            </div>
            <h2 className="mt-4 text-base font-medium text-white">
              {search ? "No agents found." : "No agents created yet."}
            </h2>
            <p className="mt-2 max-w-sm text-sm leading-6 text-zinc-500">
              {search ? "Try searching with another name or keyword" : "Create your first AI agent to get started."}
            </p>
          </div>
        )}

      </main>
    </div>
  )
}

export default AgentsPage