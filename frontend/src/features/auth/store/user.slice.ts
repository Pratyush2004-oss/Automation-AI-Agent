import { createSlice } from "@reduxjs/toolkit";
import type { UserState } from "../types";

const initialState: UserState = {
    user: null
}

const UserSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
        },
        clearUser: (state) => {
            state.user = null;
        }
    }
});
export const {setUser, clearUser} = UserSlice.actions;
export default UserSlice.reducer