import { AxiosError } from "axios";
import { api } from "../../../app/api";
import type { AgentType, CreateAgentInputType, CreateAgentResponseType, DeleteAgentResponseType } from "../types";

/**
 * @createAgentService
 * @description Create agent
 * @route POST /agent/create
 * @param data 
 * @returns {agent, message} | message
 */
export const createAgentService = async (data: CreateAgentInputType): Promise<CreateAgentResponseType | string> => {
    try {
        const response = await api.post("/agents/create", data);
        if (response.status === 400) throw new Error(response.data.message);
        return response.data;
    } catch (error: any) {
        if (error instanceof AxiosError) return error.response?.data?.message ?? error.message
        else return error.message
    }
}

/**
 * @getAllAgents
 * @description Get all agents
 * @route GET /agents
 * @returns {agents}
 */
export const getAllAgents = async (): Promise<AgentType[] | string> => {
    try {
        const response = await api.get("/agents");
        return response.data;
    } catch (error: any) {
        if (error instanceof AxiosError) return error.response?.data?.message ?? error.message
        else return error.message
    }
}

/**
 * @getSingleAgent
 * @description Get single agent
 * @param id 
 * @returns {agent} | message
 */
export const getSingleAgent = async (id: string): Promise<AgentType | string> => {
    try {
        const response = await api.get(`/agents/${id}`);
        return response.data;
    } catch (error: any) {
        if (error instanceof AxiosError) return error.response?.data?.message ?? error.message
        else return error.message
    }
}

/**
 * @deleteAgent
 * @description Delete agent
 * @route DELETE /agent/{id}
 * @param id 
 * @returns {message}
 */
export const deleteAgent = async (id: string): Promise<DeleteAgentResponseType | string> => {
    try {
        const response = await api.delete(`/agents/${id}`);
        if (response.status === 400) throw new Error(response.data.message);
        return response.data;
    } catch (error: any) {
        if (error instanceof AxiosError) return error.response?.data?.message ?? error.message
        else return error.message
    }
}
