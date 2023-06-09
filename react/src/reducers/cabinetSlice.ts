import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Data } from "../types/data";

export type filtrationObj = Partial<Pick<Data, 'city' | 'birthday'
    | 'registermonth' | 'langlove' | 'langlove2' | 'targetsearch' | 'zodiak' | 'birthyear'>>

interface CabinetState {
    filter: string;
}

const initialState = { filter: ''} as CabinetState

const cabinetSlice = createSlice({
    name: 'cabinet',
    initialState,
    reducers: {
        changeFilterObject(state, action: PayloadAction<string>) {
            state.filter = action.payload
        },
    }
})

export const { changeFilterObject } = cabinetSlice.actions

export default cabinetSlice.reducer
