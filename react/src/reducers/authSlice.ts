import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getCookie } from "../functions/Cookie";
import { Person } from "../types/person";
import axios from 'axios';

let XSRFcookie = getCookie('XSRF-TOKEN');
let bearerCookie = localStorage.getItem('bearer-TOKEN');
let user: Person = JSON.parse(localStorage.getItem('user') ?? '{}');



export const checkAuth = createAsyncThunk(
'auth/checkAuth',
async () => {
    const response = await axios.post('/checkAuth', {
        headers: {
            'authorization': `Bearer ${initialState.bearerToken}`,
            'X-XSRF-TOKEN': initialState.csrfToken,
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json',
            'X-Requested-With': 'XMLHttpRequest',
        }
    })
    return response.data
}
)


export interface AuthState {
    csrfToken: string | null | undefined;
    bearerToken: string | null | undefined;
    user: Person
}


const initialState = {
    csrfToken: XSRFcookie ? decodeURIComponent(XSRFcookie) : null,
    bearerToken: bearerCookie,
    user: user
} as AuthState

axios.defaults.baseURL = '/api';
axios.defaults.headers.common['Authorization'] = `Bearer ${initialState.bearerToken}`;
axios.defaults.headers.common['X-XSRF-TOKEN'] = initialState.csrfToken;
axios.defaults.headers.common['Accept'] = 'application/json, text/plain, */*';
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.headers.post['X-Requested-With'] = 'XMLHttpRequest';

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        changeCSRFtoken(state, action: PayloadAction<Pick<AuthState, 'csrfToken'>>) {
            state.csrfToken = action.payload.csrfToken
        },
        changeBearerToken(state, action: PayloadAction<Pick<AuthState, 'bearerToken'>>) {
            state.bearerToken = action.payload.bearerToken
            action.payload.bearerToken && localStorage.setItem('bearer-TOKEN', action.payload.bearerToken)
        },
        changeUser(state, action: PayloadAction<Pick<AuthState, 'user'>>) {
            state.user = action.payload.user
            localStorage.setItem('user', JSON.stringify(action.payload.user))
        },
        changeUserAndBearerToken(state, action: PayloadAction<Omit<AuthState, 'csrfToken'>>) {

            localStorage.setItem('bearer-TOKEN', action.payload.bearerToken ?? '')
            localStorage.setItem('user', JSON.stringify(action.payload.user))

            state.user = action.payload.user
            state.bearerToken  = action.payload.bearerToken
        }
    },
    extraReducers: (builder) => {
        // Add reducers for additional action types here, and handle loading state as needed
        builder.addCase(checkAuth.fulfilled, (state, action) => {
          // Add user to the state array
          state.user = action.payload
        })
      },
})

export const { changeCSRFtoken, changeBearerToken, changeUserAndBearerToken, changeUser } = authSlice.actions

export default authSlice.reducer
