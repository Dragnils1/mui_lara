import { createSlice, PayloadAction } from "@reduxjs/toolkit";


interface QuizState {
    value: number;
    email: number;
}

const initialState: QuizState = {
    value: 0,
    email: Date.now() + Math.random()
}

const quizSlice = createSlice({
    name: 'quiz',
    initialState,
    reducers: {
        increment(state) {
            state.value++
        },
        decrement(state) {
            state.value--
        },
        setEmail(state, action: PayloadAction<number>) {
            // '2022-02-10' || action.payload.split('-').reverse().join('.').split('.').pop()
            state.email = action.payload
        }
    }
})

export const { increment, decrement, setEmail} = quizSlice.actions

export default quizSlice.reducer