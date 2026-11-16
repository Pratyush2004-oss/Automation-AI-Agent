import { useMutation, useQuery, type UseMutationResult, type UseQueryResult } from "@tanstack/react-query";
import type { AgentType, CreateAgentInputType, CreateAgentResponseType, DeleteAgentResponseType } from "../types";
import { createAgentService, deleteAgent, getAllAgents, getSingleAgent } from "../services/agents.api.service";
import { toast } from "sonner";
import { queryClient } from "../../../app/queryClient";
import { useAuthSelector } from "../../auth/store/hooks";

const agentKeys = (userId: string) => ["agents", userId] as const;
const SingleAgentKey = (userId: string, id: string) => ["agents", userId, id] as const;

/**
 * @useCreateAgentMutation
 * @description Create agent
 * @route POST /agent/create
 * @param data
 * @returns 
 */
export const useCreateAgentMutation = (): UseMutationResult<CreateAgentResponseType, Error, CreateAgentInputType> => {
    const user = useAuthSelector(state => state.user.user);
    return useMutation<CreateAgentResponseType, Error, CreateAgentInputType>({
        mutationFn: async (data: CreateAgentInputType) => {
            const response = await createAgentService(data);
            if (typeof response === "string") throw new Error(response);
            return response;
        },
        onSuccess: (data: CreateAgentResponseType) => {
            if (user) queryClient.invalidateQueries({ queryKey: agentKeys(user.firebaseUID) });
            toast.success(data.message);
        },
        onError: (error: Error) => {
            toast.error(error.message);
        }
    })
};

/**
 * @useGetAllAgentsQuery
 * @description Get all agents
 * @route GET /agents
 * @access private
 * @returns 
 */
export const useGetAllAgentsQuery = (): UseQueryResult<AgentType[], Error> => {
    const user = useAuthSelector(state => state.user.user);
    const queryKey = user ? agentKeys(user.firebaseUID) : agentKeys("");
    const cacheData = queryClient.getQueryData<AgentType[]>(queryKey);
    return useQuery<AgentType[], Error>({
        queryKey,
        queryFn: async () => {
            const response = await getAllAgents();
            if (typeof response === "string") throw new Error(response);
            return response;
        },
        initialData: cacheData,
        enabled: !!user,
        retry: false,
        refetchOnWindowFocus: false,
        staleTime: 1000 * 60 * 5        // 5 minutes
    })
};

/**
 * @useGetSingleAgentQuery
 * @description Get single agent
 * @route GET /agent/{id}
 * @param id 
 * @returns 
 */
export const useGetSingleAgentQuery = (id: string): UseQueryResult<AgentType, Error> => {
    const user = useAuthSelector(state => state.user.user);
    const queryKey = user ? SingleAgentKey(user.firebaseUID, id) : SingleAgentKey("", id);
    const cachedData = queryClient.getQueryData<AgentType>(queryKey);
    return useQuery<AgentType, Error>({
        queryKey,
        queryFn: async () => {
            const response = await getSingleAgent(id);
            if (typeof response === "string") throw new Error(response);
            return response;
        },
        enabled: !!user && !!id,
        initialData: cachedData,
        retry: false,
        refetchOnWindowFocus: false,
        staleTime: 1000 * 60 * 5        // 5 minutes
    })
}

/**
 * @useDeleteAgentMutation
 * @description Delete agent
 * @route DELETE /agent/{id}
 * @param id
 * @returns {message}
 */
export const useDeleteAgentMutation = (): UseMutationResult<DeleteAgentResponseType, Error, string> => {
    const user = useAuthSelector(state => state.user.user);
    return useMutation<DeleteAgentResponseType, Error, string>({
        mutationFn: async (id: string) => {
            const response = await deleteAgent(id);
            if (typeof response === "string") throw new Error(response);
            return response;
        },
        onSuccess: (data: DeleteAgentResponseType, id: string) => {
            if (user) {
                queryClient.invalidateQueries({ queryKey: agentKeys(user.firebaseUID) });
                queryClient.invalidateQueries({ queryKey: SingleAgentKey(user.firebaseUID, id) });
            }
            toast.success(data.message);
        },
        onError: (error: Error) => {
            toast.error(error.message);
        }
    })
}
