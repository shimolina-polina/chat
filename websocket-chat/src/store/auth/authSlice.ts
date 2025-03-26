import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import IAuthState from '../../interface/IAuthState';
import { User } from 'firebase/auth';

const initialState: IAuthState = {
  user: null,
  isLoading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    signInSuccess: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.isLoading = false;
      state.error = null;
    },
    signOutSuccess: (state) => {
      state.user = null;
      state.isLoading = false;
      state.error = null;
    },
  },
});

export const { signInSuccess, signOutSuccess } = authSlice.actions;

export default authSlice.reducer;