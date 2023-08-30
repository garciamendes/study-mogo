import {
  BaseQueryApi,
  BaseQueryFn,
  fetchBaseQuery,
} from '@reduxjs/toolkit/query/react'

import axios, { AxiosError, AxiosRequestConfig, AxiosRequestHeaders } from 'axios'

export const BASE_URL = process.env.NEXT_PUBLIC_URL_API as string

export const getAuthToken = () => {
  const token = sessionStorage.getItem('token')
  return token
}

export const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
  prepareHeaders(headers) {
    const token = getAuthToken()
    if (token) headers.set('Authorization', `Bearer ${token}`)

    if (!headers.get('Content-Type'))
      headers.set('Content-Type', 'application/json')

    return headers
  },
  responseHandler: async (response) => {
    let data
    try {
      data = await response.json()
    } catch (err) {
      return
    }

    if (![401, 403].includes(response.status)) return data

    if (data.code !== 'token_not_valid' && data.code !== 'user_inactive')
      return data

    sessionStorage.removeItem('token')
    window.location.href = '/auth/login'
  },
})

interface ICustomAxiosBaseQuery {
  baseUrl: string
  prepareHeaders?: (
    contentType?: AxiosRequestHeaders['Content-Type']
  ) => AxiosRequestConfig['headers']
}

export const customAxiosBaseQuery = (
  { baseUrl, prepareHeaders }: ICustomAxiosBaseQuery = { baseUrl: '' }
): BaseQueryFn<
  {
    url: string
    method: AxiosRequestConfig['method']
    body?: AxiosRequestConfig['data']
    params?: AxiosRequestConfig['params']
    contentType?: AxiosRequestHeaders['Content-Type']
    extraConfig?: (
      dispatchFn: BaseQueryApi
    ) => Omit<AxiosRequestConfig, 'method' | 'data' | 'params'>
  },
  unknown,
  unknown
> => {
  return async (
    { url, method, body, params, contentType, extraConfig },
    api
  ) => {
    try {
      const result = await axios({
        baseURL: baseUrl,
        url: url,
        method,
        data: body,
        params: params,
        headers: prepareHeaders?.(contentType),
        ...(extraConfig?.(api) ?? {}),
      })
      return { data: result.data }
    } catch (axiosError: any) {
      return {
        error: {
          status: axiosError.response.status,
          data: axiosError.response.data,
        },
      }
    }
  }
}

export const axiosBaseQuery = customAxiosBaseQuery({
  baseUrl: BASE_URL,
  prepareHeaders: (contentType?: AxiosRequestHeaders['Content-Type']) => {
    const headers: AxiosRequestConfig['headers'] = {}

    const token = getAuthToken()
    if (token) headers.Authorization = `Bearer ${token}`

    headers['Content-Type'] = contentType ?? 'application/json'

    return headers
  },
})
