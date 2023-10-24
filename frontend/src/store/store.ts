import { configureStore } from '@reduxjs/toolkit'
import { authApi } from './modules/auth/api'
import { tasksApi } from './modules/tasks/api'

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [tasksApi.reducerPath]: tasksApi.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authApi.middleware,
      tasksApi.middleware,
    ),
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
