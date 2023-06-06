import { combineReducers } from "@reduxjs/toolkit";
import { goroskopAPI } from "../services/goroskop";
import adminSlice from "./adminSlice";
import cabinetSlice from "./cabinetSlice";
import mainSlice from "./mainSlice";
import quizSlice from "./quizSlice";
import tableSlice from './tableSlice'
import authSlice from "./authSlice";


export const rootReducer = combineReducers({
    tableSlice: tableSlice,
    adminSlice: adminSlice,
    cabinet: cabinetSlice,
    quiz: quizSlice,
    main: mainSlice,
    auth: authSlice,
    [goroskopAPI.reducerPath]: goroskopAPI.reducer,

})
