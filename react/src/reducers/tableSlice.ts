import { createSlice, PayloadAction } from "@reduxjs/toolkit";


interface TableState {
    tableSendStatus: string
}

const initialState: TableState = {
    tableSendStatus: 'smth',
}

const tableSlice = createSlice({
    name: 'table',
    initialState,
    reducers: {
        setTableSendStatus(state, action: PayloadAction<string>) {
            state.tableSendStatus = action.payload
        }
    }
})

export const { setTableSendStatus } = tableSlice.actions

export default tableSlice.reducer
