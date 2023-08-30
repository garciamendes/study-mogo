// Third party
import { createApi } from '@reduxjs/toolkit/query/react'
import { baseQuery } from '@/store/query'
import { ILoginRequest } from './types'

export const authApi = createApi({
  reducerPath: 'auth',
  baseQuery: baseQuery,
  endpoints: (builder) => ({
    login: builder.mutation<void, ILoginRequest>({
      query: ({ email, password }) => ({
        url: '/auth/login/',
        method: 'POST',
        body: { email, password },
      }),
    }),
  }),
})

export const { useLoginMutation } = authApi