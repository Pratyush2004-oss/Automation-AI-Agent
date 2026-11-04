import { api } from "../../../app/api";
import type { loginServiceResponseType, UserType } from "../types";

/**
 * @loginService
 * @description Login
 * @param token 
 * @returns {user, message} | {message}
 */
export const loginService = async (token: string): Promise<loginServiceResponseType | string> => {
    try {
        const response = await api.post("/auth/login", { token });
        if (response.status === 400) throw new Error(response.data.message)
        return response.data;
    } catch (error: any) {
        if (error.response.data.message) return error.response.data.message
        else return error.message
    }
}

/**
 * @meService
 * @description Get user info
 * @returns {user, message} | {message}
 */
export const meService = async (): Promise<UserType | string> => {
    try {
        const response = await api.get("/auth/me");
        return response.data
    } catch (error: any) {
        if (error.response.data.message) return error.response.data.message
        else return error.message
    }
}

/**
 * @logoutService
 * @description Logout
 * @returns {message}
 */
export const logoutService = async (): Promise< {message:string} | string> => {
    try {
        const response = await api.get("/auth/logout");
        return {message: response.data.message}
    } catch (error: any) {
        if (error.response.data.message) return error.response.data.message
        else return error.message
    }
}