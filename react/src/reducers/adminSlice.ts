import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type p = 'lines' | 'moderation' | 'getAll' | 'archive' |
    'cons' | 'profiles' | 'trash' | 'get_fav_orders'

interface AdminState {
    path: string;
    date: string; 
    name: string
}

const initialState = {
    path: 'lines',
    date: '',
} as AdminState

const adminSlice = createSlice({
    name: 'admin',
    initialState,
    reducers: {
        changePath(state, action: PayloadAction<Omit<AdminState, 'date'>>) {
            state.path = action.payload.path
            state.name = action.payload.name
        },
        restrictDate(state, action: PayloadAction<string>) {
            // '2022-02-10' || action.payload.split('-').reverse().join('.').split('.').pop()
            state.date = action.payload
        }
    }
})

export const { changePath, restrictDate } = adminSlice.actions

export default adminSlice.reducer