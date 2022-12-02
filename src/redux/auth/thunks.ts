import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosClient from '../../api/api.config';
import { ILogin } from './login.interface';

export const loginThunk = createAsyncThunk(
  'auth/login',
  async (user: ILogin) => {
    const { data } = await axiosClient.post('api/TokenAuth/Authenticate', {
      userNameOrEmailAddress: user.username,
      password: user.password,
      rememberClient: user.rememberClient
    });
    return data.result;
  }
);

export const getUserInforThunk = createAsyncThunk(
  'auth/getUserInfor',
  async () => {
    const { data } = await axiosClient.get('/api/services/app/Session/GetCurrentLoginInformations');
    return data.result.user;
  }
);
