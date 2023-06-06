import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Data } from "../types/data";

export interface MainState {
    Account: Data | undefined,
    role: string,
    easyRole: "unlogined" | "admin" | "user"
}

const initialState = {} as MainState

const mainSlice = createSlice({
    name: 'main',
    initialState,
    reducers: {
        auth(state, action: PayloadAction<MainState>) {
            state.Account = action.payload.Account
            state.role = action.payload.role
            state.easyRole = action.payload.easyRole
        },
    }
})

export const { auth } = mainSlice.actions

export default mainSlice.reducer