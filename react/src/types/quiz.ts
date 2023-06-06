import { Data } from "./data";

export interface InitialState {
    data: any[];
    error: string | null
}

export enum  QuizActionTypes {
    QUIZ_POST = 'QUIZ_POST',
    QUIZ_POST_ERROR = 'QUIZ_POST_ERROR',
    QUIZ_POST_SUCCESS = 'QUIZ_POST_SUCCESS'
}

interface QuizPost {
    type: QuizActionTypes.QUIZ_POST
}
interface QuizPostSuccess {
    type: QuizActionTypes.QUIZ_POST_SUCCESS;
    payload: any[];
}
interface QuizPostError {
    type: QuizActionTypes.QUIZ_POST_ERROR;
    payload: string;
}

export type QuizAction =
    QuizPost
    | QuizPostSuccess
    | QuizPostError

export interface QuizType extends Data {
    r_pass: string,
    images: string,
    o_img1: FileList | string,
    o_img2: FileList | string,
    o_img3: FileList | string,
    o_img4: FileList | string,
    politic: boolean,
    passwordConfirm?: string
}
