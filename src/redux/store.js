import { configureStore } from '@reduxjs/toolkit';
import { authSlice } from './slices/auth';
import { postsSlice } from './slices/posts';

export const store = configureStore({
	reducer: {
		posts: postsSlice.reducer,
		auth: authSlice.reducer,
	},
});
