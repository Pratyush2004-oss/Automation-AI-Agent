import { ArrowLeft, Bot, Check, Workflow } from 'lucide-react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Input } from '../../../components/ui/input';
import { Textarea } from '../../../components/ui/textarea';
import type { CreateAgentInputType } from '../types';
import { useCreateAgentMutation } from '../tanstack';
import { Button } from '../../../components/ui/button';

const availableTools = [
  {
    id: "calculator",
    name: "Calculator",
    description: "A basic calculator that can perform basic arithmetic operations"
  },
  {
    id: "web search",
    name: "Web Search",
    description: "A web search engine that can perform web searches"
  },
  {
    id: "gamil.read",
    name: "Gmail Reader",
    description: "A gmail reader that can read emails from your inbox"
  },
  {
    id: "gmail.send",
    name: "Gmail Sender",
    description: "A gmail sender that can send emails to your inbox"
  }
]

const darkPanel = "border border-white/10 bg-white/4 shadow-[0_20px_60px_rgba(0,0,0,0.35),inset_0_1px_0_rgba(255,255,255,0.15)] backdrop-blur-xl";
const fieldCls = "rounded-xl border border-white/10 text-sm text-white placeholder:text-zinc-500 focus-visible:border-white/25 focus-visible:ring-0 p-1.5 backdrop-blur-xl";

const CreateAgent = () => {
  const [input, setInput] = useState<CreateAgentInputType>({
    name: "",
    knowledgeBase: "",
    tools: [],
    instructions: ""
  })
  const [error, setError] = useState("");
  const navigate = useNavigate();
  // function to handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value
    })
  }

  // function to handle tool selection
  const toggleTool = (tool: string) => {
    setInput({
      ...input,
      tools: input.tools.includes(tool) ? input.tools.filter(t => t !== tool) : [...input.tools, tool]
    })
  }

  const createAgentMutation = useCreateAgentMutation();
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createAgentMutation.mutate(input,
      {
        onSuccess: () => navigate("/dashboard"),
        onError: (error) => setError(error.message)
      });
  }
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
      <main className='mx-auto w-full max-w-2xl px-5 pb-12 pt-10 sm:px-8 sm:pt-14'>
        <div className='mb-9'>
          <div className="mb-5 grid size-12 place-items-center rounded-2xl bg-white text-zinc-900 shadow-[0_10px_40px_rgba(255,255,255,0.12)]">
            <Bot size={24} />
          </div>
          <h1 className='text-2xl font-semibold tracking-tight sm:text-3xl'>Create an agent</h1>
          <p className='mt-2 text-sm text-zinc-500'>Configure your AI agent and define what it can do</p>
        </div>

        <form className={`space-y-7 rounded-3xl p-5 sm:p-7 ${darkPanel}`} onSubmit={handleSubmit}>
          <section className='space-y-5'>

            {/* Agent name */}
            <div className=''>
              <label htmlFor="agent-name" className='mb-2 block text-xs font-medium text-zinc-300'>
                Agent name
              </label>
              <Input
                name='name'
                value={input.name}
                onChange={handleChange}
                placeholder='e.g: Research Assistant'
                maxLength={100}
                required
                className={`h-11 ${fieldCls}`}
              />
            </div>

            {/* Instructions */}
            <div className=''>
              <label htmlFor="instructions" className='mb-2 block text-xs font-medium text-zinc-300'>
                Instructions
              </label>
              <Input
                name='instructions'
                value={input.instructions}
                onChange={handleChange}
                placeholder='Instructions'
                maxLength={100}
                required
                className={`h-11 ${fieldCls}`}
              />
            </div>

            {/* Knowledge Base */}
            <div className=''>
              <label htmlFor="knowledgeBase" className='mb-2 block text-xs font-medium text-zinc-300'>
                Knowledge Base
              </label>
              <Textarea
                name='knowledgeBase'
                value={input.knowledgeBase}
                onChange={handleChange}
                placeholder='You are a helpful AI assistant. Your job is to .....'
                required
                className={`h-11 ${fieldCls} min-h-40 resize-y leading-6`}
              />
            </div>

            {/* Tools */}
            <div className=''>
              <label htmlFor="tools" className='mb-2 block text-xs font-medium text-zinc-300'>
                <h1 className='text-xs font-medium text-zinc-300'>Tools</h1>
                <p className='mt-1 text-xs text-zinc-500'>Select the capabilities available to your agent</p>
              </label>
              <div className='overflow-hidden rounded-2xl border border-white/70'>
                {availableTools.map((tool, index) => {
                  const isChecked = input.tools.includes(tool.id);
                  return (
                    <button
                      key={tool.id}
                      className={`flex w-full items-center justify-between gap-4 px-4 py-3.5
                      text-left transition ${index == 0 ? "border-t border-white/8" : ""} ${isChecked ? "bg-white/9" : "bg-white/2 hover:bg-white/5"} `}
                      onClick={(e: React.MouseEvent) => {
                        e.preventDefault()
                        toggleTool(tool.id)
                      }}>
                      <div className=''>
                        <p className='text-xs font-medium text-zinc-100'>{tool.name}</p>
                        <p className='mt-1 text-[11px] text-zinc-500'>{tool.description}</p>
                      </div>
                      <span className={`flex size-4.5 shrink-0 items-center justify-center rounded-md border ${isChecked ? "border-white bg-white text-zinc-900" : "border-white/20 text-transparent"}`}>{isChecked && <Check size={12} />}</span>
                    </button>
                  )
                })}
              </div>
            </div>
          </section>
          {error && (
            <p role='alert' className='rounded-xl border border-red-500/20 bg-red-500/8 px-4 py-3 text-xs text-red-300'>{error}</p>
          )}

          <div className='flex items-center justify-between gap-3 border-t border-white/8 pt-5'>
            <Button type='button' variant='ghost' className={"rounded-xl text-xs text-zinc-400 hover:bg-white/10 hover:text-white"} onClick={() => {
              setInput({
                name: "",
                knowledgeBase: "",
                instructions: "",
                tools: []
              })
              navigate("/dashboard")
            }}>Cancel</Button>
            <Button type='submit' disabled={createAgentMutation.isPending || !input.name || !input.instructions || !input.knowledgeBase || !input.tools.length} className={"h-10 bg-white px-5 font-medium text-zinc-900 hover:text-zinc-200 rounded-xl"} >{createAgentMutation.isPending ? "Creating..." : "Create Agent"}</Button>
          </div>
        </form>
      </main>
    </div>
  )
}

export default CreateAgent