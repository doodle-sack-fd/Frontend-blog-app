import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../axios';

export const fetchPosts = createAsyncThunk('fetchPosts', async () => {
	try {
		const { data } = await axios.get('/posts');
		return data;
	} catch (error) {
		throw new Error(error);
	}
});

export const fetchRemovePost = createAsyncThunk('fetchRemovePost', async id => {
	try {
		await axios.delete(`/posts/${id}`);
	} catch (error) {
		throw new Error(error);
	}
});

export const fetchTags = createAsyncThunk('fetchTags', async () => {
	try {
		const { data } = await axios.get('/tags');
		return data;
	} catch (error) {
		throw new Error(error);
	}
});

export const fetchUserData = createAsyncThunk('fetchUserData', async params => {
	try {
		const { data } = await axios.post('/login', params);
		return data;
	} catch (error) {
		throw new Error(error);
	}
});

export const fetchAuthMe = createAsyncThunk('fetchAuthMe', async () => {
	try {
		const { data } = await axios.get('/me');
		return data;
	} catch (error) {
		throw new Error(error);
	}
});

export const fetchRegister = createAsyncThunk('fetchRegister', async params => {
	try {
		const { data } = await axios.post('/register', params);
		return data;
	} catch (error) {
		throw new Error(error);
	}
});
