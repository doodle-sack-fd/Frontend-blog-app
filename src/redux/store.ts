import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { authSlice } from './slices/auth/auth';
import { postsSlice } from './slices/posts/posts';
export const store = configureStore({
	reducer: {
		posts: postsSlice.reducer,
		auth: authSlice.reducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
