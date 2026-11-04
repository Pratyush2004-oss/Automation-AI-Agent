import { useMutation, useQuery, type UseMutationResult, type UseQueryResult } from "@tanstack/react-query";
import { loginService, logoutService, meService } from "../services/auth.api.service.";
import { toast } from "sonner";
import type { loginServiceResponseType, UserType } from "../types";
import { queryClient } from "../../../app/queryClient";

const authKeys = ["auth"];

/**
 * @useLoginMutation
 * @description Login
 * @inputs {string} token
 * @returns {user, message}
 */
export const useLoginMutation = (): UseMutationResult<loginServiceResponseType, Error, string> => {
    return useMutation<loginServiceResponseType, Error, string>({
        mutationFn: async (token: string) => {
            const response = await loginService(token);
            if (typeof response === "string") throw new Error(response);
            return response;
        },
        onSuccess: (data: loginServiceResponseType) => {
            // setqueryclient
            queryClient.setQueryData<UserType>(authKeys, data.user);
            toast.success(data.message);
        },
        onError: (error: Error) => {
            toast.error(error.message);
        }
    })
};

/**
 * @useCheckMeQuery
 * @description Check if user is logged in
 * @inputs
 * @returns {user}
 */
export const useCheckMeQuery = (): UseQueryResult<UserType, Error> => {
    const cacheData = queryClient.getQueryData<UserType>(authKeys);
    return useQuery<UserType, Error>({
        queryKey: authKeys,
        queryFn: async () => {
            const response = await meService();
            if (typeof response === "string") throw new Error(response);
            return response;
        },
        initialData: cacheData,
        retry: false,
        refetchOnWindowFocus: false,
        staleTime: 1000 * 60 * 5        // 5 minutes
    })
}

/**
 * @useLogoutMutation
 * @description Logout
 * @inputs 
 * @returns 
 */
export const useLogoutMutation = (): UseMutationResult<{message: string}, Error, void> => {
    return useMutation<{message: string}, Error>({
        mutationFn: async () => {
            const response = await logoutService();
            if (typeof response === "string") throw new Error(response);
            return response;
        },
        onSuccess: (data) => {
            queryClient.removeQueries();
            toast.success(data.message);
        },
        onError: (error: Error) => {
            toast.error(error.message);
        }
    })
}