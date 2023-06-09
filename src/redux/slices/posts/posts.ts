import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { IPostSlice, ITags } from '../../../types/types.global';
import {
	fetchPosts,
	fetchRemovePost,
	fetchTags,
} from '../../actions/action.creators';

const initialState: IPostSlice = {
	posts: {
		items: [],
		status: 'loading',
	},
	tags: {
		items: [],
		status: 'loading',
	},
};

export const postsSlice = createSlice({
	name: 'posts',
	initialState,
	reducers: {},
	extraReducers: builder => {
		// TODO: GET POSTS
		builder.addCase(fetchPosts.pending, state => {
			state.posts.status = 'pending';
			state.posts.items = [];
		});
		builder.addCase(fetchPosts.fulfilled, (state, action) => {
			state.posts.status = 'fulfilled';
			state.posts.items = action.payload;
		});
		builder.addCase(fetchPosts.rejected, state => {
			state.posts.status = 'error';
			state.posts.items = [];
		});

		// TODO: GET TAGS
		builder.addCase(fetchTags.pending, state => {
			state.tags.status = 'pending';
			state.tags.items = [];
		});
		builder.addCase(
			fetchTags.fulfilled,
			(state, action: PayloadAction<ITags[]>) => {
				state.tags.status = 'fulfilled';
				state.tags.items = action.payload;
			},
		);
		builder.addCase(fetchTags.rejected, state => {
			state.tags.status = 'error';
			state.tags.items = [];
		});

		// TODO: DELETE POST
		builder.addCase(fetchRemovePost.fulfilled, (state, action) => {
			state.posts.items = state.posts.items.filter(
				item =>
					typeof action.meta.arg !== 'undefined' &&
					item._id !== action.meta.arg,
			);
		});
		builder.addCase(fetchRemovePost.rejected, state => {
			state.posts.status = 'error';
		});
	},
});
