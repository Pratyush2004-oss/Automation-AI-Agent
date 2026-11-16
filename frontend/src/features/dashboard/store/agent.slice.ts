import { createSlice } from "@reduxjs/toolkit";
import type { AgentStateType } from "../types";

const initialState: AgentStateType = {
    agents: [],
    agent: null
}

const AgentSlice = createSlice({
    name: "agent",
    initialState,
    reducers: {
        setAgents: (state, action) => {
            state.agents = action.payload;
        },
        setSingleAgent: (state, action) => {
            state.agent = action.payload;
        }
    }
})

export const {setAgents, setSingleAgent} = AgentSlice.actions;
export default AgentSlice.reducer;