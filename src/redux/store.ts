import { configureStore } from '@reduxjs/toolkit';
import { authReducer } from './auth/authSlice';
import { projectReducer } from './project/slice';
import { customerReducer } from './customer/slice';
export const store = configureStore({
  reducer: {
    authReducer,
    projectReducer,
    customerReducer
  }
});
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
