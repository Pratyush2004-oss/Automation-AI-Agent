import { configureStore } from "@reduxjs/toolkit";
import UserReducer from "../features/auth/store/user.slice";
import AgentReducer from "../features/dashboard/store/agent.slice";
export const store = configureStore({
    reducer: {
        user: UserReducer,
        agent: AgentReducer
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;