import { QuizActionTypes, QuizAction, InitialState } from "../types/quiz";

const initialState: InitialState = {
    data: [],
    error: null
}

export const quizRed = (state = initialState, action: QuizAction): InitialState => {
    switch (action.type) {
        case QuizActionTypes.QUIZ_POST :
            return {...state}
        case QuizActionTypes.QUIZ_POST_SUCCESS:
            return { ...state, data: action.payload }
        case QuizActionTypes.QUIZ_POST_ERROR:
            return { ...state, error: action.payload }
        default:
            return state
    }
}