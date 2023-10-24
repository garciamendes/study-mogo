// Third party
import { createApi } from '@reduxjs/toolkit/query/react'
import { baseQuery } from '@/store/query'

// Local
import {ITaskCreateResponse, ITaskCreateResquest, ITasksResponse} from './types'

export const tasksApi = createApi({
  reducerPath: 'tasks',
  baseQuery: baseQuery,
  tagTypes: ['list_tasks'],
  endpoints: (builder) => ({
    listTasks: builder.query<ITasksResponse, void>({
      query: () => ({
        url: '/api/task',
        method: 'GET',
      }),
      providesTags: ['list_tasks']
    }),
    createTask: builder.mutation<ITaskCreateResponse, ITaskCreateResquest>({
      query: ({ title, description, isFinished }) => ({
        url: '/api/task',
        method: 'POST',
        body: { title, description, isFinished }
      }),
      invalidatesTags: ['list_tasks']
    })

  }),
})

export const { useListTasksQuery, useCreateTaskMutation } = tasksApi