// Third party
import { createApi } from '@reduxjs/toolkit/query/react'
import { baseQuery } from '@/store/query'

// Local
import { ILoginRequest, ILoginResponse, IRegisterResquest } from './types'

export const authApi = createApi({
  reducerPath: 'auth',
  baseQuery: baseQuery,
  endpoints: (builder) => ({
    login: builder.mutation<ILoginResponse, ILoginRequest>({
      query: ({ email, password }) => ({
        url: '/api/user/user-auth',
        method: 'POST',
        body: { email, password },
      }),
    }),
    register: builder.mutation<void, IRegisterResquest>({
      query: ({ email, password, name }) => ({
        url: '/api/user',
        method: 'POST',
        body: { email, password, name },
      }),
    }),
  }),
})

export const { useLoginMutation, useRegisterMutation } = authApi