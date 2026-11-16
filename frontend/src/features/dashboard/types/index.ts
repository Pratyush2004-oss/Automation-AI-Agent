export type AgentType = {
    _id: string;
    name: string;
    knowledgeBase: string;
    tools: string[];
    isActive: boolean;
    instructions: string;
    createdAt: string;
    updatedAt: string;
}

export type CreateAgentInputType = {
    name: string;
    knowledgeBase: string;
    tools: string[];
    instructions: string;
}

export type CreateAgentResponseType = {
    agents: AgentType;
    message: string;
}

export type DeleteAgentResponseType = {
    message: string;
}

export type AgentStateType = {
    agents: AgentType[];
    agent: AgentType | null;
}