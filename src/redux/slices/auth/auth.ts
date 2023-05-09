import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { IUser, IUserAuth } from '../../../types/types.global';
import {
	fetchAuthMe,
	fetchRegister,
	fetchUserData,
} from '../../actions/action.creators';
import { RootState } from '../../store';

const initialState: IUserAuth = {
	data: null,
	status: 'loading',
};

export const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		logout: state => {
			state.data = null;
		},
	},
	extraReducers: builder => {
		builder.addCase(fetchUserData.pending, state => {
			state.status = 'pending';
			state.data = null;
		});
		builder.addCase(fetchUserData.fulfilled, (state, action) => {
			state.status = 'fulfilled';
			state.data = action.payload;
		});
		builder.addCase(fetchUserData.rejected, state => {
			state.status = 'error';
			state.data = null;
		});
		builder.addCase(fetchAuthMe.pending, state => {
			state.status = 'pending';
			state.data = null;
		});
		builder.addCase(
			fetchAuthMe.fulfilled,
			(state, action: PayloadAction<IUser>) => {
				state.status = 'fulfilled';
				state.data = action.payload;
			},
		);
		builder.addCase(fetchAuthMe.rejected, state => {
			state.status = 'error';
			state.data = null;
		});
		builder.addCase(fetchRegister.pending, state => {
			state.status = 'pending';
			state.data = null;
		});
		builder.addCase(
			fetchRegister.fulfilled,
			(state, action: PayloadAction<IUser>) => {
				state.status = 'fulfilled';
				state.data = action.payload;
			},
		);
		builder.addCase(fetchRegister.rejected, state => {
			state.status = 'error';
			state.data = null;
		});
	},
});

export const selectIsAuth = (state: RootState) => !!state.auth.data;
export const selectData = (state: RootState) => state.auth.data;
export const { logout } = authSlice.actions;
