import { createSlice } from '@reduxjs/toolkit';
import { useToast } from '../../hooks/useToast';
import { getAccessToken } from '../../localStorage';
import { getUserInforThunk, loginThunk } from './thunks';
const initialState = {
  loading: false,
  error: false,
  accessToken: getAccessToken ?? null,
  userInfor: {
    surname: '',
    name: '',
    emailAddress: '',
    avatarPath: '',
    sex: null
  }
};

const authSlice = createSlice({
  name: 'auth/login',
  initialState,
  reducers: {
    logout: (state) => {
      state.accessToken = null;
    },
    setError: (state) => {
      state.error = false;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.error = false;
        localStorage.setItem('token', action.payload.accessToken);
        state.accessToken = action.payload.accessToken;
        useToast('login successfully', 0);
      })
      .addCase(loginThunk.rejected, (state) => {
        state.loading = false;
        state.error = true;
        useToast('login failed', 2);
      });
    builder
      .addCase(getUserInforThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(getUserInforThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.userInfor = action.payload;
      })
      .addCase(getUserInforThunk.rejected, (state) => {
        state.loading = false;
      });
  }
});

export const { logout, setError } = authSlice.actions;

export const authReducer = authSlice.reducer;
