import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { Data } from '../types/data'
import { QuizType } from '../types/quiz'
import { SubmitDataType } from '../types/submitData'
import { RootState } from '../store/store'
import { getCookie } from '../functions/Cookie'

interface Post {
    id: number
    name: string
}
type PostsResponse = Post[]



// http://mui/api/
export const goroskopAPI = createApi({
    reducerPath: 'goroskopApi',
    baseQuery: fetchBaseQuery({
        baseUrl: '/',
        credentials: 'include',
        prepareHeaders: (headers, { getState }) => {

            const bearerToken = (getState() as RootState).auth.bearerToken;
            const csrfToken = (getState() as RootState).auth.csrfToken;

            // If we have a token set in state, let's assume that we should be passing it.
            bearerToken && headers.set('authorization', `Bearer ${bearerToken}`);
            csrfToken && headers.set('X-XSRF-TOKEN', csrfToken);

            // headers.set('Accept', 'application/json, text/plain, */*')
            // headers.set('Content-Type', 'application/json')
            // headers.set('X-Requested-With', 'XMLHttpRequest')

            return headers;
          },

    }),
    tagTypes: ["GET", 'UPDATE', 'Posts'],
    endpoints: builder => ({

        initCsrf: builder.mutation<string, void>({
            query: () => { return {
                url: `/sanctum/csrf-cookie`,
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json'
                }
            }
            },
            transformResponse: (apiResponse, meta, arg):string => {
              let cookie = getCookie('XSRF-TOKEN');
              return typeof cookie != null ? decodeURIComponent(cookie ?? '') : '';
            },

          }),
        // getUserById: builder.query<any[], string>({
        //     query: id => `lines/${}`
        // }),

        getApi: builder.query<Data[], string>({
            query: (name) => { return {
                url: `/api/${name}`,
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            }},
            providesTags: (result) => {

                return result ? [...result.map(({ id }) => ({ type: 'GET' as const, id })), 'GET']
                    : [{ type: 'GET', id: 'List' }]
            }
        }),
        submitData: builder.mutation<string | QuizType[], SubmitDataType>({
            query: ({ name, data }: SubmitDataType) => ({
                url: `/api/${name}`,
                method: 'POST',
                body: data
            })
        }),
        submitDataWithRerender: builder.mutation<string | QuizType[], SubmitDataType>({
            query: ({ name, data }: SubmitDataType) => ({
                url: `/${name}`,
                method: 'POST',
                body: data
            }),
            invalidatesTags: ['GET']
        }),
        SubmitStatus: builder.mutation<string, string | FormData>({
            query: (post) => ({
                url: `/status_save.php`,
                method: 'POST',
                body: post
            }),
        }),
        // { Account: Data, whoIs: string}
        AuthAccount: builder.mutation<any, SubmitDataType>({
            query: ({ name, data }: SubmitDataType) => ({
                url: `/api/${name}`,
                method: 'POST',
                body: data
            })
        }),
        updateData: builder.mutation<string | QuizType[], any>({
            query: ({ name, data }) => ({
              url: `/api/${name}`,
              method: 'PUT',
              body: data,
            }),
        }),


    }),

})

export const { useGetApiQuery, useAuthAccountMutation,
         useSubmitDataMutation, useSubmitStatusMutation,
         useUpdateDataMutation,
         useInitCsrfMutation, useSubmitDataWithRerenderMutation } = goroskopAPI
